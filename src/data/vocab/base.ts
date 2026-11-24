export type VocabLevel = 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'אקדמי'

export type Word = {
  en: string
  he: string
  example?: string
  level?: VocabLevel
}

export type VocabCategory = {
  id: string
  title: string
  he: string
  emoji: string
  words: Word[]
}

export const VOCAB_LEVELS: VocabLevel[] = [6, 7, 8, 9, 10, 11, 12, 'אקדמי']

export const LEVEL_LABEL: Record<VocabLevel, string> = {
  6: "ו'",
  7: "ז'",
  8: "ח'",
  9: "ט'",
  10: "י'",
  11: 'י"א',
  12: 'י"ב',
  'אקדמי': 'אקדמי',
}

export const wordLevel = (word: Word): VocabLevel => word.level ?? 6

export const w = (en: string, he: string, example?: string, level?: VocabLevel): Word => {
  const word: Word = { en, he }
  if (example) word.example = example
  if (level !== undefined) word.level = level
  return word
}
