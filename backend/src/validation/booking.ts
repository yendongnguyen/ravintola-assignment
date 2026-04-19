import { z } from "zod";

const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;
const phoneAllowedRegex = /^[+()\-\s\d]{6,20}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const todayString = (): string => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export const bookingInputSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(80),
  lastName: z.string().trim().min(1, "Last name is required").max(80),
  phone: z
    .string()
    .trim()
    .regex(phoneAllowedRegex, "Phone format is invalid")
    .refine((value) => /\d/.test(value), "Phone must contain digits"),
  email: z.string().trim().regex(emailRegex, "Email format is invalid").max(120),
  address: z.string().trim().max(200).optional().default(""),
  guests: z
    .number({ invalid_type_error: "Guests must be a number" })
    .int("Guests must be a whole number")
    .min(1, "At least 1 guest")
    .max(20, "Maximum 20 guests"),
  time: z.string().regex(timeRegex, "Time must be HH:mm"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD")
    .refine((value) => value >= todayString(), "Booking date must be today or later")
});

export type BookingInputDTO = z.infer<typeof bookingInputSchema>;