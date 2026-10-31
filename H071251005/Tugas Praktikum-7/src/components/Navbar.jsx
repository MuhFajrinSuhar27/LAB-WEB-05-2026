import React from 'react';
import formatRupiah from '../utils/formatRupiah.js';

const daftarKategori = ['Semua', 'Kopi', 'Non-Kopi', 'Makanan'];

export default function Navbar({ kategoriAktif, onPilihKategori, jumlahItem, totalHarga }) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-coffee-900 text-white shadow-lg shadow-coffee-900/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <a href="#beranda" className="flex items-center gap-3 self-start rounded-xl focus-ring">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-coffee-100 text-2xl text-coffee-900">☕</span>
          <span>
            <span className="block text-base font-extrabold tracking-wide">Kedai Kopi Senja</span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-coffee-200">Seduh cerita, hangatkan hari</span>
          </span>
        </a>

        <nav aria-label="Kategori menu" className="flex flex-wrap items-center gap-2">
          {daftarKategori.map((kategori) => (
            <button
              key={kategori}
              type="button"
              onClick={() => onPilihKategori(kategori)}
              aria-pressed={kategoriAktif === kategori}
              className={`focus-ring rounded-full px-4 py-2 text-sm font-semibold transition ${
                kategoriAktif === kategori
                  ? 'bg-coffee-100 text-coffee-900 shadow-sm'
                  : 'text-coffee-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              {kategori}
            </button>
          ))}
        </nav>

        <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 lg:min-w-[210px]">
          <div className="flex items-center gap-3">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-coffee-700 text-lg">
              🛍️
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-300 px-1 text-[10px] font-extrabold text-coffee-900">{jumlahItem}</span>
            </span>
            <span>
              <span className="block text-[10px] uppercase tracking-wider text-coffee-200">Total pesanan</span>
              <span className="block text-sm font-bold">{formatRupiah(totalHarga)}</span>
            </span>
          </div>
          <a href="#ringkasan" aria-label="Lihat ringkasan pesanan" className="rounded-lg px-2 py-1 text-xs font-bold text-amber-200 hover:bg-white/10 focus-ring">Lihat ↓</a>
        </div>
      </div>
    </header>
  );
}
