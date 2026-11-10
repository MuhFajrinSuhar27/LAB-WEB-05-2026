import { Pool } from "pg";

// Berkas ini hanya boleh diimpor dari kode server
// (Server Component, Server Action), tidak dari Client Component.
// Pool disimpan di globalThis agar tidak dibuat berulang saat hot reload.
const pool =
  globalThis.pgPool ??
  new Pool({ connectionString: process.env.DATABASE_URL });

if (process.env.NODE_ENV !== "production") {
  globalThis.pgPool = pool;
}

export default pool;
