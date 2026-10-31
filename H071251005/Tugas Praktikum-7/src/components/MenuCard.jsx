import React from 'react';
import formatRupiah from '../utils/formatRupiah.js';

export default function MenuCard({ menu, jumlahDiKeranjang, onTambah, onLihatDetail }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-coffee-100 bg-cream shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <button
        type="button"
        onClick={() => onLihatDetail(menu)}
        className="focus-ring relative flex h-36 w-full items-center justify-center overflow-hidden bg-gradient-to-br from-coffee-100 via-[#f8eee3] to-[#e8d5c1] text-6xl transition group-hover:brightness-[1.02]"
        aria-label={`Lihat detail ${menu.nama}`}
      >
        <img
          src={menu.gambar}
          alt={menu.nama}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-coffee-700 backdrop-blur">{menu.kategori}</span>
        {!menu.tersedia && (
          <span className="absolute right-3 top-3 rounded-full bg-coffee-900/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">Habis</span>
        )}
        {jumlahDiKeranjang > 0 && (
          <span className="absolute bottom-3 right-3 flex h-7 min-w-7 items-center justify-center rounded-full bg-coffee-800 px-2 text-xs font-extrabold text-white shadow">{jumlahDiKeranjang}</span>
        )}
      </button>

      <div className="flex flex-1 flex-col p-5">
        <button type="button" onClick={() => onLihatDetail(menu)} className="focus-ring self-start text-left text-lg font-extrabold tracking-tight text-coffee-900 hover:text-coffee-600">
          {menu.nama}
        </button>
        <p className="mt-2 line-clamp-2 min-h-[40px] text-sm leading-relaxed text-stone-500">{menu.deskripsi}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="text-base font-extrabold text-coffee-700">{formatRupiah(menu.harga)}</span>
          <button
            type="button"
            onClick={() => onTambah(menu.id)}
            disabled={!menu.tersedia}
            className="focus-ring rounded-xl bg-coffee-800 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-coffee-700 disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-400 disabled:shadow-none"
          >
            {menu.tersedia ? '+ Tambah' : 'Tidak tersedia'}
          </button>
        </div>
      </div>
    </article>
  );
}
