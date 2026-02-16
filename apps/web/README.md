# Web

The demo and documentation site for [Calligraph](https://calligraph.raphaelsalaja.com), built with [Next.js](https://nextjs.org).

## Development

From the **repository root**:

```sh
pnpm dev
```

This starts both the library in watch mode and the Next.js dev server via Turborepo.

To run the site only:

```sh
pnpm dev --filter=web
```

The site will be available at [localhost:3000](http://localhost:3000).

## Build

```sh
pnpm build --filter=web
```

## Stack

- [Next.js](https://nextjs.org) 15 (App Router, Turbopack)
- [Radix Colors](https://www.radix-ui.com/colors)
- [Motion](https://motion.dev)
- CSS Modules
