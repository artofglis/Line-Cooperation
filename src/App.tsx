import { useEffect, useId, useRef, useState } from 'react'
import { DesignId, PageId, designs, pages } from './content'
import { holistiBrand, holistiOffer, proposal } from './proposal.config'
import {
  filterPagesForHost,
  isPageVisibleForHost,
  useHostChoice,
} from './hostChoice'
import {
  filterDomainOptionsForHost,
  useDomainChoice,
} from './domainChoice'
import { useSections } from './lib/sections'
import { HolistiTreeLogo } from './components/HolistiTreeLogo'
import Design01 from './designs/Design01'
import Design02 from './designs/Design02'
import Design03 from './designs/Design03'
import Design04 from './designs/Design04'
import Design05 from './designs/Design05'
import Design06 from './designs/Design06'
import TilbudLanding from './pages/TilbudLanding'
import SovnLanding from './pages/SovnLanding'
import SignaturLanding from './pages/SignaturLanding'
import ForstaLanding from './pages/ForstaLanding'
import HolistiOffer from './pages/HolistiOffer'
import OmKunde from './pages/OmKunde'
import MetoderPage from './pages/MetoderPage'
import SlikTime from './pages/SlikTime'
import FaqPage from './pages/FaqPage'
import RoForesporsel from './pages/RoForesporsel'
import './App.css'

function readDesignFromUrl(): DesignId {
  const params = new URLSearchParams(window.location.search)
  const raw = Number(params.get('design') || '1')
  if (raw >= 2 && raw <= 6) return raw as DesignId
  return 1
}

const PAGE_IDS: PageId[] = [
  'hjem',
  'om',
  'metoder',
  'time',
  'faq',
  'ro',
  'sovn',
  'signatur',
  'forsta',
  'tilbud',
  'holisti',
]

function readPageFromUrl(): PageId {
  const params = new URLSearchParams(window.location.search)
  const raw = params.get('page') || 'holisti'
  if (PAGE_IDS.includes(raw as PageId)) return raw as PageId
  return 'holisti'
}

export default function App() {
  const [design, setDesign] = useState<DesignId>(() =>
    typeof window === 'undefined' ? 1 : readDesignFromUrl(),
  )
  const [page, setPage] = useState<PageId>(() =>
    typeof window === 'undefined' ? 'hjem' : readPageFromUrl(),
  )
  const [hadExplicitDesign] = useState<boolean>(() =>
    typeof window === 'undefined'
      ? true
      : new URLSearchParams(window.location.search).has('design'),
  )
  const [hostChoice, chooseHost] = useHostChoice()
  const [domainChoice, chooseDomain] = useDomainChoice(hostChoice)
  const domainOptions = filterDomainOptionsForHost(hostChoice)
  const domainMeta = holistiOffer.domainOptions.find(
    (item) => item.id === domainChoice,
  )
  const [menuOpen, setMenuOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()

  const { settings: siteSettings } = useSections('hjem')
  const tilbudVisible = siteSettings.tilbud_visible !== '0'
  // Feature-flagg: en side skjules når proposal.modules.pages[id] === false.
  // (Cast bort `as const`-literaltypene så en kunde kan sette flagg til false.)
  const pageFlags = proposal.modules?.pages as Partial<Record<PageId, boolean>> | undefined
  const isPageEnabled = (id: PageId) => pageFlags?.[id] !== false
  const basePages = (tilbudVisible ? pages : pages.filter((item) => item.id !== 'tilbud')).filter(
    (item) => isPageEnabled(item.id),
  )
  const visiblePages = filterPagesForHost(basePages, hostChoice)

  useEffect(() => {
    if (
      isPageVisibleForHost(page, hostChoice) &&
      isPageEnabled(page) &&
      (tilbudVisible || page !== 'tilbud')
    )
      return
    setPage('hjem')
  }, [hostChoice, page, tilbudVisible])

  useEffect(() => {
    if (!siteSettings.theme || hadExplicitDesign) return
    const themeNum = Number(siteSettings.theme)
    if (themeNum >= 1 && themeNum <= 6) setDesign(themeNum as DesignId)
  }, [siteSettings.theme, hadExplicitDesign])

  useEffect(() => {
    document.documentElement.dataset.host = hostChoice ?? ''
    document.documentElement.dataset.domain = domainChoice ?? ''
  }, [hostChoice, domainChoice])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    params.set('design', String(design))
    params.set('page', page)
    const hash = window.location.hash
    const next = `${window.location.pathname}?${params.toString()}${hash}`
    window.history.replaceState({}, '', next)
    document.documentElement.dataset.design = String(design)
    document.documentElement.dataset.page = page
    try {
      localStorage.setItem('forslagsrom_design_choice', String(design))
    } catch {
      /* ignore */
    }
    if (hash !== '#ga-videre') {
      window.scrollTo(0, 0)
    }
  }, [design, page])

  function goForward() {
    if (!hostChoice) return
    setMenuOpen(false)
    setPage('holisti')
    window.setTimeout(() => {
      window.location.hash = 'ga-videre'
      document.getElementById('ga-videre')?.scrollIntoView({ behavior: 'smooth' })
    }, 80)
  }

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node
      if (rootRef.current?.contains(target)) return
      setMenuOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) toggleRef.current?.blur()
  }, [menuOpen])

  const activeDesign = designs.find((item) => item.id === design) ?? designs[0]
  const activePage = pages.find((item) => item.id === page) ?? pages[0]
  const hiddenCount = pages.length - visiblePages.length
  const includedPageCount = visiblePages.filter((item) => item.id !== 'holisti').length
  const sideLabel =
    hostChoice == null
      ? 'Side · velg løsning for å se antallet'
      : `Side · ${includedPageCount} inkludert i valget`

  return (
    <div className="app-shell">
      <div
        ref={rootRef}
        className={`hs-switcher ${menuOpen ? 'is-open' : ''}`}
      >
        <button
          ref={toggleRef}
          type="button"
          className="hs-switcher__fab"
          aria-expanded={menuOpen}
          aria-controls={panelId}
          aria-label={
            menuOpen
              ? 'Lukk forslagsmeny'
              : `Åpne forslagsmeny. Nå: ${activePage.label}, ${activeDesign.label} ${activeDesign.name}`
          }
          onClick={() => setMenuOpen((open) => !open)}
        >
          <HolistiTreeLogo className="hs-switcher__fab-logo" title="" />
          <span className="hs-switcher__fab-meta">
            <span className="hs-switcher__fab-kicker">HoliSti</span>
            <span className="hs-switcher__fab-current">
              {activePage.label}
              {page === 'holisti' ? '' : ` · ${activeDesign.label}`}
              {hostChoice === 'wix'
                ? ' · Wix'
                : hostChoice === 'external'
                  ? ' · Egen side'
                  : ''}
            </span>
          </span>
        </button>

        <div
          id={panelId}
          className="hs-switcher__panel"
          role="dialog"
          aria-modal="false"
          aria-label="Side- og designforslag"
          hidden={!menuOpen}
        >
          <header className="hs-switcher__head">
            <div className="hs-switcher__brand">
              <HolistiTreeLogo className="hs-switcher__brand-logo" />
              <div>
                <p className="hs-switcher__brand-name">HoliSti</p>
                <p className="hs-switcher__brand-sub">Privat forslagsrom</p>
              </div>
            </div>
            <button
              type="button"
              className="hs-switcher__close"
              onClick={() => setMenuOpen(false)}
              aria-label="Lukk"
            >
              Lukk
            </button>
          </header>

          <p className="hs-switcher__label hs-switcher__label--spaced">Løsning</p>
          <div className="hs-switcher__host" role="group" aria-label="Velg løsning">
            <button
              type="button"
              className={`hs-host ${hostChoice === 'external' ? 'is-active' : ''}`}
              aria-pressed={hostChoice === 'external'}
              onClick={() => chooseHost('external')}
            >
              <span className="hs-host__title">Egen side · pilot</span>
              <span className="hs-host__meta">Forside + Søvn + ekstra sider</span>
            </button>
            <button
              type="button"
              className={`hs-host ${hostChoice === 'wix' ? 'is-active' : ''}`}
              aria-pressed={hostChoice === 'wix'}
              onClick={() => chooseHost('wix')}
            >
              <span className="hs-host__title">Wix · introduksjon</span>
              <span className="hs-host__meta">Kun forside + Søvn</span>
            </button>
          </div>

          {hostChoice === 'wix' ? (
            <p className="hs-switcher__scope hs-switcher__scope--wix">
              Introduksjonstilbud (Wix): ekstra sider er skjult i menyen (
              {hiddenCount} sider). Bytt til pilot (egen side) for å se dem igjen.
            </p>
          ) : hostChoice === 'external' ? (
            <p className="hs-switcher__scope hs-switcher__scope--external">
              Pilottilbud (egen side): alle sider er synlige — og følger med i
              leveransen + HoliSti-verktøy i pilot.
            </p>
          ) : (
            <p className="hs-switcher__scope">
              Velg introduksjon (Wix) eller pilot (egen side). Teksten og menyen
              følger valget.
            </p>
          )}

          <p className="hs-switcher__label hs-switcher__label--spaced">Domene</p>
          <div className="hs-switcher__host hs-switcher__host--domain" role="group" aria-label="Velg domene">
            {domainOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`hs-host ${domainChoice === option.id ? 'is-active' : ''}`}
                aria-pressed={domainChoice === option.id}
                onClick={() => chooseDomain(option.id)}
              >
                <span className="hs-host__title">{option.title}</span>
                <span className="hs-host__meta">{option.short}</span>
              </button>
            ))}
          </div>
          <p className="hs-switcher__scope">
            {domainMeta
              ? `Valgt: ${domainMeta.title}${
                  hostChoice === 'wix'
                    ? ' · introduksjon/Wix'
                    : hostChoice === 'external'
                      ? ' · pilot/ekstern'
                      : ' · velg også tilbud'
                }.`
              : hostChoice === 'wix'
                ? 'Velg eksisterende eller nytt domene. Subdomenet er skjult (kun pilot).'
                : 'Velg ett domene — teksten følger valget.'}
          </p>

          <p className="hs-switcher__label hs-switcher__label--spaced">{sideLabel}</p>
          <div
            className="hs-switcher__pills"
            role="group"
            aria-label={`${includedPageCount} sider inkludert i valget`}
          >
            {visiblePages.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`hs-pill ${page === item.id ? 'is-active' : ''} ${
                  item.id === 'holisti' ? 'hs-pill--mint' : ''
                }`}
                aria-pressed={page === item.id}
                onClick={() => {
                  setPage(item.id)
                  if (item.id === 'holisti') setMenuOpen(false)
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {page !== 'holisti' ? (
            <>
              <p className="hs-switcher__label hs-switcher__label--spaced">Stil</p>
              <div className="hs-switcher__pills" role="group" aria-label="Velg designstil">
                {designs.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`hs-pill hs-pill--style ${
                      design === item.id ? 'is-active' : ''
                    }`}
                    aria-pressed={design === item.id}
                    onClick={() => {
                      setDesign(item.id)
                      setMenuOpen(false)
                    }}
                  >
                    <span className="hs-pill__num">{item.label}</span>
                    <span className="hs-pill__name">{item.name}</span>
                  </button>
                ))}
              </div>
            </>
          ) : null}

          <p className="hs-switcher__desc">
            {activePage.note}
            {page === 'holisti' ? '' : ` ${activeDesign.note}`}
            {hostChoice === 'external'
              ? ' Egen side: raskest — siden er allerede klar; ekstra sider følger med.'
              : hostChoice === 'wix'
                ? ' Wix: bygges på nytt i Wix, typisk 2–4 uker — kun forside + søvn.'
                : ' Velg Wix eller egen side før du går videre.'}
          </p>

          <button
            type="button"
            className="hs-switcher__next"
            disabled={!hostChoice}
            onClick={goForward}
          >
            {`Gå videre med ${activeDesign.label}${
              hostChoice === 'external'
                ? ' · Egen side'
                : hostChoice === 'wix'
                  ? ' · Wix'
                  : ''
            }${domainMeta ? ` · ${domainMeta.title}` : ''}`}
          </button>
          <p className="hs-switcher__scope">
            Åpner oppsummering av valg og vilkår — der kan du notere ønskede endringer før
            e-post sendes. To justeringsrunder er inkludert.
          </p>

          <div className="hs-switcher__foot">
            <a className="hs-switcher__logout" href="/logout">
              Logg ut
            </a>
            <p className="hs-switcher__legal">
              Privat forslagsrom · utkast
              {' · '}
              <a href={holistiBrand.personvern} target="_blank" rel="noreferrer">
                Personvern
              </a>
            </p>
          </div>
        </div>
      </div>

      {page === 'hjem' && design === 1 ? <Design01 /> : null}
      {page === 'hjem' && design === 2 ? <Design02 /> : null}
      {page === 'hjem' && design === 3 ? <Design03 /> : null}
      {page === 'hjem' && design === 4 ? <Design04 /> : null}
      {page === 'hjem' && design === 5 ? <Design05 /> : null}
      {page === 'hjem' && design === 6 ? <Design06 /> : null}
      {page === 'om' ? <OmKunde design={design} /> : null}
      {page === 'metoder' ? <MetoderPage design={design} /> : null}
      {page === 'time' ? <SlikTime design={design} /> : null}
      {page === 'faq' ? <FaqPage design={design} /> : null}
      {page === 'ro' ? <RoForesporsel design={design} /> : null}
      {page === 'tilbud' ? <TilbudLanding design={design} /> : null}
      {page === 'sovn' ? <SovnLanding design={design} /> : null}
      {page === 'signatur' ? <SignaturLanding design={design} /> : null}
      {page === 'forsta' ? <ForstaLanding design={design} /> : null}
      {page === 'holisti' ? (
        <HolistiOffer
          host={hostChoice}
          onHostChange={chooseHost}
          design={design}
        />
      ) : null}
    </div>
  )
}
