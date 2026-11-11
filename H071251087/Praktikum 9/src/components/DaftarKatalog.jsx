"use client";

import { useState } from "react";
import Link from "next/link";
import BukuCard from "@/components/BukuCard";

const daftarKategori = ["Semua", "Teknologi", "Fiksi", "Pengembangan Diri"];

export default function DaftarKatalog({ dataBuku }) {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");

  const bukuTampil =
    kategoriAktif === "Semua"
      ? dataBuku
      : dataBuku.filter((buku) => buku.kategori === kategoriAktif);

  return (
    <section>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl text-custom-maroon font-bold">Katalog Buku</h1>
          <p className="text-stone-800 mt-1">
            Jelajahi koleksi buku Pustaka Senja berdasarkan kategori.
          </p>
        </div>
        <Link
          href="/katalog/tambah"
          className="shrink-0 bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
        >
          + Tambah Buku
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {daftarKategori.map((kategori) => (
          <button
            key={kategori}
            onClick={() => setKategoriAktif(kategori)}
            className={
              kategoriAktif === kategori
                ? "bg-pink-600 text-white font-medium text-sm px-4 py-2 rounded-lg transition"
                : "bg-white/70 hover:bg-custom-soft-pink text-pink-900 text-sm px-4 py-2 rounded-lg transition"
            }
          >
            {kategori}
          </button>
        ))}
      </div>

      {bukuTampil.length === 0 ? (
        <p className="text-stone-800">Belum ada buku pada kategori ini.</p>
      ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {bukuTampil.map((buku) => (
          <BukuCard
            key={buku.id}
            id={buku.id}
            judul={buku.judul}
            cover={buku.cover}
            penulis={buku.penulis}
            kategori={buku.kategori}
            tahun={buku.tahun}
            tersedia={buku.tersedia}
          />
        ))}
      </div>
      )}
    </section>
  );
}
