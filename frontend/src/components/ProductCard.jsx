import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        borderRadius: "10px",
      }}
    >
      {product.images?.length > 0 && (
        <img
          src={`http://127.0.0.1:5000/${product.images[0]}`}
          alt={product.name}
          width="100%"
          height="200"
        />
      )}

      <h3>{product.name}</h3>

      <h4>₹{product.price}</h4>

      <Link to={`/product/${product._id}`}>
        View Product
      </Link>
    </div>
  );
}