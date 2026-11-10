CREATE TABLE buku (
    id SERIAL PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    penulis VARCHAR(255) NOT NULL,
    kategori VARCHAR(100) NOT NULL,
    tahun INTEGER NOT NULL,
    tersedia BOOLEAN NOT NULL DEFAULT TRUE,
    sinopsis TEXT
);

ALTER TABLE buku
ADD COLUMN gambar VARCHAR(255);

ALTER TABLE buku
ADD COLUMN gambar_belakang VARCHAR(255);


SELECT * FROM buku;

INSERT INTO buku (judul, penulis, kategori, tahun, tersedia, sinopsis, gambar) VALUES
('Clean Code', 'Robert C. Martin', 'Teknologi', 2008, true,
 'Panduan menulis kode perangkat lunak yang bersih, mudah dibaca, dan mudah dipelihara oleh tim pengembang.', '/covers/1.jpg'),
('Designing Data-Intensive Applications', 'Martin Kleppmann', 'Teknologi', 2017, true,
 'Pembahasan mendalam mengenai arsitektur sistem terdistribusi, basis data, dan pengolahan data skala besar.', '/covers/2.jpg'),
('Refactoring', 'Martin Fowler', 'Teknologi', 2018, false,
 'Teknik sistematis untuk memperbaiki struktur internal kode program tanpa mengubah perilaku eksternalnya.', '/covers/3.jpg'),
('Laut Bercerita', 'Leila S. Chudori', 'Fiksi', 2017, true,
 'Kisah persahabatan, perjuangan, dan kehilangan para aktivis mahasiswa di penghujung era Orde Baru.', '/covers/4.jpg'),
('Bumi Manusia', 'Pramoedya Ananta Toer', 'Fiksi', 1980, true,
 'Perjalanan Minke, seorang pemuda pribumi terpelajar, dalam menghadapi ketidakadilan hukum kolonial di awal abad ke-20.', '/covers/5.jpg'),
('Cantik Itu Luka', 'Eka Kurniawan', 'Fiksi', 2002, false,
 'Epos keluarga Dewi Ayu di kota pesisir Halimunda yang memadukan sejarah kelam dengan unsur realisme magis.', '/covers/6.jpg'),
('Atomic Habits', 'James Clear', 'Pengembangan Diri', 2018, true,
 'Cara membangun kebiasaan baik yang bertahan lama dan menghentikan kebiasaan buruk melalui perubahan kecil setiap hari.', '/covers/7.jpg'),
('Deep Work', 'Cal Newport', 'Pengembangan Diri', 2016, true,
 'Strategi melatih fokus mendalam tanpa distraksi untuk menghasilkan karya bernilai tinggi di era digital.', '/covers/8.jpg'),
('Filosofi Teras', 'Henry Manampiring', 'Pengembangan Diri', 2018, true,
 'Penerapan filsafat Stoisisme kuno untuk menjaga ketenangan mental dan mengelola emosi negatif di kehidupan modern.', '/covers/9.jpg');
 

 SELECT * FROM buku ORDER BY id ASC;

 SELECT id, judul, gambar
FROM buku
ORDER BY id ASC;

UPDATE buku
SET gambar = '/images/SampulDepan' || id || '.jpg';

SELECT id, judul, gambar
FROM buku
ORDER BY id ASC;

UPDATE buku SET gambar_belakang = '/images/SampulBelakang1.jpg' WHERE id = 1;

UPDATE buku SET gambar_belakang = '/images/SampulBelakang2.jpg' WHERE id = 2;

UPDATE buku SET gambar_belakang = '/images/SampulBelakang4.jpg' WHERE id = 4;

UPDATE buku SET gambar_belakang = '/images/SampulBelakang5.jpg' WHERE id = 5;

UPDATE buku SET gambar_belakang = '/images/SampulBelakang6.jpg' WHERE id = 6;

UPDATE buku SET gambar_belakang = '/images/SampulBelakang9.jpg' WHERE id = 9;

SELECT id, judul, gambar_belakang
FROM buku
ORDER BY id;

drop table buku;

SELECT
    column_name,
    data_type
FROM information_schema.columns
WHERE table_name = 'buku'
ORDER BY ordinal_position;

SELECT
    LOWER(TRIM(judul::TEXT)) AS judul,
    LOWER(TRIM(penulis::TEXT)) AS penulis,
    COUNT(*) AS jumlah
FROM buku
GROUP BY
    LOWER(TRIM(judul::TEXT)),
    LOWER(TRIM(penulis::TEXT))
HAVING COUNT(*) > 1;

CREATE UNIQUE INDEX buku_judul_penulis_unik
ON buku (
    LOWER(TRIM(judul::TEXT)),
    LOWER(TRIM(penulis::TEXT))
);

