import { FormEvent, useEffect, useState } from 'react'
import {
  ADDRESS,
  EMAIL,
  FIRM_NAME,
  ORG_NR,
  PHONE_DISPLAY,
  PHONE_HREF,
  aboutNote,
  closingWish,
  contactCta,
  designHeroCopy,
  designSectionCopy,
  helpAreas,
  methods,
  midBanners,
  navLinks,
  storyParagraphs,
} from '../content'
import { LegalDisclosure } from '../components/LegalDisclosure'
import { ClientLogo } from '../components/ClientLogo'
import { MidBanner } from '../components/MidBanner'
import { ProposalLinks } from '../components/ProposalLinks'
import { useSections, findHero, extraSections } from '../lib/sections'
import { SectionList } from '../components/sections/SectionRenderer'
import './design03.css'

function useReveal() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.d3')
    if (!root) return
    const nodes = Array.from(root.querySelectorAll<HTMLElement>('.d3-reveal'))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])
}

function BrushMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 40"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M8 22 C48 8 88 34 128 18 C168 4 198 28 232 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.22"
      />
    </svg>
  )
}

export default function Design03() {
  const copy = designSectionCopy[3]
  const { sections } = useSections('hjem')
  const heroOverride = findHero(sections)
  const extras = extraSections(sections)
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)
  useReveal()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const message = String(data.get('message') || '').trim()
    const subject = encodeURIComponent(`Henvendelse fra ${name || 'nettsiden'}`)
    const body = encodeURIComponent(
      `Navn: ${name}\nE-post: ${email}\n\n${message}`,
    )
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
    setSent(true)
    form.reset()
  }

  return (
    <div className="d3">
      <div className="d3-grain" aria-hidden="true" />

      <header className="d3-nav">
        <div className="d3-shell d3-nav__inner">
          <a href="#top" className="d3-nav__brand" aria-label={FIRM_NAME}>
            <ClientLogo className="d3-nav__logo" variant="ring" />
          </a>
          <nav aria-label="Hovedmeny">
            <ul className="d3-nav__links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <a className="d3-nav__cta" href="#kontakt">
            {copy.navCta}
          </a>
          <button
            className="d3-nav__toggle"
            type="button"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="sr-only">Meny</span>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
        {menuOpen ? (
          <ul className="d3-nav__mobile">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <main id="top">
        <section className="d3-hero">
          <ClientLogo className="d3-hero__enso" variant="ring" title="" />
          <div className="d3-shell d3-hero__grid">
            <div className="d3-hero__visual">
              <div className="d3-hero__frame-wrap">
                <figure className="d3-hero__frame">
                  <img
                    className="d3-hero__photo"
                    src="/images/path.svg"
                    alt=""
                    width={1600}
                    height={1200}
                  />
                </figure>
              </div>
              <p className="d3-hero__caption">Rom for stillhet</p>
            </div>
            <div className="d3-hero__copy">
              <ClientLogo
                className="d3-hero__enso d3-hero__enso--inline"
                variant="ring"
                title=""
              />
              <p className="d3-eyebrow">[By] · [Region]</p>
              <h1>{heroOverride?.quote || designHeroCopy[3].quote}</h1>
              <BrushMark className="d3-hero__brush" />
              <p className="d3-hero__lede">{heroOverride?.lede || designHeroCopy[3].lede}</p>
              <div className="d3-hero__actions">
                <a className="d3-btn" href={copy.heroPrimary.href}>
                  {copy.heroPrimary.label}
                </a>
                <a className="d3-btn d3-btn--quiet" href={copy.heroSecondary.href}>
                  {copy.heroSecondary.label}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="d3-section" id="hjelp">
          <div className="d3-shell">
            <div className="d3-reveal d3-section__head">
              <p className="d3-eyebrow">{copy.helpEyebrow}</p>
              <h2>{copy.helpTitle}</h2>
              {copy.helpIntro ? <p>{copy.helpIntro}</p> : null}
            </div>
            <div className="d3-help">
              {helpAreas.map((area, index) => (
                <article key={area.title} className="d3-help__item d3-reveal">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{area.title}</h3>
                  <p>{area.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="d3-signature" id="pakke">
          <div className="d3-shell d3-signature__inner">
            <div className="d3-signature__art" aria-hidden="true">
              <ClientLogo className="d3-signature__enso" variant="ring" title="" />
            </div>
            <div className="d3-reveal">
              <p className="d3-eyebrow">{copy.signatureEyebrow}</p>
              <h2>{copy.signatureTitle}</h2>
              <p>{copy.signatureIntro}</p>
              <ul>
                <li>[Kort punkt om hva som er inkludert]</li>
                <li>Verktøy etter behov — ikke en fast mal</li>
                <li>Respekt for ditt tempo og din prosess</li>
              </ul>
              <a className="d3-btn" href="?page=signatur&design=3">
                {copy.signatureCta}
              </a>
            </div>
          </div>
        </section>

        <section className="d3-section d3-about" id="om">
          <div className="d3-shell d3-about__grid">
            <figure className="d3-about__portrait d3-reveal">
              <img
                src="/images/portrett.svg"
                alt={`Portrett, innehaver av ${FIRM_NAME}`}
                width={534}
                height={534}
              />
            </figure>
            <div className="d3-about__copy d3-reveal">
              <p className="d3-eyebrow">{copy.aboutEyebrow}</p>
              <h2>{copy.aboutTitle}</h2>
              {storyParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
              <blockquote>«{aboutNote}»</blockquote>
            </div>
          </div>
        </section>

        <section className="d3-wish">
          <div className="d3-shell d3-reveal">
            <BrushMark className="d3-wish__brush" />
            <p className="d3-eyebrow">Ønsket for den som kommer</p>
            <blockquote>«{closingWish}»</blockquote>
          </div>
        </section>

        <section className="d3-section" id="metoder">
          <div className="d3-shell">
            <div className="d3-reveal d3-section__head">
              <p className="d3-eyebrow">{copy.methodsEyebrow}</p>
              <h2>{copy.methodsTitle}</h2>
              <p>{copy.methodsIntro}</p>
            </div>
            <div className="d3-methods">
              {methods.map((method, index) => (
                <article key={method.title} className="d3-methods__item d3-reveal">
                  <span className="d3-methods__index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="d3-methods__body">
                    <p className="d3-methods__when">{method.when}</p>
                    <h3>{method.title}</h3>
                    <p>{method.text}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="d3-note d3-reveal">
              [Bransjespesifikk friskrivelse — tilpass etter kundens bransje og
              evt. lovkrav]
            </p>
          </div>
        </section>

        <MidBanner variant="d3" {...midBanners.d3} />

        <section className="d3-section d3-prices" id="priser">
          <div className="d3-shell">
            <div className="d3-reveal d3-section__head">
              <p className="d3-eyebrow">{copy.pricesEyebrow}</p>
              <h2>{copy.pricesTitle}</h2>
              {copy.pricesIntro ? <p>{copy.pricesIntro}</p> : null}
            </div>
            <div className="d3-pricegrid">
              <article className="d3-price d3-reveal">
                <h3>Kartlegging</h3>
                <p className="d3-price__amount">Gratis</p>
                <p>[XX] min · uforpliktende</p>
              </article>
              <article className="d3-price d3-price--lead d3-reveal">
                <p className="d3-price__label">Anbefalt</p>
                <h3>[Hovedpakke]</h3>
                <p className="d3-price__amount">X XXX kr</p>
                <p>[Antall] timer · individuelt tilpasset</p>
              </article>
              <article className="d3-price d3-reveal">
                <h3>Enkelttimer</h3>
                <p className="d3-price__amount">Etter avtale</p>
                <p>[XX] min · etter kartlegging</p>
              </article>
            </div>
            <p className="d3-note d3-reveal">Priser i NOK inkl. mva.</p>
          </div>
        </section>

        <section className="d3-section" id="kontakt">
          <div className="d3-shell d3-contact">
            <div className="d3-reveal">
              <p className="d3-eyebrow">Kontakt</p>
              <h2>{copy.contactTitle}</h2>
              <p className="d3-contact__intro">{copy.contactNote}</p>
              <div className="d3-contact__details">
                <p>
                  <strong>{FIRM_NAME}</strong>
                  <br />
                  Enkeltpersonforetak · Org.nr {ORG_NR}
                  <br />
                  {ADDRESS}
                </p>
                <p>
                  <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
                  <br />
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </p>
              </div>
            </div>
            <form className="d3-form d3-reveal" onSubmit={handleSubmit}>
              <label>
                Navn
                <input name="name" required autoComplete="name" />
              </label>
              <label>
                E-post
                <input name="email" type="email" required autoComplete="email" />
              </label>
              <label>
                Melding
                <textarea name="message" required placeholder="Noen setninger er nok." />
              </label>
              <button className="d3-btn" type="submit">
                {contactCta.short}
              </button>
              <p className="d3-note">
                {sent
                  ? 'E-postprogrammet ditt åpnes.'
                  : 'Opplysningene brukes kun for å svare deg.'}
              </p>
            </form>
          </div>
        </section>

        <SectionList sections={extras} />

        <LegalDisclosure variant="d3" shellClassName="d3-shell" />
      </main>

      <footer className="d3-footer">
        <div className="d3-shell d3-footer__inner">
          <ClientLogo className="d3-footer__logo" variant="wordmark" />
          <p>
            © {new Date().getFullYear()} {FIRM_NAME}
            <br />
            {ADDRESS} · {PHONE_DISPLAY}
          </p>
          <ProposalLinks design={3} />
        </div>
      </footer>
    </div>
  )
}
