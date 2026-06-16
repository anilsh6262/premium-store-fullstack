import "../styles/addproduct.css";
import { useState } from "react";
import { API } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);

  const navigate = useNavigate();

  const addProduct = async () => {
    try {
      if (!name || !description || !price || images.length === 0) {
        alert("⚠️ Please fill all fields and select images");
        return;
      }

      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);

      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      const token = localStorage.getItem("token");

      await API.post("/api/admin/product", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product Added Successfully 🎉");

      navigate("/products");

    } catch (err) {
      console.log("STATUS:", err.response?.status);
      console.log("DATA:", err.response?.data);
      console.log("FULL ERROR:", err);
      alert("Failed to add product");
    }
  };

  return (
    <div className="add-product-container">
      <div className="add-product-card">
        <h2 className="add-product-title">➕ Add Product</h2>

        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)}
        />

        <p>{images.length > 0 && `${images.length} files selected`}</p>

        <button onClick={addProduct}>
          Add Product
        </button>
      </div>
    </div>
  );
}