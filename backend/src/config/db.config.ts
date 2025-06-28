import Pool from "pg";
import { config } from "dotenv";
config({ path: "./.env" });

let pool: Pool.Pool;
function createPool() {
  if (!pool) {
    pool = new Pool.Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT || "5432", 10),
    });
  }
  return pool;
}

export default createPool;
