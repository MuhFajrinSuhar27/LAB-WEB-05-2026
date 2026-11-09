import Link from "next/link";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { ambilBukuBerdasarkanId } from "@/lib/buku";
import { ubahBuku } from "@/app/katalog/action";

export default async function HalamanEditBuku({ params }) {
  await connection();
  const { id } = await params;
  const buku = await ambilBukuBerdasarkanId(id);

  if (!buku) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-3xl">
      <Link
        href={`/katalog/${buku.id}`}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#6f796b] transition hover:text-[#27382f]"
      >
        ← Kembali ke detail buku
      </Link>

      <div className="mt-6 rounded-[2rem] border border-[#e9e2d7] bg-white p-6 shadow-sm sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a27b4d]">
          Update · Perbarui koleksi
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold text-[#29382f]">
          Edit Buku
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#817666]">
          Ubah informasi buku. Data lama sudah diisikan dari PostgreSQL.
        </p>

        <form action={ubahBuku} className="mt-8 space-y-5">
          <input type="hidden" name="id" value={buku.id} />

          <div>
            <label htmlFor="judul" className="mb-2 block text-sm font-semibold text-[#514b42]">
              Judul Buku
            </label>
            <input
              id="judul"
              name="judul"
              type="text"
              defaultValue={buku.judul}
              maxLength={255}
              required
              className="w-full rounded-2xl border border-[#e5ded3] bg-[#fdfcf9] px-4 py-3 text-sm text-[#29382f] outline-none focus:border-[#859681] focus:ring-4 focus:ring-[#859681]/15"
            />
          </div>

          <div>
            <label htmlFor="penulis" className="mb-2 block text-sm font-semibold text-[#514b42]">
              Penulis
            </label>
            <input
              id="penulis"
              name="penulis"
              type="text"
              defaultValue={buku.penulis}
              maxLength={150}
              required
              className="w-full rounded-2xl border border-[#e5ded3] bg-[#fdfcf9] px-4 py-3 text-sm text-[#29382f] outline-none focus:border-[#859681] focus:ring-4 focus:ring-[#859681]/15"
            />
          </div>

          <div>
            <label htmlFor="kategori" className="mb-2 block text-sm font-semibold text-[#514b42]">
              Kategori
            </label>
            <input
              id="kategori"
              name="kategori"
              type="text"
              defaultValue={buku.kategori}
              maxLength={100}
              required
              className="w-full rounded-2xl border border-[#e5ded3] bg-[#fdfcf9] px-4 py-3 text-sm text-[#29382f] outline-none focus:border-[#859681] focus:ring-4 focus:ring-[#859681]/15"
            />
          </div>

          <div>
            <label htmlFor="tahun" className="mb-2 block text-sm font-semibold text-[#514b42]">
              Tahun Terbit
            </label>
            <input
              id="tahun"
              name="tahun"
              type="number"
              min="1"
              max="9999"
              step="1"
              defaultValue={buku.tahun}
              required
              className="w-full rounded-2xl border border-[#e5ded3] bg-[#fdfcf9] px-4 py-3 text-sm text-[#29382f] outline-none focus:border-[#859681] focus:ring-4 focus:ring-[#859681]/15"
            />
          </div>

          <div>
            <label htmlFor="tersedia" className="mb-2 block text-sm font-semibold text-[#514b42]">
              Status Ketersediaan
            </label>
            <select
              id="tersedia"
              name="tersedia"
              defaultValue={String(buku.tersedia)}
              required
              className="w-full rounded-2xl border border-[#e5ded3] bg-[#fdfcf9] px-4 py-3 text-sm text-[#29382f] outline-none focus:border-[#859681] focus:ring-4 focus:ring-[#859681]/15"
            >
              <option value="true">Tersedia</option>
              <option value="false">Sedang Dipinjam</option>
            </select>
          </div>

          <div>
            <label htmlFor="sinopsis" className="mb-2 block text-sm font-semibold text-[#514b42]">
              Sinopsis
            </label>
            <textarea
              id="sinopsis"
              name="sinopsis"
              defaultValue={buku.sinopsis}
              rows={5}
              required
              className="w-full resize-y rounded-2xl border border-[#e5ded3] bg-[#fdfcf9] px-4 py-3 text-sm leading-6 text-[#29382f] outline-none focus:border-[#859681] focus:ring-4 focus:ring-[#859681]/15"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="inline-flex flex-1 items-center justify-center rounded-full bg-[#27382f] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#3c5547]"
            >
              Simpan Perubahan
            </button>
            <Link
              href={`/katalog/${buku.id}`}
              className="inline-flex items-center justify-center rounded-full border border-[#e5ded3] px-6 py-3.5 text-sm font-semibold text-[#665d51] transition hover:bg-[#f8f6f1]"
            >
              Batal
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
