import type { Question } from '../topics'
import { BOYS, GIRLS, GROUPS } from './lexicon'
import { choice, order, pack } from './make'

function presentPerfect(): Question[] {
  const out: Question[] = []
  const places = ['Japan', 'Eilat', 'London', 'Paris', 'the Hermon', 'a desert', 'a castle', 'the museum']
  for (const place of places) {
    out.push(
      choice(
        `I ___ never been to ${place}.`,
        'have',
        ['has', 'am', 'did'],
        'עם I בהווה מושלם משתמשים ב-have ואחריו V3.',
      ),
    )
  }
  const done = [
    ['finished', 'finish', 'her homework'],
    ['eaten', 'eat', 'lunch'],
    ['written', 'write', 'the story'],
    ['bought', 'buy', 'the tickets'],
    ['seen', 'see', 'that film'],
    ['lost', 'lose', 'her keys'],
    ['made', 'make', 'a cake'],
    ['found', 'find', 'the book'],
  ] as const
  for (const [v3, base, obj] of done) {
    out.push(
      choice(
        `She has ___ ${obj} already.`,
        v3,
        [base, `${base}ing`, `${base}s`],
        'אחרי has בא V3, לא צורת הבסיס.',
      ),
    )
  }
  const since = ['2015', 'Monday', 'May', 'eight o\'clock', 'last summer', 'I was six']
  for (const point of since) {
    out.push(
      choice(
        `We have lived here ___ ${point}.`,
        'since',
        ['for', 'ago', 'from'],
        'לפני נקודת זמן משתמשים ב-since, לא ב-for.',
      ),
    )
  }
  const periods = ['ten years', 'a long time', 'three months', 'two weeks', 'five days', 'an hour']
  for (const period of periods) {
    out.push(
      choice(
        `They have known each other ___ ${period}.`,
        'for',
        ['since', 'ago', 'during'],
        'לפני משך זמן משתמשים ב-for.',
      ),
    )
  }
  for (const food of ['sushi', 'falafel', 'mango', 'hummus']) {
    out.push(choice(`Have you ___ eaten ${food}?`, 'ever', ['yet', 'since', 'ago'], 'שאלה על ניסיון חיים נעשית עם ever.'))
  }
  for (const task of ['the project', 'my homework', 'the letter', 'the poster']) {
    out.push(
      choice(
        `I haven't finished ${task} ___.`,
        'yet',
        ['already', 'just', 'ever'],
        'בסוף משפט שלילה בהווה מושלם משתמשים ב-yet.',
      ),
    )
  }
  for (const who of ['My parents', 'The girls', 'Our guests', 'The boys']) {
    out.push(choice(`${who} ___ just arrived.`, 'have', ['has', 'are', 'did'], 'הנושא ברבים, ולכן have just ועוד V3.'))
  }
  return pack('present-perfect', out)
}

function perfectVsPast(): Question[] {
  const out: Question[] = []
  const pasts = [
    ['to Paris in 2019', 'went', 'go'],
    ['the film yesterday', 'saw', 'see'],
    ['his leg two weeks ago', 'broke', 'break'],
    ['a bike last year', 'bought', 'buy'],
    ['the letter on Monday', 'wrote', 'write'],
    ['her keys last night', 'lost', 'lose'],
    ['Tom in 2020', 'met', 'meet'],
    ['the bus this morning at 7', 'caught', 'catch'],
  ] as const
  for (const [rest, ok, base] of pasts) {
    out.push(
      choice(
        `I ___ ${rest}.`,
        ok,
        [`have ${base === 'go' ? 'gone' : base + 'en'}`, 'have been', base],
        'יש כאן זמן סגור בעבר, ולכן עבר פשוט ולא הווה מושלם.',
      ),
    )
  }
  const perfects = [
    ['to Paris three times so far', 'have been'],
    ['here since I was born', 'have lived'],
    ['this film before', 'have seen'],
    ['three books so far', 'have read'],
    ['here for ten years', 'have lived'],
    ['that song since May', 'have known'],
    ['lunch already', 'have eaten'],
    ['three tickets so far', 'have bought'],
  ] as const
  for (const [rest, ok] of perfects) {
    out.push(
      choice(
        `I ___ ${rest}.`,
        ok,
        ['went', 'was', 'go'],
        'אין זמן סגור בעבר, או שיש since, for או so far, ולכן הווה מושלם.',
      ),
    )
  }
  const evers = [
    ['a famous person', 'met', 'meet'],
    ['a whale', 'seen', 'see'],
    ['a camel', 'seen', 'see'],
    ['snow', 'seen', 'see'],
    ['the sea', 'seen', 'see'],
    ['a play', 'seen', 'see'],
  ] as const
  for (const [thing, v3, base] of evers) {
    out.push(
      choice(
        `___ you ever ___ ${thing}?`,
        `Have / ${v3}`,
        [`Have / ${base}`, `Did / ${v3}`, `Has / ${v3}`],
        'מילת ever שייכת להווה מושלם: Have ואחריו V3.',
      ),
    )
  }
  const whens = ['start learning English', 'meet Maya', 'buy this bike', 'move to Haifa']
  for (const act of whens) {
    out.push(
      choice(
        `When ___ you ${act}?`,
        'did',
        ['have', 'has', 'were'],
        'מילת When שואלת על זמן סגור, ולכן עבר פשוט עם did.',
      ),
    )
  }
  const agos = ['two days ago', 'last night', 'in 2018', 'yesterday morning']
  for (const time of agos) {
    out.push(
      choice(
        `She ___ her phone ${time}.`,
        'lost',
        ['has lost', 'has lose', 'loses'],
        'ציון זמן סגור בעבר מחייב עבר פשוט.',
      ),
    )
  }
  const morePast = [
    ['Grandma', 'visited', 'has visited'],
    ['the kitchen', 'cleaned', 'has cleaned'],
    ['a film', 'watched', 'has watched'],
    ['football', 'played', 'has played'],
    ['a classmate', 'helped', 'has helped'],
    ['the dog', 'walked', 'has walked'],
  ] as const
  for (const [obj, ok, bad] of morePast) {
    out.push(
      choice(
        `Tom ___ ${obj} last Sunday.`,
        ok,
        [bad, 'has', 'did'],
        'הביטוי last Sunday הוא זמן סגור, ולכן עבר פשוט.',
      ),
    )
  }
  const morePerfect = [
    ['for a week now', 'have had'],
    ['since June', 'have had'],
    ['so far this year', 'have had'],
    ['since Monday', 'have had'],
  ] as const
  for (const [mark, ok] of morePerfect) {
    out.push(
      choice(
        `I ___ this bike ${mark}.`,
        ok,
        ['had', 'bought', 'got'],
        'מילים כמו since ו-for עם now, או so far, בלי זמן סגור, הולכות עם הווה מושלם.',
      ),
    )
  }
  return pack('perfect-vs-past', out)
}

function firstConditional(): Question[] {
  const out: Question[] = []
  const ifs = [
    ['it', 'rains', 'rain'],
    ['she', 'hurries', 'hurry'],
    ['he', 'arrives', 'arrive'],
    ['the bus', 'comes', 'come'],
    ['Maya', 'calls', 'call'],
    ['Tom', 'forgets', 'forget'],
    ['the shop', 'closes', 'close'],
    ['Noa', 'wins', 'win'],
  ] as const
  for (const [who, s, base] of ifs) {
    out.push(
      choice(
        `If ${who} ___ tomorrow, we will stay home.`,
        s,
        [`will ${base}`, `${base}ed`, `${base}ing`],
        'אחרי if בתנאי ראשון בא הווה פשוט, לא will.',
      ),
    )
  }
  const results = [
    ['study hard tonight', 'will pass', 'pass', 'the test tomorrow'],
    ['leave now', 'will catch', 'catch', 'the bus'],
    ['ask the teacher', 'will understand', 'understand', 'the task'],
    ['wear a coat', 'will feel', 'feel', 'warmer'],
    ['hurry', 'will arrive', 'arrive', 'on time'],
    ['save money', 'will buy', 'buy', 'the bike next month'],
  ] as const
  for (const [cond, ok, base, rest] of results) {
    out.push(
      choice(
        `If you ${cond}, you ___ ${rest}.`,
        ok,
        [base, `${base}ed`, `would ${base}`],
        'בחלק התוצאה של תנאי ראשון על מחר בא will ואחריו פועל בסיסי.',
      ),
    )
  }
  for (const p of [...GIRLS.slice(0, 3), ...BOYS.slice(0, 3)]) {
    out.push(
      choice(
        `If ${p.en} ___ hurry, ${p.sub} will miss the bus.`,
        "doesn't",
        ["won't", "didn't", "isn't"],
        "אחרי if בתנאי ראשון השלילה היא doesn't, לא won't.",
      ),
    )
  }
  for (const prize of ['the race', 'a prize', 'the match', 'a ticket']) {
    out.push(
      choice(
        `What will you do if you ___ ${prize}?`,
        'win',
        ['will win', 'won', 'wins'],
        'אחרי if, גם בתוך שאלה, הנושא you הולך עם הווה פשוט בלי will.',
      ),
    )
  }
  for (const place of ['the park', 'the beach', 'the pool', 'town']) {
    out.push(
      choice(
        `We ___ go to ${place} if it is sunny tomorrow.`,
        'will',
        ['would', 'are', 'did'],
        'התוצאה העתידית בתנאי ראשון נפתחת ב-will.',
      ),
    )
  }
  for (const thing of ['a coat', 'an umbrella', 'boots', 'a hat', 'water', 'a map']) {
    out.push(
      choice(
        `If it rains tomorrow, I ___ ${thing}.`,
        'will take',
        ['take', 'took', 'would take'],
        'התוצאה של תנאי ראשון על מחר היא will ופועל בסיסי.',
      ),
    )
  }
  for (const name of ['Maya', 'Tom', 'Noa', 'Dan', 'Yael', 'Ron']) {
    out.push(
      choice(
        `If I see ${name} tomorrow, I ___ her the news.`.replace(name === 'Tom' || name === 'Dan' || name === 'Ron' ? 'her' : 'her', name === 'Tom' || name === 'Dan' || name === 'Ron' ? 'him' : 'her'),
        'will tell',
        ['tell', 'told', 'would tell'],
        'אחרי if בהווה בא will בחלק התוצאה.',
      ),
    )
  }
  return pack('first-conditional', out)
}

function passivePast(): Question[] {
  const out: Question[] = []
  const was = [
    ['The Mona Lisa', 'painted', 'paint', 'in Italy'],
    ['My phone', 'stolen', 'steal', 'last week'],
    ['The telephone', 'invented', 'invent', 'long ago'],
    ['Radium', 'discovered', 'discover', 'in 1898'],
    ['This house', 'built', 'build', 'in 1990'],
    ['The window', 'broken', 'break', 'last night'],
    ['The cake', 'eaten', 'eat', 'before noon'],
    ['The letter', 'sent', 'send', 'on Monday'],
  ] as const
  for (const [noun, v3, base, time] of was) {
    out.push(
      choice(
        `${noun} ___ ${time}.`,
        `was ${v3}`,
        [v3, `is ${v3}`, `was ${base}`],
        'סביל בעבר לגוף יחיד: was ואחריו V3.',
      ),
    )
  }
  const were = [
    ['The windows', 'cleaned', 'clean'],
    ['The rooms', 'painted', 'paint'],
    ['The cars', 'made', 'make'],
    ['The letters', 'sent', 'send'],
    ['The photos', 'taken', 'take'],
    ['The shirts', 'washed', 'wash'],
    ['The books', 'printed', 'print'],
    ['The roads', 'closed', 'close'],
  ] as const
  for (const [noun, v3, base] of were) {
    out.push(
      choice(
        `${noun} ___ yesterday.`,
        `were ${v3}`,
        [`was ${v3}`, v3, `were ${base}`],
        'סביל בעבר לשם ברבים: were ואחריו V3.',
      ),
    )
  }
  for (const agent of ['my grandfather', 'a famous artist', 'the students', 'the city', 'Marie Curie', 'the coach']) {
    out.push(choice(`The story was written ___ ${agent}.`, 'by', ['from', 'with', 'of'], 'בסביל מציינים מי עשה את הפעולה עם by.'))
  }
  const future = [
    ['A new school', 'built', 'build'],
    ['The bridge', 'repaired', 'repair'],
    ['A hospital', 'opened', 'open'],
    ['The road', 'closed', 'close'],
    ['A library', 'built', 'build'],
    ['The hall', 'painted', 'paint'],
  ] as const
  for (const [noun, v3, base] of future) {
    out.push(
      choice(
        `${noun} ___ next year.`,
        `will be ${v3}`,
        [`will ${base}`, `is ${base}`, `will ${v3}`],
        'סביל בעתיד: will be ואחריו V3.',
      ),
    )
  }
  const moreWas = [
    ['The cake', 'baked', 'bake'],
    ['The song', 'written', 'write'],
    ['The door', 'locked', 'lock'],
    ['The prize', 'given', 'give'],
    ['The tree', 'planted', 'plant'],
    ['The match', 'cancelled', 'cancel'],
  ] as const
  for (const [noun, v3, base] of moreWas) {
    out.push(
      choice(
        `${noun} ___ last year.`,
        `was ${v3}`,
        [v3, `is ${v3}`, `was ${base}`],
        'אירוע יחיד בעבר בסביל: was ואחריו V3.',
      ),
    )
  }
  const moreWere = [
    ['The chairs', 'moved', 'move'],
    ['The tests', 'checked', 'check'],
    ['The walls', 'painted', 'paint'],
    ['The tickets', 'sold', 'sell'],
    ['The bags', 'found', 'find'],
    ['The cups', 'washed', 'wash'],
  ] as const
  for (const [noun, v3, base] of moreWere) {
    out.push(
      choice(
        `${noun} ___ last night.`,
        `were ${v3}`,
        [`was ${v3}`, v3, `were ${base}`],
        'כמה דברים בעבר בסביל: were ואחריו V3.',
      ),
    )
  }
  return pack('passive-past', out)
}

function pastPerfect(): Question[] {
  const out: Question[] = []
  const already = ['the film', 'the lesson', 'the match', 'the play', 'lunch', 'the concert', 'the talk', 'the race']
  for (const noun of already) {
    out.push(
      choice(
        `When we arrived, ${noun} ___ already started.`,
        'had',
        ['has', 'have', 'did'],
        'הדבר התחיל לפני שהגענו, ולכן had already ועוד V3.',
      ),
    )
  }
  const earlier = [
    ['finished', 'finish', 'his homework'],
    ['eaten', 'eat', 'breakfast'],
    ['left', 'leave', 'the house'],
    ['lost', 'lose', 'her wallet'],
    ['seen', 'see', 'the sign'],
    ['taken', 'take', 'the bus'],
    ['written', 'write', 'the note'],
    ['found', 'find', 'a seat'],
  ] as const
  for (const [v3, base, obj] of earlier) {
    out.push(
      choice(
        `She was upset because she ___ ${obj} earlier.`,
        `had ${v3}`,
        [`has ${v3}`, base, `${base}ing`],
        'לפני רגע שכבר בעבר, הפעולה המוקדמת נכתבת had ועוד V3.',
      ),
    )
  }
  const missed = ['eaten', 'slept', 'studied', 'rested', 'drunk', 'stopped']
  for (const v3 of missed) {
    out.push(
      choice(
        `They were tired because they ___ ${v3} all day.`,
        "hadn't",
        ["haven't", "didn't", "weren't"],
        "לפני הרגע בעבר הם לא עשו את זה, ולכן hadn't ועוד V3.",
      ),
    )
  }
  for (const place of ['London', 'Haifa', 'Eilat', 'Paris', 'Rome', 'Akko']) {
    out.push(
      choice(
        `___ you ever been to ${place} before you moved there?`,
        'Had',
        ['Have', 'Did', 'Were'],
        'לפני מעבר שכבר קרה בעבר שואלים Had you been.',
      ),
    )
  }
  for (const [v3, base, obj] of [
    ['finished', 'finish', 'the poster'],
    ['closed', 'close', 'the shop'],
    ['called', 'call', 'his uncle'],
    ['washed', 'wash', 'the cups'],
    ['packed', 'pack', 'the bags'],
    ['answered', 'answer', 'the email'],
  ] as const) {
    out.push(
      choice(
        `After she had ___ ${obj}, she went out.`,
        v3,
        [base, `${base}ing`, `${base}s`],
        'אחרי had בא V3, כי הפעולה הזאת קרתה לפני היציאה.',
      ),
    )
  }
  for (const noun of ['the train', 'the bus', 'the guests', 'the team', 'the taxi', 'the choir']) {
    out.push(
      choice(
        `By the time we got there, ${noun} ___ already left.`,
        'had',
        ['has', 'have', 'did'],
        'הדבר עזב לפני שהגענו, ולכן had already.',
      ),
    )
  }
  return pack('past-perfect', out)
}

function gerunds(): Question[] {
  const out: Question[] = []
  const ings = ['enjoy', 'finish', 'mind', 'avoid', 'keep', 'suggest', 'practice', 'imagine']
  const tos = ['want', 'decide', 'hope', 'plan', 'promise', 'learn', 'expect', 'need']
  const acts = ['reading comics', 'playing football', 'baking bread', 'walking home', 'learning English', 'visiting Grandma', 'cleaning the room', 'watching films']
  const bare = (ing: string) => {
    const stem = ing.slice(0, -3)
    if (['bak', 'mak', 'clos', 'driv', 'writ', 'hav'].includes(stem)) return `${stem}e`
    if (/(.)\1$/.test(stem) && stem.length > 2) return stem.slice(0, -1)
    return stem
  }
  ings.forEach((verb, i) => {
    const act = acts[i].split(' ')
    const base = bare(act[0])
    out.push(
      choice(
        `I ${verb} ___ ${act.slice(1).join(' ')}.`,
        act[0],
        [`to ${base}`, base, `${base}s`],
        `אחרי ${verb} בא פועל עם ing.`,
      ),
    )
  })
  const toActs = ['be a doctor', 'take the bus', 'see you soon', 'visit Japan', 'learn chess', 'play chess', 'help at home', 'finish early']
  tos.forEach((verb, i) => {
    const [base, ...rest] = toActs[i].split(' ')
    out.push(
      choice(
        `They ${verb} ___ ${rest.join(' ')}.`,
        `to ${base}`,
        [`${base}ing`, base, `${base}s`],
        `אחרי ${verb} בא to ופועל בסיסי.`,
      ),
    )
  })
  for (const act of ['stay up late', 'go out', 'use my phone', 'choose the film', 'sit here', 'borrow the book']) {
    const [base, ...rest] = act.split(' ')
    out.push(
      choice(
        `My parents let me ___ ${rest.join(' ')} on Friday.`,
        base,
        [`to ${base}`, `${base}ing`, `${base}ed`],
        'אחרי let ואדם בא פועל בסיסי, בלי to.',
      ),
    )
  }
  const preps = [
    ['good at', 'swimming', 'swim'],
    ['fond of', 'reading', 'read'],
    ['interested in', 'drawing', 'draw'],
    ['tired of', 'waiting', 'wait'],
    ['keen on', 'cycling', 'cycle'],
    ['afraid of', 'flying', 'fly'],
  ] as const
  for (const [prep, ing, base] of preps) {
    out.push(
      choice(
        `He is ${prep} ___.`,
        ing,
        [`to ${base}`, base, `${base}s`],
        'אחרי מילת יחס בא פועל עם ing.',
      ),
    )
  }
  for (const [verb, ing, base, obj] of [
    ['dislike', 'eating', 'eat', 'onions'],
    ['deny', 'breaking', 'break', 'the cup'],
    ['miss', 'seeing', 'see', 'my cousins'],
    ['risk', 'missing', 'miss', 'the bus'],
  ] as const) {
    out.push(choice(`I ${verb} ___ ${obj}.`, ing, [`to ${base}`, base, `${base}s`], `אחרי ${verb} בא פועל עם ing.`))
  }
  for (const [verb, ok, a, b, c, obj] of [
    ['offer', 'to help', 'helping', 'help', 'helps', 'you'],
    ['agree', 'to come', 'coming', 'come', 'comes', 'early'],
    ['refuse', 'to pay', 'paying', 'pay', 'pays', 'the bill'],
    ['hope', 'to win', 'winning', 'win', 'wins', 'the match'],
  ] as const) {
    out.push(choice(`We ${verb} ___ ${obj}.`, ok, [a, b, c], `אחרי ${verb} בא to ופועל בסיסי.`))
  }
  out.push(
    choice('Would you mind ___ the door?', 'closing', ['to close', 'close', 'closed'], 'אחרי mind בא ing.'),
    choice('I would like ___ Japan one day.', 'to visit', ['visiting', 'visit', 'visited'], 'אחרי would like בא to ופועל בסיסי.'),
    choice('She made me ___ the song again.', 'sing', ['to sing', 'singing', 'sang'], 'אחרי make ואדם בא פועל בסיסי, בלי to.'),
    choice('They kept ___ during the film.', 'talking', ['to talk', 'talk', 'talked'], 'אחרי keep בא ing.'),
    order('I enjoy reading comics', 'אחרי enjoy בא פועל עם ing.'),
    order('She hopes to visit Japan', 'אחרי hope בא to ופועל בסיסי.'),
  )
  return pack('gerunds-infinitives', out)
}

function tagQuestions(): Question[] {
  const out: Question[] = []
  const likes = ['pizza', 'chess', 'football', 'comics', 'music', 'soup']
  for (const p of GIRLS.slice(0, 4)) {
    out.push(
      choice(
        `${p.en} likes ${likes[p.en.length % likes.length]}, ___?`,
        "doesn't she",
        ['does she', "isn't she", "don't she"],
        'משפט חיובי בהווה פשוט עם she מקבל זנב שלילי: doesn\'t she.',
      ),
    )
  }
  for (const p of BOYS.slice(0, 4)) {
    out.push(
      choice(
        `${p.en} likes ${likes[p.en.length % likes.length]}, ___?`,
        "doesn't he",
        ['does he', "isn't he", "don't he"],
        'משפט חיובי בהווה פשוט עם he מקבל זנב שלילי: doesn\'t he.',
      ),
    )
  }
  for (const g of GROUPS.filter((item) => item.sub === 'they').slice(0, 4)) {
    out.push(
      choice(
        `${g.en} like soup, ___?`,
        "don't they",
        ['do they', "doesn't they", "aren't they"],
        'משפט חיובי ברבים בהווה פשוט מקבל זנב: don\'t they.',
      ),
    )
  }
  for (const food of likes) {
    out.push(
      choice(
        `Noa doesn't like ${food}, ___?`,
        'does she',
        ["doesn't she", 'is she', 'do she'],
        'משפט שלילי בהווה פשוט מקבל זנב חיובי: does she.',
      ),
    )
  }
  for (const event of ['the party', 'the match', 'the lesson', 'the picnic']) {
    out.push(
      choice(
        `They didn't come to ${event}, ___?`,
        'did they',
        ["didn't they", 'do they', 'were they'],
        'משפט שלילי בעבר מקבל זנב חיובי: did they.',
      ),
    )
  }
  const hot = ['today', 'outside', 'in the room', 'this morning']
  for (const when of hot) {
    out.push(choice(`It is cold ${when}, ___?`, "isn't it", ['is it', "doesn't it", "wasn't it"], 'משפט חיובי עם is מקבל זנב: isn\'t it.'))
  }
  for (const skill of ['swim', 'drive', 'cook', 'sing']) {
    out.push(choice(`You can ${skill}, ___?`, "can't you", ['can you', "don't you", "aren't you"], 'משפט חיובי עם can מקבל זנב: can\'t you.'))
  }
  for (const [who, pron] of [
    ['He', 'he'],
    ['She', 'she'],
    ['Tom', 'he'],
    ['Noa', 'she'],
  ] as const) {
    out.push(
      choice(
        `${who} won't be late, ___?`,
        `will ${pron}`,
        [`won't ${pron}`, `is ${pron}`, `does ${pron}`],
        "הצורה won't היא שלילית, ולכן הזנב חיובי עם will והכינוי הנכון.",
      ),
    )
  }
  out.push(
    choice('Your parents work in Haifa, ___?', "don't they", ["doesn't they", "aren't they", 'do they'], 'הורים הם they בהווה פשוט, והזנב השלילי הוא don\'t they.'),
    choice('We have met before, ___?', "haven't we", ["don't we", 'have we', "didn't we"], 'הפועל have ועוד V3 מקבל זנב haven\'t we.'),
    choice('The children were tired, ___?', "weren't they", ['were they', "didn't they", "aren't they"], 'משפט חיובי עם were מקבל זנב weren\'t they.'),
    choice('I am early, ___?', "aren't I", ['am I', "don't I", "isn't I"], 'הזנב של I am הוא aren\'t I.'),
    choice('The dog is hungry, ___?', "isn't it", ['is it', "doesn't it", 'it is'], 'כלב יחיד הוא it, והזנב של is חיובי הוא isn\'t it.'),
    choice('You were at home, ___?', "weren't you", ['were you', "didn't you", "aren't you"], 'משפט חיובי עם were מקבל זנב weren\'t you.'),
    choice('Dana has finished, ___?', "hasn't she", ['has she', "doesn't she", "isn't she"], 'משפט חיובי עם has מקבל זנב hasn\'t she.'),
    choice('The boys can swim, ___?', "can't they", ['can they', "don't they", "aren't they"], 'משפט חיובי עם can ברבים מקבל זנב can\'t they.'),
  )
  return pack('tag-questions', out)
}

export const grade9: Record<string, () => Question[]> = {
  'present-perfect': presentPerfect,
  'perfect-vs-past': perfectVsPast,
  'first-conditional': firstConditional,
  'passive-past': passivePast,
  'past-perfect': pastPerfect,
  'gerunds-infinitives': gerunds,
  'tag-questions': tagQuestions,
}
