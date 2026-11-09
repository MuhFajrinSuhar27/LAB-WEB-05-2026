"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ambilSampulBuku } from "@/data/sampulBuku";

export default function BukuCard({ buku }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const gambarSampul = ambilSampulBuku(buku);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#e9e2d7] bg-white shadow-[0_8px_30px_-22px_rgba(53,45,34,0.25)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_-22px_rgba(53,45,34,0.3)]">
      <div className="relative mx-4 mt-4 aspect-[3/4] overflow-hidden rounded-2xl bg-[#f3eee6]">
        {gambarSampul ? (
          <Image
            src={gambarSampul}
            alt={`Sampul buku ${buku.judul}`}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-5 text-center text-sm text-[#817666]">
            Sampul buku belum tersedia.
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-full bg-[#f3eee6] px-3 py-1 text-[11px] font-semibold text-[#6d604f]">{buku.kategori}</span>
          <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold ${buku.tersedia ? "text-[#397451]" : "text-[#a65d53]"}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${buku.tersedia ? "bg-[#4b9669]" : "bg-[#bd7467]"}`} />
            {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
          </span>
        </div>

        <div className="mt-4">
          <h2 className="font-serif text-xl font-semibold leading-snug text-[#29382f]">{buku.judul}</h2>
          <p className="mt-1 text-sm text-[#817666]">{buku.penulis}</p>
        </div>

        <p className="mt-3 text-xs text-[#9b8f7e]">Tahun terbit · {buku.tahun}</p>

        <div className="mt-auto flex items-center gap-2 pt-5">
          <Link href={`/katalog/${buku.id}`} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#27382f] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#3c5547]">
            Lihat detail <span aria-hidden="true">→</span>
          </Link>
          <button
            type="button"
            onClick={() => setIsFavorite((sebelumnya) => !sebelumnya)}
            aria-pressed={isFavorite}
            aria-label={isFavorite ? `Hapus ${buku.judul} dari favorit` : `Simpan ${buku.judul} ke favorit`}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-lg transition ${
              isFavorite ? "border-[#d9a0a0] bg-[#fff0ef] text-[#b34f50]" : "border-[#e9e2d7] bg-white text-[#8c8172] hover:border-[#d5b9a3] hover:text-[#b34f50]"
            }`}
          >
            {isFavorite ? "♥" : "♡"}
          </button>
        </div>
      </div>
    </article>
  );
}
