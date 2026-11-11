import Link from "next/link";
import dataBuku from "@/data/dataBuku";

export function generateStaticParams() {
  return dataBuku.map((buku) => ({ id: buku.id }));
}

export default async function DetailBukuPage({ params }) {
  const { id } = await params;
  const buku = dataBuku.find((item) => item.id === id);

  if (!buku) {
    return (
      <div className="max-w-sm mx-auto mt-10 bg-white rounded-2xl shadow-xl overflow-hidden text-center">
        <div className="bg-red-600 py-5 text-6xl">⚠️</div>
        <div className="p-6">
          <h1 className="text-2xl font-medium text-stone-800 mb-6">Buku dengan ID &quot;{id}&quot; tidak ditemukan!</h1>
          <Link href="/katalog" className="inline-block bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-6 py-2 rounded-full">
            Kembali ke Katalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-2xl mx-auto bg-custom-soft-pink border border-slate-800 rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-end gap-3 mb-3">
        <span className="text-xs bg-white text-custom-maroon px-3 py-1 rounded-full font-medium">
          {buku.kategori}
        </span>
        <span
          className={
            buku.tersedia
              ? "text-xs bg-custom-sage text-white px-3 py-1 rounded-full"
              : "text-xs bg-custom-red text-white px-3 py-1 rounded-full"
          }
        >
          {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 bg-custom-soft-pink rounded-2xl p-4 mb-6">
        <div>
          <img
            src={buku.cover}
            alt={`Sampul depan ${buku.judul}`}
            className="w-full aspect-square object-cover"
          />
          <p className="text-center text-xs text-stone-800 mt-2">Tampak Depan Buku</p>
        </div>
        <div>
          <img
            src={buku.belakang}
            alt={`Sampul belakang ${buku.judul}`}
            className="w-full aspect-square object-cover"
          />
          <p className="text-center text-xs text-stone-800 mt-2">Tampak Belakang Buku</p>
        </div>
      </div>
      <h1 className="text-3xl text-custom-maroon font-bold">{buku.judul}</h1>
      <p className="text-stone-800 mt-1 mb-1">Karya {buku.penulis}</p>
      <p className="text-stone-800 mt-1 mb-4">Terbit {buku.tahun}</p>
      <h2 className="text-lg font-semibold text-stone-700 mb-1">Sinopsis:</h2>
      <p className="text-stone-800 leading-relaxed mb-6">{buku.sinopsis}</p>
      <Link
        href="/katalog"
        className="inline-block bg-pink-600 hover:bg-pink-700 text-sm text-white px-4 py-2 rounded-lg transition"
      >
        &larr; Kembali ke Katalog
      </Link>
    </article>
  );
}
