"use client";
import React, { useEffect, useState } from "react";

export default function DishEditModal({ dish, onClose, onUpdate, onDelete }) {
  const [name, setName] = useState(dish?.name || "");
  const [description, setDescription] = useState(dish?.description || "");
  const [price, setPrice] = useState(dish?.price || "");
  const [imageUrl, setImageUrl] = useState(dish?.imageUrl || "");
  const [newImageFile, setNewImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (dish) {
      setName(dish.name || "");
      setDescription(dish.description || "");
      setPrice(dish.price || "");
      setImageUrl(dish.imageUrl || "");
    }
  }, [dish]);

  const handleImageUpload = async () => {
    if (!newImageFile) return imageUrl;

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("image", newImageFile);

      const res = await fetch("http://localhost:4000/api/dishes/upload-image-cloud", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Error al subir imagen");

      const data = await res.json();
      return data.url;
    } catch (err) {
      alert(err.message);
      return imageUrl; // si falla, conservar imagen actual
    }
  };

  const handleSave = async () => {
    if (!name || !description || !price) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      setIsLoading(true);

      const finalImageUrl = await handleImageUpload();

      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:4000/api/dishes/${dish._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          description,
          price: parseFloat(price),
          imageUrl: finalImageUrl,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Error al guardar cambios");
      }

      onUpdate();
      onClose();
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center text-gray-800">
      <div className="bg-white max-w-md w-full rounded-lg p-6 shadow relative">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Editar Platillo</h2>

        <div className="space-y-4">
          {/* Vista previa de imagen */}
          <div className="flex flex-col items-center">
            <img
              src={newImageFile ? URL.createObjectURL(newImageFile) : imageUrl || "/placeholder.jpg"}
              alt="Preview"
              className="w-40 h-32 object-cover rounded shadow border"
            />
            <input
              type="file"
              accept="image/*"
              className="mt-2 text-sm"
              onChange={(e) => setNewImageFile(e.target.files[0])}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Nombre</label>
            <input
              type="text"
              className="w-full border p-2 rounded text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Descripción</label>
            <textarea
              className="w-full border p-2 rounded text-sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Precio</label>
            <input
              type="number"
              step="0.01"
              className="w-full border p-2 rounded text-sm"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="flex justify-between gap-3 pt-4">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
            >
              {isLoading ? "Guardando..." : "💾 Guardar"}
            </button>

            <button
              onClick={onDelete}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
            >
              🗑 Eliminar
            </button>
          </div>

          <div className="text-center pt-3">
            <button
              onClick={onClose}
              className="text-sm text-gray-500 hover:text-gray-800 underline"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
