import { useState } from "react";

function MenuCard({ id, nama, harga, tersedia, deskripsi, foto, bahan, onTambah }) {
  const [detailTerbuka, setDetailTerbuka] = useState(false);

  return (
    <article
      className={
        tersedia
          ? "flex gap-4 rounded-2xl bg-white p-4 shadow"
          : "flex gap-4 rounded-2xl bg-stone-200 p-4 opacity-70 shadow"
      }
    >
      <img
        src={foto}
        alt={nama}
        className="h-28 w-28 shrink-0 rounded-xl bg-stone-100 object-cover"
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold">{nama}</h3>
          <span className="font-bold text-custom-blue">
            Rp {harga.toLocaleString("id-ID")}
          </span>
        </div>

        <p className="mt-1 text-sm text-stone-500">{deskripsi}</p>

        {detailTerbuka && (
          <div className="mt-2">
            <p className="text-sm font-medium">Bahan:</p>
            <ul className="list-inside list-disc text-sm text-stone-600">
              {bahan.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto flex gap-2 pt-3">
          <button
            type="button"
            onClick={() => setDetailTerbuka(!detailTerbuka)}
            className="rounded-lg border border-stone-300 px-3 py-1.5 text-sm hover:bg-stone-100"
          >
            {detailTerbuka ? "Tutup detail" : "Lihat detail"}
          </button>
          <button
            type="button"
            disabled={!tersedia}
            onClick={() => onTambah(id)}
            className="flex-1 rounded-lg bg-custom-mint px-3 py-1.5 text-sm font-semibold text-stone-900 hover:bg-stone-200 disabled:cursor-not-allowed disabled:bg-stone-400"
          >
            {tersedia ? "Tambah" : "Habis"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default MenuCard;