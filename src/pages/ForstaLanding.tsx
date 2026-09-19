import {
  ADDRESS,
  DesignId,
  EMAIL,
  FIRM_NAME,
  ORG_NR,
  PHONE_DISPLAY,
  PHONE_HREF,
  contactCta,
  forstaDegSelvPage,
} from '../content'
import { ClientLogo, ClientMarkBg } from '../components/ClientLogo'
import { ProposalLinks } from '../components/ProposalLinks'
import './landing.css'

type Props = {
  design: DesignId
}

export default function ForstaLanding({ design }: Props) {
  const mailSubject = encodeURIComponent('Forespørsel — selvforståelse')
  const mailBody = encodeURIComponent(
    'Hei,\n\nJeg ønsker en uforpliktende prat om selvforståelse og mønstre.\n\nVennlig hilsen\n',
  )
  const mailto = `mailto:${EMAIL}?subject=${mailSubject}&body=${mailBody}`

  return (
    <div className="lp" data-theme={design} data-page="forsta">
      <header className="lp-nav">
        <div className="lp-shell lp-nav__inner">
          <a href={`?page=hjem&design=${design}`} aria-label={FIRM_NAME}>
            <ClientLogo className="lp-nav__logo" variant="ring" />
          </a>
          <p className="lp-nav__meta">Selvforståelse</p>
          <a className="lp-nav__cta" href={mailto}>
            {contactCta.short}
          </a>
        </div>
      </header>

      <main>
        <section className="lp-hero">
          <ClientMarkBg className="lp-hero__mark-bg client-mark-bg--soft" />
          <div className="lp-shell lp-hero__grid lp-hero__grid--flip">
            <div className="lp-hero__copy">
              <p className="lp-kicker">{forstaDegSelvPage.eyebrow}</p>
              <h1>{forstaDegSelvPage.headline}</h1>
              <p className="lp-lede">{forstaDegSelvPage.lede}</p>
              <div className="lp-actions">
                <a className="lp-btn" href={mailto}>
                  {forstaDegSelvPage.cta}
                </a>
                <a
                  className="lp-btn lp-btn--ghost"
                  href={`?page=signatur&design=${design}`}
                >
                  Om [Pakkenavn]
                </a>
              </div>
            </div>
            <figure className="lp-figure lp-figure--poster">
              <img
                src={forstaDegSelvPage.heroImage}
                alt={forstaDegSelvPage.heroImageAlt}
                width={1254}
                height={1254}
                fetchPriority="high"
              />
            </figure>
          </div>
        </section>

        <section className="lp-section">
          <div className="lp-shell lp-poster-split">
            <figure className="lp-figure lp-figure--poster">
              <img
                src={forstaDegSelvPage.secondaryImage}
                alt={forstaDegSelvPage.secondaryImageAlt}
                width={1149}
                height={1369}
                loading="lazy"
              />
            </figure>
            <div>
              <div className="lp-section__head">
                <p className="lp-kicker">Forstå deg selv bedre</p>
                <h2>Et roligere møte med deg selv</h2>
              </div>
              <div className="lp-prose">
                {forstaDegSelvPage.body.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="lp-section">
          <div className="lp-shell">
            <div className="lp-section__head">
              <p className="lp-kicker">{forstaDegSelvPage.themesTitle}</p>
              <h2>Det du kan ta med hit</h2>
            </div>
            <div className="lp-theme-grid">
              {forstaDegSelvPage.themes.map((theme) => (
                <article key={theme.title} className="lp-theme">
                  <h3>{theme.title}</h3>
                  <p>{theme.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section" id="kontakt">
          <div className="lp-shell">
            <div className="lp-band">
              <h3>{forstaDegSelvPage.cta}</h3>
              <a className="lp-btn" href={mailto}>
                {contactCta.short}
              </a>
            </div>
            <p className="lp-legal lp-legal--spaced">
              {forstaDegSelvPage.legal}
            </p>
            <div className="lp-contact lp-contact--spaced">
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
