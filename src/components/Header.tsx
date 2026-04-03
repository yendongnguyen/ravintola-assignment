import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/hero/logo.png";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="brand-row">
        <Link className="brand" to="/" onClick={() => setOpen(false)}>
          <img src={logo} alt="MAIDO" className="logo-img" />
        </Link>
        <nav className="top-nav-desktop" aria-label="Main navigation">
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <a href="#menu" onClick={() => setOpen(false)}>
            Menu
          </a>
          <a href="#booking" onClick={() => setOpen(false)}>
            Varaa pöytä
          </a>
          <a href="#pricing" onClick={() => setOpen(false)}>
            Hinnasto
          </a>
          <a href="#about" onClick={() => setOpen(false)}>
            About us
          </a>
        </nav>
        <div className="header-actions">
          <button className="search-btn" aria-label="Search" title="Search">
            🔍
          </button>
          <a href="tel:+358465486221" className="phone-cta">
            📞 046 548 6221
          </a>
        </div>
        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
      <nav className={`top-nav-mobile ${open ? "is-open" : ""}`} aria-label="Mobile navigation">
        <NavLink to="/" onClick={() => setOpen(false)}>
          Home
        </NavLink>
        <a href="#menu" onClick={() => setOpen(false)}>
          Menu
        </a>
        <a href="#booking" onClick={() => setOpen(false)}>
          Varaa pöytä
        </a>
        <a href="#pricing" onClick={() => setOpen(false)}>
          Hinnasto
        </a>
        <a href="#about" onClick={() => setOpen(false)}>
          About us
        </a>
        <a href="tel:+358465486221" className="phone-cta-mobile">
          📞 046 548 6221
        </a>
      </nav>
    </header>
  );
}

export default Header;