# Cercle IA — Design system

> Source de vérité visuelle issue de l'implémentation Direction 3 (dark premium glassmorphism).
> Utilise ce document comme référence absolue pour tout développement Claude Code.

---

## Table des matières

1. [Couleurs](#couleurs)
2. [Typographie](#typographie)
3. [Espacements](#espacements)
4. [Border radius & ombres](#border-radius--ombres)
5. [Variables CSS](#variables-css)
6. [Textures & fonds](#textures--fonds)
7. [Composants — Boutons](#boutons)
8. [Composants — Badges & tags](#badges--tags)
9. [Composants — Cards](#cards)
10. [Composants — Navigation](#navigation)
11. [Composants — Formulaires](#formulaires)
12. [Composants — Témoignages](#témoignages)
13. [Composants — Stats](#stats)
14. [Composants — Logos partenaires](#logos-partenaires)
15. [Mise en page — Sections](#alternance-des-sections)
16. [Mise en page — Hero](#hero)
17. [Mise en page — Footer](#footer)
18. [Mise en page — Grille](#grille--layout)
19. [Règles absolues](#règles-absolues)
20. [Responsive](#responsive)

---

## Couleurs

### Fonds sombres (dominants)

| Token | Hex | Usage |
|---|---|---|
| `--color-dark-1` | `#061717` | Hero, nav, footer, sections principales |
| `--color-dark-2` | `#092727` | Sections alternées sombres |
| `--color-dark-border` | `#1F3A2F` | Bordures sur fond sombre |

### Fonds clairs (usage limité)

| Token | Hex | Usage |
|---|---|---|
| `--color-light-1` | `#F5F3EF` | Sections claires (beige chaud — adoucit le contraste avec les fonds sombres) |
| `--color-light-2` | `#F5F5F5` | Séparateurs sur fond clair |
| `--color-card-white` | `#FDFCFB` | Cards blanches sur fond clair (légèrement teinté — jamais blanc pur) |

### Accent

| Token | Hex | Usage |
|---|---|---|
| `--color-accent` | `#F7AB6E` | CTAs, section-eyebrow, stat-number, guillemets décoratifs, icônes |
| `--color-accent-hover` | `#D98A4A` | Hover orange |

### Texte

| Token | Hex | Usage |
|---|---|---|
| `--color-text-on-dark` | `#FFFFFF` | Titres sur fond sombre |
| `--color-text-on-light` | `#061817` | Texte sur fond clair |
| `--color-text-muted` | `#333333` | Corps de texte |
| `--color-text-subtle` | `#7B7B7B` | Labels sur fond clair |
| `--color-text-on-accent` | `#1B1F22` | Texte sur bouton orange |

### Glassmorphism

| Token | Valeur | Usage |
|---|---|---|
| `--glass-bg` | `rgba(255,255,255,0.05)` | Fond des glass-cards |
| `--glass-bg-hover` | `rgba(255,255,255,0.08)` | Fond glass-card au hover |
| `--glass-border` | `rgba(255,255,255,0.09)` | Bordure glass-card |
| `--glass-blur` | `blur(16px)` | Backdrop-filter blur |

---

## Typographie

### Polices

```
https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap
```

- `--font-display` : `"Playfair Display", serif` — titres H1, H2, H3, pull quotes, stats
- `--font-body` : `"Inter", sans-serif` — tout le reste (corps, UI, labels, nav, boutons, témoignages body)

### Échelle typographique

| Rôle | Police | Taille | Poids | Line-height | Couleur |
|---|---|---|---|---|---|
| H1 hero | Playfair Display | `clamp(44px, 6.5vw, 80px)` | 700 | 1.06 | `#ffffff` |
| H2 section | Playfair Display | `clamp(24px, 3.2vw, 40px)` | 500 | 1.15 | `#ffffff` |
| H2 formateur | Playfair Display | `clamp(40px, 5vw, 64px)` | 700 | 1.05 | `#ffffff` |
| H3 card title | Playfair Display | 18px | 700 | 1.3 | `#ffffff` |
| Pull quote | Playfair Display | 17px | 700 | 1.4 | `#ffffff` |
| Section eyebrow | Inter | 11px | 600 | — | `var(--color-accent)` |
| Corps hero | Inter | 16–18px | 400 | 1.75 | `rgba(255,255,255,0.5)` |
| Corps card | Inter | 14–15px | 400 | 1.7–1.75 | `rgba(255,255,255,0.45)` |
| Corps témoignage | Inter | 13–14px | 400 | 1.7 | `rgba(255,255,255,0.45)` |
| Attribution nom | Inter | 13px | 600 | 1.3 | `rgba(255,255,255,0.75)–0.8` |
| Attribution rôle | Inter | 11–12px | 400 | — | `rgba(255,255,255,0.35)` |
| Nav link | Inter | 15px | 400 | — | `rgba(255,255,255,0.75)` |
| Nav CTA | Inter | 15px | 600 | — | `var(--color-accent)` |

### Note sur le H1 hero

La 3e ligne du H1 hero est volontairement atténuée : `color: rgba(255,255,255,0.55)` pour créer un effet de fondu, sans tomber sous ce seuil (lisibilité minimum).

---

## Espacements

Échelle 8pt. Valeurs standard seulement.

| Token | Valeur |
|---|---|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 16px |
| `--space-4` | 24px |
| `--space-5` | 32px |
| `--space-6` | 48px |
| `--space-7` | 64px |
| `--space-8` | 80px |
| `--space-9` | 100px |

**Usages clés :**
- Padding vertical section standard : `96px`
- Padding card (glass-card) : `28px`
- Gap grille 3 colonnes : `24px`
- Gap grille 4 colonnes : `20px` (formations), `16px` (USPs)
- Gap témoignages : `16px`
- Hauteur nav : `72px`

---

## Border radius & ombres

| Token | Valeur | Usage |
|---|---|---|
| `--radius-sm` | `4px` | Éléments discrets |
| `--radius-md` | `8px` | Inputs, bouton newsletter |
| `--radius-lg` | `16px` | Glass-cards, tous les conteneurs |
| `--radius-xl` | `24px` | Grands conteneurs hero |
| `--radius-pill` | `30px` | Boutons CTA, tags, badges, logo pills |
| `--radius-full` | `50%` | Avatars, icônes rondes |

| Token | Valeur | Usage |
|---|---|---|
| `--shadow-card` | `0 1px 3px rgba(0,0,0,0.04), 0 6px 20px rgba(0,0,0,0.07)` | Cards blanches (multi-couche) |
| `--shadow-card-hover` | `0 2px 6px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.11)` | Cards blanches hover |
| `--shadow-glass` | `0 8px 32px rgba(0,0,0,0.3)` | Glass-cards accentuées |

---

## Variables CSS

```css
:root {
  /* COULEURS */
  --color-dark-1:         #061717;
  --color-dark-2:         #092727;
  --color-dark-border:    #1F3A2F;
  --color-light-1:        #F5F3EF;
  --color-light-2:        #F5F5F5;
  --color-card-white:     #FDFCFB;
  --color-accent:         #F7AB6E;
  --color-accent-hover:   #D98A4A;
  --color-text-on-dark:   #FFFFFF;
  --color-text-on-light:  #061817;
  --color-text-muted:     #333333;
  --color-text-subtle:    #7B7B7B;
  --color-text-on-accent: #1B1F22;

  /* TYPOGRAPHIE */
  --font-display: "Playfair Display", serif;
  --font-body:    "Inter", sans-serif;

  /* ESPACEMENTS */
  --space-1: 4px;  --space-2: 8px;   --space-3: 16px;
  --space-4: 24px; --space-5: 32px;  --space-6: 48px;
  --space-7: 64px; --space-8: 80px;  --space-9: 100px;

  /* BORDER RADIUS */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   16px;
  --radius-xl:   24px;
  --radius-pill: 30px;
  --radius-full: 50%;

  /* OMBRES */
  --shadow-card:       0 1px 3px rgba(0,0,0,0.04), 0 6px 20px rgba(0,0,0,0.07);
  --shadow-card-hover: 0 2px 6px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.11);
  --shadow-glass:      0 8px 32px rgba(0,0,0,0.3);

  /* TRANSITIONS */
  --transition:      0.2s ease;
  --transition-slow: 0.35s ease;

  /* LAYOUT */
  --container-max: 1140px;
  --nav-height:    72px;

  /* GLASSMORPHISM */
  --glass-bg:       rgba(255,255,255,0.05);
  --glass-bg-hover: rgba(255,255,255,0.08);
  --glass-border:   rgba(255,255,255,0.09);
  --glass-blur:     blur(16px);
}
```

---

## Textures & fonds

### Grain noise (hero + CTA final)

```css
.grain-bg {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E");
  background-size: 300px 300px;
}
```

### Dégradé hero (grain + radial glows)

```css
.hero-gradient {
  background-color: var(--color-dark-1);
  background-image:
    url("...grain SVG..."),
    radial-gradient(ellipse 100% 65% at 50% -5%, rgba(14,75,55,0.55) 0%, transparent 65%),
    radial-gradient(ellipse 60% 40% at 85% 90%, rgba(247,171,110,0.05) 0%, transparent 50%);
}
```

Combiner toujours `hero-gradient` + `grain-bg` sur la section hero.

### Glow accent (coin supérieur droit du hero)

```html
<div style="position:absolute; top:-120px; right:-80px; width:600px; height:600px;
  border-radius:50%;
  background:radial-gradient(circle, rgba(247,171,110,0.06) 0%, transparent 70%);
  pointer-events:none;" aria-hidden="true"></div>
```

---

## Boutons

Tous les boutons CTA : `border-radius: 30px` (pilule), `font-family: Inter`, `font-weight: 600`.

### Bouton primaire

```css
.btn-primary {
  background: var(--color-accent);       /* #F7AB6E */
  color: var(--color-text-on-accent);    /* #1B1F22 */
  border: 1.5px solid var(--color-accent);
  border-radius: var(--radius-pill);
  padding: 14px 40px;
  font-size: 15px; font-weight: 600;
}
.btn-primary:hover {
  background: var(--color-accent-hover);
  transform: translateY(-1px);
}
```

### Bouton outline (glassmorphism — CTA secondaire)

```css
.btn-outline {
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.85);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: var(--radius-pill);
  padding: 14px 28px;
  font-size: 15px; font-weight: 500;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.btn-outline:hover {
  background: rgba(255,255,255,0.1);
  border-color: rgba(255,255,255,0.25);
}
```

### Bouton outline sombre (CTA secondaire sur fond clair)

Utiliser **uniquement** sur fond clair. Sur fond sombre, utiliser `.btn-outline` (glassmorphism).

```css
.btn-outline-dark {
  background: transparent;
  color: var(--color-text-on-light);
  border: 1.5px solid rgba(6,24,23,0.25);
  border-radius: var(--radius-pill);
  padding: 14px 28px;
  font-size: 15px; font-weight: 500;
}
.btn-outline-dark:hover {
  background: rgba(6,24,23,0.06);
  border-color: rgba(6,24,23,0.45);
}
```

### Lien texte avec flèche (dans les cards et sections)

```css
.btn-text-link {
  color: var(--color-accent);
  font-size: 14px; font-weight: 500;
  text-decoration: none;
}
/* Rendu : "Voir le programme →" — utiliser &rarr; comme flèche */
```

### Bouton small (dans les cards)

```css
.btn-sm { padding: 8px 18px; font-size: 13px; }
```

### Bouton newsletter (footer)

```css
.btn-newsletter {
  background: var(--color-accent);
  color: var(--color-dark-1);
  border: none;
  border-radius: var(--radius-md);  /* 8px — exception : pas pilule */
  padding: 10px 24px;
  font-size: 14px; font-weight: 600;
  width: 100%;
}
```

---

## Badges & tags

### Eyebrow badge (pill glassmorphism — entrée de section hero et CTA)

```css
.eyebrow-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(247,171,110,0.1);
  border: 1px solid rgba(247,171,110,0.25);
  border-radius: var(--radius-pill);
  padding: 6px 16px;
  font-size: 12px; font-weight: 600;
  color: var(--color-accent);
  letter-spacing: 0.05em;
  backdrop-filter: blur(8px);
}
/* Contient un petit point orange : width:6px; height:6px; border-radius:50%; background:var(--color-accent) */
```

### Section eyebrow (label de section, texte seul)

```css
.section-eyebrow {
  font-size: 11px; font-weight: 600;
  color: var(--color-accent);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  display: block;
  margin-bottom: 12px;
}
```

### Tag filled (catégorie — Bootcamp, secteur)

```css
.tag {
  background: var(--color-accent);
  color: var(--color-dark-1);
  font-size: 11px; font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border-radius: var(--radius-pill);
  padding: 4px 12px;
}
```

### Tag outline (catégorie sur glass-card)

```css
.tag-outline {
  border: 1px solid rgba(247,171,110,0.4);
  color: var(--color-accent);
  font-size: 11px; font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border-radius: var(--radius-pill);
  padding: 4px 12px;
}
```

---

## Cards

### Glass-card (composant principal)

Composant dominant du site. S'utilise sur **toutes les sections sombres**.

```css
.glass-card {
  background: var(--glass-bg);               /* rgba(255,255,255,0.05) */
  backdrop-filter: var(--glass-blur);        /* blur(16px) */
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);     /* rgba(255,255,255,0.09) */
  border-radius: var(--radius-lg);           /* 16px */
  padding: 28px;
  color: #ffffff;
  transition: background 0.35s ease, border-color 0.35s ease, transform 0.35s ease;
}
.glass-card:hover {
  background: var(--glass-bg-hover);         /* rgba(255,255,255,0.08) */
  border-color: rgba(255,255,255,0.14);
  transform: translateY(-2px);
}
```

> Le blur n'est visible que si le fond derrière la card a du contenu visuel (gradient, grain). Il apparaît sur le hero et les sections avec `hero-gradient`.

### Card blanche (fond clair — et pattern mixte sur fond sombre)

S'utilise principalement sur fond clair (`--color-light-1`). Peut aussi s'employer sur fond sombre pour des blocs de contenu mis en valeur (pattern mixte — voir section "Alternance des sections").

```css
.card-white {
  background: var(--color-card-white);   /* #FDFCFB — légèrement teinté, pas blanc pur */
  border-radius: var(--radius-lg);
  padding: 28px;
  border: 1px solid rgba(6,24,23,0.09);  /* bordure fine pour définir le contour */
  box-shadow: var(--shadow-card);        /* multi-couche : diffusion + élévation */
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.card-white:hover {
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-2px);
}
```

Le couple fond/card (`#F5F3EF` / `#FDFCFB`) est volontairement peu contrasté — la définition vient de la bordure et de l'ombre, pas de la différence de couleur.

### Structure glass-card formation

```html
<a href="/formations/avocats" class="glass-card" style="display:flex; flex-direction:column; gap:10px; text-decoration:none;">
  <span class="tag-outline" style="align-self:flex-start;">Droit</span>
  <h3 style="font-family:var(--font-display); font-size:16px; font-weight:700; color:rgba(255,255,255,0.85);">
    IA pour avocats & juristes
  </h3>
  <p style="font-size:13px; color:rgba(255,255,255,0.35); line-height:1.65; flex:1;">
    Recherche, rédaction, analyse documentaire…
  </p>
  <span class="btn-text-link" style="font-size:13px; margin-top:auto;">Découvrir &rarr;</span>
</a>
```

### Structure glass-card bootcamp (vedette)

```html
<div class="glass-card bootcamp-card">
  <!-- bootcamp-card = grid-template-columns: 1fr auto -->
  <div>
    <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px;">
      <span class="tag">Bootcamp</span>
      <span style="font-size:12px; color:rgba(255,255,255,0.3);">3 sessions · En ligne · Tous niveaux</span>
    </div>
    <h3>Bootcamp IA Générative</h3>
    <p>Description…</p>
    <div style="display:flex; gap:16px;">
      <a class="btn-primary btn-sm">S'inscrire</a>
      <a class="btn-text-link">Voir le programme &rarr;</a>
    </div>
  </div>
  <div style="text-align:right;">
    <p style="font-size:11px; color:rgba(255,255,255,0.25); text-transform:uppercase;">Prochaine session</p>
    <p style="font-family:var(--font-display); font-size:22px; font-weight:700; color:#fff;">Été 2026</p>
  </div>
</div>
```

---

## Navigation

```css
nav.nav-dark {
  background: var(--color-dark-1);
  border-bottom: 1px solid var(--color-dark-border);
  height: var(--nav-height);   /* 72px */
  position: sticky; top: 0; z-index: 100;
}

.nav-links a {
  font-size: 15px; font-weight: 400;
  color: rgba(255,255,255,0.75);
}
.nav-links a:hover,
.nav-links a[aria-current="page"] { color: #ffffff; }

.nav-cta {  /* "Plateforme" */
  color: var(--color-accent);
  font-weight: 600;
}
```

**Structure :** Logo | Bootcamp IA | Formations IA | Newsletter | Blog | À propos | Contact | **Plateforme** (orange)

**Logo :** `cercle-ia-logo.svg` (fills `#F8F8F4`) sur fond sombre. `cercle-ia-logo-dark.svg` (fills `#061717`) si nav claire.

---

## Formulaires

```css
/* Sur fond sombre */
.input-dark {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  font-size: 15px; color: #ffffff;
  width: 100%;
}
.input-dark::placeholder { color: rgba(255,255,255,0.25); }
.input-dark:focus { border-color: rgba(247,171,110,0.5); background: rgba(255,255,255,0.08); }

.form-label {
  font-size: 12px; font-weight: 600;
  color: rgba(255,255,255,0.5);
  letter-spacing: 0.05em; text-transform: uppercase;
  display: block; margin-bottom: 8px;
}

/* Sur fond clair */
.input-light {
  background: #FFFFFF;
  border: 1.5px solid rgba(6,24,23,0.15);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  font-size: 15px; color: var(--color-text-on-light);
  width: 100%;
}
.input-light::placeholder { color: rgba(6,24,23,0.3); }
.input-light:focus { border-color: rgba(247,171,110,0.6); outline: none; }

.form-label-light {
  font-size: 12px; font-weight: 600;
  color: rgba(6,24,23,0.5);
  letter-spacing: 0.05em; text-transform: uppercase;
  display: block; margin-bottom: 8px;
}
```

---

## Témoignages

Structure à deux niveaux : accroche (pull quote) + corps optionnel.

```html
<div class="glass-card" style="display:flex; flex-direction:column; padding:28px 28px 24px;">

  <!-- Guillemet décoratif -->
  <span style="font-family:var(--font-display); font-size:48px; line-height:1;
    color:var(--color-accent); opacity:0.7; margin-bottom:8px; display:block;">&ldquo;</span>

  <!-- Pull quote — accroche forte, Playfair bold -->
  <p style="font-family:var(--font-display); font-size:17px; font-weight:700;
    color:#ffffff; line-height:1.4; letter-spacing:-0.01em; margin-bottom:12px; flex:1;">
    À recommander d'urgence !
  </p>

  <!-- Corps optionnel — Inter regular, plus subtil -->
  <p style="font-family:var(--font-body); font-size:13px;
    color:rgba(255,255,255,0.45); line-height:1.7;">
    Formation professionnelle fluide et accessible…
  </p>

  <!-- Attribution -->
  <div style="display:flex; align-items:center; gap:10px;
    margin-top:20px; padding-top:18px; border-top:1px solid rgba(255,255,255,0.07);">
    <div class="testimonial-avatar">SG</div>
    <div>
      <p style="font-size:13px; font-weight:600; color:rgba(255,255,255,0.8);">Steve Griess</p>
      <p style="font-size:11px; color:rgba(255,255,255,0.35);">Partner, Thales Brussels</p>
    </div>
  </div>
</div>
```

```css
.testimonial-avatar {
  width: 34px; height: 34px; border-radius: 50%;
  background: rgba(247,171,110,0.15);
  border: 1px solid rgba(247,171,110,0.3);
  color: var(--color-accent);
  font-size: 11px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
}
```

La grille témoignages utilise `align-items: start` pour que les cards gardent leur hauteur naturelle.

---

## Stats

Deux contextes d'usage :

### Stats formateur (empilées en colonne, layout horizontal)

```html
<div style="display:flex; flex-direction:column; gap:10px;">
  <div class="glass-card" style="padding:20px 24px; display:flex; align-items:center; gap:20px;">
    <span class="stat-number" style="flex-shrink:0;">2021</span>
    <p class="stat-label">Formateur en IA depuis</p>
  </div>
  <!-- Répéter pour 250+ et 15 ans -->
</div>
```

### Stats mini (dans les glass-cards compactes)

```html
<div class="glass-card" style="padding:18px 20px;">
  <span class="stat-number" style="font-size:28px;">1000+</span>
  <p class="stat-label">Abonnés newsletter</p>
</div>
```

```css
.stat-number {
  font-family: var(--font-display);
  font-size: 44px; font-weight: 700;
  color: var(--color-accent);
  display: block; line-height: 1;
}

.stat-label {
  font-size: 13px;
  color: rgba(255,255,255,0.45);
  margin-top: 6px;
}
```

---

## Logos partenaires

Affichés en blanc filtré sur fond sombre pour s'harmoniser avec l'univers dark.

```html
<div class="hero-logos">
  <span class="logos-label">Ils nous font confiance</span>
  <div class="logos-list">
    <div class="logo-img-wrap">
      <img src="/images/logos/uclouvain.png" alt="UCLouvain" height="80" loading="lazy" decoding="async" />
    </div>
    <!-- Répéter pour EPHEC, IHECS, AKT CCI, Wallonia.be, Brussels Study Center -->
  </div>
</div>
```

```css
.logo-img-wrap {
  display: flex; align-items: center;
  opacity: 0.35;
  filter: brightness(0) invert(1);   /* force le blanc */
  transition: opacity 0.2s ease;
}
.logo-img-wrap:hover { opacity: 0.6; }
.logo-img-wrap img { height: 80px; width: auto; display: block; }

.logos-label {
  font-size: 11px; font-weight: 600;
  color: rgba(255,255,255,0.2);
  letter-spacing: 0.08em; text-transform: uppercase;
  white-space: nowrap;
}

.logos-list { display: flex; flex-wrap: wrap; gap: 24px; align-items: center; }
```

Fichiers : `/public/images/logos/uclouvain.png`, `ephec.png`, `ihecs.png`, `akt-cci.png`, `wallonia.png`, `brussels-study-center.png`

---

## Alternance des sections

Le site alterne **sections sombres** (majoritaires, glassmorphism) et **sections claires** (fond `#F5F3EF`, cards `#FDFCFB`). Environ 25-30 % des sections sont claires. Les heroes, la nav, le footer et les CTAs finaux restent toujours sombres.

### Règle d'attribution fond clair

Utiliser `--color-light-1` (#F5F3EF) pour :
- Les sections de contenu informatif dense (texte long, sans cards complexes)
- Les sections de ressources/blog/newsletter
- Les FAQ (meilleure lisibilité)
- Les formulaires de contact (plus accessibles et rassurants)
- Les sections programme (piliers, étapes numérotées)

Garder sombre (`--color-dark-1` ou `--color-dark-2`) pour :
- Hero (toujours)
- Sections problème/solution avec tableaux glassmorphism
- Sections formateur/biographie (ambiance premium)
- Sections témoignages sur la homepage (rester dans le registre émotionnel sombre)
- Sections "Pourquoi nous" / USPs
- CTAs finaux (grain-bg + dark-2)
- Footer (toujours)
- Session & investissement / pricing (premium = sombre)

### Cartes sur fond clair

Sur fond clair, utiliser **toujours** `.card-white` — jamais `.glass-card` (le verre est invisible sur blanc).

Le CSS gère automatiquement les couleurs de texte pour les classes nommées :
```css
.card-white .feature-title,
.card-white .usp-title,
.card-white .ressource-title { color: var(--color-text-on-light); }

.card-white .feature-desc,
.card-white .usp-desc,
.card-white .ressource-desc { color: var(--color-text-subtle); }
```

Pour les textes en inline style, remplacer :
- `color: #ffffff` → `color: var(--color-text-on-light)` (#061817)
- `color: rgba(255,255,255,0.45)` → `color: var(--color-text-subtle)` (#7B7B7B)
- `color: rgba(255,255,255,0.6)` → `color: var(--color-text-muted)` (#333333)
- `border-top: 1px solid rgba(255,255,255,0.07)` → `border-top: 1px solid rgba(6,24,23,0.08)`

### Titres de section sur fond clair

Ajouter `style="color: var(--color-text-on-light);"` sur la `<h2 class="section-title">` car la classe fixe `color: #ffffff` par défaut.

### Bloc sombre sur fond clair ("featured dark card")

Pour un élément spécial (ex. Cercle GPT bonus) dans une section claire, utiliser :
```html
<div style="background: var(--color-dark-1); border: 1px solid rgba(247,171,110,0.22);
  border-radius: var(--radius-lg); padding: 40px; overflow: hidden;">
```
Cela crée un contraste fort et met en valeur l'élément premium.

### Pattern mixte — bloc clair dans section sombre

Pour des blocs de contenu mis en valeur dans une section sombre (ex. tableau comparatif, cards d'informations, liste de formations), envelopper le contenu dans un conteneur à fond clair :

```html
<!-- Enveloppe légère avec ombre portée sur fond sombre -->
<div style="background: var(--color-light-1); border-radius: calc(var(--radius-lg) + 4px);
  padding: 4px; box-shadow: 0 4px 32px rgba(0,0,0,0.3);">
  <!-- contenu avec border-radius: var(--radius-lg) -->
</div>
```

Ou directement en `card-white` (pour des cards individuelles dans une section sombre) :
```html
<div class="card-white" style="...">
  <!-- texte avec couleurs var(--color-text-on-light) et var(--color-text-subtle) -->
</div>
```

**Exemples d'application :**
- Bootcamp — "Pour qui, et pourquoi" : section `dark-2`, tableau `color-light-1` intégré
- Contact — Formulaire : section `dark-2`, cards infos en `card-white`
- À propos — Les formations : section `dark-1`, deux grandes `card-white` côte à côte

### Cartographie actuelle par page

**Accueil :**
```
HERO          sombre  (hero-gradient)
FEATURES      clair   (#F5F3EF · card-white)  ←  "Pourquoi se former avec Cercle IA"
FORMATIONS    sombre  (#061717 · glass-cards)
POURQUOI      sombre  (#092727 · glass-cards)
FORMATEUR     sombre  (#061717)
TÉMOIGNAGES   sombre  (#092727 · glass-cards)
RESSOURCES    clair   (#F5F3EF · card-white)  ←
CTA FINAL     sombre  (#092727 + grain-bg)
```

**Bootcamp :**
```
HERO                  sombre  (hero-gradient)
POUR QUI/POURQUOI     sombre  (#092727) + tableau clair intégré (pattern mixte)  ←
PROGRAMME             sombre  (#061717 · glass-cards)
SESSION & PRIX        clair   (#F5F3EF · card-white + btn-outline-dark)  ←
TÉMOIGNAGES           sombre  (#061717 · glass-cards)
FORMATEUR             sombre  (#092727)
FAQ                   sombre  (#061717 · glass-cards)
CTA FINAL             sombre  (#092727 + grain-bg)
```

**À propos :**
```
HERO                  sombre  (hero-gradient)
LE PROBLÈME           sombre  (#092727 · texte pur)
POUR QUI              clair   (#F5F3EF · card-white)  ←  "Professionnels dont les erreurs ont un coût"
NOTRE APPROCHE        sombre  (#092727 · glass-cards)
LES FORMATIONS        sombre  (#061717) + 2 card-white (pattern mixte)  ←
TÉMOIGNAGES           sombre  (#092727 · glass-cards)
FORMATEUR             sombre  (#061717)
CTA FINAL             sombre  (#092727 + grain-bg)
```

**Contact :**
```
HERO                  sombre  (hero-gradient)
FORMULAIRE + INFOS    sombre  (#092727 · input-dark) + cards infos card-white (pattern mixte)  ←
RESSOURCES            sombre  (#061717 · glass-cards)
```

---

## Hero

```html
<section class="hero-gradient grain-bg" style="padding: 96px 0 112px; position:relative; overflow:hidden;">
  <!-- Glow accent coin supérieur droit -->
  <div style="position:absolute; top:-120px; right:-80px; width:600px; height:600px;
    border-radius:50%;
    background:radial-gradient(circle, rgba(247,171,110,0.06) 0%, transparent 70%);
    pointer-events:none;" aria-hidden="true"></div>

  <div class="container">

    <!-- Eyebrow badge -->
    <div class="eyebrow-badge" style="margin-bottom:28px; display:inline-flex;">
      <span style="width:6px; height:6px; border-radius:50%; background:var(--color-accent); display:inline-block;"></span>
      Formations IA pour professionnels
    </div>

    <!-- H1 — 3e ligne atténuée -->
    <h1 class="hero-title">
      L'IA entre de<br />bonnes mains.<br />
      <span style="color:rgba(255,255,255,0.55);">Les vôtres.</span>
    </h1>

    <!-- Sous-titre -->
    <p style="font-size:18px; color:rgba(255,255,255,0.5); line-height:1.75; max-width:560px; margin-bottom:36px;">
      Des formations conçues pour les professionnels dont les erreurs ont un cout.
    </p>

    <!-- CTAs -->
    <div style="display:flex; gap:12px; flex-wrap:wrap; margin-bottom:72px;">
      <a href="/formations" class="btn-primary">Découvrir les formations</a>
      <a href="/contact" class="btn-outline">Planifier un appel</a>
    </div>

    <!-- Logos partenaires -->
    <div class="hero-logos">…</div>
  </div>
</section>
```

**Règle :** le hero est full-width, gauche-aligné, sans aside. Pas de `text-align: center` sur la homepage.

---

## Footer

Structure 4 colonnes. Toujours sur `#061717`.

**Colonne Formations :**
- Bootcamp IA
- Formations pour avocats
- Formations pour consultants
- Formations pour dirigeants
- Formations pour RH
- Formations pour médecins

**Colonne Ressources :** Newsletter · Blog · Ressources IA · À propos · Contact

**Bottom bar :** `©2026. Cercle IA | Antidote SRL | BCE 0773.969.928` — Politique IA · Confidentialité · Conditions générales

---

## Grille & layout

```css
.container { max-width: 1140px; margin: 0 auto; padding: 0 40px; }

.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }

.hero-inner { display: grid; grid-template-columns: 1fr 340px; gap: 56px; align-items: start; }
.bootcamp-card { display: grid; grid-template-columns: 1fr auto; gap: 40px; align-items: start; }
.usps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.stats-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
```

---

## Règles absolues

### Toujours faire

- **Playfair Display** pour H1, H2, H3, pull quotes, stats chiffrées
- **Inter** pour le reste : corps, labels, boutons, nav, témoignages corps
- **Glass-cards** (`glass-card`) : usage par défaut sur fond sombre
- **Card blanche** (`card-white`) : sur fond clair, ou en pattern mixte (bloc clair dans section sombre pour mettre en valeur du contenu)
- **Jamais** `glass-card` sur fond clair (invisible) — **jamais** `card-white` sur fond sombre sans intention claire (pattern mixte)
- **Border-radius pilule** (`30px`) sur tous les boutons CTA et badges
- **Section eyebrow** en orange + uppercase + 11px avant chaque titre de section
- **Padding vertical** sections : `96px` minimum
- **`&rarr;`** comme flèche dans les liens texte (jamais SVG inline dans un lien)
- **Logos partenaires** : `filter: brightness(0) invert(1)` + opacité `0.35`
- **Guillemet décoratif** `&ldquo;` en orange avant chaque pull quote de témoignage

### Ne jamais faire

- Utiliser l'orange comme fond de section entière
- Afficher une card blanche sur fond sombre (utiliser glass-card)
- Mettre `text-align: center` sur le hero de la homepage
- Utiliser des SVG inline dans des balises `<a>` (Tailwind preflight les passe en `display:block`)
- Utiliser des valeurs de border-radius < 30px pour les boutons CTA
- Mettre la 3e ligne du H1 hero sous `rgba(255,255,255,0.5)` (lisibilité min.)
- Utiliser des couleurs hors de la palette définie

---

## Responsive

```css
@media (max-width: 1024px) {
  .grid-4, .usps-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 960px) {
  .hero-inner   { grid-template-columns: 1fr; gap: 40px; }
  .bootcamp-card { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
  .usps-grid  { grid-template-columns: 1fr; }
  .container  { padding: 0 20px; }
  .hero-title { font-size: 42px !important; }
}
```

---

*Design system Cercle IA — Direction 3 dark premium glassmorphism — Antidote SRL — BCE 0773.969.928*
