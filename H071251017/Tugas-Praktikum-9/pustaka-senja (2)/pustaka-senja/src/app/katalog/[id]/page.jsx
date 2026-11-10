import Image from "next/image";
import Link from "next/link";
import TombolHapus from "@/components/TombolHapus";
import { getBukuById } from "@/lib/buku";

export const dynamic = "force-dynamic";

export default async function DetailBuku({ params }) {
  const { id } = await params;
  const buku = await getBukuById(id);

  if (!buku) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-16 text-center">
        <h1 className="text-2xl font-bold text-indigo-950">Buku tidak ditemukan</h1>
        <p className="mt-2 text-slate-600">
          Buku dengan id &quot;{id}&quot; tidak ada di katalog Pustaka Senja.
        </p>
        <Link
          href="/katalog"
          className="mt-6 inline-block rounded-md bg-indigo-950 px-5 py-3 font-medium text-white hover:bg-indigo-800"
        >
          Kembali ke Katalog
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-5 py-10">
      <Link href="/katalog" className="text-sm font-medium text-indigo-700 hover:underline">
        &larr; Kembali ke Katalog
      </Link>

      <article className="mt-4 rounded-xl border border-indigo-100 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row">
          {buku.gambar && (
            <Image
              src={buku.gambar}
              alt={`Sampul buku ${buku.judul}`}
              width={400}
              height={600}
              unoptimized
              className="h-60 w-40 shrink-0 rounded-md object-cover shadow-md"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold text-indigo-950">{buku.judul}</h1>
            <p className="mt-1 text-lg text-slate-600">{buku.penulis}</p>
          </div>
        </div>

        <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-slate-500">Kategori</dt>
            <dd className="font-medium">{buku.kategori}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Tahun terbit</dt>
            <dd className="font-medium">{buku.tahun}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Status</dt>
            <dd>
              <span
                className={
                  "rounded-full px-2.5 py-1 text-xs font-medium " +
                  (buku.tersedia ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800")
                }
              >
                {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
              </span>
            </dd>
          </div>
        </dl>

        <h2 className="mt-8 text-lg font-semibold text-indigo-950">Sinopsis</h2>
        <p className="mt-2 max-w-prose leading-relaxed text-slate-700">{buku.sinopsis}</p>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <Link
            href="/katalog"
            className="rounded-md bg-indigo-950 px-5 py-2.5 font-medium text-white hover:bg-indigo-800"
          >
            Kembali ke Katalog
          </Link>
          <Link
            href={`/katalog/${buku.id}/edit`}
            className="rounded-md border border-indigo-300 px-5 py-2.5 font-medium text-indigo-900 hover:bg-indigo-50"
          >
            Edit
          </Link>
          <TombolHapus id={buku.id} judul={buku.judul} kembaliKeKatalog />
        </div>
      </article>
    </section>
  );
}
