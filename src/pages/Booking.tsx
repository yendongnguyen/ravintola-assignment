import { FormEvent, useState } from "react";
import EssentialsStrip from "../components/EssentialsStrip";

type BookingValues = {
  name: string;
  phone: string;
  date: string;
  time: string;
  partySize: string;
};

type BookingErrors = Partial<Record<keyof BookingValues, string>>;

const initialValues: BookingValues = {
  name: "",
  phone: "",
  date: "",
  time: "",
  partySize: ""
};

function BookingPage() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (nextValues: BookingValues): BookingErrors => {
    const nextErrors: BookingErrors = {};

    if (!nextValues.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!nextValues.phone.trim()) {
      nextErrors.phone = "Please enter your phone number.";
    } else {
      const digitsOnly = nextValues.phone.replace(/\D/g, "");
      if (digitsOnly.length === 0) {
        nextErrors.phone = "Phone number must contain at least one digit.";
      }
    }

    if (!nextValues.date) {
      nextErrors.date = "Please choose a date.";
    } else {
      const chosenDate = new Date(nextValues.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (chosenDate < today) {
        nextErrors.date = "Booking date must be today or later.";
      }
    }

    if (!nextValues.time) nextErrors.time = "Please choose a time.";

    if (!nextValues.partySize) nextErrors.partySize = "Please choose party size.";

    return nextErrors;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setIsConfirmed(false);

    if (Object.keys(nextErrors).length > 0) {
      const firstErrorKey = Object.keys(nextErrors)[0] as keyof BookingValues;
      const firstInput = document.querySelector<HTMLInputElement | HTMLSelectElement>(
        `[name="${firstErrorKey}"]`
      );
      firstInput?.focus();
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setValues(initialValues);
      setIsConfirmed(true);
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <section className="booking-wrapper" aria-labelledby="booking-title">
      <EssentialsStrip />
      
      <div className="booking-section">
        <h1 id="booking-title">Reserve Your Table</h1>
        <p>Fill in only the essentials and we will prepare your table.</p>

        {isConfirmed && (
          <p className="success" role="status" tabIndex={-1}>
            Reservation received. A confirmation will be sent shortly.
          </p>
        )}

        <form noValidate onSubmit={onSubmit} className="booking-form">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            disabled={isSubmitting}
          />
          {errors.name && (
            <p id="name-error" className="error" role="alert">
              {errors.name}
            </p>
          )}

          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            value={values.phone}
            onChange={(event) => setValues((prev) => ({ ...prev, phone: event.target.value }))}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            disabled={isSubmitting}
          />
          {errors.phone && (
            <p id="phone-error" className="error" role="alert">
              {errors.phone}
            </p>
          )}

          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={values.date}
            onChange={(event) => setValues((prev) => ({ ...prev, date: event.target.value }))}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? "date-error" : undefined}
            disabled={isSubmitting}
          />
          {errors.date && (
            <p id="date-error" className="error" role="alert">
              {errors.date}
            </p>
          )}

          <label htmlFor="time">Time</label>
          <input
            id="time"
            name="time"
            type="time"
            value={values.time}
            onChange={(event) => setValues((prev) => ({ ...prev, time: event.target.value }))}
            aria-invalid={Boolean(errors.time)}
            aria-describedby={errors.time ? "time-error" : undefined}
            disabled={isSubmitting}
          />
          {errors.time && (
            <p id="time-error" className="error" role="alert">
              {errors.time}
            </p>
          )}

          <label htmlFor="partySize">Party Size</label>
          <select
            id="partySize"
            name="partySize"
            value={values.partySize}
            onChange={(event) => setValues((prev) => ({ ...prev, partySize: event.target.value }))}
            aria-invalid={Boolean(errors.partySize)}
            aria-describedby={errors.partySize ? "partySize-error" : undefined}
            disabled={isSubmitting}
          >
            <option value="">Select...</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8+</option>
          </select>
          {errors.partySize && (
            <p id="partySize-error" className="error" role="alert">
              {errors.partySize}
            </p>
          )}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Confirming..." : "Confirm Reservation"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default BookingPage;