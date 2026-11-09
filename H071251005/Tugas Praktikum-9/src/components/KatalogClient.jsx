"use client";

import { useState } from "react";
import BukuCard from "@/components/BukuCard";


const daftarKategori = ["Semua", "Teknologi", "Fiksi", "Pengembangan Diri", "Lainnya"];

export default function KatalogClient({dataBuku}) {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");

  const bukuTampil =
    kategoriAktif === "Semua"? 
        dataBuku : dataBuku.filter((buku) => 
            buku.kategori === kategoriAktif);

  return (
    <div className="space-y-9">
      <section className="rounded-[2rem] bg-[#eae3d7] px-6 py-9 sm:px-10 sm:py-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b7347]">Jelajahi rak kami</p>
        <div className="mt-3 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-serif text-4xl font-semibold tracking-tight text-[#29382f] sm:text-5xl">Katalog Buku</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#71675a]">Pilih bacaan yang sesuai dengan rasa ingin tahumu. Temukan buku teknologi, fiksi, hingga pengembangan diri.</p>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/60 px-5 py-3 text-sm text-[#665d51]">
            <span className="font-serif text-2xl font-semibold text-[#29382f]">{dataBuku.length}</span>
            <span className="ml-2">judul koleksi</span>
          </div>
        </div>
      </section>

      <section aria-labelledby="filter-heading">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="filter-heading" className="font-serif text-2xl font-semibold text-[#29382f]">Temukan berdasarkan kategori</h2>
            <p className="mt-1 text-sm text-[#8b8071]">Pilih salah satu kategori untuk menyaring buku.</p>
          </div>
          <p className="text-sm text-[#8b8071]">Menampilkan <strong className="text-[#29382f]">{bukuTampil.length}</strong> dari {dataBuku.length} buku</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter kategori buku">
          {daftarKategori.map((kategori) => {
            const aktif = kategoriAktif === kategori;
            return (
              <button
                key={kategori}
                type="button"
                onClick={() => setKategoriAktif(kategori)}
                aria-pressed={aktif}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  aktif
                    ? "bg-[#27382f] text-white shadow-sm"
                    : "border border-[#e6ded2] bg-white text-[#756a5b] hover:border-[#b6c0b1] hover:bg-[#f2f4ef]"
                }`}
              >
                {kategori}
              </button>
            );
          })}
        </div>
      </section>

      {bukuTampil.length > 0 ? (
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-label="Daftar buku">
          {bukuTampil.map((buku) => (
            <BukuCard key={buku.id} buku={buku} />
          ))}
        </section>
      ) : (
        <div className="rounded-3xl border border-dashed border-[#d8cdbd] bg-white p-12 text-center">
          <p className="font-serif text-2xl font-semibold text-[#29382f]">Belum ada buku di kategori ini.</p>
          <p className="mt-2 text-sm text-[#847969]">Pilih kategori lain untuk melihat koleksi.</p>
        </div>
      )}
    </div>
  );
}
