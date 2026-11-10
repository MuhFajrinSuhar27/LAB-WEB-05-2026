import Link from "next/link";
import dataBuku from "@/data/dataBuku";

export default async function DetailBukuPage({ params }) {
  const { id } = await params;
  const buku = dataBuku.find((item) => item.id === id);

  if (!buku) {
    return (
      <div className="py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold text-red-600">
          Buku dengan ID &quot;{id}&quot; tidak ditemukan!
        </h1>
        <Link
          href="/katalog"
          className="text-blue-600 hover:underline"
        >
          &larr; Kembali ke Katalog
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
          {buku.kategori}
        </span>
        <span
          className={
            buku.tersedia
              ? "rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700"
              : "rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600"
          }
        >
          {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
        </span>
      </div>

      <h1 className="text-3xl font-bold">{buku.judul}</h1>
      <p className="mt-1 text-slate-500">
        {buku.penulis} • Terbit {buku.tahun}
      </p>

      <h2 className="mb-2 mt-6 text-sm font-semibold uppercase tracking-wide text-slate-400">
        Sinopsis
      </h2>
      <p className="mb-6 leading-relaxed text-slate-600">{buku.sinopsis}</p>

      <Link
        href="/katalog"
        className="inline-block rounded-lg bg-slate-100 px-4 py-2 text-sm transition hover:bg-slate-200"
      >
        &larr; Kembali ke Katalog
      </Link>
    </article>
  );
}
