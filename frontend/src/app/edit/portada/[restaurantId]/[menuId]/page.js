"use client";
import { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { useRouter } from "next/navigation";



export default function CoverEditPage() {
  const router = useRouter();
  const [cover, setCover] = useState({
    showName: true,
    showLogo: true,
    welcomeText: "¡Bienvenido a nuestro menú!",
    animationType: "bounce",
    backgroundColor: "#ffffff",
    delaySeconds: 3,
    buttonText: "Entrar al menú"
  });

  const handleChange = (key, value) => {
    setCover((prev) => ({ ...prev, [key]: value }));
  };

  return (
    
    <div className="p-6 max-w-3xl mx-auto text-gray-800 ">
      {/* Botón Volver */}
   
      <button
        onClick={() => router.push("/edit/design")}
        className="mb-4 bg-gray-700 text-white px-4 py-1 rounded text-sm hover:bg-gray-800"
      >
        ← Volver a selección de menú
      </button>

      <h1 className="text-2xl font-bold text-gray-800">🎬 Portada del Menú</h1>

      <div className="space-y-3">
        <label className="block text-sm font-semibold">Texto de bienvenida</label>
        <input
          type="text"
          value={cover.welcomeText}
          onChange={(e) => handleChange("welcomeText", e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="space-y-2 ">
        <label className="block text-sm font-semibold">Animación de entrada</label>
        <select
          value={cover.animationType}
          onChange={(e) => handleChange("animationType", e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="fade">Fade In</option>
          <option value="bounce">Bounce</option>
          <option value="slide">Slide</option>
          <option value="zoom">Zoom</option>
        </select>
      </div>

      <div className="flex gap-4 ">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={cover.showName}
            onChange={(e) => handleChange("showName", e.target.checked)}
          />
          Mostrar nombre
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={cover.showLogo}
            onChange={(e) => handleChange("showLogo", e.target.checked)}
          />
          Mostrar logo
        </label>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold">Color de fondo</label>
        <HexColorPicker
          color={cover.backgroundColor}
          onChange={(color) => handleChange("backgroundColor", color)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold">Texto del botón</label>
        <input
          type="text"
          value={cover.buttonText}
          onChange={(e) => handleChange("buttonText", e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold">Tiempo antes de avanzar (segundos)</label>
        <input
          type="number"
          min={0}
          value={cover.delaySeconds}
          onChange={(e) => handleChange("delaySeconds", e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        💾 Guardar portada
      </button>
    </div>
  );
}
