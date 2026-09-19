/**
 * MAL — kopier til `proposal.config.ts` for et nytt forslagsrom.
 *
 * Sjekkliste for ny kunde:
 * 1. Kopier denne filen → `proposal.config.ts` og fyll ut
 * 2. Bytt designinnhold i `content.ts`, `src/designs/`, `public/images/`
 * 3. Oppdater `wrangler.jsonc` (name, host, vars for innlogging)
 * 4. Oppdater `index.html` meta/tittel til kundens merkevare (for designforslagene)
 * 5. `npm run deploy`
 *
 * Innloggingssiden er bevisst uten kundenavn — den er HoliSti-generisk.
 */

export const holistiBrand = {
  name: 'HoliSti by Pedersen',
  shortName: 'HoliSti',
  site: 'https://holisti.no',
  platform: 'https://platform.holisti.no/hjem',
  /** Salgs-/avtalevilkår for nettsidetjenester (dette tilbudet) */
  vilkar: 'https://holisti.no/vilkar',
  personvern: 'https://holisti.no/personvern',
  /** SaaS-vilkår for HoliSti Platform — separat fra nettsidetilbudet */
  platformVilkar: 'https://platform.holisti.no/vilkar',
  platformPersonvern: 'https://platform.holisti.no/personvern',
  contact: 'Stine Hol Pedersen',
  blurb:
    'HoliSti hjelper merkevarer og små og mellomstore bedrifter med nettsider, synlighet og markedsføring — med fokus på at design og budskap skal treffe riktig person på riktig tidspunkt.',
  platformBlurb:
    'platform.holisti.no er under utvikling: en markedsføringsplattform for blant annet å generere og planlegge innhold. Fremover skal kunder også kunne redigere og oppdatere nettsiden der — kostnadsfritt for mine kunder når løsningen er lansert.',
  /** Informasjonsbrosjyre — følger pilot/egen side i tilbud og e-posteksport */
  platformBrochure: {
    title: 'Slik redigerer og oppdaterer du nettsted og kanaler',
    href: '/docs/holisti-redigering-og-oppdatering.pdf',
    cta: 'Åpne brosjyren (PDF)',
    blurb:
      'Kort om hvordan HoliSti er tenkt: AI foreslår, du godkjenner, HoliSti publiserer — fra ett sted. I pilotfasen får du tidlig tilgang; funksjoner kan komme gradvis.',
  },
} as const

export const proposal = {
  slug: 'line',
  host: 'line.holisti.no',
  siteUrl: 'https://line.holisti.no',

  // Feature-flagg: slå av/på hvilke sider som vises i forslagsrommet, per kunde.
  // Utelatt eller true = vises. false = skjules i panelet og via URL. Dette er
  // mekanismen som lar én kodebase levere ulike forslagsrom uten kodeendring.
  modules: {
    pages: {
      hjem: true,
      om: true,
      metoder: true,
      time: true,
      faq: true,
      ro: true,
      sovn: true,
      signatur: true,
      forsta: true,
      tilbud: true,
      holisti: true,
    },
  },

  client: {
    firstName: 'Line',
    fullName: 'Line Sivertsen',
    firmName: 'Line Cooperation',
    // TODO: org.nr sto ikke i tilbudet TIL-2026-4 — fyll inn før lansering.
    orgNr: '000000000',
    // TODO: telefon/e-post ikke bekreftet — fyll inn kundens kontaktinfo.
    phoneDisplay: '+47 000 00 000',
    phoneHref: 'tel:+4700000000',
    email: 'post@example.no',
    address: 'Bergsveien 51, 9475 Borkenes',
    logo: {
      src: '/images/logo/client-wordmark.svg',
      ring: '/images/logo/client-ring.svg',
      full: '/images/logo/client-full.svg',
      alt: 'Line Cooperation',
    },
  },

  offer: {
    // Fra tilbud TIL-2026-4 (07.09.2026): flersiders nettsted 3 750 + redigeringstilgang 2 000
    // + Google Business Profile 1 500 = 7 250 kr. Google Analytics/innholdsstrategi 0 kr.
    priceDisplay: '7 250 kr',
    priceNote:
      'Prisen er inkludert mva. slik situasjonen er nå — uten ekstra mva-beløp i tillegg. HoliSti by Pedersen er foreløpig ikke mva-registrert.',
    headline: 'Tilbud på ferdig nettside',
    intro:
      'Takk for hyggelig prat, Line. Under finner du forslag til hvordan siden for Line Cooperation kan se ut, og et klart tilbud på hva som er med.',
    quoteHook: 'Sparring som gjør bedriften bedre',
    directionNote: 'kort beskrivelse av designretningen i dette forslaget',
    viewingTip: {
      title: 'Se forslagene på telefon og datamaskin',
      text: 'Åpne gjerne siden både på telefon og PC — bla gjennom stilene begge steder.',
      note: 'Den runde knappen nederst til høyre (samme sted på telefon og PC) åpner forslagsmenyen — der bytter du side, stil, løsning og domene. Bruk samme innlogging som sist.',
    },
    offerKinds: {
      intro:
        'Wix = introduksjonstilbud. Egen side = pilottilbud med flere sider og HoliSti-verktøy.',
      wix: {
        badge: 'Introduksjonstilbud',
        title: 'Wix — introduksjon',
        tag: '2 sider',
        text: 'Kjent redigering, smalere leveranse.',
      },
      external: {
        badge: 'Pilottilbud · HoliSti',
        title: 'Egen side (utenfor Wix) — pilot',
        tag: '≈150 % mer leveranse',
        text: 'Siden er allerede laget, flere sider følger med, tidlig HoliSti-verktøy.',
      },
    },
    /** Abonnementspriser platform.holisti.no — ikke salgsvilkår for nettsidetilbudet */
    platformPricing: {
      title: 'Plattformpris (valgfritt — ikke del av tilbudsprisen)',
      intro:
        'Gjelder HoliSti Platform, ikke selve nettsidetilbudet. Kort om kostnadsfri pilotperiode og hva som skjer etterpå.',
      plans: [
        { name: 'Starter', ordinary: 'X XX kr/mnd', pilot: 'X XX,XX kr/mnd' },
        { name: 'Pro', ordinary: 'X XX kr/mnd', pilot: 'X XX,XX kr/mnd', note: 'Hvis kunden trenger pakken over Starter' },
      ],
      note: 'Plattformabonnement er separat fra nettsideavtalen og starter ikke automatisk. Plattformens egne vilkår: platform.holisti.no/vilkar.',
    },
    /** Salgsvilkår for nettsidetilbudet — fulltekst på holisti.no/vilkar */
    salesTerms: {
      title: 'Salgsvilkår for dette tilbudet',
      intro:
        'Nettsidetilbudet følger HoliStis avtalevilkår for nettsider — ikke plattformens SaaS-vilkår.',
      points: [
        'Avtalen inngås når kunden sender «Gå videre».',
        'Pris, omfang, stil og nettadresse følger valgene i forslagsrommet.',
        'To justeringsrunder er inkludert.',
        'Faktura/kvittering på e-post; arbeid typisk etter betaling.',
        'Kunden eier side, domene og innhold.',
      ],
      fullLabel: 'Les fulle avtalevilkår på holisti.no',
      note: 'Plattform (ved pilot) har egne vilkår på platform.holisti.no/vilkar.',
    },
    reassurance: {
      title: 'Trygt å velge',
      intro: 'Korte trygghetspunkter.',
      points: ['Du trenger ikke forstå alt nå.', 'Tempo er ditt.'],
    },
    /**
     * Disse punktene dekker spørsmål som går igjen hos nesten alle kunder
     * (knapp/navigering, eierskap, hosting, vedlikehold, flere sider senere,
     * utgiftskontroll, publiseringskontroll) — behold dem som utgangspunkt
     * og juster kun tall/navn per kunde.
     */
    offerFaq: [
      {
        q: 'Hvilke vilkår gjelder for tilbudet?',
        a: 'Nettsideleveransen: holisti.no/vilkar. HoliSti Platform (ved pilot): egne SaaS-vilkår på platform.holisti.no/vilkar.',
      },
      {
        q: 'Hva er forskjellen på introduksjon og pilot?',
        a: 'Wix = introduksjon. Egen side = pilot med HoliSti-verktøy.',
      },
      {
        q: 'Hva er den runde knappen nederst til høyre?',
        a: 'Forslagsmenyen — samme sted på telefon og PC. Der velger kunden løsning, domene, side og stil. Valgene følger med i lenken.',
      },
      {
        q: 'Eier kunden nettsiden, domenet og koden selv?',
        a: 'Ja, uansett løsning. HoliSti drifter og hjelper til, men eier ikke siden, domenet eller (ved egen side) koden.',
      },
      {
        q: 'Hva betyr «hosting»?',
        a: 'Den tekniske tjenesten som holder nettsiden tilgjengelig døgnet rundt. Ved egen side: Cloudflare. Ved Wix: inkludert i Wix-abonnementet.',
      },
      {
        q: 'Hva innebærer vedlikehold etter lansering?',
        a: 'Justeringsrundene dekker finpuss rett etter lansering. Senere: små endringer får kunden opplæring i og kan gjøre selv, kostnadsfritt. Større endringer avtales med tid/pris før oppstart.',
      },
      {
        q: 'Kan kunden få flere landingssider senere?',
        a: 'Ja — avtales som egen, avgrenset leveranse med fast pris per side, ikke løpende timepris.',
      },
      {
        q: 'Har kunden full oversikt over utgiftene?',
        a: 'Ja. Ingenting faktureres eller startes automatisk uten forhåndsgodkjenning. Kvittering/faktura sendes alltid.',
      },
      {
        q: 'Bestemmer kunden selv hva som publiseres?',
        a: 'Ja, alltid — inkludert bruk av prosjektet som referanse. Kunden kan si nei til konkrete bruksområder.',
      },
    ],
    valueCompare: {
      intro: 'Vis ordinær HoliSti-verdi for hver pakke mot tilbudsprisen.',
      priceListNote: 'Ordinære priser fra holisti.no: Enkel / Flersiders / Skreddersydd.',
      packages: [
        {
          id: 'wix' as const,
          title: 'Wix — introduksjonstilbud',
          scope: 'Kjernesider',
          tag: 'Ordinært 5 000 kr',
          ordinaryPrice: '5 000 kr',
          ordinaryLabel: 'Ordinær HoliSti «Enkel»',
          offerPrice: 'X XXX kr',
          note: 'Kort merknad om verdien.',
        },
        {
          id: 'external' as const,
          title: 'Egen side — pilottilbud',
          scope: 'Kjerne + ekstra sider',
          tag: 'Ordinært 7 500 kr',
          ordinaryPrice: '7 500 kr',
          ordinaryLabel: 'Ordinær HoliSti «Flersiders»',
          offerPrice: 'X XXX kr',
          note: 'Kort merknad om verdien.',
        },
      ],
    },
    hostCompare: {
      intro: 'Fordeler og ulemper side om side.',
      columns: [
        {
          id: 'external' as const,
          title: 'Egen side · pilot',
          pros: ['Raskere', 'Flere sider med'],
          cons: ['Ikke Wix-redigering'],
        },
        {
          id: 'wix' as const,
          title: 'Wix · introduksjon',
          pros: ['Kjent redigering'],
          cons: ['Lengre levering', 'Smalere omfang'],
        },
      ],
    },
    hostFollowUp: {
      none: 'Velg et kort over — oppfølgingsteksten følger valget.',
      wix: {
        title: 'Du har valgt introduksjonstilbudet (Wix)',
        paragraphs: ['Kun kjernesider i Wix.'],
      },
      external: {
        title: 'Du har valgt pilottilbudet (egen side)',
        paragraphs: ['Flere sider + HoliSti-verktøy i pilot.'],
      },
    },
    included: [
      'Valgt designretning — kunden velger den stilen hun liker best',
      'Forside — ferdig og mobiltilpasset',
      'Evt. ekstra kjerne-side (f.eks. kampanje/søvn)',
      'Publisering / oppsett',
      'To justeringsrunder inkludert — finpuss basert på valgt stil',
      'Grunnleggende opplæring i enkle endringer — kostnadsfritt',
      'Grunnleggende optimalisering av Google-bedriftsprofil — kostnadsfritt',
      'Flytting av eksisterende domene (ved behov) — kostnadsfritt',
      'Mulighet til å beholde forslags-subdomenet uten ekstra kostnad',
    ],
    revisionRounds: {
      title: 'To justeringsrunder',
      text: 'Kunden velger den stilen hun liker best — justeringsrundene er finpuss basert på den.',
      note: 'Ikke bytte til en annen stilretning; nye sider/større funksjoner avtaler vi separat.',
    },
    /** Referanseavtale — kun pilot/egen side (ikke salgsvilkår for tilbudet) */
    referenceAgreement: {
      title: 'Referanseavtale (pilot)',
      intro:
        'Ved pilottilbudet (egen side) inngår kunden også en enkel referanseavtale — del av pilotvilkårene, ikke et ekstra gebyr.',
      points: [
        'HoliSti kan nevne kunden og vise prosjektet profesjonelt (firmanavn, logo, lenke).',
        'Sitat/tilbakemelding brukes bare hvis kunden er komfortabel med det.',
        'Ingen løfter om resultater på vegne av HoliSti.',
        'Kunden kan si nei til konkrete bruksområder.',
      ],
      note: 'Wix-introduksjonstilbudet krever ikke referanseavtale.',
    },
    /** Hosting — kanonisk sted (domenepriser står under Domene) */
    hostingCosts: {
      title: 'Hosting og drift',
      external: 'Kort om hostingløsning og typisk kostnad ved egen side.',
      wix: 'Ved Wix ligger hosting i Wix-abonnementet.',
    },
    emailChangeTips: {
      title: 'Noter gjerne ønskede endringer i e-posten',
      intro: 'Valgfritt — skriv kort det du allerede vet, eller bruk justeringsrundene senere.',
      suggestions: [
        'Tekster som bør mykes opp eller kortes ned',
        'Bilder eller logo',
        'Noe på forsiden som ikke treffer',
        'Kontaktinfo / hvordan forespørsel skal fungere',
        'Nettadresse',
      ],
      commentLabel: 'Kommentar til HoliSti (valgfritt)',
      commentHint: 'Maks 200 tegn. Ikke en del av de inkluderte justeringsrundene.',
      commentPlaceholder: 'Skriv kort — eller la feltet stå tomt.',
    },
    deliveryScope: {
      bothTitle: 'I begge løsninger',
      bothIntro: 'Samme pris. Kjernen er forside (+ evt. én ekstra kjerne-side) i valgt stil.',
      corePages: [
        { page: 'hjem', label: 'Forside', note: '1-siders hovedside i valgt stil' },
      ],
      externalTitle: 'Kun ved egen side (utenfor Wix)',
      externalIntro:
        'Ekstra sider følger med uten ekstra kostnad ved egen side — ikke i Wix-valget for denne prisen.',
      externalPages: [
        { page: 'om', label: 'Om', note: 'Historie / om-side' },
        { page: 'metoder', label: 'Metoder', note: 'Verktøykasse' },
      ],
      bonusTitle: 'Bonus ved egen side',
      bonusIntro: 'Ekstra som følger med egen side — ikke noe kunden må ta stilling til først.',
      bonusPages: [
        { page: 'ro', label: 'Ro / forhåndsvisning', note: 'Senere funksjon' },
      ],
      wixNote:
        'Wix-leveransen er kjernesidene. Flere sider kan legges til senere mot egen tid/pris.',
    },
    hostingOptions: [
      {
        id: 'external' as const,
        title: 'Egen side (utenfor Wix)',
        tag: '1–3 virkedager',
        delivery: 'Typisk 1–3 virkedager etter avtale og betaling',
        text: 'Forslaget er allerede laget. Kjernesider + ekstra sider følger med. Forslagsvinduet fjernes, nettadressen kobles — og du er i gang.',
      },
      {
        id: 'wix' as const,
        title: 'Wix',
        tag: '2–4 uker',
        delivery: 'Typisk 2–4 uker etter avtale (avhengig av innhold og tilbakemeldinger)',
        text: 'Kjent redigering. Leveransen er kjernesidene i valgt stil — bygget på nytt i Wix.',
      },
    ],
    deliveryCompare:
      'Samme pris. Forskjellen er tid og omfang: egen side går raskere og flere sider følger med. Wix bygges på nytt — derfor smalere leveranse i denne prisen.',
    platformNote:
      'Ved egen side / pilot: HoliSti-verktøyet er under utvikling for enkle oppdateringer — kostnadsfritt i pilotfasen for mine kunder.',
    domainOptions: [
      {
        id: 'subdomain' as const,
        title: 'Behold forslagsadressen',
        short: 'Uten ekstra kostnad',
        hosts: ['external'] as const,
        text: 'Behold forslagsadressen uten ekstra kostnad.',
        textExternal: 'Kan byttes til egen .no senere.',
        textWix: '',
      },
      {
        id: 'existing' as const,
        title: 'Din eksisterende nettadresse',
        short: 'Koble / flytt det du har',
        hosts: ['external', 'wix'] as const,
        text: 'Eksisterende adresse: trenger tilgang hos leverandøren.',
        textExternal: 'Ofte kjøpt via Wix — hjelper til å flytte uten ekstra kostnad.',
        textWix: 'Behold adressen i Wix; vi publiserer dit.',
      },
      {
        id: 'new' as const,
        title: 'Ny .no-adresse',
        short: 'Ofte rundt 99 kr første år',
        hosts: ['external', 'wix'] as const,
        text: 'Ny .no-adresse hos f.eks. Domeneshop, Webhuset eller Gigahost.',
        textExternal: 'Sjekk fornyelsespris; kobles til egen side.',
        textWix: 'Registreres/kobles i Wix eller hos egen leverandør.',
      },
    ],
    domainIntro:
      'Velg ett kort — oppfølgingen følger bare det valget og Wix/egen side.',
    domainWixNote:
      'Introduksjon/Wix: forslagsadressen er skjult. Velg eksisterende eller ny.',
    domainFollowUp: {
      none: 'Velg et kort over.',
      needHost: 'Velg også Wix eller egen side over.',
      clearedByWix: 'Forslagsadressen ble fjernet ved Wix-valg.',
      byId: {
        subdomain: {
          title: 'Valgt: forslagsadresse',
          withExternal: 'Passer pilot/egen side.',
          withWix: '',
          withNone: 'Krever egen side.',
        },
        existing: {
          title: 'Valgt: eksisterende nettadresse',
          withExternal: 'Flyttes/pekes til egen side.',
          withWix: 'Publiseres i Wix.',
          withNone: 'Velg også tilbud.',
        },
        new: {
          title: 'Valgt: ny nettadresse',
          withExternal: 'Kobles til egen side.',
          withWix: 'Kobles i/til Wix.',
          withNone: 'Velg også tilbud.',
        },
      },
    },
    wixExitPainpoints: [
      'Forhåndsbetalt Wix-periode: du mister ikke automatisk det du har betalt; Wix-abonnement for å bygge/redigere trengs ikke ved egen side.',
      'Innhold/skjemaer må flyttes bevisst — vi bruker sjekkliste.',
      'E-post på nettadressen styres hos leverandør — ordnes når adressen flyttes.',
      'Google-bedriftsprofil og annonselenker bør oppdateres.',
      'Redigering skjer ikke lenger i Wix — opplæring + senere HoliSti-verktøy.',
    ],
    messagingNote:
      'Design 01 bærer opprinnelig hovedbudskap. 02–06 kan ha tilpasset støtteformulering — samme kjerne, tilpasset flaten. Noter begrunnelse i tilbudet.',
    foresporselNote:
      'CTA-språk: forespørsel, ikke bookingkalender. Ekstra sider følger med ved egen side.',
    nextStepFlow:
      'Når du er klar: velg stil og løsning, gå videre. Knappen sender e-post til HoliSti = tilbud inngått. Du får alltid faktura eller kvittering — også ved forhåndsbetaling eller annen betalingsmetode.',
    paymentTiming:
      'Når «Gå videre» er sendt, er tilbudet inngått. Faktura eller kvittering sendes alltid. Arbeid og leveranse starter typisk etter betaling — eller etter avtalt betalingsmåte.',
    clientEmailCopy:
      'Kunden får en kopi på e-post med fullt sammendrag av valgene, vilkårene og tidspunktet — i HoliSti-stil.',
  },
} as const

export const FIRM_NAME = proposal.client.firmName
export const ORG_NR = proposal.client.orgNr
export const PHONE_DISPLAY = proposal.client.phoneDisplay
export const PHONE_HREF = proposal.client.phoneHref
export const EMAIL = proposal.client.email
export const ADDRESS = proposal.client.address
export const SITE_URL = proposal.siteUrl

export const holistiOffer = {
  clientName: proposal.client.fullName,
  clientFirstName: proposal.client.firstName,
  firmName: proposal.client.firmName,
  ...proposal.offer,
} as const
