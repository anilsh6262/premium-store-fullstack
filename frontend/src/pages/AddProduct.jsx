import "../styles/addproduct.css";
import { useState } from "react";
import { API } from "../services/api";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);

  const addProduct = async () => {
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append(
        "description",
        description
      );
      formData.append("price", price);

      for (let i = 0; i < images.length; i++) {
        formData.append(
          "images",
          images[i]
        );
      }

      const token =
        localStorage.getItem("token");

     await API.post(
  "/api/admin/product",
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      // ❌ DO NOT set Content-Type here
    },
  }
);
      alert("Product Added");
    } catch (err) {
  console.log("STATUS:", err.response?.status);
 console.log("DATA:", JSON.stringify(err.response?.data));
  console.log("FULL ERROR:", err);
}
  };

  return (
    <div className="add-product-container">
  <div className="add-product-card">
    <h2 className="add-product-title">
      ➕ Add Product
    </h2>

    <div className="form-group">
      <input
        className="form-control"
        placeholder="Product Name"
        onChange={(e) =>
          setName(e.target.value)
        }
      />
    </div>

    <div className="form-group">
      <textarea
        className="form-control"
        placeholder="Description"
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />
    </div>

    <div className="form-group">
      <input
        className="form-control"
        type="number"
        placeholder="Price"
        onChange={(e) =>
          setPrice(e.target.value)
        }
      />
    </div>

    <div className="form-group">
      <input
        className="file-upload"
        type="file"
        multiple
        onChange={(e) =>
          setImages(e.target.files)
        }
      />

      {images.length > 0 && (
        <p className="preview-count">
          {images.length} file(s) selected
        </p>
      )}
    </div>

    <button
      className="add-product-btn"
      onClick={addProduct}
    >
      Add Product
    </button>
  </div>
</div>
  );
}