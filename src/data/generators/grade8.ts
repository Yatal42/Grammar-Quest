import type { Question } from '../topics'
import { BOYS, GIRLS, GROUPS } from './lexicon'
import { choice, order, pack, take } from './make'

const PEOPLE = [...GIRLS.slice(0, 4), ...BOYS.slice(0, 4)]

function pastProgressive(): Question[] {
  const out: Question[] = []
  const longs = [
    ['eat', 'eating', 'dinner'],
    ['read', 'reading', 'a book'],
    ['play', 'playing', 'football'],
    ['cook', 'cooking', 'soup'],
    ['watch', 'watching', 'a film'],
    ['study', 'studying', 'math'],
    ['clean', 'cleaning', 'the kitchen'],
    ['draw', 'drawing', 'a map'],
  ] as const
  out.push(
    ...take(PEOPLE, longs, 8, (p, [base, ing, obj]) =>
      choice(
        `At 8 pm yesterday ${p.en} ___ ${obj}.`,
        `was ${ing}`,
        [`were ${ing}`, base, `am ${ing}`],
        'בשעה מסוימת בעבר הפעולה הייתה באמצע, ונושא יחיד הולך עם was ועם ing.',
      ),
    ),
  )
  out.push(
    ...take(GROUPS.slice(0, 4), longs, 8, (p, [base, ing, obj]) =>
      choice(
        `${p.en} ___ ${obj} when the rain started.`,
        `were ${ing}`,
        [`was ${ing}`, `${base}ed`, 'are ' + ing],
        'הפעולה הארוכה נמשכה כשמשהו קצר קטע אותה, ונושא ברבים הולך עם were.',
      ),
    ),
  )
  const cuts = [
    ['walking home', 'met', 'meet', 'Maya'],
    ['reading', 'heard', 'hear', 'a noise'],
    ['cooking', 'dropped', 'drop', 'a plate'],
    ['studying', 'got', 'get', 'a message'],
    ['playing outside', 'saw', 'see', 'a rainbow'],
    ['writing', 'lost', 'lose', 'the pen'],
  ] as const
  for (const [long, past, base, obj] of cuts) {
    out.push(
      choice(
        `I was ${long} when I ___ ${obj}.`,
        past,
        [`was ${base}ing`, base, `${base}ing`],
        'הפעולה הקצרה שקוטעת את הארוכה נשארת בעבר פשוט.',
      ),
    )
  }
  for (const [ing, base] of [
    ['cooking', 'cook'],
    ['reading', 'read'],
    ['sleeping', 'sleep'],
    ['singing', 'sing'],
    ['driving', 'drive'],
    ['painting', 'paint'],
  ] as const) {
    out.push(
      choice(
        `While she ___, the lights went out.`,
        `was ${ing}`,
        [base + 'ed', `is ${ing}`, `were ${ing}`],
        'אחרי while באה בדרך כלל הפעולה הארוכה בעבר מתמשך.',
      ),
    )
  }
  for (const hour of ['7', '8', '9', '10']) {
    out.push(
      choice(
        `What ___ you doing at ${hour} o'clock last night?`,
        'were',
        ['was', 'did', 'are'],
        'בשאלה על עבר מתמשך, you הולך עם were.',
      ),
    )
  }
  for (const p of PEOPLE.slice(0, 4)) {
    out.push(
      choice(
        `${p.en} ___ sleeping when we called. ${p.sub === 'she' ? 'She' : 'He'} was awake.`,
        "wasn't",
        ["weren't", "didn't", "isn't"],
        "שלילה של עבר מתמשך בגוף יחיד: wasn't ועוד ing.",
      ),
    )
  }
  out.push(
    order('Tom met Maya near school', 'הפעולה הקצרה בעבר פשוט באה אחרי הנושא.'),
    order('Noa heard a sudden noise', 'הפעולה הקצרה שקוטעת נשארת בעבר פשוט.'),
    order('The children found a coin', 'גם ברבים הפעולה הקצרה בעבר פשוט באה אחרי הנושא.'),
    order('Dan dropped the plate', 'פועל בעבר פשוט מתאר את הרגע הקצר.'),
  )
  return pack('past-progressive', out)
}

function tenseContrast(): Question[] {
  const out: Question[] = []
  const habits = [
    ['My dad', 'walks', 'walk', 'to work'],
    ['Noa', 'reads', 'read', 'before bed'],
    ['Tom', 'plays', 'play', 'football'],
    ['My mom', 'cooks', 'cook', 'dinner'],
    ['Dan', 'studies', 'study', 'math'],
    ['Maya', 'watches', 'watch', 'the news'],
    ['The bus', 'leaves', 'leave', 'at seven'],
    ['Water', 'boils', 'boil', 'at 100 degrees'],
  ] as const
  for (const [who, s, base, rest] of habits) {
    out.push(
      choice(
        `${who} usually ___ ${rest}.`,
        s,
        [`is ${base}ing`, base + 'ing', `was ${base}ing`],
        'המילה usually מתארת הרגל, ולכן הווה פשוט ולא ing.',
      ),
    )
  }
  const states = [
    ['know the answer', 'know'],
    ['like this song', 'like'],
    ['want some water', 'want'],
    ['need a pencil', 'need'],
    ['believe your story', 'believe'],
    ['understand the joke', 'understand'],
  ] as const
  for (const [phrase, base] of states) {
    out.push(
      choice(
        `I ___ ${phrase.split(' ').slice(1).join(' ')}. It is clear to me.`,
        base,
        [`am ${base}ing`, `${base}ing`, `was ${base}ing`],
        'הפועל הזה הוא פועל מצב, ולכן לא שמים אותו ב-ing.',
      ),
    )
  }
  const nows = [
    ['Shh! Grandpa', 'is taking', 'takes', 'a nap'],
    ['Look! The girls', 'are running', 'run', 'to the gate'],
    ['Listen! Someone', 'is playing', 'plays', 'the piano'],
    ['Right now I', 'am writing', 'write', 'an email'],
    ['At the moment we', 'are eating', 'eat', 'lunch'],
    ['Be quiet! The baby', 'is sleeping', 'sleeps', 'in the bedroom'],
  ] as const
  for (const [who, ok, bad, rest] of nows) {
    out.push(
      choice(
        `${who} ___ ${rest}.`,
        ok,
        [bad, `${bad}ing`, 'was ' + ok.split(' ')[1]],
        'הרמז now, Look או Listen מראה שזה קורה עכשיו, ולכן הווה מתמשך.',
      ),
    )
  }
  const yday = [
    ['bought a bike', 'bought', 'buy'],
    ['saw a film', 'saw', 'see'],
    ['ate a sandwich', 'ate', 'eat'],
    ['wrote a story', 'wrote', 'write'],
    ['met the teacher', 'met', 'meet'],
    ['lost her keys', 'lost', 'lose'],
  ] as const
  for (const [phrase, ok, base] of yday) {
    out.push(
      choice(
        `She ___ ${phrase.split(' ').slice(1).join(' ')} last month.`,
        ok,
        [`was ${base}ing`, base, `is ${base}ing`],
        'זמן סגור כמו last month מתאר פעולה שהסתיימה, ולכן עבר פשוט.',
      ),
    )
  }
  const cuts = ['a film', 'a game', 'dinner', 'a lesson', 'a song', 'the news']
  for (const obj of cuts) {
    out.push(
      choice(
        `We ___ ${obj} when suddenly the power went out.`,
        'were watching',
        ['watched', 'are watching', 'watch'],
        'פעולה ארוכה שנקטעה באמצע בעבר נשארת בעבר מתמשך.',
      ),
    )
  }
  const smells = ['milk', 'soup', 'bread', 'juice']
  for (const noun of smells) {
    out.push(
      choice(
        `This ${noun} ___ strange. Is it old?`,
        'smells',
        ['is smelling', 'smelling', 'was smelling'],
        'כשמתארים ריח שיש למשהו, smell הוא פועל מצב בהווה פשוט.',
      ),
    )
  }
  const states2 = [
    ['own this book', 'own'],
    ['seem tired', 'seem'],
    ['prefer tea', 'prefer'],
    ['remember her name', 'remember'],
  ] as const
  for (const [phrase, base] of states2) {
    out.push(
      choice(
        `I ___ ${phrase.split(' ').slice(1).join(' ')} today.`,
        base,
        [`am ${base}ing`, `${base}ing`, `was ${base}ing`],
        'גם היום פועל מצב נשאר בהווה פשוט, בלי ing.',
      ),
    )
  }
  return pack('tense-contrast', out)
}

function relativeClauses(): Question[] {
  const out: Question[] = []
  const people = [
    'sits next to me',
    'lives in Haifa',
    'plays the piano',
    'helps the teacher',
    'won the race',
    'called you yesterday',
    'reads a lot',
    'bakes great cakes',
    'works at the bank',
    'teaches our class',
  ]
  for (const does of people) {
    out.push(
      choice(
        `The girl ___ ${does} is in my class.`,
        'who',
        ['which', 'where', 'whose'],
        'מדברים על אדם, ולכן who.',
      ),
    )
  }
  const things = ['I told you about', 'you lent me', 'is on the desk', 'arrived this morning', 'we bought yesterday', 'has a red cover', 'fell off the shelf', 'needs a new battery']
  for (const rest of things) {
    out.push(choice(`This is the book ___ ${rest}.`, 'which', ['who', 'where', 'whose'], 'מדברים על חפץ, ולכן which.'))
  }
  const places = ['we first met', 'I grew up', 'she works', 'the bus stops', 'we eat lunch', 'they play football']
  for (const rest of places) {
    out.push(choice(`That is the place ___ ${rest}.`, 'where', ['which', 'who', 'whose'], 'מדברים על מקום, ולכן where.'))
  }
  const owns = ['dog bit me', 'bag is red', 'bike is new', 'sister is in my class', 'phone rang', 'house is near the park']
  for (const rest of owns) {
    out.push(choice(`He is the boy ___ ${rest}.`, 'whose', ['who', 'which', "who's"], "מראים למי שייך משהו, ולכן whose. who's פירושו who is."))
  }
  const animals = ['sleeps on my bed', 'likes fish', 'runs very fast', 'has a loud bark', 'lives in the garden', 'follows me to school']
  for (const rest of animals) {
    out.push(choice(`I have a cat ___ ${rest}.`, 'that', ['where', 'whose', 'what'], 'אפשר לתאר בעל חיים עם that.'))
  }
  out.push(
    choice('A nurse is a person ___ helps sick people.', 'who', ['which', 'where', 'what'], 'המילה person מתארת אדם, ולכן who.'),
    choice('A fridge is a machine ___ keeps food cold.', 'which', ['who', 'where', 'whose'], 'המילה machine מתארת חפץ, ולכן which.'),
    order('I met the girl from Haifa', 'כשמתארים אדם אפשר להוסיף who, וכאן הסדר הוא נושא, פועל והאדם.'),
    order('She found the book on math', 'כשמתארים חפץ אפשר להוסיף which, וכאן הסדר הוא נושא ופועל.'),
  )
  return pack('relative-clauses', out)
}

function usedTo(): Question[] {
  const out: Question[] = []
  const habits = [
    'play with dolls',
    'live in Eilat',
    'walk to school',
    'drink milk',
    'fear the dark',
    'collect stickers',
    'ride a small bike',
    'watch cartoons',
    'hate olives',
    'share a room',
  ]
  for (const habit of habits) {
    out.push(
      choice(
        `I ___ ${habit} when I was little.`,
        'used to',
        ['use to', 'was used to', 'used'],
        'הרגל או מצב שהיה פעם וכבר לא: used to ואחריו פועל בסיסי.',
      ),
    )
  }
  const towns = ['Jerusalem', 'Haifa', 'Eilat', 'Akko', 'Jaffa', 'Netanya']
  for (const town of towns) {
    out.push(
      choice(
        `Did you ___ live in ${town}?`,
        'use to',
        ['used to', 'using to', 'uses to'],
        'אחרי Did מורידים את ה-d: use to.',
      ),
    )
  }
  const nowLove = ['coffee', 'math', 'the bus', 'early mornings', 'spicy food', 'long walks']
  for (const thing of nowLove) {
    out.push(
      choice(
        `I ___ like ${thing}, but now I love it.`,
        "didn't use to",
        ["didn't used to", 'used not', "wasn't use to"],
        "שלילה של הרגל בעבר: didn't use to, בלי d.",
      ),
    )
  }
  const bases = [
    ['work', 'on a farm'],
    ['live', 'near the sea'],
    ['teach', 'in a small school'],
    ['play', 'in a band'],
    ['bake', 'bread every Friday'],
    ['walk', 'to the market'],
  ] as const
  for (const [verb, rest] of bases) {
    out.push(
      choice(
        `My grandfather used to ___ ${rest}.`,
        verb,
        [`${verb}s`, `${verb}ing`, `${verb}ed`],
        'אחרי used to בא פועל בצורת הבסיס.',
      ),
    )
  }
  const gone = ['a cinema', 'a library', 'a bakery', 'a park', 'a bookshop', 'a pool']
  for (const place of gone) {
    out.push(
      choice(
        `There ___ be ${place} here, but now it is a bank.`,
        'used to',
        ['use to', 'uses to', 'using to'],
        'מצב שהיה פעם וכבר לא קיים: used to.',
      ),
    )
  }
  for (const thing of ['long hair', 'a bike', 'a cat']) {
    out.push(
      choice(
        `My dad ___ have ${thing}. Now he does not.`,
        'used to',
        ['uses to', 'is used to', 'use to'],
        'משהו שהיה לו פעם וכבר אין: used to have.',
      ),
    )
  }
  out.push(
    order('My grandfather used to fish', 'הביטוי used to בא לפני הפועל הבסיסי ומספר על הרגל ישן.'),
    order('Noa used to draw comics', 'הסדר הוא נושא, used to, ואז הפועל הבסיסי.'),
    order('Tom used to collect stamps', 'הרגל ישן: used to ואחריו הפועל.'),
    order('They used to walk together', 'גם ברבים הסדר הוא used to ואז פועל בסיסי.'),
  )
  return pack('used-to', out)
}

function passive(): Question[] {
  const out: Question[] = []
  const singular = [
    ['English', 'spoken', 'speak'],
    ['Cheese', 'made', 'make'],
    ['Rice', 'grown', 'grow'],
    ['Paper', 'made', 'make'],
    ['Cotton', 'grown', 'grow'],
    ['Hebrew', 'spoken', 'speak'],
    ['Glass', 'recycled', 'recycle'],
    ['Bread', 'baked', 'bake'],
    ['Mail', 'sorted', 'sort'],
    ['Tea', 'grown', 'grow'],
  ] as const
  for (const [noun, v3, base] of singular) {
    out.push(
      choice(
        `${noun} ___ in many countries.`,
        `is ${v3}`,
        [`are ${v3}`, `${base}s`, `is ${base}`],
        'בסביל בהווה, שם יחיד הולך עם is ואחריו V3.',
      ),
    )
  }
  const plural = [
    ['These cars', 'made', 'make'],
    ['The rooms', 'cleaned', 'clean'],
    ['The letters', 'sent', 'send'],
    ['These phones', 'made', 'make'],
    ['The windows', 'washed', 'wash'],
    ['Millions of emails', 'sent', 'send'],
    ['The desks', 'cleaned', 'clean'],
    ['These shirts', 'made', 'make'],
    ['The books', 'printed', 'print'],
    ['The roads', 'checked', 'check'],
  ] as const
  for (const [noun, v3, base] of plural) {
    out.push(
      choice(
        `${noun} ___ every year.`,
        `are ${v3}`,
        [`is ${v3}`, base, `are ${base}`],
        'בסביל בהווה, שם ברבים הולך עם are ואחריו V3.',
      ),
    )
  }
  const agents = ['the principal', 'the chef', 'the teacher', 'a machine', 'the students', 'the city']
  for (const agent of agents) {
    out.push(
      choice(
        `The prize is given ___ ${agent}.`,
        'by',
        ['from', 'with', 'of'],
        'את מי שעושה את הפעולה בסביל מציינים עם by.',
      ),
    )
  }
  const morePassive = [
    ['The rooms', 'are cleaned', 'is cleaned', 'are cleaning', 'clean', 'החדרים לא מנקים את עצמם, ולכן are ועוד V3.'],
    ['This bridge', 'is checked', 'are checked', 'is check', 'checks', 'גשר יחיד בסביל הווה: is ועוד V3.'],
    ['Fresh juice', 'is sold', 'are sold', 'is sell', 'sells', 'מיץ יחיד בסביל: is sold.'],
    ['Tickets', 'are sold', 'is sold', 'are sell', 'sell', 'כרטיסים ברבים בסביל: are sold.'],
    ['The floor', 'is swept', 'are swept', 'is sweep', 'sweeps', 'רצפה יחידה בסביל: is swept.'],
    ['The dishes', 'are washed', 'is washed', 'are wash', 'wash', 'כלים ברבים בסביל: are washed.'],
    ['Olive oil', 'is produced', 'are produced', 'is produce', 'produces', 'שמן יחיד בסביל: is produced.'],
    ['Newspapers', 'are delivered', 'is delivered', 'are deliver', 'deliver', 'עיתונים ברבים בסביל: are delivered.'],
    ['The gate', 'is locked', 'are locked', 'is lock', 'locks', 'שער יחיד בסביל: is locked.'],
    ['The lights', 'are turned', 'is turned', 'are turn', 'turning', 'אורות ברבים בסביל: are turned.'],
  ] as const
  for (const [noun, ok, a, b, c, e] of morePassive) {
    const tail = noun === 'The lights' ? 'off by the guard' : noun === 'Tickets' ? 'at the door' : 'every week'
    out.push(choice(`${noun} ___ ${tail}.`, ok, [a, b, c], e))
  }
  for (const [noun, ok, a, b, c] of [
    ['The museum', 'is opened', 'are opened', 'is open', 'opens'],
    ['The letters', 'are collected', 'is collected', 'are collect', 'collect'],
    ['Honey', 'is collected', 'are collected', 'is collect', 'collects'],
    ['The streets', 'are cleaned', 'is cleaned', 'are clean', 'clean'],
    ['This song', 'is played', 'are played', 'is play', 'plays'],
    ['The tables', 'are set', 'is set', 'are setting', 'set'],
  ] as const) {
    out.push(
      choice(
        `${noun} ___ by the staff every morning.`,
        ok,
        [a, b, c],
        noun.endsWith('s') || noun === 'The streets' || noun === 'The letters' || noun === 'The tables'
          ? 'הנושא ברבים, ולכן בסביל הווה are ואחריו V3.'
          : 'הנושא יחיד, ולכן בסביל הווה is ואחריו V3.',
      ),
    )
  }
  return pack('passive', out)
}

function futureForms(): Question[] {
  const out: Question[] = []
  const times = [
    ['train', 'leaves', 'leave', '7:30'],
    ['film', 'starts', 'start', '8'],
    ['bus', 'arrives', 'arrive', '6:15'],
    ['lesson', 'begins', 'begin', '9'],
    ['shop', 'opens', 'open', '10'],
    ['museum', 'closes', 'close', '5'],
    ['match', 'starts', 'start', '6'],
    ['class', 'ends', 'end', '1'],
  ] as const
  for (const [noun, s, base, time] of times) {
    out.push(
      choice(
        `On the timetable, the ${noun} ___ at ${time}.`,
        s,
        [base, `${base}ing`, `${base}d`],
        'לוח זמנים קבוע נכתב בהווה פשוט, גם כשמדברים על העתיד.',
      ),
    )
  }
  const plans = [
    ['visit my grandmother', 'visiting', 'visit'],
    ['meet Dan', 'meeting', 'meet'],
    ['see the dentist', 'seeing', 'see'],
    ['play in the final', 'playing', 'play'],
    ['help at the shop', 'helping', 'help'],
    ['join the rehearsal', 'joining', 'join'],
  ] as const
  for (const [rest, ing, base] of plans) {
    out.push(
      choice(
        `It is already arranged. I ___ ${rest} tomorrow.`,
        `am ${ing}`,
        [base, `${base}ed`, `was ${ing}`],
        'סידור שכבר נקבע לעתיד נכתב בהווה מתמשך.',
      ),
    )
  }
  for (const event of ['a party', 'a meeting', 'a picnic', 'a quiz', 'lunch', 'a game']) {
    out.push(
      choice(
        `We ___ ${event} on Friday. The room is already booked.`,
        'are having',
        ['had', 'have had', 'were having'],
        'סידור עתידי שכבר סגור, עם we, נכתב are having.',
      ),
    )
  }
  const signs = [
    ['those black clouds', 'rain'],
    ['that thin ice', 'break'],
    ['the full kettle', 'boil'],
    ['those dark clouds', 'storm'],
    ['the shaky ladder', 'fall'],
    ['the crowded bus', 'leave'],
  ] as const
  for (const [sign, verb] of signs) {
    out.push(
      choice(
        `Look at ${sign}! It ___ ${verb}.`,
        'is going to',
        ['are going to', 'going to', 'is go to'],
        'רואים עכשיו סימן ברור, והנושא it הולך עם is going to.',
      ),
    )
  }
  const thinks = ['be sunny', 'be cold', 'rain later', 'snow tonight', 'be windy', 'stay dry']
  for (const rest of thinks) {
    out.push(
      choice(
        `I think it ___ ${rest} tomorrow.`,
        'will',
        ['is', 'does', 'has'],
        'תחזית עם I think נכתבת עם will.',
      ),
    )
  }
  const promises = ['be late', 'forget', 'shout', 'leave early', 'miss it', 'tell anyone']
  for (const rest of promises) {
    out.push(
      choice(
        `I promise I ___ ${rest} again.`,
        "won't",
        ["don't", "didn't", 'am not'],
        "הבטחה לעתיד בשלילה: won't.",
      ),
    )
  }
  for (const noun of ['concert', 'play', 'tour', 'lecture']) {
    out.push(
      choice(
        `What time ___ the ${noun} start tomorrow?`,
        'does',
        ['is', 'do', 'did'],
        'שאלה על לוח זמנים בהווה פשוט, עם נושא יחיד, נפתחת ב-does.',
      ),
    )
  }
  return pack('future-forms', out)
}

export const grade8: Record<string, () => Question[]> = {
  'past-progressive': pastProgressive,
  'tense-contrast': tenseContrast,
  'relative-clauses': relativeClauses,
  'used-to': usedTo,
  passive,
  'future-forms': futureForms,
}
