import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";
import LazyImage from "./LazyImage";
import logo from "../assets/hero/logo-removebg.png";

function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer-main">
      <div className="footer-inner">
        {/* Explore */}
        <div className="footer-col">
          <p className="footer-col-title">{t.footer.explore}</p>
          <Link to="/" className="footer-link">{t.nav.home}</Link>
          <Link to="/menu" className="footer-link">{t.nav.menu}</Link>
          <Link to="/booking" className="footer-link">{t.nav.booking}</Link>
          <Link to="/pricing" className="footer-link">{t.nav.pricing}</Link>
          <Link to="/about" className="footer-link">{t.nav.about}</Link>
        </div>

        {/* Brand */}
        <div className="footer-brand">
          <LazyImage src={logo} alt="MAIDO" className="footer-logo" />
          <p className="footer-address">Kauppakatu 29, 70100 Kuopio</p>
          <p className="footer-address"><strong>AVOINNA</strong></p>
          <p className="footer-address">MA – TO klo 10:30 – 20:30</p>
          <p className="footer-address">PE klo 10:30 – 21:30</p>
          <p className="footer-address">LA klo 11:00 – 21:30</p>
          <p className="footer-address">SU klo 12:00 – 19:00</p>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <p className="footer-col-title">{t.footer.contact}</p>
          <a href="tel:0465486221" className="footer-link footer-contact-row">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.51 5.51l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>
            046 548 6221
          </a>
          <a href="mailto:asiakaspalvelu@maidoravintola.fi" className="footer-link footer-contact-row">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            asiakaspalvelu@maidoravintola.fi
          </a>
          <div className="footer-socials">
            <a href="https://www.facebook.com/maidoravintola" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://www.instagram.com/maido.ravintola/" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 MAIDO Ravintola. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;