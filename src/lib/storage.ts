import type { Grade, Question } from '../data/topics'

export type RecentQuestions = {
  topics?: Record<string, string[]>
  global?: string[]
}

export type TodayKind = 'blitz' | 'topic' | 'words'

export type TodayCard = {
  date: string
  kind: TodayKind
  topicId?: string
  done?: boolean
}

export type FixCard = {
  sig: string
  topicId: string
  question: Question
}

export type Profile = {
  name: string
  avatar: string
  grade: Grade
  xp: number
  stars: Record<string, number>
  blitzBest: number
  bestStreak: number
  sound: boolean
  learned?: string[]
  recent?: RecentQuestions
  today?: TodayCard
  playedDays?: string[]
  fixes?: FixCard[]
}

const KEY = 'grammar-quest-profile'

export function loadProfile(): Profile | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Profile) : null
  } catch {
    return null
  }
}

export function saveProfile(p: Profile | null) {
  if (p) localStorage.setItem(KEY, JSON.stringify(p))
  else localStorage.removeItem(KEY)
}
