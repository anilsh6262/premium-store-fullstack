import { useEffect, useState } from "react";
import { API } from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    API.get(`/products/${id}`).then((res) => {
      setName(res.data.name);
      setPrice(res.data.price);
    });
  }, [id]);

  const handleUpdate = async () => {
    await API.put(`/products/${id}`, { name, price });
    alert("Product updated");
    navigate("/admin");
  };

  return (
    <div>
      <h2>Edit Product</h2>

      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={price} onChange={(e) => setPrice(e.target.value)} />

      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}