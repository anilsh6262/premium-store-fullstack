import { Link } from "react-router-dom";
import "../styles/admin.css";

export default function AdminDashboard() {
  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>🛍️ Admin Panel</h2>

        <nav>
  <Link to="/add-product">➕ Add Product</Link>
  <Link to="/products">📦 Products</Link>
  <Link to="/orders">📋 Orders</Link>
  <Link to="/users">👥 Users</Link>
</nav>
      </aside>

      <main className="dashboard-content">
        <h1>Dashboard Overview</h1>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Products</h3>
            <p>120</p>
          </div>

          <div className="stat-card">
            <h3>Total Orders</h3>
            <p>58</p>
          </div>

          <div className="stat-card">
            <h3>Total Users</h3>
            <p>340</p>
          </div>

          <div className="stat-card">
            <h3>Revenue</h3>
            <p>₹75,000</p>
          </div>
        </div>

       <div className="quick-actions">
  <Link to="/add-product" className="action-btn">
    Add New Product
  </Link>

  <button className="action-btn">
    View Orders
  </button>
</div>
      </main>
    </div>
  );
}