
/* ══════════════════════════════════════════════════════════════════
   강세 — 영어는 강세로 알아듣습니다.
   기본 규칙은 '마지막 내용어'(핵강세 규칙). 아래는 규칙이 틀리는 문장만 손으로 잡은 것.
   168문장 중 규칙이 맞는 게 147개, 여기 적힌 게 예외입니다.
   ══════════════════════════════════════════════════════════════════ */
const FN_WORDS = new Set(["i","you","we","he","she","it","they","me","my","your","our","his","her","their",
  "this","that","these","those","a","an","the","to","of","in","on","at","for","from","by","with",
  "about","than","or","and","but","is","are","am","was","were","be","been","do","does","did",
  "can","could","will","would","should","not","no","so","too","one","any","some","much","more",
  "please","thanks",
  "i'm","it's","that's","you're","we're","i'll","i'd","let's","don't","what's","something's",
  "want to","need to","can i","can you","could you","do you","do i","does it","are you","is it",
  "i'd like","i'd like to","let me","do you have","don't have","don't need","i think","i'm going to",
  "are you going to","how much","what time","i'm looking for","don't think","can't","don't speak",
  "what","where","how","which","why","who"]);

const STRESS_FIX = {
  "I'm on it.":"on",
  "It's up to you.":"you",
  "Tell me about it.":"about",
  "How much is this?":"How much",
  "What time is it?":"What time",
  "I don't think so.":"don't think",
  "Sorry, what was that?":"that",
  "That's all, thank you.":"all",
  "Is it far from here?":"far",
  "Do you have wifi here?":"wifi",
  "Can I leave my bags here?":"bags",
  "Can I have one more?":"more",
  "What's going on?":"on",
  "Speaking of which, where is he?":"he"
};

/* ══════════════════════════════════════════════════════════════════
   발음 함정 — 한국 사람이 말했을 때 못 알아듣는 대표 지점.
   덩어리(소문자)로 찾아서 문장마다 최대 2개까지 보여줍니다.
   ══════════════════════════════════════════════════════════════════ */
const TRAPS = {
  "thank":"th 는 혀끝을 앞니 사이에 살짝 물고 바람을 뺍니다. '쌩'도 '땡'도 아닙니다.",
  "think":"th 를 '띵'으로 내면 sink(가라앉다)처럼 들립니다. 혀끝을 이 사이로.",
  "i think":"th 를 '띵'으로 내면 다른 말이 됩니다. 혀끝을 앞니 사이에.",
  "this":"th 는 목을 울리며 혀끝을 이 사이에. '디스'보다 혀가 앞에 나옵니다.",
  "that":"끝의 t 는 '트'라고 소리 내지 말고 혀만 대고 멈춥니다.",
  "that's":"th 를 '댓'으로만 내면 안 통합니다. 혀끝을 이 사이에 대고 시작.",
  "there":"th + r. 한국어에 둘 다 없습니다. 소리를 꼭 듣고 따라 하세요.",
  "thing":"th 를 혀끝으로. '띵'이 아닙니다.",
  "coffee":"f 는 윗니를 아랫입술에 대고 바람. '커피'의 ㅍ 와 다릅니다.",
  "phone":"ph 는 f 소리입니다. 윗니를 아랫입술에.",
  "fine":"f 는 윗니를 아랫입술에. '파인'의 ㅍ 가 아닙니다.",
  "far":"f + r 이 연달아 옵니다. 가장 어려운 조합 중 하나예요.",
  "fault":"f 는 윗니를 아랫입술에 대고 바람을 뺍니다.",
  "for":"f 는 윗니를 아랫입술에. 짧고 약하게 지나갑니다.",
  "wifi":"두 번째 f 를 윗니로 아랫입술을 눌러 내세요.",
  "receipt":"p 는 소리 내지 않습니다. '리씻'입니다.",
  "really":"r 은 혀를 어디에도 대지 않습니다. l 은 혀끝을 윗잇몸에. 두 소리가 붙어 있어요.",
  "right":"r 은 혀를 입천장에 대지 마세요. 대면 light 로 들립니다.",
  "wrong":"w+r. 입술을 동그랗게 모았다가 혀를 대지 않고 r.",
  "room":"r 로 시작합니다. 혀를 대면 loom 이 됩니다.",
  "late":"l 은 혀끝을 윗잇몸에 확실히 붙입니다. 안 붙이면 rate 로 들려요.",
  "look":"l 은 혀끝을 윗잇몸에 붙이고 시작합니다.",
  "looking":"l 은 혀끝을 윗잇몸에. r 과 섞이면 안 됩니다.",
  "lost":"l 은 혀끝을 윗잇몸에 붙입니다.",
  "help":"끝의 lp 를 '프'로 늘리지 마세요. 입술만 다물고 끝냅니다.",
  "please":"끝의 s 는 'ㅅ'가 아니라 목이 울리는 z 소리입니다.",
  "cards":"끝의 ds 는 z 소리. '카즈'에 가깝습니다.",
  "worries":"r 을 혀 대지 않고, 끝은 z 소리.",
  "is":"끝소리는 z 입니다. '이스'가 아니라 '이즈'.",
  "want to":"붙여서 '워너'에 가깝게 흘립니다. 또박또박 끊으면 오히려 어색해요.",
  "get off":"이어서 '게로프'처럼 붙습니다. 끊어 읽지 마세요.",
  "check in":"이어서 '체킨'처럼 붙습니다.",
  "take care of":"'테이크 케어 오브'가 아니라 '테익케어러브'처럼 이어집니다.",
  "about":"앞의 a 는 거의 안 들립니다. '어바웃'의 '어'를 아주 약하게.",
  "second":"끝의 d 를 '드'로 늘리지 마세요. 혀만 대고 끝.",
  "card":"끝의 d 를 '드'로 늘리지 않습니다. '카드'는 2음절, card 는 1음절이에요.",
  "seat":"끝의 t 를 '트'로 늘리면 2음절이 됩니다. 혀만 대고 멈추세요.",
  "want":"끝의 t 를 '트'로 늘리지 마세요. '원트'가 아니라 한 덩어리입니다.",
  "need":"끝의 d 를 '드'로 늘리지 않습니다.",
  "good":"끝의 d 를 '드'로 늘리지 마세요.",
  "bag":"끝의 g 를 '그'로 늘리지 않습니다.",
  "back":"끝의 k 를 '크'로 늘리지 않습니다."
};
const TRAP_NOTE = "한국어는 자음 뒤에 모음을 붙이는 버릇이 있습니다. want 를 '원트'라고 하면 영어로는 두 마디가 되어 못 알아듣습니다.";

/* ══════════════════════════════════════════════════════════════════
   장면 — 실제 대화 흐름. 상대가 말을 걸면 내가 답합니다.
   내 대사는 위 168문장에서 가져왔습니다(연습한 게 그대로 쓰입니다).
   ══════════════════════════════════════════════════════════════════ */
const SCENES = [
{ name:"카페에서 커피 시키기", where:"카페", turns:[
  {w:"them", en:"Hi, what can I get you?",            ko:"안녕하세요, 뭐 드릴까요?"},
  {w:"me",   en:"I'd like a coffee, please.",         ko:"커피 하나 주세요."},
  {w:"them", en:"For here or to go?",                 ko:"여기서 드세요, 가져가세요?"},
  {w:"me",   en:"To go, please.",                     ko:"포장해 주세요."},
  {w:"them", en:"That'll be four dollars.",           ko:"4달러입니다."},
  {w:"me",   en:"Can I pay by card?",                 ko:"카드로 계산해도 될까요?"},
  {w:"them", en:"Sure. Here's your receipt.",         ko:"그럼요. 영수증 여기 있습니다."},
  {w:"me",   en:"Thank you.",                         ko:"고마워요."}
]},

{ name:"길 물어보기", where:"길거리", turns:[
  {w:"them", en:"Hi, can I help you?",                ko:"안녕하세요, 도와드릴까요?"},
  {w:"me",   en:"Which way is the station?",          ko:"역은 어느 쪽이에요?"},
  {w:"them", en:"It's that way, about ten minutes.",  ko:"저쪽이요, 십 분 정도요."},
  {w:"me",   en:"Is it far from here?",               ko:"여기서 멀어요?"},
  {w:"them", en:"Not really. Just go straight.",      ko:"별로요. 쭉 가세요."},
  {w:"me",   en:"Got it, thank you.",                 ko:"알겠습니다, 감사합니다."}
]},

{ name:"호텔 체크인", where:"호텔 프런트", turns:[
  {w:"them", en:"Good evening. Do you have a reservation?", ko:"안녕하세요. 예약하셨나요?"},
  {w:"me",   en:"I have a reservation for tonight.",  ko:"오늘 밤 예약했어요."},
  {w:"them", en:"Your room is on the third floor.",   ko:"방은 3층입니다."},
  {w:"me",   en:"Is breakfast included?",             ko:"조식 포함인가요?"},
  {w:"them", en:"Yes, from seven to ten.",            ko:"네, 7시부터 10시까지요."},
  {w:"me",   en:"What time is check-out?",            ko:"체크아웃 몇 시예요?"},
  {w:"them", en:"Eleven in the morning.",             ko:"오전 11시입니다."},
  {w:"me",   en:"Thank you.",                         ko:"고마워요."}
]},

{ name:"옷 가게에서", where:"옷 가게", turns:[
  {w:"them", en:"Hi, are you looking for something?", ko:"안녕하세요, 찾으시는 거 있으세요?"},
  {w:"me",   en:"I'm just looking, thanks.",          ko:"그냥 구경하는 거예요."},
  {w:"them", en:"Let me know if you need help.",      ko:"도움 필요하시면 말씀하세요."},
  {w:"me",   en:"Do you have this in black?",         ko:"이거 검은색 있어요?"},
  {w:"them", en:"Let me check. Yes, we do.",          ko:"확인해 볼게요. 네, 있습니다."},
  {w:"me",   en:"Can I try it on?",                   ko:"입어봐도 될까요?"},
  {w:"them", en:"Of course, right over there.",       ko:"그럼요, 바로 저쪽이에요."},
  {w:"me",   en:"Thank you.",                         ko:"고마워요."}
]},

{ name:"택시 타기", where:"택시 안", turns:[
  {w:"them", en:"Where to?",                          ko:"어디로 모실까요?"},
  {w:"me",   en:"Please take me to this address.",    ko:"이 주소로 가주세요."},
  {w:"them", en:"Sure. It'll take about twenty minutes.", ko:"네. 20분쯤 걸릴 거예요."},
  {w:"me",   en:"I'm running late.",                  ko:"좀 늦을 것 같아요."},
  {w:"them", en:"I'll do my best.",                   ko:"최선을 다할게요."},
  {w:"me",   en:"Stop here, please.",                 ko:"여기서 세워주세요."},
  {w:"them", en:"That's fifteen dollars.",            ko:"15달러입니다."},
  {w:"me",   en:"Keep the change.",                   ko:"잔돈은 됐어요."}
]},

{ name:"못 알아들었을 때", where:"어디서나", turns:[
  {w:"them", en:"So the tour leaves at six and comes back around nine.", ko:"투어는 6시에 출발해서 9시쯤 돌아옵니다."},
  {w:"me",   en:"Sorry, what was that?",              ko:"죄송해요, 뭐라고요?"},
  {w:"them", en:"The tour leaves at six.",            ko:"투어는 6시에 출발합니다."},
  {w:"me",   en:"Could you speak slowly?",            ko:"천천히 말씀해 주시겠어요?"},
  {w:"them", en:"The tour leaves at six.",            ko:"투어는... 6시에... 출발합니다."},
  {w:"me",   en:"Could you write it down?",           ko:"적어 주시겠어요?"},
  {w:"them", en:"Sure, here you go.",                 ko:"그럼요, 여기요."},
  {w:"me",   en:"Got it, thank you.",                 ko:"알겠습니다, 감사합니다."}
]}
];
