# Project Structure

```
index.html          Vite entry HTML
vite.config.js      Vite config (plugins, alias, mock)
language/           i18n messages (zh.js)
mock/               mockjs API handlers (index.js), url: /api/...
public/             static assets, iconfont files
doc/                learning notes (not part of the app)
src/
  main.js           app bootstrap (router, i18n, $eventBus)
  App.vue           shell layout: sidebar nav (menu from /api/getMenu) + <RouterView>
  i18n.js           vue-i18n instance
  router/index.js   routes (views eagerly imported, AboutView lazy-loaded)
  views/            page-level components (DashboardView, HomeView, AboutView)
  components/       feature widgets (e.g. AlarmMonitor, PitchWatch, WindOverview); icons/ has SVG components
  model/system.js   data access layer: axios calls and static stub data
  store/            global state (currently unused, see tech.md)
  assets/           base.css (palette/variables), main.css
  images/           image assets
.github/workflows/  CI, deploy, AI review
```

## Conventions
- Views compose small feature components. Views own `projectId`/`devId` state and pass it down as props (kebab-case in templates, e.g. `:project-id`).
- Components use `<script setup>`, `defineProps`, `reactive` state and an `initData()` function that loads data on mount and re-runs when the id prop changes. Clean up timers in `onBeforeUnmount`.
- All requests go through `src/model/system.js` using the callback style `fn(params, cb)`. Components do not call axios directly. New endpoints need a matching handler in `mock/index.js`.
- Component files are PascalCase `.vue`, one widget per file, with scoped SCSS in the same file. Use CSS variables from `base.css` (e.g. `var(--color-primary)`, `var(--space-2)`) rather than hardcoded colors where possible.
- Import with the `@/` alias (e.g. `@/model/system`).
- Keep the layout flex-based so it adapts to large-screen sizes.
