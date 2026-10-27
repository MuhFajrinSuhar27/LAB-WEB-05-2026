# Kedai Kopi Senja

Halaman pemesanan mandiri untuk Kedai Kopi Senja (Tugas Praktikum 7 | React Hooks: State & Props).

## Teknologi
React (Vite), JavaScript (JSX), function component, `useState`, Tailwind CSS v3.

## Menjalankan
```bash
npm install
npm run dev
```
Buka alamat yang tampil di terminal (biasanya http://localhost:5173).

## Struktur
- `src/App.jsx` — data menu (satu sumber) dan state utama (pesanan, kategori aktif, pesan terima kasih)
- `src/components/` — Navbar, MenuList, MenuCard, RingkasanPesanan, FormPesan, Footer

## Fitur
- Filter kategori (Semua, Kopi, Non-Kopi, Makanan)
- Detail menu dibuka per kartu tanpa memengaruhi menu lain
- Menu habis tidak bisa dipesan
- Jumlah & total pesanan di Navbar dan Ringkasan berasal dari satu state yang sama
- Validasi form (nama, nomor meja, pesanan kosong); setelah terkirim, form dan pesanan dikosongkan
