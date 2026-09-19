import { FormEvent, useEffect, useState } from 'react'
import {
  ADDRESS,
  EMAIL,
  FIRM_NAME,
  ORG_NR,
  PHONE_DISPLAY,
  PHONE_HREF,
  aboutNote,
  contactCta,
  design04Marquee,
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
import './design04.css'

function useReveal() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.d4')
    if (!root) return
    const nodes = Array.from(root.querySelectorAll<HTMLElement>('.d4-reveal'))
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

function GoldRule({ className }: { className?: string }) {
  return <span className={`d4-rule ${className ?? ''}`} aria-hidden="true" />
}

export default function Design04() {
  const copy = designSectionCopy[4]
  const { sections } = useSections('hjem')
  const heroOverride = findHero(sections)
  const extras = extraSections(sections)
  const [menuOpen, setMenuOpen] = useState(false)
  const [navSolid, setNavSolid] = useState(false)
  const [sent, setSent] = useState(false)
  useReveal()

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 40)
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
    <div className="d4">
      <div className="d4-sheen" aria-hidden="true" />

      <header className={`d4-nav ${navSolid ? 'is-solid' : ''}`}>
        <div className="d4-shell d4-nav__inner">
          <a href="#top" className="d4-nav__brand" aria-label={FIRM_NAME}>
            <ClientLogo className="d4-nav__logo" variant="ring" />
          </a>
          <nav aria-label="Hovedmeny">
            <ul className="d4-nav__links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <a className="d4-nav__cta" href="#kontakt">
            {copy.navCta}
          </a>
          <button
            className="d4-nav__toggle"
            type="button"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="sr-only">Meny</span>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
        {menuOpen ? (
          <ul className="d4-nav__mobile">
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
        <section className="d4-hero">
          <div className="d4-hero__media" aria-hidden="true">
            <img src="/images/hero.svg" alt="" width={2400} height={1350} />
          </div>
          <div className="d4-hero__veil" aria-hidden="true" />
          <ClientMarkBg className="d4-hero__mark-bg client-mark-bg--screen" />
          <div className="d4-shell d4-hero__layout">
            <div className="d4-hero__aside" aria-hidden="true">
              <p>[By]</p>
              <span />
              <p>[Region]</p>
            </div>
            <div className="d4-hero__content">
              <div className="d4-hero__frame">
                <p className="d4-eyebrow">{FIRM_NAME}</p>
                <ClientLogo
                  className="d4-hero__logo d4-hero__logo--wordmark"
                  variant="wordmark"
                />
                <ClientLogo
                  className="d4-hero__logo d4-hero__logo--full"
                  variant="full"
                />
                <GoldRule />
                <h1>{heroOverride?.quote || designHeroCopy[4].quote}</h1>
                <p className="d4-hero__lede">{heroOverride?.lede || designHeroCopy[4].lede}</p>
                <div className="d4-hero__actions">
                  <a className="d4-btn" href={copy.heroPrimary.href}>
                    {copy.heroPrimary.label}
                  </a>
                  <a className="d4-btn d4-btn--ghost" href={copy.heroSecondary.href}>
                    {copy.heroSecondary.label}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="d4-marquee" aria-hidden="true">
          <div className="d4-marquee__track">
            {[...design04Marquee, ...design04Marquee].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </section>

        <section className="d4-section" id="hjelp">
          <div className="d4-shell">
            <div className="d4-reveal d4-section__head">
              <p className="d4-eyebrow">{copy.helpEyebrow}</p>
              <h2>{copy.helpTitle}</h2>
              {copy.helpIntro ? <p>{copy.helpIntro}</p> : null}
              <GoldRule className="d4-rule--left" />
            </div>
            <div className="d4-help">
              {helpAreas.map((area, index) => (
                <article key={area.title} className="d4-help__item d4-reveal">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{area.title}</h3>
                  <p>{area.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="d4-signature" id="pakke">
          <div className="d4-shell d4-signature__panel d4-reveal">
            <div className="d4-signature__copy">
              <p className="d4-eyebrow">{copy.signatureEyebrow}</p>
              <h2>{copy.signatureTitle}</h2>
              <GoldRule className="d4-rule--left" />
              <p>{copy.signatureIntro}</p>
              <ul>
                <li>[Kort punkt om metoder/verktøy etter behov]</li>
                <li>Digitalt eller fysisk</li>
                <li>Uten lovnader om et bestemt resultat</li>
              </ul>
              <a className="d4-btn" href="?page=signatur&design=4">
                {copy.signatureCta}
              </a>
            </div>
            <figure className="d4-signature__visual">
              <img src="/images/path.svg" alt="" width={1600} height={1200} />
              <div className="d4-signature__badge">
                <span>[Antall] timer</span>
                <strong>X XXX kr</strong>
                <em>inkl. mva</em>
              </div>
            </figure>
          </div>
        </section>

        <section className="d4-section d4-about" id="om">
          <div className="d4-shell d4-about__grid">
            <figure className="d4-about__portrait d4-reveal">
              <div className="d4-about__frame">
                <img
                  src="/images/portrett.svg"
                  alt={`Portrett, innehaver av ${FIRM_NAME}`}
                  width={534}
                  height={534}
                />
              </div>
            </figure>
            <div className="d4-about__copy d4-reveal">
              <p className="d4-eyebrow">{copy.aboutEyebrow}</p>
              <h2>{copy.aboutTitle}</h2>
              <GoldRule className="d4-rule--left" />
              {storyParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
              <blockquote>«{aboutNote}»</blockquote>
            </div>
          </div>
        </section>

        <section className="d4-section" id="metoder">
          <div className="d4-shell">
            <div className="d4-reveal d4-section__head">
              <p className="d4-eyebrow">{copy.methodsEyebrow}</p>
              <h2>{copy.methodsTitle}</h2>
              {copy.methodsIntro ? <p>{copy.methodsIntro}</p> : null}
              <GoldRule className="d4-rule--left" />
            </div>
            <div className="d4-methods">
              {methods.map((method, index) => (
                <article key={method.title} className="d4-methods__item d4-reveal">
                  <span className="d4-methods__index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="d4-methods__body">
                    <p className="d4-methods__when">{method.when}</p>
                    <h3>{method.title}</h3>
                    <p>{method.text}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="d4-note d4-reveal">
              [Bransjespesifikk friskrivelse — tilpass etter kundens bransje og
              evt. lovkrav]
            </p>
          </div>
        </section>

        <MidBanner variant="d4" {...midBanners.d4} />

        <section className="d4-section d4-prices" id="priser">
          <div className="d4-shell">
            <div className="d4-reveal d4-section__head d4-section__head--center">
              <p className="d4-eyebrow">{copy.pricesEyebrow}</p>
              <h2>{copy.pricesTitle}</h2>
              {copy.pricesIntro ? <p>{copy.pricesIntro}</p> : null}
              <GoldRule />
            </div>
            <div className="d4-pricegrid">
              <article className="d4-price d4-reveal">
                <h3>Kartlegging</h3>
                <p className="d4-price__amount">Gratis</p>
                <p>[XX] min · uforpliktende</p>
                <a href="#kontakt">Send forespørsel</a>
              </article>
              <article className="d4-price d4-price--lead d4-reveal">
                <p className="d4-price__label">Anbefalt</p>
                <h3>[Hovedpakke]</h3>
                <p className="d4-price__amount">X XXX kr</p>
                <p>[Antall] timer · individuelt tilpasset</p>
                <a href="#kontakt">Jeg vil starte her</a>
              </article>
              <article className="d4-price d4-reveal">
                <h3>Enkelttimer</h3>
                <p className="d4-price__amount">Etter avtale</p>
                <p>[XX] min · metode etter behov</p>
                <a href="#kontakt">Ta kontakt</a>
              </article>
            </div>
            <p className="d4-note d4-note--center d4-reveal">Priser i NOK inkl. mva.</p>
          </div>
        </section>

        <section className="d4-section" id="kontakt">
          <div className="d4-shell d4-contact">
            <div className="d4-reveal">
              <p className="d4-eyebrow">Kontakt</p>
              <h2>{copy.contactTitle}</h2>
              <GoldRule className="d4-rule--left" />
              <p className="d4-note">{copy.contactNote}</p>
              <div className="d4-contact__details">
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
            <form className="d4-form d4-reveal" onSubmit={handleSubmit}>
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
              <button className="d4-btn" type="submit">
                {contactCta.short}
              </button>
              <p className="d4-note">
                {sent
                  ? 'E-postprogrammet ditt åpnes.'
                  : 'Opplysningene brukes kun for å svare deg.'}
              </p>
            </form>
          </div>
        </section>

        <SectionList sections={extras} />

        <LegalDisclosure variant="d4" shellClassName="d4-shell" />
      </main>

      <footer className="d4-footer">
        <div className="d4-shell d4-footer__inner">
          <ClientLogo className="d4-footer__logo" variant="wordmark" />
          <p>
            © {new Date().getFullYear()} {FIRM_NAME}
            <br />
            {ADDRESS} · {PHONE_DISPLAY}
          </p>
          <ProposalLinks design={4} />
        </div>
      </footer>
    </div>
  )
}
