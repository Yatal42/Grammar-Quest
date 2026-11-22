export type Word = {
  en: string
  he: string
  example?: string
}

export type VocabCategory = {
  id: string
  title: string
  he: string
  emoji: string
  words: Word[]
}

export const w = (en: string, he: string, example?: string): Word => (example ? { en, he, example } : { en, he })
