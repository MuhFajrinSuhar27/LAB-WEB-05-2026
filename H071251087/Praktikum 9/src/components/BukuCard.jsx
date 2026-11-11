"use client";

import { useState } from "react";
import Link from "next/link";
import TombolHapus from "@/components/TombolHapus";

function BukuCard({ id, cover, judul, penulis, kategori, tahun, tersedia }) {
  const [favorit, setFavorit] = useState(false);

  return (
    <article className="bg-custom-soft-pink rounded-none shadow-lg p-5 flex flex-col gap-4 h-full min-h-[260px]">
      <div className="flex gap-4 flex-1">
        <div className="w-28 sm:w-32 shrink-0 flex flex-col gap-2">
          {cover ? (
            <img
              src={cover}
              alt={judul}
              className="w-full aspect-square object-cover rounded-none shadow-none"
            />
          ) : (
            <div className="w-full aspect-square bg-white/70 text-xs text-stone-600 flex items-center justify-center text-center">
              Belum ada sampul
            </div>
          )}
          <span className="text-xs font-semibold text-center text-custom-maroon">
            {kategori}
          </span>
        </div>

        <div className="flex-1 min-w-0 text-pink-950">
          <div className="flex items-center justify-between gap-1 mb-2">
            <span
              className={
                tersedia
                  ? "text-[11px] bg-custom-sage text-white px-2 py-1 rounded-lg whitespace-nowrap"
                  : "text-[11px] bg-custom-red text-white px-2 py-1 rounded-lg whitespace-nowrap"
              }
            >
              {tersedia ? "Tersedia" : "Sedang Dipinjam"}
            </span>
            <button
              type="button"
              onClick={() => setFavorit(!favorit)}
              aria-label={favorit ? "Hapus dari favorit" : "Tambah ke favorit"}
              aria-pressed={favorit}
              className="shrink-0 p-0.5 rounded-full transition hover:scale-110"
            >
              <svg
                viewBox="0 0 24 24"
                className={
                  favorit
                    ? "w-5 h-5 fill-pink-600 stroke-pink-600"
                    : "w-5 h-5 fill-transparent stroke-pink-900"
                }
                strokeWidth="2"
                strokeLinejoin="round"
              >
                <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.6 4.5 6.3 4.5c2.1 0 3.6 1.2 4.4 2.5.4.6 1.2.6 1.6 0 .8-1.3 2.3-2.5 4.4-2.5 3.7 0 5.4 3.9 3.9 7.3C19.5 16.4 12 21 12 21z" />
              </svg>
            </button>
          </div>
          <h3 className="text-lg font-bold leading-snug break-words">{judul}</h3>
          <p className="text-sm text-pink-900/80 mt-1">{penulis}</p>
          <p className="text-xs text-stone-600 mt-1">Terbit {tahun}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Link
          href={`/katalog/${id}`}
          className="bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium py-2 rounded-lg text-center transition"
        >
          Lihat Detail
        </Link>
        <TombolHapus id={id} judul={judul} />
      </div>
    </article>
  );
}

export default BukuCard;