"use client";

import { useState } from "react";
import Link from "next/link";

function BukuCard({ id, cover, judul, penulis, kategori, tahun, tersedia }) {
  const [favorit, setFavorit] = useState(false);

  return (
    <article className="bg-custom-soft-pink rounded-none shadow-lg p-4 flex flex-col gap-4 h-full">
      <div className="flex gap-4 flex-1">
        <img
          src={cover}
          alt={judul}
          className="w-32 sm:w-36 aspect-square object-cover rounded-none shadow-none shrink-0 self-start"
        />
        <div className="flex-1 text-pink-950">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-custom-maroon">
              {kategori}
            </span>
            <span
              className={
                tersedia
                  ? "text-xs bg-custom-sage text-white px-2.5 py-1 rounded-lg"
                  : "text-xs bg-custom-red text-white px-2.5 py-1 rounded-lg"
              }
            >
              {tersedia ? "Tersedia" : "Sedang Dipinjam"}
            </span>
          </div>
          <h3 className="text-lg font-bold leading-snug">{judul}</h3>
          <p className="text-sm text-pink-900/80 mt-1">{penulis}</p>
          <p className="text-xs text-stone-600 mt-1">Terbit {tahun}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setFavorit(!favorit)}
          className={
            favorit
              ? "bg-pink-600 text-white text-sm font-medium py-2 rounded-lg transition"
              : "bg-white/70 hover:bg-white text-pink-900 text-sm font-medium py-2 rounded-lg transition"
          }
        >
          {favorit ? "★ Favorit" : "☆ Favorit"}
        </button>
        <Link
          href={`/katalog/${id}`}
          className="bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium py-2 rounded-lg text-center transition"
        >
          Lihat Detail
        </Link>
      </div>
    </article>
  );
}

export default BukuCard;