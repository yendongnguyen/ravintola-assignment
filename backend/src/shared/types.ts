export type BookingPayload = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address?: string;
  guests: number;
  time: string;
  date: string;
};

export type BookingInput = BookingPayload & {
  id: string;
};

export type BookingRecord = BookingInput & {
  createdAt: string;
};