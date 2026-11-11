import Link from "next/link";

function Hero({ nama, slogan, lokasi, jamBuka }) {
  return (
    <section className="py-16 text-center bg-custom-soft-pink rounded-2xl border border-slate-800 px-6 shadow-lg">
      <span className="inline-block bg-white/80 text-pink-900 text-xs font-semibold px-3 py-1 rounded-full mb-4">
        Ruang Baca Komunitas
      </span>
      <h1 className="text-4xl text-custom-maroon font-bold mb-3">
        Selamat Datang di <span className="text-custom-sage">{nama}</span>
      </h1>
      <p className="text-stone-800 max-w-xl mx-auto mb-4">{slogan}</p>
      <p className="text-sm text-stone-800 mb-2">{lokasi}</p>
      <p className="text-sm text-stone-800 mb-4">{jamBuka}</p>
      <div className="flex justify-center gap-4">
        <Link
          href="/katalog"
          className="bg-white/80 hover:bg-white/100 text-pink-900 font-medium px-5 py-2.5 rounded-lg transition"
        >
          Lihat Katalog Buku
        </Link>
        <Link
          href="/usulan"
          className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-5 py-2.5 rounded-lg transition"
        >
          Usulkan Buku
        </Link>
      </div>
    </section>
  );
}

export default Hero;
