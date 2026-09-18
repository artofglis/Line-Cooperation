import { FormEvent, useEffect, useState } from 'react'
import {
  ADDRESS,
  EMAIL,
  FIRM_NAME,
  ORG_NR,
  PHONE_DISPLAY,
  PHONE_HREF,
  contactCta,
  design02NavLinks,
  designHeroCopy,
  designSectionCopy,
  helpAreas,
  methods,
  midBanners,
} from '../content'
import { LegalDisclosure } from '../components/LegalDisclosure'
import { ClientLogo, ClientMarkBg } from '../components/ClientLogo'
import { MidBanner } from '../components/MidBanner'
import { ProposalLinks } from '../components/ProposalLinks'
import { useSections, findHero, extraSections } from '../lib/sections'
import { SectionList } from '../components/sections/SectionRenderer'
import './design02.css'

function useReveal(rootKey: string) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.d2')
    if (!root) return
    const nodes = Array.from(root.querySelectorAll<HTMLElement>('.d2-reveal'))
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
      { threshold: 0.16, rootMargin: '0px 0px -6% 0px' },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [rootKey])
}

export default function Design02() {
  const copy = designSectionCopy[2]
  const { sections } = useSections('hjem')
  const heroOverride = findHero(sections)
  const extras = extraSections(sections)
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)
  useReveal('d2')

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
    <div className="d2">
      <header className="d2-nav">
        <div className="d2-shell d2-nav__inner">
          <a className="d2-nav__brand" href="#top" aria-label={FIRM_NAME}>
            <ClientLogo className="d2-nav__logo" variant="ring" />
          </a>
          <nav aria-label="Hovedmeny">
            <ul className="d2-nav__links">
              {design02NavLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <a className="d2-nav__cta" href="#kontakt">
            {copy.navCta}
          </a>
          <button
            className="d2-nav__toggle"
            type="button"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="sr-only">Meny</span>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
        {menuOpen ? (
          <ul className="d2-nav__mobile">
            {design02NavLinks.map((link) => (
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
        <section className="d2-hero">
          <div className="d2-hero__copy">
            <ClientMarkBg className="d2-hero__mark-bg client-mark-bg--soft" />
            <div className="d2-hero__copy-inner">
              <ClientLogo className="d2-hero__logo" variant="wordmark" />
              <p className="d2-kicker">[By] · [Bransje]</p>
              <h1>
                [Første del av sitatet]
                <em> [Andre del av sitatet]</em>
              </h1>
              <p className="d2-hero__lede">{heroOverride?.lede || designHeroCopy[2].lede}</p>
              <div className="d2-hero__actions">
                <a className="d2-btn" href={copy.heroPrimary.href}>
                  {copy.heroPrimary.label}
                </a>
                <a className="d2-btn d2-btn--quiet" href={copy.heroSecondary.href}>
                  {copy.heroSecondary.label}
                </a>
              </div>
            </div>
          </div>
          <figure className="d2-hero__portrait">
            <img
              src="/images/portrett.svg"
              alt={`Portrett, innehaver av ${FIRM_NAME}`}
              width={534}
              height={534}
            />
          </figure>
        </section>

        <section className="d2-section d2-about" id="om">
          <div className="d2-shell d2-about__grid">
            <div className="d2-about__copy d2-reveal">
              <p className="d2-kicker">{copy.aboutEyebrow}</p>
              <h2>{copy.aboutTitle}</h2>
              <p>
                [Kort avsnitt om bakgrunn og erfaring — hva har formet måten du
                jobber på?]
              </p>
              <p>
                [Kort avsnitt om hvorfor virksomheten ble til, og hva som gjør
                måten dere jobber på annerledes.]
              </p>
              <blockquote>
                «[Kort sitat eller kjerneverdi]»
              </blockquote>
            </div>
            <figure className="d2-about__figure d2-reveal">
              <img
                src="/images/hero.svg"
                alt={`Atmosfærebilde knyttet til ${FIRM_NAME}`}
                width={2400}
                height={1350}
              />
            </figure>
          </div>
        </section>

        <section className="d2-section" id="hjelp">
          <div className="d2-shell">
            <div className="d2-reveal d2-section__head">
              <p className="d2-kicker">{copy.helpEyebrow}</p>
              <h2>{copy.helpTitle}</h2>
              {copy.helpIntro ? <p>{copy.helpIntro}</p> : null}
            </div>
            <div className="d2-help">
              {helpAreas.map((area) => (
                <article key={area.title} className="d2-help__item d2-reveal">
                  <span className="d2-help__mark" aria-hidden="true" />
                  <h3>{area.title}</h3>
                  <p>{area.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="d2-signature" id="pakke">
          <div className="d2-signature__media" aria-hidden="true">
            <img src="/images/path.svg" alt="" width={1600} height={1200} />
          </div>
          <div className="d2-signature__panel d2-reveal">
            <p className="d2-kicker d2-kicker--light">{copy.signatureEyebrow}</p>
            <h2>{copy.signatureTitle}</h2>
            <p>{copy.signatureIntro}</p>
            <ul>
              <li>[Kort punkt om metoder/verktøy etter behov]</li>
              <li>Digitalt eller fysisk</li>
              <li>Uten løfte om et bestemt resultat</li>
            </ul>
            <a className="d2-btn d2-btn--ghost" href="?page=signatur&design=2">
              {copy.signatureCta}
            </a>
          </div>
        </section>

        <section className="d2-section" id="metoder">
          <div className="d2-shell">
            <div className="d2-reveal d2-section__head">
              <p className="d2-kicker">{copy.methodsEyebrow}</p>
              <h2>{copy.methodsTitle}</h2>
              <p>{copy.methodsIntro}</p>
            </div>
            <div className="d2-methods">
              {methods.map((method, index) => (
                <article key={method.title} className="d2-methods__item d2-reveal">
                  <span className="d2-methods__index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="d2-methods__when">{method.when}</p>
                    <h3>{method.title}</h3>
                    <p>{method.text}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="d2-note d2-reveal">
              [Bransjespesifikk friskrivelse — tilpass etter kundens bransje og
              evt. lovkrav]
            </p>
          </div>
        </section>

        <MidBanner variant="d2" {...midBanners.d2} />

        <section className="d2-section d2-prices" id="priser">
          <div className="d2-shell">
            <div className="d2-reveal d2-section__head">
              <p className="d2-kicker">{copy.pricesEyebrow}</p>
              <h2>{copy.pricesTitle}</h2>
              {copy.pricesIntro ? <p>{copy.pricesIntro}</p> : null}
            </div>
            <div className="d2-pricegrid">
              <article className="d2-price d2-reveal">
                <h3>Kartlegging</h3>
                <p className="d2-price__amount">Gratis</p>
                <p>[XX] min · uforpliktende samtale</p>
                <a href="#kontakt">Send forespørsel</a>
              </article>
              <article className="d2-price d2-price--lead d2-reveal">
                <p className="d2-price__label">Anbefalt</p>
                <h3>[Hovedpakke]</h3>
                <p className="d2-price__amount">X XXX kr</p>
                <p>[Antall] timer · individuelt tilpasset</p>
                <a href="#kontakt">Jeg vil starte her</a>
              </article>
              <article className="d2-price d2-reveal">
                <h3>Enkelttimer</h3>
                <p className="d2-price__amount">Etter avtale</p>
                <p>[XX] min · metode etter behov</p>
                <a href="#kontakt">Ta kontakt</a>
              </article>
            </div>
            <p className="d2-note d2-reveal">Priser i NOK inkl. mva.</p>
          </div>
        </section>

        <section className="d2-section" id="kontakt">
          <div className="d2-shell d2-contact">
            <div className="d2-reveal">
              <p className="d2-kicker">Kontakt</p>
              <h2>{copy.contactTitle}</h2>
              <p className="d2-note">{copy.contactNote}</p>
              <div className="d2-contact__details">
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
            <form className="d2-form d2-reveal" onSubmit={handleSubmit}>
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
              <button className="d2-btn" type="submit">
                {contactCta.short}
              </button>
              <p className="d2-note">
                {sent
                  ? 'E-postprogrammet ditt åpnes.'
                  : 'Opplysningene brukes kun for å svare deg. Se personvern under.'}
              </p>
            </form>
          </div>
        </section>

        <SectionList sections={extras} />

        <LegalDisclosure variant="d2" shellClassName="d2-shell" />
      </main>

      <footer className="d2-footer">
        <div className="d2-shell d2-footer__inner">
          <ClientLogo className="d2-footer__logo" variant="wordmark" />
          <p>
            © {new Date().getFullYear()} {FIRM_NAME}
            <br />
            {ADDRESS} · {PHONE_DISPLAY}
          </p>
          <ProposalLinks design={2} />
        </div>
      </footer>
    </div>
  )
}
