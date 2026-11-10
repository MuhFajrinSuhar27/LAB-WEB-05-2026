"use client";

import { useState } from "react";

const pilihanKategori = ["Teknologi", "Fiksi", "Pengembangan Diri"];

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-blue-500 focus:outline-none";

export default function UsulanPage() {
  const [nama, setNama] = useState("");
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("Teknologi");
  const [alasan, setAlasan] = useState("");
  const [pesanError, setPesanError] = useState("");
  const [terkirim, setTerkirim] = useState(false);
  const [daftarUsulan, setDaftarUsulan] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!nama.trim() || !judul.trim() || !kategori.trim() || !alasan.trim()) {
      setPesanError("Mohon lengkapi semua kolom sebelum mengirim usulan.");
      setTerkirim(false);
      return;
    }

    const usulanBaru = {
      id: Date.now(),
      nama: nama.trim(),
      judul: judul.trim(),
      kategori,
      alasan: alasan.trim(),
    };

    setDaftarUsulan([usulanBaru, ...daftarUsulan]);
    setPesanError("");
    setTerkirim(true);
    setNama("");
    setJudul("");
    setKategori("Teknologi");
    setAlasan("");
  }

  return (
    <section className="mx-auto max-w-lg">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
        <h1 className="mb-2 text-2xl font-bold">Usulan Buku</h1>
        <p className="mb-6 text-sm text-slate-500">
          Ada buku yang ingin dihadirkan di Pustaka Senja? Sampaikan usulanmu di
          sini.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nama" className="mb-1 block text-sm text-slate-600">
              Nama Pengusul
            </label>
            <input
              id="nama"
              type="text"
              placeholder="Masukkan nama Anda"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="judul" className="mb-1 block text-sm text-slate-600">
              Judul Buku yang Diusulkan
            </label>
            <input
              id="judul"
              type="text"
              placeholder="Contoh: The Pragmatic Programmer"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="kategori"
              className="mb-1 block text-sm text-slate-600"
            >
              Kategori
            </label>
            <select
              id="kategori"
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className={inputClass}
            >
              {pilihanKategori.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="alasan"
              className="mb-1 block text-sm text-slate-600"
            >
              Alasan Usulan
            </label>
            <textarea
              id="alasan"
              rows={4}
              placeholder="Mengapa buku ini perlu ada di Pustaka Senja?"
              value={alasan}
              onChange={(e) => setAlasan(e.target.value)}
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white transition hover:bg-blue-700"
          >
            Kirim Usulan
          </button>
        </form>

        {pesanError && (
          <p className="mt-4 rounded-lg border border-red-500/30 bg-red-50 p-3 text-center text-sm text-red-600">
            {pesanError}
          </p>
        )}

        {terkirim && (
          <p className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-50 p-3 text-center text-sm text-emerald-700">
            Terima kasih, usulan buku Anda berhasil dikirim!
          </p>
        )}
      </div>

      {daftarUsulan.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold">
            Usulan Terkirim ({daftarUsulan.length})
          </h2>
          <ul className="space-y-3">
            {daftarUsulan.map((usulan) => (
              <li
                key={usulan.id}
                className="rounded-xl border border-slate-200 bg-white p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold">{usulan.judul}</h3>
                  <span className="text-xs text-blue-600">
                    {usulan.kategori}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  Diusulkan oleh {usulan.nama}
                </p>
                <p className="mt-2 text-sm text-slate-600">{usulan.alasan}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
