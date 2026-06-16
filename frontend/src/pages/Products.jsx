import { useEffect, useState } from "react";
import { API } from "../services/api";
import "./products.css";

const BASE_URL = "https://premium-store-fullstack-1.onrender.com";

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

  const getImageUrl = (image) => {
    if (!image) {
      return "https://dummyimage.com/300x200/cccccc/000000&text=No+Image";
    }

    // If already full URL (Cloudinary etc.)
    if (image.startsWith("http")) {
      return image;
    }

    // Local backend image fix
    const filename = image.split("/").pop();

    return `${BASE_URL}/uploads/products/${filename}`;
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
            <div className="product-card" key={item._id}>
              
              {/* IMAGE FIXED */}
              <img
                src={getImageUrl(item.images?.[0])}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
                onError={(e) => {
                  e.target.src =
                    "https://dummyimage.com/300x200/cccccc/000000&text=Image+Not+Found";
                }}
              />

              <h3>{item.name}</h3>
              <p>{item.description}</p>

              <p>
                <strong>₹ {item.price}</strong>
              </p>

              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}