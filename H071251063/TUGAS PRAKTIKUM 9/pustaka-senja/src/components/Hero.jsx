export default function Hero({
  namaRuangBaca,
  slogan,
  lokasi,
}) {
  return (
    <section className="relative isolate flex min-h-[430px] items-center justify-center overflow-hidden rounded-[32px] border border-pink-100 bg-[#fffaf5] px-6 py-12 text-center shadow-sm">

      {/* Background Ilustrasi */}
      <img
        src="/images/background-pustaka.png"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-contain"
      />

      {/* Lapisan lembut */}
      <div className="absolute inset-0 -z-10 bg-white/20" />

      {/* Isi Hero */}
      <div className="max-w-2xl">

        <span className="inline-block rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-purple-600 shadow-sm">
          Welcome to Our Library
        </span>

        <h1 className="mt-6 text-4xl font-bold leading-tight text-purple-900 md:text-5xl">
          Selamat Datang di
          <span className="block text-purple-600">
            {namaRuangBaca}
          </span>
        </h1>

        <p className="mt-4 text-lg font-medium text-purple-700">
          {slogan}
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">

          <span className="rounded-full bg-white/90 px-5 py-3 text-sm font-medium text-purple-700 shadow-sm">
            Jl. Bunga No. 2
          </span>

          <span className="rounded-full bg-white/90 px-5 py-3 text-sm font-semibold text-pink-600 shadow-sm">
            Buka 24 Jam
          </span>

        </div>
      </div>

    </section>
  );
}