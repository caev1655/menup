// components/common/ColorPickerToggle.js
"use client";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";

export default function ColorPickerToggle({ color, onChange, label }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="w-full flex flex-col items-center gap-2 mb-3">
      <span className="text-sm text-white">{label}</span>
      {!visible ? (
        <button
          onClick={() => setVisible(true)}
          className="text-xs px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Elegir color
        </button>
      ) : (
        <div className="flex flex-col items-center ">
          <HexColorPicker
            color={color}
            onChange={(val) => onChange(val)}
          />
          <p className="text-xs text-white mt-2">Color actual: {color}</p>
          <button
            onClick={() => setVisible(false)}
            className="mt-2 text-xs border px-2 py-1 rounded text-white hover:bg-gray-700"
          >
            Cerrar picker
          </button>
        </div>
      )}
    </div>
  );
}
