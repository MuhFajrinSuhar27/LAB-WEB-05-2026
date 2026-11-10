import pool from "@/lib/db";
import KatalogClient from "@/components/KatalogClient";

export const dynamic = "force-dynamic";

export default async function Katalog() {
  const result = await pool.query(
    "SELECT * FROM buku ORDER BY id ASC"
  );

  return (
    <KatalogClient dataBuku={result.rows} />
  );
}
