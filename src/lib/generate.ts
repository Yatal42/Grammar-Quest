import { GENERATORS } from '../data/generators'
import { TOPICS, type Grade, type Question, type Topic } from '../data/topics'
import type { RecentQuestions } from './storage'

export const RECENT_CAP = 80
export const BLITZ_COUNT = 40

export type Signed = {
  sig: string
  topic: Topic
  question: Question
}

const cache = new Map<string, Signed[]>()

export function questionSig(topicId: string, question: Question) {
  if (question.t === 'c') return `${topicId}\nc\n${question.q}\n${question.o[0]}`
  return `${topicId}\no\n${question.a}`
}

function usableBank(question: Question) {
  if (!/^[\u0590-\u05FF]/.test(question.e)) return false
  if (question.t === 'c') {
    if (question.o.length !== 4 || new Set(question.o).size !== 4) return false
    return question.o[0].split(' / ').length === question.q.split('___').length - 1
  }
  const tokens = question.a.split(' ')
  return tokens.length >= 3 && new Set(tokens).size === tokens.length
}

export function poolFor(topic: Topic): Signed[] {
  const hit = cache.get(topic.id)
  if (hit) return hit
  const make = GENERATORS[topic.id]
  if (!make) throw new Error(`missing generator ${topic.id}`)
  const bank = topic.questions.filter(usableBank).slice(0, 4)
  const seen = new Set<string>()
  const out: Signed[] = []
  for (const question of [...bank, ...make()]) {
    const sig = questionSig(topic.id, question)
    if (seen.has(sig)) continue
    seen.add(sig)
    out.push({ sig, topic, question })
  }
  cache.set(topic.id, out)
  return out
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function pickFresh(pool: Signed[], recent: string[], count: number): Signed[] {
  const seen = new Set(recent)
  const used = new Set<string>()
  const picked: Signed[] = []
  for (const item of shuffle(pool)) {
    if (picked.length >= count) break
    if (seen.has(item.sig) || used.has(item.sig)) continue
    picked.push(item)
    used.add(item.sig)
  }
  if (picked.length < count) {
    const bySig = new Map(pool.map((item) => [item.sig, item]))
    for (const sig of recent) {
      if (picked.length >= count) break
      if (used.has(sig)) continue
      const item = bySig.get(sig)
      if (!item) continue
      picked.push(item)
      used.add(sig)
    }
  }
  if (picked.length < count) {
    for (const item of pool) {
      if (picked.length >= count) break
      if (used.has(item.sig)) continue
      picked.push(item)
      used.add(item.sig)
    }
  }
  return shuffle(picked)
}

export function remember(prev: string[] | undefined, sigs: string[], cap = RECENT_CAP) {
  const next = [...(prev ?? [])]
  for (const sig of sigs) {
    const at = next.indexOf(sig)
    if (at >= 0) next.splice(at, 1)
    next.push(sig)
  }
  return next.length > cap ? next.slice(next.length - cap) : next
}

export function planSession(
  mode: 'topic' | 'blitz' | 'mix',
  grade: Grade,
  topicId: string | undefined,
  recent: RecentQuestions | undefined,
) {
  const base: RecentQuestions = {
    topics: { ...(recent?.topics ?? {}) },
    global: [...(recent?.global ?? [])],
  }
  if (mode === 'topic') {
    const topic = TOPICS.find((item) => item.id === topicId)
    if (!topic) return { picked: [] as Signed[], recent: base }
    const pool = poolFor(topic)
    const history = base.topics?.[topic.id] ?? []
    const picked = pickFresh(pool, history, Math.min(10, pool.length))
    return {
      picked,
      recent: {
        ...base,
        topics: { ...base.topics, [topic.id]: remember(history, picked.map((item) => item.sig)) },
      },
    }
  }
  const pool = TOPICS.filter((topic) => topic.grade <= grade).flatMap((topic) => poolFor(topic))
  const history = base.global ?? []
  const size = mode === 'blitz' ? Math.min(BLITZ_COUNT, pool.length) : Math.min(10, pool.length)
  const picked = pickFresh(pool, history, size)
  return {
    picked,
    recent: { ...base, global: remember(history, picked.map((item) => item.sig)) },
  }
}
