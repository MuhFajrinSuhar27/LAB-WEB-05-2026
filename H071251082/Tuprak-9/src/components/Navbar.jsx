import Link from "next/link";
import NavLinks from "@/components/NavLinks";

export default function Navbar() {
  return (
    <header className="sticky top-3 z-40 px-3 sm:top-4 sm:px-4">
      <nav className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-line/80 bg-white/80 py-2 pl-5 pr-2 shadow-[0_14px_34px_-14px_rgba(26,26,24,0.14)] backdrop-blur-xl transition-all">
        <Link
          href="/"
          className="group flex items-center gap-2.5 py-1"
          aria-label="Pustaka Senja, ke beranda"
        >
          <span className="relative flex h-3 w-3 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aksen opacity-40 duration-1000" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-aksen shadow-xs transition-transform duration-300 group-hover:scale-125" />
          </span>
          <span className="font-serif text-lg tracking-tight text-ink transition-colors group-hover:text-aksen">
            Pustaka Senja
          </span>
        </Link>
        <NavLinks />
      </nav>
    </header>
  );
}
