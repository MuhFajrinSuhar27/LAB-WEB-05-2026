# Pustaka Senja

Aplikasi multi-halaman ruang baca komunitas, dibangun dengan Next.js (App Router) dan Tailwind CSS.

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

## Rute

| URL | Berkas | Keterangan |
| --- | --- | --- |
| `/` | `src/app/page.jsx` | Beranda + statistik koleksi |
| `/katalog` | `src/app/katalog/page.jsx` | Filter kategori + daftar buku |
| `/katalog/[id]` | `src/app/katalog/[id]/page.jsx` | Detail buku dinamis |
| `/usulan` | `src/app/usulan/page.jsx` | Form usulan buku |
