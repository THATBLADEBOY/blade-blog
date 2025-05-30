---
title: 'Next.js Project Guidelines'
description:
  'Comprehensive architectural guidelines and coding standards for Next.js 15
  projects with TypeScript, covering structure, patterns, and best practices.'
category: 'Development'
tags:
  ['nextjs', 'typescript', 'architecture', 'guidelines', 'project-structure']
createdAt: '2024-01-26'
---

## Tech Stack

- **Framework**: Next.js 15.3 (App Router) + TypeScript
- **UI**: Tailwind CSS v4, ShadCN (Radix UI), Framer Motion
- **Package Manager**: pnpm
- **Database**: PostgreSQL (Neon) via Drizzle ORM
- **Auth**: Custom (bcryptjs) using Better Auth
- **State**: React hooks + context (Zustand for global state)
- **Analytics and Error Logging**: PostHog

---

## Project Structure & Feature Architecture

```
/app
  (auth)       -> Auth routes
  (public)     -> Public routes
  (internal)   -> Internal app features
  /api         -> Route handlers
/components    -> Shared UI components
  /ui            -> Base UI (Radix-based)
  /icons         -> Icon components
  /motion        -> Animation utils
  /providers     -> Context providers
/db            -> Database setup
  /migrations    -> Migration files
  /schemas       -> DB schemas
  /seed          -> Seed scripts
/hooks         -> Custom React hooks
/lib           -> App-wide utilities
/public        -> Static assets
```

### Feature Module Pattern (app/(internal)/\[feature]/)

Each feature directory should follow this structure:

```
/app/(internal)/[feature]/
  layout.tsx      -> Shared layout
  loading.tsx     -> Suspese for loading states
  page.tsx        -> Route entrypoint
  errors.ts.      -> Feature Scoped Error Classes
  actions.ts      -> Server actions (service layer)
  /components     -> Feature-specific UI components
```

- `actions.ts` encapsulates all data operations (fetching, mutations) using
  Drizzle ORM.
- Components in `/components` are scoped to the feature and not reused
  elsewhere.
- `page.tsx` wires everything together—layout, data, and rendering.
- `layout.tsx` is only used if there's a need for a shared layout at the
  feature-level
- `loading.tsx` is only needed for handling loading states with React's Suspense

#### Design Goals:

- **Encapsulation**: Each feature is self-contained
- **Separation of Concerns**:
  - UI: `/components`
  - Server logic: `actions.ts`
  - Route: `page.tsx`
- **Scalability**: Add new features easily using the same pattern
- **Maintainability**: Easy navigation and clear code ownership

---

## Code Style Guide

- **Components**: `PascalCase`
- **Functions & Variables**: `camelCase`
- **Filenames**: `kebab-case`
- **Exports**: Prefer named exports, default only where required (e.g.,
  `page.tsx`)
- **Prettier & EsLint**: @eslint.config.mjs

---

## Error Handling

- Use custom error classes (e.g., `AuthError`, `ValidationError`)
- Consistent error response format (JSON with `message`, `statusCode`)
- Always log unexpected errors
- Use proper HTTP status codes in APIs

---

## Documentation

- Use **JSDoc** for all exported functions
- Keep `README.md` up to date
- API contracts must be documented with OpenAPI (Swagger)

---

## Security Practices

- Never expose secrets in the client
- Use environment variables for sensitive data
- Sanitize inputs and validate user sessions
- Set appropriate CORS headers
- Implement secure auth middleware

---

## State Management

- **Zustand**: Global state
- **React Context**: Theme, auth
- **Local state**: UI-specific interactions
- Persist state where appropriate (e.g., theme, auth tokens)

---

## Performance Guidelines

- Use **TanStack Query** for client caching & revalidation
- Optimize images with Next.js `<Image />`
- Implement dynamic imports & lazy loading
- Split code by route & feature

---

## Summary

This project emphasizes **consistency**, **separation of concerns**, and
**scalability** through strict architectural guidelines and coding standards.
All contributors MUST align with these practices to ensure long-term
maintainability and developer happiness.
