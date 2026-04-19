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

CREATE INDEX IF NOT EXISTS idx_bookings_booking_date ON bookings (booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings (created_at DESC);
