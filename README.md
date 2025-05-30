# Blog by Austin Blade

This is a minimal, fun, fast, and opinionated blog built with
[Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), and
[MDX](https://mdxjs.com/).

## Features

- [x] Minimalist design
- [x] Fast performance
- [x] Dark and light mode
- [x] Responsive design
- [x] SEO friendly

## Getting Started

### Prerequisites

- Node.js (v22+ recommended)
- pnpm

### Installation

```bash
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

### Linting & Formatting

```bash
pnpm lint
```

## Project Structure

- `app/` - Next.js App Router, routes, layouts, route-specific components
- `components/` - Shared React components
- `components/ui/` - UI primitives (buttons, cards, etc.)
- `content/` - Static/MDX content
- `hooks/` - Custom React hooks
- `lib/` - Utility functions, business logic
- `public/` - Static assets (images, fonts, etc.)

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/), but
can be deployed anywhere that supports Node.js.

1. Build the app: `pnpm build`
2. Deploy the `.next` output and `public/` directory to your host.

## License

MIT
