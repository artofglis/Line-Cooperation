import type { Section, HeroContent, TextContent, ImageTextContent } from '../lib/sections'
import { MediaPicker } from './MediaPicker'

type Props = {
  section: Section
  onChange: (content: Record<string, unknown>) => void
}

export function SectionEditForm({ section, onChange }: Props) {
  if (section.type === 'hero') {
    const content = section.content as HeroContent
    const set = (patch: Partial<HeroContent>) => onChange({ ...content, ...patch })
    return (
      <div className="editor-form">
        <label>
          Bilde
          <MediaPicker value={content.imageKey} onChange={(imageKey) => set({ imageKey })} />
        </label>
        <label>
          Overskrift / sitat
          <textarea value={content.quote || ''} onChange={(e) => set({ quote: e.target.value })} rows={2} />
        </label>
        <label>
          Undertekst
          <textarea value={content.lede || ''} onChange={(e) => set({ lede: e.target.value })} rows={2} />
        </label>
        <div className="editor-form__row">
          <label>
            Knappetekst
            <input value={content.ctaLabel || ''} onChange={(e) => set({ ctaLabel: e.target.value })} />
          </label>
          <label>
            Knappelenke
            <input value={content.ctaHref || ''} onChange={(e) => set({ ctaHref: e.target.value })} placeholder="#kontakt" />
          </label>
        </div>
      </div>
    )
  }

  if (section.type === 'text') {
    const content = section.content as TextContent
    const set = (patch: Partial<TextContent>) => onChange({ ...content, ...patch })
    return (
      <div className="editor-form">
        <label>
          Kort merkelapp (valgfritt)
          <input value={content.eyebrow || ''} onChange={(e) => set({ eyebrow: e.target.value })} />
        </label>
        <label>
          Overskrift
          <input value={content.title || ''} onChange={(e) => set({ title: e.target.value })} />
        </label>
        <label>
          Tekst
          <textarea value={content.body || ''} onChange={(e) => set({ body: e.target.value })} rows={4} />
        </label>
      </div>
    )
  }

  if (section.type === 'image_text') {
    const content = section.content as ImageTextContent
    const set = (patch: Partial<ImageTextContent>) => onChange({ ...content, ...patch })
    return (
      <div className="editor-form">
        <label>
          Bilde
          <MediaPicker value={content.imageKey} onChange={(imageKey) => set({ imageKey })} />
        </label>
        <label>
          Bildeplassering
          <select
            value={content.imagePosition || 'left'}
            onChange={(e) => set({ imagePosition: e.target.value as 'left' | 'right' })}
          >
            <option value="left">Venstre</option>
            <option value="right">Høyre</option>
          </select>
        </label>
        <label>
          Kort merkelapp (valgfritt)
          <input value={content.eyebrow || ''} onChange={(e) => set({ eyebrow: e.target.value })} />
        </label>
        <label>
          Overskrift
          <input value={content.title || ''} onChange={(e) => set({ title: e.target.value })} />
        </label>
        <label>
          Tekst
          <textarea value={content.body || ''} onChange={(e) => set({ body: e.target.value })} rows={4} />
        </label>
      </div>
    )
  }

  return null
}
