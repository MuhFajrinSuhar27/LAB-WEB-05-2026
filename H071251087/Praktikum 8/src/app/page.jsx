import Hero from "@/components/Hero";
import dataBuku from "@/data/dataBuku";

export default function BerandaPage() {
  const total = dataBuku.length;
  const tersedia = dataBuku.filter((buku) => buku.tersedia).length;
  const dipinjam = dataBuku.filter((buku) => !buku.tersedia).length;

  const statistik = [
    { label: "Total Koleksi Buku", nilai: total },
    { label: "Buku Tersedia", nilai: tersedia },
    { label: "Buku Dipinjam", nilai: dipinjam },
  ];

  return (
    <div className="space-y-8">
      <Hero
        nama="Pustaka Senja"
        slogan="Ruang baca dan perpustakaan komunitas yang nyaman di Prodi Sistem Informasi, di mana kamu dapat menemukan buku teknologi, fiksi, dan pengembangan diri."
        lokasi="📍Gedung PBT"
        jamBuka="📆 Senin - Jum'at (09.00 - 20.00)"
      />
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statistik.map((item) => (
          <div
            key={item.label}
            className="bg-custom-soft-pink border border-slate-800 rounded-xl p-6 text-center"
          >
            <p className="text-4xl font-bold text-custom-maroon">{item.nilai}</p>
            <p className="text-sm text-stone-800 mt-1">{item.label}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
