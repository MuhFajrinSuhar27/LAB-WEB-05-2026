
import HapusBukuButton from "@/components/HapusBukuButton";
import Link from "next/link";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function DetailBuku({ params }) {
  const { id } = await params;

  const result = await pool.query(
    "SELECT * FROM buku WHERE id = $1",
    [id]
  );

  const buku = result.rows[0];

  if (!buku) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-purple-900">
          Buku Tidak Ditemukan
        </h1>

        <p className="mt-3 text-purple-600">
          Maaf, buku yang kamu cari tidak tersedia.
        </p>

        <Link
          href="/katalog"
          className="mt-6 inline-block rounded-full bg-purple-500 px-6 py-3 text-white hover:bg-purple-600"
        >
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const gambarDepan =
    buku.gambar || `/images/SampulDepan${id}.jpg`;

  const gambarBelakang = buku.gambar_belakang;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">

      <Link
        href="/katalog"
        className="text-sm font-medium text-purple-600 hover:text-pink-500"
      >
        ← Kembali ke Katalog
      </Link>

      <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2">

        {/* Gambar Sampul */}
        <div className="rounded-3xl bg-purple-50 p-6">
          <h2 className="mb-5 text-center text-xl font-bold text-purple-900">
            Sampul Buku
          </h2>

          <div className="grid grid-cols-2 gap-4">

            {/* Sampul Depan */}
            <div>
              <p className="mb-3 text-center text-sm text-purple-700">
                Sampul Depan
              </p>

              {gambarDepan ? (
                <img
                  src={gambarDepan}
                  alt={`Sampul depan ${buku.judul}`}
                  className="w-full rounded-xl shadow-md"
                />
              ) : (
                <div className="flex aspect-[2/3] items-center justify-center rounded-xl border-2 border-dashed border-purple-200 bg-white p-4 text-center text-sm text-purple-400">
                  Sampul depan belum tersedia
                </div>
              )}
            </div>

            {/* Sampul Belakang */}
            <div>
              <p className="mb-3 text-center text-sm text-purple-700">
                Sampul Belakang
              </p>

              {gambarBelakang ? (
                <img
                  src={gambarBelakang}
                  alt={`Sampul belakang ${buku.judul}`}
                  className="w-full rounded-xl shadow-md"
                />
              ) : (
                <div className="flex aspect-[2/3] items-center justify-center rounded-xl border-2 border-dashed border-purple-200 bg-white p-4 text-center text-sm text-purple-400">
                  Sampul belakang belum tersedia
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Informasi Buku */}
        <div className="py-4">

          <span className="rounded-full bg-pink-100 px-4 py-2 text-sm font-medium text-pink-700">
            {buku.kategori}
          </span>

          <h1 className="mt-5 text-3xl font-bold text-purple-900">
            {buku.judul}
          </h1>

          <p className="mt-3 text-lg text-purple-600">
            Oleh {buku.penulis}
          </p>

          <div className="mt-8 space-y-4 rounded-2xl bg-white p-6 shadow-sm">

            <div className="flex justify-between">
              <span className="text-gray-500">Tahun Terbit</span>
              <span className="font-semibold text-purple-900">
                {buku.tahun}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Status</span>
              <span
                className={`font-semibold ${
                  buku.tersedia
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {buku.tersedia ? "Tersedia" : "Dipinjam"}
              </span>
            </div>

          </div>

          {/* Sinopsis */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-purple-900">
              Sinopsis Buku
            </h2>

            <p className="mt-3 leading-8 text-gray-600">
              {buku.sinopsis}
            </p>
          </div>

          {/* Tombol Edit dan Hapus */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/katalog/${buku.id}/edit`}
              className="inline-block rounded-full bg-purple-500 px-7 py-3 font-medium text-white shadow-md shadow-purple-200 transition hover:bg-purple-600"
            >
              Edit Buku
            </Link>

            <HapusBukuButton id={buku.id} />
          </div>

        </div>
      </div>
    </div>
  );
}
