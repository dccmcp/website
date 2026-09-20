# DCCMCP.com

Marketing site for **DCCMCP — MCP for Creative & Engineering Software**: production-grade MCP
Servers and plugins that let AI agents control Blender, Rhino, FreeCAD, QGIS and OpenCV.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, React 19, Turbopack) |
| Styling | Tailwind CSS v4 (`@theme` tokens in `src/app/globals.css`) |
| Components | Hand-rolled shadcn-style primitives in `src/components/ui` |
| Animation | CSS scroll-driven `view()` timelines + CSS keyframes — no animation library |
| Icons | Phosphor Icons (`dist/ssr` in server components) |
| Content | Typed data modules + MDX blog posts (`gray-matter` + `next-mdx-remote/rsc`) |
| Fonts | Geist / Geist Mono via `next/font` |
| Analytics | Vercel Web Analytics, opt-in via env var |
| Deploy target | Vercel |

Total client JavaScript is deliberately small: only the navbar, the hero session demo, the
scrolling "how it works" panel, the FAQ accordion, the tilt wrapper and the contact form
are client components.

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # production build (all content pages are static)
pnpm start        # serve the production build
pnpm lint
```

Copy `.env.example` to `.env.local` and adjust as needed. Everything has a sane default, so the
site builds and runs with no environment variables at all.

## Project structure

```
src/
├── app/
│   ├── page.tsx                     # Landing page (Hero → Final CTA)
│   ├── integrations/page.tsx        # Integration index
│   ├── download/page.tsx            # Free Community edition download + install commands
│   ├── mcp-for-{blender,rhino,freecad,qgis,opencv}/page.tsx
│   ├── pricing/page.tsx             # Plans + full comparison table
│   ├── docs/page.tsx                # Quickstart, tool index, policy, changelog
│   ├── blog/page.tsx                # Blog index
│   ├── blog/[slug]/page.tsx         # MDX article renderer
│   ├── enterprise/page.tsx          # Enterprise pitch + contact form
│   ├── about/page.tsx
│   ├── legal/[doc]/page.tsx         # terms · privacy · security · third-party notice
│   ├── api/contact/route.ts         # Contact form transport
│   ├── sitemap.ts · robots.ts · opengraph-image.tsx · icon.svg
│   └── globals.css                  # Design tokens, utilities, keyframes
├── components/
│   ├── ui/                          # Button, Badge/RiskPill, Section primitives
│   ├── motion/                      # Reveal/Stagger (CSS), TiltCard (client)
│   ├── site/                        # Navbar, Footer, Logo, ContactForm, Analytics
│   ├── sections/                    # Every landing-page section + integration template
│   └── visuals/                     # Animated agent session demo, host viewport art
├── content/blog/*.mdx               # English articles (frontmatter drives metadata + sitemap)
├── content/blog/zh/*.mdx            # Chinese articles, same slugs as the English originals
└── lib/                             # integrations, pricing, blog, legal, faq, site config
```

Chinese pages are mirrored under `src/app/zh/` with the same slugs as the English tree, so
`/docs` pairs with `/zh/docs` and the language switcher never has to guess.

## Editing content

**Integration pages** — everything on `/mcp-for-*` comes from `src/lib/integrations.ts`. One
entry drives the hero, spec table, "What is MCP for X?" definition block, problem/workflow copy,
tool reference, install steps, related cards, FAQ and all structured data.

The landing-page grid shows only entries with `featured: true`; every other product page is
reachable from `/integrations`, the site-wide footer link band, the related-integrations block on
each product page, and the "Browse all integrations" banner. To add a product:

1. Append an entry to `integrations` in `src/lib/integrations.ts`.
2. Add `src/app/mcp-for-<slug>/page.tsx`:
   ```tsx
   import type { Metadata } from "next";
   import { IntegrationPage, integrationMetadata } from "@/components/sections/integration-page";

   export const metadata: Metadata = integrationMetadata("mcp-for-<slug>");

   export default function Page() {
     return <IntegrationPage slug="mcp-for-<slug>" />;
   }
   ```
3. Set `featured: true` if it belongs on the landing page grid, and give it an `updated` date
   (used as the sitemap `lastModified`).

That is the whole checklist — the integrations hub, the jump nav, the footer band, the sitemap,
the `ItemList` schema and the related-integrations blocks all read from the same array.

**Blog posts** — add an `.mdx` file to `src/content/blog/`. Frontmatter: `title`, `description`,
`date`, `readingTime`, `category`, `keywords`, optional `featured: true`. Posts are statically
generated, added to the sitemap, and emitted as `BlogPosting` structured data.

For Chinese, add the same slug under `src/content/blog/zh/` with translated frontmatter and body.
`getAllPosts("zh")` reads that directory, and the sitemap emits both URLs as hreflang alternates.
A post without a Chinese twin simply has no `/zh/blog/<slug>` page.

**Legal documents** — `src/lib/legal.ts` holds sectioned content for each document; the route is
static via `generateStaticParams`.

### Plan entitlements

`src/lib/pricing.ts` is the single source of truth for what each plan includes; the pricing pages
(EN and ZH), the home-page preview and the JSON-LD all read from it. When a capability moves
between plans, change it there first, then fix the prose in the places that assert it:

- `/download` lists what the **free** edition contains, in both locales.
- FAQ answers are the sneaky ones. "Will the Community edition be free?" and "Can an agent break my
  production scene?" both used to promise checkpointing to everyone — the download and integration
  answers carry the current wording.
- The integrations hub describes always-on features; anything gated does not belong in that copy.
- The hero's promise row is deliberately limited to capabilities **every** plan has. Paid
  differentiators belong on the pricing page, where the gate is stated next to the price.

**Current gate:** checkpoints and rollback are **Studio and Enterprise only** (Community shows a
dash in the comparison table). Community's protection is the read-only default plus the approval
gate, and the copy says exactly that rather than implying reversible writes.

## SEO

- Per-page `title`, `description`, canonical URL, Open Graph and Twitter card metadata.
- Structured data: `Organization`, `WebSite`, `SoftwareApplication` (per integration),
  `FAQPage` (landing, pricing, each integration), `Blog` and `BlogPosting`.
- `sitemap.xml` and `robots.txt` generated from content, with explicit allowances for
  `GPTBot`, `ClaudeBot`, `PerplexityBot` and `Google-Extended`.
- Keyword focus per the content plan: `MCP for Blender`, `MCP for Maya`, `MCP for Houdini`,
  `MCP for 3ds Max`, `MCP for Rhino`, `MCP for ZBrush`, `MCP for Photoshop`, `MCP for FreeCAD`,
  `MCP for QGIS`, `MCP for OpenCV`, plus long-tail tutorial and buyer-guide posts.
- Every product page uses the keyword-first URL `/mcp-for-<software>`, a visible breadcrumb plus
  `BreadcrumbList` schema, a question-style `What is MCP for <software>?` definition block, and
  same-category internal links to neighbouring integrations.
- Entrance animations use CSS `animation-timeline: view()` behind `@supports`. Content is always
  present in the HTML at full opacity, so nothing depends on JavaScript to be readable or
  indexable.

## Conversion path

There is a free Community edition, so nothing gates the product behind a sales call:

- Primary CTA everywhere is **Download** → `/download`, which lists the per-product install
  commands and links to each integration page.
- The only sales contact left is for enterprise work that genuinely needs a conversation:
  SSO, self-hosting, and private bridges for unsupported software (Revit, Civil 3D, KiCad,
  Ansys, in-house tools).

## Contact form

`POST /api/contact` validates the payload server-side (including a honeypot) and then, in order:

1. `ZEPTOMAIL_API_KEY` + `CONTACT_TO_EMAIL` → emails the enquiry through ZeptoMail.
2. `RESEND_API_KEY` + `CONTACT_TO_EMAIL` → emails the enquiry through Resend.
3. `CONTACT_WEBHOOK_URL` → POSTs the payload as JSON.
4. Nothing configured → `503`, so the form falls back to a `mailto:` link.

It never reports a success it did not achieve.

### Email template

Every transport renders through `src/lib/enquiry-email.ts`. It returns
`{ subject, text, html }` from one enquiry, so ZeptoMail and Resend can never drift apart, and
there is a single place to restyle.

The HTML is deliberately built the way email clients require: nested tables, inline styles on
every element, a 600px container that collapses on mobile, web-safe font stacks, and a light
scheme forced with `color-scheme`. No `<style>` block, no flexbox, no grid — Outlook desktop
renders through Word and Gmail strips more than people expect. Do not move these rules into a
stylesheet.

The plain-text part is a real alternative, not an afterthought: it spells out the same fields
with an ASCII rule separator, because some clients and a lot of forwarding paths show only that.

Preview or send it locally without going through the site:

```bash
node /tmp/render-demos.ts      # writes /tmp/email-*.html for a visual check
```

### Bot protection

The form carries a Cloudflare Turnstile widget configured for **Managed** mode with
`appearance: "interaction-only"`. Real visitors are cleared in the background and the widget
occupies no space at all unless Cloudflare decides a challenge is needed.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Widget site key (public, baked in at build time) |
| `TURNSTILE_SECRET_KEY` | Server-side secret; verification is enforced only when this is set |

Details worth keeping:

- The widget is rendered through the explicit JS API so the enterprise page's two forms share
  one script load, and every widget is `reset()` after a submit because tokens are single-use.
- Tokens go to `/api/contact` as `turnstileToken` and are checked against
  `https://challenges.cloudflare.com/turnstile/v0/siteverify` before any transport runs.
- **Fail-closed, with an honest fallback.** If the script cannot load, the form says so and
  points at `support@dccmcp.com` rather than claiming verification is "still running".
- Local development and previews without keys behave exactly as they did before — no captcha,
  no rejection — so the transport work is still testable in isolation.
- Cloudflare's published test keys are listed in `.env.example`; the always-pass and always-fail
  pairs are the fastest way to exercise both branches.

### ZeptoMail

Enquiries go out over ZeptoMail's HTTP API (`https://api.zeptomail.com/v1.1/email`,
`Authorization: Zoho-enczapikey <token>`), not SMTP — no dependency, no long-lived socket, which
suits a serverless function. The token is the Mail Agent's **Send Mail Token**, the same string
used as the SMTP password with the username `emailapikey`; SMTP on `smtp.zeptomail.com` (465 SSL /
587 STARTTLS) also authenticates with it if we ever need that path.

| Variable | Value |
| --- | --- |
| `ZEPTOMAIL_API_KEY` | Send Mail Token |
| `CONTACT_TO_EMAIL` | Inbox that receives enquiries — **must be able to receive mail** |
| `CONTACT_FROM_EMAIL` | `DCCMCP <support@dccmcp.com>` (domain verified in ZeptoMail) |
| `ZEPTOMAIL_API_URL` | Optional; regional hosts (`.in`, `.eu`) |

Two quirks worth remembering: `to` entries nest their address under `email_address`, while
`reply_to` entries take `address` at the top level; and the sending domain does **not** need
inbound MX, so ZeptoMail can send from `support@dccmcp.com` even though that address cannot
receive replies.

## Brand and legal guardrails

- The product name is **DCCMCP**. Avoid "DCC-MCP" in copy, titles and metadata.
- Keywords follow the `MCP for <Software>` pattern.
- Host-application icons are original abstract glyphs (`src/components/site/software-glyph.tsx`)
  — no DCC vendor logos are used.
- AI client marks come from the MIT-licensed LobeHub Icons collection, vendored into
  `src/lib/brand-icons.ts` and rendered monochrome by `src/components/site/brand-icon.tsx`.
  The MIT licence covers the artwork, not the trademarks; the marks are used only to indicate
  compatibility. Clients without a published mark fall back to a generic agent glyph.
  Regenerate with the upstream `@lobehub/icons-static-svg` package when it updates.
  See `/legal/third-party-notice` §4 for the published position.
- The footer carries the non-affiliation disclaimer, and `/legal/third-party-notice` states the
  position formally.
- The legal documents in `src/lib/legal.ts` are plain-language baselines written for technical
  review. Have them reviewed by counsel before relying on them commercially, and fill in the
  governing-law jurisdiction in the terms.

## Localisation

English is served at the root, Chinese under `/zh`. Both trees are static, and every translated
pair declares reciprocal `hreflang` alternates plus its own canonical URL.

| Layer | Where it lives |
| --- | --- |
| Route mirror | `src/app/zh/**` — same slugs as `src/app/(en)/**` |
| Chrome strings | `src/i18n/ui.ts` (`chrome[locale]`), consumed by navbar and footer |
| Path helpers | `src/i18n/config.ts` — `localePath`, `switchLocalePath` |
| Integration copy | `src/lib/integrations.zh.ts`, keyed by integration slug |
| Blog posts | `src/content/blog/zh/*.mdx` |
| Form copy | the `copy` table in `src/components/site/contact-form.tsx` |

Two conventions worth keeping:

- **Tool names, commands, code and host-software product names stay in English.** They are the
  literal API surface; translating them would make the docs wrong.
- **Legal documents are English-only on purpose.** `/zh/legal/*` renders the fallback notice,
  which says why. A machine-translated contract is worse than no translation.

Anything not yet translated falls through to `src/app/zh/[...slug]/page.tsx`, which renders a
`noindex` notice linking to the English original, so the language switcher can never 404.

## Deployment

Vercel: import the repository, set `NEXT_PUBLIC_SITE_URL=https://dccmcp.com`, and optionally set
`NEXT_PUBLIC_ANALYTICS=on` and `CONTACT_WEBHOOK_URL`. Add the `dccmcp.com` domain in the project
settings. No other build configuration is required.

### Outstanding production setup

Current state of the moving parts that live outside this repository:

| Item | State |
| --- | --- |
| Turnstile | ✅ Widget `DCCMCP` (managed, `dccmcp.com`); site key + secret set on Vercel |
| `CONTACT_TO_EMAIL` | ✅ `leon@meetaps.com` — the form delivers through ZeptoMail |
| SPF / DKIM / DMARC | ✅ SPF on the root and on `bounce-zem`, DKIM selector `2045229`, DMARC `p=none` |
| **Inbound MX** | ⏸ **Deferred by decision — apply at launch** |

**Inbound MX (deferred until launch).** `dccmcp.com` has no MX records, so
`support@dccmcp.com` cannot receive mail. Every "email support@dccmcp.com" call to action — footer,
pricing, download, legal, and the contact form's own fallback — bounces today. Outbound mail is
unaffected: ZeptoMail sends from that address without needing inbound routing.

When the product actually launches, apply the fix in one go:

1. Cloudflare dashboard → the `dccmcp.com` zone → **Email Routing** → enable.
2. Add a destination address (`leon@meetaps.com`) and click the verification link Cloudflare emails.
3. Add a rule forwarding `support@dccmcp.com` → that destination.

That writes the MX records (and an SPF TXT) for the zone, which turns every `mailto:` link on the
site from a dead end into a working contact path. Until then the enquiry form is the only inbound
channel, which is why it is wired to a real mailbox.

A domain that sends mail without MX is a mild negative signal in some spam filters, so enabling
this at launch helps deliverability as well.

