import { useEffect, useState } from 'react'
import { buildSession, type Mode, type PlayItem } from './lib/game'
import { loadProfile, saveProfile, type FixCard, type Profile } from './lib/storage'
import { markToday, matchesToday, mergeFixes, todayFor } from './lib/today'
import { setSoundEnabled } from './lib/sound'
import Onboarding from './components/Onboarding'
import Home from './components/Home'
import Game, { type GameResult } from './components/Game'
import Results from './components/Results'
import Dictionary from './components/Dictionary'
import Lessons from './components/Lessons'
import Lesson from './components/Lesson'
import WordGame, { type WordResult } from './components/WordGame'
import { TOPICS } from './data/topics'

type Screen =
  | { name: 'home' }
  | { name: 'dictionary' }
  | { name: 'lessons' }
  | { name: 'lesson'; topicId: string; from: 'home' | 'lessons' }
  | { name: 'game'; mode: Mode; topicId?: string; items: PlayItem[] }
  | { name: 'results'; mode: Mode; topicId?: string; result: GameResult; prev: Profile; todayDone?: boolean }
  | { name: 'words'; round: number }

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

  useEffect(() => {
    if (!profile || profile.today?.date === todayFor(profile).date) return
    const next = { ...profile, today: todayFor(profile) }
    saveProfile(next)
    setProfile(next)
  }, [profile])

  if (!profile) return <Onboarding onDone={storeProfile} />

  const start = (mode: Mode, topicId?: string) => {
    const built = buildSession(mode, profile.grade, topicId, profile.recent)
    setProfile({ ...profile, recent: built.recent })
    setScreen({ name: 'game', mode, topicId, items: built.items })
  }

  const rememberMiss = (item: PlayItem) => {
    const card: FixCard = { sig: item.sig, topicId: item.topic.id, question: item.question }
    setProfile((current) => {
      if (!current) return current
      const next = { ...current, fixes: mergeFixes(current.fixes, [card]) }
      saveProfile(next)
      return next
    })
  }

  const finish = (mode: Mode, topicId: string | undefined, result: GameResult) => {
    const todayDone =
      (mode === 'blitz' && matchesToday(profile, 'blitz')) ||
      (mode === 'topic' && !!topicId && matchesToday(profile, 'topic', topicId))
    const cards: FixCard[] = result.mistakes.map((miss) => ({
      sig: miss.item.sig,
      topicId: miss.item.topic.id,
      question: miss.item.question,
    }))
    setProfile((current) => {
      if (!current) return current
      let next: Profile = {
        ...current,
        xp: current.xp + result.score,
        bestStreak: Math.max(current.bestStreak, result.bestStreak),
        blitzBest: mode === 'blitz' ? Math.max(current.blitzBest, result.score) : current.blitzBest,
        stars:
          mode === 'topic' && topicId
            ? { ...current.stars, [topicId]: Math.max(current.stars[topicId] ?? 0, result.stars) }
            : current.stars,
        fixes: mergeFixes(current.fixes, [...cards].reverse()),
      }
      if (
        (mode === 'blitz' && matchesToday(current, 'blitz')) ||
        (mode === 'topic' && topicId && matchesToday(current, 'topic', topicId))
      ) {
        next = markToday(next)
      }
      saveProfile(next)
      return next
    })
    setScreen({ name: 'results', mode, topicId, result, prev: profile, todayDone })
  }

  const finishWords = (result: WordResult) => {
    setProfile((current) => {
      if (!current) return current
      let next: Profile = {
        ...current,
        xp: current.xp + result.score,
        bestStreak: Math.max(current.bestStreak, result.bestStreak),
      }
      if (matchesToday(current, 'words')) next = markToday(next)
      saveProfile(next)
      return next
    })
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:py-10">
      {screen.name === 'home' && (
        <Home
          profile={profile}
          onStart={start}
          onDictionary={() => setScreen({ name: 'dictionary' })}
          onWords={() => setScreen({ name: 'words', round: 0 })}
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
              avatar={profile.avatar}
              onMiss={rememberMiss}
              onScore={(result) => {
                setProfile((current) => {
                  if (!current) return current
                  const next = {
                    ...current,
                    xp: current.xp + result.score,
                    bestStreak: Math.max(current.bestStreak, result.bestStreak),
                  }
                  saveProfile(next)
                  return next
                })
              }}
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
          avatar={profile.avatar}
          onMiss={rememberMiss}
          onFinish={(r) => finish(screen.mode, screen.topicId, r)}
          onQuit={() => setScreen({ name: 'home' })}
        />
      )}
      {screen.name === 'words' && (
        <WordGame
          key={screen.round}
          grade={profile.grade}
          avatar={profile.avatar}
          todayDone={profile.today?.kind === 'words' && !!profile.today.done}
          onFinish={finishWords}
          onAgain={() => setScreen({ name: 'words', round: screen.round + 1 })}
          onHome={() => setScreen({ name: 'home' })}
        />
      )}
      {screen.name === 'results' && (
        <Results
          mode={screen.mode}
          result={screen.result}
          prev={screen.prev}
          profile={profile}
          todayDone={screen.todayDone}
          onAgain={() => start(screen.mode, screen.topicId)}
          onHome={() => setScreen({ name: 'home' })}
        />
      )}
    </div>
  )
}
