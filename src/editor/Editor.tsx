import { useEffect, useState } from 'react'
import {
  useSections,
  createSection,
  updateSection,
  deleteSection,
  updateSettings,
  type Section,
  type SectionType,
} from '../lib/sections'
import { SectionEditForm } from './SectionEditForm'
import { SectionRenderer } from '../components/sections/SectionRenderer'
import './editor.css'

const SECTION_LABELS: Record<SectionType, string> = {
  hero: 'Hero (toppseksjon)',
  text: 'Tekst',
  image_text: 'Bilde + tekst',
}

const DEFAULT_CONTENT: Record<SectionType, Record<string, unknown>> = {
  hero: { quote: '[Overskrift]', lede: '', ctaLabel: 'Send forespørsel', ctaHref: '#kontakt', imageKey: '' },
  text: { eyebrow: '', title: '[Overskrift]', body: '' },
  image_text: { eyebrow: '', title: '[Overskrift]', body: '', imageKey: '', imagePosition: 'left' },
}

const PAGE = 'hjem'

export function Editor() {
  const { sections, settings, loading, error, reload } = useSections(PAGE)
  const [drafts, setDrafts] = useState<Record<number, Record<string, unknown>>>({})
  const [savingId, setSavingId] = useState<number | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    const next: Record<number, Record<string, unknown>> = {}
    for (const section of sections) next[section.id] = section.content as Record<string, unknown>
    setDrafts(next)
  }, [sections])

  async function handleSave(section: Section) {
    setSavingId(section.id)
    try {
      await updateSection(section.id, { content: drafts[section.id] })
      reload()
    } catch (err) {
      window.alert((err as Error).message)
    } finally {
      setSavingId(null)
    }
  }

  async function handleDelete(section: Section) {
    if (!window.confirm('Slette denne seksjonen?')) return
    setBusy(true)
    try {
      await deleteSection(section.id)
      reload()
    } finally {
      setBusy(false)
    }
  }

  async function handleToggleVisible(section: Section) {
    setBusy(true)
    try {
      await updateSection(section.id, { visible: !section.visible })
      reload()
    } finally {
      setBusy(false)
    }
  }

  async function handleMove(section: Section, direction: -1 | 1) {
    const sorted = [...sections].sort((a, b) => a.position - b.position)
    const index = sorted.findIndex((s) => s.id === section.id)
    const swapWith = sorted[index + direction]
    if (!swapWith) return
    setBusy(true)
    try {
      await Promise.all([
        updateSection(section.id, { position: swapWith.position }),
        updateSection(swapWith.id, { position: section.position }),
      ])
      reload()
    } finally {
      setBusy(false)
    }
  }

  async function handleAdd(type: SectionType) {
    setBusy(true)
    try {
      await createSection(PAGE, type, DEFAULT_CONTENT[type])
      reload()
    } finally {
      setBusy(false)
    }
  }

  async function handleSettingChange(key: string, value: string) {
    setBusy(true)
    try {
      await updateSettings({ [key]: value })
      reload()
    } finally {
      setBusy(false)
    }
  }

  if (loading) return <div className="editor-shell"><p>Laster…</p></div>
  if (error) return <div className="editor-shell"><p className="editor-error">{error}</p></div>

  const sorted = [...sections].sort((a, b) => a.position - b.position)

  return (
    <div className="editor-shell">
      <header className="editor-header">
        <h1>Rediger forsiden</h1>
        <a className="editor-btn editor-btn--ghost" href="/">
          Se siden
        </a>
      </header>

      <section className="editor-panel">
        <h2>Innstillinger</h2>
        <div className="editor-form__row">
          <label className="editor-checkbox">
            <input
              type="checkbox"
              checked={settings.tilbud_visible !== '0'}
              onChange={(e) => handleSettingChange('tilbud_visible', e.target.checked ? '1' : '0')}
            />
            Vis kampanjeside
          </label>
        </div>
      </section>

      <div className="editor-layout">
        <div className="editor-sections">
          <h2>Seksjoner på forsiden</h2>
          {sorted.map((section, index) => (
            <article key={section.id} className={`editor-card ${section.visible ? '' : 'is-hidden'}`}>
              <header className="editor-card__head">
                <span className="editor-card__type">{SECTION_LABELS[section.type] || section.type}</span>
                <div className="editor-card__actions">
                  <button type="button" disabled={index === 0 || busy} onClick={() => handleMove(section, -1)}>
                    ↑
                  </button>
                  <button type="button" disabled={index === sorted.length - 1 || busy} onClick={() => handleMove(section, 1)}>
                    ↓
                  </button>
                  <button type="button" onClick={() => handleToggleVisible(section)} disabled={busy}>
                    {section.visible ? 'Skjul' : 'Vis'}
                  </button>
                  <button type="button" className="editor-btn--danger" onClick={() => handleDelete(section)} disabled={busy}>
                    Slett
                  </button>
                </div>
              </header>
              <SectionEditForm
                section={{ ...section, content: drafts[section.id] || section.content }}
                onChange={(content) => setDrafts((d) => ({ ...d, [section.id]: content }))}
              />
              <button
                type="button"
                className="editor-btn"
                onClick={() => handleSave(section)}
                disabled={savingId === section.id}
              >
                {savingId === section.id ? 'Lagrer…' : 'Lagre'}
              </button>
            </article>
          ))}

          <div className="editor-add">
            <p>Legg til seksjon:</p>
            <div className="editor-form__row">
              {(Object.keys(SECTION_LABELS) as SectionType[]).map((type) => (
                <button key={type} type="button" className="editor-btn editor-btn--ghost" onClick={() => handleAdd(type)} disabled={busy}>
                  + {SECTION_LABELS[type]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="editor-preview">
          <h2>Forhåndsvisning</h2>
          <div className="editor-preview__frame">
            {sorted.map((section) => (
              <SectionRenderer key={section.id} section={{ ...section, content: drafts[section.id] || section.content }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
