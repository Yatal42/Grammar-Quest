import { useEffect, useMemo, useRef, useState } from 'react'
import { TOPICS } from '../data/topics'
import { pointsFor, shuffle, type PlayItem } from '../lib/game'
import type { FixCard } from '../lib/storage'
import { sfx } from '../lib/sound'

type Props = {
  fix: FixCard
  onClear: (points: number) => void
}

function itemFor(fix: FixCard): PlayItem | null {
  const topic = TOPICS.find((entry) => entry.id === fix.topicId)
  if (!topic) return null
  const question = fix.question
  if (question.t === 'c') {
    return { topic, question, options: shuffle(question.o), correct: question.o[0], sig: fix.sig }
  }
  return { topic, question, options: shuffle(question.a.split(' ')), correct: question.a, sig: fix.sig }
}

export default function FixChip({ fix, onClear }: Props) {
  const item = useMemo(() => itemFor(fix), [fix])
  const [open, setOpen] = useState(false)
  const [picked, setPicked] = useState<string | null>(null)
  const [order, setOrder] = useState<number[]>([])
  const started = useRef(Date.now())

  useEffect(() => {
    setOpen(false)
    setPicked(null)
    setOrder([])
    started.current = Date.now()
  }, [fix.sig])

  if (!item) return null

  const award = () => {
    const msLeft = Math.max(0, 15000 - (Date.now() - started.current))
    sfx.correct()
    onClear(pointsFor(0, msLeft))
  }

  const miss = () => {
    sfx.wrong()
    setPicked('miss')
  }

  return (
    <div className="card p-4">
      <button onClick={() => setOpen((value) => !value)} className="flex w-full cursor-pointer items-center gap-3 text-right">
        <span className="text-3xl">{item.topic.emoji}</span>
        <span className="min-w-0 flex-1">
          <span className="block font-extrabold">מתקנים אחת</span>
          <span className="block text-sm text-white/65">{item.topic.he}</span>
        </span>
      </button>
      {open && item.question.t === 'c' && (
        <div className="mt-4 space-y-3">
          <p dir="ltr" className="text-left text-xl font-bold">
            {item.question.q}
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {item.options.map((option) => (
              <button
                key={option}
                onClick={() => (option === item.correct ? award() : miss())}
                className="min-h-12 cursor-pointer rounded-2xl border-2 border-white/20 bg-white/10 px-3 py-3 text-lg font-bold"
              >
                {option}
              </button>
            ))}
          </div>
          {picked && <p className="font-bold text-emerald-200">התשובה: <span dir="ltr">{item.correct}</span>. עוד ניסיון, והיא יורדת.</p>}
        </div>
      )}
      {open && item.question.t === 'o' && (
        <div className="mt-4 space-y-3" dir="ltr">
          <div className="flex min-h-14 flex-wrap gap-2 rounded-2xl border-2 border-dashed border-white/30 p-3">
            {order.map((index) => (
              <button
                key={index}
                onClick={() => setOrder((list) => list.filter((at) => at !== index))}
                className="rounded-xl bg-amber-400 px-3 py-2 font-bold text-indigo-950"
              >
                {item.options[index]}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {item.options.map((word, index) =>
              order.includes(index) ? null : (
                <button
                  key={`${word}-${index}`}
                  onClick={() => setOrder((list) => [...list, index])}
                  className="min-h-11 rounded-xl border-2 border-white/25 bg-white/10 px-3 py-2 font-bold"
                >
                  {word}
                </button>
              ),
            )}
          </div>
          <button
            onClick={() => (order.map((index) => item.options[index]).join(' ') === item.correct ? award() : miss())}
            className="btn-primary w-full"
          >
            בדיקה
          </button>
          {picked && <p className="text-right font-bold text-emerald-200" dir="rtl">המשפט: <span dir="ltr">{item.correct}</span>. עוד ניסיון, והיא יורדת.</p>}
        </div>
      )}
    </div>
  )
}
