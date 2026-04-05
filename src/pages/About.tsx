import { Link } from "react-router-dom";
import { useState } from "react";
import heroBg from "../assets/hero/about-photo-bar.jpeg";
import chefPhoto from "../assets/hero/our-service-staff.png";
import waiterPhoto from "../assets/hero/background-booking.jpg";

const galleryImages = [
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=280&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=280&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&h=280&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=280&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=280&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=400&h=280&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=280&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=280&fit=crop&auto=format",
];

const team = [
  {
    name: "Blue",
    role: "Head Chef",
    stars: 4,
    desc: "Meet Blue, the culinary genius behind our exquisite dishes. With years of experience and a passion for culinary excellence, Blue leads our talented kitchen team.",
  },
  {
    name: "Maria Virtanen",
    role: "Sous Chef",
    stars: 5,
    desc: "Maria brings creativity and precision to every plate. Her expertise in Asian fusion cuisine has elevated our buffet to new heights of flavor and presentation.",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="about-stars">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} viewBox="0 0 20 20" width="18" height="18" fill={n <= count ? "#f39c45" : "#ddd"}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 0 0 .95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 0 0-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 0 0-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 0 0-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 0 0 .95-.69L9.049 2.927z" />
        </svg>
      ))}
    </div>
  );
}

type BookingForm = { firstName: string; lastName: string; phone: string; email: string; address: string; guests: string; time: string; date: string; };
const emptyBooking: BookingForm = { firstName: "", lastName: "", phone: "", email: "", address: "", guests: "", time: "", date: "" };

function AboutPage() {
  const [teamIdx, setTeamIdx] = useState(0);
  const member = team[teamIdx];
  const [booking, setBooking] = useState<BookingForm>(emptyBooking);
  const [bookingDone, setBookingDone] = useState(false);
  const setB = (f: keyof BookingForm) => (e: React.ChangeEvent<HTMLInputElement>) => setBooking(p => ({ ...p, [f]: e.target.value }));
  const handleBooking = (e: React.FormEvent) => { e.preventDefault(); setBookingDone(true); setBooking(emptyBooking); };

  return (
    <div className="about-page">

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="about-hero">
        <div className="about-hero-left">
          <h1 className="about-hero-heading">
            About <span className="about-hero-accent">MAIDO</span>
          </h1>
          <p className="about-hero-desc">
            Founded in 2025, MAIDO is dedicated to providing an exceptional dining experience through innovative cuisine and impeccable service. Our mission is to delight your taste buds and create unforgettable memories.
          </p>
          <Link to="/booking" className="about-hero-btn">Reserve Your Table</Link>
        </div>
        <div className="about-hero-right">
          <img src={heroBg} alt="MAIDO Restaurant" className="about-hero-photo" />
          <div className="about-hero-play">
            <svg viewBox="0 0 24 24" fill="white" width="28" height="28"><polygon points="5,3 19,12 5,21" /></svg>
          </div>
        </div>
      </section>

      {/* ── Our Service / Team ───────────────────────── */}
      <section className="about-service-section">
        <div className="about-service-inner">
          <div className="about-service-left">
            <div className="about-service-shape"></div>
            <img src={chefPhoto} alt="Chef" className="about-service-photo" />
          </div>
          <div className="about-service-card">
            <div className="about-service-label-row">
              <span className="about-service-label">EMPLOYEE PROFILE</span>
              <span className="about-service-label-line"></span>
            </div>
            <h2 className="about-service-heading">Our Service</h2>
            <p className="about-service-name">{member.name}</p>
            <Stars count={member.stars} />
            <p className="about-service-desc">"{member.desc}"</p>
            <div className="about-service-arrows">
              <button
                className="about-arrow-btn"
                onClick={() => setTeamIdx((i) => (i - 1 + team.length) % team.length)}
                aria-label="Previous"
              >
                ←
              </button>
              <button
                className="about-arrow-btn about-arrow-btn--active"
                onClick={() => setTeamIdx((i) => (i + 1) % team.length)}
                aria-label="Next"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Gallery ──────────────────────────────── */}
      <section className="about-gallery-section">
        <div className="about-gallery-label-row">
          <span className="about-gallery-label">GALLERY</span>
          <span className="about-gallery-label-line"></span>
        </div>
        <h2 className="about-gallery-heading">Our Gallery</h2>
        <div className="about-gallery-grid">
          {galleryImages.map((src, i) => (
            <div key={i} className="about-gallery-item">
              <img src={src} alt={`Gallery ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* ── Table Booking ────────────────────────────── */}
      <section className="about-booking-section">
        <div className="about-booking-inner">
          <div className="about-booking-form-wrap">
            <h2 className="about-booking-heading">Table Booking</h2>
{bookingDone && <p className="ab-success">Reservation received! We'll confirm your table shortly.</p>}
            <form className="about-booking-form" onSubmit={handleBooking}>
              <div className="ab-row-2">
                <div className="ab-field">
                  <label className="ab-label">First Name</label>
                  <input className="ab-input" placeholder="Input your first name" value={booking.firstName} onChange={setB("firstName")} required />
                </div>
                <div className="ab-field">
                  <label className="ab-label">Last Name</label>
                  <input className="ab-input" placeholder="Input your last name" value={booking.lastName} onChange={setB("lastName")} required />
                </div>
              </div>
              <div className="ab-field">
                <label className="ab-label">Phone Number</label>
                <input className="ab-input" placeholder="Input your phone number" value={booking.phone} onChange={setB("phone")} required />
              </div>
              <div className="ab-field">
                <label className="ab-label">Email</label>
                <input type="email" className="ab-input" placeholder="Input your email" value={booking.email} onChange={setB("email")} required />
              </div>
              <div className="ab-field">
                <label className="ab-label">Address</label>
                <input className="ab-input" placeholder="Input your address" value={booking.address} onChange={setB("address")} />
              </div>
              <div className="ab-row-3">
                <div className="ab-field">
                  <label className="ab-label">Guests</label>
                  <input type="number" min="1" className="ab-input" placeholder="Number of guests" value={booking.guests} onChange={setB("guests")} required />
                </div>
                <div className="ab-field">
                  <label className="ab-label">Time</label>
                  <input type="time" className="ab-input" value={booking.time} onChange={setB("time")} required />
                </div>
                <div className="ab-field">
                  <label className="ab-label">Date</label>
                  <input type="date" className="ab-input" value={booking.date} onChange={setB("date")} required />
                </div>
              </div>
              <button type="submit" className="ab-submit">Reserve</button>
            </form>
          </div>
          <div className="about-booking-photo">
            <img src={waiterPhoto} alt="Restaurant service" />
          </div>
        </div>
      </section>

    </div>
  );
}

export default AboutPage;

