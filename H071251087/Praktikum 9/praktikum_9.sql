CREATE TABLE buku (
	id SERIAL PRIMARY KEY,
	judul VARCHAR(150) NOT NULL,
	penulis VARCHAR(100) NOT NULL,
	kategori VARCHAR(50) NOT NULL,
	tahun INT NOT NULL,
	tersedia BOOLEAN NOT NULL DEFAULT TRUE,
	sinopsis TEXT NOT NULL,
	cover VARCHAR(100),
	belakang VARCHAR(100)
);

INSERT INTO buku (judul, penulis, kategori, tahun, tersedia, sinopsis, cover, belakang) VALUES
('Clean Code', 'Robert C. Martin', 'Teknologi', 2008, TRUE,
 'Panduan menulis kode perangkat lunak yang bersih, mudah dibaca, dan mudah dipelihara oleh tim pengembang.',
 '/covers/clean-code.png', '/covers-belakang/clean-code.png'),
('Designing Data-Intensive Applications', 'Martin Kleppmann', 'Teknologi', 2017, TRUE,
 'Pembahasan mendalam mengenai arsitektur sistem terdistribusi, basis data, dan pengolahan data skala besar.',
 '/covers/designing-data.png', '/covers-belakang/designing-data.png'),
('Refactoring', 'Martin Fowler', 'Teknologi', 2018, FALSE,
 'Teknik sistematis untuk memperbaiki struktur internal kode program tanpa mengubah perilaku eksternalnya.',
 '/covers/refactoring.png', '/covers-belakang/refactoring.png'),
('Laut Bercerita', 'Leila S. Chudori', 'Fiksi', 2017, TRUE,
 'Kisah persahabatan, perjuangan, dan kehilangan para aktivis mahasiswa di penghujung era Orde Baru.',
 '/covers/laut-bercerita.png', '/covers-belakang/laut-bercerita.png'),
('Bumi Manusia', 'Pramoedya Ananta Toer', 'Fiksi', 1980, TRUE,
 'Perjalanan Minke, seorang pemuda pribumi terpelajar, dalam menghadapi ketidakadilan hukum kolonial di awal abad ke-20.',
 '/covers/bumi-manusia.png', '/covers-belakang/bumi-manusia.png'),
('Cantik Itu Luka', 'Eka Kurniawan', 'Fiksi', 2002, FALSE,
 'Epos keluarga Dewi Ayu di kota pesisir Halimunda yang memadukan sejarah kelam dengan unsur realisme magis.',
 '/covers/cantik-itu-luka.png', '/covers-belakang/cantik-itu-luka.png'),
('Atomic Habits', 'James Clear', 'Pengembangan Diri', 2018, TRUE,
 'Cara membangun kebiasaan baik yang bertahan lama dan menghentikan kebiasaan buruk melalui perubahan kecil setiap hari.',
 '/covers/atomic-habits.png', '/covers-belakang/atomic-habits.png'),
('Deep Work', 'Cal Newport', 'Pengembangan Diri', 2016, TRUE,
 'Strategi melatih fokus mendalam tanpa distraksi untuk menghasilkan karya bernilai tinggi di era digital.',
 '/covers/deep-work.png', '/covers-belakang/deep-work.png'),
('Filosofi Teras', 'Henry Manampiring', 'Pengembangan Diri', 2018, TRUE,
 'Penerapan filsafat Stoisisme kuno untuk menjaga ketenangan mental dan mengelola emosi negatif di kehidupan modern.',
 '/covers/filosofi-teras.png', '/covers-belakang/filosofi-teras.png');

SELECT * FROM buku ORDER BY id;
SELECT id, cover, belakang FROM buku ORDER BY id;

CREATE UNIQUE INDEX buku_judul_penulis_unik
ON buku (LOWER(judul), LOWER(penulis));

--DROP TABLE buku;