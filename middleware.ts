import { next } from '@vercel/functions'

export const config = {
  matcher: ['/', '/grammar', '/grammar/:path*', '/grammer', '/grammer/:path*'],
}

const COOKIE_NAME = 'gq_access'
const COOKIE_MAX_AGE = 90 * 24 * 60 * 60
const BASE = '/grammar'
const LEGACY = '/grammer'
const FAIL_DELAY_MS = 800

const encoder = new TextEncoder()

async function hmacHex(key: string, message: string): Promise<string> {
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(key),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(message))
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, '0')).join('')
}

async function safeEqual(a: string, b: string): Promise<boolean> {
  const key = crypto.getRandomValues(new Uint8Array(32)).join(',')
  const [ha, hb] = await Promise.all([hmacHex(key, a), hmacHex(key, b)])
  let diff = 0
  for (let i = 0; i < ha.length; i++) diff |= ha.charCodeAt(i) ^ hb.charCodeAt(i)
  return diff === 0
}

function getSettings() {
  const code = process.env.ACCESS_CODE?.trim()
  if (!code) return null
  const secret = process.env.ACCESS_SECRET?.trim() || `gq-derived:${code}`
  return { code, secret }
}

function expectedToken(code: string, secret: string): Promise<string> {
  return hmacHex(secret, code)
}

function readCookie(request: Request, name: string): string | null {
  const header = request.headers.get('cookie')
  if (!header) return null
  for (const part of header.split(';')) {
    const idx = part.indexOf('=')
    if (idx === -1) continue
    if (part.slice(0, idx).trim() === name) return decodeURIComponent(part.slice(idx + 1).trim())
  }
  return null
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function gatePage(message: string | null, configured: boolean, status: number): Response {
  const form = configured
    ? `<form method="post" action="${BASE}/unlock" autocomplete="off">
        <label for="code">הקלידו את קוד הכניסה שקיבלתם מהמורה</label>
        <input id="code" name="code" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="12" autocomplete="off" required autofocus placeholder="••••" />
        <button type="submit">כניסה למשחק</button>
      </form>`
    : ''
  const note = message ? `<p class="msg" role="alert">${message}</p>` : ''
  const html = `<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="noindex, nofollow" />
<title>Grammar Quest</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🦉</text></svg>" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700;800&display=swap" rel="stylesheet" />
<style>
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;font-family:"Rubik",system-ui,sans-serif;color:#1e1b4b;background:linear-gradient(135deg,#1e1b4b 0%,#4c1d95 50%,#701a75 100%)}
.card{width:100%;max-width:400px;background:#fff;border-radius:28px;padding:36px 28px;text-align:center;box-shadow:0 25px 50px -12px rgba(0,0,0,.5)}
.owl{font-size:64px;line-height:1}
h1{margin:12px 0 4px;font-size:32px;font-weight:800;direction:ltr}
h1 span{color:#f59e0b}
.sub{margin:0 0 24px;color:#6b7280}
label{display:block;margin-bottom:10px;font-weight:500}
input{width:100%;padding:14px;border:2px solid #ddd6fe;border-radius:16px;font:inherit;font-size:28px;letter-spacing:.4em;text-align:center;direction:ltr;outline:none}
input:focus{border-color:#f59e0b}
button{margin-top:16px;width:100%;padding:14px;border:0;border-radius:16px;font:inherit;font-size:18px;font-weight:700;color:#1e1b4b;cursor:pointer;background:linear-gradient(to left,#fbbf24,#f97316);box-shadow:0 10px 15px -3px rgba(249,115,22,.3)}
button:hover{filter:brightness(1.1)}
.msg{margin:0 0 16px;padding:10px;border-radius:12px;background:#ffe4e6;color:#be123c;font-weight:500}
</style>
</head>
<body>
<main class="card">
<div class="owl">🦉</div>
<h1>Grammar <span>Quest</span></h1>
<p class="sub">המשחק פתוח לתלמידות ולתלמידים של הכיתה בלבד</p>
${note}
${form}
</main>
</body>
</html>`
  return new Response(html, {
    status,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'private, no-store',
      'X-Robots-Tag': 'noindex, nofollow',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'no-referrer',
    },
  })
}

function redirect(location: string, status: number, cookies: string[] = []): Response {
  const headers = new Headers({
    Location: location,
    'Cache-Control': 'private, no-store',
  })
  for (const cookie of cookies) headers.append('Set-Cookie', cookie)
  return new Response(null, { status, headers })
}

function accessCookie(token: string): string {
  return `${COOKIE_NAME}=${token}; Path=/; Max-Age=${COOKIE_MAX_AGE}; HttpOnly; Secure; SameSite=Lax`
}

function isUnder(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`)
}

function isUnlockPath(pathname: string): boolean {
  return (
    pathname === `${BASE}/unlock` ||
    pathname === `${BASE}/unlock/` ||
    pathname === `${LEGACY}/unlock` ||
    pathname === `${LEGACY}/unlock/`
  )
}

function safeNext(raw: string | null): string {
  const fallback = `${BASE}/`
  if (raw == null || raw.length === 0 || raw.length > 2048) return fallback
  let value = raw
  if (value.includes('%')) {
    try {
      value = decodeURIComponent(value)
    } catch {
      return fallback
    }
  }
  if (!value.startsWith(BASE)) return fallback
  const queryAt = value.indexOf('?')
  const path = queryAt === -1 ? value : value.slice(0, queryAt)
  const rest = path.slice(BASE.length)
  if (rest !== '' && !rest.startsWith('/')) return fallback
  if (path.includes('\\') || path.includes('//') || path.includes('..') || path.includes('@')) return fallback
  if (/[\u0000-\u0020]/.test(value)) return fallback
  return value
}

function toGrammar(pathname: string, search: string): string {
  if (pathname === LEGACY) return `${BASE}${search}`
  return `${BASE}${pathname.slice(LEGACY.length)}${search}`
}

async function readSubmittedCode(request: Request): Promise<string> {
  try {
    const form = await request.formData()
    const value = form.get('code')
    return typeof value === 'string' ? value.trim() : ''
  } catch {
    return ''
  }
}

export default async function middleware(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const { pathname, search } = url

  if (pathname === '/') return redirect(`${BASE}/`, 302)

  const settings = getSettings()
  if (!settings) return gatePage('המשחק עדיין לא הוגדר. פנו למורה.', false, 503)

  const token = await expectedToken(settings.code, settings.secret)
  const cookie = readCookie(request, COOKIE_NAME)
  const authorized = cookie !== null && (await safeEqual(cookie, token))
  const unlock = isUnlockPath(pathname)

  if (unlock && request.method === 'POST') {
    const submitted = await readSubmittedCode(request)
    if (submitted && (await safeEqual(submitted, settings.code))) {
      return redirect(`${BASE}/`, 303, [accessCookie(token)])
    }
    await sleep(FAIL_DELAY_MS)
    return gatePage('קוד שגוי, נסו שוב', true, 401)
  }

  if (isUnder(pathname, BASE)) {
    if (authorized) {
      if (unlock) return redirect(`${BASE}/`, 302)
      return next()
    }
    if (url.searchParams.get('migrated') === '1') return gatePage(null, true, 200)
    return redirect(`${LEGACY}/migrate?next=${encodeURIComponent(safeNext(`${pathname}${search}`))}`, 302)
  }

  if (isUnder(pathname, LEGACY)) {
    const migrate = pathname === `${LEGACY}/migrate` || pathname === `${LEGACY}/migrate/`
    if (migrate) {
      if (authorized) return redirect(safeNext(url.searchParams.get('next')), 302, [accessCookie(token)])
      return redirect(`${BASE}/?migrated=1`, 302)
    }
    if (authorized) return redirect(safeNext(toGrammar(pathname, search)), 302, [accessCookie(token)])
    return redirect(`${BASE}/?migrated=1`, 302)
  }

  return next()
}
