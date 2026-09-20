import Link from "next/link";

/**
 * Shared MDX element styling for blog articles in every locale. Kept in one
 * place so the English and Chinese post templates cannot drift apart.
 */
export const mdxComponents = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      {...props}
      className="text-balance-tight mt-12 mb-4 scroll-mt-24 text-[24px] font-semibold text-fg sm:text-[28px]"
    />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 {...props} className="mt-9 mb-3 text-[19px] font-medium text-fg sm:text-[21px]" />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p {...props} className="my-4 text-[15px] leading-[1.75] text-muted" />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul {...props} className="my-5 flex list-disc flex-col gap-2 pl-5 text-[15px] leading-relaxed text-muted" />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol {...props} className="my-5 flex list-decimal flex-col gap-2 pl-5 text-[15px] leading-relaxed text-muted" />
  ),
  li: (props: React.ComponentProps<"li">) => <li {...props} className="pl-1" />,
  strong: (props: React.ComponentProps<"strong">) => (
    <strong {...props} className="font-medium text-fg" />
  ),
  a: (props: React.ComponentProps<"a">) => {
    const href = props.href ?? "";
    const internal = href.startsWith("/");
    if (internal) {
      return <Link {...props} href={href} className="text-mint underline decoration-mint/40 underline-offset-4 hover:text-mint-bright" />;
    }
    return (
      <a
        {...props}
        className="text-mint underline decoration-mint/40 underline-offset-4 hover:text-mint-bright"
        target="_blank"
        rel="noopener noreferrer"
      />
    );
  },
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      {...props}
      className="my-8 border-l-2 border-mint/50 pl-5 text-[16px] leading-relaxed text-fg/90 italic"
    />
  ),
  code: (props: React.ComponentProps<"code">) => (
    <code
      {...props}
      className="rounded-md border border-line/80 bg-panel-raised px-1.5 py-0.5 font-mono text-[13px] text-mint-bright"
    />
  ),
  pre: (props: React.ComponentProps<"pre">) => (
    <pre
      {...props}
      className="my-6 overflow-x-auto rounded-xl border border-line bg-ink/80 p-5 font-mono text-[12.5px] leading-relaxed text-mint/90 [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit"
    />
  ),
  table: (props: React.ComponentProps<"table">) => (
    <div className="my-7 overflow-x-auto rounded-xl border border-line">
      <table {...props} className="w-full border-collapse text-left text-[13.5px]" />
    </div>
  ),
  thead: (props: React.ComponentProps<"thead">) => <thead {...props} className="bg-panel-raised" />,
  th: (props: React.ComponentProps<"th">) => (
    <th
      {...props}
      className="border-b border-line px-4 py-3 font-mono text-[10.5px] tracking-[0.12em] text-muted uppercase"
    />
  ),
  td: (props: React.ComponentProps<"td">) => (
    <td {...props} className="border-b border-line/60 px-4 py-3 align-top text-muted" />
  ),
  img: (props: React.ComponentProps<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={props.alt ?? ""} className="my-7 w-full rounded-xl border border-line" />
  ),
};
