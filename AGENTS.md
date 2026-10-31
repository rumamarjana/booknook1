# booknook1

Small Next.js 16 App Router app ("BookNook") bootstrapped by `create-next-app`. All app code lives in `src/app/` (no test suite, no CI, no API routes yet).

## Commands

- `npm run dev` — dev server (Turbopack), http://localhost:3000
- `npm run build` — production build; this is the real verification step (typecheck + lint + prerender/Cache Components validation all run here)
- `npm run lint` — bare `eslint` (not `next lint`)
- No `typecheck` script; for a quick TypeScript-only check run `npx tsc --noEmit` (note: `tsconfig.json` includes `.next/types/**`, so run at least one `dev`/`build` first for those types to exist)
- `npm test` — does not exist

## Next.js 16 specifics (breaking vs. older training data)

- Read the bundled docs at `node_modules/next/dist/docs/` before writing framework code; the agent-specific guide is `node_modules/next/dist/docs/01-app/02-guides/ai-agents.md`.
- `next.config.ts` enables `cacheComponents: true`, `partialPrefetching: true`, and `reactCompiler: true` — all non-default for older Next versions:
  - With Cache Components, data fetching is **dynamic by default**; opt in per page/component/function with `"use cache"`. Uncached dynamic data outside `<Suspense>` fails the build (prerendering validation). A page/layout can opt itself out of instant-navigation validation with `export const instant = false`, making its navigation block on the server (see `docs/01-app/02-guides/instant-navigation.md`).
  - The `runtime` route segment export (including `runtime = 'nodejs'`) is not allowed under Cache Components — don't add one.
  - Navigation keeps visited routes mounted via React `<Activity>`; don't rely on routes unmounting on leave.
  - React Compiler auto-memoizes; don't add `useMemo`/`useCallback`/`React.memo` for performance reasons.

## Styling

- Tailwind CSS v4, CSS-first: no `tailwind.config.js`. Theme overrides live in `@theme inline` in `src/app/globals.css`.
- daisyUI is loaded via `@plugin "daisyui";` in `src/app/globals.css` — not in any config file.

## Gotchas

- `layout.tsx` loads the **Josefin Sans** Google font but stores it in the `--font-geist-sans` variable (leftover from the scaffold). `globals.css` maps `--font-sans` to `var(--font-geist-sans)`. Keep variable/data names consistent when adding fonts — the current names lie.
- Path alias `@/*` → `./src/*` (tsconfig `paths`).
- `AGENTS.md` also contains an auto-generated block at the bottom; it is re-added by `next dev` on every run — do not remove it or hand-edit inside it.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
