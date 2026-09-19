import {
  DesignId,
  EMAIL,
  FIRM_NAME,
  aboutNote,
  contactCta,
  omKundePage,
} from '../content'
import { ContentHero, ContentShell } from './ContentShell'

type Props = { design: DesignId }

export default function OmKunde({ design }: Props) {
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(
    'Forespørsel — Om oss',
  )}&body=${encodeURIComponent(
    'Hei,\n\nJeg har lest historien din og ønsker å sende en forespørsel.\n\nVennlig hilsen\n',
  )}`

  return (
    <ContentShell design={design} page="om" meta="Om oss">
      <ContentHero
        design={design}
        eyebrow={omKundePage.eyebrow}
        headline={omKundePage.headline}
        lede={omKundePage.lede}
        ctaHref={mailto}
        ctaLabel={contactCta.short}
        imageSrc="/images/portrett-alt.svg"
        imageAlt={`Portrett av ${FIRM_NAME}`}
        imageWidth={534}
        imageHeight={917}
      />

      <section className="lp-section">
        <div className="lp-shell lp-prose">
          {omKundePage.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-shell">
          <div className="lp-section__head">
            <p className="lp-kicker">{omKundePage.roleTitle}</p>
            <h2>«{aboutNote}»</h2>
          </div>
          <p className="lp-lede">{omKundePage.roleText}</p>
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-shell">
          <div className="lp-section__head">
            <p className="lp-kicker">Kontakt</p>
            <h2>{omKundePage.contactTitle}</h2>
          </div>
          <p className="lp-lede">{contactCta.noteLong}</p>
          <p className="lp-meta">{omKundePage.legal}</p>
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
