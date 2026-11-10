import Link from "next/link";
import DaftarBuku from "@/components/DaftarBuku";
import { getSemuaBuku } from "@/lib/buku";

// Selalu ambil data terbaru dari PostgreSQL.
export const dynamic = "force-dynamic";

export default async function Katalog() {
  const daftarBuku = await getSemuaBuku();

  return (
    <section className="mx-auto max-w-5xl px-5 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-indigo-950">Katalog Buku</h1>
        <Link
          href="/katalog/tambah"
          className="rounded-md bg-amber-300 px-4 py-2 text-sm font-semibold text-indigo-950 hover:bg-amber-200"
        >
          + Tambah Buku
        </Link>
      </div>
      <DaftarBuku daftarBuku={daftarBuku} />
    </section>
  );
}
