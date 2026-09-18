import type { TextContent } from '../../lib/sections'
import './sections.css'

export function TextSection({ content }: { content: TextContent }) {
  return (
    <section className="cms-section">
      <div className="cms-section__shell">
        {content.eyebrow ? <p className="cms-eyebrow">{content.eyebrow}</p> : null}
        {content.title ? <h2>{content.title}</h2> : null}
        {content.body ? <p className="cms-body">{content.body}</p> : null}
      </div>
    </section>
  )
}
