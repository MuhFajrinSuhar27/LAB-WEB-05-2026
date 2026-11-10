"use client";

import { useState } from "react";

export default function UsulanBuku() {
  const [nama, setNama] = useState("");
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("Fiksi");
  const [alasan, setAlasan] = useState("");

  const [daftarUsulan, setDaftarUsulan] = useState([]);
  const [pesan, setPesan] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !nama.trim() ||
      !judul.trim() ||
      !alasan.trim()
    ) {
      setPesan("Mohon lengkapi semua kolom terlebih dahulu.");
      return;
    }

    const usulanBaru = {
      id: Date.now(),
      nama: nama.trim(),
      judul: judul.trim(),
      kategori,
      alasan: alasan.trim(),
    };

    setDaftarUsulan([...daftarUsulan, usulanBaru]);

    setNama("");
    setJudul("");
    setKategori("Fiksi");
    setAlasan("");

    setPesan("Usulan buku berhasil dikirim!");
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">

      {/* Judul */}
      <div className="mb-10 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
          Bagikan Rekomendasimu
        </p>

        <h1 className="mt-2 text-4xl font-bold text-purple-900">
          Usulkan Buku
        </h1>

        <p className="mt-3 text-purple-600">
          Punya rekomendasi buku menarik? Bagikan kepada kami!
        </p>
      </div>

      {/* Formulir */}
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl bg-white p-8 shadow-md"
      >

        <div className="mb-5">
          <label className="mb-2 block font-medium text-purple-900">
            Nama Pengusul
          </label>

          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Masukkan nama kamu"
            className="w-full rounded-xl border border-purple-200 p-3 outline-none focus:border-purple-400"
          />
        </div>

        <div className="mb-5">
          <label className="mb-2 block font-medium text-purple-900">
            Judul Buku
          </label>

          <input
            type="text"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            placeholder="Masukkan judul buku"
            className="w-full rounded-xl border border-purple-200 p-3 outline-none focus:border-purple-400"
          />
        </div>

        <div className="mb-5">
          <label className="mb-2 block font-medium text-purple-900">
            Kategori Buku
          </label>

          <select
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className="w-full rounded-xl border border-purple-200 bg-white p-3 outline-none focus:border-purple-400"
          >
            <option value="Fiksi">Fiksi</option>
            <option value="Teknologi">Teknologi</option>
            <option value="Pengembangan Diri">Pengembangan Diri</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="mb-2 block font-medium text-purple-900">
            Alasan Mengusulkan
          </label>

          <textarea
            value={alasan}
            onChange={(e) => setAlasan(e.target.value)}
            placeholder="Ceritakan alasan kamu merekomendasikan buku ini"
            rows="4"
            className="w-full rounded-xl border border-purple-200 p-3 outline-none focus:border-purple-400"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-purple-500 py-3 font-semibold text-white transition hover:bg-purple-600"
        >
          Kirim Usulan
        </button>

        {pesan && (
          <p className="mt-4 text-center text-sm font-medium text-purple-700">
            {pesan}
          </p>
        )}

      </form>

      {/* Daftar Usulan */}
      <section className="mt-12">
        <h2 className="mb-5 text-2xl font-bold text-purple-900">
          Daftar Usulan Buku
        </h2>

        {daftarUsulan.length === 0 ? (
          <p className="rounded-2xl bg-purple-50 p-6 text-center text-purple-500">
            Belum ada buku yang diusulkan.
          </p>
        ) : (
          <div className="space-y-4">
            {daftarUsulan.map((usulan) => (
              <div
                key={usulan.id}
                className="rounded-2xl bg-white p-5 shadow-sm"
              >
                <h3 className="text-lg font-bold text-purple-900">
                  {usulan.judul}
                </h3>

                <p className="mt-1 text-sm text-purple-600">
                  Diusulkan oleh: {usulan.nama}
                </p>

                <p className="mt-2 text-sm text-pink-600">
                  {usulan.kategori}
                </p>

                <p className="mt-3 text-gray-600">
                  {usulan.alasan}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}