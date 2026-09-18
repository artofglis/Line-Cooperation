# Forslagsmodalen — hvordan den er bygd opp

## 1. Konsept

Et "forslagsrom" er ett privat, innloggingsbeskyttet nettsted per kunde,
der kunden kan bla gjennom design-forslag og sider, og til slutt gå
videre med et valg. Navigasjonen mellom design/side/løsning/domene skjer
via en flytende rund knapp nederst til høyre (samme sted på mobil og
PC), som åpner et panel — ikke en tradisjonell fullskjerms-modal, men et
dropdown-panel forankret til knappen.

Implementasjon: `src/App.tsx` (knapp + panel, klasse `hs-switcher`).

## 2. Den flytende knappen og panelet

- Knappen viser alltid: HoliSti-logo, "HoliSti"-kicker, og gjeldende
  valg (side · stil · løsning).
- Klikk åpner et panel med `role="dialog"`, lukkes med Escape, klikk
  utenfor, eller ved å velge en side som fører videre.
- Panelet inneholder, i denne rekkefølgen:
  1. Header: logo + "Privat forslagsrom" + lukkeknapp.
  2. **Løsning** — to knapper: "Egen side · pilot" vs "Wix ·
     introduksjon". Dette valget styrer hva som vises resten av
     panelet.
  3. Forklaringstekst som endrer seg basert på løsningsvalget (hvor
     mange sider som er skjult ved Wix, osv.).
  4. **Domene** — knapper for domenevalg, filtrert basert på
     løsningsvalget (f.eks. "behold forslagsadresse" vises kun ved egen
     side).
  5. **Side** — pills for hver undersside i forslaget, filtrert basert
     på løsningsvalget (Wix skjuler ekstra sider).
  6. **Stil** — pills for hver designvariant (kun synlig når man ikke
     står på selve tilbudssiden).
  7. Beskrivelsestekst for valgt side/stil/løsning.
  8. CTA-knapp "Gå videre med …" — disabled til løsning er valgt. Fører
     til tilbudssiden og hopper til "gå videre"-seksjonen der.
  9. Footer: logg ut-lenke + personvernlenke.
- Valgene (side, stil, løsning, domene) reflekteres i URL-en
  (`?page=&design=`) og i `localStorage`, så lenken kan lukkes og
  gjenåpnes uten å miste valget.

**Viktig presisering:** listen over sider og stiler som vises i panelet
(`designs` og `pages`, med id/label/note) er **ikke** en del av
`proposal.config.ts` — den ligger i `src/content.ts`, og `App.tsx` har
egne hardkodede JSX-grener per side-id (f.eks.
`{page === 'om' ? <OmKunde /> : null}`). Det betyr at panelet ikke er
fullstendig løsrevet fra kundeinnholdet: antall stiler, hvilke sider som
finnes, og navnene på dem er skrevet spesifikt for denne kunden. For en
ny kunde må `App.tsx` (side-/stil-listen og render-grenene) og
`content.ts` skrives om sammen med resten av kundeinnholdet — det er
ikke nok å bare fylle ut `proposal.config.ts`.

## 3. Datamodellen som styrer alt

Alt tekstinnhold i panelet og tilbudssiden kommer fra én konfig-fil
(`src/proposal.config.ts`), ikke hardkodet i komponentene. Den har to
deler:

- `holistiBrand` — felles for alle kunder (HoliSti-info, vilkårslenker,
  plattform-blurb). Endres ikke per kunde.
- `proposal` — per kunde:
  - `slug`, `host`, `siteUrl`
  - `client`: navn, firma, org.nr, kontaktinfo, logo
  - `offer`: alt tekstinnhold i tilbudet — pris, intro, sammenligning
    Wix vs egen side, salgsvilkår, FAQ, hva som er inkludert,
    plattformpriser, referanseavtale, hostingkostnader, domenevalg med
    oppfølgingstekst per valg, betalingsflyt osv.

**Viktig:** tilbudssiden (`src/pages/HolistiOffer.tsx`) leser disse
feltene **uten fallback** — mangler et felt, krasjer siden. Malen
(`src/proposal.config.example.ts`) må derfor alltid speile alle
feltene som faktisk brukes, med generiske plassholdere i stedet for
ekte kundedata.

## 4. Tilbudssiden panelet leder til

Når kunden trykker "Gå videre", eller velger siden "Tilbudet" i
panelet, vises `src/pages/HolistiOffer.tsx` — en lang side bygget som
en rekke seksjoner, i denne rekkefølgen (kort): pris/headline →
introduksjonstilbud vs pilottilbud → plattformpris (valgfritt) →
salgsvilkår → trygghetspunkter → hva som er inkludert →
verdisammenligning mot ordinærpris → fordeler/ulemper side om side →
leveranseomfang (sider) → hosting-alternativer/tid → domenevalg med
oppfølgingstekst → justeringsrunder → referanseavtale (kun pilot) →
hosting og drift → FAQ → kommentarfelt → "gå videre"-flyt med
e-postkopi og betalingstidspunkt.

## 5. Sjekkliste for ny kunde

1. Kopier `src/proposal.config.example.ts` → `src/proposal.config.ts`,
   fyll ut alle felt (ingen kan stå tomme/mangle).
2. Bytt designinnhold i `src/content.ts`, `src/designs/`,
   `public/images/`.
3. Skriv om side-/stil-listen og render-grenene i `App.tsx` slik at de
   matcher de nye sidene/stilene (ikke bare kopier den gamle listen —
   se presiseringen i §2).
4. Oppdater `wrangler.jsonc` (navn, host, `vars.PROPOSAL_SLUG/HOST`).
5. Sett opp innloggingen — **magic-link på e-post** (anbefalt, se §7):
   sett kundens e-post i `vars.PROPOSAL_EMAIL`, opprett KV-namespacet
   `PROPOSAL_LOGIN_TOKENS` og legg Nuntly-nøkkelen som secret
   (`wrangler secret put NUNTLY_API_KEY`). Uten `PROPOSAL_EMAIL` faller den
   tilbake til passord som **secrets** (`wrangler secret put PROPOSAL_USER`
   og `... PROPOSAL_PASS`; aldri i `wrangler.jsonc`; lokalt i `.dev.vars`).
6. (Valgfritt) Skru av sider via `proposal.modules.pages` i
   `proposal.config.ts` (`false` = skjult i panelet og via URL).
7. Oppdater `index.html` meta/tittel til kundens merkevare.
8. `npm run deploy`.

## 6. Hva du trenger i et nytt repo (ett repo per kunde)

Ikke prøv å plukke ut en delmengde filer til en egen mappe — `App.tsx`
er uansett koblet til hele kundens sideinnhold (se §2), så det finnes
ingen liten, selvstendig "modal-mappe" å kopiere isolert. Fork/kopier
hele dette repoet som utgangspunkt for hvert nye kundeprosjekt:

| Kategori | Filer | Hva du gjør med dem |
|---|---|---|
| Motor (rør ikke) | `worker/index.js`, `src/hostChoice.ts`, `src/domainChoice.ts`, `src/pages/HolistiOffer.tsx`, `src/pages/holisti.css`, build-oppsett (`package.json`, `vite.config.ts`, `tsconfig*`) | Kopieres uendret |
| Skjema (fyll ut) | `src/proposal.config.example.ts` → `proposal.config.ts`, `wrangler.jsonc`, `index.html` | Fylles med ny kundes data |
| Panel + sidevalg (skriv om sammen med innhold) | `src/App.tsx` (side-/stil-lister og JSX-grener), `src/content.ts`, `src/designs/`, `src/pages/*Landing*`, `public/images/` | Skrives for den nye kunden — antall stiler/sider kan variere |

## 7. Innlogging: magic-link på e-post (uten passord)

Forslagsrommet er innloggingsbeskyttet, men kunden trenger ikke passord.
`worker/index.js` har to innloggingsmoduser, og velger automatisk mellom
dem:

- **Magic-link (standard når den er satt opp).** Aktiveres når alle tre er
  på plass: `PROPOSAL_EMAIL` (Cloudflare-var — kundens e-post),
  `NUNTLY_API_KEY` (secret) og KV-namespacet `PROPOSAL_LOGIN_TOKENS`. Da
  viser innloggingssiden kun én knapp — «Send meg innloggingslenke».
- **Passord (reserve).** Hvis `PROPOSAL_EMAIL` står tom, faller worker-en
  tilbake til brukernavn/passord (`PROPOSAL_USER`/`PROPOSAL_PASS` som
  secrets).

Selve flyten (magic-link):

1. Kunden trykker knappen → `POST /login`. Worker-en sjekker en kort
   throttle-nøkkel i KV (45 sek, hindrer spamming), lager et engangs-token
   (`crypto.randomUUID`), og lagrer `login:<token>` i KV med 15 min TTL.
2. Worker-en sender lenken `https://<host>/login/verify?token=<token>` til
   `PROPOSAL_EMAIL` via **Nuntly** (`POST https://api.nuntly.com/emails`,
   `Authorization: Bearer $NUNTLY_API_KEY`). Feiler sendingen, slettes
   tokenet igjen og kunden får en feilmelding. Avsender er
   `NUNTLY_FROM_EMAIL` (default `HoliSti <no-reply@holisti.no>`) og må ligge
   på et Nuntly-verifisert domene (holisti.no).
3. Kunden åpner lenken → `GET /login/verify`. Worker-en slår opp tokenet,
   **sletter det med én gang** (engangsbruk), og setter en sesjons-cookie
   (`holisti_proposal_<slug>`, HttpOnly, SameSite=Lax, Secure, 30 dager).
   Deretter redirect til `/?page=holisti`.

Fordi kundens e-post ligger i `PROPOSAL_EMAIL` (en Cloudflare-var, ikke en
secret), kan den settes direkte i Cloudflare-dashbordet når siden hostes
der — uten kodeendring. Hverken Nuntly-nøkkelen eller e-posten hardkodes i
repoet. Tokenene er engangs og kortlivde, så et lekket KV-oppslag gir ingen
varig tilgang.

Denne malen har ingen kobling til noe kunde-repo — den er et selvstendig
utgangspunkt du forker per kunde.
