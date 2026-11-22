import { useEffect, type ReactNode } from 'react'
import { GRADE_LABELS, TOPICS, type Grade, type Topic } from '../data/topics'
import { LESSONS, type LessonTable } from '../data/lessons'

type Props = {
  topic: Topic
  grade: Grade
  onPractice: () => void
  onBack: () => void
  onOpen: (topicId: string) => void
}

const LATIN = /((?:['’][A-Za-z]|[A-Za-z])[A-Za-z0-9'’\-/.…!?,:=+() ]*[A-Za-z0-9'’!?…])/g
const HEBREW = /[\u0590-\u05FF]/

export function Rich({ text, className = 'font-semibold text-amber-200' }: { text: string; className?: string }) {
  return (
    <>
      {text.split(LATIN).map((p, i) =>
        i % 2 ? (
          <span key={i} dir="ltr" className={className}>
            {p}
          </span>
        ) : (
          p
        ),
      )}
    </>
  )
}

function speak(text: string) {
  if (!('speechSynthesis' in window)) return
  speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'en-US'
  u.rate = 0.9
  speechSynthesis.speak(u)
}

function SpeakButton({ text }: { text: string }) {
  return (
    <button
      onClick={() => speak(text)}
      title="השמעה"
      className="shrink-0 cursor-pointer rounded-full bg-white/10 px-2 py-1 text-base transition hover:bg-white/25 active:scale-90"
    >
      🔊
    </button>
  )
}

function English({ text, className = '' }: { text: string; className?: string }) {
  return (
    <div dir="ltr" className={`flex items-center gap-2 text-left ${className}`}>
      <span className="font-semibold">{text}</span>
      <SpeakButton text={text} />
    </div>
  )
}

function Section({ icon, title, children }: { icon: string; title: string; children: ReactNode }) {
  return (
    <section className="card p-5 sm:p-6">
      <h2 className="mb-4 text-xl font-extrabold">
        {icon} {title}
      </h2>
      {children}
    </section>
  )
}

function chipClass(part: string) {
  if (part === '?') return 'bg-white/15 text-white'
  if (/not|n't/.test(part)) return 'bg-rose-400/25 text-rose-100 border-rose-300/40'
  if (/^(נושא|אדם|דבר|מקום|מבצע)$/.test(part)) return 'bg-sky-400/25 text-sky-100 border-sky-300/40'
  if (/^(V|פועל|תואר|שם עצם)/.test(part)) return 'bg-emerald-400/25 text-emerald-100 border-emerald-300/40'
  if (!/[A-Za-z]/.test(part)) return 'bg-violet-400/25 text-violet-100 border-violet-300/40'
  return 'bg-amber-400/25 text-amber-100 border-amber-300/40'
}

const LEGEND = [
  { label: 'נושא', cls: chipClass('נושא') },
  { label: 'מילת עזר', cls: chipClass('am') },
  { label: 'פועל', cls: chipClass('V1') },
  { label: 'שלילה', cls: chipClass('not') },
]

function Table({ table }: { table: LessonTable }) {
  return (
    <div className="space-y-2">
      {table.title && <h3 className="font-bold text-white/80">{table.title}</h3>}
      <div className="overflow-x-auto rounded-2xl border border-white/15">
        <table className="w-full text-right text-sm sm:text-base">
          <thead className="bg-white/10">
            <tr>
              {table.head.map((h, i) => (
                <th key={i} className="px-3 py-2 font-bold">
                  <Rich text={h} className="text-amber-200" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, r) => (
              <tr key={r} className="border-t border-white/10 odd:bg-white/5">
                {row.map((cell, c) => (
                  <td key={c} className={`px-3 py-2 ${c === 0 ? 'font-semibold' : ''}`}>
                    {HEBREW.test(cell) ? <Rich text={cell} className="" /> : <span dir="ltr">{cell}</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function Lesson({ topic, grade, onPractice, onBack, onOpen }: Props) {
  const lesson = LESSONS[topic.id]
  const visible = TOPICS.filter((t) => t.grade <= Math.max(grade, topic.grade))
  const idx = visible.findIndex((t) => t.id === topic.id)
  const prev = visible[idx - 1]
  const next = visible[idx + 1]

  useEffect(() => {
    window.scrollTo({ top: 0 })
    return () => {
      if ('speechSynthesis' in window) speechSynthesis.cancel()
    }
  }, [topic.id])

  return (
    <div key={topic.id} className="animate-pop mx-auto max-w-3xl space-y-5">
      <div className="flex items-center justify-between gap-3">
        <button onClick={onBack} className="btn-ghost py-2 text-sm">
          → חזרה
        </button>
        <button onClick={onPractice} className="btn-primary py-2 text-sm">
          לתרגל את הנושא 🎮
        </button>
      </div>

      <header className="card p-6">
        <div className="flex items-center gap-4">
          <div className="animate-float text-6xl">{topic.emoji}</div>
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-extrabold" dir="ltr" style={{ textAlign: 'right' }}>
              {topic.title}
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-white/70">
              <span>{topic.he}</span>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">כיתה {GRADE_LABELS[topic.grade]}</span>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h2 className="mb-2 text-lg font-extrabold">🤔 מה זה?</h2>
          <p className="text-lg leading-relaxed text-white/90">
            <Rich text={lesson?.what ?? topic.tip} />
          </p>
        </div>
      </header>

      {!lesson && (
        <div className="card p-5 text-white/70">הדף המלא לנושא הזה בדרך. בינתיים, הטיפ למעלה מסכם את העיקר!</div>
      )}

      {lesson && (
        <>
          <Section icon="🎯" title="מתי משתמשים?">
            <div className="grid gap-3 sm:grid-cols-2">
              {lesson.uses.map((u, i) => (
                <div key={i} className="rounded-2xl bg-white/5 p-4">
                  <div className="font-bold text-amber-300">
                    <Rich text={u.use} className="text-amber-200" />
                  </div>
                  <English text={u.en} className="mt-2 text-lg" />
                  <div className="mt-1 text-sm text-white/60">{u.he}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section icon="🛠️" title="איך בונים?">
            <div className="space-y-4">
              {lesson.build.map((f, i) => (
                <div key={i} className="rounded-2xl bg-white/5 p-4">
                  <div className="mb-2 text-sm font-bold text-white/70">
                    <Rich text={f.label} />
                  </div>
                  <div dir="ltr" className="flex flex-wrap items-center gap-1.5">
                    {f.parts.map((p, j) => (
                      <span key={j} className="contents">
                        {j > 0 && <span className="text-white/40">+</span>}
                        <span className={`rounded-xl border px-3 py-1 font-bold ${chipClass(p)}`}>{p}</span>
                      </span>
                    ))}
                  </div>
                  <English text={f.ex} className="mt-3 text-white/90" />
                </div>
              ))}
              <div className="flex flex-wrap gap-2 text-xs">
                {LEGEND.map((l) => (
                  <span key={l.label} className={`rounded-lg border px-2 py-0.5 ${l.cls}`}>
                    {l.label}
                  </span>
                ))}
              </div>
              {lesson.tables?.map((t, i) => <Table key={i} table={t} />)}
            </div>
          </Section>

          {lesson.signals && (
            <Section icon="🚦" title={lesson.signalsTitle ?? 'מילים מסמנות'}>
              <div dir="ltr" className="flex flex-wrap gap-2">
                {lesson.signals.map((s) => (
                  <span key={s} className="rounded-full bg-fuchsia-400/25 px-3 py-1 font-semibold text-fuchsia-100">
                    {s}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {lesson.spelling && (
            <Section icon="✏️" title="כללי כתיב">
              <ul className="space-y-3">
                {lesson.spelling.map((s, i) => (
                  <li key={i} className="rounded-2xl bg-white/5 p-3">
                    <div className="font-semibold">
                      <Rich text={s.rule} />
                    </div>
                    <div dir="ltr" className="mt-1 text-left text-emerald-200">
                      {s.ex}
                    </div>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          <Section icon="⚠️" title="טעויות נפוצות">
            <div className="space-y-3">
              {lesson.mistakes.map((m, i) => (
                <div key={i} className="rounded-2xl bg-white/5 p-4">
                  <div dir="ltr" className="flex items-center gap-2 text-left text-rose-200">
                    <span>❌</span>
                    <span className="line-through decoration-rose-400/70">{m.bad}</span>
                  </div>
                  <div dir="ltr" className="mt-1 flex items-center gap-2 text-left font-semibold text-emerald-200">
                    <span>✅</span>
                    <span>{m.good}</span>
                    <SpeakButton text={m.good} />
                  </div>
                  <div className="mt-2 text-sm text-white/70">
                    <Rich text={m.why} />
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <div className="card border-amber-300/40 bg-amber-300/15 p-5 text-lg text-amber-50">
            <div className="mb-1 font-extrabold text-amber-300">⭐ לזכור!</div>
            <Rich text={lesson.remember} />
          </div>
        </>
      )}

      <div className="space-y-3 pt-2">
        <button onClick={onPractice} className="btn-primary w-full text-lg">
          לתרגל את הנושא 🎮
        </button>
        <div className="flex gap-3">
          {prev && (
            <button onClick={() => onOpen(prev.id)} className="btn-ghost flex-1 py-2 text-sm">
              → {prev.he}
            </button>
          )}
          {next && (
            <button onClick={() => onOpen(next.id)} className="btn-ghost flex-1 py-2 text-sm">
              {next.he} ←
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
