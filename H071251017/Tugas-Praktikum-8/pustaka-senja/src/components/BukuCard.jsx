"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function BukuCard({ id, judul, penulis, kategori, tahun, tersedia, gambar }) {
  const [favorit, setFavorit] = useState(false);

  return (
    <article className="flex gap-4 rounded-xl border border-indigo-100 bg-white p-4 shadow-sm">
      <Image
        src={gambar}
        alt={`Sampul buku ${judul}`}
        width={400}
        height={600}
        unoptimized
        className="h-36 w-24 shrink-0 rounded-md object-cover shadow"
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold leading-snug text-indigo-950">{judul}</h3>
          <button
            type="button"
            onClick={() => setFavorit(!favorit)}
            aria-pressed={favorit}
            className={
              "shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors " +
              (favorit
                ? "border-rose-500 bg-rose-500 text-white"
                : "border-indigo-200 text-indigo-700 hover:bg-indigo-50")
            }
          >
            {favorit ? "♥ Favorit" : "♡ Simpan"}
          </button>
        </div>

        <p className="mt-1 text-sm text-slate-600">{penulis}</p>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-indigo-100 px-2.5 py-1 font-medium text-indigo-800">
            {kategori}
          </span>
          <span className="text-slate-500">Terbit {tahun}</span>
          <span
            className={
              "rounded-full px-2.5 py-1 font-medium " +
              (tersedia ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800")
            }
          >
            {tersedia ? "Tersedia" : "Sedang Dipinjam"}
          </span>
        </div>

        <Link
          href={`/katalog/${id}`}
          className="mt-auto inline-block self-start rounded-md bg-indigo-950 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-800"
        >
          Lihat Detail
        </Link>
      </div>
    </article>
  );
}
