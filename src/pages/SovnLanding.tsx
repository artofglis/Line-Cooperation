import {
  ADDRESS,
  DesignId,
  EMAIL,
  FIRM_NAME,
  ORG_NR,
  PHONE_DISPLAY,
  PHONE_HREF,
  contactCta,
  sovnProgram,
} from '../content'
import { ClientLogo, ClientMarkBg } from '../components/ClientLogo'
import { ProposalLinks } from '../components/ProposalLinks'
import './landing.css'

type Props = {
  design: DesignId
}

export default function SovnLanding({ design }: Props) {
  const mailSubject = encodeURIComponent('Søvnprogram — kartlegging')
  const mailBody = encodeURIComponent(
    'Hei,\n\nJeg ønsker en gratis kartleggingssamtale om søvnprogrammet.\n\nVennlig hilsen\n',
  )
  const mailto = `mailto:${EMAIL}?subject=${mailSubject}&body=${mailBody}`

  return (
    <div className="lp" data-theme={design} data-page="sovn">
      <header className="lp-nav">
        <div className="lp-shell lp-nav__inner">
          <a href="?page=hjem" aria-label={FIRM_NAME}>
            <ClientLogo className="lp-nav__logo" variant="ring" />
          </a>
          <p className="lp-nav__meta">Søvnprogram</p>
          <a className="lp-nav__cta" href={mailto}>
            Send forespørsel
          </a>
        </div>
      </header>

      <main>
        <section className="lp-hero">
          <ClientMarkBg className="lp-hero__mark-bg client-mark-bg--soft" />
          <div className="lp-shell lp-hero__grid lp-hero__grid--flip">
            <div className="lp-hero__copy">
              <p className="lp-kicker">{sovnProgram.eyebrow}</p>
              <h1>{sovnProgram.headline}</h1>
              <p className="lp-lede">{sovnProgram.lede}</p>
              <div className="lp-actions">
                <a className="lp-btn" href={mailto}>
                  {sovnProgram.cta}
                </a>
              </div>
              <p className="lp-meta">{sovnProgram.meta}</p>
            </div>
            <figure className="lp-figure">
              <img
                src="/images/hero.svg"
                alt="Rolig kveldsstemning — atmosfære for søvnprogrammet"
                width={2400}
                height={1350}
                fetchPriority="high"
              />
            </figure>
          </div>
        </section>

        <section className="lp-section">
          <div className="lp-shell">
            <div className="lp-section__head">
              <p className="lp-kicker">Kjenner du deg igjen?</p>
              <h2>{sovnProgram.recognizeTitle}</h2>
            </div>
            <ul className="lp-list">
              {sovnProgram.symptoms.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="lp-section">
          <div className="lp-shell">
            <div className="lp-section__head">
              <p className="lp-kicker">Slik jobber vi</p>
              <h2>{sovnProgram.stepsTitle}</h2>
            </div>
            <ol className="lp-steps">
              {sovnProgram.steps.map((step) => (
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
            <blockquote className="lp-quote">
              «{sovnProgram.quote}»
              <cite>{FIRM_NAME}</cite>
            </blockquote>
          </div>
        </section>

        <section className="lp-section">
          <div className="lp-shell">
            <div className="lp-section__head">
              <p className="lp-kicker">Ofte stilte spørsmål</p>
              <h2>Godt å vite på forhånd</h2>
            </div>
            <div className="lp-faq">
              {sovnProgram.faqs.map((item, index) => (
                <details key={item.q} open={index === 0}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section">
          <div className="lp-shell">
            <div className="lp-band">
              <h3>{sovnProgram.ctaTitle}</h3>
              <a className="lp-btn" href={mailto}>
                {sovnProgram.cta}
              </a>
            </div>
          </div>
        </section>

        <section className="lp-section" id="kontakt">
          <div className="lp-shell">
            <div className="lp-section__head">
              <p className="lp-kicker">Kontakt</p>
              <h2>Ta kontakt når du er klar</h2>
              <p className="lp-lede">{contactCta.note}</p>
            </div>
            <div className="lp-contact">
              <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <span>{ADDRESS}</span>
              <span>
                {FIRM_NAME} · Org.nr {ORG_NR}
              </span>
            </div>
          </div>
        </section>
      </main>

      <footer className="lp-footer">
        <div className="lp-shell lp-footer__inner">
          <a href="?page=hjem" aria-label={FIRM_NAME}>
            <ClientLogo className="lp-footer__logo" variant="wordmark" />
          </a>
          <span>
            © {FIRM_NAME} ·{' '}
            <a href={`?page=hjem&design=${design}`}>Tilbake til forsiden</a>
          </span>
          <ProposalLinks design={design} />
        </div>
      </footer>
    </div>
  )
}
