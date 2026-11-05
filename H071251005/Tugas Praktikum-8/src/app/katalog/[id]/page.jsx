import Link from "next/link";
import dataBuku from "@/data/dataBuku";

const gayaSampul = {
  "1": "from-[#263c35] via-[#426052] to-[#152820]",
  "2": "from-[#344b68] via-[#647d95] to-[#24384f]",
  "3": "from-[#a65f43] via-[#cb8a64] to-[#75412f]",
  "4": "from-[#6d3f46] via-[#a66b6c] to-[#482c37]",
  "5": "from-[#8e6b3e] via-[#c19b62] to-[#5e482d]",
  "6": "from-[#52415a] via-[#86708d] to-[#362c40]",
  "7": "from-[#9a7540] via-[#d0a85e] to-[#70512d]",
  "8": "from-[#294e5a] via-[#4b7b82] to-[#203a45]",
  "9": "from-[#3d5143] via-[#71846a] to-[#29392e]",
};

export default async function DetailBukuPage({ params }) {
  // Pada App Router versi baru, params diterima sebagai Promise.
  const { id } = await params;
  const buku = dataBuku.find((item) => item.id === id);

  if (!buku) {
    return (
      <section className="mx-auto max-w-2xl rounded-[2rem] border border-[#e9e2d7] bg-white px-6 py-16 text-center shadow-sm sm:px-10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f5eee5] font-serif text-3xl text-[#9a744d]">?</span>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#a27b4d]">Koleksi tidak ditemukan</p>
        <h1 className="mt-3 font-serif text-3xl font-semibold text-[#29382f]">Buku tidak ditemukan.</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#817666]">Maaf, buku dengan ID tersebut tidak tersedia di dalam katalog Pustaka Senja.</p>
        <Link href="/katalog" className="mt-7 inline-flex rounded-full bg-[#27382f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3c5547]">Kembali ke katalog</Link>
      </section>
    );
  }

  const warnaSampul = gayaSampul[buku.id] || "from-[#52645a] to-[#293b32]";

  return (
    <div className="space-y-8">
      <Link href="/katalog" className="inline-flex items-center gap-2 text-sm font-semibold text-[#6f796b] transition hover:text-[#27382f]">
        <span aria-hidden="true">←</span> Kembali ke katalog
      </Link>

      <article className="grid overflow-hidden rounded-[2rem] border border-[#e9e2d7] bg-white shadow-[0_18px_55px_-35px_rgba(53,45,34,0.28)] lg:grid-cols-[0.75fr_1.25fr]">
        <div className="flex min-h-[360px] items-center justify-center bg-[#eee8de] p-8 sm:p-12">
          <div className={`relative flex aspect-[3/4] w-full max-w-[270px] flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-br ${warnaSampul} p-7 shadow-2xl shadow-[#594d3b]/25`}>
            <div className="absolute -right-10 -top-12 h-44 w-44 rounded-full border border-white/20" />
            <div className="absolute -right-1 -top-3 h-32 w-32 rounded-full border border-white/15" />
            <p className="relative text-[10px] font-semibold uppercase tracking-[0.24em] text-white/65">Pustaka Senja · {buku.tahun}</p>
            <div className="relative">
              <div className="mb-4 h-1 w-12 bg-white/55" />
              <h1 className="font-serif text-4xl font-semibold leading-tight text-white">{buku.judul}</h1>
              <p className="mt-3 text-sm text-white/75">{buku.penulis}</p>
            </div>
            <p className="relative text-[9px] font-semibold uppercase tracking-[0.22em] text-white/60">Koleksi ruang baca</p>
          </div>
        </div>

        <div className="flex flex-col justify-center px-6 py-9 sm:px-10 sm:py-12 lg:px-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a27b4d]">Detail koleksi · Buku {buku.id}</p>
          <span className="mt-5 w-fit rounded-full bg-[#f3eee6] px-3 py-1.5 text-xs font-semibold text-[#746752]">{buku.kategori}</span>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight text-[#29382f] sm:text-5xl">{buku.judul}</h2>
          <p className="mt-3 text-base text-[#817666]">Oleh {buku.penulis}</p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-[#f7f4ee] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#968a78]">Tahun terbit</p>
              <p className="mt-2 font-serif text-2xl font-semibold text-[#29382f]">{buku.tahun}</p>
            </div>
            <div className="rounded-2xl bg-[#f7f4ee] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#968a78]">Ketersediaan</p>
              <p className={`mt-2 text-sm font-semibold ${buku.tersedia ? "text-[#397451]" : "text-[#a65d53]"}`}>{buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}</p>
            </div>
          </div>

          <div className="mt-9 border-t border-[#eee8df] pt-7">
            <h3 className="font-serif text-2xl font-semibold text-[#29382f]">Tentang buku ini</h3>
            <p className="mt-3 text-sm leading-8 text-[#71685c]">{buku.sinopsis}</p>
          </div>

          <Link href="/katalog" className="mt-9 inline-flex w-fit items-center justify-center rounded-full bg-[#27382f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3c5547]">Jelajahi buku lainnya</Link>
        </div>
      </article>
    </div>
  );
}
