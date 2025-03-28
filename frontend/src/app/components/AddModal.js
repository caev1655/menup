"use client";
import { useEffect, useState } from "react";

export default function AddModal({ type, onClose, onSubmit, menuId }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  // Cargar categorías si es tipo "dish"
  useEffect(() => {
    if (type === "dish") {
      const token = localStorage.getItem("token");
      if (token) fetchCategories(token);
    }
  }, [type]);

  const fetchCategories = async (token) => {
    try {
      const res = await fetch(`http://localhost:4000/api/categories?menuId=${menuId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Error al cargar categorías", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    let imageUrl = "";

    if (type === "dish" && image) {
      try {
        const formData = new FormData();
        formData.append("image", image);

        const uploadRes = await fetch("http://localhost:4000/api/dishes/upload-image-cloud", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url;
      } catch (err) {
        alert("Error al subir imagen");
        return;
      }
    }


    const payload = {
      menuId,
      name,
    };

    if (type === "category") {
      onSubmit(payload);
    }

    if (type === "dish") {
      payload.description = description;
      payload.price = parseFloat(price);
      payload.imageUrl = imageUrl;
      payload.category = categoryId || null;
      payload.status = "available";
      onSubmit(payload);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center text-gray-800">
      <div className="bg-white max-w-md w-full rounded-lg p-6 shadow relative">
        <h2 className="text-xl font-bold mb-4">Agregar {type === "category" ? "Categoría" : "Platillo"}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre"
            required
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {type === "dish" && (
            <>
              <textarea
                placeholder="Descripción"
                required
                className="w-full border p-2 rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="number"
                placeholder="Precio"
                required
                className="w-full border p-2 rounded"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <select
                className="w-full border p-2 rounded"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Sin categoría</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <input
                type="file"
                accept="image/*"
                className="w-full border p-2 rounded"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
