"use client";

import { useState, useTransition } from "react";
import { hapusBuku } from "@/app/katalog/actions";

export default function TombolHapus({ id, judul, kembaliKeKatalog = false }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState(null);

  const handleClick = () => {
    // Konfirmasi dulu. Jika dibatalkan, tidak ada yang dihapus.
    const setuju = window.confirm(`Hapus buku "${judul}"? Tindakan ini tidak bisa dibatalkan.`);
    if (!setuju) return;

    setError(null);
    startTransition(async () => {
      const hasil = await hapusBuku(id, kembaliKeKatalog);
      if (hasil?.error) setError(hasil.error);
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={pending}
        className="rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
      >
        {pending ? "Menghapus..." : "Hapus"}
      </button>
      {error && <span className="text-xs text-red-700">{error}</span>}
    </>
  );
}
