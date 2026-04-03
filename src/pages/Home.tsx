import { Link } from "react-router-dom";
import MenuCategories from "../components/MenuCategories";
import EssentialsStrip from "../components/EssentialsStrip";

function HomePage() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Welcome to MAIDO in Kuopio</p>
          <h1 id="hero-title">Menu first. Booking made easy.</h1>
          <p>
            Browse buffet, mains, and drinks in seconds, then reserve your table with
            a short form.
          </p>
          <Link className="cta-primary" to="/booking">
            Book a Table
          </Link>
        </div>
      </section>

      <MenuCategories />
      <EssentialsStrip />
    </>
  );
}

export default HomePage;