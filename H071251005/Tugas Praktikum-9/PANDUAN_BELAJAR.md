# Panduan singkat alur Praktikum 9

## READ

`src/app/katalog/page.jsx` dan `src/app/katalog/[id]/page.jsx` adalah Server Components. Keduanya memanggil fungsi di `src/lib/buku.js`, yang menjalankan `SELECT` melalui `pool.query()`.

## CREATE

Form di `/kelola-buku` menggunakan `action={tambahBuku}`. Browser mengirim field form sebagai `FormData` ke Server Action di `src/app/katalog/action.js`. Fungsi tersebut memvalidasi data, menjalankan `INSERT`, memanggil `revalidatePath()`, lalu mengarahkan pengguna ke katalog.

## UPDATE

Halaman `/katalog/[id]/edit` mengambil buku berdasarkan ID. Input tersembunyi `name="id"` mengirim ID buku ke Server Action `ubahBuku`. Query `UPDATE` memiliki `WHERE id = $7`, sehingga hanya buku yang dipilih yang berubah.

## DELETE

Komponen `TombolHapus.jsx` adalah Client Component karena membutuhkan `window.confirm()`. Jika pengguna membatalkan, form tidak dikirim. Jika disetujui, Server Action `hapusBuku` menjalankan `DELETE FROM buku WHERE id = $1`.

## Database

`src/lib/db.js` membuat `Pool` dari variabel lingkungan `DATABASE_URL`. Jangan mengimpor pool ke Client Component dan jangan memasukkan password database ke kode sumber.
