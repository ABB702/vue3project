# Tech Stack

- Vue 3 (`<script setup>`, Composition API) + Vite 5, plain JavaScript (no TypeScript)
- UI: Element Plus, auto-imported via `unplugin-vue-components` and `unplugin-auto-import` (ElementPlusResolver). Do not manually import Element Plus components.
- Routing: vue-router 4 (history mode)
- i18n: vue-i18n (messages in `language/zh.js`, locale fixed to `zh`)
- HTTP: axios. Mock backend: mockjs via `vite-plugin-mock` (`mock/index.js`, served from `/api/*`)
- Styles: SCSS (`<style lang="scss" scoped>`), Less also installed. CSS variables for the palette are in `src/assets/base.css`. Icons are iconfont classes (`public/iconfont.*`) or inline SVG.
- Events: `mitt` bus exposed as `app.config.globalProperties.$eventBus`
- Utilities: lodash
- Node 20.x, npm

## Commands
```sh
npm install
npm run dev       # vite dev server (with mock API)
npm run build     # production build to dist/
npm run preview   # preview the build
npm run lint      # eslint --fix on .vue/.js/.cjs/.mjs
npm run format    # prettier --write src/
```
No test runner is configured. CI is in `.github/workflows` (ci, deploy to GitHub Pages, ai-review). `VITE_BASE` sets the deploy base path.

## Code style
- Prettier: no semicolons, single quotes, 2-space indent, print width 100, no trailing commas
- ESLint: `plugin:vue/vue3-essential` + `eslint:recommended` + prettier (formatting skipped)
- Alias `@` maps to `src/`

## Notes and gotchas
- `webpack.config.demo.js` and `postcss.config.demo.js` are learning demos only. The real build is Vite. Do not modify them for build changes.
- `src/store/index.js` imports `vuex`, but vuex is not in `package.json` and the store is not registered in `main.js`. Treat it as unused unless asked.
- Some user-visible text is hardcoded Chinese in templates (often `{{'文本'}}`). Prefer adding new text to `language/zh.js` and using `$t`/`useI18n`.
- The `/api/*` mock handlers return `{ code: 0, message: 'ok', data }`. The model layer reads `res.data.data`.
