import { useEffect } from 'react'
import { FIRM_NAME, legalSections } from '../content'
import './legal-disclosure.css'

type Props = {
  /** Design-spesifikk modifier, f.eks. `legal-disclosure--d1` */
  variant: 'd1' | 'd2' | 'd3' | 'd4' | 'd5' | 'd6'
  /** Valgfri shell-klasse fra designet */
  shellClassName?: string
}

/** Kollapsbar personvern / vilkår / om tjenestene — åpnes også via hash-lenker. */
export function LegalDisclosure({ variant, shellClassName }: Props) {
  useEffect(() => {
    const openFromHash = () => {
      const id = window.location.hash.replace(/^#/, '')
      if (!id) return
      const el = document.getElementById(id)
      if (!(el instanceof HTMLDetailsElement)) return
      el.open = true
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
    openFromHash()
    window.addEventListener('hashchange', openFromHash)
    return () => window.removeEventListener('hashchange', openFromHash)
  }, [])

  return (
    <section
      className={`legal-disclosure legal-disclosure--${variant}`}
      id="juridisk"
      aria-label="Personvern, vilkår og om tjenestene"
    >
      <div className={shellClassName ?? 'legal-disclosure__shell'}>
        <div className="legal-disclosure__head">
          <p className="legal-disclosure__eyebrow">Praktisk informasjon</p>
          <h2 className="legal-disclosure__title">
            Personvern, vilkår og om tjenestene
          </h2>
          <p className="legal-disclosure__lede">
            Trykk for å lese mer. Informasjonen er nøktern og holdes samlet her,
            slik at hovedsidene forblir rolige.
          </p>
        </div>

        <div className="legal-disclosure__list">
          {legalSections.map((section) => (
            <details
              key={section.id}
              className="legal-disclosure__item"
              id={section.id}
            >
              <summary className="legal-disclosure__summary">
                <span>{section.title}</span>
                <span className="legal-disclosure__icon" aria-hidden="true" />
              </summary>
              <div className="legal-disclosure__body">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>
                    {paragraph.replaceAll('{FIRM_NAME}', FIRM_NAME)}
                  </p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
