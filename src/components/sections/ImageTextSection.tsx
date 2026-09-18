import type { ImageTextContent } from '../../lib/sections'
import { mediaUrl } from '../../lib/sections'
import './sections.css'

export function ImageTextSection({ content }: { content: ImageTextContent }) {
  const reversed = content.imagePosition === 'right'
  return (
    <section className={`cms-section cms-image-text ${reversed ? 'is-reversed' : ''}`}>
      <div className="cms-section__shell cms-image-text__grid">
        <div className="cms-image-text__media">
          {content.imageKey ? <img src={mediaUrl(content.imageKey)} alt="" /> : <div className="cms-image-text__placeholder" />}
        </div>
        <div className="cms-image-text__copy">
          {content.eyebrow ? <p className="cms-eyebrow">{content.eyebrow}</p> : null}
          {content.title ? <h2>{content.title}</h2> : null}
          {content.body ? <p className="cms-body">{content.body}</p> : null}
        </div>
      </div>
    </section>
  )
}
