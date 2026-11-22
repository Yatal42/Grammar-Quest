export type LessonUse = { use: string; en: string; he: string }
export type Formula = { label: string; parts: string[]; ex: string }
export type LessonTable = { title?: string; head: string[]; rows: string[][] }
export type SpellingRule = { rule: string; ex: string }
export type LessonMistake = { bad: string; good: string; why: string }

export type Lesson = {
  what: string
  uses: LessonUse[]
  build: Formula[]
  tables?: LessonTable[]
  signals?: string[]
  signalsTitle?: string
  spelling?: SpellingRule[]
  mistakes: LessonMistake[]
  remember: string
}

export const LESSONS: Record<string, Lesson> = {
  'present-simple': {
    what: 'הווה פשוט מתאר דברים שקורים באופן קבוע: הרגלים, שגרה ועובדות שתמיד נכונות. זה לא מה שקורה ממש עכשיו, אלא מה שקורה "בדרך כלל".',
    uses: [
      { use: 'הרגלים ושגרה', en: 'I brush my teeth every morning.', he: 'אני מצחצח שיניים כל בוקר.' },
      { use: 'עובדות ודברים שתמיד נכונים', en: 'Water boils at 100 degrees.', he: 'מים רותחים ב-100 מעלות.' },
      { use: 'מה אוהבים, רוצים או יודעים', en: 'She loves pizza.', he: 'היא אוהבת פיצה.' },
      { use: 'לוחות זמנים קבועים', en: 'The bus leaves at 7:30.', he: 'האוטובוס יוצא ב-7:30.' },
    ],
    build: [
      { label: 'חיובי', parts: ['נושא', 'V1 (+s)'], ex: 'I play. / She plays.' },
      { label: 'שלילי', parts: ['נושא', "don't / doesn't", 'V1'], ex: "He doesn't play." },
      { label: 'שאלה', parts: ['Do / Does', 'נושא', 'V1', '?'], ex: 'Does she play?' },
    ],
    tables: [
      {
        head: ['גוף', 'חיובי', 'שלילי', 'שאלה'],
        rows: [
          ['I / you / we / they', 'play', "don't play", 'Do … play?'],
          ['he / she / it', 'plays', "doesn't play", 'Does … play?'],
        ],
      },
    ],
    signals: ['always', 'usually', 'often', 'sometimes', 'never', 'every day', 'on Mondays', 'once a week'],
    spelling: [
      { rule: 'רוב הפעלים: מוסיפים s', ex: 'play → plays, read → reads' },
      { rule: 'פועל שנגמר ב-s, sh, ch, x, o: מוסיפים es', ex: 'watch → watches, go → goes, fix → fixes' },
      { rule: 'עיצור + y: ה-y הופך ל-ies', ex: 'study → studies, fly → flies' },
      { rule: 'תנועה + y: מוסיפים רק s', ex: 'play → plays, buy → buys' },
      { rule: 'חריג: have הופך ל-has', ex: 'She has a dog.' },
    ],
    mistakes: [
      { bad: 'She play tennis.', good: 'She plays tennis.', why: 'עם he / she / it מוסיפים s לפועל.' },
      { bad: "He doesn't plays.", good: "He doesn't play.", why: "אחרי does / doesn't הפועל חוזר לצורת הבסיס." },
      { bad: 'Do she like cats?', good: 'Does she like cats?', why: 'עם he / she / it שואלים עם Does.' },
      { bad: 'I am go to school every day.', good: 'I go to school every day.', why: 'בהווה פשוט אין am / is / are לפני פועל רגיל.' },
    ],
    remember: 'הטריק: he / she / it = s! וה-s מופיעה רק פעם אחת: או בפועל (plays) או ב-does (does play).',
  },

  'present-progressive': {
    what: 'הווה מתמשך מתאר פעולה שקורה ממש עכשיו, ברגע הדיבור, או בתקופה הזו. בעברית אין לזה זמן מיוחד, אבל באנגלית חשוב להבדיל בין "בדרך כלל" (הווה פשוט) לבין "עכשיו".',
    uses: [
      { use: 'משהו שקורה ממש עכשיו', en: 'Look! It is snowing.', he: 'תראו! יורד שלג.' },
      { use: 'משהו זמני, בתקופה הזו', en: "I'm reading a great book this week.", he: 'אני קורא ספר מעולה השבוע.' },
      { use: 'תוכנית קרובה שכבר סגרנו', en: "We're meeting Dana tomorrow.", he: 'אנחנו נפגשים עם דנה מחר.' },
      { use: 'שינוי שקורה עכשיו', en: 'The weather is getting colder.', he: 'מזג האוויר נעשה קר יותר.' },
    ],
    build: [
      { label: 'חיובי', parts: ['נושא', 'am / is / are', 'V-ing'], ex: 'She is dancing.' },
      { label: 'שלילי', parts: ['נושא', 'am / is / are + not', 'V-ing'], ex: "They aren't sleeping." },
      { label: 'שאלה', parts: ['Am / Is / Are', 'נושא', 'V-ing', '?'], ex: 'Are you listening?' },
    ],
    tables: [
      {
        head: ['גוף', 'be', 'דוגמה'],
        rows: [
          ['I', 'am', "I'm eating"],
          ['he / she / it', 'is', "she's eating"],
          ['you / we / they', 'are', "we're eating"],
        ],
      },
    ],
    signals: ['now', 'right now', 'at the moment', 'today', 'this week', 'Look!', 'Listen!', 'Be quiet!'],
    spelling: [
      { rule: 'רוב הפעלים: מוסיפים ing', ex: 'play → playing, read → reading' },
      { rule: 'פועל שנגמר ב-e שקטה: מורידים את ה-e', ex: 'make → making, write → writing' },
      { rule: 'הברה אחת עם עיצור-תנועה-עיצור: מכפילים את האות האחרונה', ex: 'swim → swimming, run → running, sit → sitting' },
      { rule: 'פועל שנגמר ב-ie: הופך ל-y', ex: 'lie → lying, die → dying' },
    ],
    mistakes: [
      { bad: 'I playing now.', good: "I'm playing now.", why: 'אל תשכחו את am / is / are!' },
      { bad: 'She is play.', good: 'She is playing.', why: 'צריך גם את ה-ing.' },
      { bad: 'I am knowing the answer.', good: 'I know the answer.', why: 'פעלים של מחשבה והרגשה (know, like, want, need) כמעט לא באים עם ing.' },
      { bad: 'Look! The dog runs.', good: 'Look! The dog is running.', why: 'המילה Look! אומרת שזה קורה עכשיו.' },
    ],
    remember: 'הנוסחה: am / is / are + ing. שני החלקים חובה! ופעלים של מחשבה והרגשה כמו know, like, want נשארים בהווה פשוט.',
  },

  'past-simple': {
    what: 'עבר פשוט מתאר פעולה שהתחילה ונגמרה בעבר, בזמן מסוים: אתמול, בשבוע שעבר, לפני שנה.',
    uses: [
      { use: 'פעולה שנגמרה בזמן מסוים בעבר', en: 'I visited my grandma yesterday.', he: 'ביקרתי את סבתא שלי אתמול.' },
      { use: 'רצף של פעולות בעבר (סיפור)', en: 'He woke up, ate breakfast and left.', he: 'הוא התעורר, אכל ארוחת בוקר ויצא.' },
      { use: 'מצב או הרגל שהיה בעבר', en: 'When I was five, I played with Lego every day.', he: 'כשהייתי בן חמש, שיחקתי בלגו כל יום.' },
    ],
    build: [
      { label: 'חיובי', parts: ['נושא', 'V2'], ex: 'We played. / We went.' },
      { label: 'שלילי', parts: ['נושא', "didn't", 'V1'], ex: "We didn't go." },
      { label: 'שאלה', parts: ['Did', 'נושא', 'V1', '?'], ex: 'Did you go?' },
    ],
    tables: [
      {
        title: 'הפועל be בעבר',
        head: ['גוף', 'חיובי', 'שלילי', 'שאלה'],
        rows: [
          ['I / he / she / it', 'was', "wasn't", 'Was …?'],
          ['you / we / they', 'were', "weren't", 'Were …?'],
        ],
      },
      {
        title: 'פעלים חריגים נפוצים',
        head: ['V1', 'V2', 'פירוש'],
        rows: [
          ['go', 'went', 'ללכת'],
          ['see', 'saw', 'לראות'],
          ['eat', 'ate', 'לאכול'],
          ['have', 'had', 'יש לי (היה לי)'],
          ['do', 'did', 'לעשות'],
          ['come', 'came', 'לבוא'],
          ['take', 'took', 'לקחת'],
          ['buy', 'bought', 'לקנות'],
          ['write', 'wrote', 'לכתוב'],
          ['make', 'made', 'להכין'],
        ],
      },
    ],
    signals: ['yesterday', 'last week', 'last year', 'two days ago', 'in 2020', 'this morning', 'when I was young'],
    spelling: [
      { rule: 'רוב הפעלים: מוסיפים ed', ex: 'walk → walked, play → played' },
      { rule: 'פועל שנגמר ב-e: מוסיפים רק d', ex: 'like → liked, dance → danced' },
      { rule: 'עיצור + y: ה-y הופך ל-ied', ex: 'study → studied, cry → cried' },
      { rule: 'הברה אחת עם עיצור-תנועה-עיצור: מכפילים', ex: 'stop → stopped, plan → planned' },
    ],
    mistakes: [
      { bad: 'I goed to the park.', good: 'I went to the park.', why: 'הפועל go חריג: go - went.' },
      { bad: "She didn't went.", good: "She didn't go.", why: "אחרי did / didn't הפועל חוזר לצורת הבסיס." },
      { bad: 'Did you saw it?', good: 'Did you see it?', why: 'גם בשאלה: did + פועל בסיסי.' },
      { bad: 'They was happy.', good: 'They were happy.', why: 'עם you / we / they משתמשים ב-were.' },
    ],
    remember: 'ב-did כבר יש "עבר", ולכן הפועל שאחריו תמיד בסיסי: did go, ולא did went. את הפעלים החריגים לומדים בעל פה.',
  },

  'there-is': {
    what: 'כשרוצים להגיד שמשהו "יש" או "נמצא" במקום מסוים, משתמשים ב-There is / There are. זה לא "יש לי" (I have), אלא "יש ב...".',
    uses: [
      { use: 'דבר אחד (יחיד)', en: 'There is a cat on the roof.', he: 'יש חתול על הגג.' },
      { use: 'כמה דברים (רבים)', en: 'There are five apples in the bowl.', he: 'יש חמישה תפוחים בקערה.' },
      { use: 'משהו שלא סופרים', en: 'There is some milk in the fridge.', he: 'יש קצת חלב במקרר.' },
      { use: 'בעבר', en: 'There were many people at the party.', he: 'היו הרבה אנשים במסיבה.' },
    ],
    build: [
      { label: 'חיובי', parts: ['There is / There are', 'דבר', 'מקום'], ex: 'There is a book on the desk.' },
      { label: 'שלילי', parts: ["There isn't / There aren't", 'any', 'דבר'], ex: "There aren't any chairs." },
      { label: 'שאלה', parts: ['Is there / Are there', 'דבר', '?'], ex: 'Is there a bank near here?' },
    ],
    tables: [
      {
        head: ['', 'הווה', 'עבר'],
        rows: [
          ['יחיד או לא נספר', 'There is', 'There was'],
          ['רבים', 'There are', 'There were'],
        ],
      },
    ],
    signals: ['a / an', 'some', 'any', 'a lot of', 'How many … are there?'],
    signalsTitle: 'מילים שבאות איתו',
    mistakes: [
      { bad: 'There is three dogs.', good: 'There are three dogs.', why: 'שלושה כלבים = רבים, ולכן are.' },
      { bad: 'There are a pencil.', good: 'There is a pencil.', why: 'עיפרון אחד = יחיד, ולכן is.' },
      { bad: 'Have a lot of people here.', good: 'There are a lot of people here.', why: 'בעברית אומרים "יש", אבל באנגלית לא מתחילים כך משפט ב-Have.' },
      { bad: 'Are there any water?', good: 'Is there any water?', why: 'את water לא סופרים, ולכן is.' },
    ],
    remember: "מסתכלים על המילה שאחרי: אחד או לא נספר = is, הרבה = are. ובקיצור: There's.",
  },

  'past-progressive': {
    what: 'עבר מתמשך מתאר פעולה שהייתה "באמצע" בזמן מסוים בעבר. כמו לעצור סרט ולראות מה מישהו עשה בדיוק באותו רגע.',
    uses: [
      { use: 'פעולה באמצע, בשעה מסוימת בעבר', en: "At 8 o'clock I was watching TV.", he: 'בשעה 8 צפיתי בטלוויזיה.' },
      { use: 'פעולה ארוכה שנקטעה על ידי פעולה קצרה', en: 'I was taking a shower when the phone rang.', he: 'התקלחתי כשהטלפון צלצל.' },
      { use: 'שתי פעולות שקרו באותו זמן', en: 'While Mom was cooking, Dad was cleaning.', he: 'בזמן שאמא בישלה, אבא ניקה.' },
      { use: 'תיאור רקע בסיפור', en: 'The sun was shining and the birds were singing.', he: 'השמש זרחה והציפורים שרו.' },
    ],
    build: [
      { label: 'חיובי', parts: ['נושא', 'was / were', 'V-ing'], ex: 'She was reading.' },
      { label: 'שלילי', parts: ['נושא', "wasn't / weren't", 'V-ing'], ex: "They weren't listening." },
      { label: 'שאלה', parts: ['Was / Were', 'נושא', 'V-ing', '?'], ex: 'Were you sleeping?' },
    ],
    tables: [
      {
        head: ['גוף', 'be בעבר'],
        rows: [
          ['I / he / she / it', 'was'],
          ['you / we / they', 'were'],
        ],
      },
    ],
    signals: ['while', 'when', "at 5 o'clock yesterday", 'at that moment', 'all day yesterday'],
    mistakes: [
      { bad: 'I was watch TV.', good: 'I was watching TV.', why: 'אחרי was / were צריך פועל עם ing.' },
      { bad: 'They was playing.', good: 'They were playing.', why: 'עם you / we / they משתמשים ב-were.' },
      { bad: 'While I was walking, I was seeing a dog.', good: 'While I was walking, I saw a dog.', why: 'הפעולה הקצרה (saw) באה בעבר פשוט.' },
    ],
    remember: 'פעולה ארוכה (עבר מתמשך) + פעולה קצרה שקטעה אותה (עבר פשוט): I was sleeping when the phone rang. אחרי while בדרך כלל בא עבר מתמשך.',
  },

  future: {
    what: 'באנגלית יש שתי דרכים עיקריות לדבר על העתיד: will ו-going to. שתיהן נכונות, אבל לכל אחת יש "תפקיד" משלה.',
    uses: [
      { use: 'החלטה ברגע הדיבור (will)', en: "I'm thirsty. I'll get some water.", he: 'אני צמא. אביא קצת מים.' },
      { use: 'הבטחה או הצעה (will)', en: 'I will help you with your homework.', he: 'אעזור לך בשיעורי הבית.' },
      { use: 'ניחוש או דעה על העתיד (will)', en: 'I think it will be sunny tomorrow.', he: 'אני חושב שמחר יהיה שמשי.' },
      { use: 'תוכנית שכבר החלטנו עליה (going to)', en: "I'm going to visit my cousins this weekend.", he: 'אני הולך לבקר את בני הדודים שלי בסוף השבוע.' },
      { use: 'רואים סימן שמשהו עומד לקרות (going to)', en: 'Look at those clouds! It is going to rain.', he: 'תראו את העננים! עומד לרדת גשם.' },
    ],
    build: [
      { label: 'חיובי עם will', parts: ['נושא', 'will', 'V1'], ex: 'It will rain.' },
      { label: 'שלילי עם will', parts: ['נושא', "won't", 'V1'], ex: "I won't tell anyone." },
      { label: 'שאלה עם will', parts: ['Will', 'נושא', 'V1', '?'], ex: 'Will you come?' },
      { label: 'חיובי עם going to', parts: ['נושא', 'am / is / are', 'going to', 'V1'], ex: 'She is going to travel.' },
      { label: 'שלילי עם going to', parts: ['נושא', "am not / isn't / aren't", 'going to', 'V1'], ex: "We aren't going to stay." },
      { label: 'שאלה עם going to', parts: ['Am / Is / Are', 'נושא', 'going to', 'V1', '?'], ex: 'Are you going to play?' },
    ],
    signals: ['tomorrow', 'next week', 'next year', 'soon', 'tonight', 'in the future', 'I think', 'probably'],
    mistakes: [
      { bad: 'I will to go.', good: 'I will go.', why: 'אחרי will אין to.' },
      { bad: 'She wills come.', good: 'She will come.', why: 'ל-will אף פעם אין s, גם לא עם he / she / it.' },
      { bad: 'I going to swim.', good: "I'm going to swim.", why: 'צריך am / is / are לפני going to.' },
      { bad: "I don't will go.", good: "I won't go.", why: "השלילה של will היא won't (= will not)." },
    ],
    remember: 'כבר תכננתי? going to. מחליטים עכשיו, מבטיחים או מנחשים? will.',
  },

  comparatives: {
    what: 'כשמשווים בין שני דברים, משתמשים בצורת ההשוואה (taller than = גבוה יותר מ...). כשאומרים שמשהו הוא "הכי" מכל הקבוצה, משתמשים בצורת ההפלגה (the tallest = הכי גבוה).',
    uses: [
      { use: 'השוואה בין שניים', en: 'My brother is taller than me.', he: 'אחי גבוה ממני.' },
      { use: 'הכי מכולם', en: 'Eilat is the hottest city in Israel.', he: 'אילת היא העיר הכי חמה בישראל.' },
      { use: 'השוואה עם מילה ארוכה', en: 'This game is more exciting than that one.', he: 'המשחק הזה מרגש יותר מההוא.' },
      { use: 'כשהשניים שווים', en: 'My bag is as heavy as yours.', he: 'התיק שלי כבד כמו שלך.' },
    ],
    build: [
      { label: 'השוואה, מילה קצרה', parts: ['תואר + er', 'than'], ex: 'faster than' },
      { label: 'השוואה, מילה ארוכה', parts: ['more', 'תואר', 'than'], ex: 'more beautiful than' },
      { label: 'הפלגה, מילה קצרה', parts: ['the', 'תואר + est'], ex: 'the fastest' },
      { label: 'הפלגה, מילה ארוכה', parts: ['the most', 'תואר'], ex: 'the most beautiful' },
    ],
    tables: [
      {
        head: ['תואר', 'השוואה', 'הפלגה'],
        rows: [
          ['tall', 'taller', 'the tallest'],
          ['big', 'bigger', 'the biggest'],
          ['happy', 'happier', 'the happiest'],
          ['beautiful', 'more beautiful', 'the most beautiful'],
          ['good', 'better', 'the best'],
          ['bad', 'worse', 'the worst'],
          ['far', 'farther', 'the farthest'],
          ['many / much', 'more', 'the most'],
        ],
      },
    ],
    signals: ['than', 'the … in', 'the … of', 'as … as', 'ever'],
    signalsTitle: 'מילים שבאות איתו',
    spelling: [
      { rule: 'רוב המילים הקצרות: מוסיפים er / est', ex: 'small → smaller → the smallest' },
      { rule: 'נגמר ב-e: מוסיפים רק r / st', ex: 'nice → nicer → the nicest' },
      { rule: 'עיצור-תנועה-עיצור: מכפילים את האות האחרונה', ex: 'big → bigger, hot → the hottest' },
      { rule: 'שתי הברות שנגמרות ב-y: ה-y הופך ל-i', ex: 'easy → easier → the easiest' },
    ],
    mistakes: [
      { bad: 'She is more taller than me.', good: 'She is taller than me.', why: 'או er או more, אף פעם לא שניהם יחד.' },
      { bad: 'He is the most fast.', good: 'He is the fastest.', why: 'למילה קצרה מוסיפים est.' },
      { bad: 'This pizza is gooder.', good: 'This pizza is better.', why: 'המילה good חריגה: good - better - the best.' },
      { bad: 'He is taller then me.', good: 'He is taller than me.', why: 'בהשוואה כותבים than, ולא then.' },
    ],
    remember: 'קצר? er / est. ארוך? more / the most. ובהפלגה תמיד יש the!',
  },

  quantifiers: {
    what: 'כמתים הם מילים שאומרות "כמה" יש מכל דבר. כדי לבחור נכון צריך לדעת אם את הדבר אפשר לספור (apples, friends) או שאי אפשר (water, money, time).',
    uses: [
      { use: 'לדברים שסופרים: many', en: 'How many friends do you have?', he: 'כמה חברים יש לך?' },
      { use: 'לדברים שלא סופרים: much', en: "I don't have much time.", he: 'אין לי הרבה זמן.' },
      { use: 'במשפט חיובי, בהצעה ובבקשה: some', en: 'Can I have some water, please?', he: 'אפשר לקבל קצת מים, בבקשה?' },
      { use: 'בשלילה ובשאלה: any', en: "There aren't any cookies left.", he: 'לא נשארו עוגיות.' },
      { use: 'מתאים לכולם: a lot of', en: 'She has a lot of books and a lot of money.', he: 'יש לה הרבה ספרים והרבה כסף.' },
      { use: 'קצת: a few / a little', en: 'I have a few friends and a little time.', he: 'יש לי כמה חברים וקצת זמן.' },
    ],
    build: [
      { label: 'כמה? (נספר)', parts: ['How many', 'שם עצם ברבים', '?'], ex: 'How many apples are there?' },
      { label: 'כמה? (לא נספר)', parts: ['How much', 'שם עצם', '?'], ex: 'How much water do you drink?' },
    ],
    tables: [
      {
        head: ['', 'נספר (books)', 'לא נספר (water)'],
        rows: [
          ['הרבה', 'many / a lot of', 'much / a lot of'],
          ['קצת', 'a few', 'a little'],
          ['במשפט חיובי', 'some', 'some'],
          ['בשלילה ובשאלה', 'any', 'any'],
        ],
      },
    ],
    signals: ['water', 'milk', 'money', 'time', 'bread', 'homework', 'information', 'advice', 'music', 'rice'],
    signalsTitle: 'דברים שלא סופרים',
    mistakes: [
      { bad: 'How much books do you have?', good: 'How many books do you have?', why: 'ספרים אפשר לספור, ולכן many.' },
      { bad: 'I have many money.', good: 'I have a lot of money.', why: 'את money לא סופרים.' },
      { bad: "I don't have some friends here.", good: "I don't have any friends here.", why: 'בשלילה משתמשים ב-any.' },
      { bad: 'I have a lot of homeworks.', good: 'I have a lot of homework.', why: 'את homework לא סופרים, ואין לו צורת רבים.' },
    ],
    remember: 'שואלים: אפשר לספור? כן = many / a few. לא = much / a little. ו-a lot of תמיד עובד!',
  },

  modals: {
    what: 'פעלים מודאליים הם "פעלי עזר" קטנים שמוסיפים משמעות לפועל: חובה, איסור, עצה או בקשה מנומסת. הם לא משתנים לפי הגוף, ואחריהם בא פועל בסיסי (חוץ מ-have to ו-would like to).',
    uses: [
      { use: 'חובה: must / have to', en: 'You must wear a helmet.', he: 'אתה חייב לחבוש קסדה.' },
      { use: "איסור: mustn't", en: "You mustn't run in the hallway.", he: 'אסור לרוץ במסדרון.' },
      { use: "לא חייבים: don't have to", en: "You don't have to come if you're busy.", he: 'את לא חייבת לבוא אם את עסוקה.' },
      { use: 'עצה: should', en: 'You should eat more vegetables.', he: 'כדאי לך לאכול יותר ירקות.' },
      { use: 'בקשה מנומסת: could', en: 'Could you open the window, please?', he: 'תוכל לפתוח את החלון, בבקשה?' },
      { use: 'הייתי רוצה: would like', en: "I'd like a glass of water, please.", he: 'הייתי רוצה כוס מים, בבקשה.' },
    ],
    build: [
      { label: 'חיובי', parts: ['נושא', 'מודאל', 'V1'], ex: 'You should rest.' },
      { label: 'שלילי', parts: ['נושא', 'מודאל + not', 'V1'], ex: "You shouldn't shout." },
      { label: 'שאלה', parts: ['מודאל', 'נושא', 'V1', '?'], ex: 'Could you help me?' },
      { label: 'עם would like', parts: ['נושא', 'would like', 'to', 'V1'], ex: "I'd like to order a pizza." },
    ],
    tables: [
      {
        head: ['מודאל', 'משמעות', 'שלילה'],
        rows: [
          ['must', 'חייב', "mustn't = אסור"],
          ['have to', 'צריך / חייב', "don't have to = לא חייב"],
          ['should', 'כדאי / רצוי', "shouldn't = לא כדאי"],
          ['could', 'בקשה מנומסת', 'Could you …?'],
          ['would like', 'הייתי רוצה', "wouldn't like"],
        ],
      },
    ],
    mistakes: [
      { bad: 'He musts study.', good: 'He must study.', why: 'למודאל אין s, גם עם he / she / it.' },
      { bad: 'You must to go.', good: 'You must go.', why: 'אחרי must ו-should אין to.' },
      { bad: 'You should goes to bed.', good: 'You should go to bed.', why: 'אחרי מודאל בא פועל בסיסי.' },
      { bad: 'I would like go to the park.', good: 'I would like to go to the park.', why: 'אחרי would like כן שמים to.' },
      { bad: "You mustn't come tomorrow. It's a holiday.", good: "You don't have to come tomorrow. It's a holiday.", why: "בחג לא חייבים לבוא, אבל זה לא אסור. אסור = mustn't." },
    ],
    remember: "שימו לב: mustn't = אסור, אבל don't have to = לא חייבים (ומותר אם רוצים). אחרי מודאל בא פועל בסיסי, רק אחרי would like מוסיפים to.",
  },

  'present-perfect': {
    what: 'הווה מושלם מחבר בין העבר להווה. משתמשים בו כשמשהו קרה בעבר, אבל לא חשוב מתי בדיוק: חשובים התוצאה או הקשר לעכשיו. בעברית אין זמן כזה, אז צריך להתרגל אליו.',
    uses: [
      { use: 'ניסיון חיים (אי פעם / אף פעם)', en: 'I have never flown in a helicopter.', he: 'אף פעם לא טסתי במסוק.' },
      { use: 'משהו שקרה ממש עכשיו', en: 'I have just finished my homework.', he: 'בדיוק סיימתי את שיעורי הבית.' },
      { use: 'תוצאה שרואים עכשיו', en: 'Oh no! I have lost my keys.', he: 'אוי לא! איבדתי את המפתחות.' },
      { use: 'התחיל בעבר ונמשך עד עכשיו', en: 'We have lived in Haifa for five years.', he: 'אנחנו גרים בחיפה כבר חמש שנים.' },
    ],
    build: [
      { label: 'חיובי', parts: ['נושא', 'have / has', 'V3'], ex: 'She has eaten.' },
      { label: 'שלילי', parts: ['נושא', "haven't / hasn't", 'V3'], ex: "I haven't seen it." },
      { label: 'שאלה', parts: ['Have / Has', 'נושא', 'V3', '?'], ex: 'Have you finished?' },
    ],
    tables: [
      {
        title: 'שלוש הצורות של הפועל',
        head: ['V1', 'V2', 'V3'],
        rows: [
          ['play', 'played', 'played'],
          ['go', 'went', 'gone'],
          ['see', 'saw', 'seen'],
          ['eat', 'ate', 'eaten'],
          ['do', 'did', 'done'],
          ['write', 'wrote', 'written'],
          ['be', 'was / were', 'been'],
          ['buy', 'bought', 'bought'],
          ['take', 'took', 'taken'],
        ],
      },
      {
        title: 'מתי for ומתי since?',
        head: ['מילה', 'משמעות', 'דוגמאות'],
        rows: [
          ['for', 'משך זמן', 'for two hours, for a week, for 3 years'],
          ['since', 'נקודת התחלה', 'since Monday, since 2020, since I was six'],
        ],
      },
    ],
    signals: ['ever', 'never', 'just', 'already', 'yet', 'for', 'since', 'so far', 'recently'],
    mistakes: [
      { bad: 'I have saw this movie.', good: 'I have seen this movie.', why: 'אחרי have / has בא V3, ולא V2.' },
      { bad: 'She have finished.', good: 'She has finished.', why: 'עם he / she / it משתמשים ב-has.' },
      { bad: 'I have seen him yesterday.', good: 'I saw him yesterday.', why: 'עם זמן מוגדר בעבר (yesterday) משתמשים בעבר פשוט.' },
      { bad: 'I live here since 2018.', good: 'I have lived here since 2018.', why: 'בעברית אומרים "גר", אבל באנגלית משהו שהתחיל בעבר ונמשך עד היום בא בהווה מושלם.' },
    ],
    remember: 'הנוסחה: have / has + V3. לא אומרים מתי בדיוק, כי לא חשוב מתי, חשוב שזה קרה!',
  },

  'perfect-vs-past': {
    what: 'שני הזמנים מדברים על משהו שקרה בעבר. ההבדל: בעבר פשוט אומרים (או יודעים) מתי זה קרה. בהווה מושלם לא חשוב מתי, חשוב הקשר להווה.',
    uses: [
      { use: 'עבר פשוט: יש זמן מוגדר', en: 'I visited London in 2022.', he: 'ביקרתי בלונדון ב-2022.' },
      { use: 'הווה מושלם: בלי זמן מוגדר', en: 'I have visited London twice.', he: 'ביקרתי בלונדון פעמיים.' },
      { use: 'עבר פשוט: סיפור שנגמר', en: 'We played football and then went home.', he: 'שיחקנו כדורגל ואז הלכנו הביתה.' },
      { use: 'הווה מושלם: נמשך עד עכשיו', en: 'I have known Noa since first grade.', he: 'אני מכירה את נועה מכיתה א\'.' },
      { use: 'שאלה עם When תמיד בעבר פשוט', en: 'When did you arrive?', he: 'מתי הגעת?' },
    ],
    build: [
      { label: 'עבר פשוט', parts: ['נושא', 'V2', 'זמן מוגדר'], ex: 'I saw it yesterday.' },
      { label: 'הווה מושלם', parts: ['נושא', 'have / has', 'V3'], ex: 'I have seen it.' },
    ],
    tables: [
      {
        title: 'מילים מסמנות לכל זמן',
        head: ['עבר פשוט', 'הווה מושלם'],
        rows: [
          ['yesterday', 'ever / never'],
          ['last week / last year', 'just / already / yet'],
          ['two days ago', 'for / since'],
          ['in 2020', 'so far / recently'],
          ['When …?', 'How long …?'],
        ],
      },
    ],
    mistakes: [
      { bad: 'I have been to Paris last year.', good: 'I went to Paris last year.', why: 'המילים last year הן זמן מוגדר, ולכן עבר פשוט.' },
      { bad: 'When have you arrived?', good: 'When did you arrive?', why: 'השאלה When שואלת על זמן מוגדר, ולכן עבר פשוט.' },
      { bad: 'I have finished it two hours ago.', good: 'I finished it two hours ago.', why: 'המילה ago מציינת זמן מוגדר.' },
      { bad: 'I know him for three years.', good: 'I have known him for three years.', why: 'זה התחיל בעבר ונמשך עד עכשיו, ולכן הווה מושלם.' },
    ],
    remember: 'יש "מתי"? עבר פשוט. אין "מתי", או שזה נמשך עד עכשיו? הווה מושלם.',
  },

  'first-conditional': {
    what: 'משפט תנאי ראשון מדבר על משהו שבאמת יכול לקרות בעתיד, ועל התוצאה שלו: "אם יקרה X, אז יקרה Y".',
    uses: [
      { use: 'תנאי אמיתי בעתיד', en: 'If it rains, we will stay at home.', he: 'אם ירד גשם, נישאר בבית.' },
      { use: 'אזהרה', en: 'If you touch the stove, you will get burned.', he: 'אם תיגע בכיריים, תיכווה.' },
      { use: 'הבטחה', en: 'If you clean your room, I will take you to the movies.', he: 'אם תסדר את החדר, אקח אותך לסרט.' },
      { use: 'סדר הפוך, בלי פסיק', en: "We will be late if we don't hurry.", he: 'נאחר אם לא נמהר.' },
    ],
    build: [
      { label: 'חלק התנאי', parts: ['If', 'נושא', 'V1 (הווה פשוט)'], ex: 'If you study,' },
      { label: 'חלק התוצאה', parts: ['נושא', 'will', 'V1'], ex: 'you will pass the test.' },
      { label: 'עם שלילה', parts: ['If', 'נושא', "don't / doesn't", 'V1', 'נושא', "won't", 'V1'], ex: "If he doesn't come, I won't go." },
      { label: 'שאלה', parts: ['What', 'will', 'נושא', 'V1', 'if …', '?'], ex: 'What will you do if it rains?' },
    ],
    signals: ['if', 'unless (= if not)', 'when', 'as soon as'],
    signalsTitle: 'מילים שבאות איתו',
    mistakes: [
      { bad: 'If it will rain, we will stay home.', good: 'If it rains, we will stay home.', why: 'אחרי if לא שמים will, גם כשמדברים על העתיד.' },
      { bad: 'If you will study, you pass.', good: 'If you study, you will pass.', why: 'ה-will שייך לחלק של התוצאה.' },
      { bad: 'If she come, we will play.', good: 'If she comes, we will play.', why: 'אחרי if זה הווה פשוט רגיל, ועם she צריך s.' },
    ],
    remember: 'If + הווה פשוט, will + פועל בסיסי. ה-will גר רק בחלק של התוצאה! כשמתחילים ב-If, שמים פסיק באמצע.',
  },

  'relative-clauses': {
    what: 'משפט זיקה מוסיף מידע על אדם, דבר או מקום, בדיוק כמו "ש..." בעברית: "הילד שיושב לידי". באנגלית בוחרים מילה מתאימה לפי מה שמתארים.',
    uses: [
      { use: 'לאנשים: who', en: 'The girl who won the race is my friend.', he: 'הילדה שניצחה במרוץ היא חברה שלי.' },
      { use: 'לחפצים ובעלי חיים: which', en: 'I lost the book which you gave me.', he: 'איבדתי את הספר שנתת לי.' },
      { use: 'לאנשים ולחפצים: that', en: 'This is the phone that I want.', he: 'זה הטלפון שאני רוצה.' },
      { use: 'למקומות: where', en: 'This is the park where we play.', he: 'זה הפארק שבו אנחנו משחקים.' },
      { use: 'בעלות, "ש... שלו": whose', en: 'That is the boy whose sister is a singer.', he: 'זה הילד שאחותו זמרת.' },
    ],
    build: [
      { label: 'אדם', parts: ['אדם', 'who / that', 'המשך המשפט'], ex: 'the man who lives next door' },
      { label: 'דבר', parts: ['דבר', 'which / that', 'המשך המשפט'], ex: 'the cake which I made' },
      { label: 'מקום', parts: ['מקום', 'where', 'המשך המשפט'], ex: 'the city where I was born' },
    ],
    tables: [
      {
        head: ['מילה', 'על מה?', 'דוגמה'],
        rows: [
          ['who', 'אנשים', 'a teacher who helps'],
          ['which', 'חפצים ובעלי חיים', 'a dog which barks'],
          ['that', 'אנשים וחפצים', 'the shirt that I bought'],
          ['where', 'מקומות', 'the room where I sleep'],
          ['whose', 'של מי', 'the girl whose cat is lost'],
        ],
      },
    ],
    mistakes: [
      { bad: 'The man which lives here is a doctor.', good: 'The man who lives here is a doctor.', why: 'האיש הוא אדם, ולכן who.' },
      { bad: 'This is the house where I live in it.', good: 'This is the house where I live.', why: 'לא חוזרים על המקום: where כבר אומר "שבו".' },
      { bad: "The boy who's bike is red.", good: 'The boy whose bike is red.', why: "המילה who's = who is. לבעלות כותבים whose." },
      { bad: 'The girl who she sits next to me.', good: 'The girl who sits next to me.', why: 'אחרי who לא מוסיפים שוב she.' },
    ],
    remember: 'אדם = who, דבר = which, מקום = where, של מי = whose. ו-that מתאים גם לאנשים וגם לדברים!',
  },

  passive: {
    what: 'בסביל, הפעולה עצמה (או מה שקורה לדבר) חשובה יותר ממי שעושה אותה. במקום "אנשים מדברים אנגלית כאן" אומרים "אנגלית מדוברת כאן".',
    uses: [
      { use: 'לא חשוב מי עושה', en: 'English is spoken in many countries.', he: 'מדברים אנגלית בהרבה מדינות.' },
      { use: 'ממה עשוי משהו', en: 'Cheese is made from milk.', he: 'גבינה עשויה מחלב.' },
      { use: 'פעולה קבועה, בלי לציין מי עושה', en: 'This room is cleaned every day.', he: 'החדר הזה מנוקה כל יום.' },
      { use: 'רוצים לציין מי עושה, עם by', en: 'Honey is made by bees.', he: 'דבש מיוצר על ידי דבורים.' },
    ],
    build: [
      { label: 'חיובי', parts: ['נושא', 'am / is / are', 'V3'], ex: 'These cars are made in Japan.' },
      { label: 'שלילי', parts: ['נושא', "isn't / aren't", 'V3'], ex: "Phones aren't allowed in class." },
      { label: 'שאלה', parts: ['Is / Are', 'נושא', 'V3', '?'], ex: 'Is English spoken here?' },
      { label: 'מי עושה', parts: ['…', 'V3', 'by', 'מבצע'], ex: 'The show is watched by millions.' },
    ],
    tables: [
      {
        title: 'מפעיל לסביל',
        head: ['פעיל', 'סביל'],
        rows: [
          ['They speak English here.', 'English is spoken here.'],
          ['Tom cleans the room.', 'The room is cleaned by Tom.'],
          ['Bees make honey.', 'Honey is made by bees.'],
        ],
      },
      {
        title: 'V3 נפוצים בסביל',
        head: ['V1', 'V3'],
        rows: [
          ['make', 'made'],
          ['speak', 'spoken'],
          ['write', 'written'],
          ['sell', 'sold'],
          ['grow', 'grown'],
          ['eat', 'eaten'],
          ['use', 'used'],
          ['build', 'built'],
        ],
      },
    ],
    mistakes: [
      { bad: 'English is speak here.', good: 'English is spoken here.', why: 'בסביל צריך V3: speak - spoke - spoken.' },
      { bad: 'The room cleaned every day.', good: 'The room is cleaned every day.', why: 'בלי is / are זה לא סביל.' },
      { bad: 'These shoes is made in Italy.', good: 'These shoes are made in Italy.', why: 'נעליים = רבים, ולכן are.' },
      { bad: 'Honey is made from bees.', good: 'Honey is made by bees.', why: 'את מי שעושה את הפעולה מציינים עם by. המילה from היא לחומר: made from milk.' },
    ],
    remember: 'סביל בהווה = am / is / are + V3. את is / are מתאימים לנושא, וה-V3 לא משתנה.',
  },

  'passive-past': {
    what: 'סביל בעבר ובעתיד בנוי בדיוק כמו סביל בהווה, רק משנים את be לזמן הנכון: was / were לעבר, ו-will be לעתיד.',
    uses: [
      { use: 'לא יודעים מי עשה', en: 'My bike was stolen.', he: 'האופניים שלי נגנבו.' },
      { use: 'מתמקדים בתוצאה', en: 'The pyramids were built thousands of years ago.', he: 'הפירמידות נבנו לפני אלפי שנים.' },
      { use: 'משהו שייעשה בעתיד', en: 'The winners will be announced tomorrow.', he: 'הזוכים יוכרזו מחר.' },
      { use: 'רוצים לציין מי עשה, עם by', en: 'Matilda was written by Roald Dahl.', he: 'הספר "מטילדה" נכתב על ידי רואלד דאל.' },
    ],
    build: [
      { label: 'עבר', parts: ['נושא', 'was / were', 'V3'], ex: 'The window was broken.' },
      { label: 'עבר, שלילי', parts: ['נושא', "wasn't / weren't", 'V3'], ex: "The letters weren't sent." },
      { label: 'עבר, שאלה', parts: ['Was / Were', 'נושא', 'V3', '?'], ex: 'Was this phone made in China?' },
      { label: 'עתיד', parts: ['נושא', 'will be', 'V3'], ex: 'A new park will be built here.' },
      { label: 'עתיד, שלילי', parts: ['נושא', "won't be", 'V3'], ex: "The game won't be cancelled." },
      { label: 'מי עשה', parts: ['…', 'V3', 'by', 'מבצע'], ex: 'It was painted by Picasso.' },
    ],
    tables: [
      {
        title: 'מפעיל לסביל',
        head: ['פעיל', 'סביל'],
        rows: [
          ['Tom cleans the room.', 'The room is cleaned by Tom.'],
          ['Tom cleaned the room.', 'The room was cleaned by Tom.'],
          ['Tom will clean the room.', 'The room will be cleaned by Tom.'],
        ],
      },
    ],
    signals: ['yesterday', 'last year', 'in 1990', 'ago', 'tomorrow', 'next week', 'soon'],
    mistakes: [
      { bad: 'The cake was ate.', good: 'The cake was eaten.', why: 'בסביל צריך V3: eat - ate - eaten.' },
      { bad: 'The house built in 1990.', good: 'The house was built in 1990.', why: 'בלי was / were זה לא סביל.' },
      { bad: 'The letter was written from my dad.', good: 'The letter was written by my dad.', why: 'את מי שעשה מציינים עם by.' },
      { bad: 'The results will published tomorrow.', good: 'The results will be published tomorrow.', why: 'בעתיד צריך will be + V3.' },
    ],
    remember: 'סביל = be + V3. עבר: was / were + V3. עתיד: will be + V3. וה-V3 תמיד נשאר אותו דבר.',
  },

  'past-perfect': {
    what: 'עבר מושלם (had + V3) מראה שפעולה אחת קרתה לפני פעולה אחרת בעבר. זה כמו "העבר של העבר": כשמספרים סיפור בעבר וצריך לחזור עוד צעד אחורה.',
    uses: [
      { use: 'מה קרה קודם', en: 'When I got to the station, the train had left.', he: 'כשהגעתי לתחנה, הרכבת כבר יצאה.' },
      { use: 'סיבה לתוצאה בעבר', en: "She was hungry because she hadn't eaten all day.", he: 'היא הייתה רעבה כי לא אכלה כל היום.' },
      { use: 'עם by the time', en: 'By the time the police came, the thief had escaped.', he: 'עד שהמשטרה הגיעה, הגנב כבר ברח.' },
      { use: 'ניסיון עד רגע מסוים בעבר', en: 'I had never seen snow before that trip.', he: 'אף פעם לא ראיתי שלג לפני הטיול ההוא.' },
    ],
    build: [
      { label: 'חיובי', parts: ['נושא', 'had', 'V3'], ex: 'They had finished.' },
      { label: 'שלילי', parts: ['נושא', "hadn't", 'V3'], ex: "I hadn't seen it before." },
      { label: 'שאלה', parts: ['Had', 'נושא', 'V3', '?'], ex: 'Had you eaten before the movie?' },
    ],
    tables: [
      {
        title: 'מה קרה קודם?',
        head: ['קודם (עבר מושלם)', 'אחר כך (עבר פשוט)'],
        rows: [
          ['The movie had started', 'when we arrived.'],
          ['She had finished her homework', 'before she went out.'],
          ['After he had eaten,', 'he went to sleep.'],
        ],
      },
    ],
    signals: ['already', 'just', 'before', 'after', 'by the time', 'when', 'never … before'],
    mistakes: [
      { bad: 'After she has eaten, she went out.', good: 'After she had eaten, she went out.', why: 'הפעולה שקרתה קודם בעבר באה עם had + V3.' },
      { bad: 'When I arrived, the train has left.', good: 'When I arrived, the train had left.', why: 'הסיפור בעבר, ולכן had ולא has.' },
      { bad: 'I had saw that movie before.', good: 'I had seen that movie before.', why: 'אחרי had בא V3: see - saw - seen.' },
    ],
    remember: 'שתי פעולות בעבר? זו שקרתה קודם מקבלת had + V3, וזו שאחריה בעבר פשוט. ה-had זהה לכל הגופים.',
  },

  'used-to': {
    what: 'משתמשים ב-used to כדי לדבר על הרגל או מצב שהיה פעם, בעבר, וכבר לא קיים היום. בעברית אומרים "פעם הייתי...".',
    uses: [
      { use: 'הרגל שהיה פעם', en: 'I used to watch cartoons every morning.', he: 'פעם צפיתי בסרטים מצוירים כל בוקר.' },
      { use: 'מצב שהשתנה', en: 'My dad used to have long hair.', he: 'פעם היה לאבא שלי שיער ארוך.' },
      { use: 'פעם, אבל היום כבר לא', en: 'We used to live in Haifa, but now we live in Ashdod.', he: 'פעם גרנו בחיפה, אבל עכשיו אנחנו גרים באשדוד.' },
      { use: 'משהו שפעם לא היה', en: "I didn't use to like vegetables, but now I do.", he: 'פעם לא אהבתי ירקות, אבל עכשיו אני כן.' },
    ],
    build: [
      { label: 'חיובי', parts: ['נושא', 'used to', 'V1'], ex: 'I used to play the piano.' },
      { label: 'שלילי', parts: ['נושא', "didn't", 'use to', 'V1'], ex: "She didn't use to like fish." },
      { label: 'שאלה', parts: ['Did', 'נושא', 'use to', 'V1', '?'], ex: 'Did you use to live here?' },
    ],
    tables: [
      {
        title: 'פעם מול היום',
        head: ['פעם (used to)', 'היום (הווה פשוט)'],
        rows: [
          ['I used to walk to school.', 'Now I take the bus.'],
          ['She used to have short hair.', 'Now she has long hair.'],
          ["We didn't use to have a dog.", 'Now we have two!'],
        ],
      },
    ],
    signals: ['when I was little', 'when I was young', 'years ago', 'in the past', 'but now'],
    mistakes: [
      { bad: 'I use to play the piano when I was young.', good: 'I used to play the piano when I was young.', why: 'במשפט חיובי כותבים used to, עם d.' },
      { bad: 'Did you used to live here?', good: 'Did you use to live here?', why: 'אחרי did כותבים use to, בלי d.' },
      { bad: 'I used to playing football.', good: 'I used to play football.', why: 'אחרי used to בא פועל בסיסי.' },
      { bad: 'I was used to climb trees.', good: 'I used to climb trees.', why: 'לא שמים was לפני used to.' },
    ],
    remember: 'פעם, אבל כבר לא? used to + פועל בסיסי. במשפט חיובי כותבים used, ובשלילה ובשאלה (אחרי did) כותבים use.',
  },

  can: {
    what: 'המילה can היא פועל עזר קטן וחשוב. משתמשים בה כדי להגיד מה מישהו יודע או מסוגל לעשות, וכדי לבקש או לקבל רשות. היא נשארת אותו דבר בכל הגופים.',
    uses: [
      { use: 'יכולת: מה יודעים לעשות', en: 'I can swim.', he: 'אני יודע לשחות.' },
      { use: 'משהו שעוד לא יודעים', en: "My little brother can't read yet.", he: 'אחי הקטן עוד לא יודע לקרוא.' },
      { use: 'בקשה', en: 'Can you help me, please?', he: 'אתה יכול לעזור לי, בבקשה?' },
      { use: 'רשות', en: 'Can I go out to play?', he: 'אפשר לצאת לשחק?' },
      { use: 'יכולת בעבר: could', en: 'When I was four, I could ride a bike.', he: 'כשהייתי בן ארבע, ידעתי לרכוב על אופניים.' },
    ],
    build: [
      { label: 'חיובי', parts: ['נושא', 'can', 'V1'], ex: 'She can dance.' },
      { label: 'שלילי', parts: ['נושא', "can't / cannot", 'V1'], ex: "I can't sing." },
      { label: 'שאלה', parts: ['Can', 'נושא', 'V1', '?'], ex: 'Can you swim?' },
      { label: 'תשובה קצרה', parts: ['Yes / No', 'נושא', "can / can't"], ex: "Yes, I can. / No, I can't." },
    ],
    tables: [
      {
        head: ['גוף', 'חיובי', 'שלילי'],
        rows: [
          ['I / you / we / they', 'can swim', "can't swim"],
          ['he / she / it', 'can swim', "can't swim"],
        ],
      },
    ],
    mistakes: [
      { bad: 'She cans swim.', good: 'She can swim.', why: 'ל-can אין s, גם עם he / she / it.' },
      { bad: 'I can to swim.', good: 'I can swim.', why: 'אחרי can אין to.' },
      { bad: 'He can plays the guitar.', good: 'He can play the guitar.', why: 'אחרי can בא פועל בסיסי, בלי s.' },
      { bad: 'Do you can help me?', good: 'Can you help me?', why: 'בשאלה מזיזים את can להתחלה, בלי do.' },
    ],
    remember: 'אחרי can בא פועל בסיסי, בלי to ובלי s. בשאלה פשוט מזיזים את can להתחלה: Can you...?',
  },

  pronouns: {
    what: 'כינויי גוף מחליפים שם כדי שלא נחזור עליו כל הזמן: במקום "דנה אוכלת" אומרים "היא אוכלת". באנגלית יש צורה אחת לפני הפועל, צורה אחרת אחרי הפועל, וצורה לשייכות.',
    uses: [
      { use: 'לפני הפועל (נושא)', en: 'She is my best friend.', he: 'היא החברה הכי טובה שלי.' },
      { use: 'אחרי הפועל או אחרי מילת יחס', en: 'I called him yesterday.', he: 'התקשרתי אליו אתמול.' },
      { use: 'שייכות לפני שם עצם', en: 'This is our classroom.', he: 'זו הכיתה שלנו.' },
      { use: "שייכות של אדם עם 's", en: "Dan's bag is blue.", he: 'התיק של דן כחול.' },
      { use: 'שייכות בלי שם עצם אחרי', en: 'This pen is mine.', he: 'העט הזה שלי.' },
    ],
    build: [
      { label: 'נושא ומושא', parts: ['נושא', 'פועל', 'מושא'], ex: 'She likes him.' },
      { label: 'שייכות', parts: ['my / his / her …', 'שם עצם'], ex: 'my dog, their house' },
      { label: 'שייכות עם שם', parts: ["שם + 's", 'שם עצם'], ex: "Noa's phone" },
    ],
    tables: [
      {
        head: ['עברית', 'נושא', 'מושא', 'שייכות', 'בלי שם עצם'],
        rows: [
          ['אני', 'I', 'me', 'my', 'mine'],
          ['אתה / את', 'you', 'you', 'your', 'yours'],
          ['הוא', 'he', 'him', 'his', 'his'],
          ['היא', 'she', 'her', 'her', 'hers'],
          ['זה / זאת', 'it', 'it', 'its', '-'],
          ['אנחנו', 'we', 'us', 'our', 'ours'],
          ['אתם / אתן', 'you', 'you', 'your', 'yours'],
          ['הם / הן', 'they', 'them', 'their', 'theirs'],
        ],
      },
    ],
    mistakes: [
      { bad: 'Him is my brother.', good: 'He is my brother.', why: 'לפני הפועל בא he.' },
      { bad: 'She called I.', good: 'She called me.', why: 'אחרי הפועל בא me.' },
      { bad: 'This is she bag.', good: 'This is her bag.', why: 'לשייכות משתמשים ב-her.' },
      { bad: "The dog wagged it's tail.", good: 'The dog wagged its tail.', why: "המילה it's = it is. לשייכות כותבים its." },
      { bad: 'This is the book of Dan.', good: "This is Dan's book.", why: "לשייכות של אדם משתמשים ב-'s." },
    ],
    remember: 'לפני הפועל: I, he, she, we, they. אחרי הפועל: me, him, her, us, them. של מי? my, his, her, our, their.',
  },

  articles: {
    what: 'באנגלית שמים מילה קטנה לפני שם עצם. משתמשים ב-a / an כשמדובר בדבר אחד כלשהו, וב-the כשמדובר בדבר מסוים שכולם יודעים על מה מדובר. בעברית יש רק "ה", ולכן קל להתבלבל.',
    uses: [
      { use: 'דבר אחד, לא מסוים (a)', en: 'I have a dog.', he: 'יש לי כלב.' },
      { use: 'לפני צליל תנועה (an)', en: 'She ate an apple.', he: 'היא אכלה תפוח.' },
      { use: 'משהו שכבר הזכרנו (the)', en: 'I have a dog. The dog is black.', he: 'יש לי כלב. הכלב שחור.' },
      { use: 'יש רק אחד כזה (the)', en: 'The sun is very hot today.', he: 'השמש חמה מאוד היום.' },
      { use: 'מקצוע (a / an)', en: 'My mom is a doctor.', he: 'אמא שלי רופאה.' },
    ],
    build: [
      { label: 'לפני צליל עיצור', parts: ['a', 'שם עצם'], ex: 'a cat, a book, a university' },
      { label: 'לפני צליל תנועה', parts: ['an', 'שם עצם'], ex: 'an egg, an orange, an hour' },
      { label: 'משהו מסוים', parts: ['the', 'שם עצם'], ex: 'the moon, the door, the teacher' },
    ],
    tables: [
      {
        title: 'מתי לא שמים כלום?',
        head: ['מתי?', 'דוגמה'],
        rows: [
          ['רבים, כשמדברים באופן כללי', 'I like cats.'],
          ['דברים שלא סופרים, באופן כללי', 'Milk is healthy.'],
          ['שמות של אנשים, ערים וארצות', 'Dana lives in Haifa.'],
          ['ספורט, שפות וארוחות', 'I play football after lunch.'],
        ],
      },
    ],
    mistakes: [
      { bad: 'She is teacher.', good: 'She is a teacher.', why: 'לפני מקצוע ביחיד צריך a / an.' },
      { bad: 'I ate a apple.', good: 'I ate an apple.', why: 'המילה apple מתחילה בצליל תנועה, ולכן an.' },
      { bad: 'He goes to an university.', good: 'He goes to a university.', why: 'המילה university מתחילה בצליל "יו", שהוא צליל עיצור.' },
      { bad: 'The cats are cute.', good: 'Cats are cute.', why: 'כשמדברים באופן כללי על רבים, לא שמים the.' },
      { bad: 'I play the football.', good: 'I play football.', why: 'לפני שם של ספורט לא שמים the.' },
    ],
    remember: 'מקשיבים לצליל, לא לאות: an hour, a university. ו-a / an = אחד כלשהו, the = הזה שכולנו יודעים עליו.',
  },

  prepositions: {
    what: 'מילות יחס הן מילים קטנות שמראות איפה משהו נמצא או מתי משהו קורה. בעברית אומרים "ב" כמעט לכל דבר, ובאנגלית צריך לבחור בין in, on ו-at.',
    uses: [
      { use: 'שעה: at', en: "The lesson starts at 8 o'clock.", he: 'השיעור מתחיל בשעה 8.' },
      { use: 'יום ותאריך: on', en: 'My birthday is on Sunday.', he: 'יום ההולדת שלי ביום ראשון.' },
      { use: 'חודש, שנה ועונה: in', en: 'We go to the beach in summer.', he: 'אנחנו הולכים לים בקיץ.' },
      { use: 'בתוך: in', en: 'The keys are in my bag.', he: 'המפתחות בתוך התיק שלי.' },
      { use: 'על: on', en: 'The book is on the table.', he: 'הספר על השולחן.' },
      { use: 'מקום מסוים, כמו נקודה: at', en: 'I am at school.', he: 'אני בבית הספר.' },
    ],
    build: [
      { label: 'זמן: שעה', parts: ['at', 'שעה'], ex: 'at 7:30, at noon, at night' },
      { label: 'זמן: יום או תאריך', parts: ['on', 'יום / תאריך'], ex: 'on Friday, on May 5th' },
      { label: 'זמן: חודש, שנה, עונה', parts: ['in', 'חודש / שנה / עונה'], ex: 'in June, in 2025, in winter' },
    ],
    tables: [
      {
        title: 'מילות יחס של מקום',
        head: ['מילה', 'פירוש', 'דוגמה'],
        rows: [
          ['in', 'בתוך', 'in the box'],
          ['on', 'על', 'on the desk'],
          ['under', 'מתחת', 'under the bed'],
          ['next to', 'ליד', 'next to the door'],
          ['between', 'בין', 'between Dan and Noa'],
          ['behind', 'מאחורי', 'behind the house'],
          ['in front of', 'מול / לפני', 'in front of the school'],
          ['at', 'ב (נקודה מסוימת)', 'at the bus stop'],
        ],
      },
    ],
    signals: ['in the morning', 'in the afternoon', 'in the evening', 'at night', 'at the weekend', 'at home', 'at school', 'on the bus'],
    signalsTitle: 'ביטויים קבועים',
    mistakes: [
      { bad: 'I have a test in Monday.', good: 'I have a test on Monday.', why: 'לפני יום בשבוע שמים on.' },
      { bad: 'We travel at summer.', good: 'We travel in summer.', why: 'לפני עונה שמים in.' },
      { bad: "The party is in 5 o'clock.", good: "The party is at 5 o'clock.", why: 'לפני שעה שמים at.' },
      { bad: 'The cat is in the table.', good: 'The cat is on the table.', why: 'על השולחן = on.' },
      { bad: 'I sleep in the night.', good: 'I sleep at night.', why: 'זה ביטוי קבוע: at night, אבל in the morning.' },
    ],
    remember: 'בזמן: at = שעה (נקודה קטנה), on = יום, in = תקופה ארוכה (חודש, שנה, עונה). מהקטן לגדול: at, on, in.',
  },

  'question-words': {
    what: 'מילות שאלה עוזרות לשאול שאלות פתוחות, כאלה שהתשובה עליהן היא לא רק "כן" או "לא". מילת השאלה תמיד באה בהתחלה.',
    uses: [
      { use: 'מה?', en: 'What is your name?', he: 'מה השם שלך?' },
      { use: 'איפה?', en: 'Where do you live?', he: 'איפה אתה גר?' },
      { use: 'מתי?', en: 'When is your birthday?', he: 'מתי יום ההולדת שלך?' },
      { use: 'מי?', en: 'Who is your teacher?', he: 'מי המורה שלך?' },
      { use: 'למה?', en: 'Why are you sad?', he: 'למה אתה עצוב?' },
      { use: 'איך?', en: 'How do you get to school?', he: 'איך אתה מגיע לבית הספר?' },
    ],
    build: [
      { label: 'עם am / is / are', parts: ['מילת שאלה', 'am / is / are', 'נושא', '?'], ex: 'Where is my phone?' },
      { label: 'עם פועל רגיל', parts: ['מילת שאלה', 'do / does / did', 'נושא', 'V1', '?'], ex: 'What do you want?' },
      { label: 'כשמילת השאלה היא הנושא', parts: ['Who', 'V1 (+s)', '?'], ex: 'Who wants pizza?' },
    ],
    tables: [
      {
        head: ['מילה', 'פירוש', 'דוגמה'],
        rows: [
          ['What', 'מה', 'What time is it?'],
          ['Where', 'איפה', 'Where are you?'],
          ['When', 'מתי', 'When does it start?'],
          ['Who', 'מי', 'Who is that?'],
          ['Why', 'למה', "Why did you go? Because I wanted to."],
          ['How', 'איך', 'How are you?'],
          ['How many', 'כמה (סופרים)', 'How many pets do you have?'],
          ['How much', 'כמה (לא סופרים, מחיר)', 'How much is it?'],
          ['How old', 'בן כמה', 'How old are you?'],
          ['Which', 'איזה', 'Which color do you like?'],
          ['Whose', 'של מי', 'Whose bag is this?'],
        ],
      },
    ],
    mistakes: [
      { bad: 'Where you live?', good: 'Where do you live?', why: 'עם פועל רגיל צריך do / does אחרי מילת השאלה.' },
      { bad: 'What she likes?', good: 'What does she like?', why: 'עם she שואלים עם does, והפועל חוזר לבסיס.' },
      { bad: 'How old you are?', good: 'How old are you?', why: 'בשאלה are בא לפני הנושא.' },
      { bad: 'How many water do you drink?', good: 'How much water do you drink?', why: 'את water לא סופרים, ולכן How much.' },
    ],
    remember: 'הסדר: מילת שאלה + פועל עזר (do / does / did / is / are) + נושא + פועל. ועל Why עונים עם because.',
  },

  connectors: {
    what: 'מילות קישור מחברות בין שני חלקים של משפט, כדי שלא נדבר במשפטים קצרים וקטועים. כל מילה מראה קשר אחר בין החלקים.',
    uses: [
      { use: 'הוספה: and', en: 'I like pizza and pasta.', he: 'אני אוהב פיצה ופסטה.' },
      { use: 'ניגוד או הפתעה: but', en: 'The test was hard, but I passed.', he: 'המבחן היה קשה, אבל עברתי.' },
      { use: 'בחירה: or', en: 'Do you want tea or hot chocolate?', he: 'אתה רוצה תה או שוקו חם?' },
      { use: 'סיבה: because', en: "I'm tired because I went to bed late.", he: 'אני עייף כי הלכתי לישון מאוחר.' },
      { use: 'תוצאה: so', en: 'It was raining, so we stayed home.', he: 'ירד גשם, אז נשארנו בבית.' },
    ],
    build: [
      { label: 'חיבור שני משפטים', parts: ['משפט', 'and / but / or', 'משפט'], ex: 'I sing and my sister dances.' },
      { label: 'סיבה', parts: ['תוצאה', 'because', 'סיבה'], ex: "I'm happy because it's Friday." },
      { label: 'תוצאה', parts: ['סיבה', 'so', 'תוצאה'], ex: "It's Friday, so I'm happy." },
    ],
    tables: [
      {
        head: ['מילה', 'פירוש', 'שואלים את עצמנו'],
        rows: [
          ['and', 'ו / וגם', 'מוסיפים עוד מידע?'],
          ['but', 'אבל', 'יש ניגוד או הפתעה?'],
          ['or', 'או', 'יש בחירה?'],
          ['because', 'כי / בגלל ש', 'למה?'],
          ['so', 'אז / ולכן', 'מה יצא מזה?'],
        ],
      },
    ],
    mistakes: [
      { bad: 'I like cats, but I like dogs too.', good: 'I like cats, and I like dogs too.', why: 'אין כאן ניגוד, רק הוספה.' },
      { bad: 'Do you want juice and water?', good: 'Do you want juice or water?', why: 'כשבוחרים אחד מהשניים משתמשים ב-or.' },
      { bad: 'It was cold, because I wore a coat.', good: 'It was cold, so I wore a coat.', why: 'הקור הוא הסיבה והמעיל הוא התוצאה, ולכן so.' },
      { bad: 'Because I was hungry.', good: 'I ate a sandwich because I was hungry.', why: 'חלק עם because לבד הוא לא משפט שלם.' },
    ],
    remember: 'and = עוד, but = הפתעה, or = בחירה, because = למה, so = מה יצא מזה. לפני but ו-so נהוג לשים פסיק.',
  },

  adverbs: {
    what: 'תוארי פועל מוסיפים מידע על הפעולה. תוארי תדירות אומרים כמה פעמים משהו קורה (always, never), ותוארי אופן אומרים איך עושים משהו (quickly, quietly).',
    uses: [
      { use: 'כמה פעמים? (תדירות)', en: 'I always eat breakfast.', he: 'אני תמיד אוכל ארוחת בוקר.' },
      { use: 'תדירות עם am / is / are', en: 'She is never late.', he: 'היא אף פעם לא מאחרת.' },
      { use: 'איך? (אופן)', en: 'He runs quickly.', he: 'הוא רץ מהר.' },
      { use: 'אופן של good הוא well', en: 'You speak English very well.', he: 'את מדברת אנגלית טוב מאוד.' },
    ],
    build: [
      { label: 'תדירות עם פועל רגיל', parts: ['נושא', 'תדירות', 'V1'], ex: 'I usually walk to school.' },
      { label: 'תדירות עם be', parts: ['נושא', 'am / is / are', 'תדירות'], ex: 'He is always happy.' },
      { label: 'אופן', parts: ['נושא', 'V1', 'תואר + ly'], ex: 'She sings beautifully.' },
    ],
    tables: [
      {
        title: 'סולם התדירות',
        head: ['מילה', 'פירוש', 'בערך'],
        rows: [
          ['always', 'תמיד', '100%'],
          ['usually', 'בדרך כלל', '80%'],
          ['often', 'לעתים קרובות', '60%'],
          ['sometimes', 'לפעמים', '40%'],
          ['rarely', 'לעתים רחוקות', '10%'],
          ['never', 'אף פעם', '0%'],
        ],
      },
    ],
    spelling: [
      { rule: 'רוב המילים: מוסיפים ly', ex: 'quick → quickly, slow → slowly' },
      { rule: 'נגמר ב-y: ה-y הופך ל-ily', ex: 'happy → happily, easy → easily' },
      { rule: 'נגמר ב-le: מחליפים ל-ly', ex: 'gentle → gently, simple → simply' },
      { rule: 'חריגים', ex: 'good → well, fast → fast, hard → hard' },
    ],
    mistakes: [
      { bad: 'I go always to school by bus.', good: 'I always go to school by bus.', why: 'תואר תדירות בא לפני הפועל הרגיל.' },
      { bad: 'She always is happy.', good: 'She is always happy.', why: 'עם am / is / are התואר בא אחרי.' },
      { bad: 'He plays football good.', good: 'He plays football well.', why: 'כשמתארים איך עושים משהו, good הופך ל-well.' },
      { bad: 'She drives careful.', good: 'She drives carefully.', why: 'מתארים איך היא נוהגת, ולכן צריך ly.' },
    ],
    remember: 'תדירות: לפני פועל רגיל, אבל אחרי am / is / are. אופן: בדרך כלל ly, וחריג חשוב: good הופך ל-well.',
  },

  'reported-speech': {
    what: 'דיבור עקיף הוא הדרך לספר מה מישהו אחר אמר, בלי לצטט אותו מילה במילה. כמו בעברית: "דן אמר שהוא רעב".',
    uses: [
      { use: 'לספר מה מישהו אמר: said that', en: 'Dan said that he is hungry.', he: 'דן אמר שהוא רעב.' },
      { use: 'לספר למי אמרו: told + אדם', en: 'Noa told me that she feels sick.', he: 'נועה אמרה לי שהיא מרגישה לא טוב.' },
      { use: 'כינוי הגוף משתנה לפי מי שמספר', en: 'Maya said that she loves pizza.', he: 'מאיה אמרה שהיא אוהבת פיצה.' },
      { use: 'לפעמים גם הזמן זז אחורה לעבר', en: 'She told me that she was busy.', he: 'היא אמרה לי שהיא עסוקה.' },
    ],
    build: [
      { label: 'עם said', parts: ['נושא', 'said', 'that', 'מה שנאמר'], ex: 'Tom said that his bike is new.' },
      { label: 'עם told', parts: ['נושא', 'told', 'אדם', 'that', 'מה שנאמר'], ex: 'She told her mom that she was tired.' },
    ],
    tables: [
      {
        title: 'מדיבור ישיר לעקיף',
        head: ['דיבור ישיר', 'דיבור עקיף'],
        rows: [
          ['Dan: "I am hungry."', 'Dan said that he is hungry.'],
          ['Maya: "My cat is cute."', 'Maya said that her cat is cute.'],
          ['The kids: "We are tired."', 'The kids said that they are tired.'],
          ['Sara to me: "I can help you."', 'Sara told me that she can help me.'],
        ],
      },
      {
        title: 'כינויים שמשתנים',
        head: ['ישיר', 'עקיף'],
        rows: [
          ['I', 'he / she'],
          ['my', 'his / her'],
          ['we', 'they'],
          ['our', 'their'],
          ['you (כשדיברו אליי)', 'me'],
        ],
      },
    ],
    mistakes: [
      { bad: 'Dan said me that he was busy.', good: 'Dan told me that he was busy.', why: 'אחרי said לא בא אדם. כשיש אדם, משתמשים ב-told.' },
      { bad: 'She told that she is tired.', good: 'She said that she is tired.', why: 'אחרי told חייב לבוא אדם (told me).' },
      { bad: 'Noa told to her mom that she feels sick.', good: 'Noa told her mom that she feels sick.', why: 'אחרי told לא שמים to.' },
      { bad: 'Maya said that I love pizza.', good: 'Maya said that she loves pizza.', why: 'מספרים על מאיה, ולכן I הופך ל-she.' },
    ],
    remember: 'said + that, אבל told + אדם + that. ותמיד בודקים מי מדבר ועל מי, ומשנים את כינוי הגוף בהתאם.',
  },

  'reflexive-pronouns': {
    what: 'כינוי חוזר (myself, herself...) מראה שמי שעושה את הפעולה הוא גם מי שהפעולה קורית לו, כמו "חתכתי את עצמי" או "לימדתי את עצמי". משתמשים בו גם כדי להדגיש שמישהו עשה משהו לבד.',
    uses: [
      { use: 'פעולה שעושים לעצמנו', en: 'I cut myself with a knife.', he: 'חתכתי את עצמי בסכין.' },
      { use: 'הדגשה: בעצמי, בלי עזרה', en: 'She made the cake herself.', he: 'היא הכינה את העוגה בעצמה.' },
      { use: 'לבד = by + כינוי חוזר', en: 'He lives by himself.', he: 'הוא גר לבד.' },
      { use: 'ביטוי: enjoy yourself', en: 'Enjoy yourselves at the party!', he: 'תיהנו במסיבה!' },
    ],
    build: [
      { label: 'פעולה לעצמנו', parts: ['נושא', 'פועל', 'כינוי חוזר'], ex: 'He hurt himself.' },
      { label: 'לבד', parts: ['by', 'כינוי חוזר'], ex: 'I did it by myself.' },
    ],
    tables: [
      {
        head: ['גוף', 'כינוי חוזר', 'עברית'],
        rows: [
          ['I', 'myself', 'עצמי'],
          ['you (יחיד)', 'yourself', 'עצמך'],
          ['he', 'himself', 'עצמו'],
          ['she', 'herself', 'עצמה'],
          ['it', 'itself', 'עצמו / עצמה'],
          ['we', 'ourselves', 'עצמנו'],
          ['you (רבים)', 'yourselves', 'עצמכם'],
          ['they', 'themselves', 'עצמם'],
        ],
      },
    ],
    mistakes: [
      { bad: 'He hurt hisself.', good: 'He hurt himself.', why: 'אין מילה hisself. עם he אומרים himself.' },
      { bad: 'They enjoyed theirselves.', good: 'They enjoyed themselves.', why: 'עם they אומרים themselves.' },
      { bad: 'I cut me.', good: 'I cut myself.', why: 'כשהפעולה חוזרת אליי, משתמשים ב-myself.' },
      { bad: 'We did it ourself.', good: 'We did it ourselves.', why: 'ברבים הסוף הוא selves.' },
    ],
    remember: 'ביחיד: self (myself, herself). ברבים: selves (ourselves, themselves). ו-by myself = לבד.',
  },

  'time-clauses': {
    what: 'מילות זמן מחברות שני חלקים של משפט ומראות את סדר הפעולות: מה קרה קודם, מה אחר כך, ומה קרה באותו זמן.',
    uses: [
      { use: 'לפני ש... (before)', en: 'I brush my teeth before I go to bed.', he: 'אני מצחצח שיניים לפני שאני הולך לישון.' },
      { use: 'אחרי ש... (after)', en: 'After we ate dinner, we watched a movie.', he: 'אחרי שאכלנו ארוחת ערב, צפינו בסרט.' },
      { use: 'כאשר (when)', en: 'When I was a child, I lived in Eilat.', he: 'כשהייתי ילד, גרתי באילת.' },
      { use: 'עד ש... (until)', en: 'Wait here until I come back.', he: 'חכה כאן עד שאחזור.' },
    ],
    build: [
      { label: 'מילת הזמן בהתחלה, עם פסיק', parts: ['When / Before / After', 'משפט 1,', 'משפט 2'], ex: 'After I finish my homework, I will call you.' },
      { label: 'מילת הזמן באמצע, בלי פסיק', parts: ['משפט 1', 'when / before / after', 'משפט 2'], ex: 'I will call you after I finish my homework.' },
    ],
    mistakes: [
      { bad: 'Before I will go to bed, I will read.', good: 'Before I go to bed, I will read.', why: 'אחרי מילת זמן משתמשים בהווה פשוט, גם כשמדברים על העתיד.' },
      { bad: 'After I go home, I did my homework.', good: 'After I went home, I did my homework.', why: 'שני החלקים קרו בעבר, ולכן שניהם בעבר.' },
      { bad: 'When I am a child, I lived in Eilat.', good: 'When I was a child, I lived in Eilat.', why: 'זה היה בעבר, ולכן was.' },
      { bad: 'I wash my hands before eat.', good: 'I wash my hands before I eat.', why: 'אחרי before בא משפט שלם (או eating).' },
    ],
    remember: 'מילת זמן בהתחלה? שמים פסיק באמצע. ואחרי when, before, after ו-until לא שמים will!',
  },

  'future-forms': {
    what: 'באנגלית יש כמה דרכים לדבר על העתיד, וכל אחת מתאימה למצב אחר: תוכנית, תחזית, לוח זמנים או פגישה שכבר קבענו.',
    uses: [
      { use: 'תוכנית שכבר החלטנו עליה (going to)', en: "I'm going to learn French next year.", he: 'אני הולך ללמוד צרפתית בשנה הבאה.' },
      { use: 'רואים שמשהו עומד לקרות (going to)', en: 'Watch out! You are going to fall!', he: 'זהירות! אתה עומד ליפול!' },
      { use: 'תחזית או דעה (will)', en: 'I think our team will win the game.', he: 'אני חושב שהקבוצה שלנו תנצח במשחק.' },
      { use: 'הבטחה או החלטה ברגע (will)', en: "Don't worry, I'll help you.", he: 'אל תדאג, אני אעזור לך.' },
      { use: 'לוח זמנים קבוע (הווה פשוט)', en: 'The train leaves at 8:15.', he: 'הרכבת יוצאת ב-8:15.' },
      { use: 'פגישה או סידור שכבר קבענו (הווה מתמשך)', en: "I'm meeting Dan at the mall tomorrow.", he: 'אני נפגש עם דן בקניון מחר.' },
    ],
    build: [
      { label: 'עם going to', parts: ['נושא', 'am / is / are', 'going to', 'V1'], ex: "It's going to rain." },
      { label: 'עם will', parts: ['נושא', 'will', 'V1'], ex: 'People will live on Mars.' },
      { label: 'הווה פשוט', parts: ['נושא', 'V1 (+s)', 'זמן'], ex: 'The movie starts at 6.' },
      { label: 'הווה מתמשך', parts: ['נושא', 'am / is / are', 'V-ing', 'זמן'], ex: 'We are flying to Rome on Sunday.' },
    ],
    tables: [
      {
        title: 'איזו צורה לבחור?',
        head: ['מצב', 'צורה', 'דוגמה'],
        rows: [
          ['תוכנית', 'going to', "I'm going to visit Grandma."],
          ['סימן שרואים עכשיו', 'going to', 'Look! It is going to rain.'],
          ['תחזית או דעה', 'will', 'Robots will do our homework.'],
          ['הבטחה או החלטה ברגע', 'will', "I'll call you later."],
          ['לוח זמנים', 'הווה פשוט', 'The bus leaves at 7.'],
          ['פגישה שנקבעה', 'הווה מתמשך', "I'm seeing the dentist at 4."],
        ],
      },
    ],
    signals: ['tomorrow', 'tonight', 'next week', 'soon', 'in 2030', 'I think', 'probably', "at 8 o'clock"],
    mistakes: [
      { bad: 'Look at those clouds! It will rain.', good: 'Look at those clouds! It is going to rain.', why: 'רואים סימן ברור עכשיו, ולכן going to.' },
      { bad: 'The phone is ringing. I am going to answer it.', good: "The phone is ringing. I'll answer it.", why: 'החלטה ברגע הדיבור: will.' },
      { bad: 'She is going to visits us.', good: 'She is going to visit us.', why: 'אחרי going to בא פועל בסיסי.' },
      { bad: 'I will to call you.', good: 'I will call you.', why: 'אחרי will אין to.' },
    ],
    remember: 'תכננתי או רואים שזה קורה = going to. חושבים או מבטיחים = will. לוח זמנים = הווה פשוט. קבענו פגישה = הווה מתמשך.',
  },

  'gerunds-infinitives': {
    what: 'כשבא פועל אחרי פועל אחר, הפועל השני מופיע באחת משתי צורות: עם to (to swim) או עם ing (swimming). הבחירה תלויה בפועל הראשון, ולכן כדאי ללמוד את הרשימות.',
    uses: [
      { use: 'אחרי want, decide, hope: to + פועל', en: 'I want to be a vet.', he: 'אני רוצה להיות וטרינר.' },
      { use: 'אחרי enjoy, finish, mind: פועל + ing', en: 'I enjoy playing the guitar.', he: 'אני נהנה לנגן בגיטרה.' },
      { use: 'אחרי מילת יחס: תמיד ing', en: 'She is good at drawing.', he: 'היא טובה בציור.' },
      { use: 'אחרי let / make: פועל בסיסי', en: 'My parents let me stay up late.', he: 'ההורים שלי נותנים לי להישאר ער עד מאוחר.' },
      { use: 'פועל עם ing בתור נושא', en: 'Swimming is good for you.', he: 'שחייה טובה לבריאות.' },
    ],
    build: [
      { label: 'עם to', parts: ['want / decide / hope', 'to', 'V1'], ex: 'I hope to see you soon.' },
      { label: 'עם ing', parts: ['enjoy / finish / mind', 'V-ing'], ex: 'He finished eating.' },
      { label: 'אחרי מילת יחס', parts: ['מילת יחס', 'V-ing'], ex: "I'm interested in reading." },
      { label: 'אחרי let / make', parts: ['let / make', 'אדם', 'V1'], ex: 'Let me help you.' },
    ],
    tables: [
      {
        title: 'איזה פועל עם מה?',
        head: ['to + פועל', 'פועל + ing', 'פועל בסיסי'],
        rows: [
          ['want', 'enjoy', 'let'],
          ['decide', 'finish', 'make'],
          ['hope', 'mind', 'can / should'],
          ['would like', 'avoid', ''],
          ['plan', 'practice', ''],
          ['learn', 'keep', ''],
        ],
      },
    ],
    signals: ['like', 'love', 'hate', 'start', 'begin'],
    signalsTitle: 'אחרי אלה אפשר גם וגם',
    mistakes: [
      { bad: 'I want going to the beach.', good: 'I want to go to the beach.', why: 'אחרי want בא to + פועל.' },
      { bad: 'I enjoy to dance.', good: 'I enjoy dancing.', why: 'אחרי enjoy בא פועל עם ing.' },
      { bad: 'She is good at swim.', good: 'She is good at swimming.', why: 'אחרי מילת יחס (at) תמיד ing.' },
      { bad: 'My mom made me to clean my room.', good: 'My mom made me clean my room.', why: 'אחרי make + אדם בא פועל בסיסי, בלי to.' },
      { bad: 'Do you mind to close the door?', good: 'Do you mind closing the door?', why: 'אחרי mind בא פועל עם ing.' },
    ],
    remember: 'רוצים, מחליטים, מקווים? to. נהנים, מסיימים? ing. אחרי מילת יחס (at, in, of, about) תמיד ing.',
  },

  'tag-questions': {
    what: 'שאלת זנב היא שאלה קטנה שמוסיפים בסוף משפט, כמו "נכון?" או "לא?" בעברית. משתמשים בה כשרוצים לוודא משהו או לקבל הסכמה.',
    uses: [
      { use: 'משפט חיובי, זנב שלילי', en: "You are tired, aren't you?", he: 'אתה עייף, נכון?' },
      { use: 'משפט שלילי, זנב חיובי', en: "She doesn't like fish, does she?", he: 'היא לא אוהבת דגים, נכון?' },
      { use: 'עם פועל רגיל: do / does', en: "You play the piano, don't you?", he: 'אתה מנגן בפסנתר, לא?' },
      { use: 'בעבר: did', en: "They won the game, didn't they?", he: 'הם ניצחו במשחק, נכון?' },
      { use: 'עם can / will', en: "We can go now, can't we?", he: 'אנחנו יכולים ללכת עכשיו, נכון?' },
    ],
    build: [
      { label: 'משפט חיובי', parts: ['משפט חיובי,', 'פועל עזר + not', 'כינוי גוף', '?'], ex: "It is cold, isn't it?" },
      { label: 'משפט שלילי', parts: ['משפט שלילי,', 'פועל עזר', 'כינוי גוף', '?'], ex: "You can't swim, can you?" },
    ],
    tables: [
      {
        title: 'איזה זנב?',
        head: ['משפט', 'זנב'],
        rows: [
          ['She is happy,', "isn't she?"],
          ["They aren't here,", 'are they?'],
          ['You like pizza,', "don't you?"],
          ["He doesn't play,", 'does he?'],
          ['We went home,', "didn't we?"],
          ['She has finished,', "hasn't she?"],
          ['You will come,', "won't you?"],
          ['I am late,', "aren't I?"],
        ],
      },
    ],
    mistakes: [
      { bad: "She is nice, isn't it?", good: "She is nice, isn't she?", why: 'בזנב משתמשים בכינוי הגוף המתאים: she.' },
      { bad: "You like pizza, aren't you?", good: "You like pizza, don't you?", why: 'עם פועל רגיל בהווה פשוט הזנב הוא do / does.' },
      { bad: "He didn't come, didn't he?", good: "He didn't come, did he?", why: 'משפט שלילי מקבל זנב חיובי.' },
      { bad: "Dana plays tennis, doesn't Dana?", good: "Dana plays tennis, doesn't she?", why: 'בזנב לא חוזרים על השם, אלא שמים כינוי גוף.' },
    ],
    remember: 'חיובי + זנב שלילי, שלילי + זנב חיובי. משתמשים באותו פועל עזר ובאותו זמן כמו במשפט, ובכינוי גוף (לא בשם).',
  },

  'possessive-pronouns': {
    what: 'כינויי קניין אומרים למי משהו שייך, בלי לחזור על שם העצם. לפני שם עצם אומרים my או your, ולבד אומרים mine או yours. שואלים "של מי?" עם Whose, ו"שייך ל-" זה belong to.',
    uses: [
      { use: 'בלי שם עצם אחרי המילה', en: 'This book is mine.', he: 'הספר הזה שלי.' },
      { use: 'שאלה: זה שלך?', en: 'Is this pen yours?', he: 'העט הזה שלך?' },
      { use: 'של מי?', en: 'Whose shoes are these?', he: 'של מי הנעליים האלה?' },
      { use: 'שייך למישהו', en: 'This phone belongs to my brother.', he: 'הטלפון הזה שייך לאחי.' },
      { use: 'הוא הבעלים של משהו', en: 'My uncle owns a small restaurant.', he: 'לדוד שלי יש מסעדה קטנה.' },
    ],
    build: [
      { label: 'לפני שם עצם', parts: ['my / your / her …', 'שם עצם'], ex: 'This is my book.' },
      { label: 'חיובי, בלי שם עצם', parts: ['שם עצם', 'is / are', 'mine / yours …'], ex: 'This book is mine.' },
      { label: 'שלילי', parts: ['שם עצם', "isn't / aren't", 'mine / yours …'], ex: "This pen isn't mine." },
      { label: 'שאלה: של מי', parts: ['Whose', 'שם עצם', 'is / are', 'these', '?'], ex: 'Whose bag is this?' },
      { label: 'שייך ל-', parts: ['נושא', 'belong / belongs to', 'אדם'], ex: 'This seat belongs to Dana.' },
    ],
    tables: [
      {
        title: 'לפני שם עצם, או לבד',
        head: ['לפני שם עצם', 'לבד', 'עברית'],
        rows: [
          ['my', 'mine', 'שלי'],
          ['your', 'yours', 'שלך / שלכם'],
          ['his', 'his', 'שלו'],
          ['her', 'hers', 'שלה'],
          ['our', 'ours', 'שלנו'],
          ['their', 'theirs', 'שלהם'],
        ],
      },
      {
        title: 'נשמע אותו דבר, משמעות אחרת',
        head: ['כתיב', 'פירוש', 'דוגמה'],
        rows: [
          ['Whose', 'של מי', 'Whose bag is this?'],
          ["Who's", 'קיצור של who is', "Who's at the door?"],
        ],
      },
    ],
    signals: ['Whose', 'belong to', 'own', 'mine', 'yours', 'hers', 'ours', 'theirs'],
    signalsTitle: 'מילים שכדאי לזכור',
    spelling: [
      { rule: 'בכינויים שעומדים לבד אין גרש', ex: 'hers, yours, ours, theirs' },
      { rule: 'גרש לפני s רק אחרי שם של אדם', ex: "Dana's bag, the teacher's pen" },
    ],
    mistakes: [
      { bad: 'This is not your pencil. It is my.', good: 'This is not your pencil. It is mine.', why: 'בלי שם עצם אחרי המילה אומרים mine, לא my.' },
      { bad: "This bag is her's.", good: 'This bag is hers.', why: 'במילה hers אין גרש.' },
      { bad: "Who's shoes are these?", good: 'Whose shoes are these?', why: 'שואלים "של מי?" עם Whose. המילה Who\'s היא קיצור של who is.' },
      { bad: 'This phone belongs my brother.', good: 'This phone belongs to my brother.', why: 'אחרי belong חייבים to.' },
      { bad: 'These seats are our.', good: 'These seats are ours.', why: 'בלי שם עצם אחרי המילה אומרים ours.' },
    ],
    remember: 'יש שם עצם אחרי המילה? my, your, her. אין שם עצם? mine, yours, hers. ושל מי? Whose, בלי גרש.',
  },

  'tense-contrast': {
    what: 'באנגלית בוחרים זמן לפי סוג הפעולה. הרגל, עובדה או פעולה שנגמרה באים בזמן פשוט. משהו שקורה באמצע בא בזמן מתמשך. מילת הרמז במשפט עוזרת להחליט, ופעלי מצב כמעט אף פעם לא באים עם ing.',
    uses: [
      { use: 'הרגל או עובדה: הווה פשוט', en: 'My dad usually walks to work.', he: 'אבא שלי בדרך כלל הולך לעבודה ברגל.' },
      { use: 'ממש עכשיו: הווה מתמשך', en: 'Shh! Grandpa is taking a nap.', he: 'שקט! סבא מנמנם עכשיו.' },
      { use: 'פעולה שנגמרה: עבר פשוט', en: 'She bought a new bike last month.', he: 'היא קנתה אופניים חדשים בחודש שעבר.' },
      { use: 'פעולה שהייתה באמצע: עבר מתמשך', en: 'We were watching a movie when the power went out.', he: 'צפינו בסרט כשהחשמל נפל.' },
      { use: 'פועל מצב, בלי ing', en: 'I know the answer.', he: 'אני יודע את התשובה.' },
    ],
    build: [
      { label: 'הווה פשוט', parts: ['נושא', 'V1 (+s)'], ex: 'She usually walks.' },
      { label: 'הווה מתמשך', parts: ['נושא', 'am / is / are', 'V-ing'], ex: 'She is walking now.' },
      { label: 'עבר פשוט', parts: ['נושא', 'V2'], ex: 'She walked yesterday.' },
      { label: 'עבר מתמשך', parts: ['נושא', 'was / were', 'V-ing'], ex: 'She was walking at 8.' },
      { label: 'שלילה במתמשך', parts: ['נושא', "isn't / wasn't", 'V-ing'], ex: "She isn't walking now." },
      { label: 'שאלה על עכשיו', parts: ['What', 'is / are', 'נושא', 'V-ing', '?'], ex: 'What is she doing now?' },
      { label: 'שאלה עם פועל מצב', parts: ['Do / Does', 'נושא', 'V1', '?'], ex: 'Do you know the answer?' },
    ],
    tables: [
      {
        title: 'איזה זמן לבחור?',
        head: ['רואים במשפט', 'הזמן', 'דוגמה'],
        rows: [
          ['usually, every day', 'הווה פשוט', 'I usually walk.'],
          ['now, Look!', 'הווה מתמשך', 'Look! She is running.'],
          ['yesterday, last week', 'עבר פשוט', 'I saw him yesterday.'],
          ['at 8, while', 'עבר מתמשך', 'I was sleeping at 8.'],
        ],
      },
      {
        title: 'פעלי מצב: בלי ing',
        head: ['פועל', 'פירוש'],
        rows: [
          ['know', 'לדעת'],
          ['like / love', 'לאהוב'],
          ['want', 'לרצות'],
          ['need', 'להצטרך'],
          ['believe', 'להאמין'],
          ['understand', 'להבין'],
        ],
      },
    ],
    signals: ['always', 'usually', 'every day', 'now', 'right now', 'Look!', 'Listen!', 'yesterday', 'last week', 'while', 'when'],
    mistakes: [
      { bad: 'Look! The dog runs.', good: 'Look! The dog is running.', why: 'המילה Look! אומרת שזה קורה עכשיו, ולכן הווה מתמשך.' },
      { bad: 'I am knowing the answer.', good: 'I know the answer.', why: 'הפועל know הוא פועל מצב, וכמעט אף פעם לא בא עם ing.' },
      { bad: 'She was buy a bike last month.', good: 'She bought a bike last month.', why: 'המילים last month מתארות פעולה שנגמרה, ולכן עבר פשוט.' },
      { bad: 'We watched a movie when suddenly the lights went out.', good: 'We were watching a movie when suddenly the lights went out.', why: 'הפעולה הארוכה שנקטעה באמצע באה בעבר מתמשך, והפעולה הקצרה בעבר פשוט.' },
      { bad: 'This milk is smelling strange.', good: 'This milk smells strange.', why: 'כשמתארים ריח שיש למשהו, smell הוא פועל מצב ואין ing.' },
    ],
    remember: 'הרגל או עובדה = זמן פשוט. באמצע הפעולה = זמן מתמשך. פעלי מצב כמו know, like, want, need ו-believe נשארים בלי ing.',
  },

  'present-perfect-progressive': {
    what: 'הווה מושלם מתמשך מתאר פעולה שהתחילה בעבר ועדיין נמשכת, או שרואים עכשיו את התוצאה שלה. משתמשים בו כשחשוב כמה זמן הפעולה נמשכת. פעלי מצב נשארים בהווה מושלם רגיל, בלי ing.',
    uses: [
      { use: 'פעולה שנמשכת עד עכשיו', en: 'I have been waiting for the bus for twenty minutes.', he: 'אני מחכה לאוטובוס כבר עשרים דקות.' },
      { use: 'שאלה על משך הזמן', en: 'How long have you been living in Haifa?', he: 'כמה זמן אתה גר בחיפה?' },
      { use: 'רואים את התוצאה עכשיו', en: 'Your eyes are red. Have you been crying?', he: 'העיניים שלך אדומות. בכית?' },
      { use: 'סיבה למצב בהווה', en: 'He is tired because he has been working all day.', he: 'הוא עייף כי הוא עובד כל היום.' },
    ],
    build: [
      { label: 'חיובי', parts: ['נושא', 'have / has', 'been', 'V-ing'], ex: 'She has been reading.' },
      { label: 'שלילי', parts: ['נושא', "haven't / hasn't", 'been', 'V-ing'], ex: "I haven't been sleeping well." },
      { label: 'שאלה', parts: ['Have / Has', 'נושא', 'been', 'V-ing', '?'], ex: 'Have you been waiting long?' },
    ],
    tables: [
      {
        title: 'מתי רגיל ומתי מתמשך?',
        head: ['מה חשוב?', 'הזמן', 'דוגמה'],
        rows: [
          ['התוצאה, או כמה פעמים', 'הווה מושלם', 'I have read three books.'],
          ['משך הזמן והפעולה עצמה', 'הווה מושלם מתמשך', 'I have been reading all week.'],
          ['פועל מצב כמו know', 'הווה מושלם', 'I have known her for years.'],
        ],
      },
    ],
    signals: ['for', 'since', 'How long', 'all day', 'all week', 'lately', 'recently'],
    spelling: [
      { rule: 'רוב הפעלים: מוסיפים ing', ex: 'wait → waiting, read → reading' },
      { rule: 'פועל שנגמר ב-e שקטה: מורידים את ה-e', ex: 'write → writing, live → living' },
      { rule: 'הברה אחת עם עיצור-תנועה-עיצור: מכפילים את האות האחרונה', ex: 'run → running, sit → sitting' },
    ],
    mistakes: [
      { bad: 'I have waiting for an hour.', good: 'I have been waiting for an hour.', why: 'בין have לבין הפועל עם ing חסר been.' },
      { bad: 'I have been knowing her for five years.', good: 'I have known her for five years.', why: 'הפועל know הוא פועל מצב, ולכן הווה מושלם רגיל בלי ing.' },
      { bad: 'He have been working all day.', good: 'He has been working all day.', why: 'עם he / she / it משתמשים ב-has been.' },
      { bad: 'I am waiting for twenty minutes.', good: 'I have been waiting for twenty minutes.', why: 'יש משך זמן מהעבר עד עכשיו, ולכן have been + ing.' },
    ],
    remember: 'הנוסחה: have / has + been + ing. הצורה מדגישה כמה זמן הפעולה נמשכת. פעלי מצב כמו know ו-like נשארים בלי been ובלי ing.',
  },

  'past-perfect-progressive': {
    what: 'עבר מושלם מתמשך מתאר פעולה שנמשכה זמן מה, עד רגע מסוים בעבר. הוא גם מסביר למה משהו היה כך באותו רגע: היא הייתה עייפה כי למדה כל הלילה.',
    uses: [
      { use: 'פעולה שנמשכה עד רגע בעבר', en: 'I had been waiting for an hour when the bus finally came.', he: 'חיכיתי שעה, ואז האוטובוס סוף סוף הגיע.' },
      { use: 'סיבה למצב בעבר', en: 'She was tired because she had been studying all night.', he: 'היא הייתה עייפה כי למדה כל הלילה.' },
      { use: 'תוצאה שראו בעבר', en: 'The ground was wet. It had been raining.', he: 'האדמה הייתה רטובה. קודם לכן ירד גשם.' },
      { use: 'שאלה על משך הזמן עד העבר', en: 'How long had you been living there before you moved?', he: 'כמה זמן גרת שם לפני שעברת דירה?' },
    ],
    build: [
      { label: 'חיובי', parts: ['נושא', 'had been', 'V-ing'], ex: 'They had been talking.' },
      { label: 'שלילי', parts: ['נושא', "hadn't been", 'V-ing'], ex: "We hadn't been waiting long." },
      { label: 'שאלה', parts: ['Had', 'נושא', 'been', 'V-ing', '?'], ex: 'Had she been sleeping?' },
    ],
    tables: [
      {
        title: 'מה נמשך עד הרגע בעבר?',
        head: ['לפני כן', 'ואז'],
        rows: [
          ['They had been waiting for an hour', 'when I arrived.'],
          ['She had been studying all night,', 'so she was tired.'],
          ['We had been driving for three hours', 'when the car broke down.'],
        ],
      },
    ],
    signals: ['for', 'since', 'How long', 'when', 'before', 'all day', 'all night'],
    spelling: [
      { rule: 'רוב הפעלים: מוסיפים ing', ex: 'wait → waiting, study → studying' },
      { rule: 'פועל שנגמר ב-e שקטה: מורידים את ה-e', ex: 'drive → driving, live → living' },
      { rule: 'הברה אחת עם עיצור-תנועה-עיצור: מכפילים את האות האחרונה', ex: 'run → running, sit → sitting' },
    ],
    mistakes: [
      { bad: 'When I arrived, they have been waiting.', good: 'When I arrived, they had been waiting.', why: 'שני הדברים קרו בעבר, ולכן had been ולא have been.' },
      { bad: 'She was tired because she had been studied.', good: 'She was tired because she had been studying.', why: 'אחרי had been בא פועל עם ing, לא V3.' },
      { bad: 'I had been wait for an hour.', good: 'I had been waiting for an hour.', why: 'אחרי been חסר ה-ing.' },
      { bad: 'How long you had been living there?', good: 'How long had you been living there?', why: 'בשאלה had בא לפני הנושא.' },
    ],
    remember: 'הנוסחה: had been + ing, ו-had זהה לכל הגופים. הפעולה נמשכה עד רגע בעבר. אם רק רוצים להגיד שהיא נגמרה לפני פעולה אחרת, בלי משך, משתמשים ב-had + V3.',
  },

  'zero-conditional': {
    what: 'משפט תנאי אפס מתאר עובדה, חוק או תוצאה שתמיד קורית. שני חלקי המשפט בהווה פשוט: אם עושים א, תמיד קורה ב. מקרה אחד בעתיד הוא כבר תנאי ראשון, עם will.',
    uses: [
      { use: 'עובדה מדעית', en: 'If you heat water to 100 degrees, it boils.', he: 'אם מחממים מים למאה מעלות, הם רותחים.' },
      { use: 'תוצאה שתמיד קורית', en: 'If you mix red and white, you get pink.', he: 'אם מערבבים אדום ולבן, מקבלים ורוד.' },
      { use: 'הרגל קבוע', en: 'If my dog hears the door, he always barks.', he: 'אם הכלב שלי שומע את הדלת, הוא תמיד נובח.' },
      { use: 'אפשר גם when, כי זה תמיד', en: 'When you press this button, the machine turns on.', he: 'כשלוחצים על הכפתור, המכונה נדלקת.' },
    ],
    build: [
      { label: 'חלק התנאי', parts: ['If', 'נושא', 'הווה פשוט'], ex: 'If you heat water,' },
      { label: 'חלק התוצאה', parts: ['נושא', 'הווה פשוט'], ex: 'it boils.' },
      { label: 'שלילי', parts: ['If', 'נושא', "don't / doesn't", 'V1'], ex: "If plants don't get water, they die." },
      { label: 'שאלה', parts: ['What happens if', 'נושא', 'V1', '?'], ex: 'What happens if you drop an egg?' },
    ],
    signals: ['if', 'when', 'always', 'every time'],
    mistakes: [
      { bad: 'If you will heat ice, it melts.', good: 'If you heat ice, it melts.', why: 'בתנאי אפס אין will. שני החלקים בהווה פשוט.' },
      { bad: 'If you mix blue and yellow, you got green.', good: 'If you mix blue and yellow, you get green.', why: 'זו עובדה שתמיד נכונה, ולכן גם התוצאה בהווה פשוט.' },
      { bad: 'If water boil, it becomes steam.', good: 'If water boils, it becomes steam.', why: 'אחרי if זה הווה פשוט רגיל, ועם water צריך s בפועל.' },
      { bad: 'If it rains tomorrow, we stay home.', good: 'If it rains tomorrow, we will stay home.', why: 'מקרה אחד בעתיד הוא תנאי ראשון, עם will בתוצאה.' },
    ],
    remember: 'תמיד קורה? If + הווה פשוט, ואז שוב הווה פשוט. אין will. מקרה אחד בעתיד הוא תנאי ראשון.',
  },

  'second-conditional': {
    what: 'משפט תנאי שני מדבר על מצב דמיוני, או על משהו שלא סביר שיקרה עכשיו או בעתיד. בעברית אומרים "אם היה לי..." או "אילו הייתי...". זה לא סיפור על משהו שכבר קרה.',
    uses: [
      { use: 'חלום או מצב לא מציאותי', en: 'If I had a million shekels, I would travel the world.', he: 'אם היה לי מיליון שקלים, הייתי נוסע בעולם.' },
      { use: 'עצה: אם הייתי במקומך', en: 'If I were you, I would take the bus.', he: 'אם הייתי במקומך, הייתי נוסע באוטובוס.' },
      { use: 'משהו שלא נכון עכשיו', en: "If he weren't so lazy, he would get better grades.", he: 'אם הוא לא היה כל כך עצלן, היו לו ציונים טובים יותר.' },
      { use: 'דמיון מוחלט', en: 'If dogs could talk, what would they say?', he: 'אם כלבים יכלו לדבר, מה הם היו אומרים?' },
    ],
    build: [
      { label: 'חלק התנאי', parts: ['If', 'נושא', 'עבר פשוט'], ex: 'If I had a million shekels,' },
      { label: 'חלק התוצאה', parts: ['נושא', 'would', 'V1'], ex: 'I would travel the world.' },
      { label: 'שלילי', parts: ['If', 'נושא', "didn't", 'V1', ',', 'נושא', "wouldn't", 'V1'], ex: "If I didn't live so far away, I wouldn't be late." },
      { label: 'עם be', parts: ['If', 'נושא', 'were'], ex: 'If I were you, I would take the bus.' },
      { label: 'שאלה', parts: ['What', 'would', 'נושא', 'do if', 'נושא', 'V2', '?'], ex: 'What would you do if you won?' },
    ],
    signals: ['if', 'would', 'were', 'If I were you'],
    mistakes: [
      { bad: 'If I would have a lot of money, I would buy a house.', good: 'If I had a lot of money, I would buy a house.', why: 'אחרי if בתנאי שני בא עבר פשוט, לא would.' },
      { bad: 'If I was you, I would apologize.', good: 'If I were you, I would apologize.', why: 'בתנאי דמיוני, עם be משתמשים ב-were לכל הגופים.' },
      { bad: 'If she lived here, she will visit us.', good: 'If she lived here, she would visit us.', why: 'בחלק התוצאה של תנאי דמיוני בא would, לא will.' },
      { bad: 'If I had money, I would bought a car.', good: 'If I had money, I would buy a car.', why: 'אחרי would בא פועל בסיסי.' },
    ],
    remember: 'מצב דמיוני עכשיו או בעתיד: If + עבר פשוט, would + פועל בסיסי. עם be אומרים were לכל הגופים. זה לא סיפור על העבר.',
  },

  'third-conditional': {
    what: 'משפט תנאי שלישי מדבר על העבר: משהו שלא קרה, ואי אפשר לשנות אותו. זה חרטה או דמיון על מה שכבר עבר. בעברית: "אם הייתי לומד אז, הייתי עובר".',
    uses: [
      { use: 'חרטה על העבר', en: 'If I had studied, I would have passed the test.', he: 'אם הייתי לומד למבחן ההוא, הייתי עובר.' },
      { use: 'תוצאה שלא קרתה', en: "If it hadn't rained, we would have gone to the beach.", he: 'אם לא היה יורד גשם, היינו הולכים לים.' },
      { use: 'קודם התוצאה, בלי פסיק', en: 'She would have come if you had invited her.', he: 'היא הייתה באה אם היית מזמין אותה.' },
      { use: 'שאלה על העבר הדמיוני', en: 'What would you have done if you had missed the bus?', he: 'מה היית עושה אם היית מפספס את האוטובוס?' },
    ],
    build: [
      { label: 'חלק התנאי', parts: ['If', 'נושא', 'had', 'V3'], ex: 'If I had studied,' },
      { label: 'חלק התוצאה', parts: ['נושא', 'would have', 'V3'], ex: 'I would have passed.' },
      { label: 'שלילי', parts: ['If', 'נושא', "hadn't", 'V3', ',', 'נושא', "wouldn't have", 'V3'], ex: "If it hadn't rained, we would have gone out." },
      { label: 'שאלה', parts: ['What', 'would', 'נושא', 'have', 'V3', 'if', 'נושא', 'had', 'V3', '?'], ex: 'What would you have done if you had missed the bus?' },
    ],
    signals: ['if', 'had', 'would have', "hadn't", "wouldn't have"],
    mistakes: [
      { bad: 'If I would have studied, I would have passed.', good: 'If I had studied, I would have passed.', why: 'אחרי if על העבר בא had + V3, לא would have.' },
      { bad: 'If you had told me, I would help you.', good: 'If you had told me, I would have helped you.', why: 'גם התוצאה על העבר: would have + V3.' },
      { bad: 'If we had left earlier, we would have catched the train.', good: 'If we had left earlier, we would have caught the train.', why: 'אחרי would have בא V3: catch - caught - caught.' },
      { bad: 'If she has studied, she would have passed.', good: 'If she had studied, she would have passed.', why: 'הסיפור בעבר, ולכן had ולא has.' },
    ],
    remember: 'משהו שלא קרה בעבר: If + had + V3, would have + V3. המילה would נמצאת רק בחלק התוצאה.',
  },

  'wishes': {
    what: 'המילה wish מבטאת משאלה על משהו שלא נכון עכשיו, או חרטה על משהו שכבר קרה. אחרי wish הזמן זז אחורה: על ההווה משתמשים בעבר פשוט, ועל העבר ב-had + V3.',
    uses: [
      { use: 'משאלה על ההווה', en: "I don't have a bike. I wish I had one.", he: 'אין לי אופניים. הלוואי שהיו לי.' },
      { use: 'עם be אומרים were', en: 'I wish I were taller.', he: 'הלוואי שהייתי גבוה יותר.' },
      { use: 'משאלה על יכולת', en: 'She wishes she could speak French.', he: 'הלוואי שהיא יכלה לדבר צרפתית.' },
      { use: 'חרטה על העבר', en: "I wish I hadn't eaten so much cake.", he: 'הלוואי שלא אכלתי כל כך הרבה עוגה.' },
      { use: 'רוצים שמישהו אחר ישתנה', en: 'I wish my brother would stop making noise.', he: 'הלוואי שאחי היה מפסיק לעשות רעש.' },
    ],
    build: [
      { label: 'חיובי, על ההווה', parts: ['נושא', 'wish / wishes', 'נושא', 'V2'], ex: 'I wish I lived by the sea.' },
      { label: 'שלילה על ההווה', parts: ['נושא', 'wish / wishes', 'נושא', "didn't", 'V1'], ex: "He wishes he didn't live in the city." },
      { label: 'על יכולת', parts: ['נושא', 'wish / wishes', 'נושא', 'could', 'V1'], ex: 'I wish I could fly.' },
      { label: 'על העבר', parts: ['נושא', 'wish / wishes', 'נושא', 'had', 'V3'], ex: "I wish I hadn't said that." },
      { label: 'שמישהו אחר ישתנה', parts: ['נושא', 'wish / wishes', 'אדם', 'would', 'V1'], ex: 'I wish it would stop raining.' },
      { label: 'שאלה', parts: ['Do / Does', 'נושא', 'wish', 'נושא', 'V2', '?'], ex: 'Do you wish you had a dog?' },
    ],
    tables: [
      {
        title: 'איזו משאלה?',
        head: ['על מה?', 'המבנה', 'דוגמה'],
        rows: [
          ['ההווה', 'עבר פשוט אחרי wish', 'I wish I had a dog.'],
          ['יכולת', 'wish + could', 'I wish I could swim.'],
          ['העבר', 'wish + had + V3', 'I wish I had studied.'],
          ['התנהגות של מישהו אחר', 'wish + would', 'I wish you would listen.'],
        ],
      },
    ],
    signals: ['wish', 'wishes', 'were', 'could', 'would', 'had'],
    mistakes: [
      { bad: 'I wish I have a dog.', good: 'I wish I had a dog.', why: 'משאלה על ההווה באה עם עבר פשוט, לא עם הווה.' },
      { bad: 'I wish I am taller.', good: 'I wish I were taller.', why: 'אחרי wish, עם be משתמשים ב-were.' },
      { bad: "I wish I didn't eat so much yesterday.", good: "I wish I hadn't eaten so much yesterday.", why: 'חרטה על משהו שכבר קרה: wish + had + V3.' },
      { bad: 'I wish I would have a car.', good: 'I wish I had a car.', why: 'על עצמנו לא אומרים wish I would. משאלה על ההווה: wish + עבר פשוט.' },
      { bad: 'She wish she could fly.', good: 'She wishes she could fly.', why: 'עם he / she / it הפועל wish מקבל s: wishes.' },
    ],
    remember: 'על ההווה: wish + עבר פשוט, ועם be אומרים were. על העבר: wish + had + V3. אחרי had יש שם עצם כמו a dog? זו משאלה על עכשיו. אחרי had יש פועל כמו studied? זו חרטה על העבר.',
  },

  'adjectives-ed-ing': {
    what: 'שם תואר מתאר שם עצם. הוא בא לפני השם, או אחרי פעלים כמו be, look, feel, sound, taste ו-smell. סיומת ing מתארת את מה שגורם לרגש, וסיומת ed את מי שמרגיש אותו.',
    uses: [
      { use: 'לפני שם העצם', en: 'We live in a big old house.', he: 'אנחנו גרים בבית גדול וישן.' },
      { use: 'אחרי פועל כמו look או taste', en: 'The soup smells good.', he: 'המרק מריח טוב.' },
      { use: 'מה שגורם לרגש', en: 'The movie was boring.', he: 'הסרט היה משעמם.' },
      { use: 'מי שמרגיש את הרגש', en: 'I was bored, so I fell asleep.', he: 'השתעממתי, אז נרדמתי.' },
      { use: 'איך עושים פעולה', en: 'She answered all the questions correctly.', he: 'היא ענתה על כל השאלות נכון.' },
    ],
    build: [
      { label: 'חיובי: מה שגורם', parts: ['דבר', 'is / was', 'שם תואר + ing'], ex: 'The movie is boring.' },
      { label: 'חיובי: מי שמרגיש', parts: ['אדם', 'is / was', 'שם תואר + ed'], ex: 'I was excited.' },
      { label: 'שלילי', parts: ['נושא', "isn't", 'שם תואר'], ex: "The lesson isn't boring." },
      { label: 'שאלה', parts: ['Is / Are', 'נושא', 'שם תואר', '?'], ex: 'Are you interested in science?' },
      { label: 'לפני שם עצם', parts: ['a / the', 'שם תואר', 'שם עצם'], ex: 'a big old house' },
      { label: 'תואר פועל', parts: ['פועל', 'שם תואר + ly'], ex: 'She answered correctly.' },
    ],
    tables: [
      {
        title: 'זוגות נפוצים',
        head: ['מי שמרגיש', 'מה שגורם', 'עברית'],
        rows: [
          ['bored', 'boring', 'משועמם / משעמם'],
          ['interested', 'interesting', 'מתעניין / מעניין'],
          ['excited', 'exciting', 'נרגש / מרגש'],
          ['surprised', 'surprising', 'מופתע / מפתיע'],
          ['tired', 'tiring', 'עייף / מעייף'],
          ['frightened', 'frightening', 'מפוחד / מפחיד'],
        ],
      },
    ],
    signals: ['be', 'look', 'feel', 'sound', 'taste', 'smell', 'seem'],
    signalsTitle: 'אחרי הפעלים האלה בא שם תואר',
    spelling: [
      { rule: 'פועל רגיל: ed למי שמרגיש, ing למה שגורם', ex: 'bored / boring, tired / tiring' },
      { rule: 'נגמר ב-e: מוסיפים רק d, ומורידים את ה-e לפני ing', ex: 'surprised / surprising, excited / exciting' },
      { rule: 'עיצור + y בשם תואר עם ed: ה-y הופך ל-ied', ex: 'worry → worried' },
      { rule: 'תואר פועל: בדרך כלל מוסיפים ly', ex: 'correct → correctly, careful → carefully' },
    ],
    mistakes: [
      { bad: 'The movie was bored.', good: 'The movie was boring.', why: 'הסרט גורם לשעמום, ולכן ing. מי שמשתעמם הוא האדם: I was bored.' },
      { bad: 'I am very interesting in science.', good: 'I am very interested in science.', why: 'אני זה שמרגיש עניין, ולכן ed.' },
      { bad: 'This cake tastes deliciously.', good: 'This cake tastes delicious.', why: 'אחרי taste בא שם תואר, לא תואר פועל עם ly.' },
      { bad: 'She answered the questions correct.', good: 'She answered the questions correctly.', why: 'מתארים איך היא ענתה, ולכן תואר פועל עם ly.' },
      { bad: 'We live in an old big house.', good: 'We live in a big old house.', why: 'כשיש כמה שמות תואר, הגודל בא לפני הגיל.' },
    ],
    remember: 'הדבר משעמם (boring), והאדם משועמם (bored). אחרי look, feel, taste ו-smell בא שם תואר. איך עושים פעולה? מוסיפים ly.',
  },

  'modals-advanced': {
    what: 'מלבד can, must ו-should יש עוד פעלים מודאליים. הם מדברים על אפשרות, על יכולת בזמנים שבהם אין can, על עצה, ועל מה שמצופה מאיתנו. אחרי כולם בא פועל בסיסי.',
    uses: [
      { use: 'אפשרות: אולי', en: 'Take an umbrella. It might rain later.', he: 'כדאי לקחת מטרייה. אולי ירד גשם אחר כך.' },
      { use: 'יכולת בעתיד', en: "I won't be able to play next week.", he: 'לא אוכל לשחק בשבוע הבא.' },
      { use: 'הצלחה במקרה מסוים בעבר', en: 'After many tries, he was able to open the box.', he: 'אחרי הרבה ניסיונות הוא הצליח לפתוח את הקופסה.' },
      { use: 'כדאי, כמו should', en: 'You ought to see a doctor.', he: 'כדאי לך ללכת לרופא.' },
      { use: 'מצופה מאיתנו', en: 'We were supposed to be in class at 8:00.', he: 'היינו אמורים להיות בכיתה בשעה שמונה.' },
      { use: 'חובה בעבר', en: 'Yesterday I had to stay home because I was sick.', he: 'אתמול הייתי חייב להישאר בבית כי הייתי חולה.' },
    ],
    build: [
      { label: 'חיובי: אולי', parts: ['נושא', 'may / might', 'V1'], ex: 'She might come to the party.' },
      { label: 'שלילי: אולי לא', parts: ['נושא', 'might not', 'V1'], ex: 'She might not come.' },
      { label: 'יכולת', parts: ['נושא', 'be able to', 'V1'], ex: 'I will be able to help you tomorrow.' },
      { label: 'כדאי', parts: ['נושא', 'ought to', 'V1'], ex: 'You ought to rest.' },
      { label: 'אמור', parts: ['נושא', 'am / is / are', 'supposed to', 'V1'], ex: 'You are supposed to wear a uniform.' },
      { label: 'חובה בעבר', parts: ['נושא', 'had to', 'V1'], ex: 'We had to leave early.' },
      { label: 'שאלה', parts: ['Will', 'נושא', 'be able to', 'V1', '?'], ex: 'Will you be able to come?' },
    ],
    tables: [
      {
        title: 'איזו מילה מתאימה?',
        head: ['משמעות', 'הצורה', 'דוגמה'],
        rows: [
          ['אולי', 'may / might', 'It may be true.'],
          ['יכול, גם בעתיד ובעבר', 'be able to', 'She will be able to come.'],
          ['כדאי', 'ought to', 'You ought to study.'],
          ['אמור, מצופה', 'be supposed to', 'I am supposed to call her.'],
          ['הייתי חייב', 'had to', 'I had to wait.'],
        ],
      },
    ],
    signals: ['may', 'might', 'be able to', 'ought to', 'supposed to', 'had to'],
    mistakes: [
      { bad: 'It might to rain later.', good: 'It might rain later.', why: 'אחרי might ו-may אין to.' },
      { bad: "I won't can come tomorrow.", good: "I won't be able to come tomorrow.", why: 'אחרי will אי אפשר לשים can. אומרים be able to.' },
      { bad: 'You ought see a doctor.', good: 'You ought to see a doctor.', why: 'אחרי ought חייבים to. זה שונה מ-should, שבא בלי to.' },
      { bad: 'We supposed to be here at 8.', good: 'We are supposed to be here at 8.', why: 'לפני supposed to צריך am, is או are. בעבר: was או were.' },
      { bad: 'Yesterday I must stay home.', good: 'Yesterday I had to stay home.', why: 'למילה must אין עבר. על חובה בעבר אומרים had to.' },
    ],
    remember: 'אולי = may או might, בלי to. כשאי אפשר להשתמש ב-can אומרים be able to. כדאי עם to = ought to. אמור = be supposed to. חייב בעבר = had to.',
  },

  'modal-perfects': {
    what: 'מודאל עם have + V3 מדבר על העבר: מה היה צריך לקרות, מה בטוח קרה, ומה אולי קרה. אחרי have תמיד בא V3, והמילה have לא משתנה ל-has.',
    uses: [
      { use: 'היה צריך, וזה לא קרה', en: 'I failed the test. I should have studied harder.', he: 'נכשלתי במבחן. הייתי צריך ללמוד יותר.' },
      { use: 'זה קרה, ולא היה כדאי', en: "You shouldn't have eaten so much cake.", he: 'לא היה כדאי לאכול כל כך הרבה עוגה.' },
      { use: 'בטוחים שזה קרה', en: 'The street is wet. It must have rained.', he: 'הרחוב רטוב. בטוח ירד גשם.' },
      { use: 'אולי זה קרה', en: "He isn't answering. He might have gone to sleep.", he: 'הוא לא עונה. אולי הוא הלך לישון.' },
      { use: 'לא ייתכן שזה קרה', en: "She can't have seen me. I wasn't there!", he: 'לא ייתכן שהיא ראתה אותי. לא הייתי שם!' },
      { use: 'היה אפשר, אבל לא קרה', en: 'We could have won, but we missed the last shot.', he: 'יכולנו לנצח, אבל פספסנו את הזריקה האחרונה.' },
    ],
    build: [
      { label: 'חיובי', parts: ['נושא', 'should / must / might', 'have', 'V3'], ex: 'She must have forgotten.' },
      { label: 'שלילי', parts: ['נושא', "shouldn't / can't", 'have', 'V3'], ex: "You shouldn't have said that." },
      { label: 'שאלה', parts: ['Should', 'נושא', 'have', 'V3', '?'], ex: 'Should I have called her?' },
    ],
    tables: [
      {
        title: 'מה כל צורה אומרת על העבר?',
        head: ['הצורה', 'המשמעות', 'דוגמה'],
        rows: [
          ['should have', 'היה צריך, וזה לא קרה', 'I should have called.'],
          ["shouldn't have", 'זה קרה, ולא היה כדאי', "I shouldn't have shouted."],
          ['must have', 'בטוח שזה קרה', 'He must have left.'],
          ['might / may have', 'אולי זה קרה', 'She may have forgotten.'],
          ["can't have", 'לא ייתכן שזה קרה', "He can't have known."],
          ['could have', 'היה אפשר, וזה לא קרה', 'I could have helped.'],
        ],
      },
    ],
    signals: ['should have', 'must have', 'might have', 'may have', "can't have", 'could have'],
    mistakes: [
      { bad: 'I should studied harder.', good: 'I should have studied harder.', why: 'על העבר חסר have בין המודאל לבין V3.' },
      { bad: 'You should have tell me.', good: 'You should have told me.', why: 'אחרי have בא V3: tell - told - told.' },
      { bad: 'The street is wet. It must rained.', good: 'The street is wet. It must have rained.', why: 'מסקנה על העבר: must have + V3.' },
      { bad: "She mustn't have seen me. I wasn't there.", good: "She can't have seen me. I wasn't there.", why: 'כשמשהו לא ייתכן בעבר אומרים can\'t have.' },
      { bad: 'She must has forgotten.', good: 'She must have forgotten.', why: 'אחרי מודאל תמיד have, גם עם she, ולא has.' },
    ],
    remember: 'הנוסחה תמיד: מודאל + have + V3. היה צריך = should have. בטוח = must have. אולי = might have. לא ייתכן = can\'t have.',
  },
}

