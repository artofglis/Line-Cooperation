import { designs, type DesignId } from './content'
import type { DomainChoice } from './domainChoice'
import type { HostChoice } from './hostChoice'
import { holistiBrand, holistiOffer, proposal } from './proposal.config'

export const GO_FURTHER_COMMENT_MAX = 200

export type GoFurtherPayload = {
  designId: DesignId
  designLabel: string
  hostId: HostChoice
  hostTitle: string
  delivery: string
  pages: string
  domainTitle: string
  clientName: string
  clientFirstName: string
  firmName: string
  clientEmail: string
  priceDisplay: string
  revisionRounds: string
  /** Salgsvilkår for nettsidetilbudet */
  salesTerms: string[]
  /** Plattform / pilot — separat fra salgsvilkår */
  platformTerms: string[]
  /** Bakoverkompatibel flat liste (salgs + plattform) */
  terms: string[]
  termsSummary: string
  salesTermsUrl: string
  platformTermsUrl: string
  /** Kort kommentar — ikke del av inkluderte justeringsrunder */
  comment: string
  /** Bakoverkompatibel alias for worker / eldre klienter */
  changeNotes: string
  /** Absolute URL til HoliSti-brosjyre (kun pilot/egen side) */
  brochureUrl: string
  brochureTitle: string
  brochureBlurb: string
}

export type GoFurtherSummary = {
  choices: { label: string; value: string }[]
  salesTerms: string[]
  platformTerms: string[]
  /** Flat liste for bakoverkompatibilitet */
  terms: string[]
  brochure: {
    title: string
    href: string
    cta: string
    blurb: string
  } | null
}

function normalizeComment(value?: string) {
  return (value || '').trim().slice(0, GO_FURTHER_COMMENT_MAX)
}

function brochureAbsoluteUrl() {
  const path = holistiBrand.platformBrochure.href
  if (path.startsWith('http')) return path
  return `${proposal.siteUrl.replace(/\/$/, '')}${path}`
}

/** Salgsvilkår for nettsidetilbudet — gjelder begge løsninger */
export function buildGoFurtherSalesTerms(): string[] {
  const revisionRounds = holistiOffer.revisionRounds.title
  return [
    `${revisionRounds} er inkludert — finpuss basert på den stilen du valgte (ikke bytte til en annen stilretning).`,
    'Eventuell kommentar i e-posten er ikke en del av de inkluderte justeringsrundene.',
    'Når e-posten er sendt, er tilbudet inngått og avtalt.',
    'Faktura eller kvittering sendes på e-post. Arbeid og leveranse starter typisk etter betaling (eller etter avtalt betalingsmåte, f.eks. Vipps).',
    'Du får en kopi av denne bekreftelsen på e-post med fullt sammendrag.',
    `Fulle salgsvilkår: ${holistiBrand.vilkar}`,
  ]
}

/** Plattform / pilot — bare ved egen side; egne SaaS-vilkår */
export function buildGoFurtherPlatformTerms(host: HostChoice): string[] {
  if (host !== 'external') return []
  return [
    'Referanseavtale følger med pilottilbudet: HoliSti kan nevne deg som kunde og vise prosjektet profesjonelt; du kan si nei til konkrete bruksområder.',
    'Pilotfasen (kostnadsfri HoliSti-plattform) teller fra avtaleinngåelse — ca. 3 måneder; kan forlenges, ikke forkortes.',
    'Etter piloten velger du selv om du starter Starter (149,50 kr/mnd) eller Pro (399,50 kr/mnd) — 50 % livstid. Det skjer ikke automatisk; nettsiden kan du beholde uten plattformabonnement.',
    `Brosjyre følger med: «${holistiBrand.platformBrochure.title}» (PDF) — slik HoliSti er tenkt; funksjoner kan komme gradvis i pilotfasen.`,
    `Plattformens egne vilkår: ${holistiBrand.platformVilkar}`,
  ]
}

/** Flat liste — bakoverkompatibel for eldre kall */
export function buildGoFurtherTerms(host: HostChoice): string[] {
  return [...buildGoFurtherSalesTerms(), ...buildGoFurtherPlatformTerms(host)]
}

export function buildGoFurtherPayload(input: {
  design: DesignId
  host: HostChoice
  domain: DomainChoice | null
  comment?: string
  /** @deprecated bruk comment */
  changeNotes?: string
}): GoFurtherPayload {
  const activeDesign = designs.find((item) => item.id === input.design) ?? designs[0]
  const hostMeta = holistiOffer.hostingOptions.find((item) => item.id === input.host)
  const domainMeta = holistiOffer.domainOptions.find((item) => item.id === input.domain)
  const isWix = input.host === 'wix'
  const pages = isWix
    ? 'Forside + Søvn'
    : 'Forside + Søvn + ekstra sider (Om, Metoder, En time, FAQ) + bonus'
  const revisionRounds = holistiOffer.revisionRounds.title
  const comment = normalizeComment(input.comment ?? input.changeNotes)
  const salesTerms = buildGoFurtherSalesTerms()
  const platformTerms = buildGoFurtherPlatformTerms(input.host)
  const terms = [...salesTerms, ...platformTerms]
  const includeBrochure = input.host === 'external'
  const brochure = holistiBrand.platformBrochure

  return {
    designId: activeDesign.id,
    designLabel: `${activeDesign.label} ${activeDesign.name}`,
    hostId: input.host,
    hostTitle: hostMeta?.title ?? input.host,
    delivery: hostMeta?.delivery ?? '',
    pages,
    domainTitle: domainMeta?.title ?? 'ikke valgt ennå',
    clientName: proposal.client.fullName,
    clientFirstName: proposal.client.firstName,
    firmName: proposal.client.firmName,
    clientEmail: proposal.client.email,
    priceDisplay: holistiOffer.priceDisplay,
    revisionRounds,
    salesTerms,
    platformTerms,
    terms,
    termsSummary: [
      `Pris: ${holistiOffer.priceDisplay} inkl. mva.`,
      ...terms,
    ].join(' '),
    salesTermsUrl: holistiBrand.vilkar,
    platformTermsUrl: includeBrochure ? holistiBrand.platformVilkar : '',
    comment,
    changeNotes: comment,
    brochureUrl: includeBrochure ? brochureAbsoluteUrl() : '',
    brochureTitle: includeBrochure ? brochure.title : '',
    brochureBlurb: includeBrochure ? brochure.blurb : '',
  }
}

export function buildGoFurtherSummary(input: {
  design: DesignId
  host: HostChoice
  domain: DomainChoice | null
  comment?: string
}): GoFurtherSummary {
  const payload = buildGoFurtherPayload(input)
  const brochure =
    input.host === 'external'
      ? {
          title: holistiBrand.platformBrochure.title,
          href: holistiBrand.platformBrochure.href,
          cta: holistiBrand.platformBrochure.cta,
          blurb: holistiBrand.platformBrochure.blurb,
        }
      : null
  return {
    choices: [
      { label: 'Stil', value: payload.designLabel },
      { label: 'Løsning', value: payload.hostTitle },
      { label: 'Sider', value: payload.pages },
      { label: 'Levering', value: payload.delivery || '—' },
      { label: 'Nettadresse', value: payload.domainTitle },
      { label: 'Pris', value: `${payload.priceDisplay} inkl. mva.` },
    ],
    salesTerms: payload.salesTerms,
    platformTerms: payload.platformTerms,
    terms: payload.terms,
    brochure,
  }
}

export async function sendGoFurtherEmail(input: {
  design: DesignId
  host: HostChoice
  domain: DomainChoice | null
  comment?: string
  changeNotes?: string
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const payload = buildGoFurtherPayload(input)
  try {
    const response = await fetch('/api/ga-videre', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = (await response.json().catch(() => ({}))) as {
      ok?: boolean
      error?: string
    }
    if (!response.ok || !data.ok) {
      return { ok: false, error: data.error || 'Kunne ikke sende e-post. Prøv igjen.' }
    }
    return { ok: true }
  } catch {
    return { ok: false, error: 'Nettverksfeil — kunne ikke sende e-post.' }
  }
}
