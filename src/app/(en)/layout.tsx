import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-mint focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
      >
        Skip to content
      </a>
      <Navbar locale="en" />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer locale="en" />
    </>
  );
}
