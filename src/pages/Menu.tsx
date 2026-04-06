import { Link } from "react-router-dom";
import menuTeppanjaki from "../assets/hero/our-menu-teppanjaki.jpeg";
import menuSushi from "../assets/hero/our-menu-sushi.jpeg";
import menuSteamTable from "../assets/hero/our-menu-steam-table.jpeg";
import menuFriedFood from "../assets/hero/our-menu-fried-food.jpeg";
import menuNoodle from "../assets/hero/our-menu-noodle.jpeg";
import menuDumpling from "../assets/hero/our-menu-dumpling.jpeg";
import heroBg from "../assets/hero/background.png";

/* ── Category images (using existing assets as thumbnails) ── */
const catImages = {
  Appetizers: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=400&fit=crop&auto=format",
  "Main Courses": menuSteamTable,
  Desserts: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop&auto=format",
  Beverages: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=400&fit=crop&auto=format",
};

/* ── Menu data ─────────────────────────────────────────────── */
const menuSections: {
  category: string;
  items: { name: string; desc: string; img: string }[];
}[] = [
  {
    category: "Appetizers",
    items: [
      { name: "Truffle Mushroom Soup", desc: "Creamy soup with wild mushrooms and a hint of truffle oil.", img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop&auto=format" },
      { name: "Crispy Calamari", desc: "Lightly breaded calamari served with a zesty marinara sauce.", img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop&auto=format" },
      { name: "Bruschetta", desc: "Fresh tomatoes, basil, and balsamic glaze on toasted bread.", img: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop&auto=format" },
    ],
  },
  {
    category: "Main Courses",
    items: [
      { name: "Teppanjaki", desc: "Juicy chicken kebabs marinated with spices, grilled to smoky perfection.", img: menuTeppanjaki },
      { name: "Sushi", desc: "A hearty red lentil soup, rich in flavor and nutrition.", img: menuSushi },
      { name: "Steam Table", desc: "Fresh, healthy selections with crisp veggies and tangy dressing.", img: menuSteamTable },
      { name: "Fried Food", desc: "Crispy golden fried favorites, perfectly seasoned.", img: menuFriedFood },
      { name: "Noodle", desc: "Rich and flavorful noodles with savory broth and fresh toppings.", img: menuNoodle },
      { name: "Dumpling", desc: "Delicate dumplings filled with a savory meat and vegetable mix.", img: menuDumpling },
    ],
  },
  {
    category: "Beverages",
    items: [
      { name: "Classic Martini", desc: "Gin or vodka with a touch of vermouth, garnished with an olive.", img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop&auto=format" },
      { name: "Mango Smoothie", desc: "Refreshing blend of ripe mangoes and yogurt.", img: "https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop&auto=format" },
      { name: "Coffee", desc: "Bold, aromatic brew that energizes mornings and warms hearts daily.", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&auto=format" },
    ],
  },
  {
    category: "Desserts",
    items: [
      { name: "Chocolate Lava Cake", desc: "Rich chocolate cake with a molten center, served with vanilla ice cream.", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop&auto=format" },
      { name: "Crème Brûlée", desc: "Classic vanilla custard with a caramelized sugar crust.", img: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&h=300&fit=crop&auto=format" },
      { name: "Ice Cream", desc: "Creamy, sweet, frozen treat bringing joy and delight.", img: "https://images.unsplash.com/photo-1567206563114-c179bba23a4b?w=400&h=300&fit=crop&auto=format" },
    ],
  },
];

function MenuPage() {
  return (
    <div className="menu-page">
      {/* ── Hero Header ─────────────────────────────── */}
      <section className="menu-hero" style={{ backgroundImage: `url('${heroBg}')` }}>
        <div className="menu-hero-content">
          <div className="menu-hero-label-row">
            <span className="menu-hero-label">ORDER</span>
            <span className="menu-hero-label-line"></span>
          </div>
          <h1 className="menu-hero-heading">Our Exquisite Menu</h1>
          <p className="menu-hero-sub">Enjoy the best from MAIDO — fresh, vibrant and full of flavor</p>
          <Link to="/booking" className="menu-hero-btn">Booking Now</Link>
        </div>
      </section>

      {/* ── Popular Categories ───────────────────────── */}
      <section className="menu-categories-section">
        <div className="menu-categories-inner">
          <div className="menu-cat-label-row">
            <span className="menu-cat-label">CUSTOMER FAVORITES</span>
            <span className="menu-cat-label-line"></span>
          </div>
          <h2 className="menu-cat-heading">Popular Categories</h2>
          <div className="menu-cat-grid">
            {(["Appetizers", "Main Courses", "Desserts", "Beverages"] as const).map((cat) => (
              <div key={cat} className="menu-cat-card">
                <div className="menu-cat-img" style={{ backgroundImage: `url('${catImages[cat]}')` }}></div>
                <p className="menu-cat-name">{cat}</p>
              </div>
            ))}
          </div>
          <Link to="#our-menu" className="menu-cat-see-more">See More</Link>
        </div>
      </section>

      {/* ── Main Menu ────────────────────────────────── */}
      <section className="menu-main-section" id="our-menu">
        <div className="menu-main-inner">
          <div className="menu-main-label-row">
            <span className="menu-main-label">OUR MENU</span>
            <span className="menu-main-label-line"></span>
          </div>
          <h2 className="menu-main-heading">Our Exquisite Menu</h2>
          {menuSections.map((section) => (
            <div key={section.category} className="menu-section-block">
              <h3 className="menu-section-title">{section.category}</h3>
              <div className="menu-items-grid">
                {section.items.map((item) => (
                  <div key={item.name} className="menu-item-card">
                    <div
                      className="menu-item-img"
                      style={{ backgroundImage: `url('${item.img}')`, backgroundSize: "cover", backgroundPosition: "center" }}
                    />
                    <div className="menu-item-info">
                      <p className="menu-item-name">{item.name}</p>
                      <p className="menu-item-desc">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default MenuPage;

