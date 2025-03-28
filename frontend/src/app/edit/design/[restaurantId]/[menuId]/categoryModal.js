// app/design/[restaurantId]/[menuId]/CategoryModal.js
"use client";
import { useState } from "react";
import { API_URL } from "@/app/config/api";

export default function CategoryModal({ category, onClose, onSave }) {
  const [name, setName] = useState(category.name);
  const [backgroundColor, setBackgroundColor] = useState(category.backgroundColor || "#ffffff");
  const [textColor, setTextColor] = useState(category.textColor || "#000000");
  const [fontFamily, setFontFamily] = useState(category.fontFamily || "Arial, sans-serif");

  async function handleSave() {
    // Llamar PUT /api/categories/:id
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/categories/${category._id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          backgroundColor,
          textColor,
          fontFamily
        })
      });
      if (!res.ok) throw new Error("Error al actualizar la categoría");
      const updatedCat = await res.json();

      onSave(updatedCat);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error al guardar");
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded w-96">
        <h2 className="text-lg font-semibold mb-3">Editar Categoría</h2>
        
        {/* Campos */}
        <div className="mb-3">
          <label className="block font-semibold">Nombre:</label>
          <input
            className="border p-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="block font-semibold">Color de Fondo:</label>
          <input
            type="color"
            className="border p-1"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="block font-semibold">Color de Texto:</label>
          <input
            type="color"
            className="border p-1"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="block font-semibold">Tipografía:</label>
          <input
            className="border p-2 w-full"
            placeholder="Arial, sans-serif"
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
          />
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
