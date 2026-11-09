"use client";

import { useState } from "react";
import BukuCard from "@/components/BukuCard";
import dataBuku from "@/data/dataBuku";

const daftarKategori = ["Semua", "Teknologi", "Fiksi", "Pengembangan Diri"];

export default function Katalog() {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");

  const bukuTampil =
    kategoriAktif === "Semua"
      ? dataBuku
      : dataBuku.filter((buku) => buku.kategori === kategoriAktif);

  return (
    <section className="mx-auto max-w-5xl px-5 py-10">
      <h1 className="text-3xl font-bold text-indigo-950">Katalog Buku</h1>
      <p className="mt-1 text-slate-600">
        Menampilkan {bukuTampil.length} dari {dataBuku.length} buku.
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
    </section>
  );
}
