/**
 * HoliSti forslagsrom — auth-skall (gjenbrukbart).
 *
 * Per-forslag verdier settes i wrangler.jsonc → vars:
 *   PROPOSAL_HOST, PROPOSAL_SLUG, PROPOSAL_USER, PROPOSAL_PASS
 *
 * Innloggingssiden er bevisst uten kundenavn / firmanavn.
 */

function proposalConfig(env = {}) {
  const slug = String(env.PROPOSAL_SLUG || 'proposal')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '') || 'proposal'
  const host = String(env.PROPOSAL_HOST || `${slug}.holisti.no`).trim().toLowerCase()
  const user = String(env.PROPOSAL_USER || 'demo').trim().toLowerCase()
  const pass = String(env.PROPOSAL_PASS || '')
  // Magic-link-innlogging: kundens e-post settes i Cloudflare (PROPOSAL_EMAIL),
  // og innloggingslenken sendes dit via Nuntly. Aktiveres når e-post + Nuntly-nøkkel
  // + KV-token-lager er på plass. Da slipper man passord helt.
  const email = String(env.PROPOSAL_EMAIL || '').trim().toLowerCase()
  const magicMode = Boolean(email && env.NUNTLY_API_KEY && env.PROPOSAL_LOGIN_TOKENS)
  return {
    slug,
    host,
    origin: `https://${host}`,
    user,
    pass,
    email,
    fromEmail: env.NUNTLY_FROM_EMAIL || 'HoliSti <no-reply@holisti.no>',
    magicMode,
    cookieName: `holisti_proposal_${slug}`,
    sessionValue: `ok-${slug}`,
  }
}

const LOGIN_TOKEN_TTL_SECONDS = 15 * 60 // 15 min
const LOGIN_THROTTLE_SECONDS = 45

/** Sender en engangs-innloggingslenke til kundens e-post via Nuntly. */
async function sendProposalLoginLink(env, cfg, link) {
  const body = {
    from: cfg.fromEmail,
    to: cfg.email,
    subject: 'Din innloggingslenke — HoliSti forslagsrom',
    text:
      'Hei,\n\n' +
      'Her er din personlige innloggingslenke til det private forslagsrommet:\n' +
      `${link}\n\n` +
      'Lenken er personlig og utløper om 15 minutter. Be om en ny hvis den er utløpt.\n\n' +
      'Hilsen HoliSti',
    html:
      '<p>Hei,</p>' +
      '<p>Her er din personlige innloggingslenke til det private forslagsrommet:</p>' +
      `<p><a href="${link}">${link}</a></p>` +
      '<p>Lenken er personlig og utløper om 15 minutter. Be om en ny hvis den er utløpt.</p>' +
      '<p>Hilsen HoliSti</p>',
    tags: [{ name: 'category', value: 'forslagsrom-innlogging' }],
  }
  const res = await fetch('https://api.nuntly.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.NUNTLY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    throw new Error(`Nuntly send-email feilet: ${res.status} ${await res.text()}`)
  }
}

function canonicalRedirect(request, cfg) {
  const url = new URL(request.url)
  const host = url.hostname.toLowerCase()

  if (
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host.endsWith('.localhost') ||
    host.endsWith('.workers.dev') ||
    host.endsWith('.trycloudflare.com')
  ) {
    return null
  }

  const isAlias =
    host === `www.${cfg.host}` || host.endsWith(`.${cfg.host}`)
  const wrongHost = host !== cfg.host && isAlias
  const insecure = host === cfg.host && url.protocol === 'http:'

  if (!wrongHost && !insecure) return null

  const target = new URL(`${url.pathname}${url.search}`, cfg.origin)
  return Response.redirect(target.toString(), 301)
}

function parseCookies(header) {
  const out = {}
  if (!header) return out
  for (const part of header.split(';')) {
    const [rawKey, ...rest] = part.trim().split('=')
    if (!rawKey) continue
    out[rawKey] = decodeURIComponent(rest.join('=') || '')
  }
  return out
}

function isAuthenticated(request, cfg) {
  const cookies = parseCookies(request.headers.get('Cookie') || '')
  return cookies[cfg.cookieName] === cfg.sessionValue
}

function sessionCookie(cfg, maxAgeSeconds) {
  const secure = '; Secure'
  return `${cfg.cookieName}=${encodeURIComponent(cfg.sessionValue)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}${secure}`
}

function clearSessionCookie(cfg) {
  return `${cfg.cookieName}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Secure`
}

function loginPage(cfg = {}, opts = {}) {
  const errorMessage = opts.error || ''
  const notice = opts.notice || ''
  const error = errorMessage ? `<p class="error">${errorMessage}</p>` : ''
  const info = notice ? `<p class="notice">${notice}</p>` : ''
  const html = `<!doctype html>
<html lang="nb">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex,nofollow" />
  <meta name="theme-color" content="#07090d" />
  <title>HoliSti · Privat forslagsrom</title>
  <link rel="icon" type="image/svg+xml" href="/images/logo/holisti-tre.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet" />
  <style>
    :root { color-scheme: dark; }
    * { box-sizing: border-box; }
    body {
      margin: 0; min-height: 100vh; display: grid; place-items: center;
      font-family: "DM Sans", system-ui, sans-serif;
      color: #e8eaef;
      background:
        radial-gradient(55% 40% at 90% 0%, rgba(214,163,82,.16), transparent 55%),
        radial-gradient(40% 35% at 10% 80%, rgba(61,184,172,.1), transparent 50%),
        linear-gradient(180deg, #07090d 0%, #0c1016 55%, #0a1018 100%);
      padding: 1.5rem;
    }
    .card {
      width: min(100%, 26rem);
      background:
        linear-gradient(165deg, rgba(255,255,255,.05), transparent 45%),
        rgba(19,26,40,.94);
      border: 1px solid rgba(214,163,82,.22);
      border-radius: 1.1rem;
      padding: 1.75rem 1.5rem 1.5rem;
      box-shadow: 0 22px 48px rgba(0,0,0,.45), 0 0 32px rgba(61,184,172,.06);
      backdrop-filter: blur(16px);
    }
    .brand {
      display: flex; align-items: center; gap: .7rem; margin-bottom: 1.1rem;
    }
    .brand img {
      width: 2.4rem; height: 2.4rem; object-fit: contain;
      filter: drop-shadow(0 0 12px rgba(214,163,82,.4));
    }
    .brand span {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-weight: 600; font-size: 1.35rem; letter-spacing: .03em;
    }
    h1 {
      margin: 0 0 .4rem;
      font-family: "Cormorant Garamond", Georgia, serif;
      font-weight: 600; font-size: 2rem; letter-spacing: -.02em;
    }
    p { margin: 0 0 1rem; color: #8b93a7; line-height: 1.55; font-size: .95rem; }
    label { display: grid; gap: .35rem; margin-bottom: .85rem; font-size: .78rem; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: #8b93a7; }
    input {
      width: 100%; padding: .85rem .9rem; border: 1px solid rgba(255,255,255,.12);
      border-radius: .65rem;
      background: rgba(7,9,13,.55); color: #e8eaef; font: inherit; text-transform: none; letter-spacing: 0;
    }
    input:focus { outline: 2px solid #3db8ac; outline-offset: 1px; border-color: transparent; }
    button {
      width: 100%; margin-top: .35rem; padding: .95rem 1rem; border: 0; cursor: pointer;
      border-radius: 999px;
      background: linear-gradient(155deg, #f4efe4, #d6a352); color: #0c1016;
      font: inherit; font-weight: 600;
      box-shadow: 0 0 22px rgba(214,163,82,.25);
    }
    .error { color: #fca5a5; background: rgba(248,113,113,.1); border: 1px solid rgba(248,113,113,.25); border-radius: .65rem; padding: .7rem .8rem; margin-bottom: 1rem; }
    .notice { color: #86efac; background: rgba(52,211,153,.1); border: 1px solid rgba(52,211,153,.25); border-radius: .65rem; padding: .7rem .8rem; margin-bottom: 1rem; }
    .meta { margin-top: 1rem; font-size: .75rem; color: #6b7289; letter-spacing: .04em; }
    .meta a { color: #8b93a7; text-decoration: none; }
    .meta a:hover { color: #3db8ac; }
  </style>
</head>
<body>
  <main class="card">
    <div class="brand">
      <img src="/images/logo/holisti-tre.svg" alt="" width="40" height="40" />
      <span>HoliSti</span>
    </div>
    <h1>Privat forslagsrom</h1>
    ${cfg.magicMode
      ? `<p>Få tilgang til designforslag og tilbud. Vi sender en innloggingslenke til e-posten din.</p>
    ${error}${info}
    <form method="POST" action="/login">
      <button type="submit">Send meg innloggingslenke</button>
    </form>`
      : `<p>Logg inn for å se designforslag og tilbud.</p>
    ${error}${info}
    <form method="POST" action="/login">
      <label>Brukernavn
        <input name="username" autocomplete="username" required />
      </label>
      <label>Passord
        <input name="password" type="password" autocomplete="current-password" required />
      </label>
      <button type="submit">Logg inn</button>
    </form>`}
    <p class="meta">HoliSti by Pedersen · <a href="https://platform.holisti.no/personvern" target="_blank" rel="noreferrer">Personvern</a></p>
  </main>
</body>
</html>`
  return new Response(html, {
    status: errorMessage ? 401 : 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}

async function readForm(request) {
  const contentType = request.headers.get('Content-Type') || ''
  if (contentType.includes('application/x-www-form-urlencoded')) {
    const text = await request.text()
    return Object.fromEntries(new URLSearchParams(text))
  }
  if (contentType.includes('multipart/form-data')) {
    const form = await request.formData()
    return Object.fromEntries(form.entries())
  }
  return {}
}

function wantsHtml(request) {
  const accept = request.headers.get('Accept') || ''
  const dest = request.headers.get('Sec-Fetch-Dest') || ''
  if (dest === 'document') return true
  if (accept.includes('text/html')) return true
  return false
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}

/**
 * Redigerbart innhold — enkelt CMS-API.
 * Egen D1-database + R2-bucket per kunde (se wrangler.jsonc). Alt bak
 * samme innlogging som resten av forslagsrommet/siden.
 */

function parseSectionRow(row) {
  let content = {}
  try {
    content = JSON.parse(row.content || '{}')
  } catch {
    content = {}
  }
  return {
    id: row.id,
    page: row.page,
    type: row.type,
    position: row.position,
    visible: !!row.visible,
    content,
  }
}

async function handleGetContent(request, env, cfg, page) {
  if (!isAuthenticated(request, cfg)) return jsonResponse({ error: 'Ikke innlogget.' }, 401)
  if (!env.DB) return jsonResponse({ error: 'Innhold er ikke satt opp for denne siden ennå.' }, 501)

  const { results } = await env.DB.prepare(
    'SELECT * FROM sections WHERE page = ? ORDER BY position ASC',
  )
    .bind(page)
    .all()

  const settingsRows = await env.DB.prepare('SELECT key, value FROM settings').all()
  const settings = Object.fromEntries(
    (settingsRows.results || []).map((row) => [row.key, row.value]),
  )

  return jsonResponse({
    sections: (results || []).map(parseSectionRow),
    settings,
  })
}

async function handleCreateSection(request, env, cfg) {
  if (!isAuthenticated(request, cfg)) return jsonResponse({ error: 'Ikke innlogget.' }, 401)
  if (!env.DB) return jsonResponse({ error: 'Innhold er ikke satt opp for denne siden ennå.' }, 501)

  const body = await request.json().catch(() => null)
  if (!body || !body.page || !body.type) {
    return jsonResponse({ error: 'Mangler page eller type.' }, 400)
  }

  const positionRow = await env.DB.prepare(
    'SELECT COALESCE(MAX(position), -1) + 1 AS next FROM sections WHERE page = ?',
  )
    .bind(body.page)
    .first()
  const position = Number.isFinite(body.position) ? body.position : positionRow.next

  const result = await env.DB.prepare(
    `INSERT INTO sections (page, type, position, visible, content, updated_at)
     VALUES (?, ?, ?, ?, ?, datetime('now'))`,
  )
    .bind(
      String(body.page).slice(0, 40),
      String(body.type).slice(0, 40),
      position,
      body.visible === false ? 0 : 1,
      JSON.stringify(body.content || {}),
    )
    .run()

  return jsonResponse({ id: result.meta.last_row_id }, 201)
}

async function handleUpdateSection(request, env, cfg, id) {
  if (!isAuthenticated(request, cfg)) return jsonResponse({ error: 'Ikke innlogget.' }, 401)
  if (!env.DB) return jsonResponse({ error: 'Innhold er ikke satt opp for denne siden ennå.' }, 501)

  const body = await request.json().catch(() => null)
  if (!body) return jsonResponse({ error: 'Ugyldig forespørsel.' }, 400)

  const fields = []
  const values = []
  if (body.content !== undefined) {
    fields.push('content = ?')
    values.push(JSON.stringify(body.content))
  }
  if (body.position !== undefined) {
    fields.push('position = ?')
    values.push(Number(body.position))
  }
  if (body.visible !== undefined) {
    fields.push('visible = ?')
    values.push(body.visible ? 1 : 0)
  }
  if (!fields.length) return jsonResponse({ error: 'Ingenting å oppdatere.' }, 400)

  fields.push("updated_at = datetime('now')")
  values.push(Number(id))

  await env.DB.prepare(`UPDATE sections SET ${fields.join(', ')} WHERE id = ?`)
    .bind(...values)
    .run()

  return jsonResponse({ ok: true })
}

async function handleDeleteSection(request, env, cfg, id) {
  if (!isAuthenticated(request, cfg)) return jsonResponse({ error: 'Ikke innlogget.' }, 401)
  if (!env.DB) return jsonResponse({ error: 'Innhold er ikke satt opp for denne siden ennå.' }, 501)

  await env.DB.prepare('DELETE FROM sections WHERE id = ?').bind(Number(id)).run()
  return jsonResponse({ ok: true })
}

async function handleUpdateSettings(request, env, cfg) {
  if (!isAuthenticated(request, cfg)) return jsonResponse({ error: 'Ikke innlogget.' }, 401)
  if (!env.DB) return jsonResponse({ error: 'Innhold er ikke satt opp for denne siden ennå.' }, 501)

  const body = await request.json().catch(() => null)
  if (!body || typeof body !== 'object') return jsonResponse({ error: 'Ugyldig forespørsel.' }, 400)

  const statements = Object.entries(body).map(([key, value]) =>
    env.DB.prepare(
      'INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value',
    ).bind(String(key).slice(0, 60), String(value).slice(0, 200)),
  )
  if (statements.length) await env.DB.batch(statements)

  return jsonResponse({ ok: true })
}

async function handleListTemplates(request, env, cfg) {
  if (!isAuthenticated(request, cfg)) return jsonResponse({ error: 'Ikke innlogget.' }, 401)
  if (!env.DB) return jsonResponse({ error: 'Innhold er ikke satt opp for denne siden ennå.' }, 501)

  const { results } = await env.DB.prepare(
    'SELECT * FROM section_templates ORDER BY created_at DESC',
  ).all()
  return jsonResponse({
    templates: (results || []).map((row) => ({
      id: row.id,
      name: row.name,
      type: row.type,
      content: JSON.parse(row.content || '{}'),
    })),
  })
}

async function handleSaveTemplate(request, env, cfg) {
  if (!isAuthenticated(request, cfg)) return jsonResponse({ error: 'Ikke innlogget.' }, 401)
  if (!env.DB) return jsonResponse({ error: 'Innhold er ikke satt opp for denne siden ennå.' }, 501)

  const body = await request.json().catch(() => null)
  if (!body || !body.name || !body.type) {
    return jsonResponse({ error: 'Mangler navn eller type.' }, 400)
  }

  const result = await env.DB.prepare(
    'INSERT INTO section_templates (name, type, content) VALUES (?, ?, ?)',
  )
    .bind(String(body.name).slice(0, 120), String(body.type).slice(0, 40), JSON.stringify(body.content || {}))
    .run()

  return jsonResponse({ id: result.meta.last_row_id }, 201)
}

function mediaKeyFromName(originalName) {
  const ext = (originalName.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg'
  const random = crypto.randomUUID().replace(/-/g, '').slice(0, 16)
  return `${random}.${ext}`
}

async function handleUploadMedia(request, env, cfg) {
  if (!isAuthenticated(request, cfg)) return jsonResponse({ error: 'Ikke innlogget.' }, 401)
  if (!env.MEDIA || !env.DB) return jsonResponse({ error: 'Bildeopplasting er ikke satt opp ennå.' }, 501)

  const form = await request.formData().catch(() => null)
  const file = form && form.get('file')
  if (!file || typeof file === 'string') {
    return jsonResponse({ error: 'Mangler fil.' }, 400)
  }
  if (file.size > 8 * 1024 * 1024) {
    return jsonResponse({ error: 'Bildet er for stort (maks 8 MB).' }, 400)
  }

  const key = mediaKeyFromName(file.name || 'bilde.jpg')
  await env.MEDIA.put(key, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type || 'application/octet-stream' },
  })

  const url = `/media/${key}`
  await env.DB.prepare(
    'INSERT INTO media (key, url, content_type, size) VALUES (?, ?, ?, ?)',
  )
    .bind(key, url, file.type || '', file.size)
    .run()

  return jsonResponse({ key, url }, 201)
}

async function handleListMedia(request, env, cfg) {
  if (!isAuthenticated(request, cfg)) return jsonResponse({ error: 'Ikke innlogget.' }, 401)
  if (!env.DB) return jsonResponse({ error: 'Bildeopplasting er ikke satt opp ennå.' }, 501)

  const { results } = await env.DB.prepare('SELECT * FROM media ORDER BY created_at DESC').all()
  return jsonResponse({ media: results || [] })
}

async function handleServeMedia(request, env, cfg, key) {
  if (!isAuthenticated(request, cfg)) return new Response('Ikke innlogget.', { status: 401 })
  if (!env.MEDIA) return new Response('Ikke funnet.', { status: 404 })

  const object = await env.MEDIA.get(key)
  if (!object) return new Response('Ikke funnet.', { status: 404 })

  return new Response(object.body, {
    headers: {
      'Content-Type': object.httpMetadata?.contentType || 'application/octet-stream',
      'Cache-Control': 'private, max-age=31536000, immutable',
      ETag: object.httpEtag,
    },
  })
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function formatOsloTimestamp(date = new Date()) {
  try {
    return new Intl.DateTimeFormat('nb-NO', {
      timeZone: 'Europe/Oslo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(date) + ' (Europe/Oslo)'
  } catch {
    return date.toISOString()
  }
}

function goFurtherChoiceRows(data) {
  return [
    ['Tidspunkt', data.submittedAtDisplay],
    ['Kunde', data.clientName],
    ['Firma', data.firmName],
    ['E-post', data.clientEmail],
    ['Stil', data.designLabel],
    ['Løsning', data.hostTitle],
    ['Levering', data.delivery],
    ['Sider', data.pages],
    ['Nettadresse', data.domainTitle],
    ['Pris', `${data.priceDisplay} inkl. mva.`],
    ['Justeringsrunder', data.revisionRounds],
  ]
}

function renderEmailRows(rows) {
  return rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#9aa3b5;font-size:13px;width:34%;vertical-align:top;">${escapeHtml(label)}</td>
        <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#e8eaef;font-size:15px;font-weight:600;">${escapeHtml(value)}</td>
      </tr>`,
    )
    .join('')
}

function renderTermsListHtml(terms, heading = 'Vilkår og sammendrag') {
  if (!terms.length) return ''
  const items = terms
    .map(
      (term) =>
        `<li style="margin:0 0 8px;color:#dce1ec;font-size:14px;line-height:1.55;">${escapeHtml(term)}</li>`,
    )
    .join('')
  return `<div style="margin:18px 0 0;padding:14px 16px;border-radius:12px;background:rgba(61,184,172,0.1);border:1px solid rgba(61,184,172,0.28);">
    <p style="margin:0 0 10px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#3db8ac;font-weight:700;">${escapeHtml(heading)}</p>
    <ul style="margin:0;padding:0 0 0 1.1rem;">${items}</ul>
  </div>`
}

function renderSalesAndPlatformTerms(data) {
  const sales = Array.isArray(data.salesTerms) && data.salesTerms.length
    ? data.salesTerms
    : data.terms
  const platform = Array.isArray(data.platformTerms) ? data.platformTerms : []
  const salesUrl = data.salesTermsUrl
    ? `<p style="margin:10px 0 0;font-size:12px;color:#9aa3b5;line-height:1.5;"><a href="${escapeHtml(data.salesTermsUrl)}" style="color:#7ad4cb;">Fulle salgsvilkår på holisti.no</a></p>`
    : ''
  const platformUrl = data.platformTermsUrl
    ? `<p style="margin:10px 0 0;font-size:12px;color:#9aa3b5;line-height:1.5;"><a href="${escapeHtml(data.platformTermsUrl)}" style="color:#7ad4cb;">Plattformvilkår på platform.holisti.no</a></p>`
    : ''
  return `${renderTermsListHtml(sales, 'Salgsvilkår for tilbudet')}${salesUrl}${
    platform.length
      ? `${renderTermsListHtml(platform, 'Plattform / pilot (separat)')}${platformUrl}`
      : ''
  }`
}

function renderCommentBlock(data, forClient) {
  if (data.comment) {
    return `<p style="margin:18px 0 0;padding:14px 16px;border-radius:12px;background:rgba(214,163,82,0.1);border:1px solid rgba(214,163,82,0.28);color:#e8eaef;font-size:14px;line-height:1.55;white-space:pre-wrap;">
        <strong style="display:block;margin-bottom:6px;color:#d6a352;">${forClient ? 'Din kommentar' : 'Kommentar fra kunden'}</strong>
        ${escapeHtml(data.comment)}
        <span style="display:block;margin-top:8px;font-size:12px;color:#9aa3b5;font-weight:400;">Ikke en del av de inkluderte justeringsrundene.</span>
      </p>`
  }
  return `<p style="margin:18px 0 0;padding:14px 16px;border-radius:12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:#9aa3b5;font-size:14px;line-height:1.55;">
        Ingen kommentar vedlagt. De to justeringsrundene brukes senere — etter at første versjon er klar.
      </p>`
}

function renderBrochureBlock(data) {
  if (!data.brochureUrl || !data.brochureTitle) return ''
  const blurb = data.brochureBlurb
    ? `<p style="margin:8px 0 0;font-size:13px;line-height:1.5;color:#9aa3b5;">${escapeHtml(data.brochureBlurb)}</p>`
    : ''
  return `<div style="margin:18px 0 0;padding:14px 16px;border-radius:12px;background:rgba(61,184,172,0.1);border:1px solid rgba(61,184,172,0.28);">
    <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#3db8ac;font-weight:700;">Vedlegg · HoliSti-brosjyre</p>
    <p style="margin:0;color:#e8eaef;font-size:15px;font-weight:600;line-height:1.4;">${escapeHtml(data.brochureTitle)}</p>
    ${blurb}
    <p style="margin:12px 0 0;">
      <a href="${escapeHtml(data.brochureUrl)}" style="display:inline-block;padding:10px 14px;border-radius:999px;background:rgba(61,184,172,0.18);border:1px solid rgba(61,184,172,0.4);color:#7ad4cb;text-decoration:none;font-size:13px;font-weight:700;">
        Åpne brosjyren (PDF)
      </a>
    </p>
  </div>`
}

function buildGoFurtherEmailShell({ title, intro, metaLine, bodyHtml, footerNote, actionUrl }) {
  return `<!DOCTYPE html>
<html lang="no">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#07090d;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#07090d;padding:28px 14px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#0c1016;border:1px solid rgba(214,163,82,0.22);border-radius:16px;overflow:hidden;">
          <tr>
            <td style="padding:28px 28px 18px;background:linear-gradient(165deg,rgba(214,163,82,0.14),transparent 55%);">
              <p style="margin:0 0 6px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#d6a352;font-weight:700;">HoliSti by Pedersen</p>
              <h1 style="margin:0;font-size:28px;line-height:1.25;color:#e8eaef;font-weight:500;">${escapeHtml(title)}</h1>
              <p style="margin:12px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:15px;line-height:1.55;color:#c8cedc;">
                ${intro}
              </p>
              ${
                metaLine
                  ? `<p style="margin:8px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:13px;line-height:1.45;color:#9aa3b5;">${metaLine}</p>`
                  : ''
              }
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 22px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 28px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
              <a href="${escapeHtml(actionUrl || 'https://holisti.no')}" style="display:inline-block;padding:12px 18px;border-radius:999px;background:linear-gradient(155deg,#f4efe4,#d6a352);color:#0c1016;text-decoration:none;font-size:14px;font-weight:700;">
                Åpne forslagsrommet
              </a>
              <p style="margin:18px 0 0;font-size:12px;color:#6b7289;line-height:1.5;">
                ${footerNote}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function buildGoFurtherEmailHtml(data) {
  const bodyHtml = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${renderEmailRows(goFurtherChoiceRows(data))}</table>
    ${renderCommentBlock(data, false)}
    ${renderBrochureBlock(data)}
    ${renderSalesAndPlatformTerms(data)}
    <p style="margin:14px 0 0;font-size:12px;color:#9aa3b5;line-height:1.5;">Kopi med fullt sammendrag sendes også til kunden (${escapeHtml(data.clientEmail)}).</p>
  `
  return buildGoFurtherEmailShell({
    title: 'Ny bekreftelse fra forslagsrommet',
    intro: `${escapeHtml(data.clientName)} har gått videre med tilbudet for ${escapeHtml(data.firmName)}.`,
    metaLine: `Sendt: ${escapeHtml(data.submittedAtDisplay)}`,
    bodyHtml,
    actionUrl: `${data.origin}/?page=holisti`,
    footerNote: `Sendt via HoliSti · ${escapeHtml(data.host)} · ${escapeHtml(data.submittedAtDisplay)}`,
  })
}

function buildClientGoFurtherEmailHtml(data) {
  const first = escapeHtml(data.clientFirstName || data.clientName)
  const bodyHtml = `
    <p style="margin:0 0 14px;color:#c8cedc;font-size:15px;line-height:1.6;">
      Hei ${first} — her er din kopi av avtalen med fullt sammendrag. Ta vare på denne e-posten.
    </p>
    <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#d6a352;font-weight:700;">Dine valg</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${renderEmailRows(goFurtherChoiceRows(data))}</table>
    ${renderCommentBlock(data, true)}
    ${renderBrochureBlock(data)}
    ${renderSalesAndPlatformTerms(data)}
    <p style="margin:18px 0 0;padding:14px 16px;border-radius:12px;background:rgba(214,163,82,0.08);border:1px solid rgba(214,163,82,0.22);color:#dce1ec;font-size:14px;line-height:1.55;">
      Spørsmål? Svar på denne e-posten — den går til <strong style="color:#e8eaef;">Stine Hol Pedersen</strong> hos HoliSti by Pedersen.
    </p>
  `
  return buildGoFurtherEmailShell({
    title: 'Din bekreftelse — tilbudet er inngått',
    intro: `Takk, ${first}. Tilbudet for ${escapeHtml(data.firmName)} er inngått. Under finner du et fullt sammendrag av valgene og vilkårene.`,
    metaLine: `Bekreftet: ${escapeHtml(data.submittedAtDisplay)}`,
    bodyHtml,
    actionUrl: `${data.origin}/?page=holisti`,
    footerNote: `HoliSti by Pedersen · post@holisti.no · ${escapeHtml(data.host)} · ${escapeHtml(data.submittedAtDisplay)}`,
  })
}

function buildGoFurtherEmailText(data) {
  return [
    `Ny bekreftelse fra forslagsrommet`,
    '',
    `${data.clientName} har gått videre med tilbudet for ${data.firmName}.`,
    `Sendt: ${data.submittedAtDisplay}`,
    '',
    ...goFurtherChoiceRows(data).map(([label, value]) => `${label}: ${value}`),
    '',
    data.comment
      ? `Kommentar fra kunden (ikke del av inkluderte justeringsrunder):\n${data.comment}`
      : 'Ingen kommentar vedlagt.',
    '',
    ...(data.brochureUrl
      ? [
          'Vedlegg · HoliSti-brosjyre:',
          data.brochureTitle,
          data.brochureBlurb || '',
          data.brochureUrl,
          '',
        ]
      : []),
    'Salgsvilkår for tilbudet:',
    ...(Array.isArray(data.salesTerms) && data.salesTerms.length
      ? data.salesTerms
      : data.terms
    ).map((term) => `- ${term}`),
    data.salesTermsUrl ? `Fulle salgsvilkår: ${data.salesTermsUrl}` : '',
    '',
    ...(Array.isArray(data.platformTerms) && data.platformTerms.length
      ? [
          'Plattform / pilot (separat):',
          ...data.platformTerms.map((term) => `- ${term}`),
          data.platformTermsUrl ? `Plattformvilkår: ${data.platformTermsUrl}` : '',
          '',
        ]
      : []),
    `Kopi med fullt sammendrag sendes også til kunden (${data.clientEmail}).`,
    '',
    `${data.origin}/?page=holisti`,
  ].join('\n')
}

function buildClientGoFurtherEmailText(data) {
  const first = data.clientFirstName || data.clientName
  return [
    `Din bekreftelse — tilbudet er inngått`,
    '',
    `Hei ${first},`,
    '',
    `Takk. Tilbudet for ${data.firmName} er inngått. Her er din kopi med fullt sammendrag.`,
    `Bekreftet: ${data.submittedAtDisplay}`,
    '',
    'Dine valg:',
    ...goFurtherChoiceRows(data).map(([label, value]) => `${label}: ${value}`),
    '',
    data.comment
      ? `Din kommentar (ikke del av inkluderte justeringsrunder):\n${data.comment}`
      : 'Ingen kommentar vedlagt.',
    '',
    ...(data.brochureUrl
      ? [
          'Vedlegg · HoliSti-brosjyre:',
          data.brochureTitle,
          data.brochureBlurb || '',
          data.brochureUrl,
          '',
        ]
      : []),
    'Salgsvilkår for tilbudet:',
    ...(Array.isArray(data.salesTerms) && data.salesTerms.length
      ? data.salesTerms
      : data.terms
    ).map((term) => `- ${term}`),
    data.salesTermsUrl ? `Fulle salgsvilkår: ${data.salesTermsUrl}` : '',
    '',
    ...(Array.isArray(data.platformTerms) && data.platformTerms.length
      ? [
          'Plattform / pilot (separat):',
          ...data.platformTerms.map((term) => `- ${term}`),
          data.platformTermsUrl ? `Plattformvilkår: ${data.platformTermsUrl}` : '',
          '',
        ]
      : []),
    'Spørsmål? Svar på denne e-posten — den går til Stine Hol Pedersen hos HoliSti by Pedersen.',
    '',
    `${data.origin}/?page=holisti`,
  ].join('\n')
}

async function sendResendEmail(env, payload) {
  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  if (!resendResponse.ok) {
    const detail = await resendResponse.text().catch(() => '')
    console.error('Resend error', resendResponse.status, detail.slice(0, 500))
    return false
  }
  return true
}

async function handleGoFurther(request, env, cfg) {
  if (!isAuthenticated(request, cfg)) {
    return jsonResponse({ ok: false, error: 'Ikke innlogget.' }, 401)
  }
  if (!env.RESEND_API_KEY) {
    return jsonResponse({ ok: false, error: 'E-post er ikke konfigurert (mangler API-nøkkel).' }, 500)
  }

  let body
  try {
    body = await request.json()
  } catch {
    return jsonResponse({ ok: false, error: 'Ugyldig forespørsel.' }, 400)
  }

  const hostId = body.hostId === 'wix' || body.hostId === 'external' ? body.hostId : null
  if (!hostId) {
    return jsonResponse({ ok: false, error: 'Velg løsning først.' }, 400)
  }

  const submittedAt = new Date()
  const comment = String(body.comment || body.changeNotes || '')
    .trim()
    .slice(0, 200)

  const termsFromBody = Array.isArray(body.terms)
    ? body.terms.map((term) => String(term || '').trim().slice(0, 320)).filter(Boolean).slice(0, 16)
    : []
  const salesFromBody = Array.isArray(body.salesTerms)
    ? body.salesTerms.map((term) => String(term || '').trim().slice(0, 320)).filter(Boolean).slice(0, 12)
    : []
  const platformFromBody = Array.isArray(body.platformTerms)
    ? body.platformTerms.map((term) => String(term || '').trim().slice(0, 320)).filter(Boolean).slice(0, 12)
    : []
  const fallbackSalesTerms = [
    'To justeringsrunder er inkludert — finpuss basert på den stilen du valgte.',
    'Eventuell kommentar er ikke en del av de inkluderte justeringsrundene.',
    'Når e-posten er sendt, er tilbudet inngått og avtalt.',
    'Faktura eller kvittering sendes på e-post. Arbeid starter typisk etter betaling.',
    'Du får en kopi av denne bekreftelsen på e-post med fullt sammendrag.',
    'Fulle salgsvilkår: https://holisti.no/vilkar',
  ]
  const fallbackPlatformTerms = [
    'Referanseavtale følger med pilottilbudet.',
    'Pilotfasen teller fra avtaleinngåelse — ca. 3 måneder.',
    'Etter piloten velger du selv om du starter abonnement — ikke automatisk.',
    'Brosjyre følger med: Slik redigerer og oppdaterer du nettsted og kanaler (PDF).',
    'Plattformens egne vilkår: https://platform.holisti.no/vilkar',
  ]

  const salesTerms = salesFromBody.length
    ? salesFromBody
    : termsFromBody.length && !platformFromBody.length
      ? termsFromBody
      : fallbackSalesTerms
  const platformTerms =
    hostId === 'external'
      ? platformFromBody.length
        ? platformFromBody
        : fallbackPlatformTerms
      : []
  const terms = [...salesTerms, ...platformTerms]

  const brochureUrl = String(body.brochureUrl || '').trim().slice(0, 400)
  const brochureTitle = String(body.brochureTitle || '').trim().slice(0, 200)
  const brochureBlurb = String(body.brochureBlurb || '').trim().slice(0, 500)
  const includeBrochure =
    hostId === 'external' &&
    brochureUrl.startsWith('https://') &&
    brochureTitle.length > 0
  const salesTermsUrl = String(body.salesTermsUrl || 'https://holisti.no/vilkar')
    .trim()
    .slice(0, 400)
  const platformTermsUrl =
    hostId === 'external'
      ? String(body.platformTermsUrl || 'https://platform.holisti.no/vilkar').trim().slice(0, 400)
      : ''

  const data = {
    origin: cfg.origin,
    host: cfg.host,
    clientName: String(body.clientName || 'Kunde').slice(0, 120),
    clientFirstName: String(body.clientFirstName || body.clientName || 'Kunde').slice(0, 80),
    firmName: String(body.firmName || '').slice(0, 160),
    clientEmail: String(body.clientEmail || '').slice(0, 160),
    designLabel: String(body.designLabel || '').slice(0, 120),
    hostTitle: String(body.hostTitle || hostId).slice(0, 160),
    delivery: String(body.delivery || '').slice(0, 200),
    pages: String(body.pages || '').slice(0, 240),
    domainTitle: String(body.domainTitle || 'ikke valgt ennå').slice(0, 160),
    priceDisplay: String(body.priceDisplay || '2 500 kr').slice(0, 40),
    revisionRounds: String(body.revisionRounds || 'To justeringsrunder').slice(0, 80),
    salesTerms,
    platformTerms,
    terms,
    termsSummary: String(body.termsSummary || '').slice(0, 2000),
    salesTermsUrl: salesTermsUrl.startsWith('https://') ? salesTermsUrl : 'https://holisti.no/vilkar',
    platformTermsUrl:
      platformTermsUrl.startsWith('https://') ? platformTermsUrl : '',
    comment,
    brochureUrl: includeBrochure ? brochureUrl : '',
    brochureTitle: includeBrochure ? brochureTitle : '',
    brochureBlurb: includeBrochure ? brochureBlurb : '',
    submittedAtIso: submittedAt.toISOString(),
    submittedAtDisplay: formatOsloTimestamp(submittedAt),
  }

  const from = env.RESEND_FROM || 'HoliSti by Pedersen <post@holisti.no>'
  const toStaff = env.RESEND_TO || 'post@holisti.no'
  const hasClientEmail = data.clientEmail.includes('@')

  const staffOk = await sendResendEmail(env, {
    from,
    to: [toStaff],
    subject: `${data.firmName || 'Forslagsrom'} — ${data.clientName} går videre (${data.designLabel}, ${data.hostTitle})`,
    html: buildGoFurtherEmailHtml(data),
    text: buildGoFurtherEmailText(data),
    ...(hasClientEmail ? { reply_to: data.clientEmail } : {}),
  })

  if (!staffOk) {
    return jsonResponse({ ok: false, error: 'Kunne ikke sende e-post via Resend.' }, 502)
  }

  if (hasClientEmail) {
    const clientOk = await sendResendEmail(env, {
      from,
      to: [data.clientEmail],
      reply_to: toStaff.includes('<') ? toStaff.replace(/^.*<([^>]+)>.*$/, '$1') : toStaff,
      subject: `Din bekreftelse — tilbud inngått | ${data.firmName} × HoliSti`,
      html: buildClientGoFurtherEmailHtml(data),
      text: buildClientGoFurtherEmailText(data),
    })
    if (!clientOk) {
      console.error('Client copy failed after staff email succeeded', data.clientEmail)
      return jsonResponse({
        ok: false,
        error: 'Bekreftelsen ble sendt til HoliSti, men kopien til deg feilet. Ta kontakt, så sender vi den på nytt.',
      }, 502)
    }
  }

  return jsonResponse({ ok: true, clientCopy: hasClientEmail })
}

export default {
  async fetch(request, env) {
    const cfg = proposalConfig(env)
    const redirect = canonicalRedirect(request, cfg)
    if (redirect) return redirect

    const url = new URL(request.url)
    const path = url.pathname

    if (path === '/api/ga-videre' && request.method === 'POST') {
      return handleGoFurther(request, env, cfg)
    }

    const contentMatch = path.match(/^\/api\/content\/([a-z0-9-]+)$/i)
    if (contentMatch && request.method === 'GET') {
      return handleGetContent(request, env, cfg, contentMatch[1])
    }

    if (path === '/api/admin/sections' && request.method === 'POST') {
      return handleCreateSection(request, env, cfg)
    }
    const sectionMatch = path.match(/^\/api\/admin\/sections\/(\d+)$/)
    if (sectionMatch && request.method === 'PUT') {
      return handleUpdateSection(request, env, cfg, sectionMatch[1])
    }
    if (sectionMatch && request.method === 'DELETE') {
      return handleDeleteSection(request, env, cfg, sectionMatch[1])
    }

    if (path === '/api/admin/settings' && request.method === 'PUT') {
      return handleUpdateSettings(request, env, cfg)
    }

    if (path === '/api/admin/templates' && request.method === 'GET') {
      return handleListTemplates(request, env, cfg)
    }
    if (path === '/api/admin/templates' && request.method === 'POST') {
      return handleSaveTemplate(request, env, cfg)
    }

    if (path === '/api/admin/media' && request.method === 'POST') {
      return handleUploadMedia(request, env, cfg)
    }
    if (path === '/api/admin/media' && request.method === 'GET') {
      return handleListMedia(request, env, cfg)
    }
    const mediaMatch = path.match(/^\/media\/([a-zA-Z0-9]+\.[a-z0-9]+)$/)
    if (mediaMatch && request.method === 'GET') {
      return handleServeMedia(request, env, cfg, mediaMatch[1])
    }

    if (path === '/login' && request.method === 'POST') {
      if (cfg.magicMode) {
        // Be om engangs-innloggingslenke på e-post (til kundens PROPOSAL_EMAIL).
        const throttled = await env.PROPOSAL_LOGIN_TOKENS.get('throttle')
        if (throttled) {
          return loginPage(cfg, {
            error: 'Du ba nettopp om en lenke. Sjekk innboksen, eller prøv igjen om et lite minutt.',
          })
        }
        await env.PROPOSAL_LOGIN_TOKENS.put('throttle', '1', { expirationTtl: LOGIN_THROTTLE_SECONDS })
        const token = crypto.randomUUID().replace(/-/g, '')
        await env.PROPOSAL_LOGIN_TOKENS.put(`login:${token}`, '1', { expirationTtl: LOGIN_TOKEN_TTL_SECONDS })
        const link = `${cfg.origin}/login/verify?token=${token}`
        try {
          await sendProposalLoginLink(env, cfg, link)
        } catch (err) {
          await env.PROPOSAL_LOGIN_TOKENS.delete(`login:${token}`)
          console.error('Kunne ikke sende innloggingslenke:', err)
          return loginPage(cfg, { error: 'Kunne ikke sende e-post akkurat nå. Prøv igjen om litt.' })
        }
        return loginPage(cfg, {
          notice: 'Vi har sendt en innloggingslenke til e-posten din. Åpne den for å komme inn.',
        })
      }
      const data = await readForm(request)
      const username = String(data.username || '').trim().toLowerCase()
      const password = String(data.password || '')
      if (cfg.pass && username === cfg.user && password === cfg.pass) {
        const next = url.searchParams.get('next') || '/?page=holisti'
        return new Response(null, {
          status: 303,
          headers: {
            Location: next,
            'Set-Cookie': sessionCookie(cfg, 60 * 60 * 24 * 30),
            'Cache-Control': 'no-store',
          },
        })
      }
      return loginPage(cfg, { error: 'Feil brukernavn eller passord. Prøv igjen.' })
    }

    if (path === '/login/verify' && request.method === 'GET') {
      const token = url.searchParams.get('token') || ''
      const record =
        token && cfg.magicMode ? await env.PROPOSAL_LOGIN_TOKENS.get(`login:${token}`) : null
      if (!record) {
        return loginPage(cfg, { error: 'Lenken er utløpt eller allerede brukt. Be om en ny.' })
      }
      await env.PROPOSAL_LOGIN_TOKENS.delete(`login:${token}`) // engangsbruk
      return new Response(null, {
        status: 303,
        headers: {
          Location: '/?page=holisti',
          'Set-Cookie': sessionCookie(cfg, 60 * 60 * 24 * 30),
          'Cache-Control': 'no-store',
        },
      })
    }

    if (path === '/logout') {
      return new Response(null, {
        status: 303,
        headers: {
          Location: '/login',
          'Set-Cookie': clearSessionCookie(cfg),
          'Cache-Control': 'no-store',
        },
      })
    }

    if (path === '/login' && request.method === 'GET') {
      if (isAuthenticated(request, cfg)) {
        return Response.redirect(new URL('/?page=holisti', url.origin).toString(), 302)
      }
      return loginPage(cfg)
    }

    if (!isAuthenticated(request, cfg)) {
      // Allow static assets so the SPA can load after login; gate HTML navigations.
      const isAsset =
        path.startsWith('/assets/') ||
        path.startsWith('/images/') ||
        path.startsWith('/docs/') ||
        path === '/favicon.svg' ||
        path === '/robots.txt' ||
        path === '/sitemap.xml' ||
        path === '/llms.txt' ||
        /\.(css|js|mjs|map|png|jpe?g|webp|svg|ico|woff2?|pdf)$/i.test(path)

      if (!isAsset && (request.method === 'GET' || request.method === 'HEAD') && wantsHtml(request)) {
        return loginPage(cfg)
      }
      if (!isAsset && path === '/') {
        return loginPage(cfg)
      }
    }

    return env.ASSETS.fetch(request)
  },
}
