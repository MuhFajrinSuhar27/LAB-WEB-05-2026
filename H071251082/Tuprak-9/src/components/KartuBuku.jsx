import Link from "next/link";
import CoverBuku from "@/components/CoverBuku";
import StatusBuku from "@/components/StatusBuku";

export default function KartuBuku({ buku }) {
  return (
    <li className="group reveal rounded-2xl border border-transparent p-3.5 transition-all duration-300 hover:border-line/70 hover:bg-white/80 hover:shadow-[0_20px_40px_-16px_rgba(26,26,24,0.12)]">
      <Link
        href={`/katalog/${buku.id}`}
        tabIndex={-1}
        aria-hidden="true"
        className="buku-wadah block"
      >
        <div className="buku-3d-kartu">
          <div className="buku-halaman-belakang" aria-hidden="true">
            <div className="tepi-kertas" />
            <div className="halaman-intip">
              <span className="font-mono text-[8px] uppercase tracking-wider text-muted/70">
                Pustaka Senja
              </span>
              <p className="mt-1 font-serif text-[11px] font-semibold leading-tight text-ink line-clamp-2">
                {buku.judul}
              </p>
              <p className="mt-0.5 font-mono text-[9px] text-muted line-clamp-1">
                {buku.penulis}
              </p>
              <div className="my-1.5 h-px w-6 bg-aksen/40" />
              <p className="font-serif text-[9px] italic leading-relaxed text-muted/90 line-clamp-4">
                “{buku.sinopsis || "Sentuh atau buka untuk membaca sinopsis selengkapnya."}”
              </p>
            </div>
            <div className="pita-penanda" />
          </div>

          <div className="buku-sampul-depan">
            <CoverBuku buku={buku} />
            <div className="kilau-sampul" />
          </div>
        </div>
      </Link>

      <div className="mt-5 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="font-serif text-lg leading-snug line-clamp-1">
            <Link
              href={`/katalog/${buku.id}`}
              className="text-ink transition-colors hover:text-aksen"
            >
              {buku.judul}
            </Link>
          </h2>
          <p className="mt-1 text-sm text-muted line-clamp-1">{buku.penulis}</p>
        </div>
        <StatusBuku tersedia={buku.tersedia} />
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-line/60 pt-3 text-xs">
        <span className="label text-[10px]">
          {buku.kategori} · {buku.tahun}
        </span>
        <Link
          href={`/katalog/${buku.id}`}
          className="group/btn inline-flex items-center gap-1 font-medium text-ink transition-colors hover:text-aksen"
        >
          <span>Buka Buku</span>
          <span className="transition-transform duration-200 group-hover/btn:translate-x-1">→</span>
        </Link>
      </div>
    </li>
  );
}
