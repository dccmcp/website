"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { List, X, CaretDown, ArrowRight, GridFour, Clock, Translate } from "@phosphor-icons/react";
import { Logo } from "@/components/site/logo";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { site } from "@/lib/site";
import { integrations, integrationsByCategory, toolCount } from "@/lib/integrations";
import { getChrome } from "@/i18n/ui";
import { localePath, switchLocalePath, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function Navbar({ locale = "en" }: { locale?: Locale }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [integrationsOpen, setIntegrationsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const c = getChrome(locale);
  const groups = integrationsByCategory();
  const other: Locale = locale === "en" ? "zh" : "en";
  const link = (path: string) => localePath(locale, path);

  const closeMenus = () => {
    setOpen(false);
    setIntegrationsOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setIntegrationsOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const items = [
    { label: c.nav.pricing, href: "/pricing" },
    { label: c.nav.docs, href: "/docs" },
    { label: c.nav.blog, href: "/blog" },
    { label: c.nav.enterprise, href: "/enterprise" },
  ];

  const switcher = (
    <Link
      href={switchLocalePath(pathname, other)}
      className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-2 text-sm text-muted transition-colors hover:text-fg"
      aria-label={`${c.switchLabel}: ${other === "zh" ? "中文" : "English"}`}
      hrefLang={other === "zh" ? "zh-CN" : "en"}
    >
      <Translate className="h-4 w-4" weight="duotone" />
      {other === "zh" ? "中文" : "EN"}
    </Link>
  );

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || integrationsOpen ? "glass border-b border-line/80" : "border-b border-transparent",
      )}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between gap-6" aria-label="Main">
          <Link href={link("/")} className="shrink-0" onClick={closeMenus} aria-label={`${site.name} home`}>
            <Logo />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            <li>
              <button
                type="button"
                onClick={() => setIntegrationsOpen((value) => !value)}
                aria-expanded={integrationsOpen}
                aria-controls="integrations-menu"
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm transition-colors",
                  integrationsOpen || pathname.includes("/mcp-for-")
                    ? "text-fg"
                    : "text-muted hover:text-fg",
                )}
              >
                {c.nav.integrations}
                <CaretDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    integrationsOpen && "rotate-180",
                  )}
                  weight="bold"
                />
              </button>
            </li>
            {items.map((item) => {
              const href = link(item.href);
              const active = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={href}
                    className={cn(
                      "inline-flex rounded-md px-3 py-2 text-sm transition-colors",
                      active ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-1 lg:flex">
            <Link
              href={link("/docs")}
              className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-fg"
            >
              {c.nav.docs}
            </Link>
            {switcher}
            <ButtonLink href={link("/download")} variant="outline" size="sm" className="ml-1">
              <Clock className="h-3.5 w-3.5" weight="bold" />
              {c.nav.comingSoon}
            </ButtonLink>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            {switcher}
            <button
              type="button"
              onClick={() => {
                setOpen((value) => !value);
                setIntegrationsOpen(false);
              }}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-panel/70 text-fg"
            >
              {open ? <X className="h-5 w-5" /> : <List className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </Container>

      <div
        id="integrations-menu"
        className={cn(
          "absolute inset-x-0 top-full border-t border-line/80 bg-ink shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)] transition-[opacity,visibility,transform] duration-200 ease-[var(--ease-out-soft)]",
          integrationsOpen
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-1 opacity-0",
        )}
      >
        <Container className="py-8">
          <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {groups.map((group) => (
              <div key={group.category}>
                <p className="font-mono text-[10.5px] tracking-[0.14em] text-mint uppercase">
                  {group.category}
                </p>
                <ul className="mt-3 flex flex-col gap-0.5">
                  {group.items.map((integration) => (
                    <li key={integration.slug}>
                      <Link
                        href={link(`/${integration.slug}`)}
                        onClick={closeMenus}
                        className="group/item -mx-2 flex flex-col rounded-lg px-2 py-2 transition-colors hover:bg-panel-raised"
                      >
                        <span className="truncate text-[13.5px] text-fg transition-colors group-hover/item:text-mint">
                          MCP for {integration.software}
                        </span>
                        <span className="truncate font-mono text-[10.5px] text-muted">
                          {integration.tools.length} {c.menu.tools} · {integration.status}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="flex flex-col gap-3 rounded-xl border border-line bg-panel/50 p-4">
              <GridFour className="h-5 w-5 text-mint" weight="duotone" aria-hidden="true" />
              <p className="text-[14px] font-medium text-fg">
                {integrations.length} {c.menu.integrationsCount}
              </p>
              <p className="text-[12.5px] leading-relaxed text-muted">
                {toolCount}+ {c.menu.integrationsBlurb}
              </p>
              <Link
                href={link("/integrations")}
                onClick={closeMenus}
                className="mt-1 inline-flex items-center gap-1.5 text-[13px] text-mint transition-colors hover:text-mint-bright"
              >
                {c.menu.browseAll}
                <ArrowRight className="h-3.5 w-3.5" weight="bold" />
              </Link>
              <Link
                href={link("/enterprise")}
                onClick={closeMenus}
                className="inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-fg"
              >
                {c.menu.privateBridge}
                <ArrowRight className="h-3.5 w-3.5" weight="bold" />
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {open ? (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line/80 bg-ink lg:hidden">
          <Container className="flex flex-col gap-6 py-5">
            <div className="flex flex-col gap-1">
              {[{ label: c.nav.integrations, href: "/integrations" }, ...items].map((item) => (
                <Link
                  key={item.href}
                  href={link(item.href)}
                  onClick={closeMenus}
                  className="rounded-lg px-3 py-2.5 text-[15px] text-muted transition-colors hover:bg-panel-raised hover:text-fg"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-5 border-t border-line/70 pt-5">
              {groups.map((group) => (
                <div key={group.category}>
                  <p className="mb-2 font-mono text-[10.5px] tracking-[0.14em] text-mint uppercase">
                    {group.category}
                  </p>
                  <ul className="flex flex-col gap-0.5">
                    {group.items.map((integration) => (
                      <li key={integration.slug}>
                        <Link
                          href={link(`/${integration.slug}`)}
                          onClick={closeMenus}
                          className="block rounded-lg px-2 py-2 text-[13.5px] text-fg transition-colors hover:bg-panel-raised"
                        >
                          MCP for {integration.software}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-line/70 pt-5">
              <ButtonLink href={link("/docs")} variant="outline" size="md" onClick={closeMenus}>
                {c.nav.docs}
              </ButtonLink>
              <ButtonLink href={link("/download")} variant="outline" size="md" onClick={closeMenus}>
                <Clock className="h-4 w-4" weight="bold" />
                {c.nav.comingSoon}
              </ButtonLink>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
