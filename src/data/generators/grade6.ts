import type { Question } from '../topics'
import { BOYS, GIRLS, GROUPS, HABITS, IRREGULAR, MASSES, ONES, PAST_TIMES, TIMES, articleFor } from './lexicon'
import { choice, order, pack, take, wrong3 } from './make'

const THIRD = [...GIRLS.slice(0, 4), ...BOYS.slice(0, 4)]
const PLURAL = GROUPS.slice(0, 6)

function presentSimple(): Question[] {
  const out: Question[] = []
  out.push(
    ...take(THIRD, HABITS, 12, (p, v) =>
      choice(
        `${p.en} ___ ${v.obj} ${TIMES[v.obj.length % TIMES.length]}.`,
        v.s,
        [v.b, v.ing, `is ${v.b}`],
        `הנושא בגוף שלישי יחיד וזו הרגל, ולכן מוסיפים s לפועל: ${v.s}.`,
      ),
    ),
  )
  out.push(
    ...take(PLURAL, HABITS, 8, (p, v) =>
      choice(
        `${p.en} ___ ${v.obj} ${TIMES[(v.obj.length + 1) % TIMES.length]}.`,
        v.b,
        [v.s, v.ing, `are ${v.ing}`],
        'הנושא ברבים וזו הרגל, ולכן הפועל נשאר בצורת הבסיס בלי s.',
      ),
    ),
  )
  const foods = ['olives', 'soup', 'fish', 'onions', 'spicy food', 'cold milk']
  out.push(
    ...take(THIRD, foods, 6, (p, food) =>
      choice(
        `${p.en} ___ like ${food}.`,
        "doesn't",
        ["don't", "isn't", 'not'],
        "שלילה בגוף שלישי יחיד נעשית עם doesn't ואחריו פועל בסיסי.",
      ),
    ),
  )
  out.push(
    ...take(PLURAL, foods, 4, (p, food) =>
      choice(
        `${p.en} ___ like ${food}.`,
        "don't",
        ["doesn't", "aren't", 'not'],
        "שלילה ברבים נעשית עם don't ואחריו פועל בסיסי.",
      ),
    ),
  )
  const places = ['Haifa', 'Eilat', 'Akko', 'Jaffa', 'Tzfat', 'Beersheba']
  out.push(
    ...take(THIRD, places, 4, (p, city) =>
      choice(
        `___ ${p.en} live in ${city}?`,
        'Does',
        ['Do', 'Is', 'Are'],
        'שאלה בגוף שלישי יחיד נפתחת ב-Does, ואחריו הפועל בצורת הבסיס.',
      ),
    ),
  )
  out.push(
    ...take(PLURAL, places, 4, (p, city) =>
      choice(
        `___ ${p.en === 'They' || p.en === 'We' ? p.en.toLowerCase() : p.en} live in ${city}?`,
        'Do',
        ['Does', 'Are', 'Is'],
        'שאלה ברבים נפתחת ב-Do, כי הנושא אינו גוף שלישי יחיד.',
      ),
    ),
  )
  out.push(
    ...take(THIRD, HABITS.slice(0, 6), 6, (p, v) =>
      choice(
        `Does ${p.en} ___ ${v.obj} ${TIMES[2]}?`,
        v.b,
        [v.s, v.ing, v.p === v.b ? `is ${v.b}` : v.p],
        'אחרי Does הפועל חוזר לצורת הבסיס, בלי s.',
      ),
    ),
  )
  const facts: Array<[string, string, string]> = [
    ['The sun ___ in the east.', 'rises', 'rise'],
    ['Water ___ at 100 degrees.', 'boils', 'boil'],
    ['A year ___ twelve months.', 'has', 'have'],
    ['The earth ___ around the sun.', 'goes', 'go'],
    ['Ice ___ when the air is warm.', 'melts', 'melt'],
    ['A baby ___ a lot in the first months.', 'sleeps', 'sleep'],
  ]
  for (const [q, ok, base] of facts) {
    out.push(choice(q, ok, [base, `${base}ing`, `is ${base}`], 'זו עובדה קבועה, והנושא יחיד, ולכן הווה פשוט עם s.'))
  }
  out.push(
    order('My sister studies math', 'משפט חיובי בהווה פשוט: נושא ואחריו הפועל.'),
    order('Tom watches cartoons', 'הפועל בא ישר אחרי הנושא במשפט חיובי.'),
    order('The children play football', 'ברבים הפועל נשאר בצורת הבסיס אחרי הנושא.'),
    order('Noa cleans the kitchen', 'בגוף שלישי יחיד הפועל מקבל s ובא אחרי הנושא.'),
  )
  return pack('present-simple', out)
}

function presentProgressive(): Question[] {
  const out: Question[] = []
  const now = [
    { b: 'play', ing: 'playing', rest: 'football' },
    { b: 'read', ing: 'reading', rest: 'a book' },
    { b: 'eat', ing: 'eating', rest: 'lunch' },
    { b: 'draw', ing: 'drawing', rest: 'a picture' },
    { b: 'clean', ing: 'cleaning', rest: 'the room' },
    { b: 'write', ing: 'writing', rest: 'a story' },
    { b: 'make', ing: 'making', rest: 'a cake' },
    { b: 'drink', ing: 'drinking', rest: 'tea' },
  ]
  out.push(
    ...take(THIRD, now, 8, (p, v) =>
      choice(
        `Look! ${p.en} ___ ${v.rest} right now.`,
        `${p.be} ${v.ing}`,
        [`${v.b}s`, v.b, `are ${v.ing}`],
        'המילה Look והמילה now מראות שהפעולה קורית עכשיו, ולכן is או are עם ing.',
      ),
    ),
  )
  const mine = [
    ['homework', 'doing', 'do'],
    ['a letter', 'writing', 'write'],
    ['a cake', 'making', 'make'],
    ['my room', 'cleaning', 'clean'],
  ] as const
  for (const [obj, ing, base] of mine) {
    out.push(
      choice(
        `I ___ ${obj} at the moment.`,
        `am ${ing}`,
        [`is ${ing}`, `are ${ing}`, base],
        'עם I משתמשים ב-am, ואחריו פועל עם ing, כי הפעולה קורית עכשיו.',
      ),
    )
  }
  out.push(
    ...take(PLURAL, now.slice(0, 4), 6, (p, v) =>
      choice(
        `Listen! ${p.en} ___ ${v.rest} at the moment.`,
        `are ${v.ing}`,
        [`is ${v.ing}`, v.b, `are ${v.b}`],
        'הנושא ברבים והפעולה קורית עכשיו, ולכן are ואחריו פועל עם ing.',
      ),
    ),
  )
  const spell = [
    ['swim', 'swimming', 'swiming', 'in the pool'],
    ['run', 'running', 'runing', 'in the yard'],
    ['sit', 'sitting', 'siting', 'on the sofa'],
    ['shop', 'shopping', 'shoping', 'for shoes'],
    ['make', 'making', 'makeing', 'soup'],
    ['write', 'writing', 'writeing', 'an email'],
    ['bake', 'baking', 'bakeing', 'bread'],
    ['dance', 'dancing', 'danceing', 'in the hall'],
  ] as const
  for (const [base, ing, bad, rest] of spell) {
    out.push(
      choice(
        `Look! The girls are ___ ${rest}.`,
        ing,
        [bad, base, `${base}s`],
        'כשהפעולה קורית עכשיו מוסיפים ing, ובודקים אם מורידים e או מכפילים אות.',
      ),
    )
  }
  out.push(
    ...take(THIRD.slice(0, 4), ['cartoons', 'a film', 'the game', 'videos'], 4, (p, obj) =>
      choice(
        `${p.en} ___ ${obj} right now. ${p.sub === 'she' ? 'She' : 'He'} is reading.`,
        "isn't watching",
        ["doesn't watch", 'not watching', "aren't watching"],
        "שלילה של פעולה שקורית עכשיו נעשית עם isn't ואחריו פועל עם ing.",
      ),
    ),
  )
  const shifts = [
    ['walk to school', 'taking', 'the bus', 'walk'],
    ['drink milk', 'drinking', 'juice', 'drink'],
    ['study in my room', 'studying', 'in the kitchen', 'study'],
    ['eat at home', 'eating', 'at school', 'eat'],
    ['read comics', 'reading', 'a book', 'read'],
    ['clean my room', 'cleaning', 'the kitchen', 'clean'],
  ] as const
  for (const [habit, ing, rest, base] of shifts) {
    out.push(
      choice(
        `Every day I ${habit}, but today I ___ ${rest}.`,
        `am ${ing}`,
        [ing, `is ${ing}`, base],
        'כל יום מתאר הרגל, אבל today מתאר מה שקורה עכשיו, ולכן am עם ing.',
      ),
    )
  }
  const qs = [
    ['you', 'are', 'is', 'reading'],
    ['the girls', 'are', 'is', 'doing'],
    ['Tom', 'is', 'are', 'writing'],
    ['Noa', 'is', 'are', 'making'],
  ] as const
  for (const [who, be, other, ing] of qs) {
    out.push(
      choice(
        `What ___ ${who} ___ at the moment?`,
        `${be} / ${ing}`,
        [`${other} / ${ing}`, `do / ${ing}`, `${be} / ${ing.replace(/ing$/, '')}`],
        'שאלה על פעולה שקורית עכשיו נבנית עם am, is או are ועם פועל ב-ing.',
      ),
    )
  }
  return pack('present-progressive', out)
}

function pastSimple(): Question[] {
  const out: Question[] = []
  out.push(
    ...take(THIRD, IRREGULAR, 12, (p, v) =>
      choice(
        `${PAST_TIMES[v.b.length % PAST_TIMES.length]} ${p.en} ___ ${v.obj}.`,
        v.p,
        [v.b, v.bad, v.v3 === v.p ? v.ing : v.v3],
        `זה קרה והסתיים בעבר, והפועל ${v.b} בצורת העבר הוא ${v.p}.`,
      ),
    ),
  )
  out.push(
    ...take(PLURAL, HABITS, 8, (p, v) =>
      choice(
        `${p.en} ___ ${v.obj} ${PAST_TIMES[v.obj.length % PAST_TIMES.length]}.`,
        v.p,
        [v.p === v.b ? `${v.b}ed` : v.b, v.s, v.ing],
        'הפעולה הסתיימה בעבר, ולכן פועל רגיל מקבל ed.',
      ),
    ),
  )
  out.push(
    ...take(ONES.slice(0, 6), IRREGULAR.slice(0, 6), 6, (p, v) =>
      choice(
        `${p.en} ___ ${v.b} ${v.obj} yesterday.`,
        "didn't",
        ["don't", "wasn't", "doesn't"],
        "שלילה בעבר נעשית עם didn't ואחריו הפועל בצורת הבסיס.",
      ),
    ),
  )
  out.push(
    ...take(THIRD, IRREGULAR.slice(0, 6), 6, (p, v) =>
      choice(
        `Did ${p.en} ___ ${v.obj} last week?`,
        v.b,
        [v.p, v.s, v.ing],
        'אחרי Did הפועל חוזר לצורת הבסיס, לא לצורת העבר.',
      ),
    ),
  )
  const wasBits = ['tired', 'hungry', 'late', 'happy', 'cold', 'ready']
  out.push(
    ...take(THIRD, wasBits, 4, (p, adj) =>
      choice(
        `After the game ${p.en} ___ ${adj}.`,
        'was',
        ['were', 'is', 'did'],
        'בעבר, גוף יחיד של he, she או it הולך עם was.',
      ),
    ),
  )
  out.push(
    ...take(PLURAL, wasBits, 4, (p, adj) =>
      choice(
        `${p.en} ___ ${adj} after the trip.`,
        'were',
        ['was', 'are', 'been'],
        'בעבר, נושא ברבים הולך עם were.',
      ),
    ),
  )
  out.push(
    order('Tom bought a bike', 'בעבר הפועל בצורת העבר בא ישר אחרי הנושא.'),
    order('Noa visited Grandma', 'פועל רגיל בעבר מקבל ed ובא אחרי הנושא.'),
    order('The children played football', 'ברבים בעבר הפועל עדיין בצורת העבר אחרי הנושא.'),
    order('Maya wrote a story', 'פועל חריג בעבר בא אחרי הנושא, בלי ed.'),
  )
  return pack('past-simple', out)
}

function thereIs(): Question[] {
  const out: Question[] = []
  const singles = [
    'a cat under the table',
    'a book on the desk',
    'an apple in the bag',
    'a park near the school',
    'an old clock on the wall',
    'a window in the kitchen',
    'an egg in the fridge',
    'a bank on this street',
    'an umbrella by the door',
    'a computer in the lab',
  ]
  for (const phrase of singles) {
    out.push(
      choice(
        `___ ${phrase}.`,
        'There is',
        ['There are', 'It is', 'They are'],
        'לפני שם עצם יחיד משתמשים ב-There is.',
      ),
    )
  }
  const plurals = [
    ['two windows', 'in the room'],
    ['thirty students', 'in my class'],
    ['many chairs', 'in the hall'],
    ['three books', 'on the shelf'],
    ['some apples', 'in the bowl'],
    ['five birds', 'in the tree'],
    ['four bags', 'near the door'],
    ['ten desks', 'in the classroom'],
    ['two cafes', 'on my street'],
    ['many stars', 'in the sky'],
  ] as const
  for (const [noun, place] of plurals) {
    out.push(
      choice(
        `___ ${noun} ${place}.`,
        'There are',
        ['There is', 'They are', 'It has'],
        'לפני שם עצם ברבים משתמשים ב-There are.',
      ),
    )
  }
  const masses = ['milk', 'water', 'juice', 'sugar', 'bread', 'rice']
  for (const noun of masses) {
    out.push(
      choice(
        `___ any ${noun} in the fridge?`,
        'Is there',
        ['Are there', 'There is', 'Has there'],
        'שם עצם שאי אפשר לספור מתנהג כיחיד, ולכן השאלה היא Is there.',
      ),
    )
  }
  const pluralNouns = ['chairs', 'apples', 'windows', 'tickets', 'pencils', 'sandwiches']
  for (const noun of pluralNouns) {
    out.push(
      choice(
        `There ___ any ${noun} in the room.`,
        "aren't",
        ["isn't", 'not', "don't"],
        "לפני שם עצם ברבים השלילה היא There aren't.",
      ),
    )
  }
  for (const noun of ['apples', 'books', 'children', 'cups', 'balls', 'rooms', 'bags', 'boxes']) {
    out.push(
      choice(
        `How many ${noun} ___ in the bag?`,
        'are there',
        ['is there', 'there are', 'there is'],
        'אחרי How many עם שם ברבים השאלה ממשיכה are there.',
      ),
    )
  }
  return pack('there-is', out)
}

function future(): Question[] {
  const out: Question[] = []
  const plans = ['visit Grandma', 'study math', 'play football', 'clean the room', 'bake a cake', 'walk the dog']
  out.push(
    ...take(THIRD, plans, 8, (p, plan) =>
      choice(
        `${p.en} ___ going to ${plan} tomorrow.`,
        p.be,
        wrong3(p.be, ['am', 'is', 'are', 'will']),
        `תוכנית לעתיד: הנושא הולך עם ${p.be} going to ואחריו פועל בסיסי.`,
      ),
    ),
  )
  out.push(
    ...take(PLURAL, plans, 4, (p, plan) =>
      choice(
        `${p.en} ___ going to ${plan} tomorrow.`,
        'are',
        ['is', 'am', 'will'],
        'נושא ברבים בתוכנית לעתיד: are going to ואחריו פועל בסיסי.',
      ),
    ),
  )
  for (const plan of plans) {
    out.push(
      choice(
        `I ___ going to ${plan} tomorrow.`,
        'am',
        ['is', 'are', 'will'],
        'עם I בתוכנית לעתיד משתמשים ב-am going to.',
      ),
    )
  }
  const helps = ['help', 'call', 'meet', 'join', 'text', 'visit']
  for (const verb of helps) {
    out.push(
      choice(
        `Will you ___ me after school?`,
        verb,
        [`${verb}s`, `${verb}ing`, `to ${verb}`],
        'אחרי will בא פועל בצורת הבסיס, בלי to ובלי s.',
      ),
    )
  }
  const secrets = ['tell anyone', 'be late', 'forget you', 'shout', 'leave early', 'miss it']
  for (const rest of secrets) {
    out.push(
      choice(
        `I promise I ___ ${rest}.`,
        "won't",
        ["don't", "didn't", 'not will'],
        "הבטחה לעתיד נעשית עם will, והשלילה שלה היא won't.",
      ),
    )
  }
  out.push(
    ...take(PLURAL, plans.slice(0, 4), 4, (p, plan) =>
      choice(
        `${p.en} ___ going to ${plan}. They are too tired.`,
        "aren't",
        ["isn't", "don't", 'not'],
        "שלילה של תוכנית ברבים: aren't going to.",
      ),
    ),
  )
  const ages = [10, 11, 12, 13, 14, 15]
  for (const age of ages) {
    out.push(
      choice(
        `Next year my brother ___ ${age}.`,
        'will be',
        ['will', 'is will', 'will is'],
        'גיל בעתיד נבנה עם will ואחריו פועל בסיסי: will be.',
      ),
    )
  }
  const signs = [
    ['those black clouds', 'rain'],
    ['that thin ice', 'break'],
    ['the full bus', 'leave'],
    ['those dark clouds', 'storm'],
  ] as const
  for (const [sign, verb] of signs) {
    out.push(
      choice(
        `Look at ${sign}! It ___ ${verb}.`,
        'is going to',
        ['are going to', 'going to', 'is go to'],
        'רואים סימן ברור עכשיו, והנושא it הולך עם is going to.',
      ),
    )
  }
  return pack('future', out)
}

function comparatives(): Question[] {
  const out: Question[] = []
  const short = [
    ['tall', 'taller', 'tallest', 'more tall'],
    ['small', 'smaller', 'smallest', 'more small'],
    ['old', 'older', 'oldest', 'more old'],
    ['fast', 'faster', 'fastest', 'more fast'],
    ['high', 'higher', 'highest', 'more high'],
    ['long', 'longer', 'longest', 'more long'],
    ['short', 'shorter', 'shortest', 'more short'],
    ['cold', 'colder', 'coldest', 'more cold'],
    ['cheap', 'cheaper', 'cheapest', 'more cheap'],
    ['strong', 'stronger', 'strongest', 'more strong'],
    ['clean', 'cleaner', 'cleanest', 'more clean'],
    ['new', 'newer', 'newest', 'more new'],
  ] as const
  const pairs = [
    ['A giraffe', 'a horse'],
    ['This building', 'that house'],
    ['My grandfather', 'my brother'],
    ['A train', 'a bike'],
    ['This mountain', 'that hill'],
    ['A year', 'a month'],
    ['A day', 'a year'],
    ['Winter', 'spring'],
    ['A pencil', 'a phone'],
    ['An elephant', 'a dog'],
    ['This shirt', 'that coat'],
    ['This model', 'that phone'],
  ] as const
  short.forEach((adj, i) => {
    const [a, b] = pairs[i]
    const [word, er, est, more] = adj
    out.push(
      choice(
        `${a} is ___ than ${b}.`,
        er,
        [more, est, `the ${est}`],
        `משווים בין שניים עם than, ו-${word} היא מילה קצרה, ולכן מוסיפים er.`,
      ),
    )
  })
  const doubled = [
    ['big', 'bigger', 'biggest', 'more big'],
    ['hot', 'hotter', 'hottest', 'more hot'],
    ['thin', 'thinner', 'thinnest', 'more thin'],
    ['sad', 'sadder', 'saddest', 'more sad'],
  ] as const
  const yOnes = [
    ['happy', 'happier', 'happiest', 'more happy'],
    ['funny', 'funnier', 'funniest', 'more funny'],
    ['easy', 'easier', 'easiest', 'more easy'],
    ['heavy', 'heavier', 'heaviest', 'more heavy'],
  ] as const
  for (const [word, er, est, more] of [...doubled, ...yOnes]) {
    out.push(
      choice(
        `This one is ___ than that one. The word is ${word}.`,
        er,
        [more, est, `${word}er`],
        word.endsWith('y')
          ? 'מילה קצרה שמסתיימת ב-y: ה-y הופכת ל-i ומוסיפים er לפני than.'
          : 'מילה קצרה שמסתיימת בעיצור-תנועה-עיצור: מכפילים את האות האחרונה ומוסיפים er.',
      ),
    )
  }
  const long = ['interesting', 'beautiful', 'expensive', 'difficult', 'popular', 'careful', 'famous', 'important']
  for (const word of long) {
    out.push(
      choice(
        `Math is ___ ${word} than art for me.`,
        'more',
        ['most', 'the most', 'much'],
        'שם תואר ארוך בהשוואה בין שניים: more לפניו, ואז than.',
      ),
    )
  }
  const supers = [
    ['mountain', 'high', 'highest', 'higher', 'most high'],
    ['student', 'tall', 'tallest', 'taller', 'most tall'],
    ['day', 'cold', 'coldest', 'colder', 'most cold'],
    ['road', 'long', 'longest', 'longer', 'most long'],
    ['shop', 'cheap', 'cheapest', 'cheaper', 'most cheap'],
    ['animal', 'fast', 'fastest', 'faster', 'most fast'],
  ] as const
  for (const [noun, , est, er, most] of supers) {
    out.push(
      choice(
        `It is the ___ ${noun} in the country.`,
        est,
        [er, most, est.slice(0, -3)],
        'הפלגה, הכי מכולם, עם מילה קצרה: the ואז est.',
      ),
    )
  }
  for (const word of long.slice(0, 6)) {
    out.push(
      choice(
        `This is the ___ ${word} story in the book.`,
        'most',
        ['more', 'much', 'the more'],
        'הפלגה עם שם תואר ארוך: the most לפני שם התואר.',
      ),
    )
  }
  out.push(
    choice('My grades are ___ than last year.', 'better', ['gooder', 'best', 'more good'], 'השוואה של good היא חריגה: better, לא gooder.'),
    choice('This is the ___ day of the trip.', 'best', ['better', 'goodest', 'most good'], 'הפלגה של good היא חריגה: the best.'),
    choice('Today I feel ___ than yesterday.', 'worse', ['badder', 'worst', 'more bad'], 'השוואה של bad היא חריגה: worse, לא badder.'),
    choice('That was the ___ game of the season.', 'worst', ['worse', 'baddest', 'most bad'], 'הפלגה של bad היא חריגה: the worst.'),
    choice('Dan runs ___ than his brother.', 'faster', ['more fast', 'fastest', 'more faster'], 'גם תואר פועל קצר בהשוואה מקבל er: faster than.'),
    choice('Please write ___ carefully than last time.', 'more', ['most', 'the most', 'much'], 'תואר פועל ארוך בהשוואה: more לפניו, ואז than.'),
  )
  out.push(
    order('My brother seems taller', 'צורת ההשוואה er באה אחרי הפועל ולפני סיום המשפט.'),
    order('This story seems harder', 'מילה קצרה בהשוואה מקבלת er ובאה אחרי הפועל.'),
    order('That test seems easier', 'מילה שמסתיימת ב-y הופכת ל-ier בהשוואה.'),
    order('The soup tastes better', 'הצורה החריגה better באה אחרי פועל כמו tastes.'),
  )
  return pack('comparatives', out)
}

function quantifiers(): Question[] {
  const out: Question[] = []
  for (const noun of MASSES) {
    out.push(
      choice(
        `How ___ ${noun} do we need?`,
        'much',
        ['many', 'few', 'a few'],
        'שואלים How much על דבר שאי אפשר לספור.',
      ),
    )
  }
  for (const noun of ['brothers', 'sisters', 'books', 'apples', 'tickets', 'chairs', 'pencils', 'friends']) {
    out.push(
      choice(
        `How ___ ${noun} do you have?`,
        'many',
        ['much', 'little', 'a little'],
        'שואלים How many על דברים שאפשר לספור, ברבים.',
      ),
    )
  }
  for (const noun of MASSES.slice(0, 6)) {
    out.push(
      choice(
        `We don't have ___ ${noun} left.`,
        'any',
        ['some', 'many', 'a'],
        'במשפט שלילה משתמשים ב-any, לא ב-some.',
      ),
    )
  }
  const wants = ['juice', 'water', 'bread', 'rice', 'milk', 'soup']
  for (const noun of wants) {
    out.push(
      choice(
        `I'd like ___ ${noun}, please.`,
        'some',
        ['any', 'many', 'a'],
        'בבקשה או במשפט חיובי עם דבר שאי אפשר לספור משתמשים ב-some.',
      ),
    )
  }
  for (const noun of ['people', 'students', 'books', 'birds']) {
    out.push(
      choice(
        `There are ___ ${noun} in the park.`,
        'a lot of',
        ['much', 'a little', 'any'],
        'לפני שם ברבים בכמות גדולה אפשר לומר a lot of, לא much.',
      ),
    )
  }
  for (const noun of ['questions', 'apples', 'friends', 'pencils']) {
    out.push(
      choice(
        `Do you have ___ ${noun}?`,
        'any',
        ['much', 'a', 'some of'],
        'בשאלה רגילה משתמשים ב-any.',
      ),
    )
  }
  for (const noun of ['friends', 'apples', 'books', 'pencils']) {
    out.push(
      choice(
        `I have ___ ${noun} in my bag, so I am fine.`,
        'a few',
        ['a little', 'much', 'little'],
        'כמה פריטים שאפשר לספור: a few, לא a little.',
      ),
    )
  }
  for (const noun of ['sugar', 'milk', 'time', 'money']) {
    out.push(
      choice(
        `Can I have ___ ${noun}, please?`,
        'a little',
        ['a few', 'many', 'few'],
        'קצת מדבר שאי אפשר לספור: a little, לא a few.',
      ),
    )
  }
  return pack('quantifiers', out)
}

function can(): Question[] {
  const out: Question[] = []
  const skills = [
    ['play', 'the piano'],
    ['ride', 'a bike'],
    ['swim', 'well'],
    ['speak', 'English'],
    ['bake', 'a cake'],
    ['draw', 'animals'],
    ['read', 'a map'],
    ['use', 'a computer'],
    ['kick', 'a ball'],
    ['count', 'to one hundred'],
  ] as const
  for (const [verb, rest] of skills) {
    out.push(
      choice(
        `${THIRD[verb.length % THIRD.length].en} can ___ ${rest}.`,
        verb,
        [`${verb}s`, `to ${verb}`, `${verb}ing`],
        'אחרי can בא פועל בצורת הבסיס, בלי to ובלי s.',
      ),
    )
  }
  const cant = [
    ['Penguins are birds, but they ___ fly.', 'עופות שלא עפים, ולכן זו חוסר יכולת: can\'t.'],
    ['A newborn baby ___ talk yet.', 'תינוק שזה עתה נולד עדיין לא מדבר, ולכן can\'t.'],
    ['My dog ___ open the door.', 'כלב לא פותח דלת, ולכן זו חוסר יכולת: can\'t.'],
    ['We ___ see the moon in this dark room.', 'אי אפשר לראות מכאן, ולכן can\'t.'],
    ['He ___ reach the top shelf. It is too high.', 'המדף גבוה מדי, ולכן הוא can\'t.'],
    ['I ___ lift this box. It is too heavy.', 'הקופסה כבדה מדי, ולכן can\'t.'],
    ['They ___ buy it. They have no money.', 'אין להם כסף, ולכן can\'t.'],
    ['She ___ come today. She is in Eilat.', 'היא בעיר אחרת, ולכן can\'t.'],
  ] as const
  for (const [q, e] of cant) {
    out.push(choice(q, "can't", ['can', "don't can", 'not can'], e))
  }
  for (const verb of ['help', 'open', 'hold', 'pass', 'carry', 'check', 'move', 'lift']) {
    out.push(
      choice(
        `___ you ${verb} me with this, please?`,
        'Can',
        ['Do', 'Are', 'Does'],
        'בקשה מנומסת נפתחת ב-Can you ואחריו פועל בסיסי.',
      ),
    )
  }
  const replies = ['swim', 'drive', 'cook', 'sing', 'ski', 'paint', 'read', 'type']
  for (const verb of replies) {
    out.push(
      choice(
        `"Can you ${verb}?" "Yes, I ___."`,
        'can',
        ['do', 'am', verb],
        'תשובה קצרה חיובית לשאלת can היא Yes, I can.',
      ),
    )
  }
  for (const verb of ['swim', 'read', 'cook', 'draw']) {
    out.push(
      choice(
        `My grandpa ___ ${verb} now. He learned it last year.`,
        'can',
        ['cans', 'can to', 'is can'],
        'המילה can לא משתנה לפי הגוף, ואין אחריו to.',
      ),
    )
  }
  out.push(
    order('My little sister reads', 'אחרי can בא פועל בסיסי, ובמשפט בלי can הפועל בא אחרי הנושא.'),
    order('Tom plays the piano', 'היכולת מתוארת במשפט שבו הפועל בא אחרי הנושא.'),
    order('Noa rides a bike', 'סדר המשפט: נושא, פועל, ואז מה שיודעים לעשות.'),
    order('The students speak English', 'ברבים הפועל בצורת הבסיס אחרי הנושא.'),
  )
  return pack('can', out)
}

function pronouns(): Question[] {
  const out: Question[] = []
  for (const p of GIRLS) {
    out.push(
      choice(
        `___ is in my class. Her name is ${p.en}.`,
        'She',
        ['Her', 'He', 'Him'],
        'לפני הפועל בא כינוי גוף נושא, וכאן מדובר בבת, ולכן She.',
      ),
    )
  }
  for (const p of BOYS) {
    out.push(
      choice(
        `___ is in my class. His name is ${p.en}.`,
        'He',
        ['Him', 'She', 'His'],
        'לפני הפועל בא כינוי גוף נושא, וכאן מדובר בבן, ולכן He.',
      ),
    )
  }
  for (const p of ONES.slice(0, 6)) {
    out.push(
      choice(
        `I see ${p.en} every day. I call ___ after school.`,
        p.obj,
        [p.sub, p.abs, p.sub === 'she' ? 'him' : 'her'],
        'אחרי הפועל בא כינוי מושא, לא כינוי נושא.',
      ),
    )
  }
  for (const p of [...GIRLS.slice(0, 3), ...BOYS.slice(0, 3)]) {
    out.push(
      choice(
        `This is ${p.en}. ___ bag is on the chair.`,
        p.det === 'his' ? 'His' : 'Her',
        p.det === 'his' ? ['He', 'Him', 'Her'] : ['She', 'Hers', 'His'],
        'לפני שם עצם בא כינוי שייכות, לפי המין של הבעלים.',
      ),
    )
  }
  out.push(
    choice("Can you help ___? I can't open the door.", 'me', ['I', 'my', 'mine'], 'אחרי הפועל help בא כינוי מושא: me.'),
    choice('We are hungry. ___ want soup.', 'We', ['Us', 'Our', 'Ours'], 'לפני הפועל בא כינוי נושא: We.'),
    choice('Maya and I did ___ homework together.', 'our', ['we', 'us', 'ours'], 'לפני שם עצם, עבור Maya and I, כינוי השייכות הוא our.'),
    choice('The children are playing with ___ ball.', 'their', ['they', 'them', 'there'], 'הכדור של הילדים: their. there פירושו שם, לא שייכות.'),
    choice("This is my ___ room.", "sister's", ['sisters', 'sister', "sisters's"], "שייכות של אדם יחיד נכתבת עם 's אחרי השם."),
    choice('Please give the books to ___. The girls are waiting.', 'them', ['they', 'their', 'theirs'], 'אחרי מילת היחס to בא כינוי מושא: them.'),
    choice('The prize is for ___. I won the race.', 'me', ['I', 'my', 'mine'], 'אחרי מילת היחס for בא כינוי מושא: me.'),
    choice('___ is my best friend. She sits next to me.', 'She', ['Her', 'Hers', 'Herself'], 'לפני הפועל is בא כינוי נושא: She.'),
    choice('This phone is ___. It has my name on it.', 'mine', ['my', 'me', 'I'], 'בלי שם עצם אחריו, השייכות שלי היא mine.'),
  )
  out.push(
    order('Dana gave him a pen', 'הנושא קודם, אחר כך הפועל, אחר כך למי, ואז החפץ.'),
    order('Tom lent her a book', 'כינוי המושא בא אחרי הפועל ולפני החפץ.'),
    order('Noa showed me a photo', 'סדר המשפט: מי עשה, מה עשה, למי, ומה הראה.'),
    order('My aunt sent them a card', 'אחרי הפועל בא כינוי המושא ואז החפץ.'),
  )
  return pack('pronouns', out)
}

function articles(): Question[] {
  const out: Question[] = []
  const vowel = ['apple', 'orange', 'egg', 'umbrella', 'idea', 'hour', 'honest answer', 'elephant', 'ice cream', 'old bike', 'owl', 'island', 'uncle']
  const consonant = ['dog', 'book', 'house', 'uniform', 'university', 'euro', 'cat', 'bike', 'red bag', 'yellow ball', 'school', 'pencil', 'garden']
  for (const word of vowel) {
    const head = word.split(' ')[0]
    const art = articleFor(head)
    out.push(
      choice(
        `I need ___ ${word}.`,
        art,
        wrong3(art, ['a', 'an', 'the', 'some']),
        art === 'an'
          ? 'לפני צליל תנועה משתמשים ב-an, גם אם האות עצמה היא עיצור.'
          : 'לפני צליל עיצור משתמשים ב-a.',
      ),
    )
  }
  for (const word of consonant) {
    const head = word.split(' ')[0]
    const art = articleFor(head)
    out.push(
      choice(
        `She has ___ ${word}.`,
        art,
        wrong3(art, ['a', 'an', 'the', 'some']),
        art === 'a'
          ? 'לפני צליל עיצור משתמשים ב-a, גם כשהמילה נראית כאילו היא מתחילה בתנועה.'
          : 'לפני צליל תנועה משתמשים ב-an.',
      ),
    )
  }
  const unique = [
    ['sun', 'יש רק שמש אחת, ולכן the.'],
    ['moon', 'יש רק ירח אחד שאנחנו רואים, ולכן the.'],
    ['sky', 'השמיים הם יחידים בהקשר הזה, ולכן the.'],
    ['floor', 'הרצפה של החדר ידועה, ולכן the.'],
  ] as const
  for (const [noun, e] of unique) {
    out.push(choice(`___ ${noun} is bright today.`, 'The', ['A', 'An', 'Some'], e))
  }
  const jobs = ['doctor', 'teacher', 'nurse', 'pilot', 'baker', 'student', 'actor', 'engineer']
  for (const job of jobs) {
    const art = articleFor(job)
    out.push(
      choice(
        `My cousin is ___ ${job}.`,
        art,
        wrong3(art, ['a', 'an', 'the', 'some']),
        'מקצוע ביחיד מקבל a או an לפי הצליל הראשון.',
      ),
    )
  }
  const second = [
    ['dog', 'park'],
    ['cat', 'garden'],
    ['bag', 'classroom'],
    ['bird', 'tree'],
  ] as const
  for (const [noun, place] of second) {
    out.push(
      choice(
        `I saw a ${noun} in the ${place}. ___ ${noun} was very calm.`,
        'The',
        ['A', 'An', 'Some'],
        'בפעם השנייה מדברים על אותו דבר שכבר הזכרנו, ולכן the.',
      ),
    )
  }
  return pack('articles', out)
}

function prepositions(): Question[] {
  const out: Question[] = []
  const clocks = ["5 o'clock", "7 o'clock", "8 o'clock", 'noon', 'night', 'midnight']
  for (const time of clocks) {
    out.push(choice(`The lesson starts ___ ${time}.`, 'at', ['on', 'in', 'to'], 'לפני שעה או נקודת זמן קצרה משתמשים ב-at.'))
  }
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  for (const day of days) {
    out.push(choice(`We have English ___ ${day}.`, 'on', ['in', 'at', 'to'], 'לפני יום בשבוע משתמשים ב-on.'))
  }
  const months = ['July', 'May', 'March', 'October', 'summer', 'winter']
  for (const month of months) {
    out.push(
      choice(
        `My birthday is ___ ${month}.`,
        'in',
        ['on', 'at', 'to'],
        'לפני חודש או עונה משתמשים ב-in.',
      ),
    )
  }
  const cities = ['Haifa', 'Eilat', 'Akko', 'Jaffa', 'Israel', 'the classroom']
  for (const place of cities) {
    out.push(choice(`I live ___ ${place}.`, 'in', ['on', 'at', 'to'], 'לפני עיר, מדינה או מקום סגור משתמשים ב-in.'))
  }
  const insides = ['my bag', 'the box', 'the fridge', 'the drawer', 'the cupboard', 'her pocket']
  for (const place of insides) {
    out.push(choice(`The keys are ___ ${place}.`, 'in', ['at', 'to', 'between'], 'כשמשהו נמצא בתוך דבר אחר משתמשים ב-in.'))
  }
  const surfaces = ['the table', 'the wall', 'the floor', 'the shelf', 'the desk', 'the sofa']
  for (const place of surfaces) {
    out.push(choice(`The book is ___ ${place}.`, 'on', ['in', 'at', 'to'], 'כשמשהו נמצא על משטח משתמשים ב-on.'))
  }
  const unders = ['the bed', 'the chair', 'the desk', 'the sofa']
  for (const place of unders) {
    out.push(choice(`My shoes are ___ ${place}.`, 'under', ['on', 'at', 'between'], 'כשמשהו נמצא מתחת למשטח משתמשים ב-under.'))
  }
  const betweens = [
    ['the cafe', 'the bank'],
    ['the school', 'the park'],
    ['my house', 'the shop'],
    ['the tree', 'the gate'],
  ] as const
  for (const [a, b] of betweens) {
    out.push(
      choice(
        `The bus stop is ___ ${a} and ${b}.`,
        'between',
        ['next', 'under', 'at'],
        'בין שני מקומות משתמשים ב-between.',
      ),
    )
  }
  out.push(order('The party starts Friday', 'יום בשבוע בא עם on, אבל כאן סדר המילים הוא נושא, פועל, ואז היום.'))
  return pack('prepositions', out)
}

function questionWords(): Question[] {
  const out: Question[] = []
  const where = ['Haifa', 'Eilat', 'Akko', 'Jaffa', 'Netanya', 'Lod']
  for (const place of where) {
    out.push(choice(`___ do you live? In ${place}.`, 'Where', ['When', 'Who', 'What'], 'התשובה היא מקום, ולכן מילת השאלה היא Where.'))
  }
  const when = ['On May 5th', 'In July', 'On Sunday', 'At noon', 'In winter', 'On Friday']
  for (const time of when) {
    out.push(choice(`___ is the trip? ${time}.`, 'When', ['Where', 'Who', 'How'], 'התשובה היא זמן, ולכן מילת השאלה היא When.'))
  }
  const who = [
    ['He is my uncle.', 'התשובה מתארת אדם, ולכן Who.'],
    ['She is my aunt.', 'התשובה מתארת אדם, ולכן Who.'],
    ['They are my cousins.', 'התשובה מתארת אנשים, ולכן Who.'],
    ['He is the new teacher.', 'התשובה מתארת אדם, ולכן Who.'],
  ] as const
  for (const [answer, e] of who) {
    out.push(choice(`___ is that? ${answer}`, 'Who', ['What', 'Where', 'How'], e))
  }
  const why = ['I lost my phone', 'the bus was late', 'I feel sick', 'it is cold', 'I forgot the book', 'we missed the film']
  for (const reason of why) {
    out.push(
      choice(
        `___ are you upset? Because ${reason}.`,
        'Why',
        ['What', 'Who', 'Where'],
        'התשובה נפתחת ב-Because, ולכן השאלה היא Why.',
      ),
    )
  }
  const ages = [10, 11, 12, 13, 14, 15]
  for (const age of ages) {
    out.push(choice(`___ old are you? I am ${age}.`, 'How', ['What', 'Who', 'When'], 'שואלים על גיל עם How old.'))
  }
  const how = ['By bus', 'By bike', 'On foot', 'By train']
  for (const way of how) {
    out.push(choice(`___ do you go to school? ${way}.`, 'How', ['What', 'Who', 'Where'], 'התשובה מתארת דרך, ולכן How.'))
  }
  for (const p of THIRD.slice(0, 4)) {
    out.push(
      choice(
        `What ___ ${p.en} like to eat?`,
        'does',
        ['do', 'is', 'are'],
        'בשאלה בהווה פשוט עם גוף שלישי יחיד משתמשים ב-does.',
      ),
    )
  }
  for (const noun of ['sisters', 'brothers', 'books', 'apples']) {
    out.push(
      choice(
        `___ ${noun} do you have? Two.`,
        'How many',
        ['How much', 'How old', 'What many'],
        'שם עצם ברבים שאפשר לספור: How many.',
      ),
    )
  }
  return pack('question-words', out)
}

function connectors(): Question[] {
  const out: Question[] = []
  const ands = [
    ['apples', 'bananas'],
    ['cats', 'dogs'],
    ['math', 'English'],
    ['pizza', 'salad'],
    ['football', 'basketball'],
    ['blue', 'green'],
    ['reading', 'drawing'],
    ['milk', 'bread'],
  ] as const
  for (const [a, b] of ands) {
    out.push(choice(`I like ${a} ___ ${b}.`, 'and', ['but', 'because', 'than'], 'מוסיפים עוד דבר מאותו סוג, ולכן and.'))
  }
  const buts = [
    ['The test was hard', 'I got 100'],
    ['The film was long', 'I enjoyed it'],
    ['The soup was hot', 'I finished it'],
    ['He is young', 'he is careful'],
    ['The bag is small', 'it is heavy'],
    ['She was tired', 'she helped us'],
    ['The shop was closed', 'we found another one'],
    ['It was raining', 'we still played'],
  ] as const
  for (const [left, right] of buts) {
    out.push(choice(`${left}, ___ ${right}.`, 'but', ['because', 'or', 'than'], 'יש כאן ניגוד בין שני חלקי המשפט, ולכן but.'))
  }
  const ors = [
    ['tea', 'coffee'],
    ['the park', 'the beach'],
    ['pizza', 'pasta'],
    ['a bus', 'a bike'],
    ['blue', 'red'],
    ['Sunday', 'Monday'],
  ] as const
  for (const [a, b] of ors) {
    out.push(
      choice(
        `Do you want ${a} ___ ${b}? You choose.`,
        'or',
        ['but', 'because', 'than'],
        'יש בחירה בין שתי אפשרויות, ולכן or.',
      ),
    )
  }
  const becauses = [
    ['I am wearing a coat', 'it is cold'],
    ['I stayed home', 'I was sick'],
    ['We took a taxi', 'the bus was full'],
    ['She is happy', 'she passed the test'],
    ['He bought bread', 'we had none'],
    ['They whispered', 'the baby was asleep'],
    ['I opened the window', 'the room was hot'],
    ['We left early', 'the match ended'],
  ] as const
  for (const [left, right] of becauses) {
    out.push(choice(`${left} ___ ${right}.`, 'because', ['but', 'or', 'than'], 'החלק השני הוא הסיבה לחלק הראשון, ולכן because.'))
  }
  const moreBut = [
    ['The book was long', 'I finished it'],
    ['The cake looked plain', 'it tasted great'],
    ['The room was small', 'it felt cozy'],
    ['He studied little', 'he still passed'],
  ] as const
  for (const [left, right] of moreBut) {
    out.push(choice(`${left}, ___ ${right}.`, 'but', ['because', 'or', 'than'], 'יש ניגוד בין שני החלקים, ולכן but.'))
  }
  const moreBecause = [
    ['I took a coat', 'the wind was strong'],
    ['She drank water', 'she was thirsty'],
    ['We sat down', 'our legs were tired'],
    ['He called home', 'he missed his family'],
  ] as const
  for (const [left, right] of moreBecause) {
    out.push(choice(`${left} ___ ${right}.`, 'because', ['but', 'or', 'than'], 'החלק השני נותן את הסיבה, ולכן because.'))
  }
  out.push(
    order('We stayed inside during lunch', 'סדר המשפט הוא נושא, פועל, ואז מתי.'),
    order('She bought bread for lunch', 'המשפט מתאר מה קנו ולשם מה, בסדר של נושא ופועל.'),
  )
  return pack('connectors', out)
}

function adverbs(): Question[] {
  const out: Question[] = []
  const never = [
    'She ___ late. She is always on time.',
    'Tom ___ rude. He is kind every day.',
    'The bus ___ early. It always comes late.',
    'Noa ___ noisy. She is very quiet.',
    'My dad ___ late for work. He arrives early.',
    'The shop ___ closed on Sunday. It stays open.',
  ]
  for (const q of never) {
    out.push(
      choice(q, 'is never', ['never is', 'is always', 'always is'], 'תואר תדירות בא אחרי is, והמשפט השני מראה שהתשובה היא never.'),
    )
  }
  const always = [
    ['I ___ breakfast. I eat it every day.', 'always eat', 'eat'],
    ['We ___ the bus. We take it every morning.', 'always take', 'take'],
    ['They ___ homework. They do it every night.', 'always do', 'do'],
    ['My friends ___ football. They play it every Friday.', 'always play', 'play'],
    ['Noa ___ her room. She cleans it every evening.', 'always cleans', 'cleans'],
    ['Dan ___ comics. He reads them every night.', 'always reads', 'reads'],
  ] as const
  for (const [q, ok, base] of always) {
    out.push(
      choice(q, ok, [`${base} always`, `never ${base}`, `${base} never`], 'תואר תדירות בא לפני הפועל הרגיל, והמשפט השני מראה שזה always.'),
    )
  }
  const sometimes = [
    'We ___ go to the cinema, maybe once a month.',
    'I ___ bake a cake, about twice a month.',
    'They ___ visit the museum, not every week.',
    'She ___ walks to school, only on sunny days.',
    'He ___ calls his uncle, about once a month.',
    'We ___ eat out, only on special days.',
  ]
  for (const q of sometimes) {
    out.push(choice(q, 'sometimes', ['always', 'never', 'every'], 'זה קורה מדי פעם ולא תמיד, ולכן sometimes.'))
  }
  const manners = [
    ['The glass is full, so carry it ___.', 'carefully', 'careful', 'carefulness'],
    ['We are late, so please walk ___.', 'quickly', 'quick', 'quickness'],
    ['The baby is asleep, so speak ___.', 'quietly', 'quiet', 'quietness'],
    ['The road is wet, so drive ___.', 'safely', 'safe', 'safeness'],
    ['He is a guest, so he speaks ___.', 'politely', 'polite', 'politeness'],
    ['The soup is hot, so eat ___.', 'slowly', 'slow', 'slowness'],
    ['Dana sings ___. Everyone loves her voice.', 'beautifully', 'beautiful', 'beauty'],
    ['The children played ___. They kept smiling.', 'happily', 'happy', 'happiness'],
  ] as const
  for (const [q, adv, adj, noun] of manners) {
    out.push(
      choice(q, adv, [adj, noun, `${adv.slice(0, -2)}ley`], 'מתארים איך עושים את הפעולה, ולכן תואר פועל ולא שם תואר.'),
    )
  }
  const wells = ['football', 'the piano', 'chess', 'tennis', 'basketball', 'the drums']
  for (const skill of wells) {
    out.push(
      choice(
        `My brother plays ${skill} very ___.`,
        'well',
        ['good', 'goodly', 'best'],
        'המילה good היא שם תואר. תואר הפועל של טוב הוא well.',
      ),
    )
  }
  const adjectives = [
    ['singer', 'good'],
    ['driver', 'careful'],
    ['student', 'quiet'],
    ['runner', 'fast'],
  ] as const
  for (const [noun, adj] of adjectives) {
    out.push(
      choice(
        `She is a ___ ${noun}.`,
        adj,
        ['well', `${adj}ly`, 'beautifully'],
        'לפני שם עצם בא שם תואר, לא תואר פועל.',
      ),
    )
  }
  out.push(
    order('They usually walk back', 'תואר התדירות usually בא לפני הפועל הרגיל.'),
    order('She often reads comics', 'תואר התדירות often בא לפני הפועל.'),
    order('We sometimes bake bread', 'תואר התדירות sometimes בא לפני הפועל.'),
    order('Tom never eats olives', 'המילה never נעולה לפני הפועל.'),
  )
  return pack('adverbs', out)
}

export const grade6: Record<string, () => Question[]> = {
  'present-simple': presentSimple,
  'present-progressive': presentProgressive,
  'past-simple': pastSimple,
  'there-is': thereIs,
  future,
  comparatives,
  quantifiers,
  can,
  pronouns,
  articles,
  prepositions,
  'question-words': questionWords,
  connectors,
  adverbs,
}
