"use client";

import { useState } from "react";
import Link from "next/link";

export default function BukuCard({ buku }) {
  const [favorit, setFavorit] = useState(false);

  const gambarSampul = `/images/SampulDepan${buku.id}.jpg`;

  return (
    <div className="overflow-hidden rounded-3xl border border-purple-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Bagian Sampul Buku */}
      <div className="relative flex h-64 items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-purple-200 p-5">

        <button
          onClick={() => setFavorit(!favorit)}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl shadow-sm transition hover:scale-110"
          aria-label="Favorit"
        >
          {favorit ? "♥" : "♡"}
        </button>

        <img
          src={gambarSampul}
          alt={`Sampul depan ${buku.judul}`}
          className="h-full max-w-full rounded-lg object-contain shadow-lg"
        />

        <span
          className={`absolute bottom-4 left-4 rounded-full px-3 py-1 text-xs font-semibold ${
            buku.tersedia
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
        </span>

      </div>

      {/* Informasi Buku */}
      <div className="p-5">

        <p className="text-xs font-semibold uppercase tracking-wide text-purple-500">
          {buku.kategori}
        </p>

        <h2 className="mt-3 text-lg font-bold text-purple-900">
          {buku.judul}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {buku.penulis}
        </p>

        <div className="mt-5 flex items-center justify-between">

          <span className="text-sm font-medium text-purple-500">
            Tahun {buku.tahun}
          </span>

          <Link
            href={`/katalog/${buku.id}`}
            className="rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700 transition hover:bg-purple-200"
          >
            Lihat Detail →
          </Link>

        </div>
      </div>

    </div>
  );
}