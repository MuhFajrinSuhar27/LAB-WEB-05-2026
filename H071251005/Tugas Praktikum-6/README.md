# Portofolio Mukhsin — Tugas Praktikum 6

Website portofolio satu halaman menggunakan React, Vite, dan Tailwind CSS. Struktur komponennya dibuat mengikuti enam komponen yang diminta pada lembar tugas: `Navbar`, `Hero`, `About`, `Skills`, `Gallery`, dan `Footer`.

## Menjalankan proyek

Pastikan Node.js sudah terpasang. Buka terminal di folder proyek, lalu jalankan:

```bash
npm install
npm run dev
```

Buka URL yang ditampilkan Vite (biasanya `http://localhost:5173`). Untuk mengecek build produksi, jalankan `npm run build`.

## Peta file

- `src/App.jsx` — mengimpor dan memanggil semua komponen secara berurutan.
- `src/components/Navbar.jsx` — logo dan menu navigasi dari array, `.map()`, `key`, serta `onClick` yang mencetak nama menu ke console.
- `src/components/Hero.jsx` — sapaan, deskripsi, foto dari `public/foto-profil.jpg`, dan tombol `onClick`.
- `src/components/About.jsx` — paragraf perkenalan dan data diri dari array of object dengan `key={item.id}`.
- `src/components/Skills.jsx` — enam keahlian dari array string dengan `.map()` dan `key={index}`.
- `src/components/Gallery.jsx` — empat aset lokal dari `src/assets/gallery/`, dirender dari array of object dengan `key={foto.id}`.
- `src/components/Footer.jsx` — nama dan tahun hak cipta.

## Catatan

- Data profil mengikuti informasi yang sudah tersedia pada proyek. Periksa kembali isinya sebelum dikumpulkan.
- Dua aset galeri berasal dari aset yang sudah ada di proyek; dua lainnya adalah ilustrasi SVG bertema belajar dan pengembangan web.
- Fungsi dan komponen tidak menggunakan `useState` atau `props`, sesuai ketentuan pada lembar tugas.
