import type { Grade } from '../data/topics'

export type RecentQuestions = {
  topics?: Record<string, string[]>
  global?: string[]
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
