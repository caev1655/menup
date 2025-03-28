"use client";
import React from "react";

export default function DishDetailModal({ dish, onClose }) {
  if (!dish) return null;

  const { name, description, price, imageUrl, ingredients } = dish;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center text-gray-800">
      <div className="bg-white max-w-lg w-full rounded-lg p-6 shadow-lg relative">
        <h2 className="text-2xl font-bold mb-4 text-center">{name}</h2>

        {/* Imagen del platillo */}
        <div className="flex justify-center mb-4">
          <img
            src={imageUrl || "/placeholder.jpg"}
            alt={name}
            className="w-64 h-48 object-cover rounded-lg border shadow"
          />
        </div>

        {/* Descripción */}
        <p className="text-sm text-gray-700 mb-2">{description}</p>

        {/* Precio */}
        <p className="text-lg font-bold text-blue-700 mb-4 text-right">${price}</p>

        {/* Ingredientes */}
        {ingredients?.length > 0 && (
          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">🧂 Ingredientes</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              {ingredients.map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Botón cerrar */}
        <div className="text-center mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-white text-sm rounded hover:bg-gray-800"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
