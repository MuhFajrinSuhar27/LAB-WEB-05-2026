import Link from "next/link";
import pool from "@/lib/db";
import TombolHapus from "@/components/TombolHapus";

export const dynamic = "force-dynamic";

export default async function DetailBukuPage({ params }) {
  const { id } = await params;

  // Hanya angka yang boleh masuk query; ID lain dianggap tidak ditemukan
  let buku = null;
  if (/^\d{1,9}$/.test(id)) {
    const { rows } = await pool.query("SELECT * FROM buku WHERE id = $1", [id]);
    buku = rows[0];
  }

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
    <article className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center py-4">
      {/* Kiri: keterangan */}
      <div className="order-2 md:order-1">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xs bg-white text-custom-maroon px-3 py-1 rounded-full font-medium shadow-sm">
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
        <h1 className="text-4xl md:text-5xl text-custom-maroon font-bold leading-tight">{buku.judul}</h1>
        <p className="text-stone-800 text-lg mt-3">Karya {buku.penulis}</p>
        <p className="text-stone-800 mt-1 mb-5">Terbit {buku.tahun}</p>
        <h2 className="text-lg font-semibold text-stone-700 mb-1">Sinopsis:</h2>
        <p className="text-stone-800 leading-relaxed mb-8">{buku.sinopsis}</p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/katalog"
            className="inline-block bg-pink-600 hover:bg-pink-700 text-sm text-white px-4 py-2 rounded-lg transition"
          >
            &larr; Kembali ke Katalog
          </Link>
          <Link
            href={`/katalog/${buku.id}/edit`}
            className="inline-block bg-white hover:bg-pink-50 text-pink-900 text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition"
          >
            Edit
          </Link>
          <TombolHapus
            id={buku.id}
            judul={buku.judul}
            className="bg-custom-red hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
          />
        </div>
      </div>

      {/* Kanan: foto buku (slot tetap ada walau foto belum diunggah) */}
      <div className="order-1 md:order-2">
        <div className="relative mx-auto w-full max-w-md aspect-square">
          <figure className="absolute top-0 left-0 w-[68%] -rotate-3">
            {buku.cover ? (
              <img
                src={buku.cover}
                alt={`Sampul depan ${buku.judul}`}
                className="w-full aspect-square object-cover drop-shadow-2xl"
              />
            ) : (
              <div className="w-full aspect-square rounded-xl bg-white border-2 border-dashed border-stone-400 shadow-xl flex items-start justify-center text-center px-4 pt-10">
                <p className="text-sm text-stone-600">Belum ada foto yang diunggah</p>
              </div>
            )}
            <figcaption className="absolute -bottom-3 left-3 bg-white text-xs text-stone-800 font-medium px-3 py-1 rounded-full shadow-md">
              Tampak Depan
            </figcaption>
          </figure>
          <figure className="absolute bottom-0 right-0 w-[68%] rotate-3">
            {buku.belakang ? (
              <img
                src={buku.belakang}
                alt={`Sampul belakang ${buku.judul}`}
                className="w-full aspect-square object-cover drop-shadow-2xl"
              />
            ) : (
              <div className="w-full aspect-square rounded-xl bg-white border-2 border-dashed border-stone-400 shadow-xl flex items-center justify-center text-center p-4">
                <p className="text-sm text-stone-600">Belum ada foto yang diunggah</p>
              </div>
            )}
            <figcaption className="absolute -bottom-3 right-3 bg-white text-xs text-stone-800 font-medium px-3 py-1 rounded-full shadow-md">
              Tampak Belakang
            </figcaption>
          </figure>
        </div>
      </div>
    </article>
  );
}