function Hero() {
  const handleClick = () => {
    console.log("Tombol 'Lihat Karya Saya' diklik!");
  };

  return (
    <section className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-8 px-4 py-16 md:flex-row md:justify-between">
      <div className="text-center md:text-left">
        <p className="mb-2 text-sm uppercase tracking-widest text-pink-400">
          Selamat datang
        </p>
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
          Halo, Saya Aisyah
        </h1>
        <p className="mt-4 max-w-md text-slate-300">
          Mahasiswi yang sedang belajar pemrograman web di Kampus Merah yang hobi
          membaca, scroll tiktok dan tidur.
        </p>
        <button
          onClick={handleClick}
          className="mt-6 rounded-full bg-pink-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-pink-400"
        >
          Lihat Karya Saya
        </button>
      </div>
      <img
        src="/public/cherry.jpg"
        alt="Foto Profil"
        className="h-48 w-48 rounded-full border-4 border-pink-400 object-cover shadow-xl sm:h-64 sm:w-64"
      />
    </section>
  );
}

export default Hero;
