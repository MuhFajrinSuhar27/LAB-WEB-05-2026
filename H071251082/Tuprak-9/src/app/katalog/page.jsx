import Link from "next/link";
import { getDaftarBuku, getKategoriDenganJumlah } from "@/lib/queries";
import KartuBuku from "@/components/KartuBuku";
import PencarianBuku from "@/components/PencarianBuku";
import { denganSampul } from "@/lib/sampul";

export const dynamic = "force-dynamic";
export const metadata = { title: "Katalog" };

function href({ q, kategori }) {
  const p = new URLSearchParams();
  if (q) p.set("q", q);
  if (kategori) p.set("kategori", kategori);
  const s = p.toString();
  return s ? `/katalog?${s}` : "/katalog";
}

export default async function Katalog({ searchParams }) {
  const sp = await searchParams;
  const q = typeof sp?.q === "string" ? sp.q.trim().slice(0, 100) : "";
  const kategori = typeof sp?.kategori === "string" ? sp.kategori.trim() : "";

  const [hasil, kategoriList] = await Promise.all([
    getDaftarBuku({ q, kategori }),
    getKategoriDenganJumlah(),
  ]);
  const daftar = await denganSampul(hasil);

  const totalSemua = kategoriList.reduce((acc, curr) => acc + curr.jumlah, 0);
  const adaFilter = q !== "" || kategori !== "";

  return (
    <div className="mx-auto max-w-6xl px-6 pt-16">
      {/* HEADER */}
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="label">Katalog</p>
          <h1 className="display masuk mt-4 text-[clamp(3.25rem,8vw,6.5rem)]">
            Seluruh <span className="stabilo italic">koleksi</span>
          </h1>
        </div>
        <Link href="/katalog/tambah" className="btn">
          Tambah buku <span className="panah">+</span>
        </Link>
      </header>

      {/* BILAH SEBARIS (Single-Row Compact): Pencarian di Sisi Kiri, Kategori di Sisi Kanan */}
      <div className="sticky top-20 z-30 mt-10 rounded-2xl border border-line/80 bg-white/90 p-2.5 shadow-[0_16px_36px_-16px_rgba(26,26,24,0.08)] backdrop-blur-xl transition-all sm:rounded-full sm:px-4 sm:py-2">
        <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
          
          {/* SISI KIRI: Kolom Pencarian */}
          <div className="w-full lg:w-80 xl:w-96 shrink-0">
            <PencarianBuku initialQuery={q} kategori={kategori} />
          </div>

          {/* PEMISAH VERTIKAL (Hanya di layar desktop) */}
          <div className="hidden h-6 w-px bg-line/80 lg:block shrink-0 mx-1" aria-hidden="true" />

          {/* SISI KANAN: Filter Kategori (Pills dengan Badge Jumlah) */}
          <div
            className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 lg:flex-wrap lg:justify-end"
            role="group"
            aria-label="Filter kategori buku"
          >
            {/* Opsi: Semua */}
            <Link
              href={href({ q })}
              className={`group inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-medium transition-all duration-200 ${
                kategori === ""
                  ? "border-ink bg-ink text-paper shadow-xs"
                  : "border-line/70 bg-paper/60 text-muted hover:border-ink hover:bg-white hover:text-ink"
              }`}
            >
              <span>Semua</span>
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-mono tabular-nums leading-none transition-colors ${
                  kategori === ""
                    ? "bg-white/20 text-paper"
                    : "bg-black/5 text-muted group-hover:bg-black/10 group-hover:text-ink"
                }`}
              >
                {totalSemua}
              </span>
            </Link>

            {/* Opsi: Tiap Kategori */}
            {kategoriList.map((k) => {
              const aktif = kategori.toLowerCase() === k.kategori.toLowerCase();
              return (
                <Link
                  key={k.kategori}
                  href={href({ q, kategori: k.kategori })}
                  className={`group inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-medium transition-all duration-200 ${
                    aktif
                      ? "border-aksen bg-aksen text-paper shadow-xs"
                      : "border-line/70 bg-paper/60 text-muted hover:border-aksen hover:bg-white hover:text-ink"
                  }`}
                >
                  <span>{k.kategori}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-mono tabular-nums leading-none transition-colors ${
                      aktif
                        ? "bg-white/20 text-paper"
                        : "bg-black/5 text-muted group-hover:bg-aksen/15 group-hover:text-aksen"
                    }`}
                  >
                    {k.jumlah}
                  </span>
                </Link>
              );
            })}
          </div>

        </div>
      </div>

      {/* RINGKASAN FILTER & JUMLAH HASIL */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 px-2">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex items-center gap-2 rounded-full bg-paper-deep/70 px-3 py-1 text-xs">
            <span className="h-2 w-2 rounded-full bg-aksen" aria-hidden="true" />
            <span className="font-mono uppercase tracking-wider text-[11px] text-muted">Hasil:</span>
            <span className="font-semibold text-ink">{daftar.length} buku</span>
          </div>

          {q && (
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/90 px-3 py-1 text-xs text-ink shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <span className="text-muted">Cari:</span>
              <strong className="font-medium">“{q}”</strong>
              <Link
                href={href({ kategori })}
                className="ml-0.5 flex h-4 w-4 items-center justify-center rounded-full text-muted transition hover:bg-paper-deep hover:text-ink"
                title="Hapus pencarian kata kunci"
                aria-label="Hapus kata kunci"
              >
                ✕
              </Link>
            </span>
          )}

          {kategori && (
            <span className="inline-flex items-center gap-2 rounded-full border border-aksen/30 bg-aksen/10 px-3 py-1 text-xs text-aksen shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <span className="opacity-75">Kategori:</span>
              <strong className="font-medium">{kategori}</strong>
              <Link
                href={href({ q })}
                className="ml-0.5 flex h-4 w-4 items-center justify-center rounded-full text-aksen transition hover:bg-aksen/20"
                title="Hapus filter kategori"
                aria-label="Hapus filter kategori"
              >
                ✕
              </Link>
            </span>
          )}
        </div>

        {adaFilter && (
          <Link
            href="/katalog"
            className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-ink"
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Atur ulang semua filter
          </Link>
        )}
      </div>

      {/* DAFTAR BUKU / PESAN KOSONG */}
      {daftar.length === 0 ? (
        <div className="my-16 rounded-3xl border border-dashed border-line bg-white/40 p-12 text-center sm:p-20">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sorot/50 text-aksen">
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
          </div>
          <p className="display mt-6 text-3xl sm:text-4xl">Tidak ada buku yang cocok</p>
          <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">
            {q && kategori
              ? `Tidak ditemukan buku dengan kata kunci “${q}” pada kategori “${kategori}”.`
              : q
              ? `Tidak ditemukan buku yang cocok dengan kata kunci “${q}”.`
              : `Belum ada koleksi buku untuk kategori “${kategori}”.`}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {q && (
              <Link href={href({ kategori })} className="btn btn-terang text-xs">
                Hapus pencarian “{q}”
              </Link>
            )}
            {kategori && (
              <Link href={href({ q })} className="btn btn-terang text-xs">
                Cari di semua kategori
              </Link>
            )}
            <Link href="/katalog" className="btn text-xs">
              Kembali ke seluruh koleksi
            </Link>
          </div>
        </div>
      ) : (
        <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 lg:grid-cols-4">
          {daftar.map((b) => (
            <KartuBuku key={b.id} buku={b} />
          ))}
        </ul>
      )}
    </div>
  );
}
