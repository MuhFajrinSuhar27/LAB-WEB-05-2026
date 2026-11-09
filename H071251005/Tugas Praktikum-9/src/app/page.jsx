import Hero from "@/components/Hero";
import Link from "next/link";
import { ambilStatistikBuku } from "@/lib/buku";
import { connection } from "next/server";





export default async function BerandaPage() {
  await connection();
  const hasilStatistik = await ambilStatistikBuku();
  const totalBuku = hasilStatistik.total_buku;
  const bukuTersedia = hasilStatistik.buku_tersedia;
  const bukuDipinjam = hasilStatistik.buku_dipinjam;

  
  const statistik = [
    { label: "Total koleksi buku", jumlah: totalBuku,    catatan: "Judul dalam katalog" },
    { label: "Buku tersedia",      jumlah: bukuTersedia, catatan: "Siap dibaca pengunjung" },
    { label: "Buku dipinjam",      jumlah: bukuDipinjam, catatan: "Sedang berada di luar rak" },
  ];

  return (
    <div className="space-y-16">
      <Hero
        namaRuangBaca="Pustaka Senja"
        slogan="Tempat yang tenang untuk menemukan gagasan baru, menjelajahi cerita, dan memberi ruang bagi rasa ingin tahu."
        lokasi="Dekat area kampus"
        jamBuka="Senin–Sabtu, 09.00–20.00"
      />


      <section aria-labelledby="statistik-heading">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a27b4d]">Sekilas koleksi</p>
            <h2 id="statistik-heading" className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#29382f] sm:text-4xl">Cerita yang menunggu ditemukan.</h2>
          </div>
          <Link href="/katalog" className="w-fit text-sm font-semibold text-[#526b59] underline decoration-[#bdc9b9] underline-offset-4 transition hover:text-[#27382f]">Lihat seluruh koleksi →</Link>
        </div>


        <div className="grid gap-4 md:grid-cols-3">
          {statistik.map((item, index) => (
            <article key={item.label} className={`rounded-3xl border p-6 ${index === 0 ? "border-[#27382f] bg-[#27382f] text-white" : "border-[#e9e2d7] bg-white text-[#29382f]"}`}>
              <div className="flex items-center justify-between">
                <p className={`text-sm font-medium ${index === 0 ? "text-white/70" : "text-[#847969]"}`}>{item.label}</p>
                <span className={`flex h-9 w-9 items-center justify-center rounded-xl text-lg ${index === 0 ? "bg-white/10 text-[#e8c99b]" : "bg-[#f3eee6] text-[#98764d]"}`} aria-hidden="true">
                  {index === 0 ? "▤" : index === 1 ? "✓" : "↗"}
                </span>
              </div>
              <p className="mt-5 font-serif text-5xl font-semibold tracking-tight">{item.jumlah}</p>
              <p className={`mt-2 text-xs ${index === 0 ? "text-white/55" : "text-[#9a8f80]"}`}>{item.catatan}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 rounded-[2rem] border border-[#e9e2d7] bg-[#f3eee6] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a27b4d]">Bantu kami bertumbuh</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-[#29382f] sm:text-4xl">Buku apa yang ingin kamu temukan di rak berikutnya?</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-[#776d60]">Pustaka Senja tumbuh bersama pembacanya. Kirimkan judul buku dan alasanmu, lalu jadikan koleksi ruang baca ini semakin beragam.</p>
        </div>
        <Link href="/usulan" className="inline-flex w-fit items-center justify-center gap-3 rounded-full bg-[#b97950] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#9f623d]">
          Kirim usulan buku <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </div>
  );
}
