import { FormEvent, useState } from 'react'
import {
  DesignId,
  EMAIL,
  contactCta,
  roForesporselPage,
} from '../content'
import { ContentHero, ContentShell } from './ContentShell'

type Props = { design: DesignId }
type View = 'besokende' | 'innboks'
type Status = (typeof roForesporselPage.statuses)[number]['id']
type InboxItem = {
  id: string
  name: string
  theme: string
  timing: string
  preview: string
  status: Status
}

export default function RoForesporsel({ design }: Props) {
  const [view, setView] = useState<View>('besokende')
  const [theme, setTheme] = useState<string>(roForesporselPage.themes[0].id)
  const [timing, setTiming] = useState<string>(roForesporselPage.timings[3].id)
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [sent, setSent] = useState(false)
  const [inbox, setInbox] = useState<InboxItem[]>(() =>
    roForesporselPage.sampleInbox.map((item, index) => ({
      id: `sample-${index}`,
      name: item.name,
      theme: item.theme,
      timing: item.timing,
      preview: item.preview,
      status: item.status,
    })),
  )

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const themeLabel =
      roForesporselPage.themes.find((t) => t.id === theme)?.label ?? theme
    const timingLabel =
      roForesporselPage.timings.find((t) => t.id === timing)?.label ?? timing
    setInbox((prev) => [
      {
        id: `live-${Date.now()}`,
        name: name.trim() || 'Uten navn',
        theme: themeLabel,
        timing: timingLabel,
        preview: message.trim().slice(0, 120) || '—',
        status: 'ny' as const,
      },
      ...prev,
    ])
    setSent(true)
  }

  function cycleStatus(id: string) {
    const order = roForesporselPage.statuses.map((s) => s.id)
    setInbox((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item
        const next = order[(order.indexOf(item.status) + 1) % order.length] as Status
        return { ...item, status: next }
      }),
    )
  }

  const mailtoReal = `mailto:${EMAIL}?subject=${encodeURIComponent(
    'Forespørsel',
  )}&body=${encodeURIComponent(
    'Hei,\n\nJeg ønsker å sende en forespørsel.\n\nVennlig hilsen\n',
  )}`

  return (
    <ContentShell design={design} page="ro" meta="Ro-forespørsel · skisse">
      <ContentHero
        design={design}
        eyebrow={roForesporselPage.eyebrow}
        headline={roForesporselPage.headline}
        lede={roForesporselPage.lede}
        ctaHref="#ro-demo"
        ctaLabel="Prøv skissen"
      />

      <section className="lp-section">
        <div className="lp-shell">
          <p className="lp-lede lp-lede--wide">«{roForesporselPage.pitch}»</p>
          <p className="lp-meta">{roForesporselPage.demoNote}</p>
        </div>
      </section>

      <section className="lp-section" id="ro-demo">
        <div className="lp-shell">
          <div className="lp-ro-tabs" role="tablist" aria-label="Visning">
            <button
              type="button"
              role="tab"
              aria-selected={view === 'besokende'}
              className={`lp-ro-tab ${view === 'besokende' ? 'is-active' : ''}`}
              onClick={() => setView('besokende')}
            >
              Besøkende
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={view === 'innboks'}
              className={`lp-ro-tab ${view === 'innboks' ? 'is-active' : ''}`}
              onClick={() => setView('innboks')}
            >
              Din innboks
            </button>
          </div>

          {view === 'besokende' ? (
            sent ? (
              <div className="lp-ro-thanks">
                <h2>{roForesporselPage.thanksTitle}</h2>
                <p>{roForesporselPage.thanksBody}</p>
                <div className="lp-actions">
                  <button
                    type="button"
                    className="lp-btn"
                    onClick={() => {
                      setSent(false)
                      setMessage('')
                      setName('')
                    }}
                  >
                    Send en ny (demo)
                  </button>
                  <button
                    type="button"
                    className="lp-btn lp-btn--ghost"
                    onClick={() => setView('innboks')}
                  >
                    Se innboksen
                  </button>
                </div>
              </div>
            ) : (
              <form className="lp-ro-form" onSubmit={handleSubmit}>
                <p className="lp-kicker">Steg 1 · Tema</p>
                <div className="lp-ro-choices">
                  {roForesporselPage.themes.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`lp-ro-choice ${theme === item.id ? 'is-active' : ''}`}
                      aria-pressed={theme === item.id}
                      onClick={() => setTheme(item.id)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <label className="lp-ro-field">
                  Navn
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    placeholder="Fornavn er nok"
                  />
                </label>

                <label className="lp-ro-field">
                  Noen setninger om det du står i
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={4}
                    placeholder="Du trenger ikke ha alt formulert."
                  />
                </label>

                <p className="lp-kicker">Steg 2 · Ønsket tempo</p>
                <div className="lp-ro-choices">
                  {roForesporselPage.timings.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`lp-ro-choice ${timing === item.id ? 'is-active' : ''}`}
                      aria-pressed={timing === item.id}
                      onClick={() => setTiming(item.id)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <p className="lp-meta">
                  Dette er ikke en timebestilling. {contactCta.note}
                </p>
                <button className="lp-btn" type="submit">
                  Send forespørsel (demo)
                </button>
              </form>
            )
          ) : (
            <div className="lp-ro-inbox">
              <div className="lp-section__head">
                <p className="lp-kicker">Din visning</p>
                <h2>{roForesporselPage.inboxTitle}</h2>
                <p className="lp-lede">{roForesporselPage.inboxLede}</p>
              </div>
              <ul className="lp-ro-inbox__list">
                {inbox.map((item) => {
                  const statusLabel =
                    roForesporselPage.statuses.find((s) => s.id === item.status)
                      ?.label ?? item.status
                  return (
                    <li key={item.id}>
                      <div className="lp-ro-inbox__main">
                        <strong>{item.name}</strong>
                        <span>
                          {item.theme} · {item.timing}
                        </span>
                        <p>{item.preview}</p>
                      </div>
                      <button
                        type="button"
                        className={`lp-ro-status lp-ro-status--${item.status}`}
                        onClick={() => cycleStatus(item.id)}
                        title="Klikk for å bytte status (demo)"
                      >
                        {statusLabel}
                      </button>
                    </li>
                  )
                })}
              </ul>
              <p className="lp-meta">
                Klikk på status for å veksle mellom ny → avventer → avtalt → ferdig.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-shell">
          <div className="lp-band">
            <h3>Vil du ha dette på ekte senere?</h3>
            <a className="lp-btn" href="?page=holisti#synlighet">
              Se i tilbudet
            </a>
          </div>
          <p className="lp-meta" style={{ marginTop: '1rem' }}>
            Inntil systemet er bygget: bruk vanlig forespørsel via e-post —{' '}
            <a href={mailtoReal}>{contactCta.short}</a>.
          </p>
        </div>
      </section>
    </ContentShell>
  )
}
