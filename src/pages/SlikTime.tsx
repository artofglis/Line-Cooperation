import { DesignId, EMAIL, contactCta, sessionPage } from '../content'
import { ContentHero, ContentShell } from './ContentShell'

type Props = { design: DesignId }

export default function SlikTime({ design }: Props) {
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(
    'Forespørsel — kartlegging',
  )}&body=${encodeURIComponent(
    'Hei,\n\nJeg ønsker å sende en forespørsel om kartlegging.\n\nVennlig hilsen\n',
  )}`

  return (
    <ContentShell design={design} page="time" meta="Slik foregår en time">
      <ContentHero
        design={design}
        eyebrow={sessionPage.eyebrow}
        headline={sessionPage.headline}
        lede={sessionPage.lede}
        ctaHref={mailto}
        ctaLabel={sessionPage.cta}
      />

      <section className="lp-section">
        <div className="lp-shell">
          <div className="lp-section__head">
            <p className="lp-kicker">Steg for steg</p>
            <h2>Fra forespørsel til samtale</h2>
          </div>
          <ol className="lp-steps">
            {sessionPage.steps.map((step) => (
              <li key={step.title}>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-shell">
          <div className="lp-section__head">
            <p className="lp-kicker">Godt å vite</p>
            <h2>Forventninger som matcher tempoet</h2>
          </div>
          <ul className="lp-list">
            {sessionPage.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-shell">
          <div className="lp-band">
            <h3>{sessionPage.ctaTitle}</h3>
            <a className="lp-btn" href={mailto}>
              {sessionPage.cta}
            </a>
          </div>
          <p className="lp-meta" style={{ marginTop: '1rem' }}>
            {contactCta.note}
          </p>
        </div>
      </section>
    </ContentShell>
  )
}
