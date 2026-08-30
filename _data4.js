
/* ══════════════════════════════════════════════════════════════════
   문장 노트 — "왜 이 뜻인가 / 언제 쓰나 / 같은 조각의 다른 쓰임"

   why  : 부품 뜻만 봐서는 안 나오는 문장의 속사정. 통으로 외울 것이면 그렇다고 적는다.
   ex   : 짧은 대화 두 줄. [상대, 나] 순서. 실제로 나올 법한 상황으로.
   tip  : 언제 쓰는지, 헷갈리는 짝과 뭐가 다른지.
   more : 같은 조각이 들어간 다른 표현들. [영어, 뜻]

   먼저 배우는 앞쪽 네 묶음(가장 짧은 말·리액션·덩어리·상태)을 채웠습니다.
   여기 없는 문장은 부품 뜻만으로 충분히 읽히는 것들입니다.
   ══════════════════════════════════════════════════════════════════ */
const NOTES = {

/* ── 가장 짧은 말 ────────────────────────────────────────── */
"Thank you.":{
 why:"Thank 은 '고마워하다'라는 동작입니다. 원래 I thank you(내가 당신에게 고마워한다)인데 앞의 I 가 빠졌어요.",
 ex:[["Here's your coffee.","커피 나왔습니다."],["Thank you.","고맙습니다."]],
 tip:"Thanks. 는 더 편한 사이에 씁니다. 처음 보는 사람에겐 Thank you. 가 무난합니다.",
 more:[["Thanks for waiting.","기다려 주셔서 고맙습니다"],["Thank you so much.","정말 고맙습니다"]]},

"I'm sorry.":{
 why:"sorry 는 '미안한 마음인' 상태를 뜻합니다. I'm = I am(나는 ~이다). 그래서 '나는 미안한 상태다'가 됩니다.",
 ex:[["You're late.","늦으셨네요."],["I'm sorry.","죄송해요."]],
 tip:"안타까울 때도 씁니다. 누가 나쁜 소식을 말하면 I'm sorry. 는 '저런, 안됐다'는 뜻이에요.",
 more:[["Sorry, my fault.","미안, 내 잘못이야"],["Sorry to bother you.","방해해서 죄송해요"]]},

"Me too.":{
 why:"too 가 '~도'입니다. '나도'라는 뜻이 글자에 그대로 들어 있어요. 이건 쪼개서 이해되는 쪽입니다.",
 ex:[["I'm hungry.","배고파."],["Me too.","나도."]],
 tip:"상대가 '~하다'라고 말했을 때만 씁니다. '나 안 배고파(I'm not hungry)'에 맞장구치려면 Me neither. 라고 해요.",
 more:[["Same here.","나도 그래 (거의 같은 말)"],["Me neither.","나도 아니야"]]},

"Not yet.":{
 why:"not(아니다) + yet(아직). '아직 아니다'가 그대로 '아직요'입니다.",
 ex:[["Are you ready?","준비됐어요?"],["Not yet.","아직요."]],
 tip:"반대는 Already.(벌써요). 다 됐으면 All done. 이라고 합니다."},

"Excuse me.":{
 why:"excuse 는 '봐주다, 양해하다'입니다. '저를 좀 봐주세요'가 굳어져서 실례한다는 인사가 됐어요.",
 ex:[["Excuse me, where is the exit?","실례합니다, 출구가 어디예요?"],["Over there.","저쪽이요."]],
 tip:"세 가지 상황에 다 씁니다 — 사람을 부를 때, 사람 앞을 지나갈 때, 못 알아들어 되물을 때. 여행에서 제일 많이 쓰는 두 마디입니다."},

"One moment.":{
 why:"one(하나) + moment(순간). '한 순간만'이 '잠시만요'가 됩니다.",
 ex:[["Can I get a receipt?","영수증 주시겠어요?"],["One moment.","잠시만요."]],
 tip:"One second. / Just a moment. 도 똑같은 뜻입니다.",
 more:[["Hold on a second.","잠깐만"],["Just give me a second.","잠깐만요"]]},

"Over here.":{
 why:"here 는 '여기'인데 앞에 over 가 붙으면 '(저쪽 말고) 이쪽으로'라는 방향이 생깁니다.",
 ex:[["Where are you?","어디 있어?"],["Over here!","여기요!"]],
 tip:"반대는 Over there.(저기요). 손을 들면서 같이 말하면 됩니다.",
 more:[["Right here.","바로 여기"],["Come here.","이리 와"],["Is it far from here?","여기서 멀어요?"]]},

"I don't know.":{
 why:"don't 는 '~하지 않는다'입니다. know(알다) 앞에 붙어 '알지 못한다'가 됩니다.",
 ex:[["What time does it open?","몇 시에 열어요?"],["Sorry, I don't know.","죄송해요, 몰라요."]],
 tip:"그냥 I don't know. 만 하면 퉁명스럽게 들릴 수 있어요. 앞에 Sorry, 를 붙이면 부드러워집니다.",
 more:[["I have no idea.","전혀 모르겠어"],["I'm not sure.","잘 모르겠어"]]},

/* ── 리액션 ──────────────────────────────────────────────── */
"No way.":{
 why:"way 는 '방법, 길'입니다. '그럴 방법이 없다'가 '말도 안 돼'로 굳었어요.",
 ex:[["I won the lottery.","나 복권 됐어."],["No way!","말도 안 돼!"]],
 tip:"놀랄 때와 거절할 때 둘 다 씁니다. 거절이면 '절대 안 돼'라는 강한 뜻이에요.",
 more:[["Which way is the station?","역은 어느 쪽이에요?"],["I'm on my way.","가는 중이야"]]},

"Same here.":{
 why:"부품을 아무리 봐도 안 나옵니다. 원래 It's the same here(여기도 사정이 같다)에서 앞부분이 빠진 말이라고 보면 이해가 쉬워요. 그래서 '나도 그래'가 됩니다. 이건 통째로 외우는 쪽입니다.",
 ex:[["I'm so tired today.","오늘 너무 피곤해."],["Same here.","나도 그래."]],
 tip:"Me too. 와 바꿔 써도 대개 통합니다. 굳이 나누면 Me too. 는 '나도 그렇다', Same here. 는 '내 사정도 똑같다'에 가까워요. 초보 단계에선 같은 말로 여기셔도 됩니다.",
 more:[["Over here.","여기요"],["Right here.","바로 여기"],["The same thing.","같은 것"]]},

"Good point.":{
 why:"point 는 '요점, 콕 짚은 것'입니다. 원래 That's a good point. 인데 앞이 빠졌어요.",
 ex:[["It's cheaper online.","인터넷이 더 싸."],["Good point.","좋은 지적이야."]],
 tip:"상대 말이 맞다고 인정할 때 씁니다. 회의나 대화에서 아주 자주 나와요.",
 more:[["That's not the point.","그게 요점이 아니야"],["Let's get to the point.","본론으로 가자"]]},

"I knew it.":{
 why:"knew 는 know(알다)의 지난 일 형태입니다. '나는 그걸 알고 있었다' → '그럴 줄 알았어'.",
 ex:[["He's not coming.","걔 안 온대."],["I knew it.","그럴 줄 알았어."]],
 tip:"knew 의 k 는 소리 내지 않습니다. '크뉴'가 아니라 '뉴'예요."},

"Never mind.":{
 why:"mind 는 '신경 쓰다'입니다. never(절대 ~않다)가 붙어 '신경 쓰지 마'가 됩니다.",
 ex:[["What did you say?","뭐라고 했어?"],["Never mind.","아니야, 됐어."]],
 tip:"말을 꺼냈다가 거둘 때 제일 많이 씁니다. '됐어, 신경 꺼'가 아니라 부드러운 '아니야'예요."},

"That's crazy.":{
 why:"crazy 는 '미친'이지만 여기선 욕이 아니라 '엄청나다'는 감탄입니다.",
 ex:[["It took ten hours.","열 시간 걸렸어."],["That's crazy.","대박이다."]],
 tip:"좋은 일에도 나쁜 일에도 씁니다. 우리말 '헐, 대박'과 쓰임이 거의 같아요."},

"Fair enough.":{
 why:"fair(공정한) + enough(충분히). '충분히 공정하다' → '그럴 만하네, 인정'.",
 ex:[["I can't go, I'm broke.","나 돈 없어서 못 가."],["Fair enough.","그럴 만하네."]],
 tip:"완전히 동의하는 건 아니지만 받아들일 때 씁니다. 미드에 아주 자주 나와요."},

"Are you serious?":{
 why:"serious 는 '진지한'입니다. '너 진지해?'가 '진심이야?'가 됩니다.",
 ex:[["I quit my job.","나 일 그만뒀어."],["Are you serious?","진심이야?"]],
 tip:"놀랄 때도, 어이없을 때도 씁니다. 말투가 뜻을 정해요."},

/* ── 통째로 외우는 덩어리 ────────────────────────────────── */
"I'm on it.":{
 why:"on 은 '~에 딱 붙어 있는'입니다. '내가 그 일에 붙어 있다' → '지금 하고 있다, 바로 할게'.",
 ex:[["Can you check the room?","방 좀 확인해 줄래요?"],["I'm on it.","바로 할게요."]],
 tip:"일을 시켰을 때 대답으로 씁니다. Okay. 보다 훨씬 미덥게 들려요."},

"It happens.":{
 why:"happen 은 '(일이) 일어나다'입니다. '그런 일은 일어난다' → '그럴 수도 있지'.",
 ex:[["Sorry, I broke it.","미안, 내가 깨뜨렸어."],["It happens.","그럴 수도 있지."]],
 tip:"상대 실수를 대수롭지 않게 넘겨줄 때 씁니다."},

"You got this.":{
 why:"got 은 '잡았다'입니다. '너는 이걸 이미 잡았다' → '넌 할 수 있어'.",
 ex:[["I'm so nervous.","나 너무 떨려."],["You got this.","넌 할 수 있어."]],
 tip:"응원하는 말입니다. 시험이나 발표 앞둔 사람에게 써보세요."},

"Take your time.":{
 why:"take(가지다) + your time(너의 시간). '네 시간을 마음껏 가져라' → '천천히 해'.",
 ex:[["Sorry, I'm slow.","미안해요, 제가 느려서."],["Take your time.","천천히 하세요."]],
 tip:"재촉하지 않는다는 뜻이라 아주 친절하게 들립니다.",
 more:[["How long does it take?","얼마나 걸려요?"],["It takes about an hour.","한 시간쯤 걸려요"]]},

"That was close.":{
 why:"close 는 보통 '가까운'인데, 여기선 '아슬아슬한'입니다. '아슬아슬했다' → '큰일 날 뻔했다'.",
 ex:[["The bus almost left.","버스 거의 떠날 뻔했어."],["That was close.","큰일 날 뻔했다."]],
 tip:"close 를 '클로즈'가 아니라 '클로스'로 읽습니다. 닫다(클로즈)와 소리가 달라요."},

"Suit yourself.":{
 why:"suit 는 '맞추다'입니다. '너 자신한테 맞춰라' → '마음대로 해'.",
 ex:[["I'll just stay home.","난 그냥 집에 있을래."],["Suit yourself.","마음대로 해."]],
 tip:"살짝 서운하거나 시큰둥한 느낌이 섞입니다. 아주 친한 사이에 쓰세요."},

"Tell me about it.":{
 why:"글자대로면 '그것에 대해 말해봐'인데, 실제로는 정반대로 '말 안 해도 안다, 내 말이'라는 맞장구입니다. 대표적으로 통째로 외워야 하는 말이에요.",
 ex:[["This weather is terrible.","날씨 진짜 최악이야."],["Tell me about it.","내 말이."]],
 tip:"진짜로 설명을 부탁하는 걸로 착각하기 쉽습니다. 상대가 불평했을 때 나오면 거의 항상 '내 말이'예요."},

"Hold on a second.":{
 why:"hold on 은 '붙잡고 있다'입니다. 여기서는 '(끊지 말고) 기다려'가 됩니다.",
 ex:[["Are you ready to go?","갈 준비 됐어?"],["Hold on a second.","잠깐만."]],
 tip:"전화에서도 그대로 씁니다. Hold on. 만 해도 됩니다.",
 more:[["One moment.","잠시만요"],["Just give me a second.","잠깐만요"]]},

/* ── 지금 상태 말하기 ────────────────────────────────────── */
"I'm tired.":{
 why:"tired 는 '피곤한' 상태입니다. I'm(나는 ~이다) + 상태. 이 틀에 상태만 갈아끼우면 다 됩니다.",
 ex:[["Want to go out tonight?","오늘 밤에 나갈래?"],["I'm tired.","피곤해."]],
 tip:"I'm ___ 은 하루에 몇 번씩 쓰는 틀입니다. 응용 훈련에 이 틀이 따로 있어요.",
 more:[["I'm hungry.","배고파"],["I'm lost.","길을 잃었어"],["I'm almost done.","거의 다 했어"]]},

"I'm hungry.":{
 why:"hungry 는 '배고픈' 상태입니다. I'm tired. 와 완전히 같은 틀이에요.",
 ex:[["Should we eat something?","뭐 좀 먹을까?"],["Yes, I'm hungry.","응, 배고파."]],
 tip:"목마르면 I'm thirsty. 입니다. 배부르면 I'm full."},

"It's too loud.":{
 why:"too 는 '너무 지나치게'입니다. 그냥 '시끄럽다'가 아니라 '감당이 안 될 만큼 시끄럽다'예요.",
 ex:[["How's the room?","방은 어떠세요?"],["It's too loud.","너무 시끄러워요."]],
 tip:"It's too ___ 는 불평할 때 쓰는 틀입니다. expensive(비싼) cold(추운) small(작은) 을 넣어보세요.",
 more:[["That's too expensive.","너무 비싸요"],["The room is too cold.","방이 너무 추워요"]]},

"I'm almost done.":{
 why:"done 은 '끝난' 상태입니다. almost(거의)가 붙어 '거의 끝난 상태다'가 됩니다.",
 ex:[["Are you finished?","다 했어요?"],["I'm almost done.","거의 다 했어요."]],
 tip:"식당에서 접시를 치워도 되냐고 물으면 이 말로 '아직요, 곧 끝나요'를 전할 수 있습니다."},

"Something's wrong.":{
 why:"Something is 를 줄인 말입니다. '뭔가가 잘못된 상태다' → '뭔가 이상해'.",
 ex:[["You look worried.","걱정돼 보여."],["Something's wrong.","뭔가 이상해."]],
 tip:"기계가 이상하면 Something's wrong with it. 이라고 합니다.",
 more:[["I think this is wrong.","이거 잘못된 것 같아요"],["It's not working.","이거 안 되는데"]]},

"It's not working.":{
 why:"work 는 사람에겐 '일하다'인데 물건에는 '작동하다'입니다. '작동하고 있지 않다' → '안 되는데'.",
 ex:[["Is the wifi okay?","와이파이 괜찮아요?"],["It's not working.","안 되는데요."]],
 tip:"고장 얘기는 거의 이 말로 통합니다. 어려운 단어 필요 없어요.",
 more:[["The wifi is not working.","와이파이가 안 돼요"],["Something's wrong.","뭔가 이상해"]]},

"I'm fine, really.":{
 why:"fine 은 '괜찮은'입니다. really(진짜로)를 뒤에 붙여 '진짜 괜찮다'고 한 번 더 눌러 말한 거예요.",
 ex:[["Are you okay?","괜찮아?"],["I'm fine, really.","괜찮아, 진짜로."]],
 tip:"상대가 걱정할 때 안심시키는 말입니다. really 를 빼면 그냥 형식적인 대답이 돼요."},

"It's up to you.":{
 why:"up to 는 '~에게 달린'입니다. '그건 너에게 달렸다' → '네가 정해'. up 과 to 를 따로 보면 안 나오니 up to 를 한 덩어리로 외우세요.",
 ex:[["Pizza or chicken?","피자 먹을래 치킨 먹을래?"],["It's up to you.","네가 정해."]],
 tip:"you 를 제일 세게 말합니다. '잇츠 업 투 유'에서 마지막 '유'예요."},

/* ── 그 밖에 부품으로는 안 풀리는 것들 ───────────────────── */
"I'd like a coffee, please.":{
 why:"I'd like 는 I would like 를 줄인 말로 '~를 원합니다'의 정중한 형태입니다. I want(원해)보다 훨씬 예의 바르게 들려요.",
 ex:[["What can I get you?","뭐 드릴까요?"],["I'd like a coffee, please.","커피 하나 주세요."]],
 tip:"가게에서 I want 를 쓰면 아이가 떼쓰는 것처럼 들릴 수 있습니다. I'd like 를 쓰세요.",
 more:[["I'd like the same thing.","같은 걸로 주세요"],["I'd like to order now.","지금 주문할게요"]]},

"To go, please.":{
 why:"to go 는 '가지고 갈'이라는 뜻으로 굳은 표현입니다. '가다'가 아니에요.",
 ex:[["For here or to go?","여기서 드세요, 가져가세요?"],["To go, please.","포장해 주세요."]],
 tip:"미국에서는 to go, 영국에서는 takeaway 라고 합니다. 반대는 For here.",
 more:[["For here, please.","여기서 먹을게요"]]},

"For here, please.":{
 why:"for here 는 '여기(가게 안)에서 먹을 것으로'라는 뜻으로 굳은 말입니다. eat 같은 동사가 아예 없어요.",
 ex:[["For here or to go?","여기서 드세요, 가져가세요?"],["For here, please.","여기서 먹을게요."]],
 tip:"카페에서 거의 반드시 듣는 질문입니다. 대답은 For here. 아니면 To go. 둘 중 하나예요.",
 more:[["To go, please.","포장해 주세요"]]},

"Keep the change.":{
 why:"change 는 '변화'가 아니라 여기서는 '거스름돈'입니다. '거스름돈은 가지세요' → '잔돈은 됐어요'.",
 ex:[["That's fifteen dollars.","15달러입니다."],["Keep the change.","잔돈은 됐어요."]],
 tip:"택시나 배달에서 팁을 대신하는 말입니다. change 의 두 가지 뜻을 같이 알아두세요."},

"What's going on?":{
 why:"go on 은 '(일이) 벌어지다'입니다. '무엇이 벌어지고 있나' → '무슨 일이야'.",
 ex:[["Everyone is outside.","다들 밖에 나가 있어."],["What's going on?","무슨 일이야?"]],
 tip:"인사로도 씁니다. 친한 사이에 What's going on? 은 '잘 지내?'에 가까워요."},

"Better late than never.":{
 why:"글자대로면 '절대 안 하는 것보다 늦는 게 낫다'입니다. 우리말 속담처럼 통으로 쓰는 말이에요.",
 ex:[["Sorry I'm so late.","너무 늦어서 미안해."],["Better late than never.","늦더라도 안 오는 것보단 낫지."]],
 tip:"늦은 사람을 너그럽게 받아줄 때, 또는 뭔가를 뒤늦게 시작할 때 씁니다."},

"Long story short, we lost.":{
 why:"Long story short 는 '긴 얘기를 짧게 하면'이 줄어든 말입니다. 앞에 붙여서 '요약하자면'이라는 뜻이 돼요.",
 ex:[["How was the game?","경기 어땠어?"],["Long story short, we lost.","짧게 말하면, 우리가 졌어."]],
 tip:"Long story short, 까지가 한 덩어리입니다. 뒤에 결론만 붙이면 돼요."},

"Sorry, what was that?":{
 why:"that 은 '방금 그 말'을 가리킵니다. '방금 그게 뭐였죠?' → '뭐라고요?'",
 ex:[["The tour leaves at six.","투어는 6시에 출발합니다."],["Sorry, what was that?","죄송해요, 뭐라고요?"]],
 tip:"여행에서 제일 요긴한 말입니다. 못 알아들었을 때 가만히 있지 말고 이걸 쓰세요. that 을 제일 세게 말합니다.",
 more:[["Can you repeat that?","다시 말해줄래요?"],["Could you speak slowly?","천천히 말씀해 주시겠어요?"]]}

};

/* 낱개 뜻을 더해도 결과가 안 나오는 문장들 — 화면에 "통으로 외우는 말"이라고 알려줍니다. */
const IDIOMS = new Set([
  "Same here.", "No way.", "Never mind.", "Fair enough.", "Good point.",
  "Tell me about it.", "Suit yourself.", "It's up to you.", "I'm on it.",
  "You got this.", "That was close.", "Take your time.", "It happens.",
  "Hold on a second.", "To go, please.", "For here, please.", "Keep the change.",
  "Better late than never.", "Long story short, we lost.", "What's going on?",
  "Excuse me.", "Not yet.", "Over here.", "One moment.", "That's crazy."
]);
