import { useEffect, useState } from 'react'
import { listMedia, mediaUrl, uploadMedia } from '../lib/sections'

type MediaItem = { key: string; url: string; content_type: string }

export function MediaPicker({
  value,
  onChange,
}: {
  value: string
  onChange: (key: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [media, setMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    setLoading(true)
    listMedia()
      .then(setMedia)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [open])

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError(null)
    try {
      const result = await uploadMedia(file)
      onChange(result.key)
      setOpen(false)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  return (
    <div className="editor-media-picker">
      <div className="editor-media-picker__preview">
        {value ? <img src={mediaUrl(value)} alt="" /> : <span>Ingen bilde valgt</span>}
      </div>
      <div className="editor-media-picker__actions">
        <button type="button" className="editor-btn editor-btn--ghost" onClick={() => setOpen((v) => !v)}>
          {open ? 'Lukk galleri' : 'Velg fra galleri'}
        </button>
        <label className="editor-btn editor-btn--ghost">
          {uploading ? 'Laster opp…' : 'Last opp nytt'}
          <input type="file" accept="image/*" hidden onChange={handleUpload} disabled={uploading} />
        </label>
        {value ? (
          <button type="button" className="editor-btn editor-btn--ghost" onClick={() => onChange('')}>
            Fjern
          </button>
        ) : null}
      </div>
      {error ? <p className="editor-error">{error}</p> : null}
      {open ? (
        <div className="editor-media-picker__grid">
          {loading ? <p>Laster…</p> : null}
          {!loading && media.length === 0 ? <p>Ingen bilder lastet opp ennå.</p> : null}
          {media.map((item) => (
            <button
              type="button"
              key={item.key}
              className={`editor-media-picker__item ${value === item.key ? 'is-selected' : ''}`}
              onClick={() => {
                onChange(item.key)
                setOpen(false)
              }}
            >
              <img src={mediaUrl(item.key)} alt="" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
