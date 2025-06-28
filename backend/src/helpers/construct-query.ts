import createPool from "../config/db.config";

const pool = createPool();

async function constructQuery(sql: string, params: any) {
  const parameters = params ?? [];
  const client = await pool.connect();

  return new Promise((resolve, reject) => {
    client
      .query(sql, parameters)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        if (error instanceof Error) {
          reject(new Error(`Database: ${error.message}`));
        } else {
          reject(new Error(`Database: ${String(error)}`));
        }
      })
      .finally(() => {
        client.release();
      });
  });
}

export default constructQuery;
