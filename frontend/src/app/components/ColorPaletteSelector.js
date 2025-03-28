// components/ColorPaletteSelector.js
import React, { useState } from "react";

const COLOR_THEMES = [
  {
    name: "Paleta Otoño",
    colors: ["#9A3412", "#D97706", "#F59E0B", "#CA8A04", "#78350F"],
  },
  {
    name: "Paleta Verano",
    colors: ["#22D3EE", "#06B6D4", "#3B82F6", "#60A5FA", "#A78BFA"],
  },
  {
    name: "Paleta Pastel",
    colors: ["#FCE7F3", "#FBCFE8", "#E0E7FF", "#FDE68A", "#D1FAE5"],
  },
  {
    name: "Paleta 2",
    colors: ["#606c38", "#283618", "#fefae0", "#dda15e", "#bc6c25"],
  },
  {
    name: "Paleta 3",
    colors: ["#8ecae6", "#219ebc", "#023047", "#ffb703", "#fb8500"],
  },

  {
    name: "Paleta 4",
    colors: ["#000000", "#14213d", "#fca311", "#e5e5e5", "#ffffff"],
  },
  {
    name: "Paleta 5",
    colors: ["#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff"],
  },
  {
    name: "Paleta 6",
    colors: ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"],
  },
  {
    name: "Paleta 7",
    colors: ["#5f0f40", "#9a031e", "#fb8b24", "#e36414", "#0f4c5c"],
  },
  {
    name: "Paleta 8",
    colors: ["#f6bd60", "#e07a5f", "#3d405b", "#81b29a", "#f2cc8f"],
  },
  
];

const COLOR_GRADUAL = [
  {
    name: "Gradual 1",
    colors: ["#03045e", "#023e8a", "#0077b6", "#0096c7", "#00b4d8"],
  },
  {
    name: "Gradual 2",
    colors: ["#081c15", "#1b4332", "#2d6a4f", "#40916c", "#52b788"],
  },
  {
    name: "Gradual 3",
    colors: ["#10002b", "#240046", "#3c096c", "#5a189a", "#7b2cbf"],
  },
  {
    name: "Gradual 4",
    colors: ["#ff7b00", "#ff8800", "#ff9500", "#ffb700", "#ffdd00"],
  },
  {
    name: "Gradual 5",
    colors: ["#ff0a54", "#ff477e", "#ff5c8a", "#ff7096", "#ff85a1"],
  },

  {
    name: "Gradual 6",
    colors: ["#76520e", "#926c15", "#b69121", "#dbb42c", "#fad643"],
  },
  {
    name: "Gradual 7",
    colors: ["#7400b8", "#6930c3", "#5e60ce", "#5390d9", "#4ea8de"],
  },
  {
    name: "Gradual 8",
    colors: ["#212529", "#343a40", "#495057", "#6c757d", "#adb5bd"],
  },
  {
    name: "Gradual 9",
    colors: ["#577590", "#43aa8b", "#90be6d", "#f9c74f", "#f8961e"],
  },
  {
    name: "Gradual 10",
    colors: ["#fffcf2", "#ccc5b9", "#403d39", "#252422", "#eb5e28"],
  },
  
];

const GRADIENTS = [
  { name: "Rosa-Naranja", gradient: "linear-gradient(to bottom, #f43f5e, #f97316)", firstColor:" #f43f5e"},
  { name: "Azul-Morado", gradient: "linear-gradient(to bottom, #4f46e5, #9333ea)", firstColor:" #4f46e5" },
  { name: "Aqua-Turquesa", gradient: "linear-gradient(to bottom, #0606d4,#14b8a6)", firstColor:" #14b8a6" },
  { name: "Verde Lima", gradient: "linear-gradient(to bottom, #ffcc16, #22c55e)" , firstColor:" #84cc16"},
];

export default function ColorPaletteSelector({ label = "Color", onSelect, selectedColor }) {
  const [customColor, setCustomColor] = useState(selectedColor || "#ffffff");
  const [gradientA, setGradientA] = useState("#000000");
  const [gradientB, setGradientB] = useState("#ffffff");

  return (
    <div className="space-y-0  ">
      {/* Color personalizado SIEMPRE visible */}
      <div className="flex justify-center"> 
        <input
          type="text"
          value={customColor}
          maxLength={7}
          onChange={(e) => setCustomColor(e.target.value) }
          className="w-32 p-1  rounded-tl-md rounded-tr-md border-t-2 border-l-2 border-r-2 border-gray-900  font-semibold text-center text-2xl text-black"
          placeholder="#ffffff"
        />
         
        <button
          className="px-2 py-1  bg-gray-500 hover:bg-gray-300 rounded  "
          onClick={() => onSelect(customColor)}
        >
          Aplicar
        </button>
       
      </div>

      <div className="flex overflow-x-auto snap-x snap-mandatory h-36 rounded bg-gray-950">
   {/* SECCIÓN 1: COLOR_THEMES */}
   <div className="min-w-full snap-start px-4 py-2 flex flex-col overflow-hidden">
    <h3 className="text-white text-xs font-semibold mb-2">🎨 Paletas de Color</h3>
    <div className="flex flex-col gap-2 overflow-y-auto max-h-[90px] pr-1">
      {COLOR_THEMES.map((theme, index) => (
        <div key={index}>
          <span className="text-[10px] text-white mb-1 block">{theme.name}</span>
          <div className="grid grid-cols-5 gap-2">
            {theme.colors.map((color, idx) => (
              <button
                key={idx}
                className={`aspect-square rounded border ${
                  selectedColor === color ? "ring-2 ring-white" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => {
                  setCustomColor(color);
                  onSelect(color);
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>


  {/* SECCIÓN 2: COLOR_GRADUAL */}
 <div className="min-w-full snap-start px-4 py-2 flex flex-col overflow-hidden">
    <h3 className="text-white text-xs font-semibold mb-2">🎨 Paletas de Gradual</h3>
    <div className="flex flex-col gap-2 overflow-y-auto max-h-[90px] pr-1">
      {COLOR_GRADUAL.map((theme, index) => (
        <div key={index}>
          <span className="text-[10px] text-white mb-1 block">{theme.name}</span>
          <div className="grid grid-cols-5 gap-2">
            {theme.colors.map((color, idx) => (
              <button
                key={idx}
                className={`aspect-square rounded border ${
                  selectedColor === color ? "ring-2 ring-white" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => {
                  setCustomColor(color);
                  onSelect(color);
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>


  {/* SECCIÓN 3: GRADIENTS */}
  <div className="min-w-full snap-start px-4 py-3 flex flex-col overflow-y-auto gap-4">
    <h3 className="text-white text-sm font-bold mb-1">✨ Gradientes</h3>
    <div className="flex flex-1 gap-2">
      {GRADIENTS.map((grad, idx) => (
        <button
          key={idx}
          className={` w-full rounded border ${
            selectedColor === grad.gradient ? "ring-2 ring-white" : ""
          }`}
          style={{ background: grad.gradient }}
          onClick={() => onSelect(grad.gradient)}
        />
      ))}
    </div>
  </div>

  {/* SECCIÓN 4: Crear Gradiente */}
  <div className="min-w-full snap-start px-4 py-3 flex flex-col overflow-y-auto gap-4">
    <h3 className="text-white text-sm font-bold mb-1">🎨 Crear Gradiente</h3>
    <div className="flex gap-2">
      <input
        type="color"
        value={gradientA}
        onChange={(e) => setGradientA(e.target.value)}
      />
      <input
        type="color"
        value={gradientB}
        onChange={(e) => setGradientB(e.target.value)}
      />
      <button
        className="text-xs border px-2 py-1 rounded bg-gray-500 hover:bg-gray-300"
        onClick={() =>
          onSelect(`linear-gradient(to bottom, ${gradientA}, ${gradientB})`)
        }
      >
        Aplicar
      </button>
    </div>
  </div>
</div>


    </div>
  );
}
