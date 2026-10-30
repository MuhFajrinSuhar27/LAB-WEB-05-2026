import React from 'react';
import formatRupiah from '../utils/formatRupiah.js';

export default function RingkasanPesanan({ menus, pesanan, jumlahItem, totalHarga, onTambah, onKurangi, onHapus }) {
  return (
    <section id="ringkasan" className="scroll-mt-32 rounded-3xl border border-coffee-100 bg-cream p-5 shadow-card sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="eyebrow">Pesananmu</p>
          <h2 className="mt-1 text-xl font-extrabold tracking-tight text-coffee-900">Ringkasan</h2>
        </div>
        <span className="flex h-10 min-w-10 items-center justify-center rounded-2xl bg-coffee-100 px-3 text-sm font-extrabold text-coffee-800">{jumlahItem}</span>
      </div>

      {pesanan.length === 0 ? (
        <div className="my-7 rounded-2xl bg-coffee-50 px-4 py-8 text-center">
          <span className="text-4xl">🧺</span>
          <p className="mt-3 text-sm font-bold text-coffee-800">Keranjang masih kosong</p>
          <p className="mt-1 text-xs leading-relaxed text-stone-500">Tambahkan menu favoritmu untuk mulai memesan.</p>
        </div>
      ) : (
        <ul className="my-5 divide-y divide-coffee-100">
          {pesanan.map((item) => {
            const menu = menus.find((dataMenu) => dataMenu.id === item.menuId);
            if (!menu) return null;
            return (
              <li key={item.menuId} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-coffee-900">{menu.nama}</p>
                    <p className="mt-1 text-xs text-stone-500">{formatRupiah(menu.harga)} / item</p>
                  </div>
                  <button type="button" onClick={() => onHapus(item.menuId)} className="focus-ring rounded-lg px-2 py-1 text-[11px] font-semibold text-rose-600 hover:bg-rose-50">Hapus</button>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 rounded-xl bg-coffee-50 p-1">
                    <button type="button" onClick={() => onKurangi(item.menuId)} aria-label={`Kurangi ${menu.nama}`} className="focus-ring flex h-7 w-7 items-center justify-center rounded-lg bg-white text-sm font-bold text-coffee-800 shadow-sm hover:bg-coffee-100">−</button>
                    <span className="min-w-5 text-center text-sm font-bold tabular-nums text-coffee-900">{item.jumlah}</span>
                    <button type="button" onClick={() => onTambah(item.menuId)} aria-label={`Tambah ${menu.nama}`} className="focus-ring flex h-7 w-7 items-center justify-center rounded-lg bg-white text-sm font-bold text-coffee-800 shadow-sm hover:bg-coffee-100">+</button>
                  </div>
                  <span className="text-sm font-extrabold text-coffee-800">{formatRupiah(menu.harga * item.jumlah)}</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <div className="border-t border-dashed border-coffee-200 pt-4">
        <div className="flex items-center justify-between text-sm text-stone-500">
          <span>Jumlah item</span>
          <span className="font-bold text-coffee-800">{jumlahItem}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-bold text-coffee-900">Total harga</span>
          <span className="text-xl font-extrabold tracking-tight text-coffee-800">{formatRupiah(totalHarga)}</span>
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-stone-400">Total akan diperbarui otomatis setiap kali jumlah menu berubah.</p>
      </div>
    </section>
  );
}
