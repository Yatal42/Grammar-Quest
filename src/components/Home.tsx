import { useState } from 'react'
import { CURRICULUM_NOTE, GRADE_LABELS, GRADES, TOPICS } from '../data/topics'
import { BLITZ_SECONDS, levelFor, titleFor, type Mode } from '../lib/game'
import { WORD_SECONDS } from '../lib/vocabRound'
import type { Profile } from '../lib/storage'
import { dayDots, todayFor } from '../lib/today'
import { AVATARS } from './Onboarding'
import FixChip from './FixChip'
import Stars from './Stars'

type Props = {
  profile: Profile
  onStart: (mode: Mode, topicId?: string) => void
  onDictionary: () => void
  onWords: () => void
  onLearn: (topicId?: string) => void
  onUpdate: (p: Profile) => void
  onReset: () => void
}

export default function Home({ profile, onStart, onDictionary, onWords, onLearn, onUpdate, onReset }: Props) {
  const [showAll, setShowAll] = useState(false)
  const { level, progress, toNext } = levelFor(profile.xp)
  const grades = GRADES.filter((g) => showAll || g <= profile.grade)
  const totalStars = Object.values(profile.stars).reduce((a, b) => a + b, 0)
  const today = todayFor(profile)
  const todayTopic = today.kind === 'topic' ? TOPICS.find((topic) => topic.id === today.topicId) : undefined
  const dots = dayDots(profile.playedDays)
  const fix = profile.fixes?.[0]
  const openToday = () => {
    if (today.kind === 'words') onWords()
    else if (today.kind === 'topic' && todayTopic) onStart('topic', todayTopic.id)
    else onStart('blitz')
  }
  const todayTitle =
    today.kind === 'blitz'
      ? `בליץ ${BLITZ_SECONDS} שניות`
      : today.kind === 'words'
        ? 'משחק מילים'
        : (todayTopic?.he ?? 'נושא לחיזוק')
  const todayEmoji = today.kind === 'blitz' ? '⚡' : today.kind === 'words' ? '🏃' : (todayTopic?.emoji ?? '🎯')

  const cycleAvatar = () => {
    const i = AVATARS.indexOf(profile.avatar)
    onUpdate({ ...profile, avatar: AVATARS[(i + 1) % AVATARS.length] })
  }

  return (
    <div className="animate-pop space-y-6">
      <header className="card flex flex-wrap items-center gap-4 p-5">
        <button onClick={cycleAvatar} title="החלפת דמות" className="animate-float cursor-pointer text-6xl">
          {profile.avatar}
        </button>
        <div className="min-w-48 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3">
            <h1 className="text-2xl font-extrabold">היי {profile.name}!</h1>
            <span className="text-amber-300">
              רמה {level} · {titleFor(level)}
            </span>
          </div>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-gradient-to-l from-amber-300 to-orange-500 transition-all"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-white/60">
            {profile.xp.toLocaleString()} XP · עוד {toNext.toLocaleString()} לרמה הבאה
          </p>
        </div>
        <div className="flex gap-3 text-center">
          <Stat label="כוכבים" value={`⭐ ${totalStars}`} />
          <Stat label="שיא בליץ" value={`⚡ ${profile.blitzBest}`} />
          <Stat label="רצף שיא" value={`🔥 ${profile.bestStreak}`} />
        </div>
      </header>

      {fix && (
        <FixChip
          fix={fix}
          onClear={(points) =>
            onUpdate({
              ...profile,
              xp: profile.xp + points,
              fixes: (profile.fixes ?? []).filter((card) => card.sig !== fix.sig),
            })
          }
        />
      )}

      <button
        onClick={openToday}
        className="card w-full cursor-pointer p-4 text-right transition hover:-translate-y-1 hover:bg-white/15 sm:p-5"
      >
        <div className="flex items-center gap-3">
          <span className="text-4xl">{todayEmoji}</span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold text-amber-200">{today.done ? 'להיום, כבר סגור' : 'להיום'}</span>
            <span className="block text-xl font-extrabold sm:text-2xl">{todayTitle}</span>
          </span>
          <span className="flex gap-1.5">
            {dots.map((dot) => (
              <span key={dot.key} className={`h-3 w-3 rounded-full ${dot.filled ? 'bg-amber-300' : 'bg-white/20'}`} />
            ))}
          </span>
        </div>
        <p className="mt-2 text-sm text-white/70">
          {today.done ? 'היום סגור, מחר מחכה משהו חדש' : 'דבר אחד להיום. יום בלי משחק נשאר עיגול ריק.'}
        </p>
      </button>

      <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <button
          onClick={() => onStart('mix')}
          className="card group cursor-pointer p-4 text-right transition hover:-translate-y-1 hover:bg-white/15 sm:p-6"
        >
          <div className="text-4xl">🎲</div>
          <h2 className="mt-2 text-xl font-extrabold sm:text-2xl">אתגר מעורבב</h2>
          <p className="text-white/70">10 שאלות מכל הנושאים עד כיתה {GRADE_LABELS[profile.grade]}</p>
        </button>
        <button
          onClick={() => onStart('blitz')}
          className="card group cursor-pointer bg-gradient-to-br from-amber-500/30 to-rose-500/30 p-4 text-right transition hover:-translate-y-1 sm:p-6"
        >
          <div className="text-4xl">⚡</div>
          <h2 className="mt-2 text-xl font-extrabold sm:text-2xl">בליץ {BLITZ_SECONDS} שניות</h2>
          <p className="text-white/70">כמה תשובות נכונות תספיקו? שובר שיאים!</p>
        </button>
        <button
          onClick={onDictionary}
          className="card group cursor-pointer bg-gradient-to-br from-emerald-500/30 to-sky-500/30 p-4 text-right transition hover:-translate-y-1 sm:p-6"
        >
          <div className="text-4xl">📖</div>
          <h2 className="mt-2 text-xl font-extrabold sm:text-2xl">מילון מילים</h2>
          <p className="text-white/70">אוצר מילים לפי נושאים: משפחה, אוכל, ספורט ועוד</p>
        </button>
        <button
          onClick={() => onLearn()}
          className="card group cursor-pointer bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 p-4 text-right transition hover:-translate-y-1 sm:p-6"
        >
          <div className="text-4xl">📚</div>
          <h2 className="mt-2 text-xl font-extrabold sm:text-2xl">ספר החוקים</h2>
          <p className="text-white/70">כל חוקי הדקדוק: מה זה, מתי משתמשים ואיך בונים</p>
        </button>
        <button
          onClick={onWords}
          className="card group col-span-2 cursor-pointer bg-gradient-to-br from-sky-500/30 to-amber-400/25 p-4 text-right transition hover:-translate-y-1 sm:p-6 lg:col-span-4"
        >
          <div className="text-4xl">🏃</div>
          <h2 className="mt-2 text-xl font-extrabold sm:text-2xl">משחק מילים</h2>
          <p className="text-white/70">
            ריצה של {WORD_SECONDS} שניות: קופצים למשמעות, אוספים כוכבים, ומיד עוד סיבוב
          </p>
        </button>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">נושאים</h2>
          <button onClick={() => setShowAll((v) => !v)} className="btn-ghost py-2 text-sm">
            {showAll ? 'רק עד הכיתה שלי' : 'הצג את כל הכיתות'}
          </button>
        </div>
        {grades.map((g) => {
          const topics = TOPICS.filter((t) => t.grade === g)
          return (
          <div key={g}>
            <h3 className="mb-2 text-sm font-semibold text-white/60">כיתה {GRADE_LABELS[g]}</h3>
            {topics.length === 0 ? (
              <p className="text-sm text-white/50">עדיין אין נושאים בכיתה הזו</p>
            ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {topics.map((t) => (
                <div
                  key={t.id}
                  className="card relative transition hover:-translate-y-1 hover:bg-white/15"
                >
                  <button onClick={() => onStart('topic', t.id)} className="w-full cursor-pointer p-4 pt-12 text-right">
                    <div className="text-3xl">{t.emoji}</div>
                    <div className="mt-1 font-bold break-words" dir="ltr" style={{ textAlign: 'right' }}>
                      {t.title}
                    </div>
                    <div className="text-sm text-white/60">{t.he}</div>
                    <Stars value={profile.stars[t.id] ?? 0} className="mt-2 text-lg" />
                  </button>
                  <button
                    onClick={() => onLearn(t.id)}
                    className="absolute top-2 left-2 flex min-h-11 items-center rounded-full bg-white/10 px-3 text-sm text-white/80 hover:bg-white/25"
                  >
                    📖 למדו
                  </button>
                </div>
              ))}
            </div>
            )}
          </div>
          )
        })}
      </section>

      <footer className="flex flex-wrap items-center justify-center gap-3 pt-4 text-sm">
        <select
          value={profile.grade}
          onChange={(e) => {
            const grade = GRADES.find((g) => String(g) === e.target.value)
            if (grade) onUpdate({ ...profile, grade })
          }}
          className="btn-ghost py-2"
        >
          {GRADES.map((g) => (
            <option key={g} value={g} className="text-black">
              כיתה {GRADE_LABELS[g]}
            </option>
          ))}
        </select>
        <button onClick={() => onUpdate({ ...profile, sound: !profile.sound })} className="btn-ghost py-2">
          {profile.sound ? '🔊 צלילים' : '🔇 צלילים'}
        </button>
        <button
          onClick={() => confirm('למחוק את כל ההתקדמות ולהתחיל מחדש?') && onReset()}
          className="btn-ghost py-2 text-white/60"
        >
          איפוס
        </button>
      </footer>
      <p className="text-center text-xs text-white/40">{CURRICULUM_NOTE}</p>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/10 px-3 py-2">
      <div className="text-lg font-bold">{value}</div>
      <div className="text-xs text-white/60">{label}</div>
    </div>
  )
}
