# Kedai Kopi Senja — Tugas Praktikum 7

Aplikasi pemesanan menu sederhana menggunakan **React (Vite), JavaScript JSX, dan Tailwind CSS**. Seluruh data menu berada di `src/App.jsx` dan aplikasi tidak membutuhkan server maupun database.

## Fitur

- Menampilkan sembilan menu sesuai data pada soal.
- Filter kategori: Semua, Kopi, Non-Kopi, dan Makanan.
- Detail setiap menu ditampilkan melalui dialog.
- Menu yang tidak tersedia tidak dapat ditambahkan ke pesanan.
- Menambah, mengurangi, dan menghapus item pesanan.
- Jumlah item dan total harga dihitung dari satu state pesanan, lalu ditampilkan di navbar dan ringkasan.
- Validasi nama pemesan, nomor meja, dan pesanan kosong.
- Setelah pesanan berhasil dikirim, aplikasi menampilkan ucapan terima kasih serta mengosongkan form dan keranjang.
- Tampilan responsif untuk layar desktop, tablet, dan ponsel.

## Persyaratan

- Node.js 18 atau lebih baru
- npm

## Cara menjalankan

1. Ekstrak ZIP proyek.
2. Buka terminal pada folder `kopi-senja`.
3. Instal dependensi:

   ```bash
   npm install
   ```

4. Jalankan server pengembangan:

   ```bash
   npm run dev
   ```

5. Buka alamat lokal yang ditampilkan Vite di terminal (biasanya `http://localhost:5173`).

## Membuat build produksi

```bash
npm run build
```

Hasil build akan dibuat pada folder `dist/`.

## Struktur proyek

```text
kopi-senja/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── index.css
    ├── App.jsx
    ├── utils/
    │   └── formatRupiah.js
    └── components/
        ├── Navbar.jsx
        ├── MenuList.jsx
        ├── MenuCard.jsx
        ├── RingkasanPesanan.jsx
        ├── FormPesan.jsx
        └── Footer.jsx
```

## Catatan implementasi

- State dibuat dengan named import `useState` pada level teratas komponen `App`.
- Komponen anak menerima data dan callback melalui props dengan destructuring.
- Data menu hanya ditulis satu kali di `App.jsx`.
- Daftar menu dan pesanan dirender menggunakan `.map()` serta `key` dari ID menu.
- Jumlah item dan total harga merupakan nilai turunan dari state `pesanan`, bukan state duplikat.
- Tidak menggunakan Redux, Context, Zustand, library UI siap pakai, atau manipulasi DOM langsung.
