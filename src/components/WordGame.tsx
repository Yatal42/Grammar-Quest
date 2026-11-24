import { useEffect, useMemo, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import type { Grade } from '../data/topics'
import { pointsFor } from '../lib/game'
import { sfx } from '../lib/sound'
import { WORD_SECONDS, drawPrompt, wordsForGrade, type VocabPrompt } from '../lib/vocabRound'

export type WordResult = {
  score: number
  correct: number
  answered: number
  bestStreak: number
}

type Props = {
  grade: Grade
  avatar: string
  onFinish: (result: WordResult) => void
  onAgain: () => void
  onHome: () => void
  todayDone?: boolean
}

function speak(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  const synth = window.speechSynthesis
  synth.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'en-US'
  utterance.rate = 0.95
  const voices = synth.getVoices()
  const voice = voices.find((item) => item.lang === 'en-US') ?? voices.find((item) => item.lang.startsWith('en'))
  if (voice) utterance.voice = voice
  synth.speak(utterance)
}

function beatFor(ok: boolean, streak: number) {
  if (!ok) return 900
  return Math.max(240, 480 - Math.min(streak, 8) * 30)
}

export default function WordGame({ grade, avatar, onFinish, onAgain, onHome, todayDone }: Props) {
  const pool = useMemo(() => wordsForGrade(grade), [grade])
  const used = useRef(new Set<string>())
  const [prompt, setPrompt] = useState<VocabPrompt | null>(() => drawPrompt(pool, used.current))
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [answeredCount, setAnsweredCount] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [gained, setGained] = useState(0)
  const [timeLeft, setTimeLeft] = useState(WORD_SECONDS)
  const [phase, setPhase] = useState<'play' | 'done'>(prompt ? 'play' : 'done')
  const reported = useRef(false)
  const timeRef = useRef(WORD_SECONDS)
  const resultRef = useRef<WordResult>({ score: 0, correct: 0, answered: 0, bestStreak: 0 })

  useEffect(() => {
    resultRef.current = { score, correct, answered: answeredCount, bestStreak }
  }, [score, correct, answeredCount, bestStreak])

  useEffect(() => {
    timeRef.current = timeLeft
  }, [timeLeft])

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    }
  }, [])

  useEffect(() => {
    if (phase !== 'play') return
    const id = setInterval(() => {
      setTimeLeft((current) => {
        const next = current <= 1 ? 0 : current - 1
        timeRef.current = next
        if (next === 0) clearInterval(id)
        return next
      })
    }, 1000)
    return () => clearInterval(id)
  }, [phase])

  useEffect(() => {
    if (phase === 'play' && timeLeft === 0 && !picked) setPhase('done')
  }, [phase, timeLeft, picked])

  useEffect(() => {
    if (!picked || phase !== 'play' || !prompt) return
    const ok = picked === prompt.he
    const id = setTimeout(() => {
      if (timeRef.current <= 0) {
        setPhase('done')
        return
      }
      const next = drawPrompt(pool, used.current)
      if (!next) {
        setPhase('done')
        return
      }
      setPrompt(next)
      setPicked(null)
      setGained(0)
    }, beatFor(ok, streak))
    return () => clearTimeout(id)
  }, [picked, phase, prompt, pool, streak])

  useEffect(() => {
    if (phase !== 'done' || reported.current) return
    reported.current = true
    const result = resultRef.current
    onFinish(result)
    if (result.correct > 0) {
      sfx.win()
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } })
    }
  }, [phase, onFinish])

  const answer = (value: string) => {
    if (!prompt || picked || phase !== 'play') return
    const ok = value === prompt.he
    const points = ok ? pointsFor(streak) : 0
    const nextStreak = ok ? streak + 1 : 0
    if (ok) {
      sfx.correct()
      setScore((current) => current + points)
      setCorrect((current) => current + 1)
      setStreak(nextStreak)
      setBestStreak((current) => Math.max(current, nextStreak))
      setGained(points)
      if (nextStreak >= 4) confetti({ particleCount: 14, spread: 46, origin: { y: 0.42 }, scalar: 0.7 })
    } else {
      sfx.wrong()
      setStreak(0)
    }
    setAnsweredCount((current) => current + 1)
    setPicked(value)
  }

  if (phase === 'done') {
    return (
      <div className="animate-pop mx-auto max-w-xl">
        <div className="card space-y-5 p-6 text-center sm:p-8">
          <div className={`text-7xl ${correct > 0 ? 'animate-bounce' : 'animate-float'}`}>{avatar}</div>
          <h1 className="text-3xl font-extrabold">{correct > 0 ? 'איזו ריצה!' : 'הריצה מחכה לעוד סיבוב'}</h1>
          <div className="text-5xl font-extrabold text-amber-300">{score.toLocaleString()}</div>
          <p className="text-lg text-white/80">
            נאספו {correct} כוכבים · <span dir="ltr">+{score.toLocaleString()} XP</span> עלו לפס
          </p>
          {todayDone && <p className="font-bold text-amber-100">היום סגור, מחר מחכה משהו חדש</p>}
          <button onClick={onAgain} autoFocus className="btn-primary w-full py-5 text-2xl">
            🔁 עוד סיבוב
          </button>
          <button onClick={onHome} className="btn-ghost w-full">
            🏠 לתפריט
          </button>
        </div>
      </div>
    )
  }

  if (!prompt) return null

  const ok = picked === prompt.he
  const hot = streak >= 3
  const gems = Math.min(correct, 8)
  const runner = picked && !ok ? 'animate-shake' : picked && ok ? 'animate-hop' : hot ? 'animate-bounce' : 'animate-float'

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={onHome} className="btn-ghost px-3 py-2" title="יציאה">
          ✕
        </button>
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/15">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${timeLeft <= 10 ? 'bg-rose-400' : 'bg-gradient-to-l from-sky-300 to-amber-300'}`}
            style={{ width: `${(timeLeft / WORD_SECONDS) * 100}%` }}
          />
        </div>
        <div className="min-w-14 text-center font-bold tabular-nums">⏱ {timeLeft}</div>
        <div className={`min-w-12 text-center font-extrabold ${hot ? 'scale-110 text-orange-300' : 'text-white/70'}`}>
          🔥 {streak}
        </div>
        <div className="flex max-w-24 flex-wrap items-center justify-end gap-0.5">
          {correct === 0 && <span className="text-white/30">☆</span>}
          {Array.from({ length: gems }, (_, i) => (
            <span key={i} className="animate-pop text-sm">
              ⭐
            </span>
          ))}
          {correct > gems && <span className="text-xs font-bold text-amber-200">+{correct - gems}</span>}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-b from-sky-400/25 via-indigo-950/40 to-fuchsia-950/50 px-4 py-3 sm:px-6 sm:py-5">
        {hot && (
          <div className="pointer-events-none absolute inset-y-0 right-0 left-0 flex items-center justify-between px-2 opacity-50">
            <span className="animate-pulse text-3xl">💨</span>
            <span className="animate-pulse text-3xl">💨</span>
          </div>
        )}

        <div className="relative text-center">
          <div className={`text-6xl sm:text-7xl ${runner}`}>{avatar}</div>
          {picked && ok && (
            <div className={`animate-pop font-extrabold text-emerald-200 ${hot ? 'text-5xl' : 'text-3xl'}`}>+{gained}</div>
          )}
        </div>

        <div className="relative mt-2 text-center">
          <div className="mt-1 flex items-center justify-center gap-3">
            <div dir="ltr" className={`font-extrabold ${hot ? 'text-5xl sm:text-6xl' : 'text-4xl sm:text-5xl'}`}>
              {prompt.en}
            </div>
            <button
              onClick={() => speak(prompt.en)}
              title="השמעה"
              className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/10 text-xl transition hover:bg-white/20 active:scale-90"
            >
              🔊
            </button>
          </div>
          <p className="mt-1 text-sm text-white/55">קפיצה אל המשמעות</p>
        </div>

        {picked && !ok && (
          <p className="animate-pop mt-3 text-center text-lg font-bold text-amber-100">
            אופס, ממשיכים לרוץ. המשמעות: {prompt.he}
          </p>
        )}

        <div
          key={`${prompt.en}\n${prompt.he}`}
          className="relative mt-4 grid grid-cols-2 gap-3"
          style={{ ['--lane' as string]: hot ? '0.22s' : '0.42s' }}
        >
          {prompt.options.map((option, index) => {
            const isCorrect = option === prompt.he
            const isPicked = picked === option
            const style = !picked
              ? 'bg-white/15 hover:bg-white/25 hover:-translate-y-1 border-white/30'
              : isCorrect
                ? 'bg-emerald-400 text-emerald-950 border-emerald-200 scale-105'
                : isPicked
                  ? 'bg-white/10 border-white/20 opacity-70'
                  : 'bg-white/5 border-white/10 opacity-40'
            return (
              <button
                key={option}
                disabled={!!picked}
                onClick={() => answer(option)}
                style={{ animationDelay: `${index * (hot ? 25 : 55)}ms` }}
                className={`animate-lane min-h-20 cursor-pointer rounded-3xl border-2 px-3 py-3 text-xl leading-tight font-extrabold shadow-lg transition disabled:cursor-default sm:min-h-24 sm:text-2xl ${style}`}
              >
                {option}
              </button>
            )
          })}
        </div>

        <div className="mt-3 text-center text-sm text-white/60">
          <span className="text-amber-300">{score.toLocaleString()}</span> נקודות בריצה
        </div>
      </div>
    </div>
  )
}
