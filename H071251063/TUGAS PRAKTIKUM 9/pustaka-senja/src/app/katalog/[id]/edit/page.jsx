
import Link from "next/link";
import pool from "@/lib/db";
import { ubahBuku } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditBuku({ params }) {
  const { id } = await params;

  const result = await pool.query(
    "SELECT * FROM buku WHERE id = $1",
    [id]
  );

  const buku = result.rows[0];

  if (!buku) {
    return (
      <main className="min-h-screen bg-[#FFF9FD] px-6 py-16">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-purple-800">
            Buku Tidak Ditemukan
          </h1>

          <p className="mt-3 text-purple-500">
            Data buku yang ingin diedit tidak tersedia.
          </p>

          <Link
            href="/katalog"
            className="mt-6 inline-block rounded-full bg-purple-500 px-6 py-3 text-white hover:bg-purple-600"
          >
            Kembali ke Katalog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF9FD] px-6 py-12">
      <div className="mx-auto max-w-2xl rounded-3xl border border-purple-100 bg-white p-8 shadow-[0_8px_30px_rgba(180,140,200,0.10)]">

        <h1 className="mb-2 text-3xl font-bold text-purple-700">
          Edit Buku
        </h1>

        <p className="mb-8 text-purple-400">
          Perbarui informasi koleksi buku Pustaka Senja.
        </p>

        <form
          action={ubahBuku}
          className="space-y-5"
        >
          {/* ID BUKU */}
          <input
            type="hidden"
            name="id"
            value={buku.id}
          />

          {/* JUDUL */}
          <div>
            <label className="mb-2 block font-medium text-purple-700">
              Judul Buku
            </label>

            <input
              type="text"
              name="judul"
              required
              defaultValue={buku.judul}
              className="w-full rounded-xl border border-purple-100 p-3 outline-none focus:border-purple-400"
            />
          </div>

          {/* PENULIS */}
          <div>
            <label className="mb-2 block font-medium text-purple-700">
              Nama Penulis
            </label>

            <input
              type="text"
              name="penulis"
              required
              defaultValue={buku.penulis}
              className="w-full rounded-xl border border-purple-100 p-3 outline-none focus:border-purple-400"
            />
          </div>

          {/* KATEGORI */}
          <div>
            <label className="mb-2 block font-medium text-purple-700">
              Kategori
            </label>

            <select
              name="kategori"
              required
              defaultValue={buku.kategori}
              className="w-full rounded-xl border border-purple-100 p-3"
            >
              <option value="Teknologi">Teknologi</option>
              <option value="Fiksi">Fiksi</option>
              <option value="Pengembangan Diri">
                Pengembangan Diri
              </option>
            </select>
          </div>

          {/* TAHUN */}
          <div>
            <label className="mb-2 block font-medium text-purple-700">
              Tahun Terbit
            </label>

            <input
              type="number"
              name="tahun"
              required
              min="1000"
              max="2027"
              step="1"
              defaultValue={buku.tahun}
              className="w-full rounded-xl border border-purple-100 p-3 outline-none focus:border-purple-400"
            />

            <p className="mt-1 text-sm text-purple-400">
              Tahun antara 1000–2027.
            </p>
          </div>

          {/* STATUS */}
          <div>
            <label className="mb-2 block font-medium text-purple-700">
              Status Buku
            </label>

            <select
              name="tersedia"
              defaultValue={String(buku.tersedia)}
              className="w-full rounded-xl border border-purple-100 p-3"
            >
              <option value="true">Tersedia</option>
              <option value="false">Dipinjam</option>
            </select>
          </div>

          {/* SINOPSIS */}
          <div>
            <label className="mb-2 block font-medium text-purple-700">
              Sinopsis
            </label>

            <textarea
              name="sinopsis"
              required
              rows="5"
              defaultValue={buku.sinopsis}
              className="w-full rounded-xl border border-purple-100 p-3 outline-none focus:border-purple-400"
            />
          </div>

          {/* SAMPUL DEPAN */}
          <div>
            <label className="mb-2 block font-medium text-purple-700">
              Gambar Sampul Depan
            </label>

            {buku.gambar ? (
              <div className="mb-3">
                <p className="mb-2 text-sm text-purple-400">
                  Sampul depan saat ini:
                </p>

                <img
                  src={buku.gambar}
                  alt="Sampul depan buku"
                  className="h-48 w-36 rounded-xl border border-purple-100 object-cover"
                />
              </div>
            ) : (
              <p className="mb-3 text-sm text-red-500">
                Buku ini belum memiliki sampul depan.
              </p>
            )}

            <input
              type="file"
              name="gambar"
              accept="image/jpeg,image/png,image/webp"
              className="w-full rounded-xl border border-purple-100 p-3 text-sm"
            />

            <p className="mt-1 text-sm text-purple-400">
              Pilih foto baru jika ingin menambahkan atau mengganti sampul depan.
              JPG, PNG, atau WEBP. Maksimal 5 MB.
            </p>
          </div>

          {/* SAMPUL BELAKANG */}
          <div>
            <label className="mb-2 block font-medium text-purple-700">
              Gambar Sampul Belakang
            </label>

            {buku.gambar_belakang ? (
              <div className="mb-3">
                <p className="mb-2 text-sm text-purple-400">
                  Sampul belakang saat ini:
                </p>

                <img
                  src={buku.gambar_belakang}
                  alt="Sampul belakang buku"
                  className="h-48 w-36 rounded-xl border border-purple-100 object-cover"
                />
              </div>
            ) : (
              <p className="mb-3 text-sm text-red-500">
                Buku ini belum memiliki sampul belakang.
              </p>
            )}

            <input
              type="file"
              name="gambar_belakang"
              accept="image/jpeg,image/png,image/webp"
              className="w-full rounded-xl border border-purple-100 p-3 text-sm"
            />

            <p className="mt-1 text-sm text-purple-400">
              Pilih foto baru jika ingin menambahkan atau mengganti sampul belakang.
              JPG, PNG, atau WEBP. Maksimal 5 MB.
            </p>
          </div>

          {/* TOMBOL */}
          <div className="flex flex-wrap gap-3 pt-4">
            <button
              type="submit"
              className="rounded-full bg-purple-500 px-7 py-3 font-medium text-white shadow-md shadow-purple-200 transition hover:bg-purple-600"
            >
              Simpan Perubahan
            </button>

            <Link
              href="/katalog"
              className="rounded-full border border-purple-200 px-7 py-3 font-medium text-purple-600 transition hover:bg-purple-50"
            >
              ← Kembali ke Katalog
            </Link>
          </div>

        </form>
      </div>
    </main>
  );
}
