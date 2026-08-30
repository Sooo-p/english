
/* ══════════════════════════════════════════════════════════════════
   응용 훈련 — 틀은 그대로 두고 부품만 갈아끼웁니다.
   외운 문장 하나가 여섯 개로 늘어나는 게 목적.
   item = {ko: 한국어, fill: 갈아끼울 영어, fk: 그 뜻}
   전체 문장은 frame 의 ___ 자리에 fill 을 넣어 자동으로 만듭니다.
   ══════════════════════════════════════════════════════════════════ */
const DRILLS = [

{ name:"주문·요청하기", frame:"I'd like ___, please.", fko:"~ 주세요",
  tip:"가게에서 뭘 달라고 할 때 가장 안전한 틀입니다. 뒤에 물건만 바꿔 끼우세요.",
  items:[
    {ko:"물 주세요",        fill:"a water",       fk:"물 하나"},
    {ko:"커피 두 잔 주세요", fill:"two coffees",   fk:"커피 두 잔"},
    {ko:"같은 걸로 주세요",  fill:"the same thing", fk:"같은 것"},
    {ko:"이걸로 주세요",     fill:"this one",      fk:"이것"},
    {ko:"자리 하나 주세요",  fill:"a table",       fk:"테이블 하나"},
    {ko:"영수증 주세요",     fill:"a receipt",     fk:"영수증 하나"}
  ]},

{ name:"허락 구하기", frame:"Can I ___?", fko:"~해도 될까요?",
  tip:"뒤에 '하는 동작'이 옵니다. 동작 앞에 to 를 붙이지 마세요.",
  items:[
    {ko:"여기 앉아도 될까요?",     fill:"sit here",         fk:"여기 앉다"},
    {ko:"사진 찍어도 될까요?",     fill:"take a photo",     fk:"사진 찍다"},
    {ko:"이거 봐도 될까요?",       fill:"see this",         fk:"이거 보다"},
    {ko:"여기서 기다려도 될까요?", fill:"wait here",        fk:"여기서 기다리다"},
    {ko:"화장실 써도 될까요?",     fill:"use the bathroom", fk:"화장실 쓰다"},
    {ko:"나중에 다시 와도 될까요?",fill:"come back later",  fk:"나중에 다시 오다"}
  ]},

{ name:"있는지 묻기", frame:"Do you have ___?", fko:"~ 있어요?",
  tip:"가게에서 물건을 찾을 때. 뒤에는 '물건'이 옵니다.",
  items:[
    {ko:"충전기 있어요?",   fill:"a charger",     fk:"충전기 하나"},
    {ko:"물 있어요?",       fill:"any water",     fk:"물 아무거나"},
    {ko:"더 큰 거 있어요?", fill:"a bigger one",  fk:"더 큰 것"},
    {ko:"다른 색 있어요?",  fill:"another color", fk:"다른 색"},
    {ko:"자리 있어요?",     fill:"a table",       fk:"테이블 하나"},
    {ko:"봉투 있어요?",     fill:"a bag",         fk:"봉투 하나"}
  ]},

{ name:"위치 묻기", frame:"Where is ___?", fko:"~는 어디예요?",
  tip:"the 를 빼먹기 쉽습니다. 정해진 그 장소를 가리킬 땐 the 를 붙이세요.",
  items:[
    {ko:"화장실이 어디예요?",     fill:"the bathroom",  fk:"그 화장실"},
    {ko:"출구가 어디예요?",       fill:"the exit",      fk:"그 출구"},
    {ko:"역이 어디예요?",         fill:"the station",   fk:"그 역"},
    {ko:"버스 정류장이 어디예요?",fill:"the bus stop",  fk:"그 버스 정류장"},
    {ko:"제 자리가 어디예요?",    fill:"my seat",       fk:"내 자리"},
    {ko:"엘리베이터가 어디예요?", fill:"the elevator",  fk:"그 엘리베이터"}
  ]},

{ name:"하고 싶다고 말하기", frame:"I want to ___.", fko:"~하고 싶어",
  tip:"want to 뒤에는 동작이 그대로 옵니다. 바꾸지 말고 붙이기만 하세요.",
  items:[
    {ko:"집에 가고 싶어",   fill:"go home",       fk:"집에 가다"},
    {ko:"자고 싶어",        fill:"sleep",         fk:"자다"},
    {ko:"뭐 좀 먹고 싶어",  fill:"eat something", fk:"뭔가 먹다"},
    {ko:"좀 쉬고 싶어",     fill:"take a rest",   fk:"쉬다"},
    {ko:"여기 있고 싶어",   fill:"stay here",     fk:"여기 머물다"},
    {ko:"다시 해보고 싶어", fill:"try again",     fk:"다시 해보다"}
  ]},

{ name:"해야 한다고 말하기", frame:"I need to ___.", fko:"~해야 해",
  tip:"want to 와 자리가 똑같습니다. 앞부분만 바꾸면 뜻이 달라집니다.",
  items:[
    {ko:"지금 가야 해",     fill:"go now",          fk:"지금 가다"},
    {ko:"얘기 좀 해야 해",  fill:"talk",            fk:"얘기하다"},
    {ko:"폰 충전해야 해",   fill:"charge my phone", fk:"내 폰 충전하다"},
    {ko:"표를 사야 해",     fill:"buy a ticket",    fk:"표 한 장 사다"},
    {ko:"잠 좀 자야 해",    fill:"get some sleep",  fk:"잠 좀 자다"},
    {ko:"좀 앉아야 해",     fill:"sit down",        fk:"앉다"}
  ]},

{ name:"정중히 부탁하기", frame:"Could you ___?", fko:"~해 주시겠어요?",
  tip:"Can you 보다 정중합니다. 처음 보는 사람에게는 이걸 쓰세요.",
  items:[
    {ko:"다시 말씀해 주시겠어요?",  fill:"say that again", fk:"그걸 다시 말하다"},
    {ko:"천천히 말씀해 주시겠어요?",fill:"speak slowly",   fk:"천천히 말하다"},
    {ko:"적어 주시겠어요?",         fill:"write it down",  fk:"그걸 적다"},
    {ko:"도와주시겠어요?",          fill:"help me",        fk:"나를 돕다"},
    {ko:"잠깐 기다려 주시겠어요?",  fill:"wait a moment",  fk:"잠깐 기다리다"},
    {ko:"보여주시겠어요?",          fill:"show me",        fk:"나에게 보여주다"}
  ]},

{ name:"너무 ~하다고 말하기", frame:"It's too ___.", fko:"너무 ~해요",
  tip:"too 는 '너무 지나치게'입니다. 불평할 때 쓰는 말이에요.",
  items:[
    {ko:"너무 시끄러워요", fill:"loud",      fk:"시끄러운"},
    {ko:"너무 비싸요",     fill:"expensive", fk:"비싼"},
    {ko:"너무 추워요",     fill:"cold",      fk:"추운"},
    {ko:"너무 더워요",     fill:"hot",       fk:"더운"},
    {ko:"너무 작아요",     fill:"small",     fk:"작은"},
    {ko:"너무 멀어요",     fill:"far",       fk:"먼"}
  ]},

{ name:"내 상태 말하기", frame:"I'm ___.", fko:"나 ~해",
  tip:"I'm 뒤에는 '상태'가 옵니다. 가장 많이 쓰는 두 글자예요.",
  items:[
    {ko:"피곤해",       fill:"tired",    fk:"피곤한"},
    {ko:"배고파",       fill:"hungry",   fk:"배고픈"},
    {ko:"목말라",       fill:"thirsty",  fk:"목마른"},
    {ko:"길을 잃었어",  fill:"lost",     fk:"길 잃은"},
    {ko:"늦었어",       fill:"late",     fk:"늦은"},
    {ko:"준비됐어",     fill:"ready",    fk:"준비된"}
  ]},

{ name:"값 묻기", frame:"How much is ___?", fko:"~ 얼마예요?",
  tip:"물건 하나의 값을 물을 때. 여러 개면 How much are these? 가 됩니다.",
  items:[
    {ko:"이거 얼마예요?",      fill:"this",       fk:"이것"},
    {ko:"저거 얼마예요?",      fill:"that",       fk:"저것"},
    {ko:"표 한 장 얼마예요?",  fill:"a ticket",   fk:"표 한 장"},
    {ko:"커피 얼마예요?",      fill:"a coffee",   fk:"커피 한 잔"},
    {ko:"방 하나 얼마예요?",   fill:"a room",     fk:"방 하나"},
    {ko:"전부 얼마예요?",      fill:"everything", fk:"전부"}
  ]}

];
