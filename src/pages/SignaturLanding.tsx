import {
  ADDRESS,
  DesignId,
  EMAIL,
  FIRM_NAME,
  ORG_NR,
  PHONE_DISPLAY,
  PHONE_HREF,
  contactCta,
  signaturpakkenPage,
} from '../content'
import { ClientLogo, ClientMarkBg } from '../components/ClientLogo'
import { ProposalLinks } from '../components/ProposalLinks'
import './landing.css'

type Props = {
  design: DesignId
}

export default function SignaturLanding({ design }: Props) {
  const mailSubject = encodeURIComponent('Forespørsel — [Pakkenavn]')
  const mailBody = encodeURIComponent(
    'Hei,\n\nJeg ønsker mer informasjon om [Pakkenavn].\n\nVennlig hilsen\n',
  )
  const mailto = `mailto:${EMAIL}?subject=${mailSubject}&body=${mailBody}`

  return (
    <div className="lp" data-theme={design} data-page="signatur">
      <header className="lp-nav">
        <div className="lp-shell lp-nav__inner">
          <a href={`?page=hjem&design=${design}`} aria-label={FIRM_NAME}>
            <ClientLogo className="lp-nav__logo" variant="ring" />
          </a>
          <p className="lp-nav__meta">[Pakkenavn]</p>
          <a className="lp-nav__cta" href={mailto}>
            {contactCta.short}
          </a>
        </div>
      </header>

      <main>
        <section className="lp-hero">
          <ClientMarkBg className="lp-hero__mark-bg client-mark-bg--soft" />
          <div className="lp-shell lp-hero__grid">
            <div className="lp-hero__copy">
              <p className="lp-kicker">{signaturpakkenPage.eyebrow}</p>
              <h1>{signaturpakkenPage.headline}</h1>
              <p className="lp-lede">{signaturpakkenPage.lede}</p>
              <div className="lp-actions">
                <a className="lp-btn" href={mailto}>
                  {signaturpakkenPage.cta}
                </a>
                <a className="lp-btn lp-btn--ghost" href="#forlop">
                  Se forløpet
                </a>
              </div>
            </div>
            <figure className="lp-figure lp-figure--poster">
              <img
                src={signaturpakkenPage.heroImage}
                alt={signaturpakkenPage.heroImageAlt}
                width={1024}
                height={1536}
                fetchPriority="high"
              />
            </figure>
          </div>
        </section>

        <section className="lp-section" id="forlop">
          <div className="lp-shell">
            <div className="lp-section__head">
              <p className="lp-kicker">Forløpet</p>
              <h2>Tilpasset deg — ikke omvendt</h2>
            </div>
            <div className="lp-prose lp-lede--wide">
              {signaturpakkenPage.intro.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
            <ul className="lp-tools lp-tools--spaced">
              {signaturpakkenPage.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="lp-meta">{signaturpakkenPage.priceNote}</p>
          </div>
        </section>

        <section className="lp-section">
          <div className="lp-shell lp-poster-split">
            <div>
              <div className="lp-section__head">
                <p className="lp-kicker">{signaturpakkenPage.fitTitle}</p>
                <h2>Når tiden er inne</h2>
              </div>
              <ul className="lp-list">
                {signaturpakkenPage.fit.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <figure className="lp-figure lp-figure--poster">
              <img
                src={signaturpakkenPage.secondaryImage}
                alt={signaturpakkenPage.secondaryImageAlt}
                width={1024}
                height={1536}
                loading="lazy"
              />
            </figure>
          </div>
        </section>

        <section className="lp-section">
          <div className="lp-shell">
            <blockquote className="lp-quote">
              «{signaturpakkenPage.quote}»
              <cite>{FIRM_NAME}</cite>
            </blockquote>
          </div>
        </section>

        <section className="lp-section" id="kontakt">
          <div className="lp-shell">
            <div className="lp-section__head">
              <p className="lp-kicker">Kontakt</p>
              <h2>{signaturpakkenPage.cta}</h2>
              <p className="lp-lede">{contactCta.note}</p>
            </div>
            <p className="lp-legal">{signaturpakkenPage.legal}</p>
            <div className="lp-actions lp-actions--spaced">
              <a className="lp-btn" href={mailto}>
                {contactCta.kartlegging}
              </a>
              <a
                className="lp-btn lp-btn--ghost"
                href={`?page=forsta&design=${design}`}
              >
                Les om selvforståelse
              </a>
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
          <a href={`?page=hjem&design=${design}`} aria-label={FIRM_NAME}>
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
