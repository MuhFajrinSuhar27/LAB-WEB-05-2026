import pool from "@/lib/db";

// ID dari URL harus bilangan bulat positif dan muat di tipe INTEGER PostgreSQL.
export function idValid(id) {
  return /^\d+$/.test(String(id)) && Number(id) > 0 && Number(id) <= 2147483647;
}

// READ: semua buku
export async function getSemuaBuku() {
  const hasil = await pool.query(
    "SELECT id, judul, penulis, kategori, tahun, tersedia, sinopsis, gambar FROM buku ORDER BY id ASC"
  );
  return hasil.rows;
}

// READ: satu buku berdasarkan id (parameterized query)
export async function getBukuById(id) {
  if (!idValid(id)) return null;
  const hasil = await pool.query(
    "SELECT id, judul, penulis, kategori, tahun, tersedia, sinopsis, gambar FROM buku WHERE id = $1",
    [Number(id)]
  );
  return hasil.rows[0] ?? null;
}

// READ: statistik koleksi untuk Beranda
export async function getStatistik() {
  const hasil = await pool.query(
    `SELECT
       COUNT(*)::int AS total,
       COUNT(*) FILTER (WHERE tersedia)::int AS tersedia,
       COUNT(*) FILTER (WHERE NOT tersedia)::int AS dipinjam
     FROM buku`
  );
  return hasil.rows[0];
}
