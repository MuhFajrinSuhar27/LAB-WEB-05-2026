"use client";

import { useState } from "react";

const daftarKategori = ["Teknologi", "Fiksi", "Pengembangan Diri"];

export default function UsulanPage() {
  const [nama, setNama] = useState("");
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("Teknologi");
  const [alasan, setAlasan] = useState("");
  const [peringatan, setPeringatan] = useState("");
  const [terkirim, setTerkirim] = useState(false);
  const [daftarUsulan, setDaftarUsulan] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!nama.trim() || !judul.trim() || !alasan.trim()) {
      setPeringatan("Mohon lengkapi semua kolom sebelum mengirim usulan.");
      setTerkirim(false);
      return;
    }

    const usulanBaru = {
      id: Date.now().toString(),
      nama: nama.trim(),
      judul: judul.trim(),
      kategori,
      alasan: alasan.trim(),
    };

    setDaftarUsulan([usulanBaru, ...daftarUsulan]);
    setPeringatan("");
    setTerkirim(true);
    setNama("");
    setJudul("");
    setKategori("Teknologi");
    setAlasan("");
  }

  const inputClass =
    "w-full bg-white text-pink-900 border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-stone-500";

  return (
    <section className="max-w-lg mx-auto">
      <div className="bg-custom-soft-pink border border-slate-800 rounded-2xl p-6 shadow-lg">
        <h1 className="text-2xl text-custom-maroon font-bold mb-2">Usulan Buku</h1>
        <p className="text-stone-800 text-sm mb-6">
          Usulkan judul buku baru yang ingin kamu temukan di Pustaka Senja.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-stone-800 mb-1">
              Nama Pengusul
            </label>
            <input
              type="text"
              placeholder="Masukkan nama Anda"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm text-stone-800 mb-1">
              Judul Buku yang Diusulkan
            </label>
            <input
              type="text"
              placeholder="Contoh: The Pragmatic Programmer"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm text-stone-800 mb-1">Kategori</label>
            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className={inputClass}
            >
              {daftarKategori.map((item) => (
                <option
                  key={item}
                  value={item}
                  className="bg-white text-pink-900"
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-stone-800 mb-1">
              Alasan Usulan
            </label>
            <textarea
              rows={4}
              placeholder="Tulis alasan Anda..."
              value={alasan}
              onChange={(e) => setAlasan(e.target.value)}
              className={inputClass}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white text-pink-900 font-medium py-2.5 rounded-lg transition"
          >
            Kirim Usulan
          </button>
        </form>

        {peringatan && (
          <p className="mt-4 p-3 bg-custom-red text-white text-sm rounded-lg text-center">
            {peringatan}
          </p>
        )}
        {terkirim && (
          <p className="mt-4 p-3 bg-custom-sage text-white text-sm rounded-lg text-center">
            Terima kasih, usulan Anda berhasil dikirim!
          </p>
        )}
      </div>

      {daftarUsulan.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg text-custom-maroon font-semibold mb-3">Usulan yang Terkirim di Sesi Ini:</h2>
          <ul className="space-y-3">
            {daftarUsulan.map((usulan) => (
              <li
                key={usulan.id}
                className="bg-custom-soft-pink border border-slate-800 rounded-xl p-4"
              >
                <p className="text-custom-maroon">Buku {usulan.judul} ({usulan.kategori})
                  diusulkan oleh {usulan.nama} dengan alasan {usulan.alasan}.
                </p>
                {/* <p className="text-sm text-stone-800 mt-1">{usulan.alasan}</p>
                <p className="text-xs text-stone-800 mt-2">
                  Diusulkan oleh {usulan.nama}
                </p> */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
