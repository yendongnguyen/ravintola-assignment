import type { RowDataPacket } from "mysql2";
import { getPool } from "./mysql.js";

const CREATE_BOOKINGS_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS bookings (
  id CHAR(36) PRIMARY KEY,
  first_name VARCHAR(80) NOT NULL,
  last_name VARCHAR(80) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(120) NOT NULL,
  address VARCHAR(200) NOT NULL DEFAULT '',
  guests INT NOT NULL CHECK (guests > 0 AND guests <= 20),
  booking_time TIME NOT NULL,
  booking_date DATE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

const indexes = [
  {
    name: "idx_bookings_booking_date",
    createSql: "CREATE INDEX idx_bookings_booking_date ON bookings (booking_date)"
  },
  {
    name: "idx_bookings_created_at",
    createSql: "CREATE INDEX idx_bookings_created_at ON bookings (created_at DESC)"
  }
];

async function indexExists(indexName: string): Promise<boolean> {
  type IndexCountRow = RowDataPacket & { indexCount: number };

  const [rows] = await getPool().query<IndexCountRow[]>(
    `SELECT COUNT(1) AS indexCount
     FROM information_schema.statistics
     WHERE table_schema = DATABASE()
       AND table_name = 'bookings'
       AND index_name = ?`,
    [indexName]
  );

  return rows[0]?.indexCount > 0;
}

export async function ensureSchema(): Promise<void> {
  await getPool().query(CREATE_BOOKINGS_TABLE_SQL);

  for (const index of indexes) {
    const exists = await indexExists(index.name);
    if (!exists) {
      await getPool().query(index.createSql);
    }
  }
}