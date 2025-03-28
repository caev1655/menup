// app/components/CategoryPreview.jsx
"use client";
import React from "react";

export default function CategoryPreview({ template, overrides }) {
  // Combina la info del template y de los overrides:
  const layout = overrides.layout || template?.layout || "one-col";
  const backgroundColor = overrides.backgroundColor || template?.backgroundColor || "#ffffff";
  const textColor = overrides.textColor || template?.textColor || "#000000";
  const fontFamily = overrides.fontFamily || template?.fontFamily || "Arial, sans-serif";

  // Definimos estilo del contenedor
  const containerStyle = {
    backgroundColor,
    color: textColor,
    fontFamily,
    padding: "1rem",
    borderRadius: "8px",
    marginTop: "1rem",
  };

  // Layout (ej. "2-cols", "3-cols", etc.) lo transformamos a clases
  let layoutClass = "grid grid-cols-1 gap-4";
  if (layout === "2-cols") layoutClass = "grid grid-cols-2 gap-4";
  if (layout === "3-cols") layoutClass = "grid grid-cols-3 gap-4";

  // Creamos unos platillos ficticios de prueba
  const dummyDishes = [
    { _id: "d1", name: "Platillo 1", description: "Delicioso", price: 100 },
    { _id: "d2", name: "Platillo 2", description: "Exquisito", price: 150 },
  ];

  return (
    <div style={containerStyle}>
      <h3 className="text-lg font-bold">Vista Previa</h3>
      <div className={layoutClass}>
        {dummyDishes.map((dish) => (
          <div key={dish._id} className="border p-3 rounded shadow">
            <h4 className="text-md font-semibold">{dish.name}</h4>
            <p>{dish.description}</p>
            <p className="font-bold mt-2">${dish.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
