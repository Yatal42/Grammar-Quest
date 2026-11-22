import { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { levelFor, titleFor, type Mode } from '../lib/game'
import type { Profile } from '../lib/storage'
import { sfx } from '../lib/sound'
import type { GameResult } from './Game'
import Stars from './Stars'

type Props = {
  mode: Mode
  result: GameResult
  prev: Profile
  profile: Profile
  onAgain: () => void
  onHome: () => void
}

export default function Results({ mode, result, prev, profile, onAgain, onHome }: Props) {
  const levelUp = levelFor(profile.xp).level > levelFor(prev.xp).level
  const newBlitzRecord = mode === 'blitz' && result.score > prev.blitzBest && result.score > 0
  const great = result.stars >= 2 || levelUp || newBlitzRecord
  const pct = result.total ? Math.round((result.correct / result.total) * 100) : 0

  useEffect(() => {
    if (!great) return
    sfx.win()
    const end = Date.now() + 1200
    const frame = () => {
      confetti({ particleCount: 6, angle: 60, spread: 70, origin: { x: 0 } })
      confetti({ particleCount: 6, angle: 120, spread: 70, origin: { x: 1 } })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }, [great])

  const headline =
    result.stars === 3 ? 'מושלם! 🏆' : result.stars === 2 ? 'עבודה מצוינת! 🌟' : result.stars === 1 ? 'יפה מאוד! 👍' : 'ממשיכים להתאמן! 💪'

  return (
    <div className="animate-pop mx-auto max-w-2xl space-y-5">
      <div className="card p-8 text-center">
        <div className="animate-float text-7xl">{profile.avatar}</div>
        <h1 className="mt-3 text-3xl font-extrabold">{mode === 'blitz' ? 'נגמר הזמן! ⏱' : headline}</h1>
        {mode !== 'blitz' && <Stars value={result.stars} className="mt-3 justify-center text-4xl" />}

        <div className="mt-6 grid grid-cols-3 gap-3">
          <Box label="נקודות" value={result.score.toLocaleString()} />
          <Box label="נכונות" value={`${result.correct}/${result.total}`} sub={`${pct}%`} />
          <Box label="רצף שיא" value={`🔥 ${result.bestStreak}`} />
        </div>

        <div className="mt-5 space-y-2">
          {newBlitzRecord && (
            <div className="rounded-2xl bg-amber-400/20 p-3 font-bold text-amber-200">⚡ שיא בליץ חדש!</div>
          )}
          {levelUp && (
            <div className="rounded-2xl bg-emerald-400/20 p-3 font-bold text-emerald-200">
              🎖️ עלית לרמה {levelFor(profile.xp).level} - {titleFor(levelFor(profile.xp).level)}!
            </div>
          )}
          <div className="text-white/70" dir="ltr">
            +{result.score.toLocaleString()} XP
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button onClick={onHome} className="btn-ghost flex-1">
            🏠 לתפריט
          </button>
          <button onClick={onAgain} className="btn-primary flex-1">
            🔁 עוד סיבוב
          </button>
        </div>
      </div>

      {result.mistakes.length > 0 && (
        <div className="card p-6">
          <h2 className="mb-4 text-xl font-bold">📚 בואו נלמד מהטעויות</h2>
          <ul className="space-y-3">
            {result.mistakes.map(({ item, given }, i) => (
              <li key={i} className="rounded-2xl bg-black/20 p-4">
                {item.question.t === 'c' && (
                  <p dir="ltr" className="text-left text-lg">
                    {item.question.q}
                  </p>
                )}
                <p dir="ltr" className="mt-1 text-left">
                  <span className="text-rose-300 line-through">{given}</span>
                  <span className="mx-2 text-white/40">→</span>
                  <span className="font-bold text-emerald-300">{item.correct}</span>
                </p>
                <p className="mt-2 text-sm text-white/70">{item.question.e}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function Box({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-3">
      <div className="text-2xl font-extrabold">{value}</div>
      <div className="text-xs text-white/60">
        {label}
        {sub && ` · ${sub}`}
      </div>
    </div>
  )
}
