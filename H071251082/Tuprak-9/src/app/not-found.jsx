import Link from "next/link";

export const metadata = { title: "Tidak ditemukan" };

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-32">
      <p className="label">404</p>
      <h1 className="display mt-4 text-[clamp(2.75rem,8vw,6rem)]">
        Buku ini tidak
        <br />
        ada di rak.
      </h1>
      <p className="mt-6 max-w-md text-muted">
        Halaman atau buku yang Anda cari tidak ditemukan. Mungkin sudah dihapus,
        atau alamatnya keliru.
      </p>
      <Link href="/katalog" className="btn mt-10">
        Kembali ke katalog <span className="panah">→</span>
      </Link>
    </div>
  );
}
