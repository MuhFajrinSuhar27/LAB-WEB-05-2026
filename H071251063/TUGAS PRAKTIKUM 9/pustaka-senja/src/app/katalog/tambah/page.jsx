
"use client";

import Link from "next/link";
import { useActionState } from "react";
import { tambahBuku } from "../actions";

export default function TambahBuku() {
  const [state, formAction, isPending] = useActionState(
    tambahBuku,
    { error: "" }
  );

  return (
    <main className="min-h-screen bg-[#FFF9FD] px-6 py-12">
      <div className="mx-auto max-w-2xl rounded-3xl border border-purple-100 bg-white p-8 shadow-[0_8px_30px_rgba(180,140,200,0.10)]">

        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-purple-700">
            Tambah Buku
          </h1>

          <p className="text-purple-400">
            Tambahkan koleksi buku baru ke Pustaka Senja.
          </p>
        </div>

        <form action={formAction} className="space-y-5">

          {/* PESAN ERROR */}
          {state?.error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <p className="font-semibold">
                Buku gagal ditambahkan!
              </p>

              <p className="mt-1">
                {state.error}
              </p>
            </div>
          )}

          {/* JUDUL */}
          <div>
            <label className="mb-2 block font-medium text-purple-700">
              Judul Buku
            </label>

            <input
              type="text"
              name="judul"
              required
              placeholder="Masukkan judul buku"
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
              placeholder="Masukkan nama penulis"
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
              defaultValue="Fiksi"
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
              placeholder="Contoh: 2024"
              className="w-full rounded-xl border border-purple-100 p-3 outline-none focus:border-purple-400"
            />

            <p className="mt-1 text-sm text-purple-400">
              Masukkan tahun antara 1000–2027.
            </p>
          </div>

          {/* STATUS */}
          <div>
            <label className="mb-2 block font-medium text-purple-700">
              Status Buku
            </label>

            <select
              name="tersedia"
              defaultValue="true"
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
              placeholder="Tuliskan sinopsis buku..."
              className="w-full rounded-xl border border-purple-100 p-3 outline-none focus:border-purple-400"
            />
          </div>

          {/* SAMPUL DEPAN */}
          <div>
            <label className="mb-2 block font-medium text-purple-700">
              Gambar Sampul Depan
            </label>

            <input
              type="file"
              name="gambar"
              accept="image/jpeg,image/png,image/webp"
              className="w-full rounded-xl border border-purple-100 p-3 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-purple-100 file:px-4 file:py-2 file:text-purple-700"
            />

            <p className="mt-1 text-sm text-purple-400">
              JPG, PNG, atau WEBP. Maksimal 5 MB.
            </p>
          </div>

          {/* SAMPUL BELAKANG */}
          <div>
            <label className="mb-2 block font-medium text-purple-700">
              Gambar Sampul Belakang
            </label>

            <input
              type="file"
              name="gambar_belakang"
              accept="image/jpeg,image/png,image/webp"
              className="w-full rounded-xl border border-purple-100 p-3 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-purple-100 file:px-4 file:py-2 file:text-purple-700"
            />

            <p className="mt-1 text-sm text-purple-400">
              JPG, PNG, atau WEBP. Maksimal 5 MB.
            </p>
          </div>

          {/* TOMBOL */}
          <div className="flex flex-wrap gap-3 pt-4">

            <button
              type="submit"
              disabled={isPending}
              className="rounded-full bg-purple-500 px-7 py-3 font-medium text-white shadow-md shadow-purple-200 transition hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Menyimpan..." : "Simpan Buku"}
            </button>

            <Link
              href="/katalog"
              className="rounded-full border border-purple-200 px-7 py-3 font-medium text-purple-600 transition hover:bg-purple-50"
            >
              Batal
            </Link>

          </div>

        </form>
      </div>
    </main>
  );
}
