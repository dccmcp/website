import { Robot } from "@phosphor-icons/react/dist/ssr";
import { brandIcon } from "@/lib/brand-icons";
import { cn } from "@/lib/utils";

/**
 * Client mark for an AI agent.
 *
 * When the client publishes a brand mark we have on file (LobeHub Icons, MIT),
 * it is rendered in a single color inside a neutral tile. Clients without a
 * mark fall back to a generic agent glyph, so the row always reads as one
 * consistent set rather than a mix of logos and letters.
 */
export function BrandIcon({
  slug,
  className,
  size = "md",
}: {
  slug?: string;
  className?: string;
  size?: "sm" | "md";
}) {
  const icon = brandIcon(slug);

  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid shrink-0 place-items-center rounded-lg border border-line bg-panel-raised text-mint",
        size === "sm" ? "h-8 w-8" : "h-9 w-9",
        className,
      )}
    >
      {icon ? (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={size === "sm" ? "h-4 w-4" : "h-[18px] w-[18px]"}
          // Vendored static markup from the MIT-licensed LobeHub icon set — no user input.
          dangerouslySetInnerHTML={{ __html: icon.markup }}
        />
      ) : (
        <Robot
          className={size === "sm" ? "h-4 w-4" : "h-[18px] w-[18px]"}
          weight="duotone"
        />
      )}
    </span>
  );
}
