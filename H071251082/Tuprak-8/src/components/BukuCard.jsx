"use client";

import { useState } from "react";
import Link from "next/link";

function BukuCard({ id, judul, penulis, kategori, tahun, tersedia }) {
  const [favorit, setFavorit] = useState(false);

  return (
    <article className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-md">
      <div>
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-blue-600">{kategori}</span>
          <span
            className={
              tersedia
                ? "rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700"
                : "rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-600"
            }
          >
            {tersedia ? "Tersedia" : "Sedang Dipinjam"}
          </span>
        </div>
        <h3 className="text-lg font-semibold">{judul}</h3>
        <p className="mt-1 text-sm text-slate-500">{penulis}</p>
        <p className="text-sm text-slate-400">Terbit {tahun}</p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3">
        <button
          type="button"
          onClick={() => setFavorit(!favorit)}
          className={
            favorit
              ? "rounded-lg bg-blue-100 px-3 py-1.5 text-sm text-blue-700 transition hover:bg-blue-200"
              : "rounded-lg bg-slate-100 px-3 py-1.5 text-sm transition hover:bg-slate-200"
          }
        >
          {favorit ? "★ Favorit" : "☆ Simpan"}
        </button>
        <Link
          href={`/katalog/${id}`}
          className="text-sm text-blue-600 hover:underline"
        >
          Lihat Detail &rarr;
        </Link>
      </div>
    </article>
  );
}

export default BukuCard;
