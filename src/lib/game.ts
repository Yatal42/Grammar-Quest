import { TOPICS, type Grade, type Question, type Topic } from '../data/topics'

export type Mode = 'topic' | 'blitz' | 'mix'

export type PlayItem = {
  topic: Topic
  question: Question
  options: string[]
  correct: string
}

export const SESSION_SIZE = 10
export const BLITZ_SECONDS = 60

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function toItem(topic: Topic, question: Question): PlayItem {
  if (question.t === 'c') {
    return { topic, question, options: shuffle(question.o), correct: question.o[0] }
  }
  const words = question.a.split(' ')
  let options = shuffle(words)
  while (words.length > 2 && options.join(' ') === question.a) options = shuffle(words)
  return { topic, question, options, correct: question.a }
}

export function buildSession(mode: Mode, grade: Grade, topicId?: string): PlayItem[] {
  if (mode === 'topic') {
    const topic = TOPICS.find((t) => t.id === topicId)!
    return shuffle(topic.questions).slice(0, SESSION_SIZE).map((q) => toItem(topic, q))
  }
  const pool = TOPICS.filter((t) => t.grade <= grade).flatMap((t) => t.questions.map((q) => ({ t, q })))
  const picked = shuffle(pool)
  const items = (mode === 'mix' ? picked.slice(0, SESSION_SIZE) : picked).map(({ t, q }) => toItem(t, q))
  return items
}

export function pointsFor(streak: number, msLeft?: number): number {
  const base = 100
  const streakBonus = Math.min(streak, 5) * 20
  const speedBonus = msLeft ? Math.round(msLeft / 1000) : 0
  return base + streakBonus + speedBonus
}

export function starsFor(correct: number, total: number): number {
  const ratio = total ? correct / total : 0
  if (ratio >= 0.9) return 3
  if (ratio >= 0.7) return 2
  if (ratio >= 0.5) return 1
  return 0
}

export function levelFor(xp: number) {
  const level = Math.floor(Math.sqrt(xp / 500)) + 1
  const current = 500 * (level - 1) ** 2
  const next = 500 * level ** 2
  return { level, progress: (xp - current) / (next - current), toNext: next - xp }
}

export const LEVEL_TITLES = ['מתחיל', 'חוקר מילים', 'אביר הפעלים', 'מכשף הזמנים', 'אלוף הדקדוק', 'אגדת הגרמאר']

export function titleFor(level: number) {
  return LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)]
}
