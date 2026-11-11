"use client";

import { useActionState } from "react";
import Link from "next/link";

const daftarKategori = ["Teknologi", "Fiksi", "Pengembangan Diri"];

const inputClass =
  "w-full bg-white text-pink-900 border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500";

// Form dipakai bersama oleh halaman Tambah dan Edit.
// useActionState menampung pesan error dari Server Action (mis. buku kembar).
function FormBuku({ action, buku, labelSimpan, batalHref }) {
  const tahunIni = new Date().getFullYear();
  const [state, formAction, pending] = useActionState(action, null);
  // Jika ada error, isian yang sudah diketik dikembalikan agar tidak hilang
  const nilai = (kunci) => state?.values?.[kunci] ?? buku?.[kunci];

  return (
    <form key={state?.ts ?? "awal"} action={formAction} className="space-y-4">
      {state?.error && (
        <div
          role="alert"
          className="bg-red-100 border border-red-400 text-red-700 text-sm rounded-lg px-4 py-3"
        >
          {state.error}
        </div>
      )}

      {buku && <input type="hidden" name="id" value={buku.id} />}

      <div>
        <label htmlFor="judul" className="block text-sm text-stone-800 mb-1">
          Judul Buku
        </label>
        <input
          id="judul"
          name="judul"
          type="text"
          maxLength={150}
          required
          defaultValue={nilai("judul")}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="penulis" className="block text-sm text-stone-800 mb-1">
          Penulis
        </label>
        <input
          id="penulis"
          name="penulis"
          type="text"
          maxLength={100}
          required
          defaultValue={nilai("penulis")}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="kategori" className="block text-sm text-stone-800 mb-1">
            Kategori
          </label>
          <select
            id="kategori"
            name="kategori"
            defaultValue={nilai("kategori") ?? "Teknologi"}
            className={inputClass}
          >
            {daftarKategori.map((item) => (
              <option key={item} value={item} className="bg-white text-pink-900">
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="tahun" className="block text-sm text-stone-800 mb-1">
            Tahun Terbit
          </label>
          <input
            id="tahun"
            name="tahun"
            type="number"
            min={1000}
            max={tahunIni}
            required
            defaultValue={nilai("tahun")}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="tersedia" className="block text-sm text-stone-800 mb-1">
          Status Ketersediaan
        </label>
        <select
          id="tersedia"
          name="tersedia"
          defaultValue={String(nilai("tersedia") ?? true)}
          className={inputClass}
        >
          <option value="true" className="bg-white text-pink-900">Tersedia</option>
          <option value="false" className="bg-white text-pink-900">Sedang Dipinjam</option>
        </select>
      </div>

      <div>
        <label htmlFor="sinopsis" className="block text-sm text-stone-800 mb-1">
          Sinopsis
        </label>
        <textarea
          id="sinopsis"
          name="sinopsis"
          rows={4}
          required
          defaultValue={nilai("sinopsis")}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cover" className="block text-sm text-stone-800 mb-1">
            Foto Tampak Depan
          </label>
          <input
            id="cover"
            name="cover"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className={inputClass}
          />
          {buku?.cover && (
            <p className="text-xs text-stone-600 mt-1">Sudah ada foto. Kosongkan jika tidak ingin mengganti.</p>
          )}
        </div>
        <div>
          <label htmlFor="belakang" className="block text-sm text-stone-800 mb-1">
            Foto Tampak Belakang
          </label>
          <input
            id="belakang"
            name="belakang"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className={inputClass}
          />
          {buku?.belakang && (
            <p className="text-xs text-stone-600 mt-1">Sudah ada foto. Kosongkan jika tidak ingin mengganti.</p>
          )}
        </div>
      </div>
      <p className="text-xs text-stone-600 -mt-2">Foto bersifat opsional. Format PNG, JPG, atau WebP, maksimal 3 MB.</p>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="bg-pink-600 hover:bg-pink-700 disabled:opacity-60 text-white font-medium px-5 py-2.5 rounded-lg transition"
        >
          {pending ? "Menyimpan..." : labelSimpan}
        </button>
        <Link href={batalHref} className="text-sm text-pink-900 hover:underline">
          Batal
        </Link>
      </div>
    </form>
  );
}

export default FormBuku;