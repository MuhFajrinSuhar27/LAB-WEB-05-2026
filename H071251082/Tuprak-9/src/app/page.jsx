import Link from "next/link";
import { getStatistik, getDaftarBuku } from "@/lib/queries";
import { denganSampul } from "@/lib/sampul";
import CoverBuku from "@/components/CoverBuku";
import StatusBuku from "@/components/StatusBuku";

export const dynamic = "force-dynamic";

export default async function Beranda() {
  const [stat, semua] = await Promise.all([getStatistik(), getDaftarBuku()]);
  const daftar = await denganSampul(semua.slice(0, 8));
  const kipas = daftar.slice(0, 3);

  const judul = semua.map((b) => b.judul);
  const salinan = judul.length ? Math.ceil(12 / judul.length) * 2 : 0;
  const pita = Array.from({ length: salinan }, () => judul).flat();

  const angka = [
    { nilai: stat.total, label: "Total koleksi", bagian: 1 },
    { nilai: stat.tersedia, label: "Tersedia", bagian: stat.total ? stat.tersedia / stat.total : 0 },
    { nilai: stat.dipinjam, label: "Sedang dipinjam", bagian: stat.total ? stat.dipinjam / stat.total : 0 },
  ];

  const posisi = [
    "left-[2%] top-[16%] w-[46%] -rotate-[9deg]",
    "left-[27%] top-[2%] w-[46%] z-10",
    "right-0 top-[19%] w-[46%] rotate-[9deg]",
  ];

  return (
    <>
      <section className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pb-24 pt-16 lg:grid-cols-[1.15fr_1fr] lg:pt-24">
        <div>
          <p className="label masuk flex items-center gap-3">
            <span className="h-px w-8 bg-aksen" aria-hidden="true" />
            Ruang Baca · Makassar
          </p>
          <h1 className="display masuk mt-8 text-[clamp(3.5rem,8.2vw,7.5rem)] [animation-delay:80ms]">
            Baca pelan,
            <br />
            selagi <span className="stabilo italic">senja.</span>
          </h1>
          <p className="masuk mt-8 max-w-md text-lg leading-relaxed text-muted [animation-delay:180ms]">
            Koleksi kecil yang dirawat dengan sabar. Telusuri katalog, temukan
            sampul yang memanggil, dan kelola semua bukunya langsung dari sini.
          </p>
          <div className="masuk mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 [animation-delay:280ms]">
            <Link href="/katalog" className="btn">
              Buka katalog <span className="panah">→</span>
            </Link>
            <Link href="/katalog/tambah" className="tautan text-sm font-medium hover:text-aksen">
              Tambah buku
            </Link>
          </div>
        </div>

        <div className="relative mx-auto aspect-[5/6] w-full max-w-md">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[6%] aspect-square w-[88%] -translate-x-1/2 rounded-full bg-gradient-to-tr from-sorot/70 via-sorot/40 to-transparent blur-xl"
          />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[6%] aspect-square w-[84%] -translate-x-1/2 scale-[1.12] rounded-full border border-ink/15"
          />
          {kipas.map((b, i) => (
            <Link
              key={b.id}
              href={`/katalog/${b.id}`}
              className={`terbit absolute transition-all duration-500 hover:z-20 hover:-translate-y-5 hover:rotate-0 hover:scale-105 ${posisi[i]}`}
              style={{ animationDelay: `${300 + i * 150}ms` }}
              aria-label={`Lihat detail ${b.judul}`}
            >
              <div className="relative transition-all duration-500 [filter:drop-shadow(0_16px_28px_rgba(0,0,0,0.3))] hover:[filter:drop-shadow(0_24px_38px_rgba(45,90,75,0.4))]">
                <CoverBuku buku={b} />
              </div>
            </Link>
          ))}

          <svg
            viewBox="0 0 120 120"
            className="putar absolute -bottom-2 -left-2 h-28 w-28 text-ink sm:-left-8"
            aria-hidden="true"
          >
            <defs>
              <path id="lingkar" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
            </defs>
            <text
              fontSize="8"
              fill="currentColor"
              className="font-mono uppercase"
              textLength="272"
              lengthAdjust="spacing"
            >
              <textPath href="#lingkar">Baca pelan · Pinjam bebas · Rawat bersama · </textPath>
            </text>
            <circle cx="60" cy="60" r="5" fill="var(--color-aksen)" />
          </svg>
        </div>
      </section>

      {pita.length > 0 && (
        <div className="overflow-hidden bg-ink py-5 text-paper shadow-inner" aria-hidden="true">
          <div className="marquee flex w-max items-center gap-10 whitespace-nowrap pr-10 font-serif text-2xl sm:text-3xl">
            {pita.map((t, i) => (
              <span key={i} className="flex items-center gap-10">
                {t}
                <span className="h-2 w-2 rounded-full bg-sorot" />
              </span>
            ))}
          </div>
        </div>
      )}

      <section aria-label="Statistik koleksi" className="border-b border-line/80 py-10 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {angka.map((a) => (
              <div
                key={a.label}
                className="reveal group rounded-3xl border border-line/70 bg-white/70 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-aksen/50 hover:bg-white hover:shadow-[0_18px_36px_-12px_rgba(45,90,75,0.16)] sm:p-10"
              >
                <dd className="display text-[clamp(3.8rem,7.5vw,5.5rem)] tabular-nums text-ink transition-colors group-hover:text-aksen">
                  {a.nilai}
                </dd>
                <dt className="label mt-3 font-semibold tracking-wider text-muted group-hover:text-ink">
                  {a.label}
                </dt>
                <div
                  className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-line/60"
                  aria-hidden="true"
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-aksen to-sorot transition-all duration-1000"
                    style={{ width: `${Math.max(a.bagian * 100, 6)}%` }}
                  />
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-24 sm:pt-28">
        <div className="reveal flex items-end justify-between gap-6">
          <div>
            <p className="label flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-aksen" />
              01 — Rak depan
            </p>
            <h2 className="display mt-3 text-[clamp(2.5rem,5vw,4rem)]">Yang sedang dibaca</h2>
          </div>
          <Link href="/katalog" className="tautan shrink-0 text-sm font-medium hover:text-aksen">
            Semua koleksi →
          </Link>
        </div>

        {daftar.length === 0 ? (
          <p className="mt-12 text-muted">Belum ada buku di koleksi.</p>
        ) : (
          <ul className="rak -mx-6 mt-12 flex gap-7 overflow-x-auto px-6 pb-12 pt-4">
            {daftar.map((b) => (
              <li
                key={b.id}
                className="group w-48 shrink-0 rounded-2xl border border-transparent p-3 transition-all duration-300 hover:border-line/70 hover:bg-white/80 hover:shadow-[0_20px_40px_-16px_rgba(26,26,24,0.12)] sm:w-56"
              >
                <Link
                  href={`/katalog/${b.id}`}
                  className="buku-wadah block"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <div className="buku-3d-kartu">
                    <div className="buku-halaman-belakang" aria-hidden="true">
                      <div className="tepi-kertas" />
                      <div className="halaman-intip">
                        <span className="font-mono text-[8px] uppercase tracking-wider text-muted/70">
                          Pustaka Senja
                        </span>
                        <p className="mt-1 font-serif text-[11px] font-semibold leading-tight text-ink line-clamp-2">
                          {b.judul}
                        </p>
                        <p className="mt-0.5 font-mono text-[9px] text-muted line-clamp-1">
                          {b.penulis}
                        </p>
                        <div className="my-1.5 h-px w-6 bg-aksen/40" />
                        <p className="font-serif text-[9px] italic leading-relaxed text-muted/90 line-clamp-4">
                          “{b.sinopsis}”
                        </p>
                      </div>
                      <div className="pita-penanda" />
                    </div>
                    <div className="buku-sampul-depan">
                      <CoverBuku buku={b} />
                      <div className="kilau-sampul" />
                    </div>
                  </div>
                </Link>
                <div className="mt-5 space-y-2">
                  <p className="font-serif text-lg leading-snug line-clamp-1">
                    <Link href={`/katalog/${b.id}`} className="hover:text-aksen transition-colors">
                      {b.judul}
                    </Link>
                  </p>
                  <StatusBuku tersedia={b.tersedia} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="reveal mx-auto mt-24 max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-16 text-paper shadow-[0_24px_50px_-20px_rgba(26,26,24,0.4)] sm:px-16 sm:py-24">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gradient-to-br from-aksen to-aksen-deep opacity-80 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="absolute -right-6 -top-6 h-80 w-80 rounded-full border border-paper/20"
          />
          <p className="label relative text-paper/70">02 — Koleksi bersama</p>
          <p className="display relative mt-6 max-w-3xl text-[clamp(2.25rem,5vw,4rem)]">
            Punya buku yang layak singgah di rak ini?
          </p>
          <div className="relative mt-12 flex flex-wrap items-center gap-x-9 gap-y-5">
            <Link href="/katalog/tambah" className="btn btn-terang">
              Tambahkan ke koleksi <span className="panah">→</span>
            </Link>
            <Link href="/usulan" className="tautan text-sm text-paper/85 hover:text-sorot">
              atau usulkan judulnya
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
