import { useCallback, useEffect, useRef, useState } from 'react'
import { BLITZ_SECONDS, pointsFor, starsFor, type Mode, type PlayItem } from '../lib/game'
import { sfx } from '../lib/sound'

export type Mistake = { item: PlayItem; given: string }

export type GameResult = {
  score: number
  correct: number
  total: number
  bestStreak: number
  stars: number
  mistakes: Mistake[]
}

type Props = {
  mode: Mode
  items: PlayItem[]
  onFinish: (r: GameResult) => void
  onQuit: () => void
  avatar?: string
  finishLabel?: string
  onMiss?: (item: PlayItem) => void
}

const SPEED_WINDOW_MS = 15000

export default function Game({ mode, items, onFinish, onQuit, avatar, finishLabel, onMiss }: Props) {
  const blitz = mode === 'blitz'
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [answered, setAnswered] = useState<{ value: string; ok: boolean; points: number } | null>(null)
  const [mistakes, setMistakes] = useState<Mistake[]>([])
  const [timeLeft, setTimeLeft] = useState(BLITZ_SECONDS)
  const [done, setDone] = useState(false)
  const [showTip, setShowTip] = useState(false)
  const startedAt = useRef(Date.now())
  const finished = useRef(false)

  const item = items[idx]
  const answeredCount = idx + (answered ? 1 : 0)

  useEffect(() => {
    if (!done || finished.current) return
    finished.current = true
    const total = blitz ? answeredCount : items.length
    onFinish({ score, correct, total, bestStreak, stars: starsFor(correct, total), mistakes })
  }, [done, blitz, answeredCount, items.length, score, correct, bestStreak, mistakes, onFinish])

  useEffect(() => {
    if (!blitz || done) return
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(id)
          setDone(true)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [blitz, done])

  const next = useCallback(() => {
    if (idx + 1 >= items.length) {
      setDone(true)
      return
    }
    setIdx((i) => i + 1)
    setAnswered(null)
    startedAt.current = Date.now()
  }, [idx, items.length])

  const answer = useCallback(
    (value: string) => {
      if (answered || done) return
      const ok = value === item.correct
      let points = 0
      if (ok) {
        const msLeft = blitz ? 0 : Math.max(0, SPEED_WINDOW_MS - (Date.now() - startedAt.current))
        points = pointsFor(streak, msLeft)
        setScore((s) => s + points)
        setCorrect((c) => c + 1)
        setStreak((s) => s + 1)
        setBestStreak((b) => Math.max(b, streak + 1))
        sfx.correct()
      } else {
        setStreak(0)
        setMistakes((m) => [...m, { item, given: value }])
        onMiss?.(item)
        sfx.wrong()
      }
      setAnswered({ value, ok, points })
    },
    [answered, done, item, blitz, streak, onMiss],
  )

  useEffect(() => {
    if (!blitz || !answered) return
    const id = setTimeout(next, answered.ok ? 650 : 1400)
    return () => clearTimeout(id)
  }, [blitz, answered, next])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (answered && !blitz && e.key === 'Enter') next()
      if (!answered && item.question.t === 'c') {
        const n = Number(e.key)
        if (n >= 1 && n <= item.options.length) answer(item.options[n - 1])
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [answered, blitz, next, item, answer])

  if (!item) return null

  const progress = blitz ? timeLeft / BLITZ_SECONDS : answeredCount / items.length
  const dock = !!answered && !blitz

  return (
    <div
      className={`mx-auto flex w-full max-w-3xl flex-col gap-3 sm:gap-5 ${dock ? 'h-[calc(100dvh-1.5rem)] -mb-6 sm:h-[calc(100dvh-2.5rem)] sm:-mb-10' : ''}`}
    >
      <div className="shrink-0 space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={onQuit} className="btn-ghost min-h-11 min-w-11 px-3" title="יציאה">
          ✕
        </button>
        <div className="relative h-7 flex-1">
          <div className="absolute inset-x-0 top-1/2 h-4 -translate-y-1/2 overflow-hidden rounded-full bg-white/15">
            <div
              className={`h-full rounded-full transition-all duration-700 ${blitz && timeLeft <= 10 ? 'bg-rose-500' : 'bg-gradient-to-l from-emerald-300 to-teal-500'}`}
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          {avatar && (
            <span
              className="pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 text-xl leading-none transition-all duration-700"
              style={{ insetInlineStart: `clamp(0px, calc(${progress * 100}% - 0.7rem), calc(100% - 1.35rem))` }}
            >
              {avatar}
            </span>
          )}
        </div>
        <div className="min-w-16 text-center font-bold tabular-nums">
          {blitz ? `⏱ ${timeLeft}` : `${Math.min(idx + 1, items.length)}/${items.length}`}
        </div>
      </div>

      <div className="flex items-center justify-between text-lg">
        <div className="font-bold">
          <span className="text-amber-300">{score.toLocaleString()}</span> נק'
        </div>
        <div className={`font-bold transition ${streak >= 3 ? 'scale-110 text-orange-300' : 'text-white/60'}`}>
          🔥 {streak}
          {streak >= 3 && <span className="mr-1 text-sm">On fire!</span>}
        </div>
      </div>
      </div>

      <div className={`space-y-3 sm:space-y-5 ${dock ? 'min-h-0 flex-1 overflow-y-auto overscroll-contain' : ''}`}>
      <div
        key={idx}
        className={`card relative p-4 sm:p-8 ${answered ? (answered.ok ? 'ring-4 ring-emerald-400/70' : 'animate-shake ring-4 ring-rose-400/70') : 'animate-pop'}`}
      >
        <div className="mb-4 flex items-center gap-2 text-sm text-white/60">
          <span>{item.topic.emoji}</span>
          <span dir="ltr">{item.topic.title}</span>
          <span>·</span>
          <span>{item.question.t === 'c' ? 'השלימו את המשפט' : 'סדרו את המילים למשפט נכון'}</span>
          {!blitz && (
            <button
              onClick={() => setShowTip((v) => !v)}
              className="mr-auto flex min-h-11 items-center rounded-full bg-white/10 px-3 text-white/80 hover:bg-white/20"
            >
              💡 טיפ
            </button>
          )}
        </div>
        {showTip && !blitz && !answered && (
          <div className="animate-pop mb-5 rounded-2xl bg-amber-300/15 p-4 text-amber-100">{item.topic.tip}</div>
        )}

        {answered?.ok && (
          <div className="animate-pop absolute top-4 left-4 rounded-full bg-emerald-400 px-3 py-1 font-extrabold text-emerald-950">
            +{answered.points}
          </div>
        )}

        {item.question.t === 'c' ? (
          <ChoiceView item={item} answered={answered} onAnswer={answer} />
        ) : (
          <OrderView item={item} answered={answered} onAnswer={answer} auto={blitz} />
        )}
      </div>

      {dock && (
        <div className="animate-pop card p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="text-3xl">{answered.ok ? '🎉' : '💡'}</div>
            <div>
              <div className={`text-lg font-bold ${answered.ok ? 'text-emerald-300' : 'text-rose-300'}`}>
                {answered.ok ? pickPraise() : 'לא נורא, ככה לומדים!'}
              </div>
              {!answered.ok && (
                <div className="mt-1 text-white/80">
                  הבחירה שלך:{' '}
                  <span dir="ltr" className="font-bold text-rose-200">
                    {answered.value}
                  </span>
                  <span className="mx-2 text-white/40">·</span>
                  התשובה הנכונה:{' '}
                  <span dir="ltr" className="font-bold text-emerald-300">
                    {item.correct}
                  </span>
                </div>
              )}
              <div className="mt-1 text-white/80">{item.question.e}</div>
            </div>
          </div>
        </div>
      )}
      </div>

      {dock && (
        <div className="-mx-4 shrink-0 border-t border-white/15 bg-indigo-950/90 px-4 pt-3 backdrop-blur-md pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <button autoFocus onClick={next} className="btn-primary min-h-12 w-full text-lg">
            {idx + 1 >= items.length ? (finishLabel ?? 'לתוצאות 🏁') : 'הבא ←'}
          </button>
        </div>
      )}
    </div>
  )
}

const PRAISES = ['מעולה!', 'אלופים!', 'בול!', 'וואו, יפה!', 'Perfect!', 'Awesome!', 'כל הכבוד!']
function pickPraise() {
  return PRAISES[Math.floor(Math.random() * PRAISES.length)]
}

const QUESTION_STARTERS = ['Do', 'Does', 'Did', 'Is', 'Are', 'Was', 'Were', 'Have', 'Has', 'Can', 'Will', 'Where', 'What', 'When', 'Why', 'How', 'Who']
function punctuation(sentence: string) {
  return QUESTION_STARTERS.includes(sentence.split(' ')[0]) ? '?' : '.'
}

type ViewProps = {
  item: PlayItem
  answered: { value: string; ok: boolean } | null
  onAnswer: (v: string) => void
}

function Sentence({ text, fill }: { text: string; fill?: string }) {
  const parts = text.split('___')
  const fills = fill?.split(' / ') ?? []
  return (
    <p dir="ltr" className="text-left text-2xl leading-relaxed font-medium sm:text-3xl">
      {parts.map((p, i) => (
        <span key={i}>
          {p}
          {i < parts.length - 1 &&
            (fill ? (
              <span className="mx-1 rounded-lg bg-emerald-400/25 px-2 font-bold text-emerald-200">{fills[i] ?? fill}</span>
            ) : (
              <span className="mx-1 inline-block w-20 border-b-4 border-amber-300 align-baseline" />
            ))}
        </span>
      ))}
    </p>
  )
}

function ChoiceView({ item, answered, onAnswer }: ViewProps) {
  if (item.question.t !== 'c') return null
  return (
    <div className="space-y-6">
      <Sentence text={item.question.q} fill={answered ? item.correct : undefined} />
      <div className={`grid gap-3 ${answered ? 'grid-cols-2' : 'sm:grid-cols-2'}`} dir="ltr">
        {item.options.map((o, i) => {
          const isCorrect = o === item.correct
          const isPicked = answered?.value === o
          const style = !answered
            ? 'bg-white/10 hover:bg-white/20 hover:-translate-y-0.5 border-white/20'
            : isCorrect
              ? 'bg-emerald-500/80 border-emerald-300'
              : isPicked
                ? 'bg-rose-500/80 border-rose-300'
                : 'bg-white/5 border-white/10 opacity-50'
          return (
            <button
              key={o}
              disabled={!!answered}
              onClick={() => onAnswer(o)}
              className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-2xl border-2 px-4 text-left font-semibold transition disabled:cursor-default ${answered ? 'py-2 text-base' : 'py-4 text-xl'} ${style}`}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black/20 text-sm">
                {i + 1}
              </span>
              {o}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function OrderView({ item, answered, onAnswer, auto }: ViewProps & { auto: boolean }) {
  const [picked, setPicked] = useState<number[]>([])
  const remaining = item.options.map((_, i) => i).filter((i) => !picked.includes(i))
  const built = picked.map((i) => item.options[i]).join(' ')
  const complete = picked.length === item.options.length

  useEffect(() => {
    if (auto && complete && !answered) onAnswer(built)
  }, [auto, complete, answered, built, onAnswer])

  const add = (i: number) => {
    if (answered) return
    sfx.click()
    setPicked((p) => [...p, i])
  }
  const remove = (i: number) => {
    if (answered) return
    setPicked((p) => p.filter((x) => x !== i))
  }

  return (
    <div className="space-y-5" dir="ltr">
      <div
        className={`flex min-h-20 flex-wrap items-center gap-2 rounded-2xl border-2 border-dashed p-3 ${answered ? (answered.ok ? 'border-emerald-400 bg-emerald-500/20' : 'border-rose-400 bg-rose-500/20') : 'border-white/30 bg-black/10'}`}
      >
        {picked.length === 0 && <span className="text-white/40">Tap the words in the right order…</span>}
        {picked.map((i) => (
          <button
            key={i}
            onClick={() => remove(i)}
            className="animate-pop min-h-11 min-w-11 cursor-pointer rounded-xl bg-amber-400 px-3 py-2 text-lg font-bold text-indigo-950 shadow"
          >
            {item.options[i]}
          </button>
        ))}
        {complete && <span className="text-2xl font-bold">{punctuation(item.correct)}</span>}
      </div>

      {!answered && (
        <div className="flex min-h-14 flex-wrap gap-2">
          {remaining.map((i) => (
            <button
              key={i}
              onClick={() => add(i)}
              className="min-h-11 min-w-11 cursor-pointer rounded-xl border-2 border-white/25 bg-white/10 px-3 py-2 text-lg font-semibold transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              {item.options[i]}
            </button>
          ))}
        </div>
      )}

      {answered && !answered.ok && (
        <p className="text-lg">
          ✅{' '}
          <span className="font-bold text-emerald-300">
            {item.correct}
            {punctuation(item.correct)}
          </span>
        </p>
      )}

      {!answered && !auto && (
        <div className="flex gap-3">
          <button onClick={() => setPicked([])} disabled={!picked.length} className="btn-ghost">
            ↺ Reset
          </button>
          <button onClick={() => onAnswer(built)} disabled={!complete} className="btn-primary flex-1 text-lg">
            בדיקה ✓
          </button>
        </div>
      )}
    </div>
  )
}
