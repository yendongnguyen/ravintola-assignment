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
          <NavLink to="/menu" onClick={() => setOpen(false)}>
            Menu
          </NavLink>
          <NavLink to="/booking" onClick={() => setOpen(false)}>
            Varaa pöytä
          </NavLink>
          <a href="#pricing" onClick={() => setOpen(false)}>
            Hinnasto
          </a>
          <NavLink to="/about" onClick={() => setOpen(false)}>
            About us
          </NavLink>
        </nav>
        <div className="header-actions">
          <button className="search-btn" aria-label="Search" title="Search">
            🔍
          </button>
          <a href="tel:+358465486221" className="phone-cta">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.14 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.05 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            046 548 6221
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
        <NavLink to="/menu" onClick={() => setOpen(false)}>
          Menu
        </NavLink>
        <NavLink to="/booking" onClick={() => setOpen(false)}>
          Varaa pöytä
        </NavLink>
        <a href="#pricing" onClick={() => setOpen(false)}>
          Hinnasto
        </a>
        <NavLink to="/about" onClick={() => setOpen(false)}>
          About us
        </NavLink>
        <a href="tel:+358465486221" className="phone-cta-mobile">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.14 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.05 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          046 548 6221
        </a>
      </nav>
    </header>
  );
}

export default Header;