import Link from "next/link";
import Hero from "@/components/Hero";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Beranda() {
  const result = await pool.query(`
    SELECT
      COUNT(*) AS total_buku,
      COUNT(*) FILTER (WHERE tersedia = TRUE) AS buku_tersedia,
      COUNT(*) FILTER (WHERE tersedia = FALSE) AS buku_dipinjam
    FROM buku
  `);

  const statistik = result.rows[0];

  const totalBuku = Number(statistik.total_buku);
  const bukuTersedia = Number(statistik.buku_tersedia);
  const bukuDipinjam = Number(statistik.buku_dipinjam);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">

      <Hero
        namaRuangBaca="Pustaka Senja"
        slogan="Temukan Cerita, Temukan Dunia"
        lokasi="Makassar, Indonesia"
      />

      {/* Statistik Perpustakaan */}
      <section className="mt-12">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-purple-900">
            Pustaka Senja dalam Angka
          </h2>

          <p className="mt-2 text-purple-600">
            Informasi koleksi buku yang tersedia di perpustakaan kami.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

          <div className="rounded-2xl bg-purple-100 p-6 text-center shadow-sm">
            <h3 className="text-4xl font-bold text-purple-800">
              {totalBuku}
            </h3>
            <p className="mt-2 text-purple-700">
              Total Koleksi Buku
            </p>
          </div>

          <div className="rounded-2xl bg-pink-100 p-6 text-center shadow-sm">
            <h3 className="text-4xl font-bold text-pink-700">
              {bukuTersedia}
            </h3>
            <p className="mt-2 text-pink-700">
              Buku Tersedia
            </p>
          </div>

          <div className="rounded-2xl bg-orange-100 p-6 text-center shadow-sm">
            <h3 className="text-4xl font-bold text-orange-700">
              {bukuDipinjam}
            </h3>
            <p className="mt-2 text-orange-700">
              Buku Dipinjam
            </p>
          </div>

        </div>
      </section>

      {/* Tentang Perpustakaan */}
      <section className="mt-14 rounded-3xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-purple-900">
          Selamat Datang di Pustaka Senja
        </h2>

        <p className="mt-4 leading-7 text-gray-600">
          Pustaka Senja merupakan perpustakaan digital yang
          menyediakan berbagai koleksi buku, mulai dari buku
          teknologi, fiksi, hingga pengembangan diri. Temukan
          bacaan favoritmu dan jelajahi dunia melalui setiap halaman.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/katalog"
            className="rounded-full bg-purple-500 px-6 py-3 font-medium text-white transition hover:bg-purple-600"
          >
            Jelajahi Katalog
          </Link>

          <Link
            href="/usulan"
            className="rounded-full border border-purple-300 px-6 py-3 font-medium text-purple-700 transition hover:bg-purple-50"
          >
            Usulkan Buku
          </Link>
        </div>
      </section>

    </div>
  );
}
