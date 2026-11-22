import { useState } from 'react'
import { GRADE_LABELS, GRADES, type Grade } from '../data/topics'
import type { Profile } from '../lib/storage'

export const AVATARS = ['🦉', '🦊', '🐼', '🐯', '🐸', '🦄', '🐙', '🐲', '🤖', '👾', '🦁', '🐧']

export default function Onboarding({ onDone }: { onDone: (p: Profile) => void }) {
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState(AVATARS[0])
  const [grade, setGrade] = useState<Grade>(7)

  const submit = () =>
    onDone({ name: name.trim(), avatar, grade, xp: 0, stars: {}, blitzBest: 0, bestStreak: 0, sound: true })

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="card animate-pop w-full max-w-lg p-6 sm:p-8">
        <div className="text-center">
          <div className="animate-float text-7xl">{avatar}</div>
          <h1 className="mt-3 text-4xl font-extrabold" dir="ltr">
            Grammar <span className="text-amber-400">Quest</span>
          </h1>
          <p className="mt-2 text-white/70">הרפתקת הדקדוק באנגלית לכיתות ו' עד י"ב</p>
        </div>

        <label className="mt-8 block text-sm font-medium text-white/80">איך קוראים לך?</label>
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && name.trim() && submit()}
          maxLength={16}
          placeholder="השם שלך"
          className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-lg outline-none placeholder:text-white/40 focus:border-amber-400"
        />

        <p className="mt-6 text-sm font-medium text-white/80">בחרו דמות</p>
        <div className="mt-2 grid grid-cols-6 gap-2">
          {AVATARS.map((a) => (
            <button
              key={a}
              onClick={() => setAvatar(a)}
              className={`cursor-pointer rounded-2xl p-2 text-3xl transition ${a === avatar ? 'scale-110 bg-amber-400/30 ring-2 ring-amber-400' : 'bg-white/5 hover:bg-white/15'}`}
            >
              {a}
            </button>
          ))}
        </div>

        <p className="mt-6 text-sm font-medium text-white/80">באיזו כיתה את/ה?</p>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {GRADES.map((g) => (
            <button
              key={g}
              onClick={() => setGrade(g)}
              className={`btn !px-2 ${g === grade ? 'bg-amber-400 text-indigo-950' : 'bg-white/10 hover:bg-white/20'}`}
            >
              {GRADE_LABELS[g]}
            </button>
          ))}
        </div>

        <button disabled={!name.trim()} onClick={submit} className="btn-primary mt-8 w-full text-lg">
          יאללה, מתחילים! 🚀
        </button>
      </div>
    </div>
  )
}
