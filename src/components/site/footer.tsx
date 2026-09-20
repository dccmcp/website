import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { Container } from "@/components/ui/section";
import { footerNav, site } from "@/lib/site";
import { integrations } from "@/lib/integrations";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-ink-deep">
      <Container className="py-14 sm:py-16">
        {/* Site-wide internal links to every "MCP for <software>" page. */}
        <nav aria-label="Integrations" className="mb-12 border-b border-line pb-10">
          <h2 className="text-[11px] font-semibold tracking-[0.16em] text-fg uppercase">
            MCP Servers for
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
            {integrations.map((integration) => (
              <li key={integration.slug}>
                <Link
                  href={`/${integration.slug}`}
                  className="inline-flex items-center rounded-lg border border-line bg-panel px-3 py-1.5 text-[12.5px] text-muted transition-colors hover:border-mint/40 hover:text-mint"
                >
                  {integration.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/enterprise#contact"
                className="inline-flex items-center rounded-lg border border-dashed border-line px-3 py-1.5 text-[12.5px] text-muted transition-colors hover:border-mint/40 hover:text-mint"
              >
                + your in-house software
              </Link>
            </li>
          </ul>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_2.4fr]">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-[40ch] text-sm leading-relaxed text-muted">
              DCC is short for Digital Content Creation. We connect AI agents to the DCC, CAD, GIS
              and vision software your team already runs.
            </p>
            <div className="flex flex-col gap-1.5 text-sm">
              <a
                className="text-muted transition-colors hover:text-mint"
                href={`mailto:${site.email}`}
              >
                {site.email}
              </a>
              <Link href="/legal/dpa" className="text-muted/80 transition-colors hover:text-fg">
                DPA &amp; sub-processors
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerNav.map((group) => (
              <div key={group.title} className="flex flex-col gap-3">
                <h3 className="text-[11px] font-semibold tracking-[0.16em] text-fg uppercase">
                  {group.title}
                </h3>
                <ul className="flex flex-col gap-2">
                  {group.links.map((link) => (
                    <li key={`${group.title}-${link.href}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-[13px] leading-relaxed text-muted transition-colors hover:text-fg"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-line pt-8">
          <p className="max-w-[92ch] text-[12px] leading-relaxed text-muted/80">
            {site.name} provides independent, third-party MCP integrations. We build MCP servers and
            adapters that connect AI agents to software made by others — we do not develop, publish
            or support those applications, and we are not affiliated with, endorsed by, sponsored by
            or certified by any vendor or project we interoperate with, including Autodesk, Adobe,
            Maxon, the Blender Foundation, Robert McNeel &amp; Associates, the FreeCAD project, the
            QGIS project and the OpenCV project. That list is illustrative, not exhaustive: the same
            applies to every other vendor, project or product named on this site. All product names,
            logos and brands are the property of their respective owners and are used for
            identification and compatibility purposes only.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[12px] text-muted">
              &copy; {year} {site.name}. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-muted">
              <Link className="transition-colors hover:text-fg" href="/legal/terms">
                Terms
              </Link>
              <Link className="transition-colors hover:text-fg" href="/legal/privacy">
                Privacy
              </Link>
              <Link className="transition-colors hover:text-fg" href="/legal/security">
                Security
              </Link>
              <Link className="transition-colors hover:text-fg" href="/legal/cookies">
                Cookies
              </Link>
              <Link className="transition-colors hover:text-fg" href="/legal/dpa">
                DPA
              </Link>
              <Link className="transition-colors hover:text-fg" href="/legal/acceptable-use">
                Acceptable use
              </Link>
              <Link className="transition-colors hover:text-fg" href="/legal/third-party-notice">
                Third-party notice
              </Link>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-success" aria-hidden="true" />
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
