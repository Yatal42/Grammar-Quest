import { useEffect } from 'react'
import { GRADE_LABELS, TOPICS, type Grade } from '../data/topics'
import { LESSONS } from '../data/lessons'

type Props = {
  grade: Grade
  onOpen: (topicId: string) => void
  onBack: () => void
}

export default function Lessons({ grade, onOpen, onBack }: Props) {
  const grades = (Object.keys(GRADE_LABELS).map(Number) as Grade[]).filter((g) => TOPICS.some((t) => t.grade === g))

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <div className="animate-pop space-y-6">
      <div>
        <button onClick={onBack} className="btn-ghost py-2 text-sm">
          → חזרה
        </button>
      </div>

      <header className="card flex items-center gap-4 p-6">
        <div className="animate-float text-6xl">📚</div>
        <div>
          <h1 className="text-3xl font-extrabold">ספר החוקים</h1>
          <p className="mt-1 text-white/70">כל חוקי הדקדוק במקום אחד: מה זה, מתי משתמשים, איך בונים ואיפה כולם טועים.</p>
        </div>
      </header>

      {grades.map((g) => (
        <section key={g}>
          <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold text-white/60">
            כיתה {GRADE_LABELS[g]}
            {g === grade && <span className="rounded-full bg-amber-300/20 px-2 py-0.5 text-xs text-amber-200">הכיתה שלך</span>}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TOPICS.filter((t) => t.grade === g).map((t) => (
              <button
                key={t.id}
                onClick={() => onOpen(t.id)}
                className="card flex cursor-pointer items-center gap-3 p-4 text-right transition hover:-translate-y-1 hover:bg-white/15"
              >
                <div className="text-3xl">{t.emoji}</div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold" dir="ltr" style={{ textAlign: 'right' }}>
                    {t.title}
                  </div>
                  <div className="text-sm text-white/60">{t.he}</div>
                </div>
                <div className="text-sm text-white/40">{LESSONS[t.id] ? '📖' : '💡'}</div>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
