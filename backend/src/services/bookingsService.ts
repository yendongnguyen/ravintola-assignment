import { randomUUID } from "node:crypto";
import { createBooking, listBookings } from "../data/bookingRepository.js";
import { bookingInputSchema, type BookingInputDTO } from "../validation/booking.js";
import type { BookingRecord } from "../shared/types.js";

type BookingValidationResult =
  | { success: true; data: BookingInputDTO }
  | { success: false; messages: string[] };

export function validateBookingPayload(payload: unknown): BookingValidationResult {
  const parsed = bookingInputSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      messages: parsed.error.issues.map((issue) => issue.message)
    };
  }

  return {
    success: true,
    data: parsed.data
  };
}

export async function submitBooking(input: BookingInputDTO): Promise<BookingRecord> {
  return createBooking({
    ...input,
    id: randomUUID()
  });
}

export async function getBookings(): Promise<BookingRecord[]> {
  return listBookings();
}