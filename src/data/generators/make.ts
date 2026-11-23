import type { Question } from '../topics'

const HEBREW = /^[\u0590-\u05FF]/
const AUX = new Set([
  'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'do', 'does', 'did', "don't", "doesn't", "didn't",
  'have', 'has', 'had', "haven't", "hasn't", "hadn't",
  'will', "won't", 'would', "wouldn't",
  'can', "can't", 'could', "couldn't",
  'should', "shouldn't", 'shall',
  'may', 'might', 'must', "mustn't",
  "isn't", "aren't", "wasn't", "weren't",
])
const EDGE = new Set([
  'today', 'tonight', 'tomorrow', 'yesterday', 'now', 'always', 'usually', 'often',
  'sometimes', 'soon', 'later', 'here', 'there', 'outside', 'home', 'daily',
])
const SWAP = new Set(['and', 'or', 'but', 'because', 'if', 'when', 'before', 'after', 'while', 'although'])

export function choice(q: string, correct: string, wrongs: string[], e: string): Question {
  const o = [correct, ...wrongs]
  if (o.length !== 4) throw new Error(`options ${o.length}: ${q}`)
  if (new Set(o).size !== 4) throw new Error(`dup [${o.join(' | ')}] :: ${q}`)
  if (o.some((part) => part !== part.trim() || part.length === 0)) throw new Error(`blank option: ${q}`)
  const blanks = q.split('___').length - 1
  if (blanks < 1) throw new Error(`no blank: ${q}`)
  if (correct.split(' / ').length !== blanks) throw new Error(`blanks ${blanks} :: ${q} :: ${correct}`)
  if (!HEBREW.test(e)) throw new Error(`explanation: ${e}`)
  return { t: 'c', q, o, e }
}

export function order(a: string, e: string): Question {
  const tokens = a.split(' ')
  if (tokens.length < 3 || tokens.length > 8) throw new Error(`order length: ${a}`)
  if (new Set(tokens).size !== tokens.length) throw new Error(`order dup: ${a}`)
  if (tokens.some((token) => !/^[A-Za-z'’]+$/.test(token))) throw new Error(`order token: ${a}`)
  const low = tokens.map((token) => token.toLowerCase())
  if (low.some((word) => AUX.has(word))) throw new Error(`order aux: ${a}`)
  if (EDGE.has(low[0]) || EDGE.has(low[low.length - 1])) throw new Error(`order edge: ${a}`)
  if (low.some((word) => SWAP.has(word))) throw new Error(`order swap: ${a}`)
  if (!HEBREW.test(e)) throw new Error(`explanation: ${e}`)
  return { t: 'o', a, e }
}

export function take<A, B>(
  as: readonly A[],
  bs: readonly B[],
  n: number,
  fn: (a: A, b: B) => Question,
): Question[] {
  const out: Question[] = []
  for (const a of as) {
    for (const b of bs) {
      out.push(fn(a, b))
      if (out.length >= n) return out
    }
  }
  return out
}

export function wrong3(correct: string, pool: readonly string[]): [string, string, string] {
  const bad: string[] = []
  for (const item of pool) {
    if (item !== correct && !bad.includes(item)) bad.push(item)
  }
  if (bad.length < 3) throw new Error(`need wrongs for ${correct}`)
  return [bad[0], bad[1], bad[2]]
}

export function pack(id: string, items: Question[]): Question[] {
  const seen = new Set<string>()
  const out: Question[] = []
  for (const item of items) {
    const sig = item.t === 'c' ? `c|${item.q}|${item.o[0]}` : `o|${item.a}`
    if (seen.has(sig)) continue
    seen.add(sig)
    out.push(item)
  }
  if (out.length < 40) throw new Error(`${id} has ${out.length} items`)
  return out
}
