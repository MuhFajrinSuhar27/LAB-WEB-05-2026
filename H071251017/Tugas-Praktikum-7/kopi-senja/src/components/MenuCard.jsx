import { useState } from "react";

function MenuCard({ id, nama, kategori, harga, tersedia, deskripsi, onTambah }) {
  // State detail milik masing-masing kartu, jadi tidak memengaruhi menu lain
  const [detailTerbuka, setDetailTerbuka] = useState(false);

  return (
    <article
      className={
        "rounded-xl bg-white p-4 shadow-sm ring-1 ring-amber-200 " +
        (tersedia ? "" : "opacity-60")
      }
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold">{nama}</h2>
          <p className="text-xs uppercase tracking-wide text-amber-700">{kategori}</p>
        </div>
        <p className="font-semibold text-amber-900">
          Rp {harga.toLocaleString("id-ID")}
        </p>
      </div>

      {!tersedia && (
        <p className="mt-2 inline-block rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
          Sedang habis
        </p>
      )}

      {detailTerbuka && (
        <p className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-stone-700">
          {deskripsi}
        </p>
      )}

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => setDetailTerbuka(!detailTerbuka)}
          className="rounded-lg px-3 py-2 text-sm text-amber-900 ring-1 ring-amber-300 hover:bg-amber-100"
        >
          {detailTerbuka ? "Tutup Detail" : "Lihat Detail"}
        </button>
        <button
          type="button"
          disabled={!tersedia}
          onClick={() => onTambah(id)}
          className="flex-1 rounded-lg bg-amber-800 px-3 py-2 text-sm font-medium text-white hover:bg-amber-900 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500"
        >
          {tersedia ? "Tambah" : "Habis"}
        </button>
      </div>
    </article>
  );
}

export default MenuCard;
