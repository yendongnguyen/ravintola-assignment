import { FormEvent, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import api from "../config/api";
import heroBg from "../assets/hero/background-booking.jpg";

type FormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  guests: string;
  time: string;
  date: string;
};

const initial: FormValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address: "",
  guests: "",
  time: "",
  date: "",
};

function BookingPage() {
  const { t } = useLanguage();
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const set = (field: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = (): Partial<FormValues> => {
    const err: Partial<FormValues> = {};
    if (!values.firstName.trim()) err.firstName = t.bookingPage.required;
    if (!values.lastName.trim()) err.lastName = t.bookingPage.required;
    if (!values.phone.trim()) err.phone = t.bookingPage.required;
    if (!values.email.trim()) err.email = t.bookingPage.required;
    if (!values.guests.trim()) err.guests = t.bookingPage.required;
    if (!values.time) err.time = t.bookingPage.required;
    if (!values.date) err.date = t.bookingPage.required;
    return err;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(false);
    setSubmitError(null);

    const err = validate();
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    setSending(true);

    try {
      const response = await fetch(api.endpoints.bookings, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          email: values.email,
          address: values.address,
          guests: Number(values.guests),
          time: values.time,
          date: values.date
        })
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { details?: string[] } | null;
        const detailMessage = payload?.details?.[0];
        setSubmitError(detailMessage ?? t.bookingPage.submitFailed);
        return;
      }

      setValues(initial);
      setSubmitted(true);
    } catch {
      setSubmitError(t.bookingPage.submitNetworkError);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="reservation-page">
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="reservation-hero">
        <div className="reservation-hero-left">
          <div className="reservation-hero-label-row">
            <span className="reservation-hero-label">{t.bookingPage.heroLabel}</span>
            <span className="reservation-hero-line"></span>
          </div>
          <h1 className="reservation-hero-heading">{t.bookingPage.heroHeading}</h1>
          <p className="reservation-hero-sub">{t.bookingPage.heroSub}</p>
        </div>
        <div className="reservation-hero-right">
          <img src={heroBg} alt="MAIDO Restaurant" className="reservation-hero-photo" />
        </div>
      </section>

      {/* ── Booking Form ─────────────────────────────── */}
      <section className="reservation-form-section">
        <div className="reservation-form-inner">
          <div className="reservation-form-label-row">
            <span className="reservation-form-tag">{t.bookingPage.formLabel}</span>
            <span className="reservation-form-tag-line"></span>
          </div>
          <h2 className="reservation-form-heading">{t.bookingPage.formHeading}</h2>

          {submitted && (
            <p className="reservation-success" role="status">
              {t.bookingPage.success}
            </p>
          )}

          {submitError && (
            <p className="reservation-error" role="alert">
              {submitError}
            </p>
          )}

          <form className="reservation-form-card" onSubmit={onSubmit} noValidate>
            {/* Row 1: First + Last Name */}
            <div className="rf-row rf-row-2">
              <div className="rf-field">
                <label className="rf-label">{t.bookingPage.firstName}</label>
                <input className={`rf-input${errors.firstName ? " rf-input--err" : ""}`} placeholder={t.bookingPage.firstNamePh} value={values.firstName} onChange={set("firstName")} disabled={sending} />
                {errors.firstName && <span className="rf-err">{errors.firstName}</span>}
              </div>
              <div className="rf-field">
                <label className="rf-label">{t.bookingPage.lastName}</label>
                <input className={`rf-input${errors.lastName ? " rf-input--err" : ""}`} placeholder={t.bookingPage.lastNamePh} value={values.lastName} onChange={set("lastName")} disabled={sending} />
                {errors.lastName && <span className="rf-err">{errors.lastName}</span>}
              </div>
            </div>

            {/* Phone */}
            <div className="rf-field">
              <label className="rf-label">{t.bookingPage.phone}</label>
              <input className={`rf-input${errors.phone ? " rf-input--err" : ""}`} placeholder={t.bookingPage.phonePh} value={values.phone} onChange={set("phone")} disabled={sending} />
              {errors.phone && <span className="rf-err">{errors.phone}</span>}
            </div>

            {/* Email */}
            <div className="rf-field">
              <label className="rf-label">{t.bookingPage.email}</label>
              <input type="email" className={`rf-input${errors.email ? " rf-input--err" : ""}`} placeholder={t.bookingPage.emailPh} value={values.email} onChange={set("email")} disabled={sending} />
              {errors.email && <span className="rf-err">{errors.email}</span>}
            </div>

            {/* Address */}
            <div className="rf-field">
              <label className="rf-label">{t.bookingPage.address}</label>
              <input className="rf-input" placeholder={t.bookingPage.addressPh} value={values.address} onChange={set("address")} disabled={sending} />
            </div>

            {/* Row 2: Guests + Time + Date */}
            <div className="rf-row rf-row-3">
              <div className="rf-field">
                <label className="rf-label">{t.bookingPage.guests}</label>
                <input className={`rf-input${errors.guests ? " rf-input--err" : ""}`} placeholder={t.bookingPage.guestsPh} value={values.guests} onChange={set("guests")} disabled={sending} />
                {errors.guests && <span className="rf-err">{errors.guests}</span>}
              </div>
              <div className="rf-field">
                <label className="rf-label">{t.bookingPage.time}</label>
                <input type="time" className={`rf-input${errors.time ? " rf-input--err" : ""}`} value={values.time} onChange={set("time")} disabled={sending} />
                {errors.time && <span className="rf-err">{errors.time}</span>}
              </div>
              <div className="rf-field">
                <label className="rf-label">{t.bookingPage.date}</label>
                <input type="date" className={`rf-input${errors.date ? " rf-input--err" : ""}`} value={values.date} onChange={set("date")} disabled={sending} />
                {errors.date && <span className="rf-err">{errors.date}</span>}
              </div>
            </div>

            <button type="submit" className="rf-submit" disabled={sending}>
              {sending ? t.bookingPage.sending : t.bookingPage.reserve}
            </button>
          </form>
        </div>
      </section>

      {/* ── Contact + Map ────────────────────────────── */}
      <section className="reservation-contact-section">
        <div className="reservation-contact-inner">
          <div className="reservation-contact-left">
            <div className="reservation-contact-label-row">
              <span className="reservation-contact-tag">{t.bookingPage.contactLabel}</span>
              <span className="reservation-contact-tag-line"></span>
            </div>
            <h2 className="reservation-contact-heading">{t.bookingPage.contactHeading}</h2>
            <p className="reservation-contact-desc">
              {t.bookingPage.contactDesc}
            </p>
            <div className="reservation-contact-items">
              <div className="reservation-contact-item">
                <span className="reservation-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.14 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.05 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </span>
                <a href="tel:+358465486221" className="reservation-contact-link">046 548 6221</a>
              </div>
              <div className="reservation-contact-item">
                <span className="reservation-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </span>
                <a href="mailto:asiakaspalvelu@maidoravintola.fi" className="reservation-contact-link">asiakaspalvelu@maidoravintola.fi</a>
              </div>
            </div>
          </div>
          <div className="reservation-map">
            <iframe
              title="MAIDO Ravintola location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1837.9736!2d27.6784!3d62.8924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x468b2e0a5b2e3e9b%3A0x5a2e3e9b5b2e3e9b!2sKauppakatu+29%2C+70100+Kuopio!5e0!3m2!1sen!2sfi!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default BookingPage;
