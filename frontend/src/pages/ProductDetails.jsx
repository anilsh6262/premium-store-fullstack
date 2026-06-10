import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Product Details</h2>

      <p>Product ID: {id}</p>
    </div>
  );
}