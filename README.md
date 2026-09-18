# Line Cooperation — forslagsrom (line.holisti.no)

Dette repoet inneholder **forslagsrommet** til Line Cooperation, bygget på
HoliStis gjenbrukbare forslagsrom-mal (`holisti-forslagsrom-mal`). Det er et
privat, innloggingsbeskyttet nettsted der Line kan bla gjennom
design-forslag og se tilbudet, og til slutt gå videre med et valg.

Deployes på **line.holisti.no** (eget subdomene = full isolasjon fra andre
kunders forslagsrom — egen Worker, egen D1/R2/KV, host-only cookie).

## Designutforskning og avtale (bakgrunn)

Selve kundedialogen og designretningen ligger i `docs/`:

- `docs/design/` — moodboards, fargevalg (25 paletter), forside-design,
  innholdsforslag, hero-forslag, animasjoner, layout-mockups.
- `docs/kontrakt/` — tilbud **TIL-2026-4** (7 250 kr) og faktura.
- `docs/internt/` — løftesporing.

Disse er kilden når innholdet og designet under skal fylles inn.

## Hva som er satt opp for Line

- `wrangler.jsonc` — `name: line-forslag`, rute `line.holisti.no`,
  `PROPOSAL_SLUG=line`, `PROPOSAL_HOST=line.holisti.no`, samt navngitte
  D1/R2/KV-bindinger (`line-innhold`, `line-bilder`, `line-login-tokens`).
- `src/proposal.config.ts` — kundeidentitet (Line Sivertsen /
  Line Cooperation, Borkenes) og tilbudspris (7 250 kr fra TIL-2026-4).
- `index.html` — tittel/meta/JSON-LD for Line Cooperation.

## Gjenstår før lansering

**Innhold og design (den bespoke jobben):**
1. Velg **fargepalett** fra `docs/design/fargevalg.html` (25 forslag; «Kyst»
   er foreslått som naturlig startpunkt) og legg den inn i `src/designs/` +
   `src/pages/holisti.css`.
2. Port forside/innhold fra `docs/design/forside-design.html` og
   `docs/design/innholdsforslag.html` inn i `src/content.ts`, `src/App.tsx`
   (side-/stil-listen og JSX-grenene) og `src/designs/Design0*.tsx`.
3. Bytt ut bildene i `public/images/` (LC-monogram/avatar ligger i
   `docs/design/assets/`).
4. Vurder **tilbuds-rammen** i `src/proposal.config.ts`: malen er bygget
   rundt «Wix vs. egen side / pilot». Lines tilbud (TIL-2026-4) er et flatt
   flersiders nettsted til fast pris — `offer`-blokkene (offerKinds,
   valueCompare, hostCompare, domainOptions m.fl.) bør forenkles til å
   matche det faktiske tilbudet.
5. Fyll inn `client.orgNr`, `client.email`, `client.phone` (sto ikke i
   tilbudet).

**Cloudflare / drift (per `docs/forslagsmodal-arkitektur.md` §7):**
6. `wrangler kv namespace create line-login-tokens` → lim `id` inn i
   `wrangler.jsonc`.
7. `wrangler d1 create line-innhold` → lim `database_id` inn, og
   `wrangler d1 migrations apply line-innhold --remote`.
8. `wrangler r2 bucket create line-bilder`.
9. Legg til `line.holisti.no` som custom domain på worker-en i Cloudflare.
10. Innlogging (magic-link på e-post):
    - Sett `PROPOSAL_EMAIL` = Lines e-post i `wrangler.jsonc`/Cloudflare-vars.
    - `wrangler secret put NUNTLY_API_KEY`.
11. `npm run deploy`.

Se `docs/forslagsmodal-arkitektur.md` for hvordan forslagsmenyen,
tilbudssiden og magic-link-innloggingen henger sammen.

## Utvikling

```bash
npm install
npm run dev      # lokal utvikling
npm run build    # tsc + vite (verifiser)
npm run deploy   # publiser til Cloudflare
```
