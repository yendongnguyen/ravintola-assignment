import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { LanguageProvider } from "./i18n/LanguageContext";
import Header from "./components/Header";
import HomePage from "./pages/Home";
import BookingPage from "./pages/Booking";
import AboutPage from "./pages/About";
import MenuPage from "./pages/Menu";
import Footer from "./components/Footer";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function ScrollReveal() {
  const { pathname } = useLocation();
  useEffect(() => {
    const targets = document.querySelectorAll(
      "section, .about-section, .buffet-section, .menu-section, .service-section, " +
      ".feedback-section, .booking-section, .essentials-strip, .card, " +
      ".menu-category-card, .buffet-item, .about-stat"
    );
    targets.forEach((el) => el.classList.add("reveal"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);
  return null;
}

function App() {
  return (
    <LanguageProvider>
    <div className="site-shell">
      <ScrollToTop />
      <ScrollReveal />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
    </LanguageProvider>
  );
}

export default App;