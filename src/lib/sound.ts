let ctx: AudioContext | null = null
let enabled = true

export function setSoundEnabled(v: boolean) {
  enabled = v
}

function tone(freq: number, start: number, duration: number, type: OscillatorType = 'sine', gain = 0.15) {
  if (!enabled) return
  ctx ??= new AudioContext()
  const t0 = ctx.currentTime + start
  const osc = ctx.createOscillator()
  const g = ctx.createGain()
  osc.type = type
  osc.frequency.value = freq
  g.gain.setValueAtTime(gain, t0)
  g.gain.exponentialRampToValueAtTime(0.001, t0 + duration)
  osc.connect(g).connect(ctx.destination)
  osc.start(t0)
  osc.stop(t0 + duration)
}

export const sfx = {
  correct() {
    tone(660, 0, 0.12, 'triangle')
    tone(990, 0.1, 0.18, 'triangle')
  },
  wrong() {
    tone(220, 0, 0.25, 'sawtooth', 0.08)
  },
  click() {
    tone(500, 0, 0.05, 'square', 0.04)
  },
  win() {
    ;[523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.12, 0.25, 'triangle'))
  },
}
