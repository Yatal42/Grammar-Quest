import { useEffect, useState } from 'react'
import { buildSession, type Mode, type PlayItem } from './lib/game'
import { loadProfile, saveProfile, type Profile } from './lib/storage'
import { setSoundEnabled } from './lib/sound'
import Onboarding from './components/Onboarding'
import Home from './components/Home'
import Game, { type GameResult } from './components/Game'
import Results from './components/Results'
import Dictionary from './components/Dictionary'
import Lessons from './components/Lessons'
import Lesson from './components/Lesson'
import { TOPICS } from './data/topics'

type Screen =
  | { name: 'home' }
  | { name: 'dictionary' }
  | { name: 'lessons' }
  | { name: 'lesson'; topicId: string; from: 'home' | 'lessons' }
  | { name: 'game'; mode: Mode; topicId?: string; items: PlayItem[] }
  | { name: 'results'; mode: Mode; topicId?: string; result: GameResult; prev: Profile }

export default function App() {
  const [profile, setProfile] = useState<Profile | null>(() => loadProfile())
  const [screen, setScreen] = useState<Screen>({ name: 'home' })

  const storeProfile = (next: Profile | null) => {
    saveProfile(next)
    setProfile(next)
  }

  useEffect(() => {
    setSoundEnabled(profile?.sound ?? true)
  }, [profile])

  if (!profile) return <Onboarding onDone={storeProfile} />

  const start = (mode: Mode, topicId?: string) => {
    const built = buildSession(mode, profile.grade, topicId, profile.recent)
    setProfile({ ...profile, recent: built.recent })
    setScreen({ name: 'game', mode, topicId, items: built.items })
  }

  const finish = (mode: Mode, topicId: string | undefined, result: GameResult) => {
    const prev = profile
    const next: Profile = {
      ...profile,
      xp: profile.xp + result.score,
      bestStreak: Math.max(profile.bestStreak, result.bestStreak),
      blitzBest: mode === 'blitz' ? Math.max(profile.blitzBest, result.score) : profile.blitzBest,
      stars:
        mode === 'topic' && topicId
          ? { ...profile.stars, [topicId]: Math.max(profile.stars[topicId] ?? 0, result.stars) }
          : profile.stars,
    }
    storeProfile(next)
    setScreen({ name: 'results', mode, topicId, result, prev })
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:py-10">
      {screen.name === 'home' && (
        <Home
          profile={profile}
          onStart={start}
          onDictionary={() => setScreen({ name: 'dictionary' })}
          onLearn={(topicId) =>
            setScreen(topicId ? { name: 'lesson', topicId, from: 'home' } : { name: 'lessons' })
          }
          onUpdate={storeProfile}
          onReset={() => storeProfile(null)}
        />
      )}
      {screen.name === 'dictionary' && (
        <Dictionary profile={profile} onUpdate={storeProfile} onBack={() => setScreen({ name: 'home' })} />
      )}
      {screen.name === 'lessons' && (
        <Lessons
          grade={profile.grade}
          onOpen={(topicId) => setScreen({ name: 'lesson', topicId, from: 'lessons' })}
          onBack={() => setScreen({ name: 'home' })}
        />
      )}
      {screen.name === 'lesson' &&
        (() => {
          const topic = TOPICS.find((t) => t.id === screen.topicId)
          if (!topic) return null
          return (
            <Lesson
              topic={topic}
              grade={profile.grade}
              onPractice={() => start('topic', topic.id)}
              onBack={() => setScreen(screen.from === 'lessons' ? { name: 'lessons' } : { name: 'home' })}
              onOpen={(topicId) => setScreen({ ...screen, topicId })}
            />
          )
        })()}
      {screen.name === 'game' && (
        <Game
          key={screen.items.map((i) => i.correct).join('|')}
          mode={screen.mode}
          items={screen.items}
          onFinish={(r) => finish(screen.mode, screen.topicId, r)}
          onQuit={() => setScreen({ name: 'home' })}
        />
      )}
      {screen.name === 'results' && (
        <Results
          mode={screen.mode}
          result={screen.result}
          prev={screen.prev}
          profile={profile}
          onAgain={() => start(screen.mode, screen.topicId)}
          onHome={() => setScreen({ name: 'home' })}
        />
      )}
    </div>
  )
}
