import Link from "next/link";
import { getDaftarKategori } from "@/lib/queries";
import { tambahBuku } from "@/app/katalog/actions";
import FormBuku from "@/components/FormBuku";

export const dynamic = "force-dynamic";
export const metadata = { title: "Tambah buku" };

export default async function TambahBuku() {
  const kategori = await getDaftarKategori();

  return (
    <div className="mx-auto max-w-6xl px-6 pt-12">
      <Link href="/katalog" className="tautan text-sm text-muted">
        ← Kembali ke katalog
      </Link>
      <p className="label mt-14">Koleksi baru</p>
      <h1 className="display mt-4 text-5xl">Tambah buku</h1>

      <div className="mt-14">
        <FormBuku
          action={tambahBuku}
          kategoriSaran={kategori}
          labelTombol="Simpan buku"
          batalHref="/katalog"
        />
      </div>
    </div>
  );
}
