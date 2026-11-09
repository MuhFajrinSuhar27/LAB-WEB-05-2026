# Pustaka Senja — Tugas Praktikum 9

Website ruang baca komunitas yang melanjutkan identitas dan tampilan Praktikum 8. Aplikasi menggunakan Next.js App Router, React, Tailwind CSS, PostgreSQL, dan driver `pg` dengan raw SQL (tanpa ORM).

## Fitur

- Navbar, Footer, Beranda, Katalog, Detail Buku, dan Usulan Buku dipertahankan.
- Beranda menampilkan statistik total koleksi, buku tersedia, dan buku dipinjam dari PostgreSQL.
- Katalog mengambil daftar buku dari PostgreSQL dan menyediakan filter kategori.
- Detail buku membaca satu baris berdasarkan ID.
- Kelola Buku menyediakan form tambah serta daftar yang dapat diedit atau dihapus.
- Create, Update, dan Delete menggunakan Server Actions.
- Penghapusan meminta konfirmasi di browser sebelum Server Action dijalankan.
- Query dinamis memakai parameterized query (`$1`, `$2`, dan seterusnya).
- `revalidatePath()` memperbarui halaman katalog, detail, kelola buku, dan beranda setelah mutasi.

## Persyaratan

- Node.js 20.9 atau lebih baru.
- npm.
- PostgreSQL aktif.
- Database bernama `pustaka_senja` (atau sesuaikan `DATABASE_URL` dengan nama database yang diberikan laboratorium).

## 1. Siapkan database PostgreSQL

1. Buat database bernama `pustaka_senja` melalui pgAdmin atau SQL:

   ```sql
   CREATE DATABASE pustaka_senja;
   ```

2. Pilih database `pustaka_senja` di pgAdmin.
3. Buka Query Tool.
4. Jalankan isi file `database/01-buat-tabel.sql`.
5. Jalankan isi file `database/02-data-awal.sql`.
6. Pastikan query terakhir menampilkan sembilan buku.

File seed hanya menambahkan buku saat tabel masih kosong. Bila kamu sudah memasukkan sembilan buku secara manual, jangan perlu memasukkan data awal sekali lagi.

## 2. Atur koneksi database

1. Di root project, salin `.env.example` menjadi `.env.local`.
2. Buka `.env.local`.
3. Sesuaikan `DATABASE_URL` dengan username, password, host, port, dan nama database PostgreSQL pada komputermu.

Contoh bentuk connection string (ganti nilai contoh dengan milikmu):

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/pustaka_senja
```

Jangan membagikan `.env.local` dan jangan mengunggahnya ke GitHub. File tersebut sudah dikecualikan melalui `.gitignore`.

## 3. Instal dan jalankan aplikasi

Buka terminal di folder project, kemudian jalankan:

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

Untuk memeriksa kompilasi produksi:

```bash
npm.cmd run build
```

## 4. Pengujian fitur sesuai tugas

1. **Read:** buka `/katalog`; sembilan data awal harus tampil. Buka salah satu detail buku.
2. **Create:** buka `/kelola-buku`, isi semua kolom, lalu klik **Simpan Buku**. Buku baru harus muncul di katalog.
3. **Update:** dari halaman detail atau Kelola Buku, klik **Edit**. Ubah salah satu data, simpan, lalu pastikan katalog dan detail menunjukkan perubahan.
4. **Delete:** klik **Hapus**. Pilih **Cancel** untuk memastikan data tetap ada; ulangi lalu pilih **OK** untuk menghapus buku uji.
5. **Statistik:** kembali ke beranda. Total, tersedia, dan dipinjam harus mengikuti isi tabel.
6. **Persistensi:** muat ulang halaman atau buka ulang browser. Data yang sudah disimpan tetap ada karena tersimpan di PostgreSQL.

Untuk memastikan isi database, jalankan:

```sql
SELECT * FROM buku ORDER BY id;
```

## Struktur utama

```text
Tugas Praktikum-9/
├── database/
│   ├── 01-buat-tabel.sql
│   └── 02-data-awal.sql
├── public/
├── src/
│   ├── app/
│   │   ├── katalog/
│   │   │   ├── action.js
│   │   │   ├── page.jsx
│   │   │   └── [id]/
│   │   │       ├── page.jsx
│   │   │       └── edit/page.jsx
│   │   ├── kelola-buku/page.jsx
│   │   ├── page.jsx
│   │   └── ...
│   ├── components/
│   │   ├── TombolHapus.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ...
│   └── lib/
│       ├── db.js
│       └── buku.js
├── .env.example
├── .gitignore
└── package.json
```

## Catatan data awal

Data awal di `database/02-data-awal.sql` disalin dari sembilan objek dalam `src/data/dataBuku.js` pada project yang diberikan. Di sumber tersebut, status `Filosofi Teras` ditandai `false` dengan komentar bahwa status aslinya perlu dikonfirmasi. Periksa kembali status itu dengan data Praktikum 8 atau arahan dosen bila perlu.
