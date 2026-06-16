import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      {/* IMAGE */}
      {product.images && product.images.length > 0 ? (
        <img
          src={product.images[0]}   // ✅ Cloudinary URL directly
          alt={product.name}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
          onError={(e) => {
            e.target.src =
              "https://dummyimage.com/300x200/cccccc/000000&text=Image+Not+Found";
          }}
        />
      ) : (
        <img
          src="https://dummyimage.com/300x200/cccccc/000000&text=No+Image"
          alt="No Image"
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        />
      )}

      {/* PRODUCT INFO */}
      <h3 style={{ margin: "10px 0" }}>{product.name}</h3>

      <p style={{ color: "#555", fontSize: "14px" }}>
        {product.description}
      </p>

      <h4 style={{ margin: "10px 0", color: "#2e7d32" }}>
        ₹ {product.price}
      </h4>

      {/* VIEW BUTTON */}
      <Link
        to={`/product/${product._id}`}
        style={{
          display: "inline-block",
          padding: "8px 12px",
          backgroundColor: "#1976d2",
          color: "#fff",
          borderRadius: "5px",
          textDecoration: "none",
          marginTop: "10px",
        }}
      >
        View Product
      </Link>
    </div>
  );
}