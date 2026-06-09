# Instructions pour un nouveau projet Astro

Guide de référence complet pour démarrer un projet Astro from scratch avec Netlify et le Visual Editor.

---

## 1. Stack recommandée

- **Framework** : Astro 6+ (SSG, zéro JS par défaut)
- **CSS** : Tailwind CSS v4 (extraction automatique, pas de purge manuelle)
- **Typage** : TypeScript strict
- **Runtime JS** : zéro React, zéro Framer Motion
- **Gestionnaire de paquets** : pnpm (ou npm — éviter un monorepo si pas nécessaire)
- **Hébergement** : Netlify
- **CMS** : Netlify Visual Editor (Stackbit) avec Git comme source de contenu

### Structure de projet recommandée

Préférer un **repo unique** (pas un monorepo) pour éviter toute complexité inutile avec Netlify :

```
mon-projet/
├── src/
│   ├── content/          ← collections JSON/Markdown
│   ├── layouts/
│   ├── components/
│   ├── pages/
│   └── styles/
├── public/               ← images, fonts, robots.txt
├── netlify.toml
├── stackbit.config.ts
└── astro.config.mjs
```

---

## 2. Configuration Astro

### astro.config.mjs

```javascript
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mon-domaine.com',
  trailingSlash: 'never',
  server: {
    port: 3000, // pour le dev local avec Stackbit CLI
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],
});
```

### Collections de contenu (content.config.ts)

Utiliser le Content Layer API d'Astro 5+ avec des loaders `glob` :

```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/pages' }),
  schema: z.object({
    type: z.string().optional(), // champ requis par Stackbit
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = { pages };
```

**Règle** : tout fichier JSON destiné au Visual Editor doit avoir un champ `"type"` correspondant au nom du modèle Stackbit.

---

## 3. Règles SEO

### 3.1 BaseLayout — props obligatoires

```astro
<BaseLayout
  title="Mot-clé principal — Nom du site"
  description="Description unique, 120-160 chars, verbe d'action, bénéfice concret."
  ogImage="/og/nom-de-page.jpg"
  ogImageAlt="Description textuelle complète de l'image"
  lcpImage="/images/image-hero.webp"
  schema={jsonLdObject}
  robots="index,follow"
>
```

### 3.2 Règles pour le titre

| Contexte | Format |
|----------|--------|
| Accueil | `Nom du site — Accroche principale` |
| Page interne | `{Sujet} — Nom du site` |
| Article | `{Titre de l'article} — Blog Nom du site` |

- Max **60 caractères**
- Mot-clé principal **en début** de titre
- Toujours terminer par le nom du site

### 3.3 Règles pour la description

- **120-160 caractères**
- Phrase active avec verbe d'action
- Inclure la localisation géographique si pertinent
- Ne pas dupliquer le titre

### 3.4 Open Graph

- Dimensions : **1280x720px**, JPG ou WebP
- Dossier : `/public/og/`
- Nommage lisible : `/og/page-contact.jpg`, `/og/article-titre.jpg`
- `ogImageAlt` toujours renseigné

### 3.5 Images

```html
<img
  src="/images/nom.webp"
  alt="Description précise et contextuelle"
  width="960"
  height="540"
  loading="lazy"
  decoding="async"
/>
```

- Format **WebP** pour toutes les photos (JPG/PNG uniquement pour les OG)
- Image LCP : `loading="eager"` et préchargée via `lcpImage` prop
- Images décoratives : `alt=""` et `aria-hidden="true"`
- **Toujours** renseigner `width` et `height` pour éviter le CLS

### 3.6 Structure HTML

- Un seul `<h1>` par page, mot-clé principal présent
- Hiérarchie `h1 > h2 > h3` stricte, pas de sauts
- `<main>` autour du contenu principal
- `<nav aria-label="...">` sur chaque zone de navigation
- `<section id="...">` pour les ancres internes
- `<article>` pour les contenus indépendants (cartes, posts)

---

## 4. Schema markup

Ne jamais écrire du JSON-LD à la main. Créer des helpers dans `src/lib/schema.ts` par type de page.

### Helpers à créer par type de page

```typescript
// src/lib/schema.ts

export function homepageGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", ... },
      { "@type": "Organization", ... },
    ]
  };
}

export function breadcrumb(items: { name: string; href: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 2,
      name: item.name,
      item: `https://mon-domaine.com${item.href}`,
    })),
  };
}
```

### Schémas par type de page

| Page | Schéma |
|------|--------|
| Accueil | `WebSite` + `Organization` ou `Person` |
| À propos | `Person` détaillé + `BreadcrumbList` |
| Service | `Service` + `BreadcrumbList` |
| Blog article | `BlogPosting` + `BreadcrumbList` |
| FAQ | `FAQPage` + `BreadcrumbList` |
| Contact | `ContactPage` + `BreadcrumbList` |
| Lexique | `DefinedTerm` + `BreadcrumbList` |

**Règle FAQ** : chaque réponse doit faire minimum 50 mots pour que Google l'affiche.

---

## 5. Performance

### Fonts

- Charger via Google Fonts avec `display=swap`
- Ajouter `<link rel="preconnect">` et `<link rel="dns-prefetch">`
- Limiter à 3-4 familles maximum
- Ne pas charger de font non utilisée

### JavaScript

- Zéro JS à l'hydratation sauf besoins spécifiques
- Scripts Astro (`<script>`) sont bundlés et chargés en `defer` automatiquement
- Préférer CSS (`:hover`, `:focus`, `details/summary`) avant d'ajouter du JS

### CSS

- Tailwind v4 extrait uniquement le CSS utilisé, pas de purge manuelle
- Animations en CSS pur, pas de librairie d'animation
- Pas de styles inline sauf pour les valeurs dynamiques

### Checklist performance

```
[ ] LCP image : loading="eager" + préchargée
[ ] Images sous le fold : loading="lazy" decoding="async"
[ ] Toutes les images ont width et height explicites
[ ] Format WebP pour toutes les photos
[ ] Pas de JS inutile côté client
```

---

## 6. Accessibilité

- Contraste minimum **AA WCAG** sur tout texte
- `:focus-visible` stylé dans le CSS global
- `aria-label` sur tous les boutons icône (toggle thème, menu hamburger)
- `aria-current="page"` sur le lien actif dans la navigation
- `aria-hidden="true"` sur toutes les icônes et SVG décoratifs
- `role="alert"` sur les messages d'erreur de formulaire
- `scroll-margin-top` sur toutes les sections avec `id` (compenser la nav fixe)

---

## 7. Configuration Netlify

### netlify.toml

```toml
[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"

[build.environment]
  NODE_VERSION = "22"

[dev]
  # Indique à netlify dev le port réel du serveur Astro
  # doit correspondre à server.port dans astro.config.mjs
  command = "npm run dev"
  targetPort = 3000
  framework = "#custom"
```

**Pour un monorepo pnpm**, adapter :

```toml
[build]
  command = "pnpm install --frozen-lockfile --ignore-scripts && pnpm --filter mon-package run build"
  publish = "packages/mon-site/dist"

[dev]
  command = "pnpm --filter mon-package run dev"
  targetPort = 3000
  framework = "#custom"
```

**Pourquoi `[dev]` est critique** : sans cette section, `netlify dev` auto-détecte Astro et suppose le port 4321. Si `astro.config.mjs` définit un port différent (3000), le proxy cherche au mauvais endroit et le Visual Editor ne se lance jamais.

---

## 8. Visual Editor (Netlify + Stackbit)

### Prérequis

1. Site déployé sur Netlify
2. Visual editing activé dans les paramètres du projet
3. GitHub App "Netlify Visual Editor" installée sur le bon compte/organisation
4. **Deploy keys activées** dans les paramètres de l'organisation GitHub (Settings > Member privileges)

### stackbit.config.ts

```typescript
import { defineStackbitConfig } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
  useESM: true,
  ssgName: "custom",
  nodeVersion: "22",
  installCommand: "corepack enable && npm install",
  devCommand: "npm run dev -- --port {PORT} --hostname 0.0.0.0",
  experimental: {
    ssg: {
      name: "Astro",
      logPatterns: {
        up: ["is ready", "astro"],
      },
      directRoutes: {
        "socket.io": "socket.io",
      },
      passthrough: ["/vite-hmr/**"],
    },
  },
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["src/content/blog", "src/content/data"],
      models: [
        {
          name: "post",
          type: "page",
          urlPath: "/blog/{slug}",
          filePath: "src/content/blog/{slug}.md",
          fields: [
            { name: "title", type: "string", required: true },
            { name: "description", type: "string" },
          ],
        },
      ],
      assetsConfig: {
        referenceType: "static",
        staticDir: "public",       // dossier servi statiquement par Astro
        uploadDir: "images",       // sous-dossier pour les uploads
        publicPath: "/",           // URL publique = /images/fichier.jpg
      },
    }),
  ],
});
```

### Points critiques de la config Stackbit

**`--hostname 0.0.0.0` dans `devCommand`**
Le container cloud Netlify utilise un proxy réseau séparé pour atteindre le serveur de dev. `127.0.0.1` l'isole et le proxy ne peut pas l'atteindre. `0.0.0.0` expose le serveur sur toutes les interfaces.

**`installCommand` avec `corepack enable`**
Le container cloud peut ne pas avoir pnpm dans le PATH par défaut. `corepack enable` active le gestionnaire de paquets défini dans `packageManager` du `package.json`.

**`assetsConfig.staticDir: "public"`**
Astro sert les fichiers statiques depuis `public/`, pas `src/`. Pointer vers `src/content/` ferait atterrir les images uploadées à un chemin inaccessible.

**Champ `"type"` dans chaque fichier JSON**
Stackbit ne peut pas identifier le modèle d'un fichier sans ce champ.

```json
{
  "type": "post",
  "title": "Mon titre",
  ...
}
```

**Schéma Zod avec `type: z.string().optional()`**
Le champ `type` ajouté par Stackbit doit être accepté par le schéma Astro sans casser la validation.

### Content reload (obligatoire)

Ajouter ce script dans `BaseLayout.astro` pour que le preview se mette à jour quand le contenu change dans l'éditeur :

```html
<script is:inline>
  window.addEventListener('stackbitObjectsChanged', function () {
    window.location.reload();
  });
</script>
```

Sans ce listener, les modifications dans le Visual Editor ne sont pas reflétées en temps réel dans le preview.

### Branche de travail

Le Visual Editor utilise une branche dédiée (par défaut `preview`). Netlify la crée automatiquement lors du setup. Toute modification de `stackbit.config.ts` doit être mergée dans cette branche pour être prise en compte.

---

## 9. Erreurs fréquentes et solutions

| Erreur | Cause | Solution |
|--------|-------|----------|
| "Error deploying preview" | Plusieurs causes possibles | Vérifier les logs dans Netlify > Preview Servers |
| "Failed to reach dev server on port 4321" | Port mismatch | Ajouter `[dev]` dans `netlify.toml` avec `targetPort` correct |
| "public_key.verification_failure" | Deploy key corrompue ou absente | Supprimer la clé dans GitHub repo Settings > Deploy keys, relinking depuis Netlify |
| "Deploy keys disabled by org" | Organisation GitHub a désactivé les deploy keys | GitHub org Settings > Member privileges > activer les deploy keys |
| "Webhook creation error" | Trop de webhooks dupliqués (limite GitHub : 20/repo) | Supprimer les anciens webhooks dans GitHub repo Settings > Webhooks |
| Stackbit affiche 0 items | Champ `"type"` manquant dans les fichiers JSON | Ajouter `"type": "nom-du-modele"` comme premier champ de chaque fichier |
| Images uploadées inaccessibles | `assetsConfig.staticDir` pointe vers `src/` | Corriger vers `"public"` |

---

## 10. Checklist avant de déclarer une page terminée

```
SEO
[ ] title : présent, max 60 chars, mot-clé en tête
[ ] description : 120-160 chars, unique, bénéfice concret
[ ] canonical : correct (auto-calculé depuis Astro.url)
[ ] robots : "index,follow" (ou "noindex" si page outil)
[ ] og:image : 1280x720, dans /public/og/, alt renseigné
[ ] schema : helper importé et passé au layout
[ ] breadcrumb : inclus dans le schema (sauf homepage)

Contenu
[ ] h1 : un seul par page, mot-clé principal présent
[ ] Hiérarchie h1 > h2 > h3 respectée

Images
[ ] alt renseigné sur toutes les images non décoratives
[ ] width et height explicites sur chaque img
[ ] Format WebP
[ ] loading="eager" sur le LCP, "lazy" pour le reste

Accessibilité
[ ] Contraste AA vérifié
[ ] focus-visible stylé
[ ] aria-label sur les boutons icône
[ ] aria-current="page" sur le lien actif

Technique
[ ] sitemap : généré automatiquement par @astrojs/sitemap
[ ] robots.txt : dans /public/robots.txt
[ ] Pas de console.log oublié
[ ] Build sans erreur ni warning TypeScript
```

---

## 11. Commandes utiles

```bash
# Dev local
npm run dev

# Dev avec Visual Editor local (Stackbit CLI)
npx stackbit dev

# Build
npm run build

# Preview du build
npm run preview

# Déploiement Netlify (CI/CD automatique via push sur main)
git push origin main
```
