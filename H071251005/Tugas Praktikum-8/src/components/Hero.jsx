import Link from "next/link";

export default function Hero({ namaRuangBaca, slogan, lokasi, jamBuka }) {
  return (
    <section className="relative isolate overflow-hidden rounded-[2rem] bg-[#27382f] px-6 py-10 text-[#fbf7ef] shadow-[0_24px_70px_-35px_rgba(39,56,47,0.65)] sm:px-10 sm:py-14 lg:px-14 lg:py-16">
      <div className="absolute -right-20 -top-28 -z-10 h-80 w-80 rounded-full border border-white/10" />
      <div className="absolute -right-8 -top-16 -z-10 h-64 w-64 rounded-full border border-white/10" />
      <div className="absolute -bottom-32 right-1/4 -z-10 h-72 w-72 rounded-full bg-[#d6a66b]/10 blur-3xl" />

      <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#e7cda8]/30 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e8c99b]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e8c99b]" />
            Ruang tumbuh bersama
          </span>
          <p className="mt-6 font-serif text-lg text-[#dfc9aa]">Selamat datang di</p>
          <h1 className="mt-1 font-serif text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {namaRuangBaca}<span className="text-[#dfb47b]">.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-[#e2e2d7] sm:text-lg">{slogan}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/katalog" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#e8c99b] px-6 py-3 text-sm font-semibold text-[#27382f] transition hover:-translate-y-0.5 hover:bg-[#f2d9b4]">
              Jelajahi katalog <span aria-hidden="true">→</span>
            </Link>
            <Link href="/usulan" className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              Usulkan buku
            </Link>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-6 text-sm text-[#d9d7cb] sm:flex-row sm:gap-8">
            <p><span className="mr-2 text-[#e8c99b]">⌖</span>{lokasi}</p>
            <p><span className="mr-2 text-[#e8c99b]">◷</span>{jamBuka}</p>
          </div>
        </div>

        <div className="relative mx-auto hidden h-[350px] w-full max-w-[410px] lg:block" aria-hidden="true">
          <div className="absolute left-10 top-12 h-64 w-44 rotate-[-10deg] rounded-lg bg-[#b96e48] p-4 shadow-2xl shadow-black/30">
            <div className="flex h-full flex-col justify-between border border-white/25 p-3">
              <span className="text-[9px] uppercase tracking-[0.22em] text-white/75">Catatan kecil</span>
              <span className="font-serif text-3xl font-semibold leading-tight text-white">Ruang<br/>untuk<br/>bertumbuh.</span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/70">Pustaka Senja</span>
            </div>
          </div>
          <div className="absolute right-8 top-2 h-72 w-48 rotate-[8deg] rounded-lg bg-[#d8bd91] p-4 shadow-2xl shadow-black/25">
            <div className="flex h-full flex-col justify-between border border-[#6d604b]/25 p-3">
              <span className="text-[9px] uppercase tracking-[0.22em] text-[#6d604b]">Edisi pilihan</span>
              <div>
                <div className="mb-3 h-1 w-12 bg-[#987750]" />
                <span className="font-serif text-4xl font-semibold leading-none text-[#334237]">Read<br/>slowly.</span>
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#6d604b]">Since 2026</span>
            </div>
          </div>
          <div className="absolute bottom-1 left-16 h-20 w-64 rounded-[50%] bg-black/20 blur-2xl" />
          <div className="absolute bottom-4 right-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-xs text-[#f5e8d3] shadow-lg backdrop-blur">
            <span className="block font-serif text-xl">Baca. Temukan.</span>
            <span className="mt-1 block text-[#d5c9b7]">Bagikan cerita.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
