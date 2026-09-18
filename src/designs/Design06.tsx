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
import { ClientLogo, ClientMarkBg } from '../components/ClientLogo'
import { MidBanner } from '../components/MidBanner'
import { ProposalLinks } from '../components/ProposalLinks'
import { useSections, findHero, extraSections } from '../lib/sections'
import { SectionList } from '../components/sections/SectionRenderer'
import './design06.css'

const beacons = [
  { label: 'Ro', text: 'Når kroppen ikke helt får lande' },
  { label: 'Klarhet', text: 'Forstå mønstrene — og velge annerledes' },
  { label: 'Tempo', text: 'Ingen hast. Ingen fasit. Tempoet er ditt.' },
] as const

function useReveal() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.d6')
    if (!root) return
    const nodes = Array.from(root.querySelectorAll<HTMLElement>('.d6-reveal'))
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

export default function Design06() {
  const copy = designSectionCopy[6]
  const { sections } = useSections('hjem')
  const heroOverride = findHero(sections)
  const extras = extraSections(sections)
  const [menuOpen, setMenuOpen] = useState(false)
  const [navSolid, setNavSolid] = useState(false)
  const [sent, setSent] = useState(false)
  useReveal()

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 36)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
    <div className="d6">
      <div className="d6-glow d6-glow--a" aria-hidden="true" />
      <div className="d6-glow d6-glow--b" aria-hidden="true" />

      <header className={`d6-nav ${navSolid ? 'is-solid' : ''}`}>
        <div className="d6-shell d6-nav__inner">
          <a href="#top" className="d6-nav__brand" aria-label={FIRM_NAME}>
            <ClientLogo className="d6-nav__logo" variant="ring" />
          </a>
          <nav aria-label="Hovedmeny">
            <ul className="d6-nav__links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <a className="d6-nav__cta" href="#kontakt">
            {copy.navCta}
          </a>
          <button
            className="d6-nav__toggle"
            type="button"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="sr-only">Meny</span>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
        {menuOpen ? (
          <ul className="d6-nav__mobile">
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
        <section className="d6-hero">
          <div className="d6-hero__media" aria-hidden="true">
            <img src="/images/hero.svg" alt="" width={2400} height={1350} />
          </div>
          <div className="d6-hero__veil" aria-hidden="true" />
          <ClientMarkBg className="d6-hero__mark-bg client-mark-bg--screen" />
          <div className="d6-shell d6-hero__inner">
            <p className="d6-eyebrow">{FIRM_NAME}</p>
            <ClientLogo className="d6-hero__logo" variant="wordmark" />
            <h1>{heroOverride?.quote || designHeroCopy[6].quote}</h1>
            <p className="d6-hero__lede">{heroOverride?.lede || designHeroCopy[6].lede}</p>
            <div className="d6-hero__actions">
              <a className="d6-btn" href={copy.heroPrimary.href}>
                {copy.heroPrimary.label}
              </a>
              <a className="d6-btn d6-btn--ghost" href={copy.heroSecondary.href}>
                {copy.heroSecondary.label}
              </a>
            </div>
          </div>
        </section>

        <section className="d6-beacons" aria-label="Tre holdninger">
          <div className="d6-shell d6-beacons__row">
            {beacons.map((item) => (
              <div key={item.label} className="d6-beacons__item d6-reveal">
                <strong>{item.label}</strong>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="d6-panel d6-panel--light" id="hjelp">
          <div className="d6-panel__glow" aria-hidden="true" />
          <div className="d6-shell">
            <div className="d6-reveal d6-panel__head">
              <p className="d6-eyebrow d6-eyebrow--dark">{copy.helpEyebrow}</p>
              <h2>{copy.helpTitle}</h2>
              {copy.helpIntro ? <p className="d6-panel__intro">{copy.helpIntro}</p> : null}
            </div>
            <div className="d6-tide">
              {helpAreas.map((area, index) => (
                <article key={area.title} className="d6-tide__row d6-reveal">
                  <span className="d6-tide__index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3>{area.title}</h3>
                    <p>{area.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="d6-signature" id="pakke">
          <div className="d6-shell d6-signature__layout">
            <div className="d6-signature__copy d6-reveal">
              <p className="d6-eyebrow">{copy.signatureEyebrow}</p>
              <h2>{copy.signatureTitle}</h2>
              <p>{copy.signatureIntro}</p>
              <ul>
                <li>[Kort punkt om hva som er inkludert]</li>
                <li>Verktøy etter behov — ikke en fast mal</li>
                <li>Respekt for ditt tempo og din prosess</li>
              </ul>
              <a className="d6-btn" href="?page=signatur&design=6">
                {copy.signatureCta}
              </a>
            </div>
            <aside className="d6-signature__dock d6-reveal">
              <p className="d6-signature__dock-label">[Hovedpakke]</p>
              <p className="d6-signature__amount">X XXX kr</p>
              <p className="d6-signature__meta">[Antall] timer · inkl. mva</p>
              <p className="d6-signature__note">
                Du booker ikke en time direkte. Send en forespørsel — så finner vi ut om, og
                når, en kartlegging passer.
              </p>
            </aside>
          </div>
        </section>

        <section className="d6-panel d6-panel--light" id="om">
          <div className="d6-panel__glow d6-panel__glow--right" aria-hidden="true" />
          <div className="d6-shell d6-about">
            <figure className="d6-about__portrait d6-reveal">
              <img
                src="/images/portrett.svg"
                alt={`Portrett, innehaver av ${FIRM_NAME}`}
                width={534}
                height={534}
              />
            </figure>
            <div className="d6-about__copy d6-reveal">
              <p className="d6-eyebrow d6-eyebrow--dark">{copy.aboutEyebrow}</p>
              <h2>{copy.aboutTitle}</h2>
              {storyParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
              <blockquote>«{aboutNote}»</blockquote>
            </div>
          </div>
        </section>

        <section className="d6-wish" aria-label="Ønsket for den som kommer">
          <div className="d6-shell d6-reveal">
            <p className="d6-eyebrow">Ønsket for den som kommer</p>
            <blockquote>«{closingWish}»</blockquote>
          </div>
        </section>

        <section className="d6-section" id="metoder">
          <div className="d6-shell">
            <div className="d6-reveal d6-section__head">
              <p className="d6-eyebrow">{copy.methodsEyebrow}</p>
              <h2>{copy.methodsTitle}</h2>
              {copy.methodsIntro ? <p>{copy.methodsIntro}</p> : null}
            </div>
            <div className="d6-methods">
              {methods.map((method, index) => (
                <article key={method.title} className="d6-methods__item d6-reveal">
                  <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="d6-methods__when">{method.when}</p>
                    <h3>{method.title}</h3>
                    <p>{method.text}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="d6-note d6-reveal">
              [Bransjespesifikk friskrivelse — tilpass etter kundens bransje og evt.
              lovkrav]
            </p>
          </div>
        </section>

        <MidBanner variant="d6" {...midBanners.d6} />

        <section className="d6-panel d6-panel--light" id="priser">
          <div className="d6-panel__glow" aria-hidden="true" />
          <div className="d6-shell">
            <div className="d6-reveal d6-panel__head d6-panel__head--center">
              <p className="d6-eyebrow d6-eyebrow--dark">{copy.pricesEyebrow}</p>
              <h2>{copy.pricesTitle}</h2>
              {copy.pricesIntro ? <p className="d6-panel__intro">{copy.pricesIntro}</p> : null}
            </div>
            <div className="d6-prices">
              <article className="d6-price d6-reveal">
                <h3>Kartlegging</h3>
                <p className="d6-price__amount">Gratis</p>
                <p>[XX] min · uforpliktende</p>
              </article>
              <article className="d6-price d6-price--lead d6-reveal">
                <p className="d6-price__label">Anbefalt</p>
                <h3>[Hovedpakke]</h3>
                <p className="d6-price__amount">X XXX kr</p>
                <p>[Antall] timer · individuelt tilpasset</p>
              </article>
              <article className="d6-price d6-reveal">
                <h3>Enkelttimer</h3>
                <p className="d6-price__amount">Etter avtale</p>
                <p>[XX] min · etter kartlegging</p>
              </article>
            </div>
            <p className="d6-note d6-note--dark d6-note--center d6-reveal">
              Priser i NOK inkl. mva.
            </p>
          </div>
        </section>

        <section className="d6-section" id="kontakt">
          <div className="d6-shell d6-contact">
            <div className="d6-contact__copy d6-reveal">
              <p className="d6-eyebrow">Kontakt</p>
              <h2>{copy.contactTitle}</h2>
              <p className="d6-note">{copy.contactNote}</p>
              <div className="d6-contact__details">
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
            <form className="d6-form d6-reveal" onSubmit={handleSubmit}>
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
                <textarea
                  name="message"
                  required
                  placeholder="Noen setninger er nok — du trenger ikke ha et ferdig spørsmål."
                />
              </label>
              <button className="d6-btn" type="submit">
                {contactCta.short}
              </button>
              <p className="d6-note d6-note--on-light">
                {sent
                  ? 'E-postprogrammet ditt åpnes.'
                  : 'Opplysningene brukes kun for å svare deg.'}
              </p>
            </form>
          </div>
        </section>

        <SectionList sections={extras} />

        <LegalDisclosure variant="d6" shellClassName="d6-shell" />
      </main>

      <footer className="d6-footer">
        <div className="d6-shell d6-footer__inner">
          <ClientLogo className="d6-footer__logo" variant="wordmark" />
          <p>
            © {new Date().getFullYear()} {FIRM_NAME}
            <br />
            {ADDRESS} · {PHONE_DISPLAY}
          </p>
          <ProposalLinks design={6} />
        </div>
      </footer>
    </div>
  )
}
