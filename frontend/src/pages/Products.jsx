import { useEffect, useState } from "react";
import { API } from "../services/api";
import "./products.css";
import { BASE_URL } from "../config";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await API.get("/api/products");
      setProducts(res.data);
    } catch (err) {
      console.log("PRODUCT ERROR:", err.response?.data || err.message);
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
          {products.map((item) => {

            // ✅ FIX: extract only filename
            const filename =
              item.images?.[0]?.split("/").pop();

            return (
              <div className="product-card" key={item._id}>
                
                <img
                  src={
                    filename
                      ? `${BASE_URL}/uploads/products/${filename}`
                      : "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={item.name}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x200?text=Image+Not+Found";
                  }}
                />

                <h3>{item.name}</h3>
                <p>{item.description}</p>

                <p>
                  <strong>₹ {item.price}</strong>
                </p>

                <button>Add to Cart</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}