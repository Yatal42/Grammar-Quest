import type { Grade } from '../data/topics'
import { VOCABULARY, type VocabCategory, type Word } from '../data/vocabulary'
import { shuffle } from './game'

export const WORD_SECONDS = 50

export type VocabPrompt = { en: string; he: string; options: string[] }

type VocabEntry = { en: string; he: string; academic: boolean; level: number | null }

function raw(obj: object, key: string): unknown {
  return (obj as Record<string, unknown>)[key]
}

function asLevel(value: unknown): number | 'academic' | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value !== 'string') return null
  const text = value.trim()
  if (!text) return null
  if (text.includes('אקדמי') || text.toLowerCase() === 'academic') return 'academic'
  const n = Number(text)
  return Number.isFinite(n) ? n : null
}

function readLevel(word: Word, category: VocabCategory): number | 'academic' | null {
  for (const value of [raw(word, 'level'), raw(word, 'grade'), raw(category, 'level'), raw(category, 'grade')]) {
    const level = asLevel(value)
    if (level != null) return level
  }
  return null
}

function labeledAcademic(category: VocabCategory) {
  return [category.id, category.title, category.he].some(
    (part) => part.includes('אקדמי') || part.toLowerCase().includes('academic'),
  )
}

function flatten(): VocabEntry[] {
  const seen = new Set<string>()
  const out: VocabEntry[] = []
  for (const category of VOCABULARY) {
    const academic = labeledAcademic(category)
    for (const word of category.words) {
      const en = word.en.trim()
      const he = word.he.trim()
      if (!en || !he) continue
      const level = readLevel(word, category)
      const key = `${en}\n${he}`
      if (seen.has(key)) continue
      seen.add(key)
      out.push({
        en,
        he,
        academic: academic || level === 'academic',
        level: typeof level === 'number' ? level : null,
      })
    }
  }
  return out
}

function uniqueMeanings(entries: VocabEntry[]) {
  return new Set(entries.map((entry) => entry.he)).size
}

function fits(entry: VocabEntry, grade: Grade) {
  if (entry.academic && grade < 12) return false
  if (entry.level != null && entry.level > grade) return false
  return true
}

export function wordsForGrade(grade: Grade): VocabEntry[] {
  const all = flatten()
  const matched = all.filter((entry) => fits(entry, grade))
  if (uniqueMeanings(matched) >= 4) return matched
  const open = all.filter((entry) => grade >= 12 || !entry.academic)
  if (uniqueMeanings(open) >= 4) return open
  return all
}

function meaningsExcept(entries: { he: string }[], he: string) {
  return [...new Set(entries.map((entry) => entry.he).filter((item) => item !== he))]
}

export function drawPrompt(pool: VocabEntry[], used: Set<string>): VocabPrompt | null {
  if (pool.length === 0) return null
  let fresh = pool.filter((entry) => !used.has(`${entry.en}\n${entry.he}`))
  if (fresh.length === 0) {
    used.clear()
    fresh = pool
  }
  const word = fresh[Math.floor(Math.random() * fresh.length)]
  used.add(`${word.en}\n${word.he}`)
  let meanings = meaningsExcept(pool, word.he)
  if (meanings.length < 3) meanings = meaningsExcept(flatten(), word.he)
  const distractors = shuffle(meanings).slice(0, 3)
  if (distractors.length < 3) return null
  return { en: word.en, he: word.he, options: shuffle([word.he, ...distractors]) }
}
