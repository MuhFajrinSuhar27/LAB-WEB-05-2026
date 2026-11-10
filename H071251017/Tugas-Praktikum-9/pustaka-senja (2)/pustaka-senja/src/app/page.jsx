import Link from "next/link";
import Hero from "@/components/Hero";
import { getStatistik } from "@/lib/buku";

// Statistik dihitung dari PostgreSQL pada setiap permintaan.
export const dynamic = "force-dynamic";

export default async function Beranda() {
  const { total, tersedia, dipinjam } = await getStatistik();

  const statistik = [
    { label: "Total Koleksi Buku", nilai: total },
    { label: "Buku Tersedia", nilai: tersedia },
    { label: "Buku Dipinjam", nilai: dipinjam },
  ];

  return (
    <>
      <Hero
        nama="Pustaka Senja"
        slogan="Ruang baca tenang di dekat kampus. Pinjam buku, temukan bacaan baru, dan usulkan judul yang ingin kamu baca bersama."
        lokasi="Dekat kampus, Makassar"
        jamBuka="Senin–Sabtu, 10.00–20.00"
      />

      <section className="mx-auto max-w-5xl px-5 py-12">
        <h2 className="text-2xl font-bold text-indigo-950">Koleksi kami saat ini</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {statistik.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-indigo-100 bg-white p-6 shadow-sm"
            >
              <p className="text-4xl font-bold text-indigo-900">{item.nilai}</p>
              <p className="mt-1 text-sm text-slate-600">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/katalog"
            className="rounded-md bg-indigo-950 px-5 py-3 font-medium text-white hover:bg-indigo-800"
          >
            Lihat Katalog Buku
          </Link>
          <Link
            href="/usulan"
            className="rounded-md border border-indigo-950 px-5 py-3 font-medium text-indigo-950 hover:bg-indigo-100"
          >
            Usulkan Buku
          </Link>
        </div>
      </section>
    </>
  );
}
