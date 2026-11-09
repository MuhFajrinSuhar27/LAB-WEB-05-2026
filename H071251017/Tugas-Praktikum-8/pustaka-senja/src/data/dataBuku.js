// Satu-satunya sumber data buku Pustaka Senja.
// Diimpor lewat alias: import dataBuku from "@/data/dataBuku";
const dataBuku = [
  {
    id: "1",
    gambar: "/covers/1.jpeg",
    judul: "Clean Code",
    penulis: "Robert C. Martin",
    kategori: "Teknologi",
    tahun: 2008,
    tersedia: true,
    sinopsis:
      "Panduan menulis kode perangkat lunak yang bersih, mudah dibaca, dan mudah dipelihara oleh tim pengembang.",
  },
  {
    id: "2",
    gambar: "/covers/2.jpeg",
    judul: "Designing Data-Intensive Applications",
    penulis: "Martin Kleppmann",
    kategori: "Teknologi",
    tahun: 2017,
    tersedia: true,
    sinopsis:
      "Pembahasan mendalam mengenai arsitektur sistem terdistribusi, basis data, dan pengolahan data skala besar.",
  },
  {
    id: "3",
    gambar: "/covers/3.jpeg",
    judul: "Refactoring",
    penulis: "Martin Fowler",
    kategori: "Teknologi",
    tahun: 2018,
    tersedia: false,
    sinopsis:
      "Teknik sistematis untuk memperbaiki struktur internal kode program tanpa mengubah perilaku eksternalnya.",
  },
  {
    id: "4",
    gambar: "/covers/4.jpeg",
    judul: "Laut Bercerita",
    penulis: "Leila S. Chudori",
    kategori: "Fiksi",
    tahun: 2017,
    tersedia: true,
    sinopsis:
      "Kisah persahabatan, perjuangan, dan kehilangan para aktivis mahasiswa di penghujung era Orde Baru.",
  },
  {
    id: "5",
    gambar: "/covers/5.jpeg",
    judul: "Bumi Manusia",
    penulis: "Pramoedya Ananta Toer",
    kategori: "Fiksi",
    tahun: 1980,
    tersedia: true,
    sinopsis:
      "Perjalanan Minke, seorang pemuda pribumi terpelajar, dalam menghadapi ketidakadilan hukum kolonial di awal abad ke-20.",
  },
  {
    id: "6",
    gambar: "/covers/6.jpeg",
    judul: "Cantik Itu Luka",
    penulis: "Eka Kurniawan",
    kategori: "Fiksi",
    tahun: 2002,
    tersedia: false,
    sinopsis:
      "Epos keluarga Dewi Ayu di kota pesisir Halimunda yang memadukan sejarah kelam dengan unsur realisme magis.",
  },
  {
    id: "7",
    gambar: "/covers/7.jpeg",
    judul: "Atomic Habits",
    penulis: "James Clear",
    kategori: "Pengembangan Diri",
    tahun: 2018,
    tersedia: true,
    sinopsis:
      "Cara membangun kebiasaan baik yang bertahan lama dan menghentikan kebiasaan buruk melalui perubahan kecil setiap hari.",
  },
  {
    id: "8",
    gambar: "/covers/8.jpeg",
    judul: "Deep Work",
    penulis: "Cal Newport",
    kategori: "Pengembangan Diri",
    tahun: 2016,
    tersedia: true,
    sinopsis:
      "Strategi melatih fokus mendalam tanpa distraksi untuk menghasilkan karya bernilai tinggi di era digital.",
  },
  {
    id: "9",
    gambar: "/covers/9.jpeg",
    judul: "Filosofi Teras",
    penulis: "Henry Manampiring",
    kategori: "Pengembangan Diri",
    tahun: 2018,
    tersedia: true,
    sinopsis:
      "Penerapan filsafat Stoisisme kuno untuk menjaga ketenangan mental dan mengelola emosi negatif di kehidupan modern.",
  },
];

export default dataBuku;
