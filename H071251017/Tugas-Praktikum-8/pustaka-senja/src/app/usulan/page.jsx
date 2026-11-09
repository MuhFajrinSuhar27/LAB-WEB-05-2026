"use client";

import { useState } from "react";

const daftarKategori = ["Teknologi", "Fiksi", "Pengembangan Diri"];
const formAwal = { nama: "", judul: "", kategori: "Teknologi", alasan: "" };

export default function Usulan() {
  const [form, setForm] = useState(formAwal);
  const [pesan, setPesan] = useState(null); // { tipe: "error" | "sukses", teks }
  const [daftarUsulan, setDaftarUsulan] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      nama: form.nama.trim(),
      judul: form.judul.trim(),
      kategori: form.kategori.trim(),
      alasan: form.alasan.trim(),
    };

    if (!data.nama || !data.judul || !data.kategori || !data.alasan) {
      setPesan({ tipe: "error", teks: "Semua kolom wajib diisi sebelum usulan dikirim." });
      return;
    }

    setDaftarUsulan([{ id: `${Date.now()}`, ...data }, ...daftarUsulan]);
    setPesan({ tipe: "sukses", teks: "Usulan berhasil dikirim. Terima kasih!" });
    setForm(formAwal);
  };

  const inputClass =
    "mt-1 w-full rounded-md border border-indigo-200 bg-white px-3 py-2 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-200";

  return (
    <section className="mx-auto max-w-3xl px-5 py-10">
      <h1 className="text-3xl font-bold text-indigo-950">Usulan Buku</h1>
      <p className="mt-1 text-slate-600">
        Ada buku yang ingin kamu baca di Pustaka Senja? Ceritakan di sini.
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-6 space-y-4 rounded-xl border border-indigo-100 bg-white p-6 shadow-sm"
      >
        <div>
          <label htmlFor="nama" className="text-sm font-medium">Nama Pengusul</label>
          <input id="nama" name="nama" type="text" value={form.nama} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label htmlFor="judul" className="text-sm font-medium">Judul Buku yang Diusulkan</label>
          <input id="judul" name="judul" type="text" value={form.judul} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label htmlFor="kategori" className="text-sm font-medium">Kategori</label>
          <select id="kategori" name="kategori" value={form.kategori} onChange={handleChange} className={inputClass}>
            {daftarKategori.map((kategori) => (
              <option key={kategori} value={kategori}>{kategori}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="alasan" className="text-sm font-medium">Alasan Usulan</label>
          <textarea id="alasan" name="alasan" rows={4} value={form.alasan} onChange={handleChange} className={inputClass} />
        </div>

        {pesan && (
          <p
            role={pesan.tipe === "error" ? "alert" : "status"}
            className={
              "rounded-md px-4 py-3 text-sm font-medium " +
              (pesan.tipe === "error"
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800")
            }
          >
            {pesan.teks}
          </p>
        )}

        <button
          type="submit"
          className="rounded-md bg-indigo-950 px-5 py-3 font-medium text-white hover:bg-indigo-800"
        >
          Kirim Usulan
        </button>
      </form>

      {daftarUsulan.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-indigo-950">Usulan yang baru dikirim</h2>
          <ul className="mt-4 space-y-3">
            {daftarUsulan.map((usulan) => (
              <li key={usulan.id} className="rounded-xl border border-indigo-100 bg-white p-4 shadow-sm">
                <p className="font-semibold text-indigo-950">{usulan.judul}</p>
                <p className="text-sm text-slate-600">
                  {usulan.kategori}, diusulkan oleh {usulan.nama}
                </p>
                <p className="mt-2 text-sm text-slate-700">{usulan.alasan}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
