import { useDeferredValue, useMemo, useState } from 'react'
import { VOCABULARY, wordKey, type VocabCategory, type Word } from '../data/vocabulary'
import { shuffle } from '../lib/game'
import { sfx } from '../lib/sound'
import type { Profile } from '../lib/storage'

type Props = {
  profile: Profile
  onUpdate: (p: Profile) => void
  onBack: () => void
}

const PRACTICE_SIZE = 10
const RESULTS_PAGE = 60

const normalize = (s: string) => s.toLowerCase().trim()

const INDEX = VOCABULARY.flatMap((c) =>
  c.words.map((w) => ({ c, w, key: wordKey(c.id, w), en: normalize(w.en), he: w.he })),
)
const ALL_KEYS = new Set(INDEX.map((e) => e.key))
const TOTAL_WORDS = INDEX.length

function searchWords(q: string) {
  const rank = (e: (typeof INDEX)[number]) =>
    e.en === q || e.he === q ? 0 : e.en.startsWith(q) || e.he.startsWith(q) ? 1 : 2
  return INDEX.filter((e) => e.en.includes(q) || e.he.includes(q)).sort((a, b) => rank(a) - rank(b))
}

function speak(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  const synth = window.speechSynthesis
  synth.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'en-US'
  u.rate = 0.9
  const voices = synth.getVoices()
  const voice = voices.find((v) => v.lang === 'en-US') ?? voices.find((v) => v.lang.startsWith('en'))
  if (voice) u.voice = voice
  synth.speak(u)
}

export default function Dictionary({ profile, onUpdate, onBack }: Props) {
  const [catId, setCatId] = useState<string | null>(null)
  const [practice, setPractice] = useState(0)
  const [query, setQuery] = useState('')
  const [shown, setShown] = useState(RESULTS_PAGE)
  const learned = useMemo(() => new Set((profile.learned ?? []).filter((k) => ALL_KEYS.has(k))), [profile.learned])
  const category = VOCABULARY.find((c) => c.id === catId) ?? null
  const q = normalize(useDeferredValue(query))

  const results = useMemo(() => (q ? searchWords(q) : []), [q])

  const changeQuery = (value: string) => {
    setQuery(value)
    setShown(RESULTS_PAGE)
  }

  const setLearned = (key: string, value: boolean) => {
    if (learned.has(key) === value) return
    const next = value ? [...learned, key] : [...learned].filter((k) => k !== key)
    onUpdate({ ...profile, learned: next })
  }

  const back = () => {
    if (query) changeQuery('')
    else if (practice) setPractice(0)
    else if (category) setCatId(null)
    else onBack()
  }

  const open = (id: string) => {
    sfx.click()
    setCatId(id)
    setPractice(0)
  }

  return (
    <div className="animate-pop space-y-6">
      <header className="card flex flex-wrap items-center gap-3 p-4">
        <button onClick={back} className="btn-ghost px-4 py-2" title="חזרה">
          → חזרה
        </button>
        <div className="min-w-40 flex-1">
          <h1 className="text-2xl font-extrabold">
            📖 מילון מילים
            {category && !q && (
              <span className="mr-2 text-lg font-bold text-amber-300">
                · {category.emoji} {category.he}
              </span>
            )}
          </h1>
          <p className="text-xs text-white/60">
            נלמדו {learned.size} מתוך {TOTAL_WORDS} מילים
          </p>
        </div>
        <input
          value={query}
          onChange={(e) => changeQuery(e.target.value)}
          placeholder="🔍 חיפוש באנגלית או בעברית…"
          className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-white placeholder:text-white/40 focus:border-amber-300 focus:outline-none sm:w-72"
        />
      </header>

      {q ? (
        <section className="space-y-3">
          <h2 className="text-lg font-bold">
            {results.length ? `נמצאו ${results.length} מילים` : 'לא נמצאו מילים 🤔'}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {results.slice(0, shown).map(({ c, w, key }) => (
              <WordCard
                key={key}
                word={w}
                tag={`${c.emoji} ${c.he}`}
                learned={learned.has(key)}
                onToggle={(v) => setLearned(key, v)}
              />
            ))}
          </div>
          {results.length > shown && (
            <button onClick={() => setShown((n) => n + RESULTS_PAGE)} className="btn-ghost w-full">
              הצגת עוד מילים ({results.length - shown} נוספות)
            </button>
          )}
        </section>
      ) : category && practice ? (
        <Practice
          key={practice}
          category={category}
          onCorrect={(w) => setLearned(wordKey(category.id, w), true)}
          onAgain={() => setPractice((n) => n + 1)}
          onDone={() => setPractice(0)}
        />
      ) : category ? (
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold" dir="ltr" style={{ textAlign: 'right' }}>
                {category.title}
              </h2>
              <p className="text-sm text-white/60">
                {category.words.length} מילים · נלמדו {category.words.filter((w) => learned.has(wordKey(category.id, w))).length}
              </p>
            </div>
            <button onClick={() => setPractice(1)} className="btn-primary">
              🎯 תרגול מילים
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {category.words.map((w) => (
              <WordCard
                key={w.en}
                word={w}
                learned={learned.has(wordKey(category.id, w))}
                onToggle={(v) => setLearned(wordKey(category.id, w), v)}
              />
            ))}
          </div>
        </section>
      ) : (
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {VOCABULARY.map((c) => {
            const done = c.words.filter((w) => learned.has(wordKey(c.id, w))).length
            return (
              <button
                key={c.id}
                onClick={() => open(c.id)}
                className="card flex cursor-pointer flex-col p-4 text-right transition hover:-translate-y-1 hover:bg-white/15"
              >
                <div className="text-4xl">{c.emoji}</div>
                <div className="mt-1 leading-tight font-bold break-words" dir="ltr" style={{ textAlign: 'right' }}>
                  {c.title}
                </div>
                <div className="text-sm leading-tight text-white/60">{c.he}</div>
                <div className="mt-auto pt-2">
                  <div className="h-2 overflow-hidden rounded-full bg-white/15">
                    <div
                      className="h-full rounded-full bg-gradient-to-l from-emerald-300 to-teal-500 transition-all"
                      style={{ width: `${(done / c.words.length) * 100}%` }}
                    />
                  </div>
                  <div className="mt-1 text-xs text-white/50">
                    {done}/{c.words.length} מילים
                  </div>
                </div>
              </button>
            )
          })}
        </section>
      )}
    </div>
  )
}

function SpeakButton({ text, className = '' }: { text: string; className?: string }) {
  return (
    <button
      onClick={() => speak(text)}
      title="השמעה"
      className={`flex shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 active:scale-90 ${className}`}
    >
      🔊
    </button>
  )
}

type WordCardProps = {
  word: Word
  tag?: string
  learned: boolean
  onToggle: (v: boolean) => void
}

function WordCard({ word, tag, learned, onToggle }: WordCardProps) {
  return (
    <div className={`card flex items-start gap-3 p-4 ${learned ? 'ring-2 ring-emerald-400/50' : ''}`}>
      <SpeakButton text={word.en} className="h-11 w-11 text-xl" />
      <div className="min-w-0 flex-1">
        <div dir="ltr" className="text-right text-2xl font-extrabold break-words">
          {word.en}
        </div>
        <div className="font-semibold text-amber-200">{word.he}</div>
        {word.example && (
          <div dir="ltr" className="mt-1 text-right text-sm text-white/60 italic">
            {word.example}
          </div>
        )}
        {tag && <div className="mt-2 inline-block rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/70">{tag}</div>}
      </div>
      <button
        onClick={() => onToggle(!learned)}
        title={learned ? 'ביטול סימון' : 'סימון כמילה שלמדתי'}
        className={`flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 font-bold transition ${learned ? 'border-emerald-300 bg-emerald-400 text-emerald-950' : 'border-white/25 text-white/30 hover:border-white/50 hover:text-white/60'}`}
      >
        ✓
      </button>
    </div>
  )
}

type Question = { word: Word; options: string[] }

function buildPractice(category: VocabCategory): Question[] {
  const meanings = [...new Set(category.words.map((w) => w.he))]
  return shuffle(category.words)
    .slice(0, PRACTICE_SIZE)
    .map((word) => ({
      word,
      options: shuffle([word.he, ...shuffle(meanings.filter((m) => m !== word.he)).slice(0, 3)]),
    }))
}

type PracticeProps = {
  category: VocabCategory
  onCorrect: (w: Word) => void
  onAgain: () => void
  onDone: () => void
}

function Practice({ category, onCorrect, onAgain, onDone }: PracticeProps) {
  const [questions] = useState(() => buildPractice(category))
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const item = questions[idx]

  const answer = (option: string) => {
    if (picked) return
    setPicked(option)
    if (option === item.word.he) {
      sfx.correct()
      setScore((s) => s + 1)
      onCorrect(item.word)
    } else {
      sfx.wrong()
    }
  }

  const next = () => {
    if (idx + 1 >= questions.length) {
      setFinished(true)
      if (score / questions.length >= 0.7) sfx.win()
      return
    }
    setIdx((i) => i + 1)
    setPicked(null)
  }

  if (finished) {
    const ratio = score / questions.length
    return (
      <div className="animate-pop card mx-auto max-w-xl space-y-4 p-8 text-center">
        <div className="animate-float text-6xl">{ratio >= 0.9 ? '🏆' : ratio >= 0.7 ? '🎉' : ratio >= 0.5 ? '👍' : '💪'}</div>
        <h2 className="text-3xl font-extrabold">
          {score}/{questions.length}
        </h2>
        <p className="text-white/70">
          {ratio >= 0.9 ? 'מושלם! המילים האלה כבר בכיס 😎' : ratio >= 0.5 ? 'יפה מאוד! עוד קצת תרגול ומגיעים לשלמות' : 'לא נורא, ככה לומדים! נסו שוב'}
        </p>
        <div className="flex gap-3">
          <button onClick={onDone} className="btn-ghost flex-1">
            לרשימת המילים
          </button>
          <button onClick={onAgain} className="btn-primary flex-1">
            שוב! ↺
          </button>
        </div>
      </div>
    )
  }

  const ok = picked === item.word.he

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="flex items-center gap-3">
        <div className="h-4 flex-1 overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-gradient-to-l from-emerald-300 to-teal-500 transition-all"
            style={{ width: `${((idx + (picked ? 1 : 0)) / questions.length) * 100}%` }}
          />
        </div>
        <div className="min-w-16 text-center font-bold tabular-nums">
          {idx + 1}/{questions.length}
        </div>
      </div>

      <div
        key={idx}
        className={`card space-y-6 p-6 sm:p-8 ${picked ? (ok ? 'ring-4 ring-emerald-400/70' : 'animate-shake ring-4 ring-rose-400/70') : 'animate-pop'}`}
      >
        <p className="text-sm text-white/60">מה הפירוש בעברית?</p>
        <div className="flex items-center justify-center gap-4">
          <div dir="ltr" className="text-4xl font-extrabold sm:text-5xl">
            {item.word.en}
          </div>
          <SpeakButton text={item.word.en} className="h-12 w-12 text-2xl" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {item.options.map((o) => {
            const isCorrect = o === item.word.he
            const style = !picked
              ? 'bg-white/10 hover:bg-white/20 hover:-translate-y-0.5 border-white/20'
              : isCorrect
                ? 'bg-emerald-500/80 border-emerald-300'
                : picked === o
                  ? 'bg-rose-500/80 border-rose-300'
                  : 'bg-white/5 border-white/10 opacity-50'
            return (
              <button
                key={o}
                disabled={!!picked}
                onClick={() => answer(o)}
                className={`cursor-pointer rounded-2xl border-2 px-4 py-4 text-xl font-semibold transition disabled:cursor-default ${style}`}
              >
                {o}
              </button>
            )
          })}
        </div>
      </div>

      {picked && (
        <div className="animate-pop card space-y-4 p-5">
          <div className={`text-lg font-bold ${ok ? 'text-emerald-300' : 'text-rose-300'}`}>
            {ok ? 'בול! 🎉' : 'לא נורא, ככה לומדים! 💡'}
          </div>
          {item.word.example && (
            <div dir="ltr" className="text-right text-white/80 italic">
              {item.word.example}
            </div>
          )}
          <button autoFocus onClick={next} className="btn-primary w-full text-lg">
            {idx + 1 >= questions.length ? 'לתוצאות 🏁' : 'הבא ←'}
          </button>
        </div>
      )}
    </div>
  )
}
