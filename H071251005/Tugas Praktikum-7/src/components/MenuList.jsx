import React from 'react';
import MenuCard from './MenuCard.jsx';

export default function MenuList({ menus, pesanan, onTambah, onLihatDetail }) {
  return (
    <section id="menu" className="scroll-mt-32">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Dibuat dengan sepenuh hati</p>
          <h2 className="section-title mt-2">Menu favoritmu</h2>
          <p className="mt-2 text-sm text-stone-500">Pilih yang kamu suka, kami siapkan dengan hangat.</p>
        </div>
        <span className="rounded-full border border-coffee-200 bg-white px-4 py-2 text-xs font-bold text-coffee-700">{menus.length} pilihan menu</span>
      </div>

      {menus.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {menus.map((menu) => (
            <MenuCard
              key={menu.id}
              menu={menu}
              jumlahDiKeranjang={pesanan.find((item) => item.menuId === menu.id)?.jumlah ?? 0}
              onTambah={onTambah}
              onLihatDetail={onLihatDetail}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-coffee-200 bg-white/70 px-6 py-14 text-center">
          <span className="text-4xl">🍃</span>
          <h3 className="mt-3 font-bold text-coffee-900">Belum ada menu di kategori ini</h3>
          <p className="mt-1 text-sm text-stone-500">Silakan pilih kategori lainnya.</p>
        </div>
      )}
    </section>
  );
}
