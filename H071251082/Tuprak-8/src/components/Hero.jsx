function Hero({ nama, slogan, lokasi, jamBuka }) {
  return (
    <section className="rounded-2xl bg-linear-to-br from-blue-600 to-blue-800 px-6 py-16 text-center text-white shadow-md">
      <span className="mb-4 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-blue-50">
        Ruang Baca Komunitas
      </span>
      <h1 className="mb-3 text-4xl font-bold">
        Selamat Datang di {nama}
      </h1>
      <p className="mx-auto mb-6 max-w-xl text-blue-100">{slogan}</p>
      <div className="flex flex-col items-center justify-center gap-2 text-sm text-blue-100 sm:flex-row sm:gap-6">
        <p>📍 {lokasi}</p>
        <p>🕒 {jamBuka}</p>
      </div>
    </section>
  );
}

export default Hero;
