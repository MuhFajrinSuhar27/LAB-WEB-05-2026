export default function Hero() {
  return (
    <section id="beranda" className="overflow-hidden px-6 pb-20 pt-32 sm:pt-40">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-xl font-medium sm:text-2xl">Halo, saya</p>
          <h1 className="mt-2 font-display text-[clamp(3.25rem,11vw,7.5rem)] font-extrabold leading-[0.9] tracking-tighter">
            Syarif
            <br />
            Rahmatullah
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-ink/75">
            Mahasiswa di Makassar yang sedang belajar membangun website. Saya
            suka membuat tampilan yang rapi, cepat, dan nyaman dibuka di layar
            apa pun.
          </p>

          <button
            type="button"
            onClick={() => console.log('Terima kasih sudah mampir ke portofolio saya!')}
            className="mt-10 rounded-full border-2 border-ink bg-cobalt px-8 py-3.5 text-lg font-bold text-white shadow-[5px_5px_0_0_var(--color-ink)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-ink hover:shadow-[2px_2px_0_0_var(--color-marigold)] active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            Sapa saya
          </button>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-marigold sm:h-52 sm:w-52"
          />
          <div className="relative overflow-hidden rounded-t-full border-2 border-ink bg-sea shadow-[10px_10px_0_0_var(--color-ink)]">
            <img
              src="/Profil.jpeg"
              alt="Foto profil Syarif Rahmatullah"
              className="aspect-[3/4] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
