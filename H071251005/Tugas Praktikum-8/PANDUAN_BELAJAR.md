# Panduan Memahami Kode Pustaka Senja

Dokumen ini membantu kamu mempelajari proyek, bukan hanya menjalankannya.

## Urutan membaca kode

1. `src/data/dataBuku.js` — pahami object, array, `export default`, dan tipe data.
2. `src/app/layout.jsx` — pahami root layout, `children`, import komponen, dan metadata.
3. `src/components/Navbar.jsx` — pahami Client Component, `usePathname()`, `.map()`, dan `Link`.
4. `src/components/Hero.jsx` — pahami props dan destructuring pada Server Component.
5. `src/app/page.jsx` — pahami import data, `.filter()`, `.length`, dan statistik.
6. `src/app/katalog/page.jsx` — pahami `useState`, event `onClick`, conditional rendering, dan `.filter()`.
7. `src/components/BukuCard.jsx` — pahami props, state yang mandiri per komponen, dan dynamic `href`.
8. `src/app/katalog/[id]/page.jsx` — pahami Dynamic Routing, `await params`, dan `.find()`.
9. `src/app/usulan/page.jsx` — pahami controlled input, object state, `onChange`, `onSubmit`, `preventDefault()`, `trim()`, dan list rendering.

## Cara latihan yang disarankan

- Baca satu file terlebih dahulu.
- Tutup file dan coba jelaskan fungsinya dengan kata-katamu sendiri.
- Ubah satu hal kecil, misalnya slogan di Hero atau warna tombol.
- Jalankan website dan lihat perubahan.
- Untuk fitur interaktif, coba gunakan website dan amati state yang berubah.

## Pertanyaan untuk menguji pemahaman

1. Mengapa `Navbar.jsx` membutuhkan `"use client"`, sedangkan `Footer.jsx` tidak?
2. Mengapa data buku disimpan di satu file?
3. Apa perbedaan `.map()`, `.filter()`, dan `.find()`?
4. Mengapa `BukuCard` memiliki `useState` sendiri?
5. Bagaimana folder `[id]` menghasilkan URL seperti `/katalog/4`?
6. Mengapa form menggunakan `event.preventDefault()`?
7. Apa fungsi `trim()` saat memvalidasi form?
8. Mengapa state daftar usulan hilang ketika halaman dimuat ulang?

## Konsep penting

- **Server Component**: komponen default App Router yang tidak membutuhkan interaksi browser.
- **Client Component**: komponen yang menggunakan state, event handler, atau hook browser seperti `usePathname()`.
- **Props**: data yang diberikan komponen induk kepada komponen anak.
- **State**: data internal komponen yang ketika berubah akan memicu React memperbarui tampilan.
- **Dynamic Route**: route yang sebagian alamatnya diambil dari nilai dinamis, dalam tugas ini berupa ID buku.
