import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { getPool } from "./mysql.js";
import type { BookingInput, BookingRecord } from "../shared/types.js";

type BookingRow = RowDataPacket & {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  address: string;
  guests: number;
  booking_time: string;
  booking_date: string;
  created_at: Date | string;
};

export async function listBookings(): Promise<BookingRecord[]> {
  const [rows] = await getPool().query<BookingRow[]>(
    `SELECT
      id,
      first_name,
      last_name,
      phone,
      email,
      address,
      guests,
      TIME_FORMAT(booking_time, '%H:%i') AS booking_time,
      DATE_FORMAT(booking_date, '%Y-%m-%d') AS booking_date,
      created_at
    FROM bookings
    ORDER BY created_at DESC`
  );

  return rows.map((row) => ({
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    phone: row.phone,
    email: row.email,
    address: row.address,
    guests: row.guests,
    time: row.booking_time,
    date: row.booking_date,
    createdAt: new Date(row.created_at).toISOString()
  }));
}

export async function createBooking(input: BookingInput): Promise<BookingRecord> {
  const [result] = await getPool().execute<ResultSetHeader>(
    `INSERT INTO bookings
      (id, first_name, last_name, phone, email, address, guests, booking_time, booking_date)
    VALUES
      (:id, :firstName, :lastName, :phone, :email, :address, :guests, :time, :date)`,
    {
      id: input.id,
      firstName: input.firstName,
      lastName: input.lastName,
      phone: input.phone,
      email: input.email,
      address: input.address ?? "",
      guests: input.guests,
      time: input.time,
      date: input.date
    }
  );

  if (result.affectedRows !== 1) {
    throw new Error("Failed to insert booking record");
  }

  return {
    ...input,
    createdAt: new Date().toISOString()
  };
}