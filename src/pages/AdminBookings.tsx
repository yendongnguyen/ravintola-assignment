import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import api from "../config/api";

type BookingItem = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  guests: number;
  time: string;
  date: string;
  createdAt: string;
};

type BookingsResponse = {
  data: BookingItem[];
};

const adminSessionKey = "maido-admin-bookings-key";

function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [adminKey, setAdminKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const loadBookings = useCallback(async (key: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(api.endpoints.bookings, {
        headers: {
          "x-admin-key": key
        }
      });
      const payload = (await response.json().catch(() => null)) as Partial<BookingsResponse> & {
        error?: string;
      } | null;

      if (response.status === 401) {
        sessionStorage.removeItem(adminSessionKey);
        setIsUnlocked(false);
        setBookings([]);
        setError("Admin key is invalid.");
        return false;
      }

      if (!response.ok || !payload || !Array.isArray(payload.data)) {
        throw new Error(payload?.error ?? "Failed to load bookings");
      }

      sessionStorage.setItem(adminSessionKey, key);
      setBookings(payload.data);
      setIsUnlocked(true);
      return true;
    } catch (_error) {
      setError("Could not load bookings right now.");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const storedKey = sessionStorage.getItem(adminSessionKey);
    if (!storedKey) {
      return;
    }

    setAdminKey(storedKey);
    void loadBookings(storedKey);
  }, [loadBookings]);

  async function handleUnlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedKey = adminKey.trim();
    if (!trimmedKey) {
      setError("Enter the admin key.");
      return;
    }

    await loadBookings(trimmedKey);
  }

  function handleLock() {
    sessionStorage.removeItem(adminSessionKey);
    setAdminKey("");
    setBookings([]);
    setError(null);
    setIsUnlocked(false);
  }

  const sortedBookings = useMemo(
    () => [...bookings].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [bookings]
  );

  return (
    <section className="admin-bookings-section">
      <div className="admin-bookings-header">
        <p className="admin-bookings-label">ADMIN</p>
        <h1>Bookings</h1>
        <p>Enter the admin key to unlock live reservations from the backend API.</p>
      </div>

      <form className="admin-bookings-auth" onSubmit={handleUnlock}>
        <label className="admin-bookings-auth-label" htmlFor="admin-key-input">
          Admin key
        </label>
        <div className="admin-bookings-auth-row">
          <input
            id="admin-key-input"
            className="admin-bookings-auth-input"
            type="password"
            value={adminKey}
            onChange={(event) => setAdminKey(event.target.value)}
            placeholder="Enter admin key"
            autoComplete="current-password"
          />
          <button className="admin-bookings-auth-button" type="submit" disabled={loading}>
            {loading ? "Unlocking..." : isUnlocked ? "Refresh" : "Unlock"}
          </button>
          {isUnlocked && (
            <button className="admin-bookings-lock-button" type="button" onClick={handleLock}>
              Lock
            </button>
          )}
        </div>
      </form>

      {loading && <p className="admin-bookings-state">Loading bookings...</p>}
      {error && <p className="admin-bookings-error">{error}</p>}

      {!loading && !error && isUnlocked && (
        <div className="admin-bookings-table-wrap">
          <table className="admin-bookings-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Guests</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {sortedBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.firstName} {booking.lastName}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>{booking.guests}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.email}</td>
                  <td>{booking.address || "-"}</td>
                  <td>{new Date(booking.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {sortedBookings.length === 0 && (
            <p className="admin-bookings-state">No bookings yet.</p>
          )}
        </div>
      )}

      {!loading && !error && !isUnlocked && (
        <p className="admin-bookings-state">Bookings stay hidden until the admin key is verified.</p>
      )}
    </section>
  );
}

export default AdminBookingsPage;
