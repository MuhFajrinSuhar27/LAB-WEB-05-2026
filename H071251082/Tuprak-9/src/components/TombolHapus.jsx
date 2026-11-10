"use client";

import { useState } from "react";
import { hapusBuku } from "@/app/katalog/actions";

export default function TombolHapus({ id, judul }) {
  const [konfirmasi, setKonfirmasi] = useState(false);

  if (!konfirmasi) {
    return (
      <button
        type="button"
        onClick={() => setKonfirmasi(true)}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-galat"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
        <span>Hapus</span>
      </button>
    );
  }

  return (
    <form
      action={hapusBuku}
      className="inline-flex flex-wrap items-center gap-3 rounded-2xl border border-galat/30 bg-red-50/80 p-2 pl-3.5 text-xs shadow-xs"
      role="alertdialog"
      aria-label={`Konfirmasi hapus ${judul}`}
    >
      <input type="hidden" name="id" value={id} />
      <span className="font-medium text-galat">Hapus buku ini?</span>
      <button
        type="submit"
        className="rounded-full bg-galat px-3 py-1 font-medium text-white transition-opacity hover:opacity-90 active:scale-95"
      >
        Ya, hapus
      </button>
      <button
        type="button"
        onClick={() => setKonfirmasi(false)}
        className="rounded-full bg-white px-2.5 py-1 font-medium text-muted transition-colors hover:text-ink"
        autoFocus
      >
        Batal
      </button>
    </form>
  );
}
