import { useEffect, useState } from "react";
import { API } from "../services/api";
import "./products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await API.get("/api/products");

      console.log("PRODUCTS:", res.data);

      setProducts(res.data);
    } catch (err) {
      console.log(
        "PRODUCT ERROR:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="products-container">
        <h1 className="title">🛍️ Our Products</h1>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="products-container">
      <h1 className="title">🛍️ Our Products</h1>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="products-grid">
          {products.map((item) => (
            <div
              className="product-card"
              key={item._id}
            >
              {/* PRODUCT IMAGE */}
              {item.images &&
              item.images.length > 0 ? (
                <img
                 {`https://premium-store-fullstack-1.onrender.com/uploads/products/${product.image}`}
  alt={product.name}
                />
              ) : (
                <img
                  src="https://via.placeholder.com/300x200?text=No+Image"
                  alt="No Image"
                />
              )}

              <h3>{item.name}</h3>

              <p>{item.description}</p>

              <p>
                <strong>
                  ₹ {item.price}
                </strong>
              </p>

              <button>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}