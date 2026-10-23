const sapaan = 'Halo, saya Teguh Paniro Silitonga.'
const deskripsi =
  'Mahasiswa Sistem Informasi yang senang membangun antarmuka web yang rapi, cepat, dan nyaman dipakai di layar apa pun.'

function Hero() {
  const handleKlik = () => {
    console.log('Tombol "Lihat Profil Saya" diklik. Selamat datang di portofolio saya!')
  }

  return (
    <section id="beranda" className="mx-auto grid max-w-5xl items-center gap-10 px-6 py-16 md:grid-cols-[1.2fr_1fr] md:py-24">
      <div className="order-2 md:order-1">
        <h1 className="font-display text-4xl leading-tight font-extrabold sm:text-5xl lg:text-6xl">
          {sapaan}
        </h1>
        <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink/75">{deskripsi}</p>
        <button
          type="button"
          onClick={handleKlik}
          className="mt-8 cursor-pointer rounded-full bg-sea px-7 py-3 font-bold text-white shadow-lg shadow-sea/30 transition hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sea"
        >
          Lihat Profil Saya
        </button>
      </div>
      <div className="order-1 flex justify-center md:order-2">
        <div className="rounded-[2.5rem] bg-coral p-3 -rotate-3">
          <img
            src="/Foto_Teguh.jpeg"
            alt="Foto profil Teguh Paniro Silitonga"
            className="h-64 w-64 rounded-[2rem] object-cover sm:h-80 sm:w-80"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
