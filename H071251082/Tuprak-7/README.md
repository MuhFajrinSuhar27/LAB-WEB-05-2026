# Kedai Kopi Senja

Halaman pemesanan mandiri untuk Kedai Kopi Senja (Tugas Praktikum 7 – React Hooks: State & Props).
Dibangun dengan React (Vite), JavaScript (JSX), dan Tailwind CSS.

## Menjalankan

```bash
npm install
npm run dev
```

Buka alamat yang muncul di terminal (biasanya http://localhost:5173).

## Fitur

- Menampilkan 9 menu beserta harga, dengan filter kategori (Semua, Kopi, Non-Kopi, Makanan).
- Detail setiap menu dibuka sendiri-sendiri.
- Menu yang habis tidak bisa dipesan (tombol nonaktif).
- Jumlah pesanan dan total harga tampil di Navbar dan Ringkasan Pesanan dari satu sumber data yang sama.
- Validasi form: nama, nomor meja, dan pesanan tidak boleh kosong.
- Setelah terkirim: ucapan terima kasih, form dan pesanan dikosongkan.

## Struktur State

| State | Lokasi | Keterangan |
|---|---|---|
| `kategoriAktif` | `App.jsx` | Kategori yang dipilih |
| `pesanan` | `App.jsx` | Daftar `{ id, jumlah }`; jumlah item dan total harga dihitung dari sini |
| `namaTerkirim` | `App.jsx` | Menampilkan ucapan terima kasih |
| `detailTerbuka` | `MenuCard.jsx` | Detail per kartu |
| `nama`, `meja`, `galat` | `FormPesan.jsx` | Isian dan pesan kesalahan form |
