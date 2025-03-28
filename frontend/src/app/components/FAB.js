"use client";
import { useState } from "react";

export default function FAB({ onAddCategory, onAddDish }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-2 text-blue-500">
      {showMenu && (
        <div className="flex flex-col mb-2 gap-2 animate-fade-in">
          <button
            onClick={() => {
              onAddCategory();
              setShowMenu(false);
            }}
            className="bg-white border border-gray-300 shadow px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
          >
            ➕ Agregar Categoría
          </button>
          <button
            onClick={() => {
              onAddDish();
              setShowMenu(false);
            }}
            className="bg-white border border-gray-300 shadow px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
          >
            ➕ Agregar Platillo
          </button>
        </div>
      )}

      <button
        onClick={() => setShowMenu((prev) => !prev)}
        className="bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full text-3xl shadow-lg flex items-center justify-center"
        title="Agregar"
      >
        +
      </button>
    </div>
  );
}
