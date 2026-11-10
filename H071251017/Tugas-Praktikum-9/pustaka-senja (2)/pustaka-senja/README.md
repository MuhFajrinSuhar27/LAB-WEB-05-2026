# Pustaka Senja (Praktikum 9: Next.js + PostgreSQL)

Aplikasi ruang baca dengan Next.js App Router, Tailwind CSS, dan PostgreSQL
(driver `pg`, raw SQL, tanpa ORM).

## Cara menjalankan

1. Buat database `pustaka_senja` di PostgreSQL (pgAdmin).
2. Buka Query Tool pada database itu, lalu jalankan isi `database/schema.sql`
   (membuat tabel `buku` dan mengisi 9 buku awal).
3. Salin `.env.example` menjadi `.env.local`, lalu isi `DATABASE_URL`
   dengan user, password, dan port PostgreSQL milikmu.
4. Jalankan:

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

## Rute

| URL | Fungsi |
| --- | --- |
| `/` | Beranda + statistik dari database |
| `/katalog` | Daftar buku (Read), filter kategori, tombol Edit dan Hapus |
| `/katalog/tambah` | Form tambah buku (Create) |
| `/katalog/[id]` | Detail buku |
| `/katalog/[id]/edit` | Form ubah buku (Update) |
| `/usulan` | Form usulan buku |

## Struktur penting

- `src/lib/db.js` : koneksi `Pool` (hanya dipakai kode server)
- `src/lib/buku.js` : query SELECT
- `src/app/katalog/actions.js` : Server Actions INSERT, UPDATE, DELETE
- `src/components/TombolHapus.jsx` : tombol hapus + konfirmasi (Client Component)
- `.env.local` : berisi `DATABASE_URL`, jangan diunggah ke repositori
