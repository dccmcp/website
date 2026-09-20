"use client";

import { useState } from "react";
import { Plus } from "@phosphor-icons/react";
import { Section, SectionHeading } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { homeFaq, type FaqItem } from "@/lib/faq";
import type { Locale } from "@/i18n/config";

const faqCopy = {
  en: {
    eyebrow: "FAQ",
    title: "Questions teams ask before they install",
    description:
      "If something is missing, ask us directly — we answer technical questions with technical answers.",
  },
  zh: {
    eyebrow: "常见问题",
    title: "团队在安装前最常问的问题",
    description: "如果没有覆盖到你的问题，直接写信给我们——技术问题我们给技术回答。",
  },
} as const;

export function Faq({
  items = homeFaq,
  id = "faq",
  locale = "en",
}: {
  items?: FaqItem[];
  id?: string;
  locale?: Locale;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const t = faqCopy[locale];

  return (
    <Section id={id}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />

        <ul className="flex flex-col divide-y divide-line/70 border-y border-line/70">
          {items.map((item, index) => {
            const isOpen = open === index;
            return (
              <li key={item.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-6 py-5 text-left"
                  >
                    <span
                      className={cn(
                        "text-[15px] leading-snug font-medium transition-colors",
                        isOpen ? "text-fg" : "text-muted hover:text-fg",
                      )}
                    >
                      {item.q}
                    </span>
                    <Plus
                      className={cn(
                        "mt-0.5 h-4 w-4 shrink-0 transition-transform duration-300",
                        isOpen ? "rotate-45 text-mint" : "text-muted",
                      )}
                      weight="bold"
                    />
                  </button>
                </h3>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-out-soft)]",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <p className="overflow-hidden pr-8 text-[13.5px] leading-relaxed text-muted">
                    <span className="block pb-5">{item.a}</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
