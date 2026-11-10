"use client";

import { useState } from "react";
import dataBuku from "@/data/dataBuku";
import BukuCard from "@/components/BukuCard";

export default function Katalog() {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");

  const daftarKategori = [
    "Semua",
    "Teknologi",
    "Fiksi",
    "Pengembangan Diri",
  ];

  const bukuDitampilkan =
    kategoriAktif === "Semua"
      ? dataBuku
      : dataBuku.filter(
          (buku) => buku.kategori === kategoriAktif
        );

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">

      {/* Judul Halaman */}
      <div className="mb-10 text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-pink-500">
          Jelajahi Koleksi Kami
        </p>

        <h1 className="text-4xl font-bold text-purple-900">
          Katalog Buku
        </h1>

        <p className="mt-3 text-purple-600">
          Temukan buku yang sesuai dengan minat dan kebutuhanmu.
        </p>
      </div>

      {/* Filter Kategori */}
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {daftarKategori.map((kategori) => (
          <button
            key={kategori}
            onClick={() => setKategoriAktif(kategori)}
            className={`rounded-full px-6 py-2 text-sm font-medium transition ${
              kategoriAktif === kategori
                ? "bg-purple-500 text-white shadow-md"
                : "border border-purple-200 bg-white text-purple-700 hover:bg-pink-50"
            }`}
          >
            {kategori}
          </button>
        ))}
      </div>

      {/* Daftar Buku */}
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {bukuDitampilkan.map((buku) => (
          <BukuCard
            key={buku.id}
            buku={buku}
          />
        ))}
      </div>

      {/* Jika Buku Tidak Ditemukan */}
      {bukuDitampilkan.length === 0 && (
        <p className="py-10 text-center text-purple-600">
          Belum ada buku dalam kategori ini.
        </p>
      )}

    </div>
  );
}