# Calligraphy — Agent Guidelines

Rules for AI agents working on this package.

## Architecture

Single-file package. One export: `Calligraphy`. Keep it that way unless there's a strong reason to split.

```
src/
  index.tsx   # everything lives here
```

## Key internals

- `computeLCS` — standard LCS dynamic programming over two strings, returns `[oldIndex, newIndex][]` pairs
- `Calligraphy` — the component. Uses `useState` + render-phase diffing (not `useEffect`) to reconcile character keys when `children` changes
- Character identity is tracked via string keys (`c0`, `c1`, ...) managed by `nextIdRef`
- `enteringKeysRef` tracks which keys are new so they skip `layout` animation on their first frame

## Constraints

- **Client component** — the `"use client"` directive is required. This component uses `useState` and `useRef`.
- **Peer dependencies** — `motion`, `react`, `react-dom`. Do not add these to `dependencies`.
- **Single export** — consumers import `{ Calligraphy }` from `"calligraphy"`. Don't add default exports.
- **Props extend `HTMLMotionProps<"span">`** — don't narrow the type or add boolean feature flags. If new behavior is needed, prefer a new component export over prop additions.
- **No internal state leaks** — `computeLCS`, key refs, and prev-text tracking are implementation details. Don't export them.

## Build

- Uses `bunchee` for bundling
- Output: `dist/index.js` + `dist/index.d.ts`
- ESM only (`"type": "module"`)

## Style

- Follow existing Biome config (spaces, double quotes, recommended rules)
- No comments explaining obvious code
- Keep JSDoc on the public export for IDE tooltips
