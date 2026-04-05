import { Link } from "react-router-dom";
import { useState } from "react";
import saladBowl from "../assets/hero/salad bowl.png";
import friedChicken from "../assets/hero/fried chicken.png";
import bgImage from "../assets/hero/background.png";
import barPhoto from "../assets/hero/about-photo-bar.jpeg";
import foodPhoto from "../assets/hero/about-photo-food.jpeg";
import buffetPhoto from "../assets/hero/about-photo-buffet.jpeg";
import buffetBeef from "../assets/hero/our-buffet-beef.jpeg";
import buffetSalad from "../assets/hero/our-buffet-salad.jpeg";
import menuTeppanjaki from "../assets/hero/our-menu-teppanjaki.jpeg";
import menuSushi from "../assets/hero/our-menu-sushi.jpeg";
import menuSteamTable from "../assets/hero/our-menu-steam-table.jpeg";
import menuFriedFood from "../assets/hero/our-menu-fried-food.jpeg";
import menuNoodle from "../assets/hero/our-menu-noodle.jpeg";
import menuDumpling from "../assets/hero/our-menu-dumpling.jpeg";
import serviceStaff from "../assets/hero/our-service-staff.png";
import feedback1 from "../assets/hero/feedback-1.jpeg";
import feedback2 from "../assets/hero/feedback-2.jpeg";
import feedback3 from "../assets/hero/feedback-3.jpeg";
import feedback4 from "../assets/hero/feedback-4.jpeg";
import feedback5 from "../assets/hero/feedback-5.jpeg";
import feedback6 from "../assets/hero/feedback-6.jpeg";
import feedback7 from "../assets/hero/feedback-7.jpeg";
import feedbackWall from "../assets/hero/feedback-wall.jpeg";
import heroBg from "../assets/hero/background.png";
import bookingBg from "../assets/hero/background-booking.jpg";

function HomePage() {
  return (
    <>
      <section 
        className="hero" 
        aria-labelledby="hero-title"
        style={{
          backgroundImage: `url('${bgImage}')`
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-social">
          <a
            href="https://www.facebook.com/maidoravintola"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-btn"
            aria-label="Facebook"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
          <a
            href="https://www.instagram.com/maido.ravintola/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-btn"
            aria-label="Instagram"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
          </a>
        </div>
        <div className="hero-container">
          <div className="hero-copy">
            <h1 id="hero-title">
              Savor the <br />Exquisite Flavors <br />of <span className="highlight">MAIDO</span>
            </h1>
            <p className="hero-subtitle">Experience Culinary Excellence in Every Bite</p>
            <Link className="cta-primary" to="/booking">
              Reserve Your Table
            </Link>
          </div>
          <div className="hero-images">
            <img src={friedChicken} alt="Fried chicken and fries" className="hero-img fried-chicken" />
            <img src={saladBowl} alt="Fresh salad bowl" className="hero-img salad-bowl" />
          </div>
        </div>
      </section>

      <section className="about-section" id="about" aria-labelledby="about-title">
        <div className="about-photos">
          <div className="about-photo-left">
            <div className="about-photo-placeholder about-photo-bar" style={{ backgroundImage: `url('${barPhoto}')` }}></div>
          </div>
          <div className="about-photo-right">
            <div className="about-photo-placeholder about-photo-food" style={{ backgroundImage: `url('${foodPhoto}')` }}></div>
            <div className="about-photo-placeholder about-photo-buffet" style={{ backgroundImage: `url('${buffetPhoto}')` }}></div>
          </div>
        </div>
        <div className="about-content">
          <p className="about-label">
            <span className="about-label-line"></span>
            ABOUT US
          </p>
          <h2 id="about-title" className="about-heading">
            About <span className="about-accent">MAIDO</span> Ravintola
          </h2>
          <p className="about-desc">
            Founded in 2025, MAIDO is dedicated to providing an exceptional dining experience through innovative cuisine and impeccable service.
          </p>
          <div className="about-stats">
            <div className="about-stat">
              <span className="about-stat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#113402" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
              </span>
              <span className="about-stat-text">30+ Popular Testy</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#113402" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </span>
              <span className="about-stat-text">4215+ Satisfied</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#113402" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              </span>
              <span className="about-stat-text">We've 19+ Years Of</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#113402" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </span>
              <span className="about-stat-text">49+ Food Items</span>
            </div>
          </div>
          <Link className="about-cta" to="/about">Explore More</Link>
        </div>
      </section>

      <section className="buffet-section" id="buffet" aria-labelledby="buffet-title">
        <div className="buffet-header">
          <p className="buffet-label">ABOUT OUR FOOD</p>
          <h2 id="buffet-title" className="buffet-title">Our Buffet</h2>
        </div>
        <div className="buffet-body">
          <div className="buffet-circle-photo buffet-photo-left" style={{ backgroundImage: `url('${buffetBeef}')` }}></div>
          <ul className="buffet-list">
            {[
              "Teppanjaki",
              "Grilled salmon with green onion oil",
              "All-you-can-eat sushi buffet",
              "Warm and delicious freshly heated dishes",
              "Create your own handmade noodles",
            ].map((item) => (
              <li key={item} className="buffet-item">
                <Link to="/menu">
                  <span>{item}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </Link>
              </li>
            ))}
          </ul>
          <div className="buffet-circle-photo buffet-photo-right" style={{ backgroundImage: `url('${buffetSalad}')` }}></div>
        </div>
      </section>

      <OurMenuSection />
      <OurServiceSection />
      <FeedbackSection />
      <BookingBanner />
      <FAQSection />
    </>
  );
}

const menuCategories = ["Main Courses", "Appetizers", "Beverages", "Desserts"];

const menuItems: Record<string, { name: string; desc: string; color?: string; img?: string }[]> = {
  "Main Courses": [
    { name: "TEPPANJAKI", desc: "Juicy chicken kebabs marinated with spices, grilled to smoky perfection.", img: menuTeppanjaki },
    { name: "SUSHI", desc: "A hearty red lentil soup, rich in flavor and nutrition.", img: menuSushi },
    { name: "STEAM-TABLE", desc: "Fresh, healthy chicken salad with crisp veggies, tangy dressing, and herbs.", img: menuSteamTable },
    { name: "FRIED-FOOD", desc: "Juicy chicken kebabs marinated with spices, grilled to smoky perfection.", img: menuFriedFood },
    { name: "NOODLE", desc: "A hearty red lentil soup, rich in flavor and nutrition.", img: menuNoodle },
    { name: "DUMPLING", desc: "Fresh, healthy chicken salad with crisp veggies, tangy dressing, and herbs.", img: menuDumpling },
  ],
  "Appetizers": [
    { name: "SPRING ROLLS", desc: "Crispy golden rolls filled with fresh vegetables and herbs.", color: "#f39c12" },
    { name: "GYOZA", desc: "Pan-fried dumplings with a crispy bottom and juicy filling.", color: "#d35400" },
    { name: "EDAMAME", desc: "Steamed young soybeans lightly salted for a healthy snack.", color: "#27ae60" },
    { name: "MISO SOUP", desc: "Traditional Japanese soup with tofu, seaweed and green onion.", color: "#a04000" },
    { name: "SALAD BAR", desc: "Fresh seasonal greens with your choice of dressing.", color: "#2ecc71" },
    { name: "CHICKEN WINGS", desc: "Crispy wings glazed with sweet and spicy sauce.", color: "#c0392b" },
  ],
  "Beverages": [
    { name: "GREEN TEA", desc: "Premium Japanese green tea served hot or cold.", color: "#27ae60" },
    { name: "MANGO JUICE", desc: "Fresh squeezed mango juice, refreshing and tropical.", color: "#f39c45" },
    { name: "LEMONADE", desc: "Classic homemade lemonade with a hint of mint.", color: "#f1c40f" },
    { name: "ICED COFFEE", desc: "Smooth cold brew coffee with milk and ice.", color: "#6f4e37" },
    { name: "COCONUT WATER", desc: "Natural coconut water straight from young coconuts.", color: "#d5f5e3" },
    { name: "SAKE", desc: "Traditional Japanese rice wine, served warm or cold.", color: "#fadbd8" },
  ],
  "Desserts": [
    { name: "MOCHI", desc: "Soft rice cake filled with sweet red bean paste.", color: "#f9c0cb" },
    { name: "MATCHA ICE CREAM", desc: "Creamy green tea ice cream with a rich earthy flavor.", color: "#58d68d" },
    { name: "TAIYAKI", desc: "Fish-shaped waffle filled with sweet custard or red bean.", color: "#e59866" },
    { name: "DORAYAKI", desc: "Fluffy pancake sandwich filled with red bean paste.", color: "#d4ac0d" },
    { name: "CHURROS", desc: "Crispy fried dough dusted with cinnamon sugar.", color: "#ca8a04" },
    { name: "CHEESECAKE", desc: "Japanese-style light and fluffy cotton cheesecake.", color: "#fde8d8" },
  ],
};

function OurMenuSection() {
  const [activeCategory, setActiveCategory] = useState("Main Courses");
  const [page, setPage] = useState(0);
  const items = menuItems[activeCategory];
  const totalPages = Math.ceil(items.length / 6);

  function handleCategory(cat: string) {
    setActiveCategory(cat);
    setPage(0);
  }

  return (
    <section className="our-menu-section" id="menu" aria-labelledby="our-menu-title">
      <div className="our-menu-top">
        <div>
          <p className="our-menu-label">OUR MENU</p>
          <h2 id="our-menu-title" className="our-menu-heading">Our Exquisite Menu</h2>
        </div>
        <div className="our-menu-arrows">
          <button
            className="our-menu-arrow"
            aria-label="Previous"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button
            className="our-menu-arrow"
            aria-label="Next"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
      <div className="our-menu-body">
        <nav className="our-menu-sidebar" aria-label="Menu categories">
          {menuCategories.map((cat) => (
            <button
              key={cat}
              className={`our-menu-cat-btn${activeCategory === cat ? " active" : ""}`}
              onClick={() => handleCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </nav>
        <div className="our-menu-grid">
          {items.slice(page * 6, page * 6 + 6).map((item) => (
            <Link to="/menu" key={item.name} className="our-menu-card">
              <div
                className="our-menu-card-img"
                style={item.img
                  ? { backgroundImage: `url('${item.img}')`, backgroundSize: "cover", backgroundPosition: "center" }
                  : { background: item.color }
                }
              ></div>
              <div className="our-menu-card-body">
                <p className="our-menu-card-name">{item.name}</p>
                <p className="our-menu-card-desc">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="our-menu-footer">
        <Link to="/menu" className="our-menu-see-more">See More</Link>
      </div>
    </section>
  );
}

const testimonials = [
  { name: "Sarah Johnson", role: "Student", text: "MAIDO offers an extraordinary dining experience. The food is exquisite, and the ambiance is perfect for a special night out. Highly recommended!", color: "#4a90d9" },
  { name: "Michael Lee", role: "Job holder", text: "From the moment we walked in, we were treated like royalty. The service was impeccable, and the dishes were masterpieces. Can't wait to come back!", color: "#888" },
  { name: "Anh Tran", role: "Student", text: "MAIDO has become our go-to place for celebrations. The chef's tasting menu is a culinary journey that never disappoints.", color: "#f39c45" },
  { name: "Tommi Virtanen", role: "Regular Guest", text: "Amazing buffet with so many choices. Fresh food, friendly staff and great atmosphere. We come here every weekend!", color: "#27ae60" },
  { name: "Aino Mäkinen", role: "Food Blogger", text: "The sushi and teppanyaki are absolutely world-class. Every visit feels like a new adventure. Truly exceptional quality.", color: "#c0392b" },
];

function FeedbackSection() {
  const [start, setStart] = useState(0);
  const visible = 3;
  const total = testimonials.length;

  return (
    <section className="feedback-section">
      <div className="feedback-inner">
        {/* Testimonials */}
        <div className="feedback-header">
          <div className="feedback-header-left">
            <span className="feedback-label">TESTIMONIAL</span>
            <h2 className="feedback-heading">What Our Guests Say</h2>
          </div>
          <div className="feedback-arrows">
            <button className="feedback-arrow" onClick={() => setStart((start - 1 + total) % total)} aria-label="Previous">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button className="feedback-arrow" onClick={() => setStart((start + 1) % total)} aria-label="Next">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
        <div className="feedback-cards">
          {Array.from({ length: visible }).map((_, i) => {
            const t = testimonials[(start + i) % total];
            return (
              <div key={t.name} className="feedback-card">
                <div className="feedback-card-top">
                  <div className="feedback-avatar" style={{ background: t.color }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="feedback-name">{t.name}</p>
                    <p className="feedback-role">{t.role}</p>
                  </div>
                  <svg className="feedback-quote" width="32" height="32" viewBox="0 0 24 24" fill="#f39c45" aria-hidden="true"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                </div>
                <p className="feedback-text">{t.text}</p>
              </div>
            );
          })}
        </div>

        {/* Photo carousel */}
        <div className="feedback-carousel-wrap">
          <div className="feedback-carousel-track">
            {[feedback1, feedback2, feedback3, feedback4, feedback5, feedback6, feedback7, feedbackWall,
              feedback1, feedback2, feedback3, feedback4, feedback5, feedback6, feedback7, feedbackWall].map((img, i) => (
              <div key={i} className="feedback-carousel-item" style={{ backgroundImage: `url('${img}')`, backgroundSize: "cover", backgroundPosition: "center" }}></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const faqItems = [
  { q: "Do I need to make a reservation?", a: "Yes, we recommend making a reservation to ensure you get a table, especially during weekends and holidays. You can book online or call us directly." },
  { q: "Do you offer vegetarian or vegan options?", a: "Yes, we have a variety of vegetarian and vegan dishes available. Please check our menu for more details." },
  { q: "Is parking available?", a: "Yes, there is free parking available near the restaurant. Street parking is also available on nearby streets." },
  { q: "Do you host private events?", a: "Absolutely! We offer private dining and event hosting. Please contact us to discuss your requirements and availability." },
  { q: "What are your opening hours?", a: "MA–TO 10:30–20:30 | PE 10:30–21:30 | LA 11:00–21:30 | SU 12:00–19:00" },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="faq-section">
      <div className="faq-inner">
        <div className="faq-label-row">
          <span className="faq-label">FAQ</span>
          <span className="faq-label-line"></span>
        </div>
        <h2 className="faq-heading">Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqItems.map((item, i) => (
            <div key={i} className={`faq-item${open === i ? " faq-item--open" : ""}`}>
              <button className="faq-question" onClick={() => setOpen(open === i ? null : i)}>
                <span>{item.q}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {open === i ? <polyline points="18 15 12 9 6 15"/> : <polyline points="6 9 12 15 18 9"/>}
                </svg>
              </button>
              {open === i && <p className="faq-answer">{item.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingBanner() {
  return (
    <section className="booking-banner" style={{ backgroundImage: `url('${bookingBg}')` }}>
      <div className="booking-banner-card">
        <h2 className="booking-banner-heading">Book Your Dining Experience Today!</h2>
        <p className="booking-banner-sub">Unlock a Culinary Journey Like No Other at <span className="booking-banner-brand">MAIDO</span></p>
        <div className="booking-banner-form">
          <input className="booking-banner-input" type="email" placeholder="Enter your email address" />
          <Link to="/booking" className="booking-banner-btn">Reserve Now</Link>
        </div>
      </div>
    </section>
  );
}

function OurServiceSection() {
  return (
    <section className="our-service-section">
      <div className="our-service-inner">
        <div className="our-service-text">
          <h2 className="our-service-heading">
            Our <span className="our-service-highlight">MAIDO</span><br />Restaurant Service
          </h2>
          <p className="our-service-desc">
            Food, substance consisting essentially of protein, carbohydrate, fat, and other
            nutrients used in the body of an organism to sustain growth and vital processes
            and to furnish energy. The absorption and utilization of food by the body is
            fundamental to nutrition and is facilitated by digestion.
          </p>
        </div>
        <div className="our-service-photo-wrap">
          <div className="our-service-circle-bg"></div>
          <img src={serviceStaff} alt="Maido restaurant staff" className="our-service-photo" />
        </div>
      </div>
    </section>
  );
}

export default HomePage;