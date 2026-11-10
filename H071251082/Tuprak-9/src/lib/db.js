import "server-only";
import { Pool } from "pg";

const globalForPg = globalThis;

export const pool =
  globalForPg.__pustakaSenjaPool ??
  new Pool({ connectionString: process.env.DATABASE_URL });

if (process.env.NODE_ENV !== "production") {
  globalForPg.__pustakaSenjaPool = pool;
}
