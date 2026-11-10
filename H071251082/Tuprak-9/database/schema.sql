-- Pustaka Senja — skema & data awal
-- Jalankan di Query Tool pgAdmin pada database `pustaka_senja`.
--   CREATE DATABASE pustaka_senja;   (jalankan terpisah, lalu sambungkan ke database tersebut)

DROP TABLE IF EXISTS buku;

CREATE TABLE buku (
  id        SERIAL PRIMARY KEY,
  judul     VARCHAR(150) NOT NULL,
  penulis   VARCHAR(100) NOT NULL,
  kategori  VARCHAR(50)  NOT NULL,
  tahun     INTEGER      NOT NULL,
  tersedia  BOOLEAN      NOT NULL DEFAULT TRUE,
  sinopsis  TEXT         NOT NULL
);

INSERT INTO buku (judul, penulis, kategori, tahun, tersedia, sinopsis) VALUES
('Laskar Pelangi', 'Andrea Hirata', 'Novel', 2005, TRUE,
 'Sepuluh anak dari keluarga sederhana di Belitung bertahan di sekolah Muhammadiyah yang nyaris roboh. Dengan bimbingan dua guru yang gigih, mereka belajar bahwa mimpi tidak menunggu fasilitas yang lengkap.'),
('Bumi Manusia', 'Pramoedya Ananta Toer', 'Novel', 1980, FALSE,
 'Minke, pribumi terpelajar di masa kolonial, jatuh cinta pada Annelies dan berhadapan dengan hukum yang tidak berpihak padanya. Kisah tentang kesadaran, martabat, dan lahirnya semangat kebangsaan.'),
('Laut Bercerita', 'Leila S. Chudori', 'Novel', 2017, TRUE,
 'Sekelompok mahasiswa aktivis menghilang pada akhir masa Orde Baru. Dituturkan dari sudut pandang yang hilang dan keluarga yang menunggu, novel ini merawat ingatan yang enggan dilupakan.'),
('Pulang', 'Leila S. Chudori', 'Novel', 2012, TRUE,
 'Dimas Suryo, eksil politik di Paris, tidak pernah benar-benar bisa kembali ke tanah air. Dari dapur restoran kecil hingga gejolak 1998, ia mencari arti rumah.'),
('Filosofi Teras', 'Henry Manampiring', 'Filsafat', 2018, FALSE,
 'Pengantar Stoisisme yang ditulis santai untuk pembaca masa kini. Intinya sederhana: pisahkan hal yang bisa dikendalikan dari yang tidak, lalu tenang menjalani keduanya.'),
('Atomic Habits', 'James Clear', 'Pengembangan Diri', 2018, TRUE,
 'Perubahan besar lahir dari kebiasaan kecil yang dilakukan konsisten. Buku ini menguraikan cara membangun kebiasaan baik dan melepas yang buruk lewat sistem, bukan sekadar tekad.'),
('Sapiens', 'Yuval Noah Harari', 'Sejarah', 2011, TRUE,
 'Riwayat singkat umat manusia, dari Homo sapiens yang berburu hingga masyarakat modern. Harari menelusuri bagaimana cerita bersama menjadi fondasi agama, uang, dan negara.'),
('Negeri 5 Menara', 'Ahmad Fuadi', 'Novel', 2009, FALSE,
 'Alif berangkat ke pondok di Jawa Timur dengan setengah hati. Di sana ia bertemu lima sahabat dan sebuah mantra: man jadda wajada, siapa bersungguh-sungguh akan berhasil.'),
('Cantik Itu Luka', 'Eka Kurniawan', 'Novel', 2002, TRUE,
 'Dewi Ayu bangkit dari kubur setelah dua puluh satu tahun dan mendapati keluarganya masih diliputi kutukan. Realisme magis yang menyapu sejarah Indonesia dari masa kolonial hingga pascakemerdekaan.');

-- Pemeriksaan: harus menghasilkan 9 baris
SELECT COUNT(*) AS total FROM buku;
