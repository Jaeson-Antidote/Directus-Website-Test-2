# Cercle IA — Guide Claude Code

## Stack

- Astro 6+ (SSG, zéro JS par défaut)
- Tailwind CSS v4 via `@tailwindcss/vite`
- TypeScript strict
- Hébergement : Netlify
- CMS : Netlify Visual Editor (Stackbit)
- Gestionnaire : npm (repo unique, pas monorepo)

## Commandes

```bash
npm run dev       # dev local sur port 3000
npm run build     # build de production
npm run preview   # preview du build
```

## Structure

```
src/
  layouts/BaseLayout.astro   ← layout principal avec SEO complet
  components/Nav.astro        ← navigation sticky
  components/Footer.astro     ← footer 4 colonnes
  styles/global.css           ← variables CSS + classes utilitaires
  lib/schema.ts               ← helpers JSON-LD (homepageGraph, breadcrumb, etc.)
  content/pages/              ← JSON pour Stackbit Visual Editor
  content/blog/               ← articles Markdown
  pages/                      ← routes Astro
public/
  og/                         ← images Open Graph 1280×720
  images/                     ← photos WebP
  fonts/                      ← polices locales (si besoin)
```

## Design system

Référence absolue : `./cercle-ia-design-system.md`

- Direction 3 dark premium glassmorphism — sections majoritairement sombres, ~25 % claires
- Couleur accent : `#F7AB6E` (orange) — CTAs, eyebrow labels, stats, guillemets déco
- Fonds sombres : `#061717` (dark-1) et `#092727` (dark-2)
- Fonds clairs : `#F5F3EF` (`--color-light-1`, beige chaud) — Features, Ressources, Session & Prix, Pour qui
- Cards blanches : `#FDFCFB` (`--color-card-white`) — légèrement teinté, jamais blanc pur
- Heroes, nav, footer et CTAs finaux : toujours sombres
- Titres : Playfair Display (serif)
- Corps/UI : Inter (sans-serif)
- Cards sur fond sombre : `glass-card` (glassmorphism) — règle par défaut
- Cards sur fond clair : `card-white` — jamais de glass-card sur fond clair
- **Pattern mixte** : section sombre + `card-white` pour des blocs mis en valeur (ex. infos contact, tableau bootcamp, formations à propos)
- Sur fond clair : ajouter `style="color: var(--color-text-on-light);"` sur chaque `<h2 class="section-title">`
- Sur fond clair : texte corps → `var(--color-text-subtle)` (#7B7B7B) ou `var(--color-text-muted)` (#333333)
- Formulaires sur fond clair : `.input-light` + `.form-label-light` (jamais `.input-dark` sur fond blanc)
- Boutons CTA : `border-radius: 30px` (pilule) obligatoire
- Bouton secondaire sur fond clair : `.btn-outline-dark` (jamais `.btn-outline` — invisible sur clair)
- Bouton secondaire sur fond sombre : `.btn-outline` (glassmorphism blanc translucide)
- Jamais de SVG inline dans un `<a>` — utiliser `&rarr;` pour les flèches
- Tous les styles dans `global.css` — pas de `<style>` scoped dans les pages (conflit Tailwind v4 preflight)
- Voir `cercle-ia-design-system.md` section "Alternance des sections" pour la cartographie complète par page

## Règles SEO

- `<title>` : max 60 chars, mot-clé en tête
- `<meta description>` : 120-160 chars, verbe d'action
- `og:image` : 1280×720, dans `/public/og/`
- Un seul `<h1>` par page
- Format images : WebP (sauf OG = JPG)
- `width` + `height` obligatoires sur toutes les `<img>`
- `loading="eager"` sur l'image LCP, `lazy` pour le reste

## Schema markup

Ne jamais écrire du JSON-LD à la main — utiliser les helpers de `src/lib/schema.ts` :

- `homepageGraph()` → accueil
- `breadcrumb(items)` → toutes les pages internes
- `courseSchema(opts)` → pages formation
- `faqSchema(items)` → sections FAQ
- `personSchema()` → page à propos
- `articleSchema(opts)` → articles blog

## Tone of voice

Référence : `./tone-of-voice.md`

- Direct, concret, expert de terrain
- Jamais évangéliste IA, jamais catastrophiste
- CTAs orientés bénéfice, jamais génériques ("Découvrir les formations", pas "En savoir plus")
- Sentence case pour titres, sous-titres et CTAs

## Format des titres (sentence case)

Toujours appliquer le sentence case : première lettre en majuscule, reste en minuscule (sauf noms propres).

Exemple : "Pourquoi se former avec Cercle IA" (pas "Pourquoi Se Former Avec Cercle IA")

## Checklist avant de déclarer une page terminée

- [ ] title : présent, max 60 chars, mot-clé en tête
- [ ] description : 120-160 chars, unique, bénéfice concret
- [ ] og:image : 1280×720, dans /public/og/, alt renseigné
- [ ] schema : helper importé et passé au BaseLayout
- [ ] breadcrumb : inclus (sauf homepage)
- [ ] Un seul h1 par page
- [ ] Hiérarchie h1 > h2 > h3 respectée
- [ ] Images : alt, width, height, format WebP
- [ ] Build sans erreur TypeScript
