import { TOPICS } from '../data/topics'
import type { FixCard, Profile, TodayCard, TodayKind } from './storage'

export function dayKey(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function rollToday(profile: Profile, date = dayKey()): TodayCard {
  const open = TOPICS.filter((topic) => topic.grade <= profile.grade && (profile.stars[topic.id] ?? 0) < 3)
  const n = [...date].reduce((sum, ch) => sum + ch.charCodeAt(0), 0)
  let kind: TodayKind = (['blitz', 'topic', 'words'] as const)[n % 3]
  if (kind === 'topic' && open.length === 0) kind = n % 2 ? 'blitz' : 'words'
  const topic = kind === 'topic' ? open[n % open.length] : undefined
  return { date, kind, topicId: topic?.id, done: false }
}

export function todayFor(profile: Profile): TodayCard {
  const date = dayKey()
  if (profile.today?.date === date) return profile.today
  return rollToday(profile, date)
}

export function matchesToday(profile: Profile, kind: TodayKind, topicId?: string) {
  const today = profile.today
  if (!today || today.date !== dayKey() || today.done || today.kind !== kind) return false
  if (kind === 'topic' && today.topicId !== topicId) return false
  return true
}

export function markToday(profile: Profile): Profile {
  const today = profile.today
  if (!today || today.date !== dayKey() || today.done) return profile
  const playedDays = [today.date, ...(profile.playedDays ?? []).filter((day) => day !== today.date)].slice(0, 8)
  return { ...profile, today: { ...today, done: true }, playedDays }
}

export function dayDots(played: string[] | undefined, now = new Date()) {
  return [0, 1, 2].map((ago) => {
    const date = new Date(now)
    date.setDate(date.getDate() - ago)
    const key = dayKey(date)
    return { key, filled: (played ?? []).includes(key) }
  })
}

export function mergeFixes(existing: FixCard[] | undefined, incoming: FixCard[]): FixCard[] {
  const out: FixCard[] = []
  for (const card of [...incoming, ...(existing ?? [])]) {
    if (!card.sig || out.some((item) => item.sig === card.sig)) continue
    out.push(card)
    if (out.length === 3) break
  }
  return out
}
