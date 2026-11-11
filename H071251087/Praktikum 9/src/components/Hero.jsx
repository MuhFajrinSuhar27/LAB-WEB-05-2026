import Link from "next/link";

function Hero({ nama, slogan, lokasi, jamBuka, statistik = [], gambar }) {
  return (
    <section className="grid lg:grid-cols-5 gap-10 items-center py-6 md:py-12">
      <div className="order-2 lg:order-1 lg:col-span-2">
        <span className="inline-block bg-white text-pink-900 text-xs font-semibold px-3 py-1 rounded-full mb-5 shadow-sm">
          Ruang Baca Komunitas
        </span>
        <h1 className="text-4xl md:text-5xl text-custom-maroon font-bold leading-tight mb-4">
          Selamat Datang di <span className="text-custom-matcha">{nama}</span>
        </h1>
        <p className="text-stone-800 text-lg leading-relaxed mb-5">{slogan}</p>
        <p className="text-sm text-stone-800 mb-1">{lokasi}</p>
        <p className="text-sm text-stone-800 mb-6">{jamBuka}</p>
        <div className="flex flex-wrap gap-4 mb-10">
          <Link
            href="/katalog"
            className="bg-white/80 hover:bg-white/100 text-pink-900 font-medium px-5 py-2.5 rounded-lg shadow-sm transition"
          >Lihat Katalog Buku
          </Link>
          <Link
            href="/usulan"
            className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-5 py-2.5 rounded-lg transition"
          >Usulkan Buku
          </Link>
        </div>

        <div className="flex">
          {statistik.map((item, i) => (
            <div
              key={item.label}
              className={`pr-6 ${i > 0 ? "pl-6 border-l border-stone-300" : ""}`}
            >
              <p className="text-3xl font-bold text-custom-maroon">{item.nilai}</p>
              <p className="text-sm text-stone-700">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {gambar && (
        <div className="order-1 lg:order-2 lg:col-span-3 bg-transparent">
          <img
            src={gambar}
            alt="Tampilan katalog Pustaka Senja di laptop dan HP"
            className="w-full h-auto"
          />
        </div>
      )}
    </section>
  );
}

export default Hero;