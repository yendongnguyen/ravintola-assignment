const categories = [
  {
    title: "Buffet",
    description: "Fresh rotating lunch buffet with Japanese and Nordic notes."
  },
  {
    title: "Main Dishes",
    description: "Signature bowls, grilled specials, and seasonal house plates."
  },
  {
    title: "Drinks",
    description: "Mocktails, tea, and selected wines to pair with your meal."
  }
];

function MenuCategories() {
  return (
    <section id="menu" className="menu-section" aria-labelledby="menu-heading">
      <h2 id="menu-heading">Explore the Menu</h2>
      <p className="section-intro">Pick a category and discover what to try tonight.</p>
      <div className="category-grid">
        {categories.map((category) => (
          <article key={category.title} className="category-card">
            <h3>{category.title}</h3>
            <p>{category.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default MenuCategories;