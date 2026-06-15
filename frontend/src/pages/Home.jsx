import "../styles/home.css";

export default function Home() {
  return (
    <div className="home-container">

      {/* HERO SECTION */}
      <div className="hero">
        <div className="overlay">
          <h1>🛍️ Premium Store</h1>
          <p>
            A modern online shopping platform where customers can
            browse products, place orders, and enjoy a smooth
            shopping experience.
          </p>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <section className="about-section">
        <h2>About Our Store</h2>

        <p>
          Premium Store is a full-stack e-commerce platform built to
          provide customers with a secure and user-friendly shopping
          experience. Users can browse products, view details, and
          purchase items online with ease.
        </p>

        <p>
          The platform includes customer authentication, product
          management, admin dashboard functionality, and a responsive
          design that works across desktop and mobile devices.
        </p>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <h2>Why Choose Us?</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3>🔒 Secure Login</h3>
            <p>User authentication with JWT security.</p>
          </div>

          <div className="feature-card">
            <h3>🛒 Easy Shopping</h3>
            <p>Browse and purchase products effortlessly.</p>
          </div>

          <div className="feature-card">
            <h3>⚡ Fast Performance</h3>
            <p>Built using React, Flask and MongoDB.</p>
          </div>

          <div className="feature-card">
            <h3>📱 Responsive Design</h3>
            <p>Works seamlessly on mobile and desktop.</p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section">
        <h2>Contact Us</h2>

        <p>Email: support@premiumstore.com</p>
        <p>Phone: +91 98765 43210</p>
        <p>Location: Bangalore, Karnataka, India</p>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 Premium Store. All Rights Reserved.</p>
      </footer>

    </div>
  );
}