
/* ══════════════════════════════════════════════════════════════════
   그림 — 문장마다 한 컷.
   한국어를 거치지 않고 그림 → 뜻이 바로 붙게 하려는 것입니다.
   그림이 안 되는 추상적인 문장(Fair enough. 같은)은 비워 둡니다.
   화면에는 그림 + 묶음 이름(어떤 상황인지)이 같이 나옵니다.
   ══════════════════════════════════════════════════════════════════ */
const PICS = {

/* 가장 짧은 말 */
"Thank you.":"🙏", "I'm sorry.":"🙇", "Me too.":"🙋", "Not yet.":"⏳",
"Excuse me.":"✋", "One moment.":"⏱️", "Over here.":"👋", "I don't know.":"🤷",

/* 리액션 */
"No way.":"😲", "Same here.":"🤝", "Good point.":"👍", "I knew it.":"💡",
"Never mind.":"🙅", "That's crazy.":"🤯", "Are you serious?":"😳",

/* 통째로 외우는 덩어리 */
"I'm on it.":"🏃", "It happens.":"🤷", "You got this.":"💪", "Take your time.":"🐢",
"That was close.":"😅", "Hold on a second.":"✋",

/* 지금 상태 말하기 */
"I'm tired.":"😴", "I'm hungry.":"🍽️", "It's too loud.":"🔊", "I'm almost done.":"🏁",
"Something's wrong.":"⚠️", "It's not working.":"🔧", "I'm fine, really.":"👌", "It's up to you.":"🤲",

/* ~하고 싶어 */
"I want to sleep.":"🛌", "I want to go home.":"🏠", "I want to try this.":"🙋",
"I want to eat something.":"🍽️", "I want to take a rest.":"🛋️", "I don't want to go.":"🚫",
"Do you want to come?":"🚶", "What do you want to do?":"❓",

/* 내가 할게 */
"Let me check.":"🔍", "Let me try.":"🙋", "Let me know.":"📩", "I'll pay.":"💳",
"I'll be right back.":"🔙", "I'll take care of it.":"✅", "Let me think about it.":"🤔",
"Just give me a second.":"⏱️",

/* ~해도 될까요 */
"Can I sit here?":"💺", "Can you help me?":"🆘", "Can I try it on?":"👕",
"Can I take a photo?":"📷", "Can I get a receipt?":"🧾", "Can I have one more?":"➕",
"Can I use the wifi?":"📶", "Can I pay by card?":"💳",

/* 길 찾기 */
"Where is the exit?":"🚪", "I'm lost.":"🧭", "Where are we now?":"📍",
"Is it far from here?":"📏", "Where do I get off?":"🚏", "How do I get there?":"🗺️",
"Where is the bathroom?":"🚻", "Which way is the station?":"🚉",

/* 돈 계산 */
"How much is this?":"💵", "That's too expensive.":"💸", "Keep the change.":"🪙",
"How much for two?":"2️⃣", "Do you take cards?":"💳", "Can I get a discount?":"🏷️",
"How much is it in total?":"🧮", "I think there's a mistake.":"❗",

/* 있어요? */
"Do you have a charger?":"🔌", "Do you have any water?":"💧", "Do you have wifi here?":"📶",
"I have a reservation.":"📅", "Do you have this in black?":"⚫",
"Do you have a smaller size?":"📏", "Do you have a table for two?":"🍽️",
"We don't have much time.":"⏰",

/* 주문하기 */
"To go, please.":"🥡", "For here, please.":"🍽️", "No ice, please.":"🧊",
"That's all, thank you.":"✅", "I'd like a coffee, please.":"☕",
"I'd like the same thing.":"👥", "What do you recommend?":"⭐", "I'd like to order now.":"📝",

/* ~해야 해 */
"I need some help.":"🙋", "We need to talk.":"💬", "I need to go now.":"🏃",
"You need to see this.":"👀", "Do I need a ticket?":"🎟️", "I don't need a bag.":"🛍️",
"I need to charge my phone.":"🔋", "I need to use the bathroom.":"🚻",

/* 시간 */
"What time is it?":"⌚", "I'm running late.":"🏃", "What time do you open?":"🔓",
"How long does it take?":"⏳", "It takes about an hour.":"🕐", "Are you open tomorrow?":"📅",
"What time does it start?":"▶️", "I'll be there in ten minutes.":"⏱️",

/* 못 알아들었을 때 */
"Got it, thank you.":"👍", "Sorry, what was that?":"❓", "Can you repeat that?":"🔁",
"Could you speak slowly?":"🐢", "Do you mean this one?":"👉",
"Sorry, I don't understand.":"😕", "Could you write it down?":"✍️",
"I don't speak English well.":"🗣️",

/* 고마움·미안함 */
"No worries.":"😊", "Sorry, my fault.":"🙇", "I appreciate it.":"🙏",
"Thanks for waiting.":"⏳", "Sorry to bother you.":"🔔", "Don't worry about it.":"👌",
"Thanks for letting me know.":"📩", "Thanks anyway.":"🙂",

/* 생각 말하기 */
"I think so too.":"👍", "I don't think so.":"👎", "I have no idea.":"🤷",
"That makes sense.":"💡", "I'm not sure yet.":"⏳", "Maybe you're right.":"🤔",
"I think you're right.":"✅", "It looks good to me.":"👌",

/* ~할 거야 */
"I'm on my way.":"🚶", "I'm going to bed.":"🛌", "We're almost there.":"📍",
"I'll see you tomorrow.":"👋", "I'm going to be late.":"⏰", "Are you coming or not?":"🤨",
"I'm not going anywhere.":"🚫", "What are you going to do?":"❓",

/* 찾기·잃어버림 */
"This is not mine.":"❌", "I lost my phone.":"📱", "Is this seat taken?":"💺",
"I can't find my seat.":"🎫", "I'm just looking, thanks.":"👀",
"I'm looking for my bag.":"🎒", "I'm looking for this address.":"🏠",
"Where can I buy a ticket?":"🎟️",

/* ~해 주시겠어요 */
"Stop here, please.":"🛑", "One ticket, please.":"🎟️", "Could you call a taxi?":"🚕",
"Could you say that again?":"🔁", "Could you give me a minute?":"⏱️",
"Could you show me the menu?":"📋", "Could you take our picture?":"📸",
"Please take me to this address.":"📍",

/* 호텔·버스 */
"Is breakfast included?":"🍳", "What time is check-out?":"🕚", "The room is too cold.":"🥶",
"Can I check in early?":"🔑", "Can I leave my bags here?":"🧳",
"Does this bus go downtown?":"🚌", "The wifi is not working.":"📶",
"I have a reservation for tonight.":"🏨",

/* 공항에서 */
"Just this bag.":"🧳", "For one week.":"📅", "Window seat, please.":"🪟",
"Where is gate twelve?":"🚪", "Is the flight on time?":"✈️", "I'm here on vacation.":"🏖️",
"Where is the baggage claim?":"🛄", "Where is the check-in counter?":"🎫",

/* 식당에서 */
"Check, please.":"🧾", "What's this?":"❓", "Is it spicy?":"🌶️", "I'll have this one.":"👉",
"It was delicious.":"😋", "Can we sit outside?":"🌤️", "A table for two, please.":"🍽️",
"Could we get some water?":"💧",

/* 아프거나 곤란할 때 */
"It hurts here.":"🤕", "My phone is dead.":"🔋", "I don't feel well.":"🤒",
"I need a doctor.":"🏥", "I missed my bus.":"🚌", "I lost my passport.":"🛂",
"Where is the pharmacy?":"💊", "Please call the police.":"🚓",

/* 처음 만난 사람과 */
"Nice to meet you.":"🤝", "See you later.":"👋", "Where are you from?":"🌍",
"I'm from Korea.":"🇰🇷", "Are you from here?":"📍", "What do you do?":"💼",
"This is my first time.":"1️⃣", "Have a good day.":"☀️",

/* 쇼핑·계산대 */
"I'll take it.":"🛍️", "Can I have a bag?":"👜", "Can I look around?":"👀",
"I'll pay in cash.":"💵", "Can I return this?":"↩️", "I'll think about it.":"🤔",
"Where is the fitting room?":"👗", "Do you have this in medium?":"📏",

/* 대화 굴리기 */
"What's going on?":"❓", "What do you mean?":"🤔", "That's not the point.":"🎯",
"Let's get to the point.":"➡️", "By the way, she called.":"📞",
"Long story short, we lost.":"📉", "Better late than never.":"⏰",
"Speaking of which, where is he?":"👤"

};
