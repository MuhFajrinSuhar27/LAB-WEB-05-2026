# Pustaka Senja — Tugas Praktikum 8

Website ruang baca komunitas yang dibuat dengan **Next.js App Router**, **JavaScript**, dan **Tailwind CSS**.

## Fitur

- Navbar dan Footer bersama melalui `src/app/layout.jsx`.
- Penanda menu aktif dengan `usePathname()`.
- Beranda dengan statistik yang dihitung dari data buku.
- Katalog 9 buku dengan filter kategori.
- Tombol favorit mandiri pada setiap kartu buku.
- Halaman detail buku dinamis melalui `/katalog/[id]`.
- Halaman usulan buku dengan controlled component, validasi `trim()`, dan daftar usulan pada sesi halaman.
- Data buku hanya ditulis satu kali di `src/data/dataBuku.js`.

## Persyaratan

- Node.js minimal 20.9.
- npm.

## Cara menjalankan di Windows

1. Ekstrak file ZIP.
2. Buka folder `pustaka-senja` melalui VS Code.
3. Buka terminal VS Code.
4. Jalankan instalasi dependensi:

   ```bash
   npm.cmd install
   ```

5. Jalankan server pengembangan:

   ```bash
   npm.cmd run dev
   ```

6. Buka `http://localhost:3000` di browser.

Jika PowerShell memblokir `npm`, gunakan `npm.cmd` seperti contoh di atas.

## Struktur utama

```text
pustaka-senja/
├── public/
├── src/
│   ├── data/
│   │   └── dataBuku.js
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── BukuCard.jsx
│   │   └── Footer.jsx
│   └── app/
│       ├── globals.css
│       ├── layout.jsx
│       ├── page.jsx
│       ├── katalog/
│       │   ├── page.jsx
│       │   └── [id]/page.jsx
│       └── usulan/page.jsx
├── jsconfig.json
├── postcss.config.mjs
└── package.json
```

## Catatan data dari PDF tugas

Pada tabel PDF, kolom `tersedia` untuk buku **Filosofi Teras** tampak kosong/tidak terbaca. Agar properti tetap bertipe boolean, proyek ini sementara mengisinya dengan `false`. Periksa kembali kepada dosen atau sumber data kelas jika status yang benar berbeda. Ubah hanya nilai `tersedia` pada objek dengan `id: "9"` di `src/data/dataBuku.js` jika diperlukan.

## Catatan fitur

- Favorit menggunakan state lokal pada masing-masing kartu; belum disimpan ke database/localStorage.
- Usulan buku disimpan dalam state halaman; sesuai instruksi tugas, daftar hanya bertahan selama sesi halaman dan hilang ketika halaman dimuat ulang.
- Proyek ini tidak memakai database atau API eksternal.
