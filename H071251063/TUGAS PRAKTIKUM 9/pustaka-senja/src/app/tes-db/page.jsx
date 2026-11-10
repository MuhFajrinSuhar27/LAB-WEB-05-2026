import pool from "../../lib/db";

export const dynamic = "force-dynamic";

export default async function TesDatabase() {
  try {
    const result = await pool.query("SELECT * FROM buku ORDER BY id ASC");

    return (
      <main style={{ padding: "30px" }}>
        <h1>Koneksi Database Berhasil!</h1>
        <p>Jumlah buku: {result.rows.length}</p>

        {result.rows.map((buku) => (
          <div key={buku.id}>
            <p>{buku.judul} - {buku.penulis}</p>
          </div>
        ))}
      </main>
    );
  } catch (error) {
    return (
      <main style={{ padding: "30px" }}>
        <h1>Koneksi Database Gagal</h1>
        <p>Periksa konfigurasi database dan terminal.</p>
      </main>
    );
  }
}
