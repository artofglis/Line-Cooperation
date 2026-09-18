import { useEffect, useState } from 'react'

export type SectionType = 'hero' | 'text' | 'image_text'

export type HeroContent = {
  quote: string
  lede: string
  ctaLabel: string
  ctaHref: string
  imageKey: string
}

export type TextContent = {
  eyebrow: string
  title: string
  body: string
}

export type ImageTextContent = TextContent & {
  imageKey: string
  imagePosition: 'left' | 'right'
}

export type Section = {
  id: number
  page: string
  type: SectionType
  position: number
  visible: boolean
  content: HeroContent | TextContent | ImageTextContent | Record<string, unknown>
}

export type Settings = Record<string, string>

export function mediaUrl(key: string): string {
  if (!key) return ''
  return key.startsWith('/media/') ? key : `/media/${key}`
}

/** Redigert hero for forsiden, om eier har lagt inn en — ellers null (fall tilbake til statisk tekst). */
export function findHero(sections: Section[]): HeroContent | null {
  const hero = sections.find((s) => s.type === 'hero' && s.visible)
  return hero ? (hero.content as HeroContent) : null
}

/** Ekstra seksjoner eier har lagt til (utenom hero), i lagret rekkefølge. */
export function extraSections(sections: Section[]): Section[] {
  return sections.filter((s) => s.type !== 'hero' && s.visible)
}

async function jsonOrThrow(response: Response) {
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error((data as { error?: string }).error || `Feil (${response.status})`)
  }
  return data
}

export function useSections(page: string) {
  const [sections, setSections] = useState<Section[]>([])
  const [settings, setSettings] = useState<Settings>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadToken, setReloadToken] = useState(0)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    fetch(`/api/content/${page}`)
      .then(jsonOrThrow)
      .then((data) => {
        if (cancelled) return
        setSections((data as { sections: Section[] }).sections || [])
        setSettings((data as { settings: Settings }).settings || {})
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [page, reloadToken])

  const reload = () => setReloadToken((n) => n + 1)

  return { sections, settings, loading, error, reload }
}

export async function createSection(page: string, type: SectionType, content: object) {
  return jsonOrThrow(
    await fetch('/api/admin/sections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page, type, content }),
    }),
  )
}

export async function updateSection(
  id: number,
  patch: { content?: object; position?: number; visible?: boolean },
) {
  return jsonOrThrow(
    await fetch(`/api/admin/sections/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    }),
  )
}

export async function deleteSection(id: number) {
  return jsonOrThrow(await fetch(`/api/admin/sections/${id}`, { method: 'DELETE' }))
}

export async function updateSettings(patch: Settings) {
  return jsonOrThrow(
    await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    }),
  )
}

export async function uploadMedia(file: File): Promise<{ key: string; url: string }> {
  const form = new FormData()
  form.append('file', file)
  return jsonOrThrow(await fetch('/api/admin/media', { method: 'POST', body: form })) as Promise<{
    key: string
    url: string
  }>
}

export async function listMedia(): Promise<{ key: string; url: string; content_type: string }[]> {
  const data = (await jsonOrThrow(await fetch('/api/admin/media'))) as {
    media: { key: string; url: string; content_type: string }[]
  }
  return data.media
}

export async function saveTemplate(name: string, type: SectionType, content: object) {
  return jsonOrThrow(
    await fetch('/api/admin/templates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, type, content }),
    }),
  )
}

export async function listTemplates(): Promise<
  { id: number; name: string; type: SectionType; content: object }[]
> {
  const data = (await jsonOrThrow(await fetch('/api/admin/templates'))) as {
    templates: { id: number; name: string; type: SectionType; content: object }[]
  }
  return data.templates
}
