# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (http://localhost:3000)
npm run build      # Production build
npm run generate   # Static site generation
npm run preview    # Preview production build locally
```

## Architecture

This is a **Nuxt 4** static blog powered by **@nuxt/content v3**. Blog posts are Markdown files with frontmatter stored in `content/blog/`.

### Rendering model

The app is purely client-rendered (no SSR/pre-rendering configured). Pages use Nuxt 4's `useAsyncData` + `queryCollection` APIs to fetch content at runtime.

### Page structure

- **`app/app.vue`** — Root shell: `AppHeader` → `<NuxtPage />` → `AppFooter`
- **`app/pages/index.vue`** — Home page (static hero)
- **`app/pages/blog/index.vue`** — Blog listing, queries the `blog` collection ordered by `date DESC`
- **`app/pages/blog/[...slug].vue`** — Individual blog post. Looks up a post by matching `currentPath` against the `path` field via `queryCollection('blog').where('path', '=', ...)`. Throws 404 if not found. Renders content via `<ContentRenderer>`. The right-side TOC sidebar is implemented but currently commented out (both template and CSS).
- **`app/pages/resume.vue`** — Placeholder "Coming Soon" page

### Content collection

Defined in `content.config.ts`: a `blog` collection of type `page`, sourced from `blog/**/*.md`, with a Zod schema requiring `title`, `description`, and `date` (all strings).

### Styling

- `github-markdown-css` (`github-markdown-light.css`) provides base styles for rendered Markdown in `.markdown-body`
- Custom CSS in `app/assets/css/main.css` sets base typography (Helvetica Neue, PingFang SC, Hiragino Sans GB)
- All components use scoped `<style>` with hand-written CSS

### Components

- **AppHeader** — Sticky nav with brand logo, scroll-aware backdrop blur, hamburger menu on viewports ≤ 760px. Nav items: 首页 (`/`), 简历 (`/resume`), 博客 (`/blog`).
- **AppFooter** — Copyright line and Chinese ICP/PSB record links.

### Key conventions

- Dates are formatted with `zh-CN` locale (`new Intl.DateTimeFormat('zh-CN', { dateStyle: 'long' })`)
- The responsive breakpoint is 760px
- MDC anchor links are enabled for all heading levels (h1–h6), with `scroll-margin-top: 96px` to clear the sticky header
