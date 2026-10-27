export default function Hero() {
  return (
    <section id="home" className="relative scroll-mt-32 overflow-hidden px-5 pb-20 pt-44 sm:px-8 sm:pb-28 sm:pt-48">
      <div className="hero-orb absolute -right-28 top-32 h-80 w-80 rounded-full" aria-hidden="true" />
      <div className="hero-orb hero-orb-warm absolute -bottom-20 -left-24 h-72 w-72 rounded-full" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-10 lg:gap-16">
        <div className="relative z-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/85 px-4 py-2 text-xs font-bold text-indigo-700 shadow-sm sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Portofolio pribadi · 2026
          </p>
          <p className="section-kicker mt-8">Halo, selamat datang!</p>
          <h1 className="mt-3 max-w-2xl text-5xl font-black leading-[1.04] tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-7xl">
            Saya <span className="text-gradient">Mukhsin.</span>
          </h1>
          <p className="mt-5 text-xl font-bold tracking-tight text-slate-700 sm:text-2xl">Mahasiswa Sistem Informasi</p>
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            Saya sedang belajar membangun pengalaman digital yang bermanfaat melalui pengembangan web, pemecahan masalah, dan eksplorasi teknologi. Saya percaya kemampuan tumbuh dari rasa ingin tahu dan latihan yang konsisten.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => console.log('Tombol perkenalan diklik')}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-slate-900/10 transition duration-200 hover:-translate-y-1 hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
            >
              Kenali Saya <span aria-hidden="true">↗</span>
            </button>
            <a href="#gallery" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/85 px-5 py-3.5 text-sm font-extrabold text-slate-800 transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:bg-indigo-50">
              Lihat Galeri <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="mt-9 flex flex-wrap gap-2 text-xs font-semibold text-slate-600 sm:text-sm">
            <span className="rounded-full border border-slate-200 bg-white/80 px-3.5 py-2">Web Development</span>
            <span className="rounded-full border border-slate-200 bg-white/80 px-3.5 py-2">Problem Solving</span>
            <span className="rounded-full border border-slate-200 bg-white/80 px-3.5 py-2">Lifelong Learning</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-5 rounded-[2.5rem] bg-indigo-200/50 blur-2xl" aria-hidden="true" />
          <div className="relative rounded-[2.25rem] border border-white bg-white/80 p-3 shadow-[0_28px_85px_rgba(50,45,105,0.16)] backdrop-blur-sm sm:p-5">
            <div className="rounded-[1.75rem] border border-indigo-50 bg-gradient-to-br from-indigo-50 via-white to-rose-50 p-5 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-600">Digital Journey</span>
                <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-emerald-700 shadow-sm">Terus belajar</span>
              </div>
              <div className="mx-auto my-6 grid aspect-square max-w-[290px] place-items-center overflow-hidden rounded-[1.6rem] border border-white bg-white p-3 shadow-inner sm:my-8 sm:p-5">
                <img src="/foto-profil.jpg" alt="Ilustrasi profil pilihan Mukhsin" className="h-full w-full object-contain" fetchPriority="high" />
              </div>
              <div className="rounded-2xl bg-slate-950 p-4 text-white sm:p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-200">Prinsip saya</p>
                <p className="mt-2 text-lg font-extrabold tracking-tight sm:text-xl">Belajar. Mencoba. Bertumbuh.</p>
                <p className="mt-1 text-xs leading-5 text-slate-300 sm:text-sm">Setiap proyek adalah kesempatan untuk menjadi lebih baik.</p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -left-2 hidden rounded-2xl border border-white bg-white px-4 py-3 shadow-lg sm:block">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sedang dieksplorasi</p>
            <p className="mt-1 text-sm font-extrabold text-indigo-700">React + Tailwind CSS</p>
          </div>
        </div>
      </div>
    </section>
  )
}
