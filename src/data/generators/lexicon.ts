export type One = {
  en: string
  sub: 'he' | 'she' | 'it'
  obj: 'him' | 'her' | 'it'
  det: 'his' | 'her' | 'its'
  ref: 'himself' | 'herself' | 'itself'
  abs: 'his' | 'hers'
  be: 'is'
  past: 'was'
  do: 'does'
  have: 'has'
  he: string
}

export type Many = {
  en: string
  sub: 'they' | 'we' | 'you'
  obj: 'them' | 'us' | 'you'
  det: 'their' | 'our' | 'your'
  ref: 'themselves' | 'ourselves' | 'yourself'
  abs: 'theirs' | 'ours' | 'yours'
  be: 'are'
  past: 'were'
  do: 'do'
  have: 'have'
  he: string
}

export const GIRLS: One[] = [
  { en: 'Noa', sub: 'she', obj: 'her', det: 'her', ref: 'herself', abs: 'hers', be: 'is', past: 'was', do: 'does', have: 'has', he: 'נועה היא בת' },
  { en: 'Maya', sub: 'she', obj: 'her', det: 'her', ref: 'herself', abs: 'hers', be: 'is', past: 'was', do: 'does', have: 'has', he: 'מאיה היא בת' },
  { en: 'Dana', sub: 'she', obj: 'her', det: 'her', ref: 'herself', abs: 'hers', be: 'is', past: 'was', do: 'does', have: 'has', he: 'דנה היא בת' },
  { en: 'Yael', sub: 'she', obj: 'her', det: 'her', ref: 'herself', abs: 'hers', be: 'is', past: 'was', do: 'does', have: 'has', he: 'יעל היא בת' },
  { en: 'Shira', sub: 'she', obj: 'her', det: 'her', ref: 'herself', abs: 'hers', be: 'is', past: 'was', do: 'does', have: 'has', he: 'שירה היא בת' },
  { en: 'My sister', sub: 'she', obj: 'her', det: 'her', ref: 'herself', abs: 'hers', be: 'is', past: 'was', do: 'does', have: 'has', he: 'אחותי היא בת' },
  { en: 'My mom', sub: 'she', obj: 'her', det: 'her', ref: 'herself', abs: 'hers', be: 'is', past: 'was', do: 'does', have: 'has', he: 'אמא שלי היא בת' },
  { en: 'My aunt', sub: 'she', obj: 'her', det: 'her', ref: 'herself', abs: 'hers', be: 'is', past: 'was', do: 'does', have: 'has', he: 'הדודה שלי היא בת' },
]

export const BOYS: One[] = [
  { en: 'Tom', sub: 'he', obj: 'him', det: 'his', ref: 'himself', abs: 'his', be: 'is', past: 'was', do: 'does', have: 'has', he: 'טום הוא בן' },
  { en: 'Dan', sub: 'he', obj: 'him', det: 'his', ref: 'himself', abs: 'his', be: 'is', past: 'was', do: 'does', have: 'has', he: 'דן הוא בן' },
  { en: 'Ron', sub: 'he', obj: 'him', det: 'his', ref: 'himself', abs: 'his', be: 'is', past: 'was', do: 'does', have: 'has', he: 'רון הוא בן' },
  { en: 'Lior', sub: 'he', obj: 'him', det: 'his', ref: 'himself', abs: 'his', be: 'is', past: 'was', do: 'does', have: 'has', he: 'ליאור הוא בן' },
  { en: 'Omar', sub: 'he', obj: 'him', det: 'his', ref: 'himself', abs: 'his', be: 'is', past: 'was', do: 'does', have: 'has', he: 'עומר הוא בן' },
  { en: 'My brother', sub: 'he', obj: 'him', det: 'his', ref: 'himself', abs: 'his', be: 'is', past: 'was', do: 'does', have: 'has', he: 'אחי הוא בן' },
  { en: 'My dad', sub: 'he', obj: 'him', det: 'his', ref: 'himself', abs: 'his', be: 'is', past: 'was', do: 'does', have: 'has', he: 'אבא שלי הוא בן' },
  { en: 'My uncle', sub: 'he', obj: 'him', det: 'his', ref: 'himself', abs: 'his', be: 'is', past: 'was', do: 'does', have: 'has', he: 'הדוד שלי הוא בן' },
]

export const ONES: One[] = [...GIRLS, ...BOYS]

export const GROUPS: Many[] = [
  { en: 'They', sub: 'they', obj: 'them', det: 'their', ref: 'themselves', abs: 'theirs', be: 'are', past: 'were', do: 'do', have: 'have', he: 'הם רבים' },
  { en: 'We', sub: 'we', obj: 'us', det: 'our', ref: 'ourselves', abs: 'ours', be: 'are', past: 'were', do: 'do', have: 'have', he: 'אנחנו רבים' },
  { en: 'My friends', sub: 'they', obj: 'them', det: 'their', ref: 'themselves', abs: 'theirs', be: 'are', past: 'were', do: 'do', have: 'have', he: 'החברים שלי הם רבים' },
  { en: 'The children', sub: 'they', obj: 'them', det: 'their', ref: 'themselves', abs: 'theirs', be: 'are', past: 'were', do: 'do', have: 'have', he: 'הילדים הם רבים' },
  { en: 'The students', sub: 'they', obj: 'them', det: 'their', ref: 'themselves', abs: 'theirs', be: 'are', past: 'were', do: 'do', have: 'have', he: 'התלמידים הם רבים' },
  { en: 'My parents', sub: 'they', obj: 'them', det: 'their', ref: 'themselves', abs: 'theirs', be: 'are', past: 'were', do: 'do', have: 'have', he: 'ההורים שלי הם רבים' },
  { en: 'The girls', sub: 'they', obj: 'them', det: 'their', ref: 'themselves', abs: 'theirs', be: 'are', past: 'were', do: 'do', have: 'have', he: 'הבנות הן רבות' },
  { en: 'The boys', sub: 'they', obj: 'them', det: 'their', ref: 'themselves', abs: 'theirs', be: 'are', past: 'were', do: 'do', have: 'have', he: 'הבנים הם רבים' },
]

export const HABITS = [
  { b: 'play', s: 'plays', ing: 'playing', p: 'played', v3: 'played', obj: 'football' },
  { b: 'watch', s: 'watches', ing: 'watching', p: 'watched', v3: 'watched', obj: 'cartoons' },
  { b: 'read', s: 'reads', ing: 'reading', p: 'read', v3: 'read', obj: 'comics' },
  { b: 'study', s: 'studies', ing: 'studying', p: 'studied', v3: 'studied', obj: 'math' },
  { b: 'clean', s: 'cleans', ing: 'cleaning', p: 'cleaned', v3: 'cleaned', obj: 'the kitchen' },
  { b: 'visit', s: 'visits', ing: 'visiting', p: 'visited', v3: 'visited', obj: 'Grandma' },
  { b: 'walk', s: 'walks', ing: 'walking', p: 'walked', v3: 'walked', obj: 'the dog' },
  { b: 'help', s: 'helps', ing: 'helping', p: 'helped', v3: 'helped', obj: 'a classmate' },
] as const

export const IRREGULAR = [
  { b: 'go', s: 'goes', ing: 'going', p: 'went', v3: 'gone', bad: 'goed', obj: 'to the beach' },
  { b: 'see', s: 'sees', ing: 'seeing', p: 'saw', v3: 'seen', bad: 'seed', obj: 'a rainbow' },
  { b: 'eat', s: 'eats', ing: 'eating', p: 'ate', v3: 'eaten', bad: 'eated', obj: 'a sandwich' },
  { b: 'buy', s: 'buys', ing: 'buying', p: 'bought', v3: 'bought', bad: 'buyed', obj: 'a notebook' },
  { b: 'write', s: 'writes', ing: 'writing', p: 'wrote', v3: 'written', bad: 'writed', obj: 'a story' },
  { b: 'drink', s: 'drinks', ing: 'drinking', p: 'drank', v3: 'drunk', bad: 'drinked', obj: 'some milk' },
  { b: 'give', s: 'gives', ing: 'giving', p: 'gave', v3: 'given', bad: 'gived', obj: 'a present' },
  { b: 'take', s: 'takes', ing: 'taking', p: 'took', v3: 'taken', bad: 'taked', obj: 'the bus' },
  { b: 'speak', s: 'speaks', ing: 'speaking', p: 'spoke', v3: 'spoken', bad: 'speaked', obj: 'English' },
  { b: 'break', s: 'breaks', ing: 'breaking', p: 'broke', v3: 'broken', bad: 'breaked', obj: 'a glass' },
  { b: 'choose', s: 'chooses', ing: 'choosing', p: 'chose', v3: 'chosen', bad: 'choosed', obj: 'a book' },
  { b: 'find', s: 'finds', ing: 'finding', p: 'found', v3: 'found', bad: 'finded', obj: 'a coin' },
  { b: 'make', s: 'makes', ing: 'making', p: 'made', v3: 'made', bad: 'maked', obj: 'a cake' },
  { b: 'meet', s: 'meets', ing: 'meeting', p: 'met', v3: 'met', bad: 'meeted', obj: 'the teacher' },
  { b: 'run', s: 'runs', ing: 'running', p: 'ran', v3: 'run', bad: 'runned', obj: 'a race' },
  { b: 'tell', s: 'tells', ing: 'telling', p: 'told', v3: 'told', bad: 'telled', obj: 'a joke' },
  { b: 'win', s: 'wins', ing: 'winning', p: 'won', v3: 'won', bad: 'winned', obj: 'the game' },
  { b: 'lose', s: 'loses', ing: 'losing', p: 'lost', v3: 'lost', bad: 'losed', obj: 'the ticket' },
] as const

export const TIMES = ['every day', 'on Sundays', 'after school', 'in the morning', 'on Fridays', 'every evening'] as const
export const PAST_TIMES = ['yesterday', 'last night', 'last week', 'last year', 'on Sunday', 'two days ago'] as const

export const COUNTABLES = ['apples', 'books', 'chairs', 'friends', 'questions', 'tickets', 'sandwiches', 'pencils'] as const
export const MASSES = ['water', 'milk', 'time', 'sugar', 'juice', 'bread', 'rice', 'money'] as const

export function articleFor(word: string): 'a' | 'an' {
  const w = word.toLowerCase()
  if (w === 'hour' || w === 'honest' || w === 'honour') return 'an'
  if (w === 'university' || w === 'uniform' || w === 'euro') return 'a'
  return /^[aeiou]/.test(w) ? 'an' : 'a'
}
