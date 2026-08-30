
/* ══════════════════════════════════════════════════════════════════
   단어 기억법 — 어려운 단어를 쪼개서 이야기로 만듭니다.
   문장 안에 이 단어가 들어 있으면 화면에 같이 나옵니다.

   가짜 어원을 지어내지 않습니다. 실제 뿌리가 있는 것만 '쪼개기'로 쓰고,
   뿌리가 없는 것은 소리 고리(발음이 비슷한 우리말)라고 분명히 적습니다.

   key = 소문자 단어. w=단어, k=뜻, ro=한글발음, cut=쪼갠 모양, why=이야기
   ══════════════════════════════════════════════════════════════════ */
const WORDS = {

"breakfast":{w:"breakfast", k:"아침 식사", ro:"브렉퍼스트", cut:"break(깨다) + fast(굶기)",
 why:"fast 는 '빠르다' 말고 '굶다'라는 뜻도 있습니다. 밤새 굶은 것을 아침에 깨뜨리는 첫 끼 — 그래서 breakfast."},

"understand":{w:"understand", k:"이해하다", ro:"언더스탠드", cut:"under(아래) + stand(서다)",
 why:"상대의 입장 아래에 서서 올려다보는 것. 그게 이해한다는 말이 됐습니다."},

"passport":{w:"passport", k:"여권", ro:"패스포트", cut:"pass(통과) + port(항구·관문)",
 why:"항구를 통과하게 해주는 종이. 옛날에 배로 다니던 시절 말이 그대로 남았습니다."},

"mistake":{w:"mistake", k:"잘못, 착오", ro:"미스테이크", cut:"mis(잘못) + take(집다)",
 why:"잘못 집은 것. mis 가 붙으면 '잘못'이 됩니다 — misunderstand(잘못 이해하다)도 같은 식이에요."},

"included":{w:"included", k:"포함된", ro:"인클루디드", cut:"in(안에) + clude(닫다)",
 why:"안에 넣고 문을 닫아버린 것 = 포함된. 반대로 ex(밖) + clude 는 exclude(제외하다)입니다."},

"discount":{w:"discount", k:"할인", ro:"디스카운트", cut:"dis(떼어냄) + count(셈)",
 why:"셈에서 떼어내는 것. 계산에서 얼마를 빼주는 게 할인입니다."},

"expensive":{w:"expensive", k:"비싼", ro:"익스펜시브", cut:"expense(지출) + ive",
 why:"지출이 큰 것. 카드값 나갈 때 쓰는 그 expense 입니다."},

"recommend":{w:"recommend", k:"추천하다", ro:"레커멘드", cut:"re(거듭) + commend(칭찬하다)",
 why:"거듭 칭찬하는 것. 그만큼 좋다고 밀어주는 게 추천입니다."},

"appreciate":{w:"appreciate", k:"고맙게 여기다", ro:"어프리시에잇", cut:"ap + preci(값) + ate",
 why:"안에 price(값)와 같은 뿌리가 들어 있습니다. 값을 알아준다 → 고마워한다."},

"reservation":{w:"reservation", k:"예약", ro:"레저베이션", cut:"re(미리) + serve(떼어두다)",
 why:"내 몫을 미리 따로 떼어두는 것. 식당에서 자리를 빼놓는 게 예약이죠."},

"vacation":{w:"vacation", k:"휴가", ro:"베케이션", cut:"vac(비다) + ation",
 why:"vacant(비어 있는)와 같은 뿌리입니다. 일에서 내가 비워지는 기간 = 휴가."},

"delicious":{w:"delicious", k:"맛있는", ro:"딜리셔스", cut:"소리 고리",
 why:"'딜리셔스'의 앞소리가 '들이'와 비슷합니다. 들이켜고 싶을 만큼 맛있다 — 이렇게 걸어두면 떠오릅니다."},

"pharmacy":{w:"pharmacy", k:"약국", ro:"파머시", cut:"소리 고리",
 why:"'파머시' → '파마 하러 갔다가 옆 약국에 들렀다'로 걸어두세요. ph 는 f 소리라 '프'가 아니라 '파'입니다."},

"baggage":{w:"baggage", k:"(여행) 짐", ro:"배기지", cut:"bag(가방) + gage",
 why:"bag 이 그대로 들어 있습니다. 가방들 전체를 묶어 부르는 말. 어깨에 '배기지' 하고 외우면 더 쉽습니다."},

"receipt":{w:"receipt", k:"영수증", ro:"리씻", cut:"re(다시) + ceipt(받다)",
 why:"받았다는 것을 되돌려 알려주는 종이. **p 는 소리를 내지 않습니다** — '리씨트'가 아니라 '리씻'."},

"charger":{w:"charger", k:"충전기", ro:"차저", cut:"charge(채우다) + er(~하는 것)",
 why:"charge 는 '채우다'입니다. 채워주는 물건 = 충전기. 카드값을 charge 한다고도 하죠."},

"downtown":{w:"downtown", k:"시내 중심가", ro:"다운타운",
 cut:"down(아래) + town(마을)",
 why:"뉴욕 맨해튼에서 남쪽(지도상 아래) 끝이 중심가였던 데서 굳은 말입니다. '아래 동네'가 곧 시내."},

"medium":{w:"medium", k:"중간", ro:"미디엄", cut:"med(가운데)",
 why:"스테이크 '미디엄'과 같은 말입니다. 옷 사이즈든 굽기든 가운데를 뜻해요."},

"bother":{w:"bother", k:"귀찮게 하다", ro:"바더", cut:"소리 고리",
 why:"brother(브라더)에서 r 하나만 빠졌습니다. 동생이 자꾸 귀찮게 한다 — 이렇게 붙여두면 안 잊힙니다."},

"serious":{w:"serious", k:"진지한", ro:"씨리어스", cut:"소리 고리",
 why:"드라마 '시리즈(series)'와 소리가 비슷하지만 뜻은 다릅니다. '씨리어스'는 정색한 얼굴이라고 걸어두세요."},

"fitting":{w:"fitting room", k:"탈의실", ro:"피팅 룸", cut:"fit(맞다) + ing + room(방)",
 why:"fit 은 '몸에 맞다'입니다. 맞는지 보는 방 = 탈의실. 옷이 fit 한다고 하면 잘 맞는다는 뜻이에요."},

"police":{w:"police", k:"경찰", ro:"폴리스", cut:"소리 고리",
 why:"'폴리스'입니다. '폴리'에 강세를 주세요. 앞을 세게 하지 않으면 잘 안 들립니다."}

};

/* 문장 안에 기억법이 있는 단어를 찾습니다. 화면이 길어지지 않게 최대 두 개. */
function wordNotes(c){
  const found = [];
  c.en.toLowerCase().replace(/[^a-z' ]/g, " ").split(/\s+/).forEach(raw => {
    if(WORDS[raw] && found.indexOf(WORDS[raw]) < 0) found.push(WORDS[raw]);
  });
  return found.slice(0, 2);
}
