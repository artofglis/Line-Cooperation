# 001 — Hosting og innholdsredigering

**Status:** Vedtatt  
**Dato:** 2026-09-03  
**Kontekst:** Line-Cooperation skal ut på Cloudflare. Kunden oppdaterer bare når innholdet er utdatert, trenger lite lagring, og kan bytte ut bilder i stedet for å samle på dem. Hun skal ha enkel redigering av **innhold kun**.

## Funnet

Siden passer som en **statisk nettside** (ferdige HTML/CSS/JS-filer + et lite sett bilder). Cloudflare Pages / Workers med statiske filer dekker dette på **gratisplanen**.

Gratisplanen holder fordi:

- Statiske sidevisninger er **ubegrenset** (ingen båndbredde- eller trafikkregning).
- Eget domene og HTTPS er inkludert.
- **500 bygg per måned** er mer enn nok når hun oppdaterer sjelden.
- Inntil **20 000 filer** og **25 MB per fil** — langt over behovet når bilder byttes ut.
- Ingen server å vedlikeholde.

Vi trenger **ikke** Cloudflare Pro, Workers Paid (fra 5 USD/mnd) eller R2-lagring med dette bruksmønsteret.

### Hva som koster

| Utgift | Typisk kostnad | Trengs? |
|---|---|---|
| Cloudflare Pages / Workers (statisk) | 0 kr | Nei |
| GitHub (kode + innhold) | 0 kr | Nei |
| Domene (f.eks. `.no`) | ca. 100–200 kr/år | Ja, hvis hun vil ha eget navn |

Domenet er **ikke** hosting. Det kan kjøpes via Cloudflare Registrar til innkjøpspris. Uten eget domene brukes en gratis `*.pages.dev`-adresse.

## Beslutningen

1. **Hoste på Cloudflare Pages** (evt. Workers med statiske filer) på **gratisplanen**.
2. **Ikke** bruke WordPress eller annet klassisk CMS med database — det krever ofte betalt server og gir tilgang til mer enn innhold.
3. **Gi kunden et enkelt `/admin`-skjema** for tekst og bildebytte (Git-basert CMS, f.eks. Decap CMS eller Sveltia CMS). Hun ser ikke kode. Layout og teknikk ligger utenfor editoren.
4. **Beskytte `/admin`** med innlogging. Cloudflare Access (Zero Trust) er gratis for små team.
5. **Bytte bilder ut**, ikke bygge et arkiv. Da holder sidens eget fillager.

Flyt ved oppdatering: kunden går til `nettstedet/admin` → logger inn → endrer tekst eller bytter bilde → lagrer → Cloudflare bygger siden på nytt automatisk.

Hvis hun nesten aldri oppdaterer selv, kan utvikler gjøre endringene. Da trengs ingen editor.

## Alternativer som ble vurdert

| Alternativ | Hvorfor ikke nå |
|---|---|
| WordPress / klassisk CMS | Krever ofte betalt hosting, mer vedlikehold, og mer tilgang enn «kun innhold». |
| Hostet CMS (Sanity, Contentful, osv.) | Unødvendig kostnad og avhengighet for sjelden oppdatering. |
| Cloudflare Pro / Workers Paid | Gir høyere grenser og mer dynamikk. Ikke nødvendig for en statisk brosjyre-side. |
| R2 for bilder | Aktuelt først hvis bildebanken vokser. Kunden skal bytte ut, ikke samle. |

## Når beslutningen skal tas opp igjen

Ta opp hosting-valget hvis ett av dette skjer:

- Skjema, innlogging, booking eller annen dynamikk som kjører på **hver** sidevisning.
- Stor bildebank som bare vokser (da vurder R2).
- Trafikk + tunge dynamiske funksjoner som overstiger Workers-gratisplanen (100 000 dynamiske kall per døgn). Statiske visninger teller ikke.

Innhold og teknikk skal holdes adskilt: kunden redigerer tekst og bilder; utvikler eier layout, kode og deploy.
