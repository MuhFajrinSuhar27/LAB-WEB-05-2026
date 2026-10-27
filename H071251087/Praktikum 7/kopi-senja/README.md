# Kopi Senja

Halaman pemesanan mandiri untuk Kedai Kopi Senja. Dibuat dengan React (Vite), JavaScript (JSX), dan Tailwind CSS untuk Tugas Praktikum 7: React Hooks (State & Props).

## Menjalankan

```bash
npm install
npm run dev
```

Buka alamat yang tampil di terminal (biasanya http://localhost:5173).

## Fitur

- Menampilkan 9 menu beserta harga, difilter per kategori (Kopi, Non-Kopi, Makanan).
- Tiap menu punya detail (deskripsi) yang bisa dibuka sendiri-sendiri.
- Menu yang habis ditandai dan tombol pesannya dinonaktifkan.
- Jumlah item dan total harga tampil di Navbar dan di Ringkasan Pesanan dari sumber data yang sama.
- Form nama dan nomor meja dengan validasi, serta pesan jika pesanan kosong.
- Setelah terkirim: ucapan terima kasih, form dan pesanan dikosongkan.

## Pembagian state

| State | Lokasi | Keterangan |
| --- | --- | --- |
| `kategoriAktif` | `App.jsx` | Kategori yang sedang dipilih (dikirim ke Navbar lewat props) |
| `pesanan` | `App.jsx` | Array `{ id, jumlah }`; total item dan harga dihitung dari sini |
| `detailTerbuka` | `MenuCard.jsx` | Per kartu, sehingga tidak memengaruhi menu lain |
| `nama`, `meja`, error, `terkirim` | `FormPesan.jsx` | Controlled component |

## Struktur

```
src/
├── main.jsx
├── index.css
├── App.jsx            (data menu + state utama)
└── components/
    ├── Navbar.jsx
    ├── MenuList.jsx
    ├── MenuCard.jsx
    ├── RingkasanPesanan.jsx
    ├── FormPesan.jsx
    └── Footer.jsx
```
