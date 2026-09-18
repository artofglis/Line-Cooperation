import {
  DesignId,
  EMAIL,
  contactCta,
  methodDetails,
  methods,
  methodsPage,
} from '../content'
import { ContentHero, ContentShell } from './ContentShell'

type Props = { design: DesignId }

export default function MetoderPage({ design }: Props) {
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(
    'Forespørsel — metoder',
  )}&body=${encodeURIComponent(
    'Hei,\n\nJeg ønsker å sende en forespørsel etter å ha lest om metodene.\n\nVennlig hilsen\n',
  )}`

  const others = methods.filter(
    (m) => !methodDetails.some((detail) => detail.title === m.title),
  )

  return (
    <ContentShell design={design} page="metoder" meta="Metoder">
      <ContentHero
        design={design}
        eyebrow={methodsPage.eyebrow}
        headline={methodsPage.headline}
        lede={methodsPage.lede}
        ctaHref={mailto}
        ctaLabel={contactCta.short}
      />

      <section className="lp-section">
        <div className="lp-shell">
          <p className="lp-meta">{methodsPage.legal}</p>
        </div>
      </section>

      {methodDetails.map((method) => (
        <section className="lp-section" id={method.slug} key={method.slug}>
          <div className="lp-shell">
            <div className="lp-section__head">
              <p className="lp-kicker">{method.eyebrow}</p>
              <h2>{method.title}</h2>
              <p className="lp-lede">{method.lede}</p>
            </div>
            <h3 className="lp-subhead">Hva metoden går ut på</h3>
            <ul className="lp-list">
              {method.what.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3 className="lp-subhead">Hvordan en time typisk foregår</h3>
            <p className="lp-lede lp-lede--wide">{method.session}</p>
            <h3 className="lp-subhead">Hvem det kan passe for</h3>
            <p className="lp-lede lp-lede--wide">{method.fit}</p>
            <div className="lp-actions">
              <a className="lp-btn" href={mailto}>
                {contactCta.short}
              </a>
            </div>
          </div>
        </section>
      ))}

      <section className="lp-section">
        <div className="lp-shell">
          <div className="lp-section__head">
            <p className="lp-kicker">Oversikt</p>
            <h2>{methodsPage.moreTitle}</h2>
          </div>
          <ul className="lp-list">
            {others.map((m) => (
              <li key={m.title}>
                <span>
                  <strong>{m.title}.</strong> {m.text}
                </span>
              </li>
            ))}
          </ul>
          <p className="lp-meta">{methodsPage.ctaNote}</p>
          <div className="lp-actions">
            <a className="lp-btn" href={mailto}>
              {contactCta.kartlegging}
            </a>
            <a className="lp-btn lp-btn--ghost" href={`?page=time&design=${design}`}>
              Slik foregår en time
            </a>
          </div>
        </div>
      </section>
    </ContentShell>
  )
}
