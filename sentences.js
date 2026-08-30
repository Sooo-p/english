/* ══════════════════════════════════════════════════════════════════
   문장 데이터
   한 줄 = [영어, 뜻, 한글발음, [뜻덩어리...]]
   뜻덩어리는 "영어|한국어뜻". 이어붙이면 영어 문장이 됩니다(구두점 제외).
   묶음 순서 = 배우는 순서. 위쪽일수록 쉽습니다.
   ══════════════════════════════════════════════════════════════════ */
const GROUPS = [

{t:"가장 짧은 말", s:[
 ["Thank you.","고마워요.","쌩 큐",["Thank|고맙다","you|너에게"]],
 ["I'm sorry.","미안해요.","아임 쏘리",["I'm|나는 ~이다","sorry|미안한"]],
 ["Me too.","나도요.","미 투",["Me|나","too|~도"]],
 ["Not yet.","아직요.","낫 옛",["Not|아니다","yet|아직"]],
 ["Excuse me.","실례합니다.","익스큐즈 미",["Excuse|봐주다","me|나를"]],
 ["One moment.","잠시만요.","원 모먼트",["One|하나","moment|순간"]],
 ["Over here.","여기요.","오버 히어",["Over|~쪽으로","here|여기"]],
 ["I don't know.","몰라요.","아이 돈 노우",["I|나는","don't|~않다","know|알다"]]]},

{t:"리액션  ·  미드 단골", s:[
 ["No way.","말도 안 돼.","노 웨이",["No|아니다","way|방법"]],
 ["Same here.","나도 그래.","쎄임 히어",["Same|같다","here|여기도"]],
 ["Good point.","좋은 지적이야.","굿 포인트",["Good|좋은","point|지적"]],
 ["I knew it.","그럴 줄 알았어.","아이 뉴 잇",["I|나는","knew|알았다","it|그걸"]],
 ["Never mind.","신경 쓰지 마.","네버 마인드",["Never|절대 ~않다","mind|신경 쓰다"]],
 ["That's crazy.","대박이다.","댓츠 크레이지",["That's|그건 ~이다","crazy|미친"]],
 ["Fair enough.","그럴 만하네.","페어 이너프",["Fair|공정한","enough|충분히"]],
 ["Are you serious?","진심이야?","아 유 씨리어스",["Are you|너는 ~이니","serious|진지한"]]]},

{t:"통째로 외우는 덩어리", s:[
 ["I'm on it.","바로 할게.","아임 온 잇",["I'm|나는 ~이다","on|~에 붙어","it|그것"]],
 ["It happens.","그럴 수도 있지.","잇 해픈스",["It|그것은","happens|일어난다"]],
 ["You got this.","넌 할 수 있어.","유 갓 디스",["You|너는","got|잡았다","this|이걸"]],
 ["Take your time.","천천히 해.","테이크 유어 타임",["Take|가져라","your|너의","time|시간"]],
 ["That was close.","큰일 날 뻔했다.","댓 워즈 클로스",["That|그건","was|~였다","close|아슬아슬한"]],
 ["Suit yourself.","마음대로 해.","숱 유어셀프",["Suit|맞추다","yourself|너 자신에게"]],
 ["Tell me about it.","내 말이.","텔 미 어바웃 잇",["Tell|말해","me|나에게","about|~에 대해","it|그것"]],
 ["Hold on a second.","잠깐만.","홀드 온 어 쎄컨드",["Hold|잡고 있어","on|계속","a|한","second|초"]]]},

{t:"지금 상태 말하기", s:[
 ["I'm tired.","피곤해.","아임 타이어드",["I'm|나는 ~이다","tired|피곤한"]],
 ["I'm hungry.","배고파.","아임 헝그리",["I'm|나는 ~이다","hungry|배고픈"]],
 ["It's too loud.","너무 시끄러워.","잇츠 투 라우드",["It's|그건 ~이다","too|너무","loud|시끄러운"]],
 ["I'm almost done.","거의 다 했어.","아임 올모스트 던",["I'm|나는 ~이다","almost|거의","done|끝난"]],
 ["Something's wrong.","뭔가 이상해.","썸띵스 롱",["Something's|뭔가가 ~이다","wrong|잘못된"]],
 ["It's not working.","이거 안 되는데.","잇츠 낫 워킹",["It's|그건 ~이다","not|아닌","working|작동하는"]],
 ["I'm fine, really.","괜찮아, 진짜로.","아임 파인 리얼리",["I'm|나는 ~이다","fine|괜찮은","really|진짜로"]],
 ["It's up to you.","네가 정해.","잇츠 업 투 유",["It's|그건 ~이다","up to|~에 달린","you|너"]]]},

{t:"~하고 싶어  ·  I want to", s:[
 ["I want to sleep.","자고 싶어.","아이 원 투 슬립",["I|나는","want to|~하고 싶다","sleep|자다"]],
 ["I want to go home.","집에 가고 싶어.","아이 원 투 고 홈",["I|나는","want to|~하고 싶다","go|가다","home|집에"]],
 ["I want to try this.","이거 해보고 싶어.","아이 원 투 트라이 디스",["I|나는","want to|~하고 싶다","try|해보다","this|이것"]],
 ["I don't want to go.","가기 싫어.","아이 돈 원 투 고",["I|나는","don't|~않다","want to|~하고 싶다","go|가다"]],
 ["I want to eat something.","뭐 좀 먹고 싶어.","아이 원 투 잇 썸띵",["I|나는","want to|~하고 싶다","eat|먹다","something|뭔가"]],
 ["I want to take a rest.","좀 쉬고 싶어.","아이 원 투 테이크 어 레스트",["I|나는","want to|~하고 싶다","take|가지다","a|한","rest|휴식"]],
 ["Do you want to come?","같이 갈래?","두 유 원 투 컴",["Do you|너는 ~하니","want to|~하고 싶다","come|오다"]],
 ["What do you want to do?","뭐 하고 싶어?","왓 두 유 원 투 두",["What|무엇을","do you|너는 ~하니","want to|~하고 싶다","do|하다"]]]},

{t:"내가 할게  ·  Let me / I'll", s:[
 ["Let me check.","내가 확인해 볼게.","렛 미 첵",["Let me|내가 ~할게","check|확인하다"]],
 ["Let me try.","내가 해볼게.","렛 미 트라이",["Let me|내가 ~할게","try|해보다"]],
 ["Let me know.","알려줘.","렛 미 노우",["Let me|내가 ~하게 해줘","know|알다"]],
 ["I'll pay.","내가 낼게.","아일 페이",["I'll|나는 ~할 거야","pay|돈 내다"]],
 ["I'll be right back.","금방 올게.","아일 비 라잇 백",["I'll|나는 ~할 거야","be|있다","right|바로","back|돌아와"]],
 ["I'll take care of it.","내가 처리할게.","아일 테이크 케어 오브 잇",["I'll|나는 ~할 거야","take care of|처리하다","it|그것을"]],
 ["Let me think about it.","좀 생각해 볼게.","렛 미 띵크 어바웃 잇",["Let me|내가 ~할게","think|생각하다","about|~에 대해","it|그것"]],
 ["Just give me a second.","잠깐만.","저스트 기브 미 어 쎄컨드",["Just|그냥","give|줘","me|나에게","a|한","second|초"]]]},

{t:"~해도 될까요?  ·  Can I", s:[
 ["Can I sit here?","여기 앉아도 될까요?","캔 아이 씻 히어",["Can I|~해도 될까요","sit|앉다","here|여기"]],
 ["Can you help me?","좀 도와주시겠어요?","캔 유 헬프 미",["Can you|~해 주시겠어요","help|돕다","me|나를"]],
 ["Can I try it on?","입어봐도 될까요?","캔 아이 트라이 잇 온",["Can I|~해도 될까요","try|해보다","it|그걸","on|몸에"]],
 ["Can I take a photo?","사진 찍어도 될까요?","캔 아이 테이크 어 포토",["Can I|~해도 될까요","take|찍다","a|한","photo|사진"]],
 ["Can I get a receipt?","영수증 주시겠어요?","캔 아이 겟 어 리씻",["Can I|~해도 될까요","get|받다","a|한","receipt|영수증"]],
 ["Can I have one more?","하나 더 주시겠어요?","캔 아이 해브 원 모어",["Can I|~해도 될까요","have|가지다","one|하나","more|더"]],
 ["Can I use the wifi?","와이파이 써도 될까요?","캔 아이 유즈 더 와이파이",["Can I|~해도 될까요","use|쓰다","the|그","wifi|와이파이"]],
 ["Can I pay by card?","카드로 계산해도 될까요?","캔 아이 페이 바이 카드",["Can I|~해도 될까요","pay|돈 내다","by|~로","card|카드"]]]},

{t:"길 찾기  ·  Where", s:[
 ["Where is the exit?","출구가 어디예요?","웨어 이즈 디 엑싯",["Where|어디","is|있나요","the|그","exit|출구"]],
 ["I'm lost.","길을 잃었어요.","아임 로스트",["I'm|나는 ~이다","lost|길 잃은"]],
 ["Where are we now?","여기가 어디예요?","웨어 아 위 나우",["Where|어디","are|있나요","we|우리가","now|지금"]],
 ["Is it far from here?","여기서 멀어요?","이즈 잇 파 프롬 히어",["Is it|그건 ~인가요","far|먼","from|~에서","here|여기"]],
 ["Where do I get off?","어디서 내려요?","웨어 두 아이 겟 오프",["Where|어디서","do I|내가 ~하나요","get off|내리다"]],
 ["How do I get there?","거기 어떻게 가요?","하우 두 아이 겟 데어",["How|어떻게","do I|내가 ~하나요","get|가다","there|거기"]],
 ["Where is the bathroom?","화장실이 어디예요?","웨어 이즈 더 배쓰룸",["Where|어디","is|있나요","the|그","bathroom|화장실"]],
 ["Which way is the station?","역은 어느 쪽이에요?","위치 웨이 이즈 더 스테이션",["Which|어느","way|쪽","is|인가요","the|그","station|역"]]]},

{t:"돈 계산  ·  How much", s:[
 ["How much is this?","이거 얼마예요?","하우 머치 이즈 디스",["How much|얼마","is|인가요","this|이것"]],
 ["That's too expensive.","너무 비싸요.","댓츠 투 익스펜시브",["That's|그건 ~이다","too|너무","expensive|비싼"]],
 ["Keep the change.","잔돈은 됐어요.","킵 더 체인지",["Keep|가지세요","the|그","change|잔돈"]],
 ["How much for two?","두 개에 얼마예요?","하우 머치 포 투",["How much|얼마","for|~에","two|두 개"]],
 ["Do you take cards?","카드 받으세요?","두 유 테이크 카즈",["Do you|~하시나요","take|받다","cards|카드를"]],
 ["Can I get a discount?","깎아주실 수 있어요?","캔 아이 겟 어 디스카운트",["Can I|~해도 될까요","get|받다","a|한","discount|할인"]],
 ["How much is it in total?","전부 얼마예요?","하우 머치 이즈 잇 인 토탈",["How much|얼마","is|인가요","it|그게","in|~로","total|전부"]],
 ["I think there's a mistake.","계산이 잘못된 것 같아요.","아이 띵크 데어즈 어 미스테이크",["I think|~인 것 같아요","there's|~가 있다","a|하나","mistake|잘못된 것"]]]},

{t:"있어요?  ·  Do you have", s:[
 ["Do you have a charger?","충전기 있어요?","두 유 해브 어 차저",["Do you have|~있나요","a|한","charger|충전기"]],
 ["Do you have any water?","물 있어요?","두 유 해브 애니 워터",["Do you have|~있나요","any|아무","water|물"]],
 ["Do you have wifi here?","여기 와이파이 있어요?","두 유 해브 와이파이 히어",["Do you have|~있나요","wifi|와이파이","here|여기"]],
 ["I have a reservation.","예약했어요.","아이 해브 어 레저베이션",["I|나는","have|가지고 있다","a|한","reservation|예약을"]],
 ["Do you have this in black?","이거 검은색 있어요?","두 유 해브 디스 인 블랙",["Do you have|~있나요","this|이거","in|~색으로","black|검정"]],
 ["Do you have a smaller size?","더 작은 사이즈 있어요?","두 유 해브 어 스몰러 사이즈",["Do you have|~있나요","a|한","smaller|더 작은","size|사이즈"]],
 ["Do you have a table for two?","두 명 자리 있어요?","두 유 해브 어 테이블 포 투",["Do you have|~있나요","a|한","table|테이블","for|~용","two|두 명"]],
 ["We don't have much time.","시간이 별로 없어.","위 돈 해브 머치 타임",["We|우리는","don't have|없다","much|많은","time|시간이"]]]},

{t:"주문하기  ·  I'd like", s:[
 ["To go, please.","포장해 주세요.","투 고 플리즈",["To go|가지고 갈","please|부탁해요"]],
 ["For here, please.","여기서 먹을게요.","포 히어 플리즈",["For here|여기서 먹을","please|부탁해요"]],
 ["No ice, please.","얼음은 빼주세요.","노 아이스 플리즈",["No|없이","ice|얼음","please|부탁해요"]],
 ["That's all, thank you.","이거면 됐어요.","댓츠 올 쌩 큐",["That's|그게","all|전부","thank|고맙다","you|너에게"]],
 ["I'd like a coffee, please.","커피 하나 주세요.","아이드 라이크 어 커피 플리즈",["I'd like|~주세요","a|한","coffee|커피","please|부탁해요"]],
 ["I'd like the same thing.","같은 걸로 주세요.","아이드 라이크 더 쎄임 띵",["I'd like|~주세요","the|그","same|같은","thing|것"]],
 ["What do you recommend?","뭐가 맛있어요?","왓 두 유 레커멘드",["What|무엇을","do you|~하시나요","recommend|추천하다"]],
 ["I'd like to order now.","지금 주문할게요.","아이드 라이크 투 오더 나우",["I'd like to|~하고 싶어요","order|주문하다","now|지금"]]]},

{t:"~해야 해  ·  I need to", s:[
 ["I need some help.","도움이 좀 필요해요.","아이 니드 썸 헬프",["I|나는","need|필요하다","some|약간의","help|도움이"]],
 ["We need to talk.","우리 얘기 좀 해.","위 니드 투 톡",["We|우리는","need to|~해야 한다","talk|얘기하다"]],
 ["I need to go now.","지금 가야 해.","아이 니드 투 고 나우",["I|나는","need to|~해야 한다","go|가다","now|지금"]],
 ["You need to see this.","이거 봐야 해.","유 니드 투 씨 디스",["You|너는","need to|~해야 한다","see|보다","this|이걸"]],
 ["Do I need a ticket?","표가 필요한가요?","두 아이 니드 어 티켓",["Do I|내가 ~하나요","need|필요하다","a|한","ticket|표가"]],
 ["I don't need a bag.","봉투는 필요 없어요.","아이 돈 니드 어 백",["I|나는","don't need|필요 없다","a|한","bag|봉투가"]],
 ["I need to charge my phone.","폰 충전해야 해.","아이 니드 투 차지 마이 폰",["I|나는","need to|~해야 한다","charge|충전하다","my|나의","phone|폰을"]],
 ["I need to use the bathroom.","화장실 좀 가야 해요.","아이 니드 투 유즈 더 배쓰룸",["I|나는","need to|~해야 한다","use|쓰다","the|그","bathroom|화장실을"]]]},

{t:"시간  ·  What time", s:[
 ["What time is it?","지금 몇 시예요?","왓 타임 이즈 잇",["What time|몇 시","is|인가요","it|지금"]],
 ["I'm running late.","좀 늦을 것 같아요.","아임 러닝 레이트",["I'm|나는 ~이다","running|달리는","late|늦게"]],
 ["What time do you open?","몇 시에 열어요?","왓 타임 두 유 오픈",["What time|몇 시에","do you|~하시나요","open|열다"]],
 ["How long does it take?","얼마나 걸려요?","하우 롱 더즈 잇 테이크",["How long|얼마나 오래","does it|그게 ~하나요","take|걸리다"]],
 ["It takes about an hour.","한 시간쯤 걸려요.","잇 테익스 어바웃 언 아워",["It|그건","takes|걸린다","about|대략","an|한","hour|시간"]],
 ["Are you open tomorrow?","내일 문 여세요?","아 유 오픈 투모로우",["Are you|~하시나요","open|문 연","tomorrow|내일"]],
 ["What time does it start?","몇 시에 시작해요?","왓 타임 더즈 잇 스타트",["What time|몇 시에","does it|그게 ~하나요","start|시작하다"]],
 ["I'll be there in ten minutes.","십 분 뒤에 도착해요.","아일 비 데어 인 텐 미닛츠",["I'll|나는 ~할 거예요","be|있다","there|거기","in|~후에","ten|십","minutes|분"]]]},

{t:"못 알아들었을 때", s:[
 ["Got it, thank you.","알겠습니다, 감사합니다.","갓 잇 쌩 큐",["Got|알아들었다","it|그걸","thank|고맙다","you|너에게"]],
 ["Sorry, what was that?","죄송해요, 뭐라고요?","쏘리 왓 워즈 댓",["Sorry|미안해요","what|무엇","was|였나요","that|그게"]],
 ["Can you repeat that?","다시 한번 말해줄래요?","캔 유 리핏 댓",["Can you|~해 주시겠어요","repeat|반복하다","that|그걸"]],
 ["Could you speak slowly?","천천히 말씀해 주시겠어요?","쿠드 유 스픽 슬로울리",["Could you|~해 주시겠어요","speak|말하다","slowly|천천히"]],
 ["Do you mean this one?","이거 말씀이세요?","두 유 민 디스 원",["Do you|~하시나요","mean|뜻하다","this|이","one|것"]],
 ["Sorry, I don't understand.","죄송해요, 못 알아들었어요.","쏘리 아이 돈 언더스탠드",["Sorry|미안해요","I|나는","don't|~않다","understand|이해하다"]],
 ["Could you write it down?","적어 주시겠어요?","쿠드 유 라잇 잇 다운",["Could you|~해 주시겠어요","write|쓰다","it|그걸","down|아래로"]],
 ["I don't speak English well.","영어를 잘 못해요.","아이 돈 스픽 잉글리시 웰",["I|나는","don't|~않다","speak|말하다","English|영어를","well|잘"]]]},

{t:"고마움·미안함", s:[
 ["No worries.","괜찮아요.","노 워리즈",["No|없어요","worries|걱정"]],
 ["Sorry, my fault.","미안, 내 잘못이야.","쏘리 마이 폴트",["Sorry|미안","my|나의","fault|잘못"]],
 ["I appreciate it.","정말 감사합니다.","아이 어프리시에잇 잇",["I|나는","appreciate|고맙게 여기다","it|그걸"]],
 ["Thanks for waiting.","기다려 주셔서 감사합니다.","쌩스 포 웨이팅",["Thanks|고마워요","for|~에 대해","waiting|기다려준 것"]],
 ["Sorry to bother you.","방해해서 죄송해요.","쏘리 투 바더 유",["Sorry|미안해요","to bother|귀찮게 해서","you|당신을"]],
 ["Don't worry about it.","신경 쓰지 마세요.","돈 워리 어바웃 잇",["Don't|~하지 마","worry|걱정하다","about|~에 대해","it|그걸"]],
 ["Thanks for letting me know.","알려줘서 고마워.","쌩스 포 레팅 미 노우",["Thanks|고마워","for|~에 대해","letting|~하게 해준 것","me|나를","know|알다"]],
 ["Thanks anyway.","그래도 고마워요.","쌩스 애니웨이",["Thanks|고마워요","anyway|그래도"]]]},

{t:"생각 말하기  ·  I think", s:[
 ["I think so too.","나도 그렇게 생각해.","아이 띵크 쏘 투",["I think|~라고 생각해","so|그렇게","too|나도"]],
 ["I don't think so.","난 아닌 것 같아.","아이 돈 띵크 쏘",["I|나는","don't think|생각 안 해","so|그렇게"]],
 ["I have no idea.","전혀 모르겠어.","아이 해브 노 아이디어",["I|나는","have|가지다","no|하나도 없는","idea|생각"]],
 ["That makes sense.","그거 말 되네.","댓 메익스 쎈스",["That|그건","makes|만든다","sense|말이 됨을"]],
 ["I'm not sure yet.","아직 잘 모르겠어.","아임 낫 슈어 옛",["I'm|나는 ~이다","not|아닌","sure|확실한","yet|아직"]],
 ["Maybe you're right.","네 말이 맞을지도.","메이비 유어 라잇",["Maybe|아마","you're|너는 ~이다","right|맞은"]],
 ["I think you're right.","네 말이 맞는 것 같아.","아이 띵크 유어 라잇",["I think|~인 것 같아","you're|너는 ~이다","right|맞은"]],
 ["It looks good to me.","난 괜찮아 보여.","잇 룩스 굿 투 미",["It|그건","looks|보인다","good|좋게","to|~에게","me|나"]]]},

{t:"~할 거야  ·  going to", s:[
 ["I'm on my way.","지금 가는 중이야.","아임 온 마이 웨이",["I'm|나는 ~이다","on|~위에","my|나의","way|가는 길"]],
 ["I'm going to bed.","나 자러 갈게.","아임 고잉 투 베드",["I'm going to|나는 ~로 간다","bed|잠자리"]],
 ["We're almost there.","거의 다 왔어.","위어 올모스트 데어",["We're|우리는 ~이다","almost|거의","there|거기"]],
 ["I'll see you tomorrow.","내일 보자.","아일 씨 유 투모로우",["I'll|나는 ~할 거야","see|보다","you|너를","tomorrow|내일"]],
 ["I'm going to be late.","나 늦을 것 같아.","아임 고잉 투 비 레이트",["I'm going to|나는 ~할 거야","be|~이다","late|늦은"]],
 ["Are you coming or not?","올 거야 말 거야?","아 유 커밍 오어 낫",["Are you|너는 ~하니","coming|오는","or|아니면","not|아닌지"]],
 ["I'm not going anywhere.","나 아무 데도 안 가.","아임 낫 고잉 애니웨어",["I'm|나는 ~이다","not|아닌","going|가는","anywhere|아무 데로도"]],
 ["What are you going to do?","너 어떻게 할 거야?","왓 아 유 고잉 투 두",["What|무엇을","are you going to|너는 ~할 거니","do|하다"]]]},

{t:"찾기·잃어버림", s:[
 ["This is not mine.","이거 제 거 아니에요.","디스 이즈 낫 마인",["This|이건","is|~이다","not|아닌","mine|내 것"]],
 ["I lost my phone.","폰을 잃어버렸어요.","아이 로스트 마이 폰",["I|나는","lost|잃어버렸다","my|나의","phone|폰을"]],
 ["Is this seat taken?","여기 자리 있어요?","이즈 디스 씻 테이큰",["Is|~인가요","this|이","seat|자리가","taken|차지된"]],
 ["I can't find my seat.","제 자리를 못 찾겠어요.","아이 캔트 파인드 마이 씻",["I|나는","can't|~못한다","find|찾다","my|나의","seat|자리를"]],
 ["I'm just looking, thanks.","그냥 구경하는 거예요.","아임 저스트 룩킹 쌩스",["I'm|나는 ~이다","just|그냥","looking|보는 중","thanks|고마워요"]],
 ["I'm looking for my bag.","제 가방을 찾고 있어요.","아임 룩킹 포 마이 백",["I'm looking for|~를 찾고 있어요","my|나의","bag|가방을"]],
 ["I'm looking for this address.","이 주소를 찾고 있어요.","아임 룩킹 포 디스 어드레스",["I'm looking for|~를 찾고 있어요","this|이","address|주소를"]],
 ["Where can I buy a ticket?","표는 어디서 사요?","웨어 캔 아이 바이 어 티켓",["Where|어디서","can I|내가 ~할 수 있나요","buy|사다","a|한","ticket|표를"]]]},

{t:"~해 주시겠어요?  ·  Could you", s:[
 ["Stop here, please.","여기서 세워주세요.","스탑 히어 플리즈",["Stop|멈춰요","here|여기서","please|부탁해요"]],
 ["One ticket, please.","표 한 장 주세요.","원 티켓 플리즈",["One|한 장","ticket|표","please|부탁해요"]],
 ["Could you call a taxi?","택시 좀 불러주시겠어요?","쿠드 유 콜 어 택시",["Could you|~해 주시겠어요","call|부르다","a|한","taxi|택시를"]],
 ["Could you say that again?","다시 말씀해 주시겠어요?","쿠드 유 쎄이 댓 어겐",["Could you|~해 주시겠어요","say|말하다","that|그걸","again|다시"]],
 ["Could you give me a minute?","잠깐만 시간 주시겠어요?","쿠드 유 기브 미 어 미닛",["Could you|~해 주시겠어요","give|주다","me|나에게","a|일","minute|분"]],
 ["Could you show me the menu?","메뉴판 좀 보여주시겠어요?","쿠드 유 쇼 미 더 메뉴",["Could you|~해 주시겠어요","show|보여주다","me|나에게","the|그","menu|메뉴판을"]],
 ["Could you take our picture?","저희 사진 좀 찍어주시겠어요?","쿠드 유 테이크 아워 픽쳐",["Could you|~해 주시겠어요","take|찍다","our|우리의","picture|사진을"]],
 ["Please take me to this address.","이 주소로 가주세요.","플리즈 테이크 미 투 디스 어드레스",["Please|부탁해요","take|데려가다","me|나를","to|~로","this|이","address|주소"]]]},

{t:"호텔·버스", s:[
 ["Is breakfast included?","조식 포함인가요?","이즈 브렉퍼스트 인클루디드",["Is|~인가요","breakfast|아침 식사가","included|포함된"]],
 ["What time is check-out?","체크아웃 몇 시예요?","왓 타임 이즈 체크아웃",["What time|몇 시","is|인가요","check-out|체크아웃이"]],
 ["The room is too cold.","방이 너무 추워요.","더 룸 이즈 투 콜드",["The|그","room|방이","is|~이다","too|너무","cold|추운"]],
 ["Can I check in early?","일찍 체크인 할 수 있어요?","캔 아이 첵 인 얼리",["Can I|~할 수 있나요","check in|체크인하다","early|일찍"]],
 ["Can I leave my bags here?","짐 좀 맡겨도 될까요?","캔 아이 리브 마이 백스 히어",["Can I|~해도 될까요","leave|두다","my|나의","bags|짐을","here|여기"]],
 ["Does this bus go downtown?","이 버스 시내 가나요?","더즈 디스 버스 고 다운타운",["Does|~하나요","this|이","bus|버스가","go|가다","downtown|시내로"]],
 ["The wifi is not working.","와이파이가 안 돼요.","더 와이파이 이즈 낫 워킹",["The|그","wifi|와이파이가","is|~이다","not|아닌","working|작동하는"]],
 ["I have a reservation for tonight.","오늘 밤 예약했어요.","아이 해브 어 레저베이션 포 투나잇",["I|나는","have|가지고 있다","a|한","reservation|예약을","for|~에 대한","tonight|오늘 밤"]]]},

{t:"공항에서", s:[
 ["Just this bag.","이 가방만요.","저스트 디스 백",["Just|오직","this|이","bag|가방"]],
 ["For one week.","일주일이요.","포 원 위크",["For|~동안","one|한","week|주"]],
 ["Window seat, please.","창가 자리로 주세요.","윈도우 씻 플리즈",["Window|창가","seat|자리","please|부탁해요"]],
 ["Where is gate twelve?","12번 게이트가 어디예요?","웨어 이즈 게이트 트웰브",["Where|어디","is|있나요","gate|게이트","twelve|12번"]],
 ["Is the flight on time?","비행기 제시간에 가나요?","이즈 더 플라잇 온 타임",["Is|~인가요","the|그","flight|비행기가","on time|제시간인"]],
 ["I'm here on vacation.","여행 왔어요.","아임 히어 온 베케이션",["I'm|나는 ~이다","here|여기","on vacation|휴가로"]],
 ["Where is the baggage claim?","짐 찾는 곳이 어디예요?","웨어 이즈 더 배기지 클레임",["Where|어디","is|있나요","the|그","baggage claim|짐 찾는 곳"]],
 ["Where is the check-in counter?","체크인 카운터가 어디예요?","웨어 이즈 더 체크인 카운터",["Where|어디","is|있나요","the|그","check-in counter|체크인 카운터"]]]},

{t:"식당에서", s:[
 ["Check, please.","계산서 주세요.","첵 플리즈",["Check|계산서","please|부탁해요"]],
 ["What's this?","이건 뭐예요?","왓츠 디스",["What's|무엇이다","this|이것"]],
 ["Is it spicy?","매워요?","이즈 잇 스파이시",["Is it|그건 ~인가요","spicy|매운"]],
 ["I'll have this one.","이걸로 할게요.","아일 해브 디스 원",["I'll|나는 ~할게요","have|가지다","this|이","one|것"]],
 ["It was delicious.","맛있었어요.","잇 워즈 딜리셔스",["It|그건","was|~였다","delicious|맛있는"]],
 ["Can we sit outside?","밖에 앉아도 될까요?","캔 위 씻 아웃사이드",["Can we|우리가 ~해도 될까요","sit|앉다","outside|밖에"]],
 ["A table for two, please.","두 명 자리 주세요.","어 테이블 포 투 플리즈",["A|한","table|테이블","for|~용","two|두 명","please|부탁해요"]],
 ["Could we get some water?","물 좀 주시겠어요?","쿠드 위 겟 썸 워터",["Could we|우리가 ~해도 될까요","get|받다","some|약간의","water|물"]]]},

{t:"아프거나 곤란할 때", s:[
 ["It hurts here.","여기가 아파요.","잇 헐츠 히어",["It|그게","hurts|아프다","here|여기"]],
 ["My phone is dead.","폰 배터리가 없어요.","마이 폰 이즈 데드",["My|나의","phone|폰이","is|~이다","dead|꺼진"]],
 ["I don't feel well.","몸이 안 좋아요.","아이 돈 필 웰",["I|나는","don't|~않다","feel|느끼다","well|좋게"]],
 ["I need a doctor.","의사가 필요해요.","아이 니드 어 닥터",["I|나는","need|필요하다","a|한","doctor|의사가"]],
 ["I missed my bus.","버스를 놓쳤어요.","아이 미스드 마이 버스",["I|나는","missed|놓쳤다","my|나의","bus|버스를"]],
 ["I lost my passport.","여권을 잃어버렸어요.","아이 로스트 마이 패스포트",["I|나는","lost|잃어버렸다","my|나의","passport|여권을"]],
 ["Where is the pharmacy?","약국이 어디예요?","웨어 이즈 더 파머시",["Where|어디","is|있나요","the|그","pharmacy|약국"]],
 ["Please call the police.","경찰 좀 불러주세요.","플리즈 콜 더 폴리스",["Please|부탁해요","call|부르다","the|그","police|경찰"]]]},

{t:"처음 만난 사람과", s:[
 ["Nice to meet you.","만나서 반가워요.","나이스 투 미츄",["Nice|좋은","to meet|만나서","you|당신을"]],
 ["See you later.","또 봐요.","씨 유 레이터",["See|보다","you|당신을","later|나중에"]],
 ["Where are you from?","어디서 오셨어요?","웨어 아 유 프롬",["Where|어디","are you|당신은 ~인가요","from|~에서 온"]],
 ["I'm from Korea.","한국에서 왔어요.","아임 프롬 코리아",["I'm|나는 ~이다","from|~에서 온","Korea|한국"]],
 ["Are you from here?","여기 사세요?","아 유 프롬 히어",["Are you|당신은 ~인가요","from|~에서 온","here|여기"]],
 ["What do you do?","무슨 일 하세요?","왓 두 유 두",["What|무엇을","do you|당신은 ~하나요","do|하다"]],
 ["This is my first time.","여기 처음이에요.","디스 이즈 마이 퍼스트 타임",["This|이건","is|~이다","my|나의","first|첫","time|번"]],
 ["Have a good day.","좋은 하루 보내세요.","해브 어 굿 데이",["Have|가져요","a|한","good|좋은","day|하루를"]]]},

{t:"쇼핑·계산대", s:[
 ["I'll take it.","이걸로 할게요.","아일 테이크 잇",["I'll|나는 ~할게요","take|가져가다","it|그것"]],
 ["Can I have a bag?","봉투 하나 주시겠어요?","캔 아이 해브 어 백",["Can I|~해도 될까요","have|가지다","a|한","bag|봉투"]],
 ["Can I look around?","좀 둘러봐도 될까요?","캔 아이 룩 어라운드",["Can I|~해도 될까요","look around|둘러보다"]],
 ["I'll pay in cash.","현금으로 낼게요.","아일 페이 인 캐시",["I'll|나는 ~할게요","pay|돈 내다","in|~로","cash|현금"]],
 ["Can I return this?","이거 환불돼요?","캔 아이 리턴 디스",["Can I|~해도 될까요","return|돌려주다","this|이것"]],
 ["I'll think about it.","좀 생각해 볼게요.","아일 띵크 어바웃 잇",["I'll|나는 ~할게요","think|생각하다","about|~에 대해","it|그것"]],
 ["Where is the fitting room?","탈의실이 어디예요?","웨어 이즈 더 피팅 룸",["Where|어디","is|있나요","the|그","fitting room|탈의실"]],
 ["Do you have this in medium?","이거 중간 사이즈 있어요?","두 유 해브 디스 인 미디엄",["Do you have|~있나요","this|이거","in|~로","medium|중간 사이즈"]]]},

{t:"대화 굴리기  ·  미드 단골", s:[
 ["What's going on?","무슨 일이야?","왓츠 고잉 온",["What's|무엇이 ~이다","going|벌어지는","on|계속"]],
 ["What do you mean?","무슨 뜻이야?","왓 두 유 민",["What|무엇을","do you|너는 ~하니","mean|뜻하다"]],
 ["That's not the point.","그게 요점이 아니야.","댓츠 낫 더 포인트",["That's|그건 ~이다","not|아닌","the|그","point|요점"]],
 ["Let's get to the point.","본론으로 가자.","렛츠 겟 투 더 포인트",["Let's|~하자","get|가다","to|~로","the|그","point|요점"]],
 ["By the way, she called.","그건 그렇고, 걔가 전화했어.","바이 더 웨이 쉬 콜드",["By the way|그건 그렇고","she|그녀가","called|전화했다"]],
 ["Long story short, we lost.","짧게 말하면, 우리가 졌어.","롱 스토리 숏 위 로스트",["Long story short|짧게 말하면","we|우리가","lost|졌다"]],
 ["Better late than never.","늦더라도 안 하는 것보단 낫지.","베터 레이트 댄 네버",["Better|더 낫다","late|늦은 게","than|~보다","never|아예 안 하는 것"]],
 ["Speaking of which, where is he?","말 나온 김에, 걔 어디 있어?","스피킹 오브 위치 웨어 이즈 히",["Speaking of which|말 나온 김에","where|어디","is|있나","he|그가"]]]}

];
