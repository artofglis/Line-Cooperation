import { DesignId, EMAIL, contactCta, faqPage } from '../content'
import { ContentHero, ContentShell } from './ContentShell'

type Props = { design: DesignId }

export default function FaqPage({ design }: Props) {
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(
    'Forespørsel — FAQ',
  )}&body=${encodeURIComponent(
    'Hei,\n\nJeg har et spørsmål / ønsker å sende en forespørsel.\n\nVennlig hilsen\n',
  )}`

  return (
    <ContentShell design={design} page="faq" meta="Ofte stilte spørsmål">
      <ContentHero
        design={design}
        eyebrow={faqPage.eyebrow}
        headline={faqPage.headline}
        lede={faqPage.lede}
        ctaHref={mailto}
        ctaLabel={contactCta.short}
      />

      <section className="lp-section">
        <div className="lp-shell">
          <div className="lp-faq">
            {faqPage.items.map((item, index) => (
              <details key={item.q} open={index === 0}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
          <div className="lp-actions" style={{ marginTop: '1.5rem' }}>
            <a className="lp-btn" href={mailto}>
              {contactCta.kartlegging}
            </a>
            <a className="lp-btn lp-btn--ghost" href={`?page=time&design=${design}`}>
              Slik foregår en time
            </a>
            <a className="lp-btn lp-btn--ghost" href={`?page=metoder&design=${design}`}>
              Se metodene
            </a>
          </div>
        </div>
      </section>
    </ContentShell>
  )
}
