import { type ReactNode, useEffect, useState } from 'react'
import {
  ADDRESS,
  EMAIL,
  FIRM_NAME,
  PHONE_DISPLAY,
  holistiBrand,
  holistiOffer,
  proposal,
} from '../proposal.config'
import { DesignId, designs, designHeroCopy } from '../content'
import type { HostChoice } from '../hostChoice'
import {
  filterDomainOptionsForHost,
  useDomainChoice,
} from '../domainChoice'
import { HolistiTreeLogo } from '../components/HolistiTreeLogo'
import {
  GO_FURTHER_COMMENT_MAX,
  buildGoFurtherSummary,
  sendGoFurtherEmail,
} from '../goFurtherMail'
import './holisti.css'

type Props = {
  host: HostChoice | null
  onHostChange: (next: HostChoice) => void
  design: DesignId
}

function InfoNote({
  label = 'Mer info',
  children,
}: {
  label?: string
  children: ReactNode
}) {
  return (
    <details
      className="ho-info"
      onToggle={(event) => {
        const current = event.currentTarget
        if (!current.open) return
        document.querySelectorAll('details.ho-info[open]').forEach((node) => {
          if (node !== current) node.removeAttribute('open')
        })
      }}
    >
      <summary className="ho-info__btn" aria-label={label} title={label}>
        <span className="ho-info__icon" aria-hidden="true">
          i
        </span>
      </summary>
      <div className="ho-info__body">{children}</div>
    </details>
  )
}

function PlatformBrochureLink({ className = '' }: { className?: string }) {
  const brochure = holistiBrand.platformBrochure
  return (
    <div className={`ho-brochure ${className}`.trim()}>
      <p className="ho-kicker ho-kicker--mint">Vedlegg</p>
      <p className="ho-brochure__title">{brochure.title}</p>
      <p className="ho-note">{brochure.blurb}</p>
      <a
        className="ho-brochure__link"
        href={brochure.href}
        target="_blank"
        rel="noreferrer"
      >
        {brochure.cta}
      </a>
    </div>
  )
}

function PlatformPricing() {
  const pricing = holistiOffer.platformPricing
  return (
    <div className="ho-platform-price">
      <p className="ho-kicker ho-kicker--mint">{pricing.title}</p>
      <p className="ho-note">{pricing.intro}</p>
      <ul className="ho-platform-price__list">
        {pricing.plans.map((plan) => (
          <li key={plan.name} className="ho-platform-price__item">
            <span className="ho-platform-price__name">{plan.name}</span>
            <span className="ho-platform-price__amounts">
              <span className="ho-value__ordinary ho-value__ordinary--inline">{plan.ordinary}</span>
              {' → '}
              <strong>{plan.pilot}</strong>
            </span>
            {'note' in plan && plan.note ? (
              <span className="ho-platform-price__hint">{plan.note}</span>
            ) : null}
          </li>
        ))}
      </ul>
      <p className="ho-note ho-note--soft">{pricing.note}</p>
      <PlatformBrochureLink className="ho-brochure--compact" />
    </div>
  )
}

export default function HolistiOffer({ host, onHostChange, design }: Props) {
  const { client } = proposal
  const scope = holistiOffer.deliveryScope
  const [domain, chooseDomain] = useDomainChoice(host)
  const [sendState, setSendState] = useState<'idle' | 'confirm' | 'sending' | 'sent' | 'error'>(
    'idle',
  )
  const [sendError, setSendError] = useState('')
  const [comment, setComment] = useState('')
  const domainOptions = filterDomainOptionsForHost(host)
  const domainMeta = holistiOffer.domainOptions.find((item) => item.id === domain)
  const activeDesign = designs.find((d) => d.id === design) ?? designs[0]
  const hostMeta = holistiOffer.hostingOptions.find((h) => h.id === host)
  const isWix = host === 'wix'
  const isExternal = host === 'external'
  const canBrowseExtras = !isWix
  const goFurtherSummary =
    host != null ? buildGoFurtherSummary({ design, host, domain, comment }) : null

  useEffect(() => {
    if (window.location.hash !== '#ga-videre') return
    const t = window.setTimeout(() => {
      document.getElementById('ga-videre')?.scrollIntoView({ behavior: 'smooth' })
    }, 80)
    return () => window.clearTimeout(t)
  }, [])

  function pageHref(page: string) {
    return `?page=${page}&design=${design}`
  }

  function handlePrepareSend() {
    if (!host || sendState === 'sending' || sendState === 'sent') return
    setSendError('')
    setSendState('confirm')
  }

  async function handleConfirmSend() {
    if (!host || sendState === 'sending' || sendState === 'sent') return
    setSendState('sending')
    setSendError('')
    const result = await sendGoFurtherEmail({
      design,
      host,
      domain,
      comment,
    })
    if (!result.ok) {
      setSendState('error')
      setSendError(result.error)
      return
    }
    setSendState('sent')
  }

  return (
    <div className={`ho ${host ? `ho--host-${host}` : ''}`}>
      <header className="ho-top">
        <div className="ho-shell ho-top__inner">
          <div className="ho-top__brands">
            <a className="ho-top__holisti-mark" href={holistiBrand.site} target="_blank" rel="noreferrer">
              <HolistiTreeLogo className="ho-top__tree" />
              <span>{holistiBrand.name}</span>
            </a>
            <span className="ho-top__x" aria-hidden="true">
              ×
            </span>
            <img
              className="ho-top__client"
              src={client.logo.src}
              alt={client.logo.alt}
              width={160}
              height={56}
              decoding="async"
            />
          </div>
          <p className="ho-top__meta">
            Privat forslagsrom
            {isWix ? ' · Wix' : isExternal ? ' · Egen side' : ''}
          </p>
        </div>
      </header>

      <main>
        <section className="ho-hero">
          <div className="ho-shell ho-hero__inner">
            <div className="ho-hero__copy">
              <p className="ho-kicker">Hei. 🙂</p>
              <h1>{holistiOffer.headline}</h1>
              <p className="ho-lede">{holistiOffer.intro}</p>
              <blockquote>«{holistiOffer.quoteHook}»</blockquote>
              <p className="ho-lede ho-lede--soft">
                Dette er et forslag til nettside for {holistiOffer.firmName} —{' '}
                {holistiOffer.directionNote}.
              </p>
            </div>
            <div className="ho-hero__mark" aria-hidden="true">
              <HolistiTreeLogo className="ho-hero__tree" title="" />
            </div>
          </div>
        </section>

        <section className="ho-section ho-viewing-tip" aria-label={holistiOffer.viewingTip.title}>
          <div className="ho-shell ho-info-host ho-viewing-tip__inner">
            <p className="ho-kicker">Tips</p>
            <h2>{holistiOffer.viewingTip.title}</h2>
            <p className="ho-viewing-tip__lede">
              De fleste kommer fra mobilen — sjekk stilene begge steder.
            </p>
            <InfoNote label={holistiOffer.viewingTip.title}>
              <p>{holistiOffer.viewingTip.text}</p>
              <p className="ho-note ho-note--soft">{holistiOffer.viewingTip.note}</p>
            </InfoNote>
          </div>
        </section>

        <section className="ho-section ho-section--raised" id="valg">
          <div className="ho-shell">
            <div className="ho-section__head ho-info-host">
              <div>
                <p className="ho-kicker">Velg løsning · samme pris</p>
                <h2>Wix eller egen side</h2>
              </div>
              <InfoNote label="Om de to valgene">
                <p>{holistiOffer.offerKinds.intro}</p>
                <p className="ho-note ho-note--soft">
                  {holistiOffer.valueCompare.priceListNote}
                </p>
              </InfoNote>
            </div>

            <div className="ho-grid ho-grid--host" role="radiogroup" aria-label="Velg tilbud">
              {holistiOffer.hostingOptions.map((option) => {
                const selected = host === option.id
                const otherSelected = host != null && !selected
                const value = holistiOffer.valueCompare.packages.find(
                  (pkg) => pkg.id === option.id,
                )
                const kind =
                  option.id === 'wix'
                    ? holistiOffer.offerKinds.wix
                    : holistiOffer.offerKinds.external
                const compare = holistiOffer.hostCompare.columns.find(
                  (col) => col.id === option.id,
                )
                return (
                  <article
                    key={option.id}
                    className={[
                      'ho-pick',
                      selected ? 'ho-card--active' : '',
                      otherSelected ? 'ho-card--dim' : '',
                      option.id === 'external' ? 'ho-scope--external' : 'ho-scope--wix',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <div className="ho-pick__top">
                      <p className={`ho-kicker ${option.id === 'external' ? 'ho-kicker--mint' : ''}`}>
                        {kind.badge}
                      </p>
                      <span
                        className={`ho-tag ${
                          option.id === 'external' ? 'ho-tag--mint' : 'ho-tag--gold'
                        }`}
                      >
                        {option.tag ?? kind.tag}
                      </span>
                    </div>
                    <div className="ho-pick__title ho-info-host">
                      <h3>{option.title}</h3>
                      <InfoNote label={`Mer om ${option.title}`}>
                        <p>{option.text}</p>
                        {value ? (
                          <p className="ho-note ho-note--soft">
                            Ordinært {value.ordinaryPrice} ({value.ordinaryLabel}) · din pris{' '}
                            {value.offerPrice}
                          </p>
                        ) : null}
                        {compare ? (
                          <>
                            <p className="ho-compare__pros-label">Fordeler</p>
                            <ul className="ho-steps ho-steps--pros">
                              {compare.pros.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                            <p className="ho-compare__cons-label">Ulemper</p>
                            <ul className="ho-steps ho-steps--cons">
                              {compare.cons.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </>
                        ) : null}
                      </InfoNote>
                    </div>
                    <p className="ho-delivery">
                      <strong>Sider:</strong>{' '}
                      {option.id === 'wix'
                        ? 'Forside + Søvn'
                        : 'Forside + Søvn + ekstra (+ bonus)'}
                    </p>
                    <p className="ho-delivery">
                      <strong>Levering:</strong> {option.delivery}
                    </p>
                    {value ? (
                      <p className="ho-value__offer">
                        <span className="ho-value__ordinary ho-value__ordinary--inline">
                          {value.ordinaryPrice}
                        </span>
                        {' → '}
                        <strong>{value.offerPrice}</strong>
                      </p>
                    ) : null}
                    <button
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      className={`ho-choice ho-choice--sm ${selected ? 'is-active' : ''}`}
                      onClick={() => onHostChange(option.id)}
                    >
                      {selected
                        ? 'Valgt'
                        : option.id === 'wix'
                          ? 'Velg Wix'
                          : 'Velg egen side'}
                    </button>
                  </article>
                )
              })}
            </div>

            <div
              key={host ?? 'none'}
              className={`ho-follow ho-follow--pulse ${
                isWix ? 'ho-follow--wix' : isExternal ? 'ho-follow--external' : ''
              }`}
              aria-live="polite"
            >
              {host == null ? (
                <p className="ho-note">{holistiOffer.hostFollowUp.none}</p>
              ) : (
                <>
                  <div className="ho-pick__top">
                    <p className={`ho-kicker ${isExternal ? 'ho-kicker--mint' : ''}`}>
                      Oppdatert for valget ditt
                    </p>
                    <span className={`ho-tag ${isExternal ? 'ho-tag--mint' : 'ho-tag--gold'}`}>
                      {isWix
                        ? holistiOffer.offerKinds.wix.badge
                        : holistiOffer.offerKinds.external.badge}
                    </span>
                  </div>
                  <h3>
                    {isWix
                      ? holistiOffer.hostFollowUp.wix.title
                      : holistiOffer.hostFollowUp.external.title}
                  </h3>
                  {(isWix
                    ? holistiOffer.hostFollowUp.wix.paragraphs
                    : holistiOffer.hostFollowUp.external.paragraphs
                  ).map((paragraph) => (
                    <p key={paragraph} className="ho-note">
                      {paragraph}
                    </p>
                  ))}
                  {isExternal ? <PlatformPricing /> : null}
                  <button
                    type="button"
                    className="ho-text-btn"
                    onClick={() => onHostChange(isWix ? 'external' : 'wix')}
                  >
                    {isWix
                      ? 'Bytt til pilottilbud (egen side)'
                      : 'Bytt til introduksjonstilbud (Wix)'}
                  </button>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="ho-section" id="pris">
          <div className="ho-shell ho-offer">
            <div>
              <div className="ho-section__head ho-section__head--start ho-info-host">
                <div>
                  <p className="ho-kicker">Pris</p>
                  <h2>
                    {holistiOffer.priceDisplay}
                    <span> inkl. mva.</span>
                  </h2>
                </div>
                <InfoNote label="Om prisen">
                  <p>{holistiOffer.priceNote}</p>
                  <p className="ho-note ho-note--soft">
                    {host
                      ? isWix
                        ? 'Med Wix: forside + Søvn i denne prisen.'
                        : 'Med egen side: ekstra sider følger med — samme pris.'
                      : 'Samme pris for begge løsninger.'}
                  </p>
                </InfoNote>
              </div>
            </div>
            <div className="ho-offer__card">
              <div className="ho-pick__top">
                <p className="ho-kicker">Inkludert i prisen</p>
                {isExternal ? (
                  <span className="ho-tag ho-tag--mint">+ ekstra sider</span>
                ) : isWix ? (
                  <span className="ho-tag ho-tag--gold">Forside + Søvn</span>
                ) : null}
              </div>
              <ul>
                {holistiOffer.included.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="ho-revision ho-info-host">
                <div>
                  <p className="ho-kicker">{holistiOffer.revisionRounds.title}</p>
                  <p className="ho-note">
                    Velg stilen du liker best — deretter to runder finpuss basert på den.
                  </p>
                </div>
                <InfoNote label="Om justeringsrunder">
                  <p>{holistiOffer.revisionRounds.text}</p>
                  <p className="ho-note ho-note--soft">{holistiOffer.revisionRounds.note}</p>
                </InfoNote>
              </div>
              {isExternal || isWix ? (
                <div className="ho-revision ho-info-host">
                  <div>
                    <p className="ho-kicker">{holistiOffer.hostingCosts.title}</p>
                    <p className="ho-note">
                      {isExternal
                        ? 'Anbefaler Cloudflare — ofte gratis eller svært lav månedskostnad.'
                        : 'Hosting ligger i Wix-abonnementet.'}
                    </p>
                  </div>
                  <InfoNote label="Om hosting">
                    <p>
                      {isExternal
                        ? holistiOffer.hostingCosts.external
                        : holistiOffer.hostingCosts.wix}
                    </p>
                  </InfoNote>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="ho-section" id="omfang">
          <div className="ho-shell">
            <div className="ho-section__head ho-info-host">
              <div>
                <div className="ho-pick__top">
                  <p className="ho-kicker">Hva følger med</p>
                  {host ? (
                    <span className={`ho-tag ${isExternal ? 'ho-tag--mint' : 'ho-tag--gold'}`}>
                      {isWix ? 'Wix-omfang' : 'Fullt omfang'}
                    </span>
                  ) : null}
                </div>
                <h2 key={host ?? 'none'}>
                  {isWix
                    ? 'Ditt Wix-omfang'
                    : isExternal
                      ? 'Ditt omfang (egen side)'
                      : 'Se forskjellen før du velger'}
                </h2>
              </div>
              <InfoNote label="Om omfang">
                <p>
                  {isWix
                    ? 'Dette er det som bygges i Wix for denne prisen.'
                    : isExternal
                      ? 'Dette er det som følger med fordi siden allerede er laget her.'
                      : scope.bothIntro}
                </p>
              </InfoNote>
            </div>
            <div className="ho-grid" key={`omfang-${host ?? 'none'}`}>
              <article
                className={['ho-pick', isWix || !host ? 'ho-card--active' : '']
                  .filter(Boolean)
                  .join(' ')}
              >
                <div className="ho-pick__top">
                  <p className="ho-kicker">{scope.bothTitle}</p>
                  <span className="ho-tag ho-tag--gold">Alltid med</span>
                </div>
                <h3>Forside + Søvn</h3>
                <ul className="ho-steps">
                  {scope.corePages.map((item) => (
                    <li key={item.page}>
                      <a href={pageHref(item.page)}>{item.label}</a>
                      {' — '}
                      {item.note}
                    </li>
                  ))}
                </ul>
                {isWix ? (
                  <p className="ho-note">
                    <strong>Med i ditt valg.</strong> {scope.wixNote}
                  </p>
                ) : (
                  <p className="ho-note ho-note--soft">{scope.wixNote}</p>
                )}
              </article>
              <article
                className={[
                  'ho-pick',
                  'ho-scope--external',
                  isExternal ? 'ho-card--active' : '',
                  isWix ? 'ho-scope--excluded' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <div className="ho-pick__top">
                  <p className="ho-kicker ho-kicker--mint">
                    {isWix ? 'Ikke med i Wix' : scope.externalTitle}
                  </p>
                  <span className="ho-tag ho-tag--mint">
                    {isWix ? 'Skjult nå' : '≈150 % mer'}
                  </span>
                </div>
                <div className="ho-pick__title ho-info-host">
                  <h3>
                    {isWix
                      ? 'Ekstra sider (skjult i menyen)'
                      : 'Ekstra sider — uten ekstra kostnad'}
                  </h3>
                  <InfoNote label="Om ekstra sider">
                    <p>
                      {isWix
                        ? 'Disse er fjernet fra HoliSti-menyen med Wix-valget. Bytt til egen side for å se og få dem med.'
                        : scope.externalIntro}
                    </p>
                  </InfoNote>
                </div>
                <ul className={`ho-steps ${isWix ? 'ho-steps--muted' : ''}`}>
                  {scope.externalPages.map((item) => (
                    <li key={item.page}>
                      {canBrowseExtras ? (
                        <a href={pageHref(item.page)}>{item.label}</a>
                      ) : (
                        <span>{item.label}</span>
                      )}
                      {' — '}
                      {item.note}
                    </li>
                  ))}
                </ul>
                {!isWix ? (
                  <>
                    <div className="ho-pick__title ho-info-host ho-scope__bonus">
                      <h3>{scope.bonusTitle}</h3>
                      <InfoNote label="Om bonus">
                        <p>{scope.bonusIntro}</p>
                      </InfoNote>
                    </div>
                    <ul className="ho-steps">
                      {scope.bonusPages.map((item) => (
                        <li key={item.page}>
                          <a href={pageHref(item.page)}>{item.label}</a>
                          {' — '}
                          {item.note}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="ho-note ho-note--soft">
                    Bonus (Kampanje + Ro) følger heller ikke med i Wix-sporet.
                  </p>
                )}
              </article>
            </div>
          </div>
        </section>

        <section className="ho-section" id="domene">
          <div className="ho-shell">
            <div className="ho-section__head ho-info-host">
              <div>
                <p className="ho-kicker">Domene</p>
                <h2>Velg én adresse — teksten følger valget</h2>
              </div>
              <InfoNote label="Om nettadresse">
                <p>{holistiOffer.domainIntro}</p>
                {isWix ? (
                  <p className="ho-note ho-note--soft">{holistiOffer.domainWixNote}</p>
                ) : null}
              </InfoNote>
            </div>
            <div
              className="ho-grid ho-grid--host"
              role="radiogroup"
              aria-label="Velg domene"
            >
              {domainOptions.map((option) => {
                const selected = domain === option.id
                const otherSelected = domain != null && !selected
                const detail =
                  isWix && option.textWix
                    ? option.textWix
                    : isExternal && option.textExternal
                      ? option.textExternal
                      : option.text
                return (
                  <article
                    key={option.id}
                    className={[
                      'ho-pick',
                      selected ? 'ho-card--active' : '',
                      otherSelected ? 'ho-card--dim' : '',
                      option.id === 'subdomain' ? 'ho-scope--external' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <div className="ho-pick__top">
                      <p
                        className={`ho-kicker ${
                          option.id === 'subdomain' ? 'ho-kicker--mint' : ''
                        }`}
                      >
                        {selected
                          ? 'Ditt valg'
                          : otherSelected
                            ? 'Alternativet'
                            : option.short}
                      </p>
                      {option.id === 'subdomain' ? (
                        <span className="ho-tag ho-tag--mint">Kun egen side</span>
                      ) : null}
                    </div>
                    <div className="ho-pick__title ho-info-host">
                      <h3>{option.title}</h3>
                      <InfoNote label={`Mer om ${option.title}`}>
                        <p>{detail}</p>
                        {!host ? (
                          <p className="ho-note ho-note--soft">
                            {option.hosts.length === 1 && option.hosts[0] === 'external'
                              ? 'Kun ved pilottilbud (egen side).'
                              : 'Passer både introduksjon (Wix) og pilot (egen side).'}
                          </p>
                        ) : null}
                      </InfoNote>
                    </div>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      className={`ho-choice ho-choice--sm ${selected ? 'is-active' : ''}`}
                      onClick={() => chooseDomain(option.id)}
                    >
                      {selected ? 'Valgt' : 'Velg'}
                    </button>
                  </article>
                )
              })}
            </div>

            <div
              key={`${domain ?? 'none'}-${host ?? 'none'}`}
              className={`ho-follow ho-follow--pulse ${
                domain === 'subdomain' || isExternal
                  ? 'ho-follow--external'
                  : domain
                    ? 'ho-follow--wix'
                    : ''
              }`}
              aria-live="polite"
            >
              {domain == null ? (
                <>
                  <p className="ho-note">{holistiOffer.domainFollowUp.none}</p>
                  {isWix ? (
                    <p className="ho-note ho-note--soft">
                      {holistiOffer.domainFollowUp.clearedByWix}
                    </p>
                  ) : null}
                </>
              ) : (
                <>
                  <div className="ho-pick__top">
                    <p
                      className={`ho-kicker ${
                        domain === 'subdomain' || isExternal ? 'ho-kicker--mint' : ''
                      }`}
                    >
                      Oppdatert for valget ditt
                    </p>
                    <span
                      className={`ho-tag ${
                        domain === 'subdomain' || isExternal ? 'ho-tag--mint' : 'ho-tag--gold'
                      }`}
                    >
                      {isWix ? 'Wix' : isExternal ? 'Egen side' : 'Velg løsning'}
                    </span>
                  </div>
                  <h3>{holistiOffer.domainFollowUp.byId[domain].title}</h3>
                  <p className="ho-note">
                    {isWix
                      ? holistiOffer.domainFollowUp.byId[domain].withWix ||
                        holistiOffer.domainFollowUp.byId[domain].withNone
                      : isExternal
                        ? holistiOffer.domainFollowUp.byId[domain].withExternal
                        : holistiOffer.domainFollowUp.byId[domain].withNone}
                  </p>
                  {host == null ? (
                    <p className="ho-note">{holistiOffer.domainFollowUp.needHost}</p>
                  ) : (
                    <p className="ho-note ho-note--soft">
                      Kombinasjon nå:{' '}
                      <strong>
                        {isWix
                          ? holistiOffer.offerKinds.wix.badge
                          : holistiOffer.offerKinds.external.badge}
                      </strong>
                      {' · '}
                      <strong>{domainMeta?.title}</strong>
                    </p>
                  )}
                  <div className="ho-follow__switches">
                    {domainOptions
                      .filter((option) => option.id !== domain)
                      .map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          className="ho-text-btn"
                          onClick={() => chooseDomain(option.id)}
                        >
                          Bytt til {option.title}
                        </button>
                      ))}
                    {host ? (
                      <button
                        type="button"
                        className="ho-text-btn"
                        onClick={() => onHostChange(isWix ? 'external' : 'wix')}
                      >
                        {isWix
                          ? 'Bytt til pilottilbud (egen side)'
                          : 'Bytt til introduksjonstilbud (Wix)'}
                      </button>
                    ) : null}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {!isWix ? (
          <section className="ho-section ho-section--raised" id="fra-wix">
            <div className="ho-shell">
              <div className="ho-section__head ho-info-host">
                <div>
                  <p className="ho-kicker">Fra Wix til egen side</p>
                  <h2>Slik fyller vi gapene</h2>
                </div>
                <InfoNote label="Om flytting fra Wix">
                  <p>
                    Å gå fra Wix til egen side handler mest om orden: innhold, nettadresse og
                    lenker. Du mister ikke «retten» til det du har betalt Wix for — men du
                    trenger ikke Wix-abonnementet for å bygge/redigere siden hvis den ligger
                    utenfor Wix. Nettadressen kan du beholde.
                  </p>
                </InfoNote>
              </div>
              <ul className="ho-steps">
                {holistiOffer.wixExitPainpoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <section className="ho-section" id="synlighet">
          <div className="ho-shell">
            <div className="ho-section__head ho-info-host">
              <div>
                <p className="ho-kicker">Synlighet i ditt tempo</p>
                <h2>Forespørsel — ikke bookingkalender</h2>
              </div>
              <InfoNote label="Om forespørsel">
                <p>{holistiOffer.foresporselNote}</p>
              </InfoNote>
            </div>
            <p className="ho-lede">
              Sidene er lagt opp med «forespørsel» — ingen online timebestilling. Du svarer
              når du har ro.
            </p>
          </div>
        </section>

        <section className="ho-section ho-section--raised" id="forslag">
          <div className="ho-shell">
            <div className="ho-section__head ho-info-host">
              <div>
                <div className="ho-pick__top">
                  <p className="ho-kicker">Se forslagene</p>
                  <span className={`ho-tag ${isExternal ? 'ho-tag--mint' : 'ho-tag--gold'}`}>
                    {isWix ? 'Wix-omfang' : isExternal ? 'Fullt omfang' : 'Velg stil'}
                  </span>
                </div>
                <h2>Seks stiler · forside · søvn</h2>
              </div>
              <InfoNote label="Om stilene">
                <p>{holistiOffer.messagingNote}</p>
              </InfoNote>
            </div>
            <p className="ho-lede">
              Velg den stilen du liker best — det er utgangspunktet for siden. Justeringsrundene
              er finpuss basert på den. Se gjerne både på telefon og PC.
            </p>
            <ul className="ho-steps">
              {designs.map((d) => {
                const note = designHeroCopy[d.id].note
                return (
                  <li key={d.id}>
                    <strong>
                      <a href={`?page=hjem&design=${d.id}`}>
                        {d.label} {d.name}
                      </a>
                    </strong>
                    {' — '}
                    {note || d.note}
                  </li>
                )
              })}
              <li>
                <a href={pageHref('sovn')}>Søvn-landing</a>
                {' — med i begge løsninger'}
              </li>
            </ul>
          </div>
        </section>

        <section className="ho-section" id="trygt">
          <div className="ho-shell">
            <div className="ho-section__head ho-info-host">
              <div>
                <p className="ho-kicker">Trygghet</p>
                <h2>{holistiOffer.reassurance.title}</h2>
              </div>
              <InfoNote label="Om trygghet">
                <p>{holistiOffer.reassurance.intro}</p>
              </InfoNote>
            </div>
            <ul className="ho-steps">
              {holistiOffer.reassurance.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="ho-section ho-section--raised" id="salgsvilkar">
          <div className="ho-shell">
            <div className="ho-section__head ho-info-host">
              <div>
                <p className="ho-kicker">Avtale</p>
                <h2>{holistiOffer.salesTerms.title}</h2>
              </div>
              <InfoNote label="Om salgsvilkår">
                <p>
                  Dette er vilkårene for nettsideleveransen. HoliSti Platform har egne
                  SaaS-vilkår — de er ikke det samme dokumentet.
                </p>
              </InfoNote>
            </div>
            <p className="ho-lede">{holistiOffer.salesTerms.intro}</p>
            <ul className="ho-steps">
              {holistiOffer.salesTerms.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p className="ho-note">
              <a href={holistiBrand.vilkar} target="_blank" rel="noreferrer">
                {holistiOffer.salesTerms.fullLabel}
              </a>
              {' · '}
              <a href={holistiBrand.personvern} target="_blank" rel="noreferrer">
                Personvern
              </a>
            </p>
            <p className="ho-note ho-note--soft">{holistiOffer.salesTerms.note}</p>
          </div>
        </section>

        {!isWix ? (
          <section className="ho-section ho-section--raised" id="referanse">
            <div className="ho-shell">
              <div className="ho-section__head ho-info-host">
                <div>
                  <p className="ho-kicker ho-kicker--mint">Ved egen side</p>
                  <h2>{holistiOffer.referenceAgreement.title}</h2>
                </div>
                <InfoNote label="Om referanseavtalen">
                  <p>
                    Enkel avtale knyttet til pilottilbudet — ikke et ekstra gebyr, og ikke
                    erstatning for salgsvilkårene over. Du beholder kontroll: si nei til
                    konkrete bruksområder.
                  </p>
                </InfoNote>
              </div>
              <p className="ho-lede">{holistiOffer.referenceAgreement.intro}</p>
              <ul className="ho-steps">
                {holistiOffer.referenceAgreement.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className="ho-note ho-note--soft">{holistiOffer.referenceAgreement.note}</p>
            </div>
          </section>
        ) : null}

        <section className="ho-section ho-section--raised" id="tilbud-faq">
          <div className="ho-shell">
            <div className="ho-section__head">
              <div className="ho-pick__top">
                <p className="ho-kicker">FAQ</p>
                <span className={`ho-tag ${isExternal ? 'ho-tag--mint' : 'ho-tag--gold'}`}>
                  {isWix ? 'Wix' : isExternal ? 'Egen side' : 'Begge'}
                </span>
              </div>
              <h2 key={`faq-${host ?? 'none'}`}>
                {isWix
                  ? 'Ofte spurt om introduksjonstilbudet'
                  : isExternal
                    ? 'Ofte spurt om pilottilbudet'
                    : 'Ofte stilte spørsmål om tilbudet'}
              </h2>
            </div>
            <div className="ho-faq">
              {holistiOffer.offerFaq.map((item) => (
                <details key={item.q} className="ho-faq__item ho-faq__details">
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="ho-section" id="holisti">
          <div className="ho-shell">
            <p className="ho-kicker ho-kicker--mint">Om HoliSti</p>
            <div className="ho-about-brand">
              <HolistiTreeLogo className="ho-about-brand__logo" />
              <h2>{holistiBrand.name}</h2>
            </div>
            <p className="ho-lede">{holistiBrand.blurb}</p>
            <div className="ho-grid">
              <article>
                <h3>holisti.no</h3>
                <p>
                  Hovedsiden til HoliSti — oversikten over tjenester, uttrykk og hvordan vi
                  jobber med merkevarer og nettsider.
                </p>
                <a href={holistiBrand.site} target="_blank" rel="noreferrer">
                  Besøk holisti.no
                </a>
              </article>
              {!isWix ? (
                <article>
                  <h3>platform.holisti.no</h3>
                  <p>{holistiBrand.platformBlurb}</p>
                  <p className="ho-note ho-note--soft">
                    Priser for pilotkunder står under valget «egen side» over. Plattformen har
                    egne vilkår — separat fra salgsvilkårene for nettsidetilbudet.
                  </p>
                  <a href={holistiBrand.platform} target="_blank" rel="noreferrer">
                    Se plattformen (under utvikling)
                  </a>
                  {' · '}
                  <a href={holistiBrand.platformVilkar} target="_blank" rel="noreferrer">
                    Plattformvilkår
                  </a>
                  <PlatformBrochureLink />
                </article>
              ) : null}
            </div>
          </div>
        </section>

        <section className="ho-section ho-section--cta" id="ga-videre">
          <div className="ho-shell ho-contact">
            <div>
              <p className="ho-kicker">Gå videre når du er klar</p>
              <h2>
                {isWix
                  ? 'Introduksjonstilbud (Wix) — send via e-post'
                  : isExternal
                    ? 'Pilottilbud (egen side) — send via e-post'
                    : 'Velg stil og løsning — deretter e-post'}
              </h2>
              <p>
                Knappen under oppsummerer valgene og vilkårene kort — deretter sendes
                e-post til HoliSti. Når den er sendt, er tilbudet inngått.
              </p>
              <p className="ho-note">{holistiOffer.clientEmailCopy}</p>
              <p className="ho-note ho-note--soft">{holistiOffer.paymentTiming}</p>
              <ol className="ho-flow">
                <li>
                  <strong>1. Velg</strong> stil, Wix eller egen side, og nettadresse.
                </li>
                <li>
                  <strong>2. Kommentar (valgfritt)</strong> — maks 200 tegn; ikke del av
                  justeringsrundene.
                </li>
                <li>
                  <strong>3. Bekreft og send</strong> — oppsummering først; deretter e-post
                  til HoliSti og kopi til deg. Avtalen inngås da.
                </li>
                <li>
                  <strong>4. Faktura / leveranse</strong> — arbeid typisk etter betaling,
                  deretter{' '}
                  {isWix
                    ? 'forside + Søvn i Wix.'
                    : isExternal
                      ? 'egen side med ekstra sider og bonus.'
                      : 'leveranse i valgt løsning.'}
                </li>
              </ol>

              {host ? (
                <div className="ho-email-tips">
                  <p className="ho-kicker">{holistiOffer.emailChangeTips.title}</p>
                  <p className="ho-note">{holistiOffer.emailChangeTips.intro}</p>
                  <ul className="ho-steps">
                    {holistiOffer.emailChangeTips.suggestions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <label className="ho-email-tips__label" htmlFor="ho-comment">
                    {holistiOffer.emailChangeTips.commentLabel}
                  </label>
                  <textarea
                    id="ho-comment"
                    className="ho-email-tips__input"
                    rows={3}
                    maxLength={GO_FURTHER_COMMENT_MAX}
                    value={comment}
                    disabled={sendState === 'sending' || sendState === 'sent'}
                    placeholder={holistiOffer.emailChangeTips.commentPlaceholder}
                    onChange={(event) =>
                      setComment(event.target.value.slice(0, GO_FURTHER_COMMENT_MAX))
                    }
                  />
                  <p className="ho-email-tips__meta">
                    <span>{holistiOffer.emailChangeTips.commentHint}</span>
                    <span>
                      {comment.length}/{GO_FURTHER_COMMENT_MAX}
                    </span>
                  </p>
                </div>
              ) : null}

              <p className="ho-note">
                Nåværende valg:{' '}
                <strong>
                  {activeDesign.label} {activeDesign.name}
                </strong>
                {hostMeta ? (
                  <>
                    {' · '}
                    <strong>{hostMeta.title}</strong> ({hostMeta.delivery})
                    {' · '}
                    <strong>
                      {isWix
                        ? 'Forside + Søvn'
                        : 'Forside + Søvn + ekstra sider'}
                    </strong>
                  </>
                ) : (
                  ' · velg Wix eller egen side over (eller i HoliSti-menyen)'
                )}
                {domainMeta ? (
                  <>
                    {' · '}
                    <strong>{domainMeta.title}</strong>
                  </>
                ) : (
                  ' · velg nettadresse under Domene'
                )}
                .
              </p>

              {(sendState === 'confirm' || sendState === 'sending') && goFurtherSummary ? (
                <div className="ho-confirm" role="region" aria-label="Oppsummering før sending">
                  <p className="ho-kicker">Oppsummering før sending</p>
                  <h3>Dine valg</h3>
                  <dl className="ho-confirm__list">
                    {goFurtherSummary.choices.map((item) => (
                      <div key={item.label} className="ho-confirm__row">
                        <dt>{item.label}</dt>
                        <dd>{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <h3>Salgsvilkår for tilbudet (kort)</h3>
                  <ul className="ho-steps">
                    {goFurtherSummary.salesTerms.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="ho-note">
                    <a href={holistiBrand.vilkar} target="_blank" rel="noreferrer">
                      Fulle salgsvilkår på holisti.no
                    </a>
                  </p>
                  {goFurtherSummary.platformTerms.length > 0 ? (
                    <>
                      <h3>Plattform / pilot (separat)</h3>
                      <ul className="ho-steps">
                        {goFurtherSummary.platformTerms.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      <p className="ho-note ho-note--soft">
                        Dette er ikke salgsvilkårene for nettsideleveransen — se{' '}
                        <a href={holistiBrand.platformVilkar} target="_blank" rel="noreferrer">
                          platform.holisti.no/vilkar
                        </a>
                        .
                      </p>
                    </>
                  ) : null}
                  {comment.trim() ? (
                    <p className="ho-note">
                      <strong>Kommentar følger med e-posten</strong> — ikke en del av de
                      inkluderte justeringsrundene.
                      <br />
                      <span className="ho-note--soft">«{comment.trim()}»</span>
                    </p>
                  ) : (
                    <p className="ho-note ho-note--soft">
                      Ingen kommentar — justeringsrundene brukes senere, etter første versjon.
                    </p>
                  )}
                  {isExternal ? (
                    <PlatformBrochureLink className="ho-brochure--confirm" />
                  ) : null}
                  <div className="ho-actions">
                    <button
                      type="button"
                      className="ho-btn"
                      disabled={sendState === 'sending'}
                      onClick={() => void handleConfirmSend()}
                    >
                      {sendState === 'sending' ? 'Sender e-post…' : 'Bekreft og send e-post'}
                    </button>
                    <button
                      type="button"
                      className="ho-btn ho-btn--ghost"
                      disabled={sendState === 'sending'}
                      onClick={() => setSendState('idle')}
                    >
                      Tilbake
                    </button>
                  </div>
                </div>
              ) : (
                <div className="ho-actions">
                  <a className="ho-btn" href={`?page=hjem&design=${design}`}>
                    Se valgt stil
                  </a>
                  {host ? (
                    <button
                      type="button"
                      className="ho-btn"
                      disabled={sendState === 'sending' || sendState === 'sent'}
                      onClick={handlePrepareSend}
                    >
                      {sendState === 'sending'
                        ? 'Sender e-post…'
                        : sendState === 'sent'
                          ? 'E-post sendt'
                          : 'Oppsummer og send'}
                    </button>
                  ) : (
                    <a className="ho-btn ho-btn--disabled" href="#valg" aria-disabled="true">
                      Velg løsning først
                    </a>
                  )}
                </div>
              )}

              {sendState === 'sent' ? (
                <p className="ho-live-hint">
                  Tilbudet er inngått. Bekreftelse er sendt til HoliSti — og en kopi med
                  fullt sammendrag er sendt til {client.email}.
                </p>
              ) : sendState === 'error' ? (
                <p className="ho-note">{sendError}</p>
              ) : sendState === 'confirm' ? (
                <p className="ho-note ho-note--soft">
                  Sjekk oppsummeringen — ved bekreftelse sendes e-post til HoliSti og en
                  kopi med fullt sammendrag til {client.email}.
                </p>
              ) : (
                <p className="ho-note ho-note--soft">
                  Ved sending: HoliSti får bekreftelsen, og du får en kopi til{' '}
                  {client.email}. Tilbudet er inngått når e-posten er sendt.
                </p>
              )}
            </div>
            <div className="ho-contact__card">
              <p>
                <strong>{holistiBrand.contact}</strong>
                <br />
                {holistiBrand.name}
              </p>
              <p>
                <a href={holistiBrand.site}>{holistiBrand.site.replace('https://', '')}</a>
              </p>
              <p>
                {FIRM_NAME}
                <br />
                {PHONE_DISPLAY}
                <br />
                {EMAIL}
                <br />
                {ADDRESS}
              </p>
              <p className="ho-legal-links">
                <a href={holistiBrand.vilkar} target="_blank" rel="noreferrer">
                  Salgsvilkår
                </a>
                {' · '}
                <a href={holistiBrand.personvern} target="_blank" rel="noreferrer">
                  Personvern
                </a>
                {!isWix ? (
                  <>
                    {' · '}
                    <a href={holistiBrand.platformVilkar} target="_blank" rel="noreferrer">
                      Plattformvilkår
                    </a>
                  </>
                ) : null}
              </p>
              <a className="ho-btn" href="/logout">
                Logg ut
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
