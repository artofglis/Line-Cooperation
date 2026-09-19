# Bilder — plassholdere

Alle bilder i denne mappen (og `logo/`, `plakater/`) er nøytrale
SVG-plassholdere generert for malen — ingen ekte kundefoto er kopiert
hit. Bytt dem ut med kundens egne bilder når du setter opp et nytt
forslagsrom, og behold filnavnene (eller oppdater stiene i
`src/content.ts` / `src/proposal.config.ts` / `src/designs/*.tsx` /
`src/pages/*.tsx` hvis du endrer navn).

| Fil | Brukes til | Anbefalt format |
|---|---|---|
| `hero.jpg` (plassholder: `hero.svg`) | Hero-bilde på forsiden, alle 6 stiler | Liggende, ca. 2400×1350 |
| `path.jpg` (plassholder: `path.svg`) | Stemnings-/miljøbilde midt på siden | Liggende, ca. 1600×1200 |
| `portrett.jpg` (plassholder: `portrett.svg`) | Portrett av kontaktperson — «om»-seksjon i designene | Kvadratisk, ca. 800×800 |
| `portrett-alt.jpg` (plassholder: `portrett-alt.svg`) | Alternativt portrett — egen Om-side | Stående, ca. 800×1000 |
| `kampanje.jpg` (plassholder: `kampanje.svg`) | Bilde til kampanje-/tilbudslanding | Liggende, ca. 1600×1000 |
| `plakater/plakat-1.jpg` … `plakat-4.jpg` (plassholder: `.svg`) | Sosiale medier-plakater brukt i landingssider (f.eks. lansering, tema-plakater) | Stående, ca. 1000×1400 |
| `logo/client-wordmark.svg`, `client-ring.svg`, `client-full.svg` | Kundens logo — tre varianter (ordmerke / kun emblem / begge), satt i `proposal.config.ts` → `client.logo` | Vektor (SVG) eller høyoppløst PNG/WEBP |
| `logo/holisti-tre.svg` | HoliSti sin egen merkevare-logo i forslagsmenyen — **ikke kundespesifikk, ikke bytt ut** | — |

**Praktisk:** koden refererer i dag til disse filene med `.svg`-endelse
(siden plassholderne er SVG). Når du bytter inn ekte bilder kan du enten
(a) beholde `.svg`-navnene og legge ekte rasterbilder inn med samme
endelse (fungerer teknisk, men uvanlig), eller (b) bytte til f.eks.
`.jpg`/`.webp` og oppdatere stiene i kildefilene nevnt over. Et
søk-og-erstatt av filendelsen er raskest.
