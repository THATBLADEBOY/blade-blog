---
title: 'React Component Selection Decision Tree'
description:
  'A comprehensive decision tree for creating React components in Next.js 15
  projects, covering shadcn/ui integration, server vs client components, and
  architectural best practices.'
category: 'Development'
tags:
  [
    'react',
    'nextjs',
    'components',
    'shadcn',
    'architecture',
    'decision-tree',
    'server-components',
  ]
createdAt: '2024-01-27'
---

# React Component Selection Decision Tree

When a new React component is needed, follow this **exact decision tree**:

## Step 1: Check Feature-Scoped Components

- **Location**: `app/(internal)/[feature]/components/`
- **Action**: Search for existing component in current feature directory
- **If found**: Use the existing component
- **If not found**: → Go to Step 2

## Step 2: Check Shared Components

- **Location**: `/components/` (root shared directory)
- **Action**: Search for existing component in shared components
- **If found**: Import and use the shared component
- **If not found**: → Go to Step 3

## Step 3: Check shadcn/ui Availability

- **Action**: Use Context7 to search for shadcn/ui components that match the
  needed functionality
- **Search query**: "shadcn [component-name]" (e.g., "shadcn button", "shadcn
  dialog")
- **If shadcn component exists**: → Go to Step 4
- **If no shadcn component**: → Go to Step 5

## Step 4: Install shadcn Component

- **Command**: `pnpm dlx shadcn@latest add [component-name]`
- **Examples**:
  - `pnpm dlx shadcn@latest add button`
  - `pnpm dlx shadcn@latest add dialog`
  - `pnpm dlx shadcn@latest add data-table`
- **After installation**: Ensure all module references are imported correctly
  and then import from `/components/ui/[component-name]`
- **Note**: shadcn components install to `/components/ui/` by default

## Step 5: Create Custom Component

- **For feature-specific**: Create in `app/(internal)/[feature]/components/`
- **For reusable**: Create in `/components/`
- **Use**: Tailwind CSS v4 + Radix UI primitives if needed

## Quick Reference Examples

### Button Component Needed:

1. ✅ Check `/components/ui/button.tsx` (likely exists from shadcn)
2. ❌ If missing: `pnpm dlx shadcn@latest add button`

### Data Table Component Needed:

1. ❌ Check feature components
2. ❌ Check `/components/`
3. ✅ shadcn has data-table: `pnpm dlx shadcn@latest add data-table`

### Custom Feature Component:

1. ❌ Not in feature components
2. ❌ Not in shared components
3. ❌ No shadcn equivalent
4. ✅ Create in `app/(internal)/[feature]/components/custom-component.tsx`

## Installation Notes

- Always use `pnpm dlx shadcn@latest add` command
- shadcn components automatically install dependencies
- Components appear in `/components/ui/` after installation
- Import as: `import { ComponentName } from "@/components/ui/component-name"`

## Best Practices & Guidelines

### DRY Principles

- **Before creating**: Always search for similar existing components that can be
  extended
- **Composition over duplication**: Use props, children, or composition patterns
- **Extract common logic**: Move shared functionality to custom hooks or
  utilities
- **Reusable variants**: Use cva (class-variance-authority) for component
  variants

### Next.js 15 + React 19 Component Guidelines

#### Server Components (Default)

- **Use for**: Data fetching, static content, SEO-critical content
- **Benefits**: Better performance, smaller bundle size, server-side rendering
- **No "use client" needed**: Server components are the default
- **Can import**: Other server components, utilities, server-only libraries

#### Client Components ("use client" required)

- **Use for**: Interactivity, event handlers, browser APIs, state management
- **Required for**:
  - `useState`, `useEffect`, `useContext`
  - Event handlers (`onClick`, `onChange`, etc.)
  - Browser APIs (localStorage, geolocation, etc.)
  - Third-party interactive libraries
- **Add at top**: `"use client"` directive at the very top of the file

#### Component Architecture Patterns

**🎯 Key Principle: Push Client Components Down the Tree**

Keep `"use client"` components as deep/low in the component tree as possible.
This maximizes server-side rendering benefits and minimizes client-side
JavaScript.

**Why this matters:**

- **Performance**: Server components load faster (no JS to download/parse)
- **SEO**: Content rendered on server is immediately available to crawlers
- **Bundle size**: Less JavaScript shipped to the client
- **Client boundary**: `"use client"` makes ALL child components client-side too

```tsx
// ✅ GOOD: Client component pushed down the tree
// page.tsx (Server Component - no "use client")
async function ProfilePage({ userId }: { userId: string }) {
  const user = await getUser(userId) // Server-side data fetching
  const posts = await getUserPosts(userId)

  return (
    <div>
      <h1>{user.name}</h1> {/* Server-rendered */}
      <p>{user.bio}</p> {/* Server-rendered */}
      <PostsList posts={posts} /> {/* Server component */}
      <InteractiveCounter /> {/* Only this is client-side */}
    </div>
  )
}

// ❌ BAD: Client component too high in tree
;('use client') // This makes EVERYTHING below client-side!
async function ProfilePage({ userId }: { userId: string }) {
  const [count, setCount] = useState(0) // Only need this for one button
  const user = await getUser(userId) // Now client-side (slower!)

  return (
    <div>
      <h1>{user.name}</h1> {/* Now client-rendered */}
      <p>{user.bio}</p> {/* Now client-rendered */}
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
    </div>
  )
}
```

**Pattern: Leaf Component Interactivity**

```tsx
// Server component (wrapper)
export function ProductCard({ product }) {
  return (
    <div>
      <h3>{product.name}</h3> {/* Server-rendered */}
      <p>{product.description}</p> {/* Server-rendered */}
      <span>{product.price}</span> {/* Server-rendered */}
      <AddToCartButton id={product.id} /> {/* Only button is client */}
    </div>
  )
}

// Client component (leaf)
;('use client')
export function AddToCartButton({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <button onClick={() => addToCart(id)} disabled={isLoading}>
      Add to Cart
    </button>
  )
}
```

### Component Decision Matrix

| Need              | Server Component | Client Component |
| ----------------- | ---------------- | ---------------- |
| Static UI         | ✅               | ❌               |
| Data fetching     | ✅               | ❌               |
| Event handlers    | ❌               | ✅               |
| React hooks       | ❌               | ✅               |
| Form interactions | ❌               | ✅               |
| Animations        | ❌               | ✅               |

### Common Patterns

#### Shared Props Interface

```tsx
// types/components.ts
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}
```

#### Composition with Variants

```tsx
// Use cva for consistent styling variants
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva('base-styles', {
  variants: {
    variant: { default: '...', destructive: '...' },
    size: { sm: '...', lg: '...' },
  },
})
```

### Red Flags to Avoid

- ❌ Adding "use client" to components that don't need interactivity
- ❌ Duplicating similar components instead of creating variants
- ❌ Creating client components for purely presentational content
- ❌ Not extracting reusable logic into custom hooks
- ❌ Mixing server and client logic in the same component file
