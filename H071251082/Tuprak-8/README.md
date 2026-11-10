# Pustaka Senja

Website ruang baca komunitas multi-halaman — Tugas Praktikum 8 (Next.js App Router + Tailwind CSS).

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

## Halaman

| URL | Berkas | Keterangan |
|---|---|---|
| `/` | `src/app/page.jsx` | Beranda: Hero + statistik koleksi (dihitung dari data) |
| `/katalog` | `src/app/katalog/page.jsx` | Daftar buku + filter kategori |
| `/katalog/[id]` | `src/app/katalog/[id]/page.jsx` | Detail buku dinamis |
| `/usulan` | `src/app/usulan/page.jsx` | Form usulan buku |

## Catatan

- Data 9 buku hanya ditulis sekali di `src/data/dataBuku.js`.
- `"use client"` hanya dipakai di `Navbar`, `BukuCard`, `katalog/page`, dan `usulan/page`.
