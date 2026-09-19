import type { ReactNode } from 'react'
import {
  ADDRESS,
  DesignId,
  EMAIL,
  FIRM_NAME,
  PHONE_DISPLAY,
  PHONE_HREF,
  contactCta,
} from '../content'
import { ClientLogo, ClientMarkBg } from '../components/ClientLogo'
import { ProposalLinks } from '../components/ProposalLinks'
import './landing.css'

type Props = {
  design: DesignId
  page: string
  meta: string
  children: ReactNode
}

export function ContentShell({ design, page, meta, children }: Props) {
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(
    'Forespørsel',
  )}&body=${encodeURIComponent(
    'Hei,\n\nJeg ønsker å sende en forespørsel.\n\nVennlig hilsen\n',
  )}`

  return (
    <div className="lp" data-theme={design} data-page={page}>
      <header className="lp-nav">
        <div className="lp-shell lp-nav__inner">
          <a href={`?page=hjem&design=${design}`} aria-label={FIRM_NAME}>
            <ClientLogo className="lp-nav__logo" variant="ring" />
          </a>
          <p className="lp-nav__meta">{meta}</p>
          <a className="lp-nav__cta" href={mailto}>
            {contactCta.short}
          </a>
        </div>
      </header>

      <main>{children}</main>

      <footer className="lp-footer">
        <div className="lp-shell lp-footer__inner">
          <a href={`?page=hjem&design=${design}`} aria-label={FIRM_NAME}>
            <ClientLogo className="lp-footer__logo" variant="wordmark" />
          </a>
          <span>
            © {FIRM_NAME} ·{' '}
            <a href={`?page=hjem&design=${design}`}>Tilbake til forsiden</a>
          </span>
          <p className="lp-footer__contact">
            <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
            {' · '}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            {' · '}
            {ADDRESS}
          </p>
          <ProposalLinks design={design} />
        </div>
      </footer>
    </div>
  )
}

export function ContentHero({
  design,
  eyebrow,
  headline,
  lede,
  ctaHref,
  ctaLabel,
  imageSrc = '/images/path.svg',
  imageAlt = '',
  imageWidth = 1600,
  imageHeight = 1200,
}: {
  design: DesignId
  eyebrow: string
  headline: string
  lede: string
  ctaHref: string
  ctaLabel: string
  imageSrc?: string
  imageAlt?: string
  imageWidth?: number
  imageHeight?: number
}) {
  return (
    <section className="lp-hero">
      <ClientMarkBg className="lp-hero__mark-bg client-mark-bg--soft" />
      <div className="lp-shell lp-hero__grid">
        <div className="lp-hero__copy">
          <p className="lp-kicker">{eyebrow}</p>
          <h1>{headline}</h1>
          <p className="lp-lede">{lede}</p>
          <div className="lp-actions">
            <a className="lp-btn" href={ctaHref}>
              {ctaLabel}
            </a>
          </div>
        </div>
        <figure className="lp-figure">
          {(design === 3 || design === 5) && (
            <span className="lp-enso" aria-hidden="true" />
          )}
          <img
            src={imageSrc}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            fetchPriority="high"
          />
        </figure>
      </div>
    </section>
  )
}
