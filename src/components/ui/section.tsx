import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1240px] px-5 sm:px-8", className)} {...props} />;
}

export function Section({
  className,
  containerClassName,
  children,
  ...props
}: ComponentProps<"section"> & { containerClassName?: string }) {
  return (
    <section className={cn("relative py-20 sm:py-24 lg:py-28", className)} {...props}>
      {children === undefined ? null : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-mint uppercase",
        className,
      )}
    >
      <span className="h-px w-6 bg-mint/50" aria-hidden="true" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as: As = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h2" | "h3";
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <As className="text-balance-tight max-w-3xl text-3xl font-semibold text-fg sm:text-4xl lg:text-[42px] lg:leading-[1.08]">
        {title}
      </As>
      {description ? (
        <div className="max-w-[62ch] text-[15px] leading-relaxed text-muted sm:text-base">
          {description}
        </div>
      ) : null}
    </Reveal>
  );
}
