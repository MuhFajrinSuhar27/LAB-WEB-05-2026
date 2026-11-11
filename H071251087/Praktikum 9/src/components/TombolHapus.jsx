"use client";

import { hapusBuku } from "@/app/katalog/actions";

function TombolHapus({ id, judul = "buku ini", className }) {
  return (
    <form
      action={hapusBuku}
      onSubmit={(e) => {
        if (!confirm(`Yakin ingin menghapus "${judul}"?`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className={
          className ??
          "w-full bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 rounded-lg transition"
        }
      >
        Hapus
      </button>
    </form>
  );
}

export default TombolHapus;