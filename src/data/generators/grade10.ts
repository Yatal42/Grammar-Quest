import type { Question } from '../topics'
import { choice, order, pack } from './make'

function presentPerfectProgressive(): Question[] {
  const out: Question[] = []
  const waits = ['the bus', 'the train', 'Maya', 'a taxi', 'the lesson', 'lunch', 'the film', 'Dad']
  for (const thing of waits) {
    out.push(
      choice(
        `I ___ for ${thing} for twenty minutes, and I am still here.`,
        'have been waiting',
        ['am waiting', 'waited', 'has been waiting'],
        'הפעולה התחילה לפני עשרים דקות ועדיין נמשכת, ועם I אומרים have been waiting.',
      ),
    )
  }
  for (const city of ['Haifa', 'Eilat', 'Akko', 'Jaffa', 'Netanya', 'Lod']) {
    out.push(
      choice(
        `How long ___ you been living in ${city}?`,
        'have',
        ['has', 'are', 'did'],
        'שאלה עם you על משך עד עכשיו: How long have you been.',
      ),
    )
  }
  const rains = ['this morning', 'noon', 'midnight', 'eight o\'clock', 'sunrise', 'lunchtime']
  for (const point of rains) {
    out.push(
      choice(
        `It ___ raining since ${point}.`,
        'has been',
        ['have been', 'is', 'was'],
        'מאז נקודת זמן ועד עכשיו, עם it: has been raining.',
      ),
    )
  }
  for (const clue of ['Your eyes are red.', 'Your shoes are muddy.', 'You look tired.', 'Your hands are dirty.']) {
    out.push(
      choice(
        `${clue} ___ you been working hard?`,
        'Have',
        ['Has', 'Are', 'Did'],
        'רואים תוצאה עכשיו של פעולה שנמשכה, ועם you השאלה היא Have you been.',
      ),
    )
  }
  for (const span of ['two hours', 'a long time', 'three days', 'ten minutes']) {
    out.push(
      choice(
        `They have been playing football ___ ${span}.`,
        'for',
        ['since', 'ago', 'from'],
        'משך זמן בלי נקודת התחלה הולך עם for.',
      ),
    )
  }
  for (const point of ['Monday', 'May', '2019', 'eight o\'clock']) {
    out.push(
      choice(
        `She has been reading that book ___ ${point}.`,
        'since',
        ['for', 'ago', 'during'],
        'נקודת התחלה הולכת עם since.',
      ),
    )
  }
  for (const friend of ['Dana', 'Noa', 'Tom', 'Maya']) {
    out.push(
      choice(
        `I ___ ${friend} for five years. We are still close.`,
        'have known',
        ['have been knowing', 'am knowing', 'know'],
        'הפועל know הוא פועל מצב, ולכן הווה מושלם רגיל: have known, לא been knowing.',
      ),
    )
  }
  for (const job of ['working', 'studying', 'running', 'painting']) {
    out.push(
      choice(
        `He is tired because he ___ all day.`,
        `has been ${job}`,
        [`have been ${job}`, `is ${job}`, `has been ${job}ed`],
        'הוא עייף עכשיו כי הפעולה נמשכה עד עכשיו: has been ועוד ing.',
      ),
    )
  }
  return pack('present-perfect-progressive', out)
}

function zeroConditional(): Question[] {
  const out: Question[] = []
  const facts = [
    ['heat ice', 'it', 'melts', 'melt', ''],
    ['drop a glass', 'it', 'breaks', 'break', ''],
    ['heat water to 100 degrees', 'it', 'boils', 'boil', ''],
    ['cool water enough', 'it', 'freezes', 'freeze', ''],
    ['heat butter', 'it', 'melts', 'melt', ''],
    ['open the window in winter', 'the room', 'gets', 'get', 'cold'],
    ['mix blue and yellow', 'you', 'get', 'gets', 'green'],
    ['add two and two', 'you', 'get', 'gets', 'four'],
    ['press the bell', 'it', 'rings', 'ring', ''],
    ['touch a flame', 'it', 'burns', 'burn', ''],
  ] as const
  for (const [cond, subject, ok, base, extra] of facts) {
    out.push(
      choice(
        `If you ${cond}, ${subject} ___ ${extra}.`.replace(' ___ .', ' ___.'),
        ok,
        [base, `${base}ing`, `would ${base}`],
        'זו עובדה שתמיד נכונה: אחרי if הווה פשוט, וגם התוצאה בהווה פשוט.',
      ),
    )
  }
  const plants = ['water', 'light', 'air', 'soil', 'warmth', 'care']
  for (const need of plants) {
    out.push(
      choice(
        `If plants ___ ${need}, they die.`,
        "don't get",
        ["won't get", "didn't get", "doesn't get"],
        'צמחים הם רבים, ובעובדה קבועה אחרי if בא don\'t ולא won\'t.',
      ),
    )
  }
  const buttons = ['this button', 'the green key', 'the switch', 'the red lever', 'that icon', 'the pedal']
  for (const button of buttons) {
    out.push(
      choice(
        `If you press ${button}, the machine ___ on.`,
        'turns',
        ['turned', 'turning', 'turn'],
        'תמיד קורה כך. המכונה יחידה, ולכן turns.',
      ),
    )
  }
  const dogs = ['someone knocks', 'the bell rings', 'a stranger arrives', 'the gate opens', 'a cat appears', 'the postman comes']
  for (const trigger of dogs) {
    out.push(
      choice(
        `My dog always ___ if ${trigger}.`,
        'barks',
        ['barked', 'barking', 'bark'],
        'כל פעם שזה קורה הכלב נובח, והנושא יחיד, ולכן barks.',
      ),
    )
  }
  for (const food of ['chocolate', 'cake', 'cola', 'sweets', 'ice cream', 'biscuits']) {
    out.push(
      choice(
        `If my little sister eats ${food} at night, she ___ sleep.`,
        "can't",
        ["couldn't", "didn't", "wasn't"],
        'זו תוצאה שקורית תמיד בהווה, ולכן can\'t ולא צורת עבר.',
      ),
    )
  }
  const materials = [
    ['iron in the rain', 'rusts', 'rust'],
    ['a bike in the rain', 'rusts', 'rust'],
    ['silver in the air', 'tarnishes', 'tarnish'],
    ['ice in the sun', 'melts', 'melt'],
    ['water in the freezer', 'freezes', 'freeze'],
    ['milk in the sun', 'spoils', 'spoil'],
    ['bread in a damp box', 'spoils', 'spoil'],
    ['a candle in the sun', 'melts', 'melt'],
  ] as const
  for (const [thing, ok, base] of materials) {
    out.push(
      choice(
        `If you leave ${thing}, it ___.`,
        ok,
        [base, `${base}ing`, `would ${base}`],
        'זו עובדה קבועה: התוצאה בהווה פשוט.',
      ),
    )
  }
  return pack('zero-conditional', out)
}

function secondConditional(): Question[] {
  const out: Question[] = []
  const hads = ['a bike', 'a piano', 'a garden', 'a camera', 'a boat', 'a ladder', 'a tent', 'a map']
  for (const thing of hads) {
    out.push(
      choice(
        `If I ___ ${thing}, I would use it every week.`,
        'had',
        ['have', 'would have', 'will have'],
        'מצב דמיוני בהווה: אחרי if בא עבר פשוט, had.',
      ),
    )
  }
  const woulds = [
    ['lived near the sea', 'swim'],
    ['had more time', 'read'],
    ['knew the answer', 'tell'],
    ['spoke French', 'help'],
    ['felt better', 'come'],
    ['owned a car', 'drive'],
  ] as const
  for (const [cond, verb] of woulds) {
    out.push(
      choice(
        `If she ${cond}, she ___ every day.`,
        `would ${verb}`,
        [`will ${verb}`, `${verb}s`, `${verb}ed`],
        'בחלק התוצאה של תנאי דמיוני: would ופועל בסיסי.',
      ),
    )
  }
  const roles = ['you', 'the coach', 'the teacher', 'the captain', 'the judge', 'rich']
  for (const role of roles) {
    out.push(
      choice(
        `If I ___ ${role}, I would tell the truth.`,
        'were',
        ['am', 'be', 'will be'],
        'בתנאי דמיוני עם be משתמשים ב-were לכל הגופים.',
      ),
    )
  }
  for (const habit of ['so lazy', 'so noisy', 'so late', 'so careless']) {
    out.push(
      choice(
        `If he ___ ${habit}, he would get better results.`,
        "weren't",
        ["isn't", "won't be", "wouldn't be"],
        'אחרי if בתנאי דמיוני השלילה עם be היא weren\'t.',
      ),
    )
  }
  for (const place of ['out', 'home', 'away', 'to the park']) {
    out.push(
      choice(
        `We ___ go ${place} if it were sunny.`,
        'would',
        ['will', 'did', 'are'],
        'התוצאה הדמיונית נפתחת ב-would.',
      ),
    )
  }
  for (const animal of ['dogs', 'cats', 'birds', 'fish']) {
    out.push(
      choice(
        `If ${animal} could talk, what ___ they say?`,
        'would',
        ['will', 'do', 'did'],
        'מצב דמיוני, ולכן would ולא will.',
      ),
    )
  }
  for (const noun of ['a palace', 'a library', 'a studio', 'a boat', 'a theatre', 'a lab', 'a cabin', 'a studio flat']) {
    out.push(
      choice(
        `If we ___ ${noun}, we would invite everyone.`,
        'had',
        ['have', 'would have', 'will have'],
        'מצב דמיוני: אחרי if בא had, לא have.',
      ),
    )
  }
  return pack('second-conditional', out)
}

function pastPerfectProgressive(): Question[] {
  const out: Question[] = []
  const waits = ['an hour', 'ten minutes', 'a long time', 'two hours', 'half an hour', 'ages']
  for (const span of waits) {
    out.push(
      choice(
        `When I arrived, they ___ for me for ${span}.`,
        'had been waiting',
        ['have been waiting', 'were waited', 'has been waiting'],
        'הם חיכו לפני שהגעתי בעבר: had been waiting.',
      ),
    )
  }
  for (const act of ['studying', 'working', 'driving', 'painting', 'cooking', 'writing']) {
    out.push(
      choice(
        `She was tired because she ___ all night.`,
        `had been ${act}`,
        [`has been ${act}`, `is ${act}`, `had been ${act}ed`],
        'הפעולה נמשכה לפני הרגע שבו הייתה עייפה: had been ועוד ing.',
      ),
    )
  }
  for (const clue of ['The ground was wet.', 'The seats were damp.', 'The street was shiny.', 'The field was muddy.']) {
    out.push(
      choice(
        `${clue} It ___ raining.`,
        'had been',
        ['has been', 'is', 'have been'],
        'הרמז כבר בעבר, ולכן הגשם שלפניו הוא had been raining.',
      ),
    )
  }
  for (const [ing, base] of [
    ['living', 'live'],
    ['working', 'work'],
    ['studying', 'study'],
    ['waiting', 'wait'],
    ['teaching', 'teach'],
    ['training', 'train'],
  ] as const) {
    out.push(
      choice(
        `How long had you been ___ there before you moved?`,
        ing,
        [base, `${base}ed`, `${base}s`],
        'אחרי had been בא פועל עם ing.',
      ),
    )
  }
  for (const span of ['three hours', 'two days', 'a week', 'ten minutes', 'four hours', 'twenty minutes']) {
    out.push(
      choice(
        `We had been driving ___ ${span} when the car stopped.`,
        'for',
        ['since', 'ago', 'during'],
        'משך זמן הולך עם for.',
      ),
    )
  }
  for (const place of ['the garden', 'the garage', 'the kitchen', 'the yard', 'the shed', 'the field', 'the lab', 'the yard behind school']) {
    out.push(
      choice(
        `His hands were dirty because he ___ in ${place}.`,
        'had been working',
        ['has been working', 'have been working', 'had been worked'],
        'הלכלוך הוא תוצאה של עבודה שנמשכה לפני כן: had been working.',
      ),
    )
  }
  for (const minute of ['long', 'a minute', 'five minutes', 'much time']) {
    out.push(
      choice(
        `They ___ been talking for ${minute} when the teacher came in.`,
        "hadn't",
        ["haven't", "didn't", "weren't"],
        'שלילה לפני רגע בעבר: hadn\'t been ועוד ing.',
      ),
    )
  }
  return pack('past-perfect-progressive', out)
}

function adjectivesEdIng(): Question[] {
  const out: Question[] = []
  const feelings = [
    ['boring', 'bored', 'film'],
    ['exciting', 'excited', 'game'],
    ['surprising', 'surprised', 'news'],
    ['interesting', 'interested', 'book'],
    ['tiring', 'tired', 'trip'],
    ['confusing', 'confused', 'map'],
    ['amazing', 'amazed', 'show'],
    ['frightening', 'frightened', 'story'],
    ['annoying', 'annoyed', 'noise'],
    ['embarrassing', 'embarrassed', 'mistake'],
  ] as const
  for (const [ing, ed, noun] of feelings) {
    out.push(
      choice(
        `The ${noun} was very ___.`,
        ing,
        [ed, ing.replace(/ing$/, ''), `${ed}ly`],
        'הדבר גורם לרגש, ולכן שם התואר מסתיים ב-ing.',
      ),
    )
    out.push(
      choice(
        `I was very ___ by the ${noun}.`,
        ed,
        [ing, ing.replace(/ing$/, ''), `${ing}ly`],
        'אני זה שמרגיש, ולכן שם התואר מסתיים ב-ed.',
      ),
    )
  }
  const tastes = [
    ['cake', 'delicious', 'deliciously', 'delicacy'],
    ['soup', 'salty', 'saltily', 'salt'],
    ['juice', 'sweet', 'sweetly', 'sweetness'],
    ['bread', 'fresh', 'freshly', 'freshness'],
  ] as const
  for (const [noun, adj, adv, thing] of tastes) {
    out.push(
      choice(
        `This ${noun} tastes ___.`,
        adj,
        [adv, thing, `more ${adv}`],
        'אחרי taste בא שם תואר, לא תואר פועל.',
      ),
    )
  }
  const looks = [
    ['sad', 'sadly', 'sadness'],
    ['happy', 'happily', 'happiness'],
    ['angry', 'angrily', 'anger'],
    ['tired', 'tiredly', 'tiredness'],
  ] as const
  for (const [adj, adv, noun] of looks) {
    out.push(
      choice(
        `You look ___ today.`,
        adj,
        [adv, noun, `${adv}ness`],
        'אחרי look במשמעות נראה בא שם תואר.',
      ),
    )
  }
  const ly = [
    ['answered the questions', 'correctly', 'correct'],
    ['closed the door', 'quietly', 'quiet'],
    ['explained the rule', 'clearly', 'clear'],
    ['carried the glass', 'carefully', 'careful'],
  ] as const
  for (const [act, adv, adj] of ly) {
    out.push(
      choice(
        `She ${act} ___.`,
        adv,
        [adj, `${adj}ness`, `${adv}ness`],
        'מתארים איך היא עשתה את הפעולה, ולכן תואר פועל.',
      ),
    )
  }
  out.push(
    choice('We live in a ___ house near the park.', 'big old', ['old big', 'big olds', 'oldly big'], 'כשיש כמה שמות תואר, הגודל בא לפני הגיל: big old.'),
    choice('She bought a ___ bag for school.', 'small red', ['red small', 'small reds', 'redly small'], 'הגודל בא לפני הצבע: small red.'),
    choice('He drives a ___ car to work.', 'large new', ['new large', 'large news', 'newly large'], 'הגודל בא לפני הגיל: large new.'),
    choice('They found a ___ box in the attic.', 'small wooden', ['wooden small', 'small woods', 'woodly small'], 'הגודל בא לפני החומר: small wooden.'),
    choice('She wore a ___ dress to the party.', 'long blue', ['blue long', 'long blues', 'bluely long'], 'הגודל או האורך בא לפני הצבע: long blue.'),
    choice('We sat at a ___ table.', 'big round', ['round big', 'big rounds', 'roundly big'], 'הגודל בא לפני הצורה: big round.'),
    order('I feel very excited', 'מי שמרגיש התרגשות מתואר ב-ed, והמילה excited באה אחרי feel.'),
    order('Tom feels really tired', 'העייפות מורגשת אצלו, ולכן tired בא אחרי feel.'),
  )
  return pack('adjectives-ed-ing', out)
}

function thirdConditional(): Question[] {
  const out: Question[] = []
  const ifs = [
    ['left', 'leave', 'the house'],
    ['studied', 'study', 'the map'],
    ['called', 'call', 'me'],
    ['taken', 'take', 'a taxi'],
    ['brought', 'bring', 'a coat'],
    ['asked', 'ask', 'for help'],
    ['saved', 'save', 'the file'],
    ['checked', 'check', 'the time'],
  ] as const
  for (const [v3, base, obj] of ifs) {
    out.push(
      choice(
        `If I had ___ ${obj} earlier, I would have arrived on time.`,
        v3,
        [base, `${base}ing`, `${base}s`],
        'תנאי על העבר: אחרי If ו-had בא V3.',
      ),
    )
  }
  const results = [
    ['If you had told me, I ___ you.', 'would have helped', 'will help', 'helped', 'help'],
    ['If you had asked, I ___ .', 'would have stayed', 'will stay', 'stayed', 'stay'],
    ['If you had warned us, we ___ .', 'would have waited', 'will wait', 'waited', 'wait'],
    ['If you had invited her, she ___ .', 'would have come', 'will come', 'came', 'come'],
    ['If you had explained it, I ___ .', 'would have understood', 'will understand', 'understood', 'understand'],
    ['If you had reminded me, I ___ .', 'would have remembered', 'will remember', 'remembered', 'remember'],
  ] as const
  for (const [q, ok, a, b, c] of results) {
    out.push(choice(q.replace('___ .', '___.'), ok, [a, b, c], 'בחלק התוצאה של תנאי על העבר: would have ועוד V3.'))
  }
  for (const verb of ['fallen', 'stopped', 'slipped', 'tripped']) {
    out.push(
      choice(
        `She would have won the race if she ___ ${verb}.`,
        "hadn't",
        ["didn't", "wouldn't have", "hasn't"],
        'אחרי if על העבר השלילה היא hadn\'t ועוד V3.',
      ),
    )
  }
  for (const place of ['the park', 'the beach', 'town', 'the match']) {
    out.push(
      choice(
        `If it hadn't rained, we ___ to ${place}.`,
        'would have gone',
        ['will go', 'went', 'had gone'],
        'הגשם ירד ולא הלכנו. התוצאה הדמיונית: would have gone.',
      ),
    )
  }
  for (const [v3, base] of [
    ['read', 'reading'],
    ['heard', 'hearing'],
    ['seen', 'seeing'],
    ['written', 'writing'],
  ] as const) {
    out.push(
      choice(
        `What would you have done if you had ___ the sign?`,
        v3,
        [base, `have ${v3}`, `would ${v3}`],
        'אחרי had בא V3 גם בתוך השאלה על העבר.',
      ),
    )
  }
  for (const thing of ['a map', 'a torch', 'water', 'the tickets', 'a coat', 'a phone', 'some food', 'the address', 'a key', 'the password']) {
    out.push(
      choice(
        `If we had taken ${thing}, we ___ lost.`,
        "wouldn't have got",
        ["won't get", "didn't get", "hadn't got"],
        'בתוצאה השלילית על העבר: wouldn\'t have ועוד V3.',
      ),
    )
  }
  for (const [q, ok, a, b, c] of [
    ['If I had seen the sign, I ___ lost.', "wouldn't have got", "won't get", "didn't get", "hadn't got"],
    ['If she had left earlier, she ___ the train.', 'would have caught', 'will catch', 'caught', 'had caught'],
    ['If they had listened, they ___ the answer.', 'would have known', 'will know', 'knew', 'had known'],
    ['If we had hurried, we ___ on time.', 'would have arrived', 'will arrive', 'arrived', 'had arrived'],
  ] as const) {
    out.push(choice(q, ok, [a, b, c], 'תנאי על העבר: בתוצאה would have ועוד V3.'))
  }
  return pack('third-conditional', out)
}

function wishes(): Question[] {
  const out: Question[] = []
  const things = ['a bike', 'a dog', 'a camera', 'a piano', 'a garden', 'a ladder', 'a tent', 'a boat']
  for (const thing of things) {
    out.push(
      choice(
        `I don't have ${thing}. I wish I ___ one.`,
        'had',
        ['have', 'will have', 'having'],
        'משאלה על משהו שלא נכון עכשיו: wish ואחריו עבר פשוט, had.',
      ),
    )
  }
  const tall = ['taller', 'stronger', 'faster', 'quieter', 'braver', 'calmer']
  for (const adj of tall) {
    out.push(
      choice(
        `I wish I ___ ${adj}. I cannot manage it now.`,
        'were',
        ['am', 'will be', 'be'],
        'משאלה על ההווה עם be: were, לא am.',
      ),
    )
  }
  const regrets = [
    ['eaten', 'eat', 'so much cake'],
    ['said', 'say', 'that'],
    ['bought', 'buy', 'it'],
    ['stayed', 'stay', 'so late'],
    ['spent', 'spend', 'all the money'],
    ['forgotten', 'forget', 'the tickets'],
  ] as const
  for (const [v3, base, obj] of regrets) {
    out.push(
      choice(
        `It already happened. I wish I ___ ${obj}.`,
        `hadn't ${v3}`,
        [`didn't ${base}`, `don't ${base}`, `won't ${base}`],
        'חרטה על משהו שכבר קרה: wish ואז had ועוד V3.',
      ),
    )
  }
  for (const [verb, skill] of [
    ['speak', 'French'],
    ['play', 'chess'],
    ['play', 'the piano'],
    ['speak', 'Japanese'],
    ['read', 'music'],
    ['ride', 'a horse'],
  ] as const) {
    out.push(
      choice(
        `She wishes she ___ ${verb} ${skill}.`,
        'could',
        ['can', 'will', 'is able'],
        'משאלה על יכולת שאין עכשיו: wish ו-could.',
      ),
    )
  }
  for (const noise of ['making so much noise', 'shouting', 'playing that song', 'tapping the desk']) {
    out.push(
      choice(
        `I wish my brother ___ stop ${noise}.`,
        'would',
        ['will', 'does', 'is'],
        'כשרוצים שמישהו אחר ישנה התנהגות: wish ו-would.',
      ),
    )
  }
  for (const place of ['there', 'at home', 'at the match', 'with them']) {
    out.push(
      choice(
        `We missed it last night. We wish we ___ ${place}.`,
        'had been',
        ['were', 'are', 'will be'],
        'הפספוס כבר קרה, ולכן wish ו-had been.',
      ),
    )
  }
  for (const thing of ['in the city', 'here', 'so far away', 'alone', 'near the road', 'in a tent']) {
    out.push(
      choice(
        `He wishes he ___ live ${thing}. He hates it.`,
        "didn't",
        ["doesn't", "won't", "isn't"],
        'משאלה על ההווה בשלילה: wish ו-didn\'t.',
      ),
    )
  }
  out.push(order('Dana wishes she owned a bike', 'משאלה על ההווה: wish ואחריו עבר פשוט.'))
  return pack('wishes', out)
}

function modalsAdvanced(): Question[] {
  const out: Question[] = []
  const maybes = ['rain later', 'be late', 'snow tonight', 'be closed', 'cost more', 'take an hour', 'be noisy', 'start early']
  for (const rest of maybes) {
    out.push(
      choice(
        `Take a backup plan. It ___ ${rest}.`,
        'might',
        ['ought', 'is able to', 'supposed'],
        'אולי, בלי ודאות: might ופועל בסיסי.',
      ),
    )
  }
  for (const act of ['play in the game', 'come to class', 'join the trip', 'run the race', 'carry the box', 'climb the hill']) {
    out.push(
      choice(
        `I broke my leg, so I won't ___ ${act} next week.`,
        'be able to',
        ['can', 'could', 'might'],
        'אחרי won\'t אי אפשר לשים can, ולכן be able to.',
      ),
    )
  }
  for (const advice of ['see a doctor', 'tell the teacher', 'rest at home', 'drink water']) {
    out.push(
      choice(
        `You ___ to ${advice} about that.`,
        'ought',
        ['should', 'must', 'might'],
        'רק ought בא לפני to מבין האפשרויות האלה: ought to.',
      ),
    )
  }
  for (const duty of ['be in class at 8', 'wear a uniform', 'bring the form', 'wait outside', 'finish by noon', 'help the coach']) {
    out.push(
      choice(
        `We ___ to ${duty}, but the bus was late.`,
        'were supposed',
        ['supposed', 'are suppose', 'was supposed'],
        'היינו אמורים, עם we בעבר: were supposed to.',
      ),
    )
  }
  for (const reason of ['I was sick', 'the road was closed', 'we had a test', 'the shop was shut', 'it was too late', 'Dad needed help']) {
    out.push(
      choice(
        `Yesterday I ___ stay home because ${reason}.`,
        'had to',
        ['must', 'have to', 'must to'],
        'העבר של must ושל have to הוא had to.',
      ),
    )
  }
  for (const place of ['in the library', 'at home', 'on the bus', 'with Maya']) {
    out.push(
      choice(
        `I am not sure. She ___ be ${place}.`,
        'may',
        ['must to', 'ought', 'is able'],
        'אין ודאות, ולכן may.',
      ),
    )
  }
  for (const task of ['open the old box', 'fix the bike', 'solve the riddle', 'reach the shelf']) {
    out.push(
      choice(
        `After many tries, he ___ ${task}.`,
        'was able to',
        ['could to', 'can', 'might'],
        'הצליח בסוף בעבר: was able to.',
      ),
    )
  }
  for (const act of ['say sorry', 'explain', 'listen', 'try again']) {
    out.push(
      choice(
        `She ___ to ${act}, but she was too shy.`,
        'was supposed',
        ['supposed', 'is suppose', 'were supposed'],
        'היא הייתה אמורה, בגוף יחיד בעבר: was supposed to.',
      ),
    )
  }
  return pack('modals-advanced', out)
}

function modalPerfects(): Question[] {
  const out: Question[] = []
  const regrets = ['studied harder', 'left earlier', 'asked for help', 'checked the map', 'saved the file', 'told the truth']
  for (const act of regrets) {
    out.push(
      choice(
        `I failed that task. I ___ ${act}.`,
        'should have',
        ['must have', 'should', "can't have"],
        'חרטה: היה צריך לעשות ולא עשיתי, should have.',
      ),
    )
  }
  const clues = [
    ['The street is wet.', 'rained'],
    ['The garden is white.', 'snowed'],
    ['The field is muddy.', 'rained'],
    ['The cars are covered in white.', 'snowed'],
    ['The path is slippery.', 'frozen'],
    ['The windows are wet outside.', 'rained'],
  ] as const
  for (const [clue, v3] of clues) {
    out.push(
      choice(
        `${clue} I am sure it ___ ${v3}.`,
        'must have',
        ['should have', 'must', "can't have"],
        'יש סימן ברור ואני בטוח לגבי העבר, ולכן must have.',
      ),
    )
  }
  for (const idea of ['gone to sleep', 'missed the bus', 'left early', 'forgotten the time', 'stayed at home', 'lost his phone']) {
    out.push(
      choice(
        `Dan is not answering. I am not sure, but he ___ ${idea}.`,
        'might have',
        ['must', 'should have', "can't have"],
        'אין ודאות לגבי העבר, ולכן might have.',
      ),
    )
  }
  for (const place of ['there', 'at the shop', 'in the park', 'at my house']) {
    out.push(
      choice(
        `She ___ seen me ${place}. I was in Haifa all day.`,
        "can't have",
        ['must have', 'should have', 'might'],
        'זה לא ייתכן, ולכן can\'t have.',
      ),
    )
  }
  for (const prize of ['the game', 'the race', 'the quiz', 'the match']) {
    out.push(
      choice(
        `We ___ won ${prize}, but we missed the last chance.`,
        'could have',
        ['must have', "can't have", 'should'],
        'היה אפשר אבל זה לא קרה: could have.',
      ),
    )
  }
  for (const food of ['so much cake', 'all the sweets', 'that much cheese', 'three bowls']) {
    out.push(
      choice(
        `You ___ eaten ${food}. Now you feel sick.`,
        "shouldn't have",
        ["mustn't have", "can't have", "couldn't"],
        'עשית משהו בעבר ולא היה כדאי: shouldn\'t have.',
      ),
    )
  }
  for (const [v3, base] of [
    ['told', 'tell'],
    ['called', 'call'],
    ['asked', 'ask'],
    ['warned', 'warn'],
    ['shown', 'show'],
    ['sent', 'send'],
    ['given', 'give'],
    ['written', 'write'],
    ['paid', 'pay'],
    ['brought', 'bring'],
  ] as const) {
    out.push(
      choice(
        `You should have ___ me. I would have helped.`,
        v3,
        [base, `${base}ing`, `to ${base}`],
        'אחרי have בא V3.',
      ),
    )
  }
  return pack('modal-perfects', out)
}

export const grade10: Record<string, () => Question[]> = {
  'present-perfect-progressive': presentPerfectProgressive,
  'zero-conditional': zeroConditional,
  'second-conditional': secondConditional,
  'past-perfect-progressive': pastPerfectProgressive,
  'adjectives-ed-ing': adjectivesEdIng,
}

export const grade11: Record<string, () => Question[]> = {
  'third-conditional': thirdConditional,
  wishes,
  'modals-advanced': modalsAdvanced,
  'modal-perfects': modalPerfects,
}
