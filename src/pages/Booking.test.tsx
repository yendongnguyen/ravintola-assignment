import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookingPage from "./Booking";
import { LanguageProvider } from "../i18n/LanguageContext";

function renderBookingPage() {
  return render(
    <LanguageProvider>
      <BookingPage />
    </LanguageProvider>
  );
}

function fillRequiredFields(container: HTMLElement) {
  const firstName = screen.getByPlaceholderText("Input your first name");
  const lastName = screen.getByPlaceholderText("Input your last name");
  const phone = screen.getByPlaceholderText("Input your phone number");
  const email = screen.getByPlaceholderText("Input your email");
  const guests = screen.getByPlaceholderText("Input number");
  const date = container.querySelector('input[type="date"]') as HTMLInputElement;
  const time = container.querySelector('input[type="time"]') as HTMLInputElement;

  if (!date || !time) {
    throw new Error("Date/time inputs not found");
  }

  return { firstName, lastName, phone, email, guests, date, time };
}

describe("BookingPage", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows inline validation messages for missing required fields", async () => {
    const user = userEvent.setup();
    renderBookingPage();

    await user.click(screen.getByRole("button", { name: /reserve/i }));

    expect(screen.getAllByText("Required").length).toBe(7);
  });

  it("shows backend validation error details", async () => {
    const user = userEvent.setup();
    const { container } = renderBookingPage();
    const fields = fillRequiredFields(container);

    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      json: async () => ({ details: ["Phone format is invalid"] })
    } as Response);

    const todayInput = new Date().toISOString().split("T")[0];

    await user.type(fields.firstName, "Kiet");
    await user.type(fields.lastName, "Tester");
    await user.type(fields.phone, "abc");
    await user.type(fields.email, "kiet@example.com");
    await user.type(fields.guests, "2");
    await user.type(fields.date, todayInput);
    await user.type(fields.time, "18:30");

    await user.click(screen.getByRole("button", { name: /reserve/i }));

    expect(await screen.findByText("Phone format is invalid")).toBeInTheDocument();
  });

  it("shows confirmation after valid submission", async () => {
    const user = userEvent.setup();
    const { container } = renderBookingPage();
    const fields = fillRequiredFields(container);

    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ data: { id: "booking-id" } })
    } as Response);

    const todayInput = new Date().toISOString().split("T")[0];

    await user.type(fields.firstName, "Kiet");
    await user.type(fields.lastName, "Tester");
    await user.type(fields.phone, "+358401111111");
    await user.type(fields.email, "kiet@example.com");
    await user.type(fields.guests, "2");
    await user.type(fields.date, todayInput);
    await user.type(fields.time, "18:30");

    await user.click(screen.getByRole("button", { name: /reserve/i }));

    await waitFor(() => {
      expect(screen.getByText("Reservation received! We'll confirm your table shortly.")).toBeInTheDocument();
    });
  });

  it("disables submit button while request is pending", async () => {
    const user = userEvent.setup();
    const { container } = renderBookingPage();
    const fields = fillRequiredFields(container);

    let pendingResolve: ((value: Response) => void) | undefined;
    vi.spyOn(globalThis, "fetch").mockImplementation(
      () =>
        new Promise<Response>((resolve: (value: Response) => void) => {
          pendingResolve = resolve;
        })
    );

    const todayInput = new Date().toISOString().split("T")[0];

    await user.type(fields.firstName, "Kiet");
    await user.type(fields.lastName, "Tester");
    await user.type(fields.phone, "358401111111");
    await user.type(fields.email, "kiet@example.com");
    await user.type(fields.guests, "2");
    await user.type(fields.date, todayInput);
    await user.type(fields.time, "18:30");

    await user.click(screen.getByRole("button", { name: /reserve/i }));

    expect(screen.getByRole("button", { name: /sending/i })).toBeDisabled();

    if (pendingResolve) {
      (pendingResolve as (value: Response) => void)({
        ok: true,
        json: async () => ({ data: { id: "booking-id" } })
      } as Response);
    }
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /reserve/i })).toBeEnabled();
    });
  });

  it("keeps entered values when validation fails", async () => {
    const user = userEvent.setup();
    const { container } = renderBookingPage();
    const fields = fillRequiredFields(container);

    await user.type(fields.firstName, "Kiet");
    await user.type(fields.phone, "abc");

    await user.click(screen.getByRole("button", { name: /reserve/i }));

    expect((fields.firstName as HTMLInputElement).value).toBe("Kiet");
    expect((fields.phone as HTMLInputElement).value).toBe("abc");
  });

  it("shows network error when API is unreachable", async () => {
    const user = userEvent.setup();
    const { container } = renderBookingPage();
    const fields = fillRequiredFields(container);

    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Network down"));

    const todayInput = new Date().toISOString().split("T")[0];

    await user.type(fields.firstName, "Kiet");
    await user.type(fields.lastName, "Tester");
    await user.type(fields.phone, "358401111111");
    await user.type(fields.email, "kiet@example.com");
    await user.type(fields.guests, "2");
    await user.type(fields.date, todayInput);
    await user.type(fields.time, "18:30");

    await user.click(screen.getByRole("button", { name: /reserve/i }));

    expect(await screen.findByText("Could not reach booking service. Please try again in a moment.")).toBeInTheDocument();
  });
});
