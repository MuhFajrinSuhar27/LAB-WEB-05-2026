import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl rounded-[2rem] border border-[#e9e2d7] bg-white px-6 py-16 text-center shadow-sm sm:px-10">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f5eee5] font-serif text-3xl text-[#9a744d]">
        ?
      </span>
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#a27b4d]">
        Koleksi tidak ditemukan
      </p>
      <h1 className="mt-3 font-serif text-3xl font-semibold text-[#29382f]">
        Halaman atau buku tidak ditemukan.
      </h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#817666]">
        Maaf, alamat yang kamu buka tidak tersedia di Pustaka Senja.
      </p>
      <Link
        href="/katalog"
        className="mt-7 inline-flex rounded-full bg-[#27382f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3c5547]"
      >
        Kembali ke katalog
      </Link>
    </section>
  );
}
