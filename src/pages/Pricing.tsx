import { Link } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import LazyImage from "../components/LazyImage";
import heroBg from "../assets/hero/about-photo-food.jpeg";
import buffetPhoto1 from "../assets/hero/about-photo-buffet.jpeg";
import buffetPhoto2 from "../assets/hero/our-menu-fried-food.jpeg";
import bookingPhoto from "../assets/hero/background-booking.jpg";

type PricingForm = {
  time: string;
  guests: string;
  name: string;
  phone: string;
  special: string;
};

const emptyForm: PricingForm = { time: "", guests: "", name: "", phone: "", special: "" };

function PricingPage() {
  const { t } = useLanguage();
  const p = t.pricingPage;
  const [form, setForm] = useState<PricingForm>(emptyForm);
  const [done, setDone] = useState(false);

  const set = (f: keyof PricingForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [f]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
    setForm(emptyForm);
  };

  return (
    <div className="pricing-page">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="pricing-hero">
        {/* Decorative leaves */}
        <span className="pricing-hero-leaf pricing-hero-leaf--tl" aria-hidden="true">
          <svg width="60" height="72" viewBox="0 0 60 72" fill="none">
            <ellipse cx="30" cy="36" rx="22" ry="34" fill="#3a7a25" transform="rotate(-20 30 36)" />
            <line x1="30" y1="5" x2="30" y2="67" stroke="#2a6010" strokeWidth="1.5" />
          </svg>
        </span>
        <span className="pricing-hero-leaf pricing-hero-leaf--br" aria-hidden="true">
          <svg width="48" height="58" viewBox="0 0 48 58" fill="none">
            <ellipse cx="24" cy="29" rx="18" ry="27" fill="#3a7a25" transform="rotate(15 24 29)" />
            <line x1="24" y1="3" x2="24" y2="55" stroke="#2a6010" strokeWidth="1.5" />
          </svg>
        </span>

        <div className="pricing-hero-inner">
          <div className="pricing-hero-left">
            <div className="pricing-hero-label-row">
              <span className="pricing-hero-label">{p.heroLabel}</span>
              <span className="pricing-hero-line"></span>
            </div>
            <h1 className="pricing-hero-heading">{p.heroHeading}</h1>
            <p className="pricing-hero-sub">{p.heroSub}</p>
            <Link to="/booking" className="pricing-hero-btn">{p.heroBtn}</Link>
          </div>
          <div className="pricing-hero-right">
            <LazyImage src={heroBg} alt="MAIDO buffet food" className="pricing-hero-photo" />
            <div className="pricing-hero-play" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="white" width="26" height="26">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing Detail ───────────────────────────────────── */}
      <section className="pricing-detail-section">
        {/* Decorative vegetables */}
        <div className="pricing-detail-deco" aria-hidden="true">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <circle cx="28" cy="28" r="22" fill="#e04040" />
            <circle cx="28" cy="28" r="14" fill="#c83030" />
            <ellipse cx="28" cy="9" rx="5" ry="9" fill="#3a7a25" transform="rotate(-15 28 9)" />
            <ellipse cx="38" cy="12" rx="4" ry="8" fill="#4a8a2a" transform="rotate(20 38 12)" />
          </svg>
          <svg width="44" height="52" viewBox="0 0 44 52" fill="none">
            <ellipse cx="22" cy="26" rx="16" ry="24" fill="#4a8f28" transform="rotate(-10 22 26)" />
            <line x1="22" y1="2" x2="22" y2="50" stroke="#2a6010" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="pricing-detail-inner">
          <div className="pricing-detail-label-row">
            <span className="pricing-detail-label">{p.detailLabel}</span>
            <span className="pricing-detail-label-line"></span>
          </div>
          <h2 className="pricing-detail-heading">{p.detailHeading}</h2>

          <div className="pricing-prices">
            {p.prices.map((item) => (
              <p key={item.label} className="pricing-price-row">
                <span className="pricing-price-label">{item.label}:</span> {item.price}
              </p>
            ))}
          </div>

          <div className="pricing-photos">
            <LazyImage src={buffetPhoto1} alt="MAIDO buffet – sushi and starters" className="pricing-buffet-photo" />
            <LazyImage src={buffetPhoto2} alt="MAIDO buffet – main dishes" className="pricing-buffet-photo" />
          </div>
        </div>
      </section>

      {/* ── Table Booking ────────────────────────────────────── */}
      <section className="pricing-booking-section">
        <div className="pricing-booking-inner">
          <div className="pricing-booking-form-wrap">
            <h2 className="pricing-booking-heading">{p.bookingHeading}</h2>

            {done && (
              <p className="pricing-booking-success" role="status">
                {t.aboutPage.bookingSuccess}
              </p>
            )}

            <form className="pricing-booking-form" onSubmit={onSubmit} noValidate>
              <div className="pb-row pb-row-2">
                <div className="pb-field">
                  <label className="pb-label">{p.resTime}</label>
                  <input className="pb-input" type="time" placeholder={p.resTimePh} value={form.time} onChange={set("time")} required />
                </div>
                <div className="pb-field">
                  <label className="pb-label">{p.guestNum}</label>
                  <input className="pb-input" type="number" min="1" placeholder={p.guestNumPh} value={form.guests} onChange={set("guests")} required />
                </div>
              </div>

              <div className="pb-row pb-row-2">
                <div className="pb-field">
                  <label className="pb-label">{p.fullName}</label>
                  <input className="pb-input" placeholder={p.fullNamePh} value={form.name} onChange={set("name")} required />
                </div>
                <div className="pb-field">
                  <label className="pb-label">{p.phone}</label>
                  <input className="pb-input" placeholder={p.phonePh} value={form.phone} onChange={set("phone")} required />
                </div>
              </div>

              <div className="pb-field">
                <label className="pb-label">{p.special}</label>
                <textarea className="pb-textarea" placeholder={p.specialPh} value={form.special} onChange={set("special")} rows={3} />
              </div>

              <button type="submit" className="pb-submit">{p.reserve}</button>
            </form>
          </div>

          <div className="pricing-booking-photo">
            <LazyImage src={bookingPhoto} alt="MAIDO restaurant service" className="pricing-booking-img" />
          </div>
        </div>
      </section>

    </div>
  );
}

export default PricingPage;
