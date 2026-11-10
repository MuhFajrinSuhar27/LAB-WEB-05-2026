# Pustaka Senja — Praktikum 9

Next.js App Router + PostgreSQL (driver `pg`, raw SQL, tanpa ORM) + Tailwind CSS.

## Menjalankan

1. Buat database `pustaka_senja` di PostgreSQL.
2. Buka Query Tool pgAdmin pada database tersebut, jalankan isi `database/schema.sql`
   (membuat tabel `buku` dan 9 data awal).
3. Salin `.env.example` menjadi `.env.local`, isi `DATABASE_URL` dengan kredensial Anda.
4. `npm install`
5. `npm run dev` lalu buka http://localhost:3000

## Peta fitur

| Fitur | Berkas | Query |
|---|---|---|
| Koneksi (Pool) | `src/lib/db.js` | — |
| Read (daftar, detail, statistik) | `src/lib/queries.js` | `SELECT` + parameter |
| Create | `src/app/katalog/actions.js` → `tambahBuku` | `INSERT INTO ... RETURNING id` |
| Update | `src/app/katalog/actions.js` → `ubahBuku` | `UPDATE ... WHERE id = $7` |
| Delete | `src/app/katalog/actions.js` → `hapusBuku` | `DELETE ... WHERE id = $1` |
| Konfirmasi hapus | `src/components/TombolHapus.jsx` (`"use client"`) | — |

Semua query memakai parameter (`$1`, `$2`, …). `db.js` dan `queries.js` memakai `server-only`,
sehingga build gagal bila tidak sengaja diimpor dari Client Component.
