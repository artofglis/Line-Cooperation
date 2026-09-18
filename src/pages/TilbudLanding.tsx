import {
  ADDRESS,
  DesignId,
  EMAIL,
  FIRM_NAME,
  ORG_NR,
  PHONE_DISPLAY,
  PHONE_HREF,
  contactCta,
  tilbudOffer,
} from '../content'
import { ClientLogo, ClientMarkBg } from '../components/ClientLogo'
import { ProposalLinks } from '../components/ProposalLinks'
import './landing.css'

type Props = {
  design: DesignId
}

export default function TilbudLanding({ design }: Props) {
  const mailSubject = encodeURIComponent('Tilbud — 3 timer')
  const mailBody = encodeURIComponent(
    'Hei,\n\nJeg ønsker mer informasjon om tilbudet (3 timer).\n\nVennlig hilsen\n',
  )
  const mailto = `mailto:${EMAIL}?subject=${mailSubject}&body=${mailBody}`

  return (
    <div className="lp" data-theme={design} data-page="tilbud">
      <header className="lp-nav">
        <div className="lp-shell lp-nav__inner">
          <a href="?page=hjem" aria-label={FIRM_NAME}>
            <ClientLogo className="lp-nav__logo" variant="ring" />
          </a>
          <p className="lp-nav__meta">Kampanje · [Sted]</p>
          <a className="lp-nav__cta" href="#kontakt">
            Kontakt
          </a>
        </div>
      </header>

      <main>
        <section className="lp-hero">
          <ClientMarkBg className="lp-hero__mark-bg client-mark-bg--soft" />
          <div className="lp-shell lp-hero__grid">
            <div className="lp-hero__copy">
              <p className="lp-kicker">{tilbudOffer.eyebrow}</p>
              <h1>
                {tilbudOffer.headline}
                <em>{tilbudOffer.highlight}</em>
              </h1>
              <p className="lp-lede">{tilbudOffer.intro}</p>
              <div className="lp-actions">
                <a className="lp-btn" href={mailto}>
                  Send melding
                </a>
                <a className="lp-btn lp-btn--ghost" href="#pakke">
                  Se pakketilbudet
                </a>
              </div>
            </div>
            <figure className="lp-figure lp-figure--poster">
              {(design === 3 || design === 5) && (
                <span className="lp-enso" aria-hidden="true" />
              )}
              <img
                src={tilbudOffer.image}
                alt={tilbudOffer.imageAlt}
                width={1024}
                height={1536}
                fetchPriority="high"
              />
            </figure>
          </div>
        </section>

        <section className="lp-section" id="verktoy">
          <div className="lp-shell">
            <div className="lp-section__head">
              <p className="lp-kicker">Verktøykassen</p>
              <h2>Metoder du kan møte i timene</h2>
            </div>
            <ul className="lp-tools">
              {tilbudOffer.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="lp-section" id="pakke">
          <div className="lp-shell">
            <article className="lp-offer">
              <p className="lp-offer__title">{tilbudOffer.packageTitle}</p>
              <div className="lp-offer__price">
                <span className="lp-offer__hours">{tilbudOffer.hours}</span>
                <span className="lp-offer__rate">{tilbudOffer.price}</span>
              </div>
              <p className="lp-offer__note">{tilbudOffer.priceNote}</p>
              <ul>
                {tilbudOffer.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="lp-fit">{tilbudOffer.fit}</p>
              <p className="lp-legal">{tilbudOffer.legal}</p>
              <div className="lp-actions">
                <a className="lp-btn" href={mailto}>
                  Send en forespørsel
                </a>
              </div>
            </article>
          </div>
        </section>

        <section className="lp-section" id="kontakt">
          <div className="lp-shell">
            <div className="lp-section__head">
              <p className="lp-kicker">Kontakt</p>
              <h2>{tilbudOffer.cta}</h2>
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
