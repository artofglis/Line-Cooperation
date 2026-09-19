/**
 * Kundens designinnhold (tekster til forsider/landinger).
 * Forslagsrom-skall, tilbud og kundeinfo: se `proposal.config.ts`.
 *
 * PLASSHOLDERINNHOLD — opprinnelig skrevet for en coaching-/veiledningsvirksomhet.
 * Struktur, eksportnavn og objektnøkler er ment å gjenbrukes som de er; selve
 * teksten er generisk og MÅ skrives om for hver ny kunde/bransje. Der noe er
 * spesifikt for coaching/helse-bransjen (f.eks. friskrivelser) er det markert
 * tydelig i hakeparenteser under.
 */
export {
  ADDRESS,
  EMAIL,
  FIRM_NAME,
  ORG_NR,
  PHONE_DISPLAY,
  PHONE_HREF,
  SITE_URL,
  holistiBrand,
  holistiOffer,
  proposal,
} from './proposal.config'

/**
 * Tekstkilder (prioritet):
 * 1) Kundens egne dokumenter i zip/referanser
 * 2) Annonser/markedsføring i referanser/
 * 3) Nøkterne juridiske tilpasninger (ikke effektløfter)
 */

/**
 * Delt plassholder for bransjespesifikk friskrivelse. Denne teksten MÅ
 * vurderes på nytt for hver kunde — den er ikke ment til å kopieres blindt.
 * Eksempel fra opprinnelig mal: alternativ behandling erstatter ikke
 * offentlig helsetjeneste.
 */
const disclaimerPlaceholder =
  '[Bransjespesifikk friskrivelse — tilpass etter kundens bransje og evt. lovkrav. Eksempel fra opprinnelig mal: alternativ behandling erstatter ikke offentlig helsetjeneste.]'

export const heroQuote = '[Kort sitat eller leveregel som fanger kjernen i tilbudet]'

/** CTA-språk: forespørsel, ikke bookingkalender (se referanser/seo-sprak-audit-cta.md) */
export const contactCta = {
  nav: 'Kontakt',
  short: 'Send forespørsel',
  kartlegging: 'Send forespørsel om kartlegging',
  start: 'Ta det første, rolige steget',
  note:
    'Send en forespørsel — [Kontaktperson] leser henvendelser i ro og tar kontakt når det er kapasitet. Det finnes ingen online timebestilling.',
  noteLong:
    'Hos [Firmanavn] booker du ikke en time direkte. Du sender en kort forespørsel, så svarer [Kontaktperson] når det er ro. Sammen finner dere ut om — og når — en kartlegging passer.',
} as const

/**
 * Hero-støtte per design. 01 beholder originalt sitat.
 * Lede + seksjonskopi er bevisst ulike — seks redaksjonelle stemmer.
 */
export const designHeroCopy = {
  1: {
    quote: heroQuote,
    lede: '[Tjeneste 1], [tjeneste 2] og [tjeneste 3] i [Sted] — for deg som ønsker mer ro, innsikt og et tempo som passer deg.',
    note: '01 Veiviser: originalt budskap. Tydelig struktur, prosess og praktisk inngang.',
  },
  2: {
    quote: heroQuote,
    lede: 'Her møter du [Kontaktperson] — et menneske som lytter først. Historien din får plass før verktøyene.',
    note: '02 Portrett: menneske-til-menneske. Om kommer før hjelp-temaene; relasjon før produkt.',
  },
  3: {
    quote: heroQuote,
    lede: 'Ingen hast. Ingen fasit. Et jordnært rom der tempoet er ditt.',
    note: '03 Zen jord: minst produktspråk. Færre knapper, mer stillhet i språket.',
  },
  4: {
    quote: heroQuote,
    lede: 'Et kuratert rom for dem som vil investere i en prosess — med begrenset kapasitet, slik at tempoet holder.',
    note: '04 Premium: [Pakkenavn] i sentrum. Selektivt, håndverkspreget språk.',
  },
  5: {
    quote: heroQuote,
    lede: 'Begynn mykt. En forespørsel om kartlegging er nok — [Pakkenavn] kommer bare hvis det føles riktig etterpå.',
    note: '05 Lys zen: myk start. Kartlegging først; [Pakkenavn] som steg to.',
  },
  6: {
    quote: heroQuote,
    lede: 'Hos [Firmanavn] i [Sted] møter du [Kontaktperson] — [tjeneste 1], [tjeneste 2] og [tjeneste 3] for deg som vil ha mer ro, innsikt og et tempo som passer deg.',
    note: '06 Marine: [Kontaktperson]s egen stemme i navy-uttrykk. Ro, forespørsel og [Pakkenavn] — ikke maltekst.',
  },
} as const

/**
 * Seksjonskopi per design — ulike overskrifter, introer og CTA-er.
 * Fakta (hjelp-temaer, metoder, priser, juridikk) er fortsatt felles.
 */
export const designSectionCopy = {
  1: {
    voice: 'Nøktern veiviser',
    navCta: 'Send forespørsel',
    heroPrimary: { href: '?page=signatur&design=1', label: 'Utforsk [Pakkenavn]' },
    heroSecondary: { href: '#kontakt', label: 'Send forespørsel om kartlegging' },
    helpEyebrow: 'Hva kan vi hjelpe deg med?',
    helpTitle: 'Det du kan ta med hit',
    helpIntro:
      'Her er situasjoner mange kjenner seg igjen i. Du trenger ikke ha et ferdig spørsmål — bare et ærlig utgangspunkt.',
    signatureEyebrow: 'Hovedtilbud',
    signatureTitle: '[Pakkenavn] — et forløp, ikke et kurs',
    signatureIntro:
      'Et individuelt forløp for deg som er klar til å investere i deg selv. Ikke et standardprogram — men en helhetlig prosess tilpasset deg, din situasjon og ditt tempo.',
    signatureCta: 'Les mer om [Pakkenavn]',
    aboutEyebrow: 'Om',
    aboutTitle: 'Hvorfor [Firmanavn] ble til',
    methodsEyebrow: 'Verktøykassen',
    methodsTitle: 'Metoder tilpasset deg',
    methodsIntro:
      'Verktøyene velges etter det du står i — beskrevet nøkternt, uten lovnader om effekt.',
    pricesEyebrow: 'Priser',
    pricesTitle: 'Tre innganger — samme tempo',
    pricesIntro: 'Kartlegging, [Pakkenavn] eller enkelttimer — start der det kjennes riktig.',
    processEyebrow: 'Slik foregår det',
    processTitle: 'Fra forespørsel til første time',
    contactTitle: contactCta.start,
    contactNote: contactCta.noteLong,
  },
  2: {
    voice: 'Menneske-til-menneske',
    navCta: 'Kontakt',
    heroPrimary: { href: '#om', label: 'Møt [Kontaktperson]' },
    heroSecondary: { href: '#kontakt', label: 'Send forespørsel' },
    helpEyebrow: 'Temaer',
    helpTitle: 'Hva vi kan se på sammen',
    helpIntro: null as string | null,
    signatureEyebrow: 'Når du vil gå videre',
    signatureTitle: 'Når du vil gå et stykke sammen',
    signatureIntro:
      'Noen timer satt sammen etter at dere har blitt kjent. Prosessen følger deg — ikke en ferdig mal.',
    signatureCta: 'Se [Pakkenavn]',
    aboutEyebrow: '[Kontaktperson]',
    aboutTitle: 'Et møte med [Kontaktperson]',
    methodsEyebrow: 'Verktøy i bakgrunnen',
    methodsTitle: 'Metoder som støtter samtalen',
    methodsIntro:
      'Verktøyene er der når de trengs. Møtet med deg kommer først — metoden etterpå.',
    pricesEyebrow: 'Priser',
    pricesTitle: 'Velg utgangspunktet ditt',
    pricesIntro: null,
    processEyebrow: null,
    processTitle: null,
    contactTitle: contactCta.start,
    contactNote: contactCta.note,
  },
  3: {
    voice: 'Stillhet og tempo',
    navCta: 'Send forespørsel',
    heroPrimary: { href: '#hjelp', label: 'Les i ro' },
    heroSecondary: { href: '#om', label: 'Om [Firmanavn]' },
    helpEyebrow: 'Rom',
    helpTitle: 'Når noe i deg ber om mer rom',
    helpIntro: 'Ingen hast. Ingen fasit. Bare det som er sant for deg nå.',
    signatureEyebrow: 'Forløp',
    signatureTitle: 'Et forløp med luft mellom møtene',
    signatureIntro:
      'Noen timer, tilpasset deg. Rolig rytme — uten press om å «komme i mål».',
    signatureCta: 'Se [Pakkenavn]',
    aboutEyebrow: 'Bakgrunn',
    aboutTitle: 'Hvorfor [Firmanavn] ble til',
    methodsEyebrow: 'Verktøy',
    methodsTitle: 'Verktøy — brukt når det trengs',
    methodsIntro: 'En nøktern oversikt. Ingenting her lover et bestemt resultat.',
    pricesEyebrow: 'Priser',
    pricesTitle: 'Velg lite først',
    pricesIntro: null,
    processEyebrow: null,
    processTitle: null,
    contactTitle: contactCta.start,
    contactNote: contactCta.noteLong,
  },
  4: {
    voice: 'Kuratert investering',
    navCta: 'Send forespørsel',
    heroPrimary: { href: '?page=signatur&design=4', label: 'Utforsk [Pakkenavn]' },
    heroSecondary: { href: '#kontakt', label: 'Be om kartlegging' },
    helpEyebrow: 'Arbeidsfelt',
    helpTitle: 'Tema vi arbeider med',
    helpIntro: null,
    signatureEyebrow: 'Hovedtilbud',
    signatureTitle: '[Pakkenavn]',
    signatureIntro:
      'Satt sammen etter kartlegging — ikke et hylleprodukt. Et begrenset antall prosesser om gangen.',
    signatureCta: 'Les mer om [Pakkenavn]',
    aboutEyebrow: 'Om',
    aboutTitle: 'Hvorfor [Firmanavn] ble til',
    methodsEyebrow: 'Bak forløpet',
    methodsTitle: 'Verktøykassen bak forløpet',
    methodsIntro:
      'Metodene støtter [Pakkenavn] og enkelttimene — beskrevet uten effektløfter.',
    pricesEyebrow: 'Priser',
    pricesTitle: 'Inngang og forløp',
    pricesIntro: null,
    processEyebrow: null,
    processTitle: null,
    contactTitle: contactCta.start,
    contactNote: contactCta.note,
  },
  5: {
    voice: 'Myk start',
    navCta: 'Send forespørsel',
    heroPrimary: { href: '#kontakt', label: 'Send forespørsel om kartlegging' },
    heroSecondary: { href: '?page=signatur&design=5', label: 'Om [Pakkenavn]' },
    helpEyebrow: 'Kjenner du deg igjen?',
    helpTitle: 'Når hverdagen føles trang',
    helpIntro: null,
    signatureEyebrow: 'Neste steg',
    signatureTitle: 'Når kartleggingen peker videre',
    signatureIntro:
      '[Pakkenavn] er ikke første steg. Den kommer hvis dere sammen ser at et lengre forløp passer.',
    signatureCta: 'Se [Pakkenavn]',
    aboutEyebrow: 'Om',
    aboutTitle: 'Hvorfor [Firmanavn] ble til',
    methodsEyebrow: 'Metoder',
    methodsTitle: 'Metoder beskrevet nøkternt',
    methodsIntro: 'Kort oversikt — uten press om å velge metode på forhånd.',
    pricesEyebrow: 'Priser',
    pricesTitle: 'Begynn med en samtale',
    pricesIntro: null,
    processEyebrow: null,
    processTitle: null,
    contactTitle: 'Skriv noen setninger — du får svar når det er ro',
    contactNote: contactCta.noteLong,
  },
  6: {
    voice: '[Kontaktperson]s stemme · rolig dybde',
    navCta: 'Send forespørsel',
    heroPrimary: { href: '?page=signatur&design=6', label: 'Utforsk [Pakkenavn]' },
    heroSecondary: { href: '#kontakt', label: 'Send forespørsel om kartlegging' },
    helpEyebrow: 'Hva kan vi hjelpe deg med?',
    helpTitle: 'Det du kan ta med hit',
    helpIntro:
      'Her er situasjoner mange kjenner seg igjen i. Du trenger ikke ha et ferdig spørsmål — bare et ærlig utgangspunkt.',
    signatureEyebrow: 'Hovedtilbud',
    signatureTitle: '[Pakkenavn] — et forløp, ikke et kurs',
    signatureIntro:
      'Et individuelt forløp for deg som er klar til å investere i deg selv. Satt sammen etter kartlegging — tilpasset deg, din situasjon og ditt tempo. Ikke et standardprogram.',
    signatureCta: 'Les mer om [Pakkenavn]',
    aboutEyebrow: 'Om [Kontaktperson]',
    aboutTitle: 'Hvorfor [Firmanavn] ble til',
    methodsEyebrow: 'Verktøykassen',
    methodsTitle: 'Metoder tilpasset deg',
    methodsIntro:
      'Verktøyene velges etter det du står i. Møtet med deg kommer først — metoden etterpå. Beskrevet nøkternt, uten lovnader om effekt.',
    pricesEyebrow: 'Priser',
    pricesTitle: 'Tre innganger — samme tempo',
    pricesIntro:
      'Begynn gjerne med en gratis kartlegging. [Pakkenavn] kommer hvis dere sammen ser at et lengre forløp passer.',
    processEyebrow: null,
    processTitle: null,
    contactTitle: 'Ta det første, rolige steget',
    contactNote: contactCta.noteLong,
  },
} as const

export const design02NavLinks = [
  { href: '#om', label: 'Om' },
  { href: '#hjelp', label: 'Hjelp' },
  { href: '#pakke', label: '[Pakkenavn]' },
  { href: '#metoder', label: 'Metoder' },
  { href: '#priser', label: 'Priser' },
  { href: '#kontakt', label: 'Kontakt' },
] as const

export const design04Marquee = [
  'Forespørsel',
  'Kartlegging',
  '[Pakkenavn]',
  '[Sted]',
] as const

export const storyParagraphs = [
  'Jeg har i mange år jobbet med [relevant fagbakgrunn/yrkeserfaring] og møtt mennesker i ulike livssituasjoner. Erfaringene har lært meg å møte hvert menneske med respekt, nysgjerrighet og tillit til at ressursene for endring allerede finnes i mennesket.',
  'Etter hvert vokste ønsket om å arbeide på en annen måte — å møte mennesker som selv er klare for endring, som vil forstå seg selv bedre og ta en aktiv rolle i sin egen prosess. Det ble starten på [Firmanavn].',
  'For å kunne møte hele mennesket utdannet jeg meg videre innen [relevant fagfelt/spesialisering]. Jeg tror ikke på raske løsninger eller ferdige oppskrifter. Jeg tror på å gå et stykke av veien sammen med deg — slik at du kan finne tilbake til den du er.',
] as const

export const aboutNote =
  'Min rolle er ikke å gjøre deg til en annen. Jeg går et stykke av veien sammen med deg.'

export const closingWish =
  'Jeg har blitt kjent med meg selv på nytt. Jeg forstår bedre hvem jeg er, hvorfor jeg har handlet slik jeg har gjort, og jeg har fått mot til å velge livet mitt med større bevissthet.'

export const navLinks = [
  { href: '#hjelp', label: 'Hjelp' },
  { href: '#pakke', label: '[Pakkenavn]' },
  { href: '#om', label: 'Om' },
  { href: '#metoder', label: 'Metoder' },
  { href: '#priser', label: 'Priser' },
  { href: '#kontakt', label: 'Kontakt' },
] as const

export const helpAreas = [
  {
    title: '[Tema 1]',
    text: '[Kort beskrivelse av situasjonen eller utfordringen dette temaet handler om — skriv i kundens språk, ikke i fagspråk.]',
  },
  {
    title: '[Tema 2]',
    text: '[Kort beskrivelse — hva kjenner leseren igjen seg selv i her?]',
  },
  {
    title: '[Tema 3]',
    text: '[Kort beskrivelse — hva ønsker leseren mer av, eller mindre av?]',
  },
] as const

export const methods = [
  {
    when: '[Brukes blant annet ved ...]',
    title: '[Metode 1]',
    text: '[Kort, nøktern beskrivelse av metoden — hva den innebærer og hvordan den brukes.]',
  },
  {
    when: '[Brukes blant annet når ...]',
    title: '[Metode 2]',
    text: '[Kort, nøktern beskrivelse av metoden — unngå effektløfter.]',
  },
  {
    when: '[Brukes blant annet ved ...]',
    title: '[Metode 3]',
    text: '[Kort, nøktern beskrivelse av metoden.]',
  },
] as const

/** Kollapsbare juridiske tekster — {FIRM_NAME} byttes ut i komponenten. */
export const legalSections = [
  {
    id: 'ansvar',
    title: 'Om tjenestene',
    paragraphs: [
      '{FIRM_NAME} tilbyr [kort beskrivelse av tjenestetype — f.eks. rådgivning, coaching, behandling]. Markedsføringen er ment som en nøktern beskrivelse av virksomhetens art. Det gis ikke løfter om konkret effekt eller resultat.',
      disclaimerPlaceholder,
    ],
  },
  {
    id: 'personvern',
    title: 'Personvern',
    paragraphs: [
      'Når du tar kontakt, behandles navn, e-post og det du skriver i meldingen for å kunne svare deg. Opplysningene lagres ikke i et eget system via dette skjemaet — meldingen åpnes i din egen e-postklient og sendes til virksomheten.',
      'Du kan be om innsyn, retting eller sletting ved å kontakte oss på e-post. Nettsiden bruker ikke analyseverktøy eller markedsføringscookies.',
    ],
  },
  {
    id: 'vilkar',
    title: 'Vilkår og angrerett',
    paragraphs: [
      'Ved kjøp av pakker eller timer som inngås utenfor virksomhetens lokaler (for eksempel digitalt), gjelder angrerett etter angrerettloven — normalt 14 dager. Dersom tjenesten skal starte før angreretten utløper, innhentes uttrykkelig samtykke til dette.',
      'Avbestilling og ombooking avtales direkte. Mer detaljerte vilkår kan gis skriftlig før oppstart av [Pakkenavn] eller andre forløp.',
    ],
  },
] as const

/** Midtbanner per designforslag — ulike bilder/tekster tilpasset stil. */
export const midBanners = {
  d1: {
    image: '/images/hero.svg',
    caption: '[Sted] — et roligere tempo',
    objectPosition: 'center 42%',
  },
  d2: {
    image: '/images/path.svg',
    caption: 'Veien videre — i ditt tempo',
    objectPosition: 'center 55%',
  },
  d3: {
    image: '/images/hero.svg',
    caption: 'Rom for stillhet',
    objectPosition: 'center 48%',
  },
  d4: {
    image: '/images/path.svg',
    caption: 'Premium ro · [Pakkenavn]',
    objectPosition: 'center 40%',
  },
  d5: {
    image: '/images/portrett.svg',
    caption: 'Nærvær · klarhet · balanse',
    objectPosition: 'center 28%',
  },
  d6: {
    image: '/images/hero.svg',
    caption: '[Sted] — et roligere tempo',
    objectPosition: 'center 45%',
  },
} as const

export const designs = [
  {
    id: 1,
    label: '01',
    name: 'Ro & Tillit',
    note: 'Veiviser-stemme: prosess, tre innganger, nøktern struktur.',
  },
  {
    id: 2,
    label: '02',
    name: 'Portrett',
    note: 'Menneske-til-menneske: Om før hjelp, [Kontaktperson] først.',
  },
  {
    id: 3,
    label: '03',
    name: 'Zen jord',
    note: 'Stillhet: minst produktspråk, «les i ro» først.',
  },
  {
    id: 4,
    label: '04',
    name: 'Premium',
    note: 'Kuratert: [Pakkenavn] i sentrum, begrenset kapasitet.',
  },
  {
    id: 5,
    label: '05',
    name: 'Lys zen',
    note: 'Myk start: kartlegging først, [Pakkenavn] som steg to.',
  },
  {
    id: 6,
    label: '06',
    name: 'Marine',
    note: 'Navy med lys glow — [Kontaktperson]s egen stemme: [Firmanavn], [Sted], forespørsel.',
  },
] as const

export type DesignId = (typeof designs)[number]['id']

export const pages = [
  { id: 'hjem', label: 'Hjem', note: 'Hovedside — 1-siders i valgt stil.' },
  { id: 'om', label: 'Om', note: 'Historien — hvorfor [Firmanavn] ble til.' },
  { id: 'metoder', label: 'Metoder', note: 'Verktøykassen, nøkternt forklart.' },
  {
    id: 'time',
    label: 'En time',
    note: 'Slik foregår en time — tempo og forespørsel.',
  },
  { id: 'faq', label: 'FAQ', note: 'Ofte stilte spørsmål.' },
  {
    id: 'ro',
    label: 'Ro',
    note: 'Sneak peek: [Firmanavn] Ro-forespørsel (ikke live ennå).',
  },
  { id: 'sovn', label: 'Søvn', note: 'Landing for pedagogisk søvnprogram.' },
  {
    id: 'signatur',
    label: 'Signatur',
    note: 'Landing for [Pakkenavn] — med kampanjeplakater.',
  },
  {
    id: 'forsta',
    label: 'Forstå',
    note: 'Landing rundt selvforståelse og mønstre — med plakater.',
  },
  { id: 'tilbud', label: 'Kampanje', note: 'Landing for kampanjeannonse (3 timer).' },
  {
    id: 'holisti',
    label: 'Tilbudet',
    note: 'Pris, leveranse og HoliSti.',
  },
] as const

export type PageId = (typeof pages)[number]['id']

/** Historieside — tillit uten effektløfter */
export const omKundePage = {
  eyebrow: 'Om [Firmanavn]',
  headline: 'Hvorfor [Firmanavn] ble til',
  lede: 'En jordnær historie om veien fra mange år i møte med mennesker — til et rom for dem som selv er klare for endring.',
  paragraphs: storyParagraphs,
  roleTitle: 'Min rolle',
  roleText: aboutNote,
  contactTitle: 'Slik tar du kontakt',
  legal: disclaimerPlaceholder,
} as const

/** Dypere metode-sider (velg de 2–3 metodene kunden vil fremheve mest) */
export const methodDetails = [
  {
    slug: 'metode-1',
    title: '[Metode 1]',
    eyebrow: 'Metode',
    lede: '[Kort, nøktern beskrivelse av metoden — hva den innebærer og hvorfor den brukes.]',
    what: [
      '[Praktisk punkt 1 — hva skjer konkret i en økt?]',
      '[Praktisk punkt 2.]',
      '[Praktisk punkt 3 — tempo og tilpasning.]',
    ],
    session:
      '[Beskriv kort hvordan en typisk time/økt med denne metoden foregår, fra start til slutt.]',
    fit: '[Beskriv hvem denne metoden passer best for — uten å love et bestemt resultat.]',
  },
  {
    slug: 'metode-2',
    title: '[Metode 2]',
    eyebrow: 'Metode',
    lede: '[Kort, nøktern beskrivelse av metoden.]',
    what: [
      '[Praktisk punkt 1.]',
      '[Praktisk punkt 2.]',
      '[Praktisk punkt 3.]',
    ],
    session:
      '[Beskriv kort hvordan en typisk time/økt med denne metoden foregår.]',
    fit: '[Beskriv hvem denne metoden passer best for.]',
  },
  {
    slug: 'metode-3',
    title: '[Metode 3]',
    eyebrow: 'Metode',
    lede: '[Kort, nøktern beskrivelse av metoden.]',
    what: [
      '[Praktisk punkt 1.]',
      '[Praktisk punkt 2.]',
      '[Praktisk punkt 3.]',
    ],
    session:
      '[Beskriv kort hvordan en typisk time/økt med denne metoden foregår.]',
    fit: '[Beskriv hvem denne metoden passer best for.]',
  },
] as const

export const methodsPage = {
  eyebrow: 'Verktøykassen',
  headline: 'Metoder — nøktern og tydelig',
  lede: 'Her får du en kort forklaring på metodene som brukes. Beskrivelsene handler om prosessen — ikke om lovnader om resultat.',
  legal: disclaimerPlaceholder,
  moreTitle: 'Øvrige metoder i verktøykassen',
  ctaNote: contactCta.note,
} as const

export const sessionPage = {
  eyebrow: 'Forventninger',
  headline: 'Slik foregår en time',
  lede: 'Ingen online timebestilling. Du sender en forespørsel — så finner dere tid når begge har kapasitet.',
  steps: [
    {
      title: 'Du sender en forespørsel',
      text: 'Skriv noen setninger om det du står i. Du trenger ikke ha alt formulert. Det finnes ingen kalender du booker deg inn i.',
    },
    {
      title: 'Du får svar når det er ro',
      text: 'Det tas imot et begrenset antall prosesser om gangen. Du får svar når det er kapasitet — ikke nødvendigvis samme dag.',
    },
    {
      title: 'Dere avtaler et tidspunkt',
      text: 'Først da finner dere et vindu som passer. Digitalt eller i [Sted] — det du er mest komfortabel med.',
    },
    {
      title: 'Timen',
      text: 'Dere lander i det som er aktuelt for deg. Metodene tilpasses situasjonen. Du går derfra med mer klarhet — ikke med et garantert «resultat».',
    },
  ],
  notes: [
    'Gratis kartlegging er etter avtale, ikke «ledig i kalenderen».',
    'Du kan alltid si at tempoet er for høyt — det justeres.',
    disclaimerPlaceholder,
  ],
  ctaTitle: 'Når du er klar',
  cta: contactCta.kartlegging,
} as const

/** Sneak peek — Ro-forespørsel (demo, ikke lagring) */
export const roForesporselPage = {
  eyebrow: 'Sneak peek',
  headline: '[Firmanavn] Ro-forespørsel',
  lede: 'En vei inn uten kalenderbooking. Folk sender ønske og tema — du velger selv hvem du svarer, og når.',
  pitch:
    'Du får synlighet og en vei inn — uten at noen kan booke seg inn i kalenderen din mens du sover.',
  demoNote:
    'Dette er en klikkbar skisse i forslagsrommet. Ingenting lagres hos en server ennå — prøv flyten, se innboksen, og si ifra om du vil at vi bygger det ekte senere.',
  themes: [
    { id: 'tema-1', label: '[Tema 1]' },
    { id: 'tema-2', label: '[Tema 2]' },
    { id: 'tema-3', label: '[Tema 3]' },
    { id: 'usikker', label: 'Usikker / annet' },
  ],
  timings: [
    { id: 'formiddag', label: 'Formiddag denne uken' },
    { id: 'ettermiddag', label: 'Ettermiddag / kveld' },
    { id: 'neste-uke', label: 'Neste uke passer bedre' },
    { id: 'ingen-hast', label: 'Ingen hast' },
  ],
  thanksTitle: 'Takk — dette leses i ro',
  thanksBody:
    'Du har ikke booket en time. Du får kontakt når det er kapasitet, så finner dere ut om — og når — en kartlegging passer.',
  inboxTitle: 'Din innboks (skisse)',
  inboxLede:
    'Slik kan oversikten se ut hos deg: én liste, tydelig status — ingen som har snauet seg inn i kalenderen.',
  statuses: [
    { id: 'ny', label: 'Ny' },
    { id: 'avventer', label: 'Avventer' },
    { id: 'avtalt', label: 'Avtalt' },
    { id: 'ferdig', label: 'Ferdig' },
  ],
  sampleInbox: [
    {
      name: '[Navn A]',
      theme: '[Tema 1]',
      timing: 'Ingen hast',
      preview: '[Kort eksempel på henvendelsestekst.]',
      status: 'ny' as const,
    },
    {
      name: '[Navn B]',
      theme: '[Tema 2]',
      timing: 'Neste uke passer bedre',
      preview: '[Kort eksempel på henvendelsestekst.]',
      status: 'avventer' as const,
    },
    {
      name: '[Navn C]',
      theme: '[Tema 3]',
      timing: 'Formiddag denne uken',
      preview: '[Kort eksempel på henvendelsestekst.]',
      status: 'avtalt' as const,
    },
  ],
} as const

export const faqPage = {
  eyebrow: 'FAQ',
  headline: 'Ofte stilte spørsmål',
  lede: 'Praktiske svar — uten press og uten effektløfter.',
  items: [
    {
      q: 'Kan jeg booke time direkte online?',
      a: 'Nei. Hos [Firmanavn] finnes det ingen online timebestilling. Du sender en forespørsel, så får du svar når det er ro — og dere finner tid sammen.',
    },
    {
      q: 'Hvor raskt får jeg svar?',
      a: 'Henvendelser leses i ro. Du kan vanligvis forvente svar innen noen dager, men det kan ta lengre tid i perioder med fullt. Det er med vilje — ikke manglende interesse.',
    },
    {
      q: 'Er dette medisinsk behandling?',
      a: disclaimerPlaceholder,
    },
    {
      q: 'Må jeg møte fysisk i [Sted]?',
      a: 'Nei. Samtaler kan gjennomføres digitalt eller fysisk — det du er mest komfortabel med.',
    },
    {
      q: 'Hva koster det?',
      a: 'Priser står på forsiden under Priser / [Pakkenavn]. Enkelttimer og pakker avtales etter kartlegging.',
    },
    {
      q: 'Hva skjer i en første samtale?',
      a: 'Dere blir kjent med det du står i, og ser om — og hvordan — et videre løp kan passe. Se også siden «Slik foregår en time».',
    },
  ],
} as const

/** Pakke-landing — plakater fra referanser/annonser-markedsforing */
export const signaturpakkenPage = {
  eyebrow: 'Hovedtilbud',
  headline: '[Pakkenavn]',
  lede: 'Ingen mennesker er like. Derfor er heller ikke [Pakkenavn] det — et individuelt forløp tilpasset deg, dine mål og din utvikling.',
  quote: '[Kort sitat som understøtter pakkens filosofi]',
  intro: [
    'Gjennom [Pakkenavn] får du et personlig og helhetlig forløp, tilpasset deg, din situasjon og det du ønsker mer av i livet.',
    'Du følges et stykke av veien. Målet er ikke at du skal bli en annen, men at du skal finne tilbake til den du er — med dine ressurser, din styrke og dine egne svar.',
    'Ulike metoder og verktøy brukes ut fra dine behov — alltid med respekt for ditt tempo og din prosess.',
  ] as const,
  fitTitle: 'Du vil trolig ha størst utbytte dersom du',
  fit: [
    'kjenner at tiden er inne for å gjøre en endring',
    'ønsker mer ro, energi eller mening i hverdagen',
    'opplever stress, uro eller følelsen av å stå fast',
    'bærer med deg erfaringer som fortsatt påvirker livet ditt',
    'ønsker større forståelse for deg selv og hvorfor du reagerer som du gjør',
    'er villig til å møte deg selv med nysgjerrighet mellom timene',
  ] as const,
  bullets: [
    '[Antall] individuelt tilpassede timer',
    'Metoder fra verktøykassen etter behov',
    'Digitalt eller i [Sted]',
    'Uten løfte om et bestemt resultat',
  ] as const,
  priceNote: '[X XXX kr] for [antall] timer · inkl. mva · avtales etter kartlegging',
  cta: 'Send forespørsel om [Pakkenavn]',
  legal: disclaimerPlaceholder,
  heroImage: '/images/plakater/plakat-1.svg',
  heroImageAlt: 'Plakat: Lansering av [Pakkenavn] — [Kontaktperson], [Firmanavn]',
  secondaryImage: '/images/plakater/plakat-2.svg',
  secondaryImageAlt: 'Plakat: Varig endring på dine premisser — [Pakkenavn], [Firmanavn]',
} as const

/** Landing rundt selvforståelse — plakater fra referanser/annonser-markedsforing */
export const forstaDegSelvPage = {
  eyebrow: 'Selvforståelse',
  headline: '[Overskrift — hvorfor reagerer jeg fortsatt slik?]',
  lede: 'Hva ville endret seg om du forsto deg selv bedre? Noen ganger handler det ikke om å bli en annen — det handler om å forstå hvorfor du reagerer, føler og handler som du gjør.',
  body: [
    'Hos [Firmanavn] møter du et menneske som lytter, støtter og går veien sammen med deg — slik at du kan skape mer ro, klarhet og balanse i livet.',
    'Du er hjertelig velkommen til en uforpliktende prat. Det finnes ingen online timebestilling — du sender en forespørsel, så får du svar når det er ro.',
  ] as const,
  themesTitle: 'Temaer mange tar med hit',
  themes: [
    {
      title: '[Tema 1]',
      text: '[Kort beskrivelse av temaet.]',
    },
    {
      title: '[Tema 2]',
      text: '[Kort beskrivelse av temaet.]',
    },
    {
      title: '[Tema 3]',
      text: '[Kort beskrivelse av temaet.]',
    },
  ] as const,
  cta: 'Send forespørsel om en prat',
  legal: disclaimerPlaceholder,
  heroImage: '/images/plakater/plakat-3.svg',
  heroImageAlt: 'Plakat: [Overskrift] — [Firmanavn]',
  secondaryImage: '/images/plakater/plakat-4.svg',
  secondaryImageAlt: 'Plakat: Nøkkelen til et bedre liv er å forstå deg selv bedre — [Firmanavn]',
} as const

/** Kampanje-landing basert på en tidsbegrenset annonse */
export const tilbudOffer = {
  eyebrow: 'Eksklusivt tilbud',
  headline: '[Kampanjeoverskrift, del 1]',
  highlight: '[Kampanjeoverskrift, del 2]',
  intro:
    '[Kort intro — hva er bakgrunnen for tilbudet? Hva får kunden et lavterskel inngangspunkt til å prøve?]',
  tools: [
    '[Verktøy/tjeneste 1]',
    '[Verktøy/tjeneste 2]',
    '[Verktøy/tjeneste 3]',
    '[Verktøy/tjeneste 4]',
  ] as const,
  packageTitle: 'Eksklusivt pakketilbud — med mulighet for forlengelse',
  hours: '[Antall] timer',
  price: 'kr [XXX] pr. time',
  priceNote: 'Ekskl. mva · Ordinær pris kr [X XXX] pr. time',
  bullets: [
    'Mulighet for forlengelse etter behov',
    'Digitalt eller i [Sted]',
    'Ta kontakt for mulige tidspunkter etter avtale — og om tilbudet fortsatt gjelder',
  ] as const,
  fit: '[Kort setning om hvem tilbudet passer for.]',
  cta: 'Send gjerne en forespørsel for mer informasjon.',
  legal: disclaimerPlaceholder,
  image: '/images/kampanje.svg',
  imageAlt: 'Kampanjeannonse: [Kampanjeoverskrift] — [Firmanavn]',
} as const

/** Landingsside for et avgrenset, pedagogisk delprogram (fra designforslag konsept 5, tilpasset alle stiler) */
export const sovnProgram = {
  eyebrow: 'Et pedagogisk program',
  headline: '[Overskrift som beskriver ønsket resultat]',
  lede: '[Kort lede — hvem er dette for, og hva slags rolig, pedagogisk løp tilbys?]',
  meta: '[Varighet] kartlegging · digitalt eller i [Sted] · ingen forpliktelse',
  recognizeTitle: '[Overskrift som speiler leserens situasjon]',
  symptoms: [
    '[Kjennetegn/situasjon 1 som leseren kan kjenne seg igjen i.]',
    '[Kjennetegn/situasjon 2.]',
    '[Kjennetegn/situasjon 3.]',
    '[Kjennetegn/situasjon 4.]',
  ] as const,
  stepsTitle: '[Antall] trinn mot [ønsket resultat]',
  steps: [
    {
      title: 'Kartlegging',
      text: '[Hva ses det på i denne fasen?]',
    },
    {
      title: 'Pedagogisk verktøy',
      text: '[Hvilke konkrete grep tilbys — tilpasset kundens hverdag?]',
    },
    {
      title: 'Oppfølging',
      text: '[Hvordan justeres løpet underveis?]',
    },
  ] as const,
  quote: '[Kort sitat som oppsummerer programmets filosofi]',
  faqs: [
    {
      q: 'Hvor lang tid tar programmet?',
      a: 'Det starter med en gratis kartlegging etter avtale (du sender forespørsel først) og et løp legges sammen — typisk noen uker, avhengig av hva du står i.',
    },
    {
      q: 'Kan jeg booke time direkte online?',
      a: 'Nei. Hos [Firmanavn] finnes det ingen online timebestilling. Du sender en forespørsel, så får du svar når det er ro — og dere finner tid sammen.',
    },
    {
      q: 'Må jeg møte fysisk i [Sted]?',
      a: 'Nei. Samtalene kan gjennomføres digitalt eller fysisk — det du er mest komfortabel med.',
    },
    {
      q: 'Er dette en erstatning for medisinsk behandling?',
      a: disclaimerPlaceholder,
    },
  ] as const,
  ctaTitle: 'Når du er klar for å komme i gang',
  cta: 'Send forespørsel om kartlegging',
} as const
