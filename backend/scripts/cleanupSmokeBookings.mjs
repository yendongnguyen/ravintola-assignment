import "./loadLocalSettings.mjs";
import fs from "node:fs";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  ssl: process.env.MYSQL_SSL_CA_PATH
    ? { ca: fs.readFileSync(process.env.MYSQL_SSL_CA_PATH, "utf8"), rejectUnauthorized: true }
    : { rejectUnauthorized: true }
});

async function run() {
  const [result] = await pool.execute(
    "DELETE FROM bookings WHERE email IN (?, ?)",
    ["audit.check@example.com", "test.user@example.com"]
  );

  // eslint-disable-next-line no-console
  console.log(JSON.stringify({ deleted: result.affectedRows }));
  await pool.end();
}

run().catch(async (error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  await pool.end();
  process.exit(1);
});
