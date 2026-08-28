
/* ══════════════════════════════════════════════════════════
   카드 — id 는 영어 문장 그 자체
   ══════════════════════════════════════════════════════════ */
const CARDS = [];
GROUPS.forEach((g, gi) => g.s.forEach(row => {
  const [en, ko, ro, u] = row;
  CARDS.push({
    id: en, g: gi, gt: g.t, en, ko, ro,
    u: u.map(x => { const p = x.split("|"); return { e:p[0], k:p[1] }; })
  });
}));
const BY_EN = {};
CARDS.forEach(c => BY_EN[c.en] = c);

/* 강세: 기본은 마지막 내용어, 예외는 STRESS_FIX */
function stressOf(c){
  if(STRESS_FIX[c.en]) return STRESS_FIX[c.en];
  const u = c.u.map(x => x.e);
  for(let i = u.length - 1; i >= 0; i--) if(!FN_WORDS.has(u[i].toLowerCase())) return u[i];
  return u[u.length - 1];
}
/* 발음 함정: 문장당 최대 2개 */
function trapsOf(c){
  const out = [];
  c.u.forEach(x => { const t = TRAPS[x.e.toLowerCase()]; if(t && out.indexOf(t) < 0) out.push(t); });
  return out.slice(0, 2);
}

/* ══════════════════════════════════════════════════════════
   저장
   ══════════════════════════════════════════════════════════ */
const KEY = "hanul15.v2";
const BLANK = {
  cards:{}, streakDate:null, streak:0,
  newPerDay:5, newDate:null, newDone:0, bonusDate:null, bonus:0,
  tipSeen:false, showGloss:true, showRo:true,
  micOn:false, micBlocked:false,        /* 마이크는 기본 꺼짐 — 목소리가 밖으로 나가므로 */
  scenesDone:{}
};
let S = load();

function load(){
  try{
    const raw = localStorage.getItem(KEY);
    if(!raw) return Object.assign({}, BLANK);
    return Object.assign({}, BLANK, JSON.parse(raw));
  }catch(e){ return Object.assign({}, BLANK); }
}
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){} }

function stamp(d){ return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }
function today(){ return stamp(new Date()); }
function addDays(n){ const d = new Date(); d.setDate(d.getDate()+n); return stamp(d); }
function daysBetween(a,b){ return Math.round((new Date(b+"T00:00:00") - new Date(a+"T00:00:00"))/86400000); }

const GAPS = [1, 1, 3, 7, 16, 40];
const REVIEW_CAP = 12;
const SAY_FROM_BOX = 2;      /* 두 번 맞히면 조각 없이 말하기로 넘어갑니다 */

function newAllowance(){ return S.newPerDay + (S.bonusDate === today() ? (S.bonus||0) : 0); }
function newLeftToday(){
  const done = (S.newDate === today()) ? (S.newDone||0) : 0;
  return Math.max(0, newAllowance() - done);
}
function addBonus(n){
  if(S.bonusDate !== today()){ S.bonusDate = today(); S.bonus = 0; }
  S.bonus = (S.bonus||0) + n; save();
}
function dueCards(){ const t = today(); return CARDS.filter(c => S.cards[c.id] && S.cards[c.id].due <= t); }
function freshCards(){ return CARDS.filter(c => !S.cards[c.id]); }
function tomorrowCount(){ const t = addDays(1); return CARDS.filter(c => S.cards[c.id] && S.cards[c.id].due <= t).length; }
function shuffle(a){
  const r = a.slice();
  for(let i=r.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [r[i],r[j]]=[r[j],r[i]]; }
  return r;
}
function buildQueue(){
  const rev = shuffle(dueCards()).slice(0, REVIEW_CAP);
  const fresh = freshCards().slice(0, newLeftToday());
  const q = rev.map(c => ({c, isNew:false}));
  fresh.forEach(c => q.splice(Math.floor(Math.random()*(q.length+1)), 0, {c, isNew:true}));
  return q;
}

/* ══════════════════════════════════════════════════════════
   소리
   ══════════════════════════════════════════════════════════ */
let enVoice = null;
function pickVoice(){
  if(!window.speechSynthesis) return;
  const v = speechSynthesis.getVoices();
  if(!v.length) return;
  enVoice = v.find(x => /^en[-_]US/i.test(x.lang) && /google|natural|neural/i.test(x.name))
         || v.find(x => /^en[-_]US/i.test(x.lang))
         || v.find(x => /^en/i.test(x.lang)) || null;
}
if(window.speechSynthesis){ pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
function speak(text, rate){
  if(!window.speechSynthesis) return;
  try{
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US"; u.rate = rate;
    if(enVoice) u.voice = enVoice;
    speechSynthesis.speak(u);
  }catch(e){}
}

/* ══════════════════════════════════════════════════════════
   마이크
   ══════════════════════════════════════════════════════════ */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
function micUsable(){ return !!SR && S.micOn && !S.micBlocked; }
const PASS = 70;   /* 이 점수 이상이면 통과 */

function normWords(s){
  return s.toLowerCase().replace(/[.,!?;:"“”‘]/g,"").replace(/’/g,"'").trim().split(/\s+/).filter(Boolean);
}
function similarity(a, b){
  const A = normWords(a), B = normWords(b);
  if(!A.length || !B.length) return 0;
  const d = Array.from({length:A.length+1}, (_,i) => [i, ...Array(B.length).fill(0)]);
  for(let j=0;j<=B.length;j++) d[0][j] = j;
  for(let i=1;i<=A.length;i++)
    for(let j=1;j<=B.length;j++)
      d[i][j] = Math.min(d[i-1][j]+1, d[i][j-1]+1, d[i-1][j-1] + (A[i-1]===B[j-1] ? 0 : 1));
  return Math.max(0, Math.round((1 - d[A.length][B.length]/Math.max(A.length,B.length)) * 100));
}

/* ══════════════════════════════════════════════════════════
   화면 상태
   ══════════════════════════════════════════════════════════ */
const $body = document.getElementById("body");
const $foot = document.getElementById("foot");
const $bar  = document.getElementById("bar");
const $mark = document.getElementById("mark");

let view = "home";            /* home | study | done | scenes | scene | drills | drill */
let queue = [], total = 0, cur = null;
let step = "intro";           /* intro | build | say | reveal */
let placed = [], pool = [], wasRight = null, saidResult = null, selfPending = false;
let sceneIdx = 0, turnIdx = 0, turnShown = false, sceneSaid = null;
let drillIdx = 0, drillQueue = [], drillPos = 0, drillOpts = [], drillPicked = null, drillOk = 0;

function el(tag, cls, text){
  const n = document.createElement(tag);
  if(cls) n.className = cls;
  if(text != null) n.textContent = text;
  return n;
}
function render(){
  $body.replaceChildren(); $foot.replaceChildren();
  if(view === "home")        renderHome();
  else if(view === "study")  renderStudy();
  else if(view === "done")   renderDone();
  else if(view === "scenes") renderScenes();
  else if(view === "scene")  renderScene();
  else if(view === "drills") renderDrills();
  else if(view === "drill")  renderDrill();
  else                       renderHandoff();
}

/* ══════════════════════════════════════════════════════════
   선생님에게 넘기기 — 오늘 배운 문장을 그대로 회화 재료로
   ══════════════════════════════════════════════════════════ */
function renderHandoff(){
  $bar.hidden = true;
  $mark.textContent = "선생님에게 넘기기";
  const list = todayLearned();

  const hero = el("div","hero");
  const big = el("div","big", String(list.length));
  big.appendChild(el("span","unit","문장"));
  hero.appendChild(big);
  hero.appendChild(el("div","cap", list.length
    ? "오늘 이만큼 했어요. 아래 글을 복사해서 Claude 앱 선생님에게 붙여넣으면, 이 문장들로 회화를 시켜 줍니다."
    : "오늘 아직 공부한 게 없어요. 먼저 오늘 몫을 하고 오세요."));
  $body.appendChild(hero);

  if(list.length){
    const ta = el("textarea","backup");
    ta.style.height = "180px";
    ta.value = handoffText();
    ta.setAttribute("readonly","");
    ta.style.marginTop = "12px";
    $body.appendChild(ta);

    const note = el("div","note", "붙여넣은 다음 '시작'이라고 하면 바로 역할극이 시작됩니다.");
    note.style.marginTop = "8px";
    $body.appendChild(note);

    const copy = el("button","primary","복사하기");
    copy.onclick = async () => {
      try{
        await navigator.clipboard.writeText(ta.value);
        copy.textContent = "복사했어요 — 선생님에게 붙여넣으세요";
      }catch(e){
        ta.removeAttribute("readonly"); ta.select();
        copy.textContent = "길게 눌러 전체 선택 후 복사하세요";
      }
      setTimeout(() => { copy.textContent = "복사하기"; }, 3000);
    };
    $foot.appendChild(copy);
  }
  const back = el("button","ghost","홈으로");
  back.onclick = () => { view = "home"; render(); };
  $foot.appendChild(back);
}
function spk(){ return '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/></svg>'; }
function mic(){ return '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v4"/></svg>'; }

/* ══════════════════════════════════════════════════════════
   홈
   ══════════════════════════════════════════════════════════ */
function renderHome(){
  $bar.hidden = true;
  $mark.textContent = "하루 열다섯 문장";

  const waiting = Math.min(dueCards().length, REVIEW_CAP) + Math.min(freshCards().length, newLeftToday());
  const met = Object.keys(S.cards).length;
  const sayReady = CARDS.filter(c => S.cards[c.id] && S.cards[c.id].box >= SAY_FROM_BOX).length;

  const hero = el("div","hero");
  const big = el("div","big", String(waiting));
  big.appendChild(el("span","unit", waiting ? "장 기다리는 중" : "장"));
  hero.appendChild(big);
  hero.appendChild(el("div","cap", waiting
    ? "처음 보는 문장은 뜻부터, 두 번 맞힌 문장은 조각 없이 입으로 말합니다."
    : "오늘 몫은 끝났어요. 더 하고 싶으면 아래에서 새 문장을 더 받으세요."));
  $body.appendChild(hero);

  const stats = el("div","stats");
  const s1 = el("div","stat here");
  s1.appendChild(el("div","k","연속"));
  s1.appendChild(el("div","v", S.streak + "일"));
  const s2 = el("div","stat");
  s2.appendChild(el("div","k","말하기 단계"));
  s2.appendChild(el("div","v", sayReady + " / " + CARDS.length));
  stats.append(s1, s2);
  $body.appendChild(stats);

  if(!S.tipSeen){
    const tip = el("div","tip");
    const txt = el("div");
    txt.innerHTML = "<b>세 단계로 올라갑니다.</b><br>1단 뜻 보고 맞추기 → 2단 조각 없이 <b>입으로 말하기</b> → 3단 <b>상황 연습</b>에서 실제로 써먹기.";
    const x = el("button","x","×");
    x.setAttribute("aria-label","닫기");
    x.onclick = () => { S.tipSeen = true; save(); render(); };
    tip.append(txt, x);
    $body.appendChild(tip);
  }

  const btn = el("button","primary", waiting ? "시작하기" : "복습만 할래요");
  btn.onclick = () => startSession(waiting === 0);
  $foot.appendChild(btn);

  if(waiting === 0 || newLeftToday() === 0){
    const more = el("button","ghost","새 문장 5개 더 배우기");
    more.onclick = () => { addBonus(5); render(); };
    $foot.appendChild(more);
  }
  if(todayLearned().length){
    const hand = el("button","ghost","오늘 배운 걸로 회화하기 · " + todayLearned().length + "문장");
    hand.onclick = () => { view = "handoff"; render(); };
    $foot.appendChild(hand);
  }
  const dr = el("button","ghost","응용 훈련 · 틀 " + DRILLS.length + "개");
  dr.onclick = () => { view = "drills"; render(); };
  const sc = el("button","ghost","상황 연습 · 대화 " + SCENES.length + "장면");
  sc.onclick = () => { view = "scenes"; render(); };
  $foot.append(dr, sc);
}

function startSession(freeReview){
  queue = buildQueue();
  if(!queue.length || freeReview){
    const seen = CARDS.filter(c => S.cards[c.id]);
    queue = shuffle(seen.length ? seen : CARDS).slice(0, 8).map(c => ({c, isNew:false, extra:true}));
  }
  total = queue.length;
  nextCard();
}

/* ══════════════════════════════════════════════════════════
   학습 카드
   ══════════════════════════════════════════════════════════ */
function nextCard(){
  saidResult = null; wasRight = null; selfPending = false;
  if(!queue.length){ finish(); return; }
  cur = queue.shift();
  const st = S.cards[cur.c.id];
  step = cur.isNew ? "intro" : (st && st.box >= SAY_FROM_BOX && !cur.again ? "say" : "build");
  makePuzzle();
  view = "study";
  render();
  if(step === "intro") setTimeout(() => speak(cur.c.en, 0.8), 350);
}

function makePuzzle(){
  const ans = cur.c.u;
  const have = new Set(ans.map(x => x.e.toLowerCase()));
  const bank = [];
  GROUPS[cur.c.g].s.forEach(row => row[3].forEach(str => {
    const p = str.split("|");
    if(!have.has(p[0].toLowerCase()) && !bank.some(b => b.e.toLowerCase() === p[0].toLowerCase()))
      bank.push({ e:p[0], k:p[1] });
  }));
  const extras = shuffle(bank).slice(0, ans.length <= 2 ? 2 : 3);
  placed = [];
  pool = shuffle(ans.concat(extras)).map((x,i) => ({ e:x.e, k:x.k, i, used:false }));
  cur.answer = ans.map(x => x.e);
}

function chipEl(p, extraCls, onclick){
  const b = el("button","chip" + (extraCls ? " " + extraCls : ""));
  b.appendChild(el("span","ce", p.e));
  if(S.showGloss) b.appendChild(el("span","ck", p.k));
  b.onclick = onclick;
  return b;
}

function unitTable(c){
  const hit = stressOf(c);
  const t = el("div","utable");
  c.u.forEach(x => {
    const isHit = x.e === hit;
    const r = el("button","urow" + (isHit ? " stress" : ""));
    r.appendChild(el("span","ue", x.e));
    r.appendChild(el("span","uk", x.k));
    if(isHit) r.appendChild(el("span","badge","세게"));
    const s = el("span","us"); s.innerHTML = spk();
    r.appendChild(s);
    r.onclick = () => speak(x.e, 0.75);
    t.appendChild(r);
  });
  return t;
}

function trapBox(c){
  const list = trapsOf(c);
  if(!list.length) return null;
  const wrap = document.createDocumentFragment();
  list.forEach(t => {
    const d = el("div","trap");
    d.appendChild(el("span","ti","발음"));
    d.appendChild(el("span", null, t));
    wrap.appendChild(d);
  });
  return wrap;
}

function renderStudy(){
  $bar.hidden = false;
  const done = total - queue.length - 1;
  $bar.firstElementChild.style.width = Math.max(0, Math.round(done/total*100)) + "%";
  $mark.textContent = cur.c.gt;

  const stage = el("div","stage");

  /* ── 1단 도입: 처음 만나는 문장 ── */
  if(step === "intro"){
    stage.appendChild(el("div","eyebrow","새 문장"));
    stage.appendChild(el("div","en-answer", cur.c.en));
    if(S.showRo) stage.appendChild(el("div","ro", cur.c.ro));
    stage.appendChild(el("div","ko-prompt", cur.c.ko));
    stage.appendChild(unitTable(cur.c));
    stage.appendChild(el("div","note","노란 줄을 제일 세게 말하세요. 영어는 강세가 맞아야 알아듣습니다."));
    stage.appendChild(soundTools(cur.c.en, false));
    const tb = trapBox(cur.c); if(tb) stage.appendChild(tb);
    $body.appendChild(stage);
    const btn = el("button","primary","맞춰 볼게요");
    btn.onclick = () => { step = "build"; render(); };
    $foot.appendChild(btn);
    return;
  }

  /* ── 2단: 조각 없이 입으로 ── */
  if(step === "say"){
    stage.appendChild(el("div","eyebrow","2단 · 보지 않고 말하기"));
    stage.appendChild(el("div","ko-prompt", cur.c.ko));
    stage.appendChild(el("div","note", micUsable()
      ? "조각이 없습니다. 영어로 소리 내어 말한 다음 마이크를 누르세요."
      : "조각이 없습니다. 영어로 소리 내어 말해보고, 맞았는지 확인하세요."));
    if(micUsable()){
      const tools = el("div","tools");
      const rec = el("button","tool rec");
      rec.innerHTML = mic() + "<span>말했어요, 채점</span>";
      rec.onclick = () => listen(cur.c.en, rec, true);
      tools.appendChild(rec);
      stage.appendChild(tools);
    }
    if(saidResult) stage.appendChild(saidBox());
    $body.appendChild(stage);

    const show = el("button","primary","답 보기");
    show.onclick = () => { selfPending = true; step = "reveal"; render(); speak(cur.c.en, 0.8); };
    const fall = el("button","ghost","조각으로 맞출래요");
    fall.onclick = () => { step = "build"; render(); };
    $foot.append(show, fall);
    return;
  }

  /* ── 1단: 조각 맞추기 ── */
  if(step === "build"){
    stage.appendChild(el("div","eyebrow","한국어를 영어로"));
    stage.appendChild(el("div","ko-prompt", cur.c.ko));
    const slots = el("div","slots");
    placed.forEach((p, idx) => slots.appendChild(chipEl(p,"placed",() => {
      p.used = false; placed.splice(idx,1); render();
    })));
    stage.appendChild(slots);
    const poolEl = el("div","pool");
    pool.forEach(p => poolEl.appendChild(chipEl(p, p.used ? "used" : "", () => {
      if(p.used) return;
      p.used = true; placed.push(p);
      if(placed.length === cur.answer.length) grade(); else render();
    })));
    stage.appendChild(poolEl);
    $body.appendChild(stage);
    const btn = el("button","primary","모르겠어요, 답 보기");
    btn.onclick = () => { wasRight = false; step = "reveal"; commit(false); render(); speak(cur.c.en, 0.8); };
    $foot.appendChild(btn);
    return;
  }

  /* ── 정답 화면 ── */
  stage.appendChild(el("div","eyebrow", selfPending ? "맞췄는지 직접 판단하세요" : (wasRight ? "맞았어요" : "다시 봐요")));
  stage.appendChild(el("div","en-answer " + (selfPending ? "" : (wasRight ? "ok" : "no")), cur.c.en));
  if(S.showRo) stage.appendChild(el("div","ro", cur.c.ro));
  if(!wasRight && cur.myAnswer) stage.appendChild(el("div","wrongline", cur.myAnswer));
  stage.appendChild(el("div","ko-prompt", cur.c.ko));
  stage.appendChild(unitTable(cur.c));
  stage.appendChild(soundTools(cur.c.en, true));
  const tb2 = trapBox(cur.c); if(tb2) stage.appendChild(tb2);
  if(saidResult) stage.appendChild(saidBox());
  $body.appendChild(stage);

  if(selfPending){
    const ok = el("button","primary","말했어요, 맞았어요");
    ok.onclick = () => { selfPending = false; wasRight = true; commit(true); render(); };
    const no = el("button","ghost","못 했어요");
    no.onclick = () => { selfPending = false; wasRight = false; commit(false); render(); };
    $foot.append(ok, no);
  }else{
    const btn = el("button","primary", queue.length ? "다음" : "마치기");
    btn.onclick = nextCard;
    $foot.appendChild(btn);
  }
}

function grade(){
  const mine = placed.map(p => p.e).join(" ");
  wasRight = mine === cur.answer.join(" ");
  cur.myAnswer = wasRight ? null : mine;
  step = "reveal";
  commit(wasRight);
  render();
  speak(cur.c.en, wasRight ? 1 : 0.8);
}

function commit(ok){
  if(cur.extra) return;
  const st = S.cards[cur.c.id] || { box:0 };
  if(cur.isNew){
    if(S.newDate !== today()){ S.newDate = today(); S.newDone = 0; }
    S.newDone = (S.newDone||0) + 1;
  }
  if(ok){
    st.box = Math.min(GAPS.length - 1, (st.box||0) + 1);
  }else{
    st.box = 0;
    if(!cur.again){ queue.push({ c: cur.c, isNew:false, again:true }); total++; }
  }
  st.due = addDays(GAPS[st.box]);
  st.last = today();                    /* 오늘 배운 문장 추리기용 */
  S.cards[cur.c.id] = st;
  save();
}

/* 오늘 손댄 문장들 — 선생님에게 넘길 목록 */
function todayLearned(){
  const t = today();
  return CARDS.filter(c => S.cards[c.id] && S.cards[c.id].last === t);
}
function handoffText(){
  const list = todayLearned();
  const lines = list.map((c, i) => (i+1) + ". " + c.en + "   (" + c.ko + ")");
  return [
    "오늘 이 문장들을 외웠어요. 이걸로 회화 연습을 시켜 주세요.",
    "",
    lines.join("\n"),
    "",
    "규칙:",
    "- 이 문장들이 실제로 나올 만한 상황을 하나 정해서 역할극을 해주세요.",
    "- 오늘 문장을 되도록 다 쓰게 만들어 주세요.",
    "- 여기 없는 단어를 써야 하면, 먼저 그 단어만 따로 알려주고 쓰세요.",
    "- 한 번에 영어 한 문장씩만.",
    "- 중간에 한 번은 제가 예상 못 한 말을 던져 주세요.",
    "- 제가 답하면 통했는지부터 알려주고, 고칠 게 있으면 한 개만."
  ].join("\n");
}

function soundTools(text, withMic){
  const wrap = el("div","tools");
  const slow = el("button","tool");
  slow.innerHTML = spk() + "<span>느리게</span>";
  slow.onclick = () => speak(text, 0.6);
  const norm = el("button","tool");
  norm.innerHTML = spk() + "<span>보통 속도</span>";
  norm.onclick = () => speak(text, 1);
  wrap.append(slow, norm);
  if(withMic && micUsable()){
    const rec = el("button","tool rec");
    rec.innerHTML = mic() + "<span>따라 말하기</span>";
    rec.onclick = () => listen(text, rec, false);
    wrap.appendChild(rec);
  }
  return wrap;
}

let rec = null;
function listen(target, btn, autoGrade){
  if(!SR) return;
  try{ speechSynthesis.cancel(); }catch(e){}
  if(rec){ try{ rec.abort(); }catch(e){} rec = null; }
  rec = new SR();
  rec.lang = "en-US"; rec.interimResults = false; rec.maxAlternatives = 3;
  btn.classList.add("listening");
  btn.innerHTML = mic() + "<span>듣는 중…</span>";
  rec.onresult = (e) => {
    let best = 0, bestText = "";
    for(let i=0;i<e.results[0].length;i++){
      const t = e.results[0][i].transcript, s = similarity(t, target);
      if(s > best){ best = s; bestText = t; }
    }
    const r = { score: best, heard: bestText };
    if(view === "scene"){ sceneSaid = r; render(); return; }
    saidResult = r;
    if(autoGrade){                       /* 2단 말하기: 점수로 바로 채점 */
      wasRight = best >= PASS;
      selfPending = false;
      step = "reveal";
      commit(wasRight);
    }
    render();
    if(autoGrade) speak(target, wasRight ? 1 : 0.8);
  };
  rec.onerror = (e) => {
    if(e.error === "not-allowed" || e.error === "service-not-allowed"){ S.micBlocked = true; save(); }
    const r = { score:-1, heard:"", err:e.error };
    if(view === "scene"){ sceneSaid = r; render(); return; }
    saidResult = r; render();
  };
  rec.onend = () => { rec = null; };
  try{ rec.start(); }catch(e){
    const r = { score:-1, heard:"", err:"start" };
    if(view === "scene") sceneSaid = r; else saidResult = r;
    render();
  }
}

function saidBox(res){
  const R = res || saidResult;
  const s = R.score;
  if(s < 0){
    const b = el("div","said");
    b.textContent = (R.err === "not-allowed" || R.err === "service-not-allowed")
      ? "이 화면에서는 마이크를 열 수 없어서 발음 채점은 끕니다. 나머지는 그대로 쓰시면 됩니다."
      : R.err === "no-speech" ? "소리가 안 잡혔어요. 조금 더 크게 말해보세요."
      : "지금은 못 알아들었어요. 조용한 곳에서 다시 눌러보세요.";
    return b;
  }
  const cls = s >= 80 ? "good" : s >= 55 ? "soso" : "bad";
  const msg = s >= 80 ? "좋아요. 이 정도면 통합니다."
            : s >= 55 ? "거의 다 왔어요. 노란 줄을 더 세게 말해보세요."
            : "폰이 못 알아들었어요. 느리게 듣고 한 덩어리씩 끊어서 다시.";
  const b = el("div","said " + cls);
  const line = el("div");
  line.appendChild(el("span","score", s + "%"));
  line.appendChild(document.createTextNode("  " + msg));
  b.appendChild(line);
  if(R.heard) b.appendChild(el("div","heard","들린 말: " + R.heard));
  return b;
}

/* ══════════════════════════════════════════════════════════
   마침
   ══════════════════════════════════════════════════════════ */
function finish(){
  const t = today();
  if(S.streakDate !== t){
    const gap = S.streakDate ? daysBetween(S.streakDate, t) : 999;
    S.streak = (gap === 1) ? S.streak + 1 : 1;
    S.streakDate = t;
  }
  save(); view = "done"; render();
}

function renderDone(){
  $bar.hidden = true;
  $mark.textContent = "오늘 끝";
  const hero = el("div","hero");
  const big = el("div","big", String(S.streak));
  big.appendChild(el("span","unit","일 연속"));
  hero.appendChild(big);
  hero.appendChild(el("div","cap","오늘 " + total + "장 마쳤어요. 두 번 맞힌 문장은 다음에 조각 없이 말하기로 나옵니다."));
  $body.appendChild(hero);

  const stats = el("div","stats");
  const s1 = el("div","stat");
  s1.appendChild(el("div","k","만난 문장"));
  s1.appendChild(el("div","v", Object.keys(S.cards).length + " / " + CARDS.length));
  const s2 = el("div","stat");
  s2.appendChild(el("div","k","내일 복습"));
  s2.appendChild(el("div","v", tomorrowCount() + "장"));
  stats.append(s1, s2);
  $body.appendChild(stats);

  const left = freshCards().length;
  const hand = el("button","primary","오늘 배운 걸로 회화하기");
  hand.onclick = () => { view = "handoff"; render(); };
  const more = el("button","ghost", left ? "새 문장 5개 더 배우기" : "복습 더 하기");
  more.onclick = () => {
    if(left){ addBonus(5); startSession(false); } else startSession(true);
  };
  const home = el("button","ghost","홈으로");
  home.onclick = () => { view = "home"; render(); };
  $foot.append(hand, more, home);
  $body.appendChild(el("div","note","오늘 한 " + todayLearned().length + "문장을 Claude 앱 선생님에게 넘기면, 그 문장들로 역할극을 시켜 줍니다. 더 배우면 내일 복습은 " + tomorrowCount() + "장이 됩니다."));
}

/* ══════════════════════════════════════════════════════════
   상황 연습
   ══════════════════════════════════════════════════════════ */
function renderScenes(){
  $bar.hidden = true;
  $mark.textContent = "상황 연습";
  const intro = el("div","hero");
  intro.appendChild(el("div","cap","상대가 말을 겁니다. 내 차례가 오면 한국어만 보고 영어로 말해보세요. 여기 나오는 내 대사는 전부 평소에 연습한 문장입니다."));
  $body.appendChild(intro);

  const list = el("div","scenelist");
  list.style.marginTop = "12px";
  SCENES.forEach((sc, i) => {
    const b = el("button","scard");
    const n = el("div","sn", sc.name);
    n.appendChild(el("small", null, sc.where + " · 내 대사 " + sc.turns.filter(t => t.w === "me").length + "개"));
    b.appendChild(n);
    b.appendChild(el("div","sd", S.scenesDone[sc.name] ? "완료" : ""));
    b.onclick = () => { sceneIdx = i; turnIdx = 0; turnShown = false; sceneSaid = null; view = "scene"; render(); };
    list.appendChild(b);
  });
  $body.appendChild(list);

  const back = el("button","ghost","홈으로");
  back.onclick = () => { view = "home"; render(); };
  $foot.appendChild(back);
}

function renderScene(){
  const sc = SCENES[sceneIdx];
  $bar.hidden = false;
  $bar.firstElementChild.style.width = Math.round(turnIdx / sc.turns.length * 100) + "%";
  $mark.textContent = sc.name;

  const chat = el("div","chat");
  for(let i = 0; i < turnIdx; i++){
    const t = sc.turns[i];
    const b = el("div","bub " + t.w);
    b.appendChild(el("div","be", t.en));
    b.appendChild(el("div","bk", t.ko));
    b.onclick = () => speak(t.en, 0.85);
    chat.appendChild(b);
  }

  const t = sc.turns[turnIdx];
  if(!t){
    $body.appendChild(chat);
    const done = el("div","hero");
    done.style.marginTop = "14px";
    done.appendChild(el("div","cap","이 장면을 끝냈어요. 실제 상황에서 이 순서대로 나옵니다. 한 번 더 하면 훨씬 빨리 나와요."));
    $body.appendChild(done);
    S.scenesDone[sc.name] = true; save();
    const again = el("button","primary","한 번 더");
    again.onclick = () => { turnIdx = 0; turnShown = false; sceneSaid = null; render(); };
    const back = el("button","ghost","다른 장면 고르기");
    back.onclick = () => { view = "scenes"; render(); };
    $foot.append(again, back);
    return;
  }

  if(t.w === "them"){
    const b = el("div","bub them");
    b.appendChild(el("div","who","상대"));
    b.appendChild(el("div","be", t.en));
    b.appendChild(el("div","bk", t.ko));
    b.onclick = () => speak(t.en, 0.85);
    chat.appendChild(b);
    $body.appendChild(chat);
    setTimeout(() => speak(t.en, 0.85), 250);
    const btn = el("button","primary","내 차례");
    btn.onclick = () => { turnIdx++; turnShown = false; sceneSaid = null; render(); };
    $foot.appendChild(btn);
    return;
  }

  /* 내 차례 */
  const b = el("div","bub me");
  b.appendChild(el("div","who","내 차례"));
  if(turnShown){
    b.appendChild(el("div","be", t.en));
    const card = BY_EN[t.en];
    if(card && S.showRo) b.appendChild(el("div","bk", card.ro));
  }
  b.appendChild(el("div","bk" + (turnShown ? "" : " bub-turn"), t.ko));
  chat.appendChild(b);
  $body.appendChild(chat);

  if(!turnShown){
    const note = el("div","note");
    note.style.marginTop = "12px";
    note.textContent = micUsable()
      ? "영어로 소리 내어 말한 다음 마이크를 누르세요. 3초 안에 나오는 게 목표입니다."
      : "영어로 소리 내어 말해보고 답을 확인하세요. 3초 안에 나오는 게 목표입니다.";
    $body.appendChild(note);
    if(micUsable()){
      const tools = el("div","tools");
      tools.style.marginTop = "10px";
      const r = el("button","tool rec");
      r.innerHTML = mic() + "<span>말했어요, 채점</span>";
      r.onclick = () => listen(t.en, r, false);
      tools.appendChild(r);
      $body.appendChild(tools);
    }
  }
  if(sceneSaid) $body.appendChild(saidBox(sceneSaid));

  if(!turnShown){
    const show = el("button","primary","답 보기");
    show.onclick = () => { turnShown = true; render(); speak(t.en, 0.85); };
    $foot.appendChild(show);
  }else{
    const next = el("button","primary","다음");
    next.onclick = () => { turnIdx++; turnShown = false; sceneSaid = null; render(); };
    $foot.appendChild(next);
  }
  const quit = el("button","ghost","그만하기");
  quit.onclick = () => { view = "scenes"; render(); };
  $foot.appendChild(quit);
}

/* ══════════════════════════════════════════════════════════
   응용 훈련 — 틀은 두고 부품만 바꾸기
   ══════════════════════════════════════════════════════════ */
function drillSentence(d, item){ return d.frame.replace("___", item.fill); }

function renderDrills(){
  $bar.hidden = true;
  $mark.textContent = "응용 훈련";
  const intro = el("div","hero");
  intro.appendChild(el("div","cap","외운 문장 하나에서 부품만 갈아끼웁니다. 틀 하나에 여섯 문장이라, 열 개를 다 하면 예순 문장이 됩니다."));
  $body.appendChild(intro);

  const list = el("div","scenelist");
  list.style.marginTop = "12px";
  DRILLS.forEach((d, i) => {
    const b = el("button","scard");
    const n = el("div","sn", d.frame);
    n.appendChild(el("small", null, d.fko + " · " + d.items.length + "개"));
    b.appendChild(n);
    b.onclick = () => startDrill(i);
    list.appendChild(b);
  });
  $body.appendChild(list);

  const back = el("button","ghost","홈으로");
  back.onclick = () => { view = "home"; render(); };
  $foot.appendChild(back);
}

function startDrill(i){
  drillIdx = i;
  drillQueue = shuffle(DRILLS[i].items);
  drillPos = 0; drillOk = 0; drillPicked = null;
  makeOpts();
  view = "drill"; render();
}
function makeOpts(){
  const d = DRILLS[drillIdx], right = drillQueue[drillPos];
  if(!right){ drillOpts = []; return; }
  const others = shuffle(d.items.filter(x => x.fill !== right.fill)).slice(0, 3);
  drillOpts = shuffle(others.concat([right]));
}

function renderDrill(){
  const d = DRILLS[drillIdx];
  const item = drillQueue[drillPos];
  $bar.hidden = false;
  $bar.firstElementChild.style.width = Math.round(drillPos / drillQueue.length * 100) + "%";
  $mark.textContent = d.name;

  if(!item){
    $bar.hidden = true;
    const hero = el("div","hero");
    const big = el("div","big", drillOk + "");
    big.appendChild(el("span","unit","/ " + drillQueue.length + " 맞음"));
    hero.appendChild(big);
    hero.appendChild(el("div","cap", d.frame + " 하나로 " + drillQueue.length + "가지를 말했습니다. 틀은 그대로고 뒤만 바뀌었어요."));
    $body.appendChild(hero);
    const all = el("div","utable");
    all.style.marginTop = "12px";
    d.items.forEach(x => {
      const r = el("button","urow");
      r.appendChild(el("span","ue", drillSentence(d, x)));
      r.appendChild(el("span","uk", x.ko));
      const s = el("span","us"); s.innerHTML = spk();
      r.appendChild(s);
      r.onclick = () => speak(drillSentence(d, x), 0.85);
      all.appendChild(r);
    });
    $body.appendChild(all);
    const again = el("button","primary","한 번 더");
    again.onclick = () => startDrill(drillIdx);
    const back = el("button","ghost","다른 틀 고르기");
    back.onclick = () => { view = "drills"; render(); };
    $foot.append(again, back);
    return;
  }

  const stage = el("div","stage");
  stage.appendChild(el("div","eyebrow", d.fko));

  const frame = el("div","frame");
  const parts = d.frame.split("___");
  frame.appendChild(document.createTextNode(parts[0]));
  const blank = el("span","blank" + (drillPicked ? "" : " empty"), drillPicked ? drillPicked.fill : "____");
  frame.appendChild(blank);
  frame.appendChild(document.createTextNode(parts[1] || ""));
  stage.appendChild(frame);

  stage.appendChild(el("div","ko-prompt", item.ko));

  if(!drillPicked){
    const opts = el("div","opts");
    drillOpts.forEach(o => {
      const b = el("button","opt");
      b.appendChild(el("span","oe", o.fill));
      b.appendChild(el("span","ok2", o.fk));
      b.onclick = () => {
        drillPicked = o;
        if(o.fill === item.fill) drillOk++;
        render();
        speak(drillSentence(d, item), 0.9);
      };
      opts.appendChild(b);
    });
    stage.appendChild(opts);
    stage.appendChild(el("div","note", d.tip));
  }else{
    const right = drillPicked.fill === item.fill;
    stage.appendChild(el("div","eyebrow", right ? "맞았어요" : "이게 맞아요"));
    stage.appendChild(el("div","en-answer " + (right ? "ok" : "no"), drillSentence(d, item)));
    if(!right){
      const mine = el("div","wrongline", drillSentence(d, drillPicked));
      stage.appendChild(mine);
    }
    stage.appendChild(soundTools(drillSentence(d, item), false));
  }
  $body.appendChild(stage);

  if(drillPicked){
    const next = el("button","primary", drillPos + 1 < drillQueue.length ? "다음" : "마치기");
    next.onclick = () => { drillPos++; drillPicked = null; makeOpts(); render(); };
    $foot.appendChild(next);
  }
  const quit = el("button","ghost","그만하기");
  quit.onclick = () => { view = "drills"; render(); };
  $foot.appendChild(quit);
}

/* ══════════════════════════════════════════════════════════
   설정
   ══════════════════════════════════════════════════════════ */
const $sheet = document.getElementById("sheet");
const $msg = document.getElementById("sheetMsg");
function msg(t){ $msg.textContent = t; }
function syncToggles(){
  document.getElementById("tGloss").setAttribute("aria-pressed", String(!!S.showGloss));
  document.getElementById("tRo").setAttribute("aria-pressed", String(!!S.showRo));
  document.getElementById("tMic").setAttribute("aria-pressed", String(!!S.micOn && !S.micBlocked));
}
document.getElementById("gear").onclick = () => {
  document.getElementById("nVal").textContent = S.newPerDay;
  const ta = document.getElementById("backup");
  ta.value = JSON.stringify(S); ta.setAttribute("readonly","");
  syncToggles(); msg(""); $sheet.hidden = false;
};
document.getElementById("closeSheet").onclick = () => { $sheet.hidden = true; render(); };
$sheet.onclick = (e) => { if(e.target === $sheet){ $sheet.hidden = true; render(); } };
document.getElementById("nPlus").onclick = () => {
  S.newPerDay = Math.min(15, S.newPerDay + 1); save();
  document.getElementById("nVal").textContent = S.newPerDay;
};
document.getElementById("nMinus").onclick = () => {
  S.newPerDay = Math.max(1, S.newPerDay - 1); save();
  document.getElementById("nVal").textContent = S.newPerDay;
};
document.getElementById("tGloss").onclick = () => { S.showGloss = !S.showGloss; save(); syncToggles(); };
document.getElementById("tRo").onclick    = () => { S.showRo    = !S.showRo;    save(); syncToggles(); };
document.getElementById("tMic").onclick   = () => {
  S.micOn = !S.micOn;
  if(S.micOn) S.micBlocked = false;      /* 다시 켜면 한 번 더 시도해 봅니다 */
  save(); syncToggles();
  msg(S.micOn
    ? "켰습니다. 말한 목소리가 구글 서버로 갑니다. 버튼을 누를 때만이고, 안 누르면 나가지 않습니다."
    : "껐습니다. 마이크 버튼이 화면에서 사라지고, 목소리는 어디로도 나가지 않습니다.");
};

document.getElementById("copyBk").onclick = async () => {
  const ta = document.getElementById("backup");
  try{ await navigator.clipboard.writeText(ta.value); msg("복사했어요. 안전한 곳에 붙여넣어 두세요."); }
  catch(err){ ta.removeAttribute("readonly"); ta.select(); msg("길게 눌러 전체 선택 후 복사하세요."); }
};
let pasteArmed = false;
document.getElementById("pasteBk").onclick = (e) => {
  const ta = document.getElementById("backup");
  if(!pasteArmed){
    pasteArmed = true;
    ta.removeAttribute("readonly"); ta.value = "";
    ta.placeholder = "백업해 둔 글자를 여기에 붙여넣고, 다시 이 버튼을 누르세요";
    ta.focus();
    e.target.textContent = "붙여넣었어요, 되살리기";
    msg("위 칸에 백업 글자를 붙여넣은 다음 버튼을 한 번 더 누르세요.");
    return;
  }
  try{
    const o = JSON.parse(ta.value);
    if(!o || typeof o !== "object" || !o.cards) throw new Error("형식");
    S = Object.assign({}, BLANK, o);
    save(); syncToggles();
    msg("진도를 되살렸어요. 닫기를 누르세요.");
    e.target.textContent = "붙여넣어 되살리기";
    pasteArmed = false;
  }catch(err){ msg("붙여넣은 글자가 백업 형식이 아니에요. { 로 시작하는 글자 전체를 복사했는지 확인해 주세요."); }
};
let resetArmed = false;
document.getElementById("reset").onclick = (e) => {
  if(!resetArmed){
    resetArmed = true;
    e.target.textContent = "정말 지웁니다 — 한 번 더 누르기";
    msg("진도와 연속 기록이 모두 사라지고, 되돌릴 수 없어요.");
    setTimeout(() => { resetArmed = false; e.target.textContent = "진도 전부 지우기"; }, 6000);
    return;
  }
  S = Object.assign({}, BLANK); save();
  resetArmed = false; e.target.textContent = "진도 전부 지우기";
  $sheet.hidden = true; view = "home"; render();
};

render();
</script>
