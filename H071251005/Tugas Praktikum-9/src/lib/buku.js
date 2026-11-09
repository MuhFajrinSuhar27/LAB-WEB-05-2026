import pool from "@/lib/db";

// READ: mengambil semua buku yang tersimpan di PostgreSQL.
export async function ambilSemuaBuku() {
  const hasilQuery = await pool.query(
    "SELECT id, judul, penulis, kategori, tahun, tersedia, sinopsis FROM buku ORDER BY id ASC"
  );

  return hasilQuery.rows;
}

// READ: mengambil satu buku menggunakan ID dari URL.
export async function ambilBukuBerdasarkanId(id) {
  const idBuku = Number(id);

  if (!Number.isInteger(idBuku) || idBuku <= 0) {
    return null;
  }

  const hasilQuery = await pool.query(
    "SELECT id, judul, penulis, kategori, tahun, tersedia, sinopsis FROM buku WHERE id = $1",
    [idBuku]
  );

  return hasilQuery.rows[0] ?? null;
}



// Statistik beranda dihitung langsung dari data PostgreSQL.
export async function ambilStatistikBuku() {
  const hasilQuery = await pool.query(`
    SELECT
      COUNT(*)::int AS total_buku,
      COUNT(*) FILTER (WHERE tersedia = TRUE)::int AS buku_tersedia,
      COUNT(*) FILTER (WHERE tersedia = FALSE)::int AS buku_dipinjam
    FROM buku
  `);

  return hasilQuery.rows[0];
}
