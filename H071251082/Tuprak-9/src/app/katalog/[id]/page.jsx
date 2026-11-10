import Link from "next/link";
import { notFound } from "next/navigation";
import { getBukuById } from "@/lib/queries";
import { parseId } from "@/lib/util";
import { getSampul } from "@/lib/sampul";
import { paletDari } from "@/lib/palet";
import BukuDetail3D from "@/components/BukuDetail3D";
import StatusBuku from "@/components/StatusBuku";
import TombolHapus from "@/components/TombolHapus";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const idValid = parseId(id);
  const buku = idValid ? await getBukuById(idValid) : null;
  return { title: buku ? buku.judul : "Buku tidak ditemukan" };
}

export default async function DetailBuku({ params }) {
  const { id } = await params;
  const idValid = parseId(id);
  if (!idValid) notFound();

  const data = await getBukuById(idValid);
  if (!data) notFound();
  const buku = { ...data, sampul: await getSampul(data.judul, data.penulis) };

  const warna = paletDari(buku).bg;

  const meta = [
    { k: "Penulis", v: buku.penulis },
    { k: "Kategori", v: buku.kategori },
    { k: "Tahun terbit", v: buku.tahun },
  ];

  return (
    <article className="mx-auto max-w-6xl px-6 pt-12">
      {/* NAVIGASI REKAM JEJAK / KEMBALI */}
      <div className="flex items-center justify-between">
        <Link
          href="/katalog"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
          <span>Kembali ke katalog</span>
        </Link>

        <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-muted">
          <span>Koleksi</span>
          <span>/</span>
          <span className="text-aksen">{buku.kategori}</span>
        </div>
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-[24rem_1fr] lg:gap-16">
        {/* KOLOM KIRI: Buku 3D Interaktif */}
        <div
          className="masuk self-start rounded-3xl border border-line/70 p-6 sm:p-8 lg:sticky lg:top-28 shadow-[0_16px_36px_-16px_rgba(26,26,24,0.1)] backdrop-blur-md"
          style={{ background: `color-mix(in srgb, ${warna} 18%, var(--color-paper))` }}
        >
          <BukuDetail3D buku={buku} />
        </div>

        {/* KOLOM KANAN: Rincian Buku */}
        <div>
          <span className="label inline-block rounded-full bg-aksen/10 px-3 py-1 font-mono text-[10px] font-semibold text-aksen border border-aksen/20">
            {buku.kategori}
          </span>
          <h1 className="display masuk mt-5 text-[clamp(2.75rem,6vw,5rem)] text-ink">
            {buku.judul}
          </h1>
          <p className="mt-3 text-lg font-medium text-muted">{buku.penulis}</p>

          {/* KARTU METADATA MODERN */}
          <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {meta.map((m) => (
              <div
                key={m.k}
                className="rounded-2xl border border-line/70 bg-white/75 p-4 backdrop-blur-xs transition-all duration-200 hover:border-aksen/40 hover:bg-white hover:shadow-xs"
              >
                <dt className="label text-[10px] text-muted">{m.k}</dt>
                <dd className="mt-1.5 font-serif text-base font-medium text-ink">{m.v}</dd>
              </div>
            ))}
            <div className="rounded-2xl border border-line/70 bg-white/75 p-4 backdrop-blur-xs transition-all duration-200 hover:border-aksen/40 hover:bg-white hover:shadow-xs">
              <dt className="label text-[10px] text-muted">Status</dt>
              <dd className="mt-1.5">
                <StatusBuku tersedia={buku.tersedia} />
              </dd>
            </div>
          </dl>

          {/* SINOPSIS DENGAN KARTU EDITORIAL */}
          <div className="mt-10 rounded-3xl border border-line/70 bg-white/60 p-7 sm:p-9 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] backdrop-blur-sm">
            <h2 className="label flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-aksen" aria-hidden="true" />
              Sinopsis Lengkap
            </h2>
            <p className="mt-5 max-w-prose whitespace-pre-line font-serif text-xl leading-relaxed text-ink/90">
              {buku.sinopsis}
            </p>
          </div>

          {/* TINDAKAN / AKSI */}
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line/70 pt-8">
            <Link href={`/katalog/${buku.id}/edit`} className="btn">
              Edit buku <span className="panah">→</span>
            </Link>
            <TombolHapus id={buku.id} judul={buku.judul} />
          </div>
        </div>
      </div>
    </article>
  );
}
