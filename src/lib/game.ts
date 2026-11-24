import type { Grade, Question, Topic } from '../data/topics'
import { pickFresh, planSession, poolFor } from './generate'
import type { RecentQuestions } from './storage'

export type Mode = 'topic' | 'blitz' | 'mix'

export type PlayItem = {
  topic: Topic
  question: Question
  options: string[]
  correct: string
  sig: string
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

function toItem(topic: PlayItem['topic'], question: PlayItem['question'], sig: string): PlayItem {
  if (question.t === 'c') {
    return { topic, question, options: shuffle(question.o), correct: question.o[0], sig }
  }
  const words = question.a.split(' ')
  let options = shuffle(words)
  let guard = 0
  while (words.length > 2 && options.join(' ') === question.a && guard < 8) {
    options = shuffle(words)
    guard++
  }
  return { topic, question, options, correct: question.a, sig }
}

export function buildWarmup(topic: Topic): PlayItem[] {
  try {
    const picked = pickFresh(poolFor(topic), [], 3)
    if (picked.length) return picked.map((item) => toItem(item.topic, item.question, item.sig))
  } catch {
    return topic.questions.slice(0, 3).map((question, index) => toItem(topic, question, `${topic.id}:warm:${index}`))
  }
  return topic.questions.slice(0, 3).map((question, index) => toItem(topic, question, `${topic.id}:warm:${index}`))
}

export function buildSession(
  mode: Mode,
  grade: Grade,
  topicId?: string,
  recent?: RecentQuestions,
): { items: PlayItem[]; recent: RecentQuestions } {
  const planned = planSession(mode, grade, topicId, recent)
  return {
    items: planned.picked.map((item) => toItem(item.topic, item.question, item.sig)),
    recent: planned.recent,
  }
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
