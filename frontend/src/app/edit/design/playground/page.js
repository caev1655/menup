// app/design/playground/page.js
"use client";
import { useState } from "react";

/**
 * Esta página oculta la barra principal
 * y muestra un menú "publicado" con estilo minimalista,
 * además de un botón "Editar" para abrir un panel de edición.
 */
export default function DesignPlaygroundPage() {
  // 1) Estado "editMode": si estamos en modo edición o no.
  const [editMode, setEditMode] = useState(false);

  // 2) Estados para estilo (color, background, etc.)
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#333333");
  const [fontFamily, setFontFamily] = useState("Arial, sans-serif");
  const [layout, setLayout] = useState("2-cols");

  // 3) Platillos / categorías dummy (o real fetch en useEffect)
  const categories = [
    {
      _id: "cat1",
      name: "Entradas",
      dishes: [
        { _id: "d1", name: "Ensalada Verde", price: 80 },
        { _id: "d2", name: "Sopa de Tomate", price: 60 },
      ]
    },
    {
      _id: "cat2",
      name: "Platos Fuertes",
      dishes: [
        { _id: "d3", name: "Pollo al Curry", price: 120 },
        { _id: "d4", name: "Carne Asada", price: 140 },
      ]
    }
  ];

  // 4) Función para togglear modo edición
  function handleToggleEdit() {
    setEditMode(!editMode);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Barra Superior Minimalista */}
      <div className="flex items-center justify-between bg-white px-4 py-2 shadow-sm">
        <h1 className="text-lg font-bold text-gray-700">Menú Publicado</h1>
        <button
          onClick={handleToggleEdit}
          className="border border-gray-300 px-3 py-1 rounded hover:bg-gray-50"
        >
          {editMode ? "Cerrar Edición" : "Editar"}
        </button>
      </div>

      {/* Vista Publicada */}
      <MenuPublishedView
        categories={categories}
        bgColor={bgColor}
        textColor={textColor}
        fontFamily={fontFamily}
        layout={layout}
      />

      {/* Barra / Panel de Edición si editMode === true */}
      {editMode && (
        <EditPanel
          bgColor={bgColor} 
          onBgColorChange={setBgColor}
          textColor={textColor}
          onTextColorChange={setTextColor}
          fontFamily={fontFamily}
          onFontFamilyChange={setFontFamily}
          layout={layout}
          onLayoutChange={setLayout}
        />
      )}
    </div>
  );
}

/** 
 * Muestra el menú tal como lo vería el usuario final, 
 * con un estilo minimalista y un layout de categorías y platillos.
 */
function MenuPublishedView({ categories, bgColor, textColor, fontFamily, layout }) {
  // Determinar clases de grid
  let gridClass = "grid grid-cols-1 gap-4";
  if (layout === "2-cols") gridClass = "grid grid-cols-2 gap-4";
  if (layout === "3-cols") gridClass = "grid grid-cols-3 gap-4";

  const containerStyle = {
    backgroundColor: bgColor,
    color: textColor,
    fontFamily: fontFamily,
    padding: "1rem"
  };

  return (
    <div style={containerStyle} className="mt-4 mx-4 rounded-lg shadow p-4">
      {categories.map(cat => (
        <div key={cat._id} className="mb-8">
          <h2 className="text-xl font-semibold mb-3">{cat.name}</h2>
          <div className={gridClass}>
            {cat.dishes.map(dish => (
              <div key={dish._id} className="border border-gray-200 rounded p-3 text-sm">
                <h3 className="font-bold">{dish.name}</h3>
                <p className="mt-1">${dish.price}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** 
 * Un panel / barra de edición minimalista para cambiar 
 * color de fondo, color de texto, tipografía y layout 
 */
function EditPanel({
  bgColor, onBgColorChange,
  textColor, onTextColorChange,
  fontFamily, onFontFamilyChange,
  layout, onLayoutChange
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 rounded-t-xl shadow p-3">
      <h3 className="text-gray-700 font-semibold mb-2">Editar Apariencia</h3>

      <div className="flex flex-wrap gap-4">
        {/* Color de Fondo */}
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-500">Fondo:</label>
          <input 
            type="color" 
            value={bgColor} 
            onChange={(e) => onBgColorChange(e.target.value)}
          />
        </div>

        {/* Color de Texto */}
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-500">Texto:</label>
          <input 
            type="color" 
            value={textColor} 
            onChange={(e) => onTextColorChange(e.target.value)}
          />
        </div>

        {/* Tipografía */}
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-500">Fuente:</label>
          <select 
            value={fontFamily} 
            onChange={(e) => onFontFamilyChange(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="Arial, sans-serif">Arial</option>
            <option value="Helvetica, sans-serif">Helvetica</option>
            <option value="'Times New Roman', serif">Times New Roman</option>
            <option value="'Courier New', monospace">Courier New</option>
          </select>
        </div>

        {/* Layout */}
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-500">Layout:</label>
          <select 
            value={layout}
            onChange={(e) => onLayoutChange(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="1-cols">1 Columna</option>
            <option value="2-cols">2 Columnas</option>
            <option value="3-cols">3 Columnas</option>
          </select>
        </div>
      </div>
    </div>
  );
}
