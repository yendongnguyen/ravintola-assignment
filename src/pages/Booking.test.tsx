import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookingPage from "./Booking";

describe("BookingPage", () => {
  it("shows inline validation messages for missing required fields", async () => {
    const user = userEvent.setup();
    render(<BookingPage />);

    await user.click(screen.getByRole("button", { name: /confirm reservation/i }));

    expect(screen.getByText(/please enter your name/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter your phone number/i)).toBeInTheDocument();
    expect(screen.getByText(/please choose a date/i)).toBeInTheDocument();
    expect(screen.getByText(/please choose a time/i)).toBeInTheDocument();
    expect(screen.getByText(/please choose party size/i)).toBeInTheDocument();
  });

  it("validates phone number format (must contain digits)", async () => {
    const user = userEvent.setup();
    render(<BookingPage />);

    await user.type(screen.getByLabelText(/name/i), "Kiet");
    await user.type(screen.getByLabelText(/phone/i), "abc");
    await user.type(screen.getByLabelText(/date/i), "2026-04-15");
    await user.type(screen.getByLabelText(/time/i), "18:30");
    await user.selectOptions(screen.getByLabelText(/party size/i), "2");

    await user.click(screen.getByRole("button", { name: /confirm reservation/i }));

    expect(screen.getByText(/phone number must contain at least one digit/i)).toBeInTheDocument();
  });

  it("accepts phone number with spaces and hyphens as valid numeric format", async () => {
    const user = userEvent.setup();
    render(<BookingPage />);

    const todayInput = new Date().toISOString().split("T")[0];

    await user.type(screen.getByLabelText(/name/i), "Kiet");
    await user.type(screen.getByLabelText(/phone/i), "+358 40 111-1111");
    await user.type(screen.getByLabelText(/date/i), todayInput);
    await user.type(screen.getByLabelText(/time/i), "18:30");
    await user.selectOptions(screen.getByLabelText(/party size/i), "2");

    await user.click(screen.getByRole("button", { name: /confirm reservation/i }));

    await waitFor(() => {
      expect(screen.getByText(/reservation received/i)).toBeInTheDocument();
    });
  });

  it("prevents booking for past dates", async () => {
    const user = userEvent.setup();
    render(<BookingPage />);

    await user.type(screen.getByLabelText(/name/i), "Kiet");
    await user.type(screen.getByLabelText(/phone/i), "358401111111");
    await user.type(screen.getByLabelText(/date/i), "2025-01-01");
    await user.type(screen.getByLabelText(/time/i), "18:30");
    await user.selectOptions(screen.getByLabelText(/party size/i), "2");

    await user.click(screen.getByRole("button", { name: /confirm reservation/i }));

    expect(screen.getByText(/booking date must be today or later/i)).toBeInTheDocument();
  });

  it("shows confirmation after valid submission", async () => {
    const user = userEvent.setup();
    render(<BookingPage />);

    const todayInput = new Date().toISOString().split("T")[0];

    await user.type(screen.getByLabelText(/name/i), "Kiet");
    await user.type(screen.getByLabelText(/phone/i), "358401111111");
    await user.type(screen.getByLabelText(/date/i), todayInput);
    await user.type(screen.getByLabelText(/time/i), "18:30");
    await user.selectOptions(screen.getByLabelText(/party size/i), "2");

    await user.click(screen.getByRole("button", { name: /confirm reservation/i }));

    await waitFor(() => {
      expect(screen.getByText(/reservation received/i)).toBeInTheDocument();
    });
  });

  it("disables submit button during submission", async () => {
    const user = userEvent.setup();
    render(<BookingPage />);

    const todayInput = new Date().toISOString().split("T")[0];

    await user.type(screen.getByLabelText(/name/i), "Kiet");
    await user.type(screen.getByLabelText(/phone/i), "358401111111");
    await user.type(screen.getByLabelText(/date/i), todayInput);
    await user.type(screen.getByLabelText(/time/i), "18:30");
    await user.selectOptions(screen.getByLabelText(/party size/i), "2");

    const submitBtn = screen.getByRole("button", { name: /confirm reservation/i });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /confirming/i })).toBeDisabled();
    });
  });

  it("preserves form values on validation error", async () => {
    const user = userEvent.setup();
    render(<BookingPage />);

    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    const phoneInput = screen.getByLabelText(/phone/i) as HTMLInputElement;

    await user.type(nameInput, "Kiet");
    await user.type(phoneInput, "abc");

    await user.click(screen.getByRole("button", { name: /confirm reservation/i }));

    expect(nameInput.value).toBe("Kiet");
    expect(phoneInput.value).toBe("abc");
  });

  it("focuses first error field on validation failure", async () => {
    const user = userEvent.setup();
    render(<BookingPage />);

    const nameInput = screen.getByLabelText(/name/i);

    await user.click(screen.getByRole("button", { name: /confirm reservation/i }));

    expect(nameInput).toHaveFocus();
  });
});
