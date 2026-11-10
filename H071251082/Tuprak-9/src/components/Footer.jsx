import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-32 overflow-hidden border-t border-line/80 bg-white/40 backdrop-blur-sm">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pt-16 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="block h-2.5 w-2.5 rounded-full bg-aksen shadow-xs" aria-hidden="true" />
            <p className="font-serif text-2xl tracking-tight text-ink">Pustaka Senja</p>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            Ruang baca komunitas untuk koleksi yang dirawat dan dibaca perlahan di Makassar.
          </p>
        </div>
        <div>
          <p className="label flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-aksen" aria-hidden="true" />
            Jelajah
          </p>
          <ul className="mt-4 space-y-2.5 text-sm font-medium">
            <li>
              <Link href="/katalog" className="tautan text-muted hover:text-ink">
                Katalog Koleksi
              </Link>
            </li>
            <li>
              <Link href="/katalog/tambah" className="tautan text-muted hover:text-ink">
                Tambah Buku Baru
              </Link>
            </li>
            <li>
              <Link href="/usulan" className="tautan text-muted hover:text-ink">
                Usulkan Buku
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="label flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-sorot" aria-hidden="true" />
            Jam Baca
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Senin – Sabtu<br />
            <span className="font-serif text-base font-semibold text-ink">14.00 – 20.00 WITA</span>
          </p>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="display mt-12 select-none whitespace-nowrap text-center text-[clamp(3.5rem,15.5vw,14rem)] leading-[0.8] text-paper-deep/70"
      >
        Pustaka Senja
      </p>

      <div className="border-t border-line/70 bg-paper/60 py-5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 text-xs font-mono text-muted">
          <p>© {new Date().getFullYear()} Pustaka Senja · Tugas Praktikum 9</p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-aksen" />
            Next.js App Router + PostgreSQL Raw SQL
          </p>
        </div>
      </div>
    </footer>
  );
}
