"use client";

import { useTransition } from "react";
import { hapusBuku } from "@/app/katalog/actions";

export default function HapusBukuButton({ id }) {
  const [sedangMenghapus, mulaiMenghapus] = useTransition();

  function handleHapus() {
    const yakin = window.confirm(
      "Apakah kamu yakin ingin menghapus buku ini?"
    );

    if (yakin) {
      mulaiMenghapus(async () => {
        await hapusBuku(id);
      });
    }
  }

  return (
    <button
      type="button"
      onClick={handleHapus}
      disabled={sedangMenghapus}
      className="rounded-full bg-red-100 px-7 py-3 font-medium text-red-600 transition hover:bg-red-200 disabled:opacity-50"
    >
      {sedangMenghapus ? "Menghapus..." : "Hapus Buku"}
    </button>
  );
}
