import type { HeroContent } from '../../lib/sections'
import { mediaUrl } from '../../lib/sections'
import './sections.css'

export function HeroSection({ content }: { content: HeroContent }) {
  return (
    <section className="cms-hero">
      {content.imageKey ? (
        <div className="cms-hero__media" aria-hidden="true">
          <img src={mediaUrl(content.imageKey)} alt="" />
        </div>
      ) : null}
      <div className="cms-hero__content">
        <h1>{content.quote}</h1>
        {content.lede ? <p className="cms-hero__lede">{content.lede}</p> : null}
        {content.ctaLabel ? (
          <a className="cms-btn" href={content.ctaHref || '#kontakt'}>
            {content.ctaLabel}
          </a>
        ) : null}
      </div>
    </section>
  )
}
