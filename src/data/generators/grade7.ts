import type { Question } from '../topics'
import { BOYS, GIRLS, GROUPS, ONES } from './lexicon'
import { choice, order, pack } from './make'

function modals(): Question[] {
  const out: Question[] = []
  const laws = [
    'wear a seatbelt in the car',
    'stop at a red light',
    'wear a helmet on a motorbike',
    'pay for your ticket',
    'keep your dog on a lead here',
    'show your passport at the gate',
    'be quiet in the library',
    'wash your hands before lunch',
  ]
  for (const rule of laws) {
    out.push(
      choice(
        `You ___ ${rule}. It is the law.`,
        'must',
        ['can', 'might', "don't have to"],
        'כשיש חוק או חובה ברורה משתמשים ב-must.',
      ),
    )
  }
  const advice = [
    'go to bed early',
    'drink some water',
    'ask the teacher',
    'take a break',
    'check your answers',
    'wear a coat',
    'eat some fruit',
    'tell your parents',
  ]
  for (const tip of advice) {
    out.push(
      choice(
        `You look tired and worried. You ___ ${tip}.`,
        'should',
        ['must not', "can't", 'would'],
        'זו עצה ולא חוק, ולכן should.',
      ),
    )
  }
  const bans = [
    'use your phone during the test',
    'run in the hallway',
    'shout in the classroom',
    'eat in the lab',
    'open that door',
    'touch the wet paint',
    'park on the pavement',
    'feed the animals',
  ]
  for (const ban of bans) {
    out.push(
      choice(
        `You ___ ${ban}. It is forbidden.`,
        "mustn't",
        ["don't have to", 'can', 'must'],
        "כשמשהו אסור לגמרי משתמשים ב-mustn't, לא ב-don't have to.",
      ),
    )
  }
  const free = [
    ['Saturday', 'wake up early'],
    ['a holiday', 'wear the uniform'],
    ['the weekend', 'do homework'],
    ['summer', 'bring a coat'],
    ['noon', 'bring a torch'],
    ['my birthday', 'buy a gift'],
  ] as const
  for (const [when, act] of free) {
    out.push(
      choice(
        `It is ${when}, so we ___ ${act}.`,
        "don't have to",
        ["mustn't", "can't", 'must'],
        "אין חובה, אבל זה גם לא אסור, ולכן don't have to.",
      ),
    )
  }
  const unable = [
    'My little brother ___ swim. He is only two and never learned.',
    'This old phone ___ take photos. It has no camera.',
    'I ___ reach that shelf. I am not tall enough.',
    'A goldfish ___ climb a tree.',
  ]
  for (const q of unable) {
    out.push(choice(q, "can't", ["mustn't", 'must', "shouldn't"], 'זו חוסר יכולת ולא איסור, ולכן can\'t.'))
  }
  for (const act of ['open the window', 'pass the salt', 'help me', 'say that again']) {
    out.push(choice(`___ you ${act}, please?`, 'Could', ['Should', 'Must', 'Would like'], 'בקשה מנומסת נפתחת ב-Could you.'))
  }
  for (const thing of ['a glass of water', 'some help', 'the red one', 'a quiet seat']) {
    out.push(choice(`I ___ like ${thing}, please.`, 'would', ['will', 'am', 'must'], 'בקשה מנומסת: I would like.'))
  }
  for (const [who, verb, rest] of [
    ['She', 'speak', 'three languages'],
    ['They', 'play', 'the piano'],
    ['He', 'ride', 'a bike'],
    ['We', 'finish', 'it today'],
  ] as const) {
    out.push(
      choice(
        `${who} can ___ ${rest}.`,
        verb,
        [`${verb}s`, `to ${verb}`, `${verb}ing`],
        'אחרי פועל מודאלי בא פועל בצורת הבסיס, בלי to ובלי s.',
      ),
    )
  }
  return pack('modals', out)
}

function reportedSpeech(): Question[] {
  const out: Question[] = []
  for (const p of GIRLS) {
    out.push(
      choice(
        `${p.en}: "I am hungry." ${p.en} said that ___ is hungry.`,
        'she',
        ['I', 'he', 'you'],
        'כשמספרים מה בת אמרה על עצמה, I הופך ל-she.',
      ),
    )
  }
  for (const p of BOYS) {
    out.push(
      choice(
        `${p.en}: "I am tired." ${p.en} said that ___ is tired.`,
        'he',
        ['I', 'she', 'you'],
        'כשמספרים מה בן אמר על עצמו, I הופך ל-he.',
      ),
    )
  }
  for (const p of ONES.slice(0, 6)) {
    out.push(
      choice(
        `${p.en} ___ me that ${p.sub} was busy.`,
        'told',
        ['said', 'talked', 'spoke'],
        'כשיש אדם אחרי הפועל, כמו me, משתמשים ב-told ולא ב-said.',
      ),
    )
  }
  const news = ['the test is on Monday', 'the trip is tomorrow', 'the shop is closed', 'lunch is ready', 'the bus is late', 'class starts at eight']
  for (const line of news) {
    out.push(
      choice(
        `The teacher ___ that ${line}.`,
        'said',
        ['told', 'talked', 'spoke'],
        'אין אדם מיד אחרי הפועל, ולכן said that ולא told.',
      ),
    )
  }
  for (const person of ['her mom', 'his dad', 'the teacher', 'my friend']) {
    out.push(
      choice(
        `Noa told ___ that she feels sick.`,
        person,
        [`to ${person}`, 'said', `for ${person}`],
        'אחרי told בא האדם בלי to.',
      ),
    )
  }
  for (const p of BOYS.slice(0, 4)) {
    out.push(
      choice(
        `${p.en}: "My bike is new." ${p.en} said that ___ bike is new.`,
        'his',
        ['my', 'her', 'your'],
        'המילה my של בן, כשמספרים עליו, הופכת ל-his.',
      ),
    )
  }
  for (const p of GIRLS.slice(0, 4)) {
    out.push(
      choice(
        `${p.en}: "My bag is new." ${p.en} said that ___ bag is new.`,
        'her',
        ['my', 'his', 'your'],
        'המילה my של בת, כשמספרים עליה, הופכת ל-her.',
      ),
    )
  }
  for (const group of GROUPS.slice(0, 4)) {
    out.push(
      choice(
        `${group.en}: "We are tired." ${group.en} said that ___ are tired.`,
        'they',
        ['we', 'he', 'you'],
        'המילה we של קבוצה, כשמספרים עליה, הופכת ל-they.',
      ),
    )
  }
  out.push(
    choice('Sara said to me, "I can help you." Sara told me that she can help ___.', 'me', ['you', 'her', 'them'], 'היא דיברה אליי, ולכן you הופך ל-me.'),
    choice('Dan said to Maya, "I can help you." Dan told Maya that he can help ___.', 'her', ['you', 'me', 'him'], 'הוא דיבר אל מאיה, ולכן you הופך ל-her.'),
    order('Dana told me a secret', 'אחרי told בא האדם ואז מה שנאמר.'),
    order('Tom told her the news', 'סדר הדיבור העקיף: מי אמר, למי, ומה.'),
  )
  return pack('reported-speech', out)
}

function reflexive(): Question[] {
  const out: Question[] = []
  const selfActs = [
    ['cut', 'with a knife'],
    ['hurt', 'at football'],
    ['saw', 'in the mirror'],
    ['taught', 'chess'],
    ['helped', 'with the bags'],
    ['blamed', 'for the mess'],
  ] as const
  for (const [act, rest] of selfActs) {
    out.push(
      choice(
        `I ${act} ___ ${rest}.`,
        'myself',
        ['me', 'mine', 'itself'],
        'כשאני עושה פעולה לעצמי, I הולך עם myself.',
      ),
    )
  }
  for (const p of GIRLS) {
    out.push(
      choice(
        `${p.en} taught ___ to play the guitar.`,
        'herself',
        ['she', 'hers', 'himself'],
        'בת שלימדה את עצמה: herself.',
      ),
    )
  }
  for (const p of BOYS) {
    out.push(
      choice(
        `${p.en} hurt ___ during football.`,
        'himself',
        ['hisself', 'he', 'herself'],
        'בן שפגע בעצמו: himself. אין מילה hisself.',
      ),
    )
  }
  for (const name of ['Tom', 'Noa', 'Dan', 'Maya']) {
    out.push(
      choice(
        `${name}, did you make this cake ___?`,
        'yourself',
        ['himself', 'you', 'yourselves'],
        'פונים אל אדם אחד, ולכן yourself.',
      ),
    )
  }
  for (const group of GROUPS) {
    out.push(
      choice(
        `${group.en} dressed ___ for school.`,
        group.ref,
        ['themself', 'theirselves', group.sub],
        'הכינוי החוזר מתאים לנושא: ברבים themselves או ourselves.',
      ),
    )
  }
  const machines = ['The machine', 'The computer', 'The lamp', 'The camera']
  for (const thing of machines) {
    out.push(
      choice(
        `${thing} turns ___ off at night.`,
        'itself',
        ['himself', 'themselves', 'its'],
        'חפץ יחיד הוא it, ולכן itself.',
      ),
    )
  }
  out.push(
    choice('Kids, did you clean the room ___?', 'yourselves', ['yourself', 'themselves', 'you'], 'פונים אל כמה אנשים, ולכן yourselves.'),
    choice('We enjoyed ___ at the party.', 'ourselves', ['us', 'ourself', 'ours'], 'המילה we הולכת עם ourselves, לא ourself.'),
  )
  return pack('reflexive-pronouns', out)
}

function possessives(): Question[] {
  const out: Question[] = []
  const mineNouns = ['pencil', 'phone', 'seat', 'bag', 'book', 'coat', 'ticket', 'lunch']
  for (const noun of mineNouns) {
    out.push(
      choice(
        `This is not your ${noun}. It is ___.`,
        'mine',
        ['my', 'me', 'I'],
        'אין שם עצם אחרי המילה, ולכן כינוי קניין שעומד לבד: mine.',
      ),
    )
  }
  for (const p of GIRLS.slice(0, 4)) {
    out.push(
      choice(
        `"Is this ${p.en}'s bag?" "Yes, it is ___."`,
        'hers',
        ['her', 'she', "her's"],
        'של בת, בלי שם עצם אחרי הכינוי: hers, בלי גרש.',
      ),
    )
  }
  for (const p of BOYS.slice(0, 4)) {
    out.push(
      choice(
        `"Is this ${p.en}'s bag?" "Yes, it is ___."`,
        'his',
        ['he', 'him', "his's"],
        'של בן, בלי שם עצם אחרי הכינוי: his, בלי גרש.',
      ),
    )
  }
  const whose = ['shoes', 'keys', 'books', 'glasses', 'bags', 'coats', 'hats', 'tickets']
  for (const noun of whose) {
    out.push(
      choice(
        `___ ${noun} are these?`,
        'Whose',
        ['Who', "Who's", 'Who are'],
        "שואלים של מי עם Whose. who's פירושו who is.",
      ),
    )
  }
  const owners = ['my brother', 'my sister', 'the school', 'my teacher', 'my uncle', 'the club']
  for (const owner of owners) {
    out.push(choice(`This phone belongs ___ ${owner}.`, 'to', ['of', 'for', 'at'], 'שייך ל- נאמר עם belong to.'))
  }
  out.push(
    choice('Our house is small, but ___ is very big.', 'theirs', ['their', 'them', 'they'], 'בלי שם עצם אחרי הכינוי: theirs.'),
    choice('Your room is tidy, but ___ is messy.', 'mine', ['my', 'me', 'I'], 'בלי שם עצם: mine.'),
    choice('I brought my lunch, and she brought ___.', 'hers', ['her', 'she', "her's"], 'בלי שם עצם אחרי הכינוי של בת: hers.'),
    choice('These seats are ___. We bought the tickets.', 'ours', ['our', 'us', 'we'], 'בלי שם עצם: ours.'),
    choice('My uncle ___ a small cafe in Jaffa.', 'owns', ['belongs', 'owner', 'is own'], 'הוא הבעלים של המקום: own, ובגוף שלישי owns.'),
    choice('My aunt ___ a little shop.', 'owns', ['belong', 'owner', 'owning'], 'בגוף שלישי, להיות הבעלים: owns.'),
    choice('The twins ___ a dog together.', 'own', ['owns', 'belongs', 'owner'], 'הנושא ברבים, ולכן own בלי s.'),
    order('This book belongs to me', 'אחרי belongs בא to ואז בעל החפץ.'),
    order('That bag belongs to Maya', 'סדר השייכות: חפץ, belongs to, ואז השם.'),
    order('The red bike belongs to Tom', 'החפץ בא קודם, ואז belongs to והבעלים.'),
  )
  return pack('possessive-pronouns', out)
}

function timeClauses(): Question[] {
  const out: Question[] = []
  const before = [
    ['I brush my teeth', 'I go to bed', 'קודם מצחצחים שיניים ורק אחר כך הולכים לישון, ולכן before.'],
    ['We wash our hands', 'we eat lunch', 'קודם שוטפים ידיים ואז אוכלים, ולכן before.'],
    ['She packs her bag', 'she leaves home', 'קודם אורזים את התיק ואז יוצאים, ולכן before.'],
    ['He checks the door', 'he goes to sleep', 'קודם בודקים את הדלת ואז ישנים, ולכן before.'],
    ['I do my homework', 'I play football', 'קודם שיעורי בית ואז משחק, ולכן before.'],
    ['They buy tickets', 'they enter the cinema', 'קודם קונים כרטיס ואז נכנסים, ולכן before.'],
  ] as const
  for (const [first, second, e] of before) {
    out.push(choice(`${first} ___ ${second}.`, 'before', ['after', 'than', 'what'], e))
  }
  const after = [
    'The film ended at 10. We went home at 10:30, ___ it ended.',
    'The bell rang at 8. We sat down at 8:05, ___ it rang.',
    'Lunch finished at 1. We played at 1:30, ___ it finished.',
    'The rain stopped at 4. We went out at 4:20, ___ it stopped.',
    'The lesson ended at noon. We left at 12:10, ___ it ended.',
    'The match finished at 6. We ate at 6:30, ___ it finished.',
  ]
  for (const q of after) {
    out.push(choice(q, 'after', ['before', 'what', 'than'], 'הפעולה השנייה קרתה בזמן מאוחר יותר, ולכן after.'))
  }
  const whens = [
    ['I was little', 'I lived in Eilat'],
    ['he was five', 'he loved dinosaurs'],
    ['we were on holiday', 'we swam every day'],
    ['she was in Haifa', 'she visited the beach'],
  ] as const
  for (const [time, main] of whens) {
    out.push(choice(`___ ${time}, ${main}.`, 'When', ['Before', 'After', 'What'], 'מתארים תקופה שבה משהו היה נכון, ולכן When.'))
  }
  const waits = ['a big meal', 'lunch', 'a heavy snack', 'dinner']
  for (const meal of waits) {
    out.push(
      choice(
        `Don't swim ___ ${meal}. Wait an hour.`,
        'after',
        ['before', 'what', 'than'],
        'מחכים שעה אחרי האוכל, ולכן after.',
      ),
    )
  }
  for (const p of [...GIRLS.slice(0, 3), ...BOYS.slice(0, 3)]) {
    out.push(
      choice(
        `Before ${p.en} ___ to school, ${p.sub} eats breakfast.`,
        'goes',
        ['go', 'going', 'will go'],
        'זו הרגל, והנושא יחיד, ולכן הווה פשוט: goes.',
      ),
    )
  }
  const pasts = [
    ['When we ___ the news, we were shocked.', 'heard', 'hear'],
    ['When I ___ the photo, I was shocked.', 'saw', 'see'],
    ['When she ___ the letter, she was sad.', 'opened', 'open'],
    ['When they ___ the message, they were quiet.', 'got', 'get'],
  ] as const
  for (const [q, ok, base] of pasts) {
    out.push(
      choice(q, ok, [base, `${base}ing`, `will ${base}`], 'הפועל was או were מראה שזה בעבר, ולכן גם משפט הזמן בעבר.'),
    )
  }
  const futureActs = [
    ['get', 'home'],
    ['finish', 'lunch'],
    ['arrive', 'there'],
    ['leave', 'school'],
    ['see', 'Maya'],
    ['find', 'the key'],
  ] as const
  for (const [base, rest] of futureActs) {
    out.push(
      choice(
        `I will call you when I ___ ${rest}.`,
        base,
        [`will ${base}`, `${base}d`, `${base}ing`],
        'מדברים על העתיד, אבל אחרי when בא הווה פשוט ולא will.',
      ),
    )
  }
  const beforeYou = [
    ['leave', 'the room'],
    ['open', 'the door'],
    ['start', 'the test'],
    ['close', 'the window'],
  ] as const
  for (const [verb, rest] of beforeYou) {
    out.push(
      choice(
        `Before you ___ ${rest}, please turn off the light.`,
        verb,
        [`will ${verb}`, `${verb}d`, `${verb}ing`],
        'גם כשהמשמעות עתידית, אחרי before בא הווה פשוט.',
      ),
    )
  }
  return pack('time-clauses', out)
}

export const grade7: Record<string, () => Question[]> = {
  modals,
  'reported-speech': reportedSpeech,
  'reflexive-pronouns': reflexive,
  'possessive-pronouns': possessives,
  'time-clauses': timeClauses,
}
