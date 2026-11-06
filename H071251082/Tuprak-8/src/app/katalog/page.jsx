"use client";

import { useState } from "react";
import BukuCard from "@/components/BukuCard";
import dataBuku from "@/data/dataBuku";

const daftarKategori = ["Semua", "Teknologi", "Fiksi", "Pengembangan Diri"];

export default function KatalogPage() {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");

  const bukuTampil =
    kategoriAktif === "Semua"
      ? dataBuku
      : dataBuku.filter((buku) => buku.kategori === kategoriAktif);

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Katalog Buku</h1>
        <p className="mt-1 text-slate-500">
          Temukan koleksi buku Pustaka Senja berdasarkan kategori.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {daftarKategori.map((kategori) => (
          <button
            key={kategori}
            type="button"
            onClick={() => setKategoriAktif(kategori)}
            className={
              kategoriAktif === kategori
                ? "rounded-full bg-blue-600 px-4 py-1.5 text-sm font-medium text-white"
                : "rounded-full bg-slate-100 px-4 py-1.5 text-sm text-slate-600 transition hover:bg-slate-200"
            }
          >
            {kategori}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {bukuTampil.map((buku) => (
          <BukuCard
            key={buku.id}
            id={buku.id}
            judul={buku.judul}
            penulis={buku.penulis}
            kategori={buku.kategori}
            tahun={buku.tahun}
            tersedia={buku.tersedia}
          />
        ))}
      </div>
    </section>
  );
}
