import "server-only";
import { pool } from "@/lib/db";

function escapeLike(str) {
  return str.replace(/[%_\\]/g, "\\$&");
}

export async function getDaftarBuku({ q = "", kategori = "" } = {}) {
  const cleanQ = typeof q === "string" ? q.trim() : "";
  const cleanKategori = typeof kategori === "string" ? kategori.trim() : "";

  const words = cleanQ
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => `%${escapeLike(w)}%`);

  const hasWords = words.length > 0;

  const { rows } = await pool.query(
    `SELECT id, judul, penulis, kategori, tahun, tersedia
       FROM buku
      WHERE ($1::boolean = false OR CONCAT_WS(' ', judul, penulis, kategori, sinopsis, tahun::text) ILIKE ALL($2::text[]))
        AND ($3 = '' OR LOWER(kategori) = LOWER($3))
      ORDER BY id ASC`,
    [hasWords, words, cleanKategori]
  );
  return rows;
}

export async function getBukuById(id) {
  const { rows } = await pool.query(
    `SELECT id, judul, penulis, kategori, tahun, tersedia, sinopsis
       FROM buku
      WHERE id = $1`,
    [id]
  );
  return rows[0] ?? null;
}

export async function getStatistik() {
  const { rows } = await pool.query(
    `SELECT COUNT(*)::int                          AS total,
            COUNT(*) FILTER (WHERE tersedia)::int      AS tersedia,
            COUNT(*) FILTER (WHERE NOT tersedia)::int  AS dipinjam
       FROM buku`
  );
  return rows[0];
}

export async function getDaftarKategori() {
  const { rows } = await pool.query(
    `SELECT DISTINCT kategori FROM buku ORDER BY kategori ASC`
  );
  return rows.map((r) => r.kategori);
}

export async function getKategoriDenganJumlah() {
  const { rows } = await pool.query(
    `SELECT kategori, COUNT(*)::int AS jumlah
       FROM buku
      GROUP BY kategori
      ORDER BY kategori ASC`
  );
  return rows;
}
