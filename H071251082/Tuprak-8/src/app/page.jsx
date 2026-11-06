import Link from "next/link";
import Hero from "@/components/Hero";
import dataBuku from "@/data/dataBuku";

export default function HomePage() {
  const totalBuku = dataBuku.length;
  const bukuTersedia = dataBuku.filter((buku) => buku.tersedia).length;
  const bukuDipinjam = dataBuku.filter((buku) => !buku.tersedia).length;

  const statistik = [
    { label: "Total Koleksi Buku", nilai: totalBuku },
    { label: "Buku Tersedia", nilai: bukuTersedia },
    { label: "Buku Dipinjam", nilai: bukuDipinjam },
  ];

  return (
    <div className="space-y-8">
      <Hero
        nama="Pustaka Senja"
        slogan="Tempat tenang untuk membaca, berdiskusi, dan menemukan buku favorit berikutnya bersama komunitas kampus."
        lokasi="Dekat kampus, Makassar"
        jamBuka="Setiap hari, 10.00 – 20.00 WITA"
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {statistik.map((item) => (
          <div
            key={item.nilai}
            className="rounded-xl border border-slate-200 bg-white p-5 text-center"
          >
            <p className="text-3xl font-bold text-blue-600">{item.nilai}</p>
            <p className="mt-1 text-sm text-slate-500">{item.label}</p>
          </div>
        ))}
      </section>

      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <Link
          href="/katalog"
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-center font-medium text-white transition hover:bg-blue-700"
        >
          Jelajahi Katalog Buku
        </Link>
        <Link
          href="/usulan"
          className="rounded-lg border border-slate-300 px-5 py-2.5 text-center font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Usulkan Buku
        </Link>
      </div>
    </div>
  );
}
