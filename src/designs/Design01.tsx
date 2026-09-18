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
import './design01.css'

function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    if (!nodes.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])
}

export default function Design01() {
  const copy = designSectionCopy[1]
  const { sections } = useSections('hjem')
  const heroOverride = findHero(sections)
  const extras = extraSections(sections)
  const [navSolid, setNavSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)

  useReveal()

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 48)
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
    <div className="site">
      <header className={`nav ${navSolid ? 'is-solid' : ''}`}>
        <div className="shell nav__inner">
          <a className="nav__brand" href="#top" aria-label={FIRM_NAME}>
            <ClientLogo className="nav__logo" variant="ring" />
          </a>

          <nav aria-label="Hovedmeny">
            <ul className="nav__links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <a className="nav__cta" href="#kontakt">
            {copy.navCta}
          </a>

          <button
            className="nav__toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">Meny</span>
            {menuOpen ? '✕' : '☰'}
          </button>

          <ul
            id="mobile-menu"
            className={`nav__mobile ${menuOpen ? 'is-open' : ''}`}
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#kontakt" onClick={() => setMenuOpen(false)}>
                Send forespørsel
              </a>
            </li>
          </ul>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero__media" aria-hidden="true">
            <img
              src="/images/hero.svg"
              alt=""
              width={2400}
              height={1350}
              fetchPriority="high"
            />
          </div>
          <div className="hero__veil" aria-hidden="true" />
          {/* Ring-logo: midtpunkt låst til midten av sola i hero-bildet */}
          <ClientMarkBg className="hero__mark-bg client-mark-bg--screen" />

          <div className="shell hero__content">
            <div className="hero__brand">
              <ClientLogo
                className="hero__logo hero__logo--wordmark"
                variant="wordmark"
              />
              <ClientLogo
                className="hero__logo hero__logo--full"
                variant="full"
              />
            </div>
            <div className="hero__copy">
              <h1>{heroOverride?.quote || designHeroCopy[1].quote}</h1>
              <p className="hero__lede">{heroOverride?.lede || designHeroCopy[1].lede}</p>
            </div>
            <div className="hero__actions">
              <a className="btn btn--primary" href={copy.heroPrimary.href}>
                {copy.heroPrimary.label}
              </a>
              <a className="btn btn--ghost" href={copy.heroSecondary.href}>
                {copy.heroSecondary.label}
              </a>
            </div>
          </div>

          <span className="hero__scroll">[By] · [Region]</span>
        </section>

        <section className="section" id="hjelp">
          <div className="shell">
            <div className="reveal section__head">
              <p className="section__eyebrow">{copy.helpEyebrow}</p>
              <h2 className="section__title">{copy.helpTitle}</h2>
              <p className="section__intro">{copy.helpIntro}</p>
            </div>

            <div className="help__grid">
              {helpAreas.map((area, index) => (
                <article
                  key={area.title}
                  className={`help__item reveal reveal-delay-${(index % 3) + 1}`}
                >
                  <h3>{area.title}</h3>
                  <p>{area.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section signature" id="pakke">
          <div className="shell signature__inner">
            <div className="signature__copy reveal">
              <p className="section__eyebrow">{copy.signatureEyebrow}</p>
              <h2 className="section__title">{copy.signatureTitle}</h2>
              <p className="section__intro">{copy.signatureIntro}</p>
              <p>
                [Kort avsnitt som utdyper hovedpakken — hva dere gjør sammen,
                hvilke ressurser dere bygger videre på, og hva målet med
                prosessen er.]
              </p>
              <ul className="signature__list">
                <li>[Kort punkt om hva som er inkludert]</li>
                <li>[Kort punkt om tilpasning til kunden]</li>
                <li>[Kort punkt om tempo/prosess]</li>
              </ul>
              <a className="btn btn--primary" href="?page=signatur&design=1">
                {copy.signatureCta}
              </a>
            </div>
            <figure className="signature__visual reveal reveal-delay-1">
              <img
                src="/images/path.svg"
                alt=""
                width={1600}
                height={1200}
              />
            </figure>
          </div>
        </section>

        <section className="section section--tight" id="om">
          <div className="shell about">
            <div className="about__portrait reveal">
              <img
                src="/images/portrett.svg"
                alt={`Portrett, innehaver av ${FIRM_NAME}`}
                width={534}
                height={534}
              />
            </div>
            <div className="about__copy reveal reveal-delay-1">
              <p className="section__eyebrow">{copy.aboutEyebrow}</p>
              <h2 className="section__title">{copy.aboutTitle}</h2>
              {storyParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
              <p className="about__note">
                «{aboutNote}»
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="metoder">
          <div className="shell">
            <div className="reveal section__head">
              <p className="section__eyebrow">{copy.methodsEyebrow}</p>
              <h2 className="section__title">{copy.methodsTitle}</h2>
              <p className="section__intro">{copy.methodsIntro}</p>
            </div>

            <div className="methods__list">
              {methods.map((method, index) => (
                <article
                  key={method.title}
                  className={`method reveal reveal-delay-${(index % 3) + 1}`}
                >
                  <span className="method__index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="method__body">
                    <p className="method__when">{method.when}</p>
                    <h3>{method.title}</h3>
                    <p>{method.text}</p>
                  </div>
                </article>
              ))}
            </div>

            <p className="methods__note reveal">
              [Bransjespesifikk friskrivelse — tilpass etter kundens bransje og
              evt. lovkrav]
            </p>
          </div>
        </section>

        <MidBanner variant="d1" {...midBanners.d1} />

        <section className="section process" id="prosess">
          <div className="shell">
            <div className="reveal section__head">
              <p className="section__eyebrow">{copy.processEyebrow}</p>
              <h2 className="section__title">{copy.processTitle}</h2>
            </div>
            <ol className="process__steps">
              <li className="reveal">
                <span>01</span>
                <div>
                  <h3>Du sender forespørsel</h3>
                  <p>Ingen timebestilling. Du skriver litt — jeg svarer når jeg har ro.</p>
                </div>
              </li>
              <li className="reveal reveal-delay-1">
                <span>02</span>
                <div>
                  <h3>Kartlegging</h3>
                  <p>Sammen finner vi retning, tempo og hvilke verktøy som er aktuelle.</p>
                </div>
              </li>
              <li className="reveal reveal-delay-2">
                <span>03</span>
                <div>
                  <h3>Tilpasset prosess</h3>
                  <p>Timer digitalt eller fysisk — alltid tilpasset deg, ikke en mal.</p>
                </div>
              </li>
              <li className="reveal reveal-delay-3">
                <span>04</span>
                <div>
                  <h3>Veien videre</h3>
                  <p>Du tar med deg innsikt og vaner som kan leve videre i hverdagen.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="section pricing" id="priser">
          <div className="shell">
            <div className="pricing__band reveal">
              <p className="section__eyebrow">{copy.pricesEyebrow}</p>
              <h2 className="section__title">{copy.pricesTitle}</h2>
              <p className="section__intro">{copy.pricesIntro}</p>

              <div className="pricing__grid">
                <article className="price">
                  <span className="price__label">Steg 1</span>
                  <h3>Kartlegging</h3>
                  <p className="price__amount">
                    Gratis
                    <span>[XX] min</span>
                  </p>
                  <p>
                    Uforpliktende samtale om hva du står i, og om samarbeidet
                    passer.
                  </p>
                  <ul className="price__includes">
                    <li>Ingen forpliktelse</li>
                    <li>Kartlegging av behov</li>
                    <li>Anbefaling om videre løp</li>
                  </ul>
                  <a className="btn btn--primary" href="#kontakt">
                    Send forespørsel om kartlegging
                  </a>
                </article>

                <article className="price price--featured">
                  <span className="price__label">Anbefalt</span>
                  <h3>[Hovedpakke]</h3>
                  <p className="price__amount">
                    X&nbsp;XXX&nbsp;kr
                    <span>[Antall] timer</span>
                  </p>
                  <p>
                    Et helhetlig, individuelt forløp for deg som ønsker en mer
                    gjennomgående prosess.
                  </p>
                  <ul className="price__includes">
                    <li>[Antall] tilpassede timer</li>
                    <li>Verktøy etter behov</li>
                    <li>Digitalt eller fysisk</li>
                  </ul>
                  <a className="btn btn--primary" href="#kontakt">
                    Jeg vil starte her
                  </a>
                </article>

                <article className="price">
                  <span className="price__label">Valgfritt</span>
                  <h3>Enkelttimer</h3>
                  <p className="price__amount">
                    Etter avtale
                    <span>[XX] min</span>
                  </p>
                  <p>
                    Ett eller flere møter med metode tilpasset det du trenger
                    akkurat nå.
                  </p>
                  <ul className="price__includes">
                    <li>Fleksibelt omfang</li>
                    <li>Fra verktøykassen</li>
                    <li>Avtales etter kartlegging</li>
                  </ul>
                  <a className="btn btn--ghost" href="#kontakt">
                    Ta kontakt
                  </a>
                </article>
              </div>

              <p className="pricing__footnote">
                Priser er oppgitt i NOK inkl. mva. Samtalene varer vanligvis
                [XX] minutter og kan gjennomføres digitalt eller fysisk.
              </p>
            </div>
          </div>
        </section>

        <section className="quote">
          <div className="shell reveal">
            <blockquote>
              [Kort sitat eller kjerneverdi]
            </blockquote>
          </div>
        </section>

        <section className="section" id="kontakt">
          <div className="shell contact">
            <div className="reveal">
              <p className="section__eyebrow">Kontakt</p>
              <h2 className="section__title">{copy.contactTitle}</h2>
              <p className="section__intro">{copy.contactNote}</p>

              <div className="contact__details">
                <div>
                  <strong>{FIRM_NAME}</strong>
                  <p>Enkeltpersonforetak · Org.nr {ORG_NR}</p>
                  <p>{ADDRESS}</p>
                </div>
                <div>
                  <strong>Telefon</strong>
                  <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
                </div>
                <div>
                  <strong>E-post</strong>
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </div>
              </div>
            </div>

            <form className="contact__form reveal reveal-delay-1" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="name">Navn</label>
                <input id="name" name="name" type="text" autoComplete="name" required />
              </div>
              <div className="field">
                <label htmlFor="email">E-post</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="message">Hva ønsker du hjelp til?</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Noen setninger er nok."
                />
              </div>
              <button className="btn btn--navy" type="submit">
                {contactCta.short}
              </button>
              {sent ? (
                <p className="form-note is-success">
                  E-postprogrammet ditt åpnes. Sender du ikke videre, ring gjerne
                  direkte.
                </p>
              ) : (
                <p className="form-note">
                  Opplysningene brukes kun for å svare på henvendelsen din. Se
                  også <a href="#personvern">personvern</a>.
                </p>
              )}
            </form>
          </div>
        </section>

        <SectionList sections={extras} />

        <LegalDisclosure variant="d1" shellClassName="shell" />
      </main>

      <footer className="footer">
        <div className="shell footer__inner">
          <div className="footer__brand-block">
            <ClientLogo className="footer__logo" variant="wordmark" />
            <div>
              <p className="footer__meta">
                {FIRM_NAME}
                <br />
                Enkeltpersonforetak · Org.nr {ORG_NR}
                <br />
                {ADDRESS} · {PHONE_DISPLAY}
              </p>
            </div>
          </div>
          <div className="footer__meta footer__legal">
            <p>
              © {new Date().getFullYear()} {FIRM_NAME}
            </p>
            <p>
              <a href="#ansvar">Om tjenestene</a>
              <span aria-hidden="true"> · </span>
              <a href="#personvern">Personvern</a>
              <span aria-hidden="true"> · </span>
              <a href="#vilkar">Vilkår</a>
            </p>
            <p>[Bransjespesifikk friskrivelse — tilpass etter kundens bransje og evt. lovkrav]</p>
            <ProposalLinks design={1} />
          </div>
        </div>
      </footer>
    </div>
  )
}
