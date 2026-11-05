"use client";

import { useState } from "react";
import Link from "next/link";

const gayaSampul = {
  "1": "from-[#263c35] via-[#426052] to-[#152820]",
  "2": "from-[#344b68] via-[#647d95] to-[#24384f]",
  "3": "from-[#a65f43] via-[#cb8a64] to-[#75412f]",
  "4": "from-[#6d3f46] via-[#a66b6c] to-[#482c37]",
  "5": "from-[#8e6b3e] via-[#c19b62] to-[#5e482d]",
  "6": "from-[#52415a] via-[#86708d] to-[#362c40]",
  "7": "from-[#9a7540] via-[#d0a85e] to-[#70512d]",
  "8": "from-[#294e5a] via-[#4b7b82] to-[#203a45]",
  "9": "from-[#3d5143] via-[#71846a] to-[#29392e]",
};

export default function BukuCard({ buku }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const warnaSampul = gayaSampul[buku.id] || "from-[#52645a] to-[#293b32]";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#e9e2d7] bg-white shadow-[0_8px_30px_-22px_rgba(53,45,34,0.25)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_-22px_rgba(53,45,34,0.3)]">
      <div className={`relative mx-4 mt-4 flex aspect-[16/10] items-end overflow-hidden rounded-2xl bg-gradient-to-br ${warnaSampul} p-5`}>
        <div className="absolute -right-8 -top-12 h-40 w-40 rounded-full border border-white/20" />
        <div className="absolute left-5 top-5 h-7 w-1 rounded-full bg-white/50" />
        <div className="relative z-10 max-w-[85%]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-white/65">Pustaka Senja · Koleksi {buku.id.padStart(2, "0")}</p>
          <p className="mt-3 font-serif text-2xl font-semibold leading-tight text-white drop-shadow-sm">{buku.judul}</p>
          <p className="mt-2 text-xs text-white/75">{buku.penulis}</p>
        </div>
        <span className="absolute bottom-4 right-4 text-4xl text-white/20" aria-hidden="true">✳</span>
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
