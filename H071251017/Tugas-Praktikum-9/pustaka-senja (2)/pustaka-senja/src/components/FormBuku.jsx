"use client";

import { useState, useTransition } from "react";
import Link from "next/link";

const daftarKategori = ["Teknologi", "Fiksi", "Pengembangan Diri"];

const nilaiAwalKosong = {
  judul: "",
  penulis: "",
  kategori: "Teknologi",
  tahun: "",
  tersedia: "true",
  sinopsis: "",
};

// aksi: Server Action (menerima FormData). Dipakai untuk tambah maupun ubah.
export default function FormBuku({ aksi, nilaiAwal = nilaiAwalKosong, labelTombol }) {
  const [form, setForm] = useState(nilaiAwal);
  const [error, setError] = useState(null);
  const [pending, startTransition] = useTransition();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setError(null);
    startTransition(async () => {
      const hasil = await aksi(formData);
      if (hasil?.error) setError(hasil.error);
    });
  };

  const inputClass =
    "mt-1 w-full rounded-md border border-indigo-200 bg-white px-3 py-2 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-200";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4 rounded-xl border border-indigo-100 bg-white p-6 shadow-sm"
    >
      <div>
        <label htmlFor="judul" className="text-sm font-medium">Judul</label>
        <input id="judul" name="judul" type="text" value={form.judul} onChange={handleChange} className={inputClass} />
      </div>
      <div>
        <label htmlFor="penulis" className="text-sm font-medium">Penulis</label>
        <input id="penulis" name="penulis" type="text" value={form.penulis} onChange={handleChange} className={inputClass} />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="kategori" className="text-sm font-medium">Kategori</label>
          <select id="kategori" name="kategori" value={form.kategori} onChange={handleChange} className={inputClass}>
            {daftarKategori.map((kategori) => (
              <option key={kategori} value={kategori}>{kategori}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="tahun" className="text-sm font-medium">Tahun terbit</label>
          <input id="tahun" name="tahun" type="number" value={form.tahun} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label htmlFor="tersedia" className="text-sm font-medium">Status</label>
          <select id="tersedia" name="tersedia" value={form.tersedia} onChange={handleChange} className={inputClass}>
            <option value="true">Tersedia</option>
            <option value="false">Sedang Dipinjam</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="sinopsis" className="text-sm font-medium">Sinopsis</label>
        <textarea id="sinopsis" name="sinopsis" rows={5} value={form.sinopsis} onChange={handleChange} className={inputClass} />
      </div>

      {error && (
        <p role="alert" className="rounded-md bg-red-100 px-4 py-3 text-sm font-medium text-red-800">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-indigo-950 px-5 py-3 font-medium text-white hover:bg-indigo-800 disabled:opacity-50"
        >
          {pending ? "Menyimpan..." : labelTombol}
        </button>
        <Link
          href="/katalog"
          className="rounded-md border border-indigo-950 px-5 py-3 font-medium text-indigo-950 hover:bg-indigo-100"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}
