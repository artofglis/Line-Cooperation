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
import './design05.css'

function useReveal() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.d5')
    if (!root) return
    const nodes = Array.from(root.querySelectorAll<HTMLElement>('.d5-reveal'))
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

function SoftRing({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 220"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="110"
        cy="110"
        r="88"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="480 70"
        strokeLinecap="round"
        transform="rotate(-20 110 110)"
      />
    </svg>
  )
}

export default function Design05() {
  const copy = designSectionCopy[5]
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
    <div className="d5">
      <div className="d5-wash" aria-hidden="true" />

      <header className="d5-nav">
        <div className="d5-shell d5-nav__inner">
          <a href="#top" className="d5-nav__brand" aria-label={FIRM_NAME}>
            <ClientLogo className="d5-nav__logo" variant="ring" />
          </a>
          <nav aria-label="Hovedmeny">
            <ul className="d5-nav__links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <a className="d5-nav__cta" href="#kontakt">
            {copy.navCta}
          </a>
          <button
            className="d5-nav__toggle"
            type="button"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="sr-only">Meny</span>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
        {menuOpen ? (
          <ul className="d5-nav__mobile">
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
        <section className="d5-hero">
          <figure className="d5-hero__band">
            <img src="/images/path.svg" alt="" width={1600} height={1200} />
          </figure>
          <SoftRing className="d5-hero__ring" />
          <ClientMarkBg className="d5-hero__mark-bg client-mark-bg--soft" />
          <div className="d5-shell d5-hero__inner">
            <p className="d5-eyebrow">[By] · varmt · rolig · premium</p>
            <ClientLogo className="d5-hero__logo" variant="wordmark" />
            <span className="d5-line" aria-hidden="true" />
            <h1>{heroOverride?.quote || designHeroCopy[5].quote}</h1>
            <p className="d5-hero__lede">{heroOverride?.lede || designHeroCopy[5].lede}</p>
            <div className="d5-hero__actions">
              <a className="d5-btn" href={copy.heroPrimary.href}>
                {copy.heroPrimary.label}
              </a>
              <a className="d5-btn d5-btn--soft" href={copy.heroSecondary.href}>
                {copy.heroSecondary.label}
              </a>
            </div>
          </div>
        </section>

        <section className="d5-section" id="hjelp">
          <div className="d5-shell">
            <div className="d5-reveal d5-section__head">
              <p className="d5-eyebrow">{copy.helpEyebrow}</p>
              <h2>{copy.helpTitle}</h2>
              {copy.helpIntro ? <p>{copy.helpIntro}</p> : null}
              <span className="d5-line d5-line--left" aria-hidden="true" />
            </div>
            <div className="d5-help">
              {helpAreas.map((area) => (
                <article key={area.title} className="d5-help__item d5-reveal">
                  <h3>{area.title}</h3>
                  <p>{area.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="d5-signature" id="pakke">
          <div className="d5-shell d5-signature__card d5-reveal">
            <div>
              <p className="d5-eyebrow">{copy.signatureEyebrow}</p>
              <h2>{copy.signatureTitle}</h2>
              <span className="d5-line d5-line--left" aria-hidden="true" />
              <p>{copy.signatureIntro}</p>
              <ul>
                <li>Metoder etter behov</li>
                <li>Digitalt eller fysisk</li>
                <li>Uten lovnader om bestemt resultat</li>
              </ul>
              <a className="d5-btn" href="?page=signatur&design=5">
                {copy.signatureCta}
              </a>
            </div>
            <aside className="d5-signature__aside">
              <p>Anbefalt forløp</p>
              <strong>X XXX kr</strong>
              <span>[Antall] timer · inkl. mva</span>
            </aside>
          </div>
        </section>

        <section className="d5-section" id="om">
          <div className="d5-shell d5-about">
            <figure className="d5-about__portrait d5-reveal">
              <img
                src="/images/portrett.svg"
                alt={`Portrett, innehaver av ${FIRM_NAME}`}
                width={534}
                height={534}
              />
            </figure>
            <div className="d5-about__copy d5-reveal">
              <p className="d5-eyebrow">{copy.aboutEyebrow}</p>
              <h2>{copy.aboutTitle}</h2>
              <span className="d5-line d5-line--left" aria-hidden="true" />
              {storyParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
              <blockquote>«{aboutNote}»</blockquote>
            </div>
          </div>
        </section>

        <section className="d5-wish">
          <div className="d5-shell d5-reveal">
            <p className="d5-eyebrow">Ønsket for den som kommer</p>
            <blockquote>«{closingWish}»</blockquote>
          </div>
        </section>

        <section className="d5-section" id="metoder">
          <div className="d5-shell">
            <div className="d5-reveal d5-section__head">
              <p className="d5-eyebrow">{copy.methodsEyebrow}</p>
              <h2>{copy.methodsTitle}</h2>
              {copy.methodsIntro ? <p>{copy.methodsIntro}</p> : null}
              <span className="d5-line d5-line--left" aria-hidden="true" />
            </div>
            <div className="d5-methods">
              {methods.map((method, index) => (
                <article key={method.title} className="d5-methods__item d5-reveal">
                  <span className="d5-methods__index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="d5-methods__body">
                    <p className="d5-methods__when">{method.when}</p>
                    <h3>{method.title}</h3>
                    <p>{method.text}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="d5-note d5-reveal">
              [Bransjespesifikk friskrivelse — tilpass etter kundens bransje og
              evt. lovkrav]
            </p>
          </div>
        </section>

        <MidBanner variant="d5" {...midBanners.d5} />

        <section className="d5-section d5-prices" id="priser">
          <div className="d5-shell">
            <div className="d5-reveal d5-section__head d5-section__head--center">
              <p className="d5-eyebrow">{copy.pricesEyebrow}</p>
              <h2>{copy.pricesTitle}</h2>
              {copy.pricesIntro ? <p>{copy.pricesIntro}</p> : null}
              <span className="d5-line" aria-hidden="true" />
            </div>
            <div className="d5-pricegrid">
              <article className="d5-price d5-reveal">
                <h3>Kartlegging</h3>
                <p className="d5-price__amount">Gratis</p>
                <p>[XX] min · uforpliktende</p>
              </article>
              <article className="d5-price d5-price--lead d5-reveal">
                <p className="d5-price__label">Anbefalt</p>
                <h3>[Hovedpakke]</h3>
                <p className="d5-price__amount">X XXX kr</p>
                <p>[Antall] timer · individuelt tilpasset</p>
              </article>
              <article className="d5-price d5-reveal">
                <h3>Enkelttimer</h3>
                <p className="d5-price__amount">Etter avtale</p>
                <p>[XX] min · etter kartlegging</p>
              </article>
            </div>
            <p className="d5-note d5-note--center d5-reveal">Priser i NOK inkl. mva.</p>
          </div>
        </section>

        <section className="d5-section" id="kontakt">
          <div className="d5-shell d5-contact">
            <div className="d5-reveal">
              <p className="d5-eyebrow">Kontakt</p>
              <h2>{copy.contactTitle}</h2>
              <span className="d5-line d5-line--left" aria-hidden="true" />
              <p className="d5-note">{copy.contactNote}</p>
              <div className="d5-contact__details">
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
            <form className="d5-form d5-reveal" onSubmit={handleSubmit}>
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
              <button className="d5-btn" type="submit">
                {contactCta.short}
              </button>
              <p className="d5-note">
                {sent
                  ? 'E-postprogrammet ditt åpnes.'
                  : 'Opplysningene brukes kun for å svare deg.'}
              </p>
            </form>
          </div>
        </section>

        <SectionList sections={extras} />

        <LegalDisclosure variant="d5" shellClassName="d5-shell" />
      </main>

      <footer className="d5-footer">
        <div className="d5-shell d5-footer__inner">
          <ClientLogo className="d5-footer__logo" variant="wordmark" />
          <p>
            © {new Date().getFullYear()} {FIRM_NAME}
            <br />
            {ADDRESS} · {PHONE_DISPLAY}
          </p>
          <ProposalLinks design={5} />
        </div>
      </footer>
    </div>
  )
}
