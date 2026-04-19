import fs from "node:fs";
import mysql from "mysql2/promise";

type MySqlPool = ReturnType<typeof mysql.createPool>;

let pool: MySqlPool | undefined;

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required MySQL configuration: ${name}`);
  }

  return value;
}

function createPool(): MySqlPool {
  const mysqlPort = Number(process.env.MYSQL_PORT ?? 3306);
  const sslCaPath = process.env.MYSQL_SSL_CA_PATH?.trim();

  const sslConfig = sslCaPath
    ? {
        ca: fs.readFileSync(sslCaPath, "utf-8"),
        rejectUnauthorized: true
      }
    : { rejectUnauthorized: true };

  return mysql.createPool({
    host: getRequiredEnv("MYSQL_HOST"),
    port: mysqlPort,
    user: getRequiredEnv("MYSQL_USER"),
    password: process.env.MYSQL_PASSWORD,
    database: getRequiredEnv("MYSQL_DATABASE"),
    ssl: sslConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    namedPlaceholders: true
  });
}

export function getPool(): MySqlPool {
  if (!pool) {
    pool = createPool();
  }

  return pool;
}

export async function verifyMySqlConnection(): Promise<void> {
  const connection = await getPool().getConnection();

  try {
    await connection.query("SELECT 1");
  } finally {
    connection.release();
  }
}

export async function closePool(): Promise<void> {
  if (!pool) {
    return;
  }

  await pool.end();
  pool = undefined;
}