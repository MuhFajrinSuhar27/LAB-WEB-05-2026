"use client";

import { useState } from "react";
import BukuCard from "@/components/BukuCard";

const daftarKategori = ["Semua", "Teknologi", "Fiksi", "Pengembangan Diri"];

// Menerima data buku dari Server Component (hasil query PostgreSQL),
// lalu menangani filter kategori di browser.
export default function DaftarBuku({ daftarBuku }) {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");

  const bukuTampil =
    kategoriAktif === "Semua"
      ? daftarBuku
      : daftarBuku.filter((buku) => buku.kategori === kategoriAktif);

  return (
    <>
      <p className="mt-1 text-slate-600">
        Menampilkan {bukuTampil.length} dari {daftarBuku.length} buku.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {daftarKategori.map((kategori) => (
          <button
            key={kategori}
            type="button"
            onClick={() => setKategoriAktif(kategori)}
            aria-pressed={kategoriAktif === kategori}
            className={
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors " +
              (kategoriAktif === kategori
                ? "border-indigo-950 bg-indigo-950 text-white"
                : "border-indigo-200 bg-white text-indigo-800 hover:bg-indigo-100")
            }
          >
            {kategori}
          </button>
        ))}
      </div>

      {bukuTampil.length === 0 ? (
        <p className="mt-8 text-slate-600">Belum ada buku pada kategori ini.</p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {bukuTampil.map((buku) => (
            <BukuCard
              key={buku.id}
              id={buku.id}
              judul={buku.judul}
              penulis={buku.penulis}
              kategori={buku.kategori}
              tahun={buku.tahun}
              tersedia={buku.tersedia}
              gambar={buku.gambar}
            />
          ))}
        </div>
      )}
    </>
  );
}
