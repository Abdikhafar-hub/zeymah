# AbayaButh Premium Storefront

An editorial modest-fashion storefront with collection browsing, product details, search, wishlist, cart interactions, and responsive shopping layouts.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/abayabuth-storefront/src/App.tsx` — wouter routes and shared storefront provider.
- `artifacts/abayabuth-storefront/src/components/storefront.tsx` — header, overlays, cart, product cards, footer, and shared shopping state.
- `artifacts/abayabuth-storefront/src/data/catalog.ts` — local typed catalog and reference-derived image paths.
- `artifacts/abayabuth-storefront/src/pages/` — home, collection, product detail, and not-found pages.
- `artifacts/abayabuth-storefront/src/index.css` — storefront design tokens and responsive styling.

## Architecture decisions

- The first storefront build uses local catalog data and React state so the shopping experience is usable without an external commerce integration.
- Reference screenshots are cropped into local assets before use so browser chrome and page framing do not appear inside product and campaign imagery.
- Wouter routes are kept flat and explicit so collection and product paths work correctly through the artifact preview prefix.

## Product

- Homepage with campaign hero, category tiles, new arrivals, editorial storytelling, styling inspiration, gifting, newsletter, and retailer footer.
- Collection pages for abayas and hijabs with category navigation, filtering controls, availability toggle, sorting, product cards, wishlist buttons, and sold-out states.
- Product detail page with gallery, color selection, quantity updates, add-to-bag, wishlist, installment messaging, and expandable information sections.
- Search overlay, mobile navigation, cart drawer, newsletter feedback, and responsive layouts.

## User preferences

- User authorized an exact visual/content rebuild of the provided AbayaButh reference and intends to publish the storefront.

## Gotchas

- The storefront workflow supplies `PORT` and `BASE_PATH`; local production builds need both variables set.
- Images in `public/reference/` are intentionally cropped derivatives of the supplied screenshots; keep them local rather than hotlinking the live site.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
