import { Link } from "react-router-dom";
import saladBowl from "../assets/hero/salad bowl.png";
import friedChicken from "../assets/hero/fried chicken.png";
import bgImage from "../assets/hero/background.png";

function HomePage() {
  return (
    <section 
      className="hero" 
      aria-labelledby="hero-title"
      style={{
        backgroundImage: `url('${bgImage}')`
      }}
    >
      <div className="hero-overlay"></div>
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
  );
}

export default HomePage;