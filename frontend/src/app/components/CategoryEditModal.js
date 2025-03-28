"use client";
import React, { useState, useEffect } from "react";
import ConfirmModal from "./ConfirmModal";

export default function CategoryEditModal({ category, onClose, onUpdate }) {
  const [name, setName] = useState(category?.name || "");
  const [templateId, setTemplateId] = useState(category?.templateId || "");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    if (category) {
      setName(category.name || "");
      setTemplateId(category.templateId || "");
    }
  }, [category]);

  const handleSave = async () => {
    if (!name.trim()) {
      alert("El nombre es obligatorio.");
      return;
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:4000/api/categories/${category._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          templateId: templateId || null,
        }),
      });

      if (!res.ok) throw new Error("Error al guardar cambios");

      await onUpdate(); // Refresca categorías y platillos desde el padre
      onClose();
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setShowConfirmDelete(false);
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:4000/api/categories/${category._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error al eliminar categoría");

      await onUpdate();
      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center text-gray-800">
      <div className="bg-white max-w-md w-full rounded-lg p-6 shadow relative">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Editar Categoría</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Nombre</label>
            <input
              type="text"
              className="w-full border p-2 rounded text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Si usas templates */}
          {/* <div>
            <label className="block text-sm font-semibold mb-1">Plantilla (opcional)</label>
            <input
              type="text"
              className="w-full border p-2 rounded text-sm"
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value)}
            />
          </div> */}

          <div className="flex justify-between gap-3 pt-4">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
            >
              {isLoading ? "Guardando..." : "💾 Guardar"}
            </button>

            <button
              onClick={() => setShowConfirmDelete(true)}
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

      <ConfirmModal
        isOpen={showConfirmDelete}
        title="Eliminar Categoría"
        message="Esta acción también eliminará todos los platillos asociados. ¿Seguro que deseas continuar?"
        onCancel={() => setShowConfirmDelete(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
