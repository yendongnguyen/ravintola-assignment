import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="brand-row">
        <Link className="brand" to="/" onClick={() => setOpen(false)}>
          MAIDO Ravintola
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      <nav className={`top-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
        <NavLink to="/" onClick={() => setOpen(false)}>
          Home
        </NavLink>
        <a href="#menu" onClick={() => setOpen(false)}>
          Menu
        </a>
        <a href="#essentials" onClick={() => setOpen(false)}>
          Visit Info
        </a>
        <NavLink className="book-link" to="/booking" onClick={() => setOpen(false)}>
          Book Table
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;