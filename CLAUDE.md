# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `pnpm dev` - Start development server with turbopack
- `pnpm build` - Build production application
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint with Next.js configuration
- `pnpm typegen` - Generate TypeScript types from Sanity schemas

### Testing
No specific test framework is configured. Check with the project owner for testing approach.

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15.2.1 with App Router
- **Runtime**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4 with shadcn/ui components
- **CMS**: Sanity CMS with live preview support
- **State**: Zustand for client state (shopping basket)
- **Animation**: GSAP 3.13.0 and Framer Motion
- **Auth**: Clerk for authentication
- **Analytics**: PostHog, Vercel Analytics, Vercel Speed Insights
- **Payments**: Stripe and Razorpay integration
- **Email**: Resend with React Email templates

### Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── (portfolio)/       # Portfolio site routes
│   ├── (store)/          # E-commerce routes
│   ├── (admin)/          # Admin dashboard
│   └── api/              # API routes
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui base components
│   ├── home/             # Homepage sections
│   ├── store/            # E-commerce components
│   └── sanity/           # Sanity portable text components
├── sanity/               # Sanity CMS configuration
│   ├── lib/              # Client queries and utilities
│   └── schemaTypes/      # Content schemas
├── lib/                  # Utilities and configurations
├── store/                # Zustand state management
└── constants/            # Static data and configuration
```

### Key Features
1. **Multi-purpose Application**: Portfolio, blog, and e-commerce store
2. **CMS Integration**: Sanity headless CMS with live preview
3. **E-commerce**: Complete shopping cart with Stripe/Razorpay payments
4. **Admin Dashboard**: Product management and file uploads
5. **SEO Optimization**: JSON-LD structured data, dynamic metadata
6. **Performance**: GSAP animations, image optimization, smooth scrolling
7. **Chrome Extension Test Page**: Special test route for extension development

### Content Management
- **Site Data**: Configuration stored in `src/constants/siteData.json`
- **Dynamic Content**: Blog posts, products, and testimonials managed via Sanity CMS
- **Asset Management**: Images served through Sanity CDN with optimization
- **Draft Mode**: Preview unpublished content via Sanity live preview

### State Management
- **Shopping Basket**: Zustand store with persistence (`src/store/store.ts`)
- **Theme**: Next.js themes with system preference support
- **Cursor Effects**: Custom cursor animations with context awareness

### API Routes
- **E-commerce**: Order creation, payment processing, coupon verification
- **Admin**: File uploads to cloud storage (S3 compatible)
- **Email**: Newsletter subscription and contact forms via Resend

### Environment Configuration
Required environment variables:
- Sanity: `NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID`, `NEXT_PUBLIC_SANITY_STUDIO_PROJECT_DATASET`
- Clerk authentication keys
- Stripe and Razorpay API keys
- Resend API key for emails
- Cloud storage credentials (AWS S3)

### Development Notes
- Uses turbopack for faster development builds
- TypeScript paths configured with `@/` alias for `src/`
- ESLint allows `@typescript-eslint/ban-ts-comment` and warns on `any` types
- Sanity Studio accessible at `/studio` route
- PostHog analytics with custom rewrites for better tracking