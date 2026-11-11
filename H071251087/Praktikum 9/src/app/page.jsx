import Hero from "@/components/Hero";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function BerandaPage() {
  const { rows } = await pool.query(
    `SELECT
       COUNT(*)::int AS total,
       COUNT(*) FILTER (WHERE tersedia)::int AS tersedia,
       COUNT(*) FILTER (WHERE NOT tersedia)::int AS dipinjam
     FROM buku`
  );
  const { total, tersedia, dipinjam } = rows[0];

  const statistik = [
    { label: "Total Koleksi", nilai: total },
    { label: "Tersedia", nilai: tersedia },
    { label: "Dipinjam", nilai: dipinjam },
  ];

  return (
    <Hero
      nama="Pustaka Senja"
      slogan="Ruang baca dan perpustakaan komunitas yang nyaman di Prodi Sistem Informasi, di mana kamu dapat menemukan buku teknologi, fiksi, dan pengembangan diri."
      lokasi="📍Gedung PBT"
      jamBuka="📆 Senin - Jum'at (09.00 - 20.00)"
      statistik={statistik}
      gambar="/mockup-beranda.png"
    />
  );
}