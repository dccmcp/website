import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap transition-[transform,background-color,border-color,color,opacity] duration-200 ease-[var(--ease-out-soft)] active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-mint text-ink hover:bg-mint-bright shadow-[0_0_0_1px_rgba(45,212,191,0.5),0_10px_30px_-14px_rgba(45,212,191,0.55)]",
        outline:
          "border border-line bg-panel/60 text-fg hover:border-mint/50 hover:bg-panel-raised hover:text-mint-bright",
        ghost: "text-muted hover:text-fg hover:bg-panel-raised",
        subtle: "bg-panel-raised text-fg border border-line hover:border-mint/40 hover:text-mint-bright",
      },
      size: {
        sm: "h-9 px-3.5 text-[13px]",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-[15px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonBaseProps = VariantProps<typeof buttonVariants> & { className?: string };

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonBaseProps & ComponentProps<"button">) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export function ButtonLink({
  className,
  variant,
  size,
  href,
  ...props
}: ButtonBaseProps & ComponentProps<typeof Link>) {
  return (
    <Link href={href} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
