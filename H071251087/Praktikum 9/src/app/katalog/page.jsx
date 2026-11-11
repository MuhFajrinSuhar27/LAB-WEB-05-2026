import pool from "@/lib/db";
import DaftarKatalog from "@/components/DaftarKatalog";

export const dynamic = "force-dynamic";

export default async function KatalogPage() {
  const { rows } = await pool.query("SELECT * FROM buku ORDER BY id");

  return <DaftarKatalog dataBuku={rows} />;
}
