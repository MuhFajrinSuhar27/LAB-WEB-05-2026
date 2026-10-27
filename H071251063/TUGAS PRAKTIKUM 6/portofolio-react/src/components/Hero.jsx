const sapaan = 'Halo, saya Puti Amelia Azzahra'
const deskripsi =
  'Mahasiswa Sistem Informasi Universitas Hasanuddin yang senang membangun tampilan web yang rapi dan responsif.'
const linkInstagram = 'https://www.instagram.com/ameliaazzahra._?utm_source=ig_web_button_share_sheet&psln=ZDNlZDc0MzIxNw=='
function Hero() {
  return (
    <section id="beranda" className="relative scroll-mt-20 overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id="bentuk-hati" clipPathUnits="objectBoundingBox">
            <path d="M0.5,1 C0.15,0.72 0,0.55 0,0.3 C0,0.12 0.13,0 0.28,0 C0.38,0 0.46,0.05 0.5,0.15 C0.54,0.05 0.62,0 0.72,0 C0.87,0 1,0.12 1,0.3 C1,0.55 0.85,0.72 0.5,1 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-pink-300/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-rose-300/40 blur-3xl" />

      <div className="relative mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 md:flex-row md:justify-between">
        <div className="text-center md:max-w-xl md:text-left">
          <p className="mb-4 inline-block rounded-full bg-pink-100 px-4 py-1 text-xs font-semibold tracking-wider text-pink-600 uppercase">
            Portofolio Amelia
          </p>
          <h1 className="text-3xl leading-tight font-extrabold text-pink-950 sm:text-5xl">
            {sapaan}
          </h1>
          <p className="mt-4 text-base text-slate-700 sm:text-lg">{deskripsi}</p>

        <button
            type="button"
            onClick={() => {
                console.log('Terima kasih sudah berkunjung!')
                window.open(linkInstagram, '_blank', 'noopener,noreferrer')
            }}
            className="mt-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-300 transition hover:scale-105 focus:ring-2 focus:ring-pink-300 focus:outline-none"
        >
            Kenalan Yuk
        </button>
        </div>

        <div className="drop-shadow-[0_10px_25px_rgba(236,72,153,0.45)]">
          <img
            src="profile.jpg"
            alt="Foto profil Puti Amelia Azzahra"
            style={{ clipPath: 'url(#bentuk-hati)' }}
            className="h-64 w-64 object-cover sm:h-80 sm:w-80"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero