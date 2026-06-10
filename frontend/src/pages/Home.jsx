import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  return (
    <div className="home-container">
      <div className="navbar"></div>
      
      {/* HERO SECTION */}
      <div className="hero">
        <h1>✨ Premium Products Store</h1>
        <p>Discover handmade & custom gifts at best price</p>
      </div>

      {/* PRODUCTS GRID */}
      <div className="products-section">
        <h2>🔥 Latest Products</h2>

        <div className="product-grid">

          {/* SAMPLE CARD (we will connect API later) */}
          <div className="product-card">
            <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" />
            <h3>Birthday Frame</h3>
            <p>Beautiful handmade gift</p>
            <span>₹499</span>
          </div>

          <div className="product-card">
            <img src="https://images.unsplash.com/photo-1520975916090-3105956dac38" />
            <h3>Custom Photo Frame</h3>
            <p>Personalized design</p>
            <span>₹699</span>
          </div>

          <div className="product-card">
            <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38" />
            <h3>Mini Gift Box</h3>
            <p>Surprise box set</p>
            <span>₹299</span>
          </div>

        </div>
      </div>

    </div>
  );
}