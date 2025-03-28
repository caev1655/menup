"use client";
import { CARD_LAYOUT_OPTIONS } from "./cardLayouts";

const LAYOUT_GROUPS = [
  {
    title: "🧱 Clásicos",
    ids: ["minimal1", "minimal2", "minimal10", "default"],
  },
  {
    title: "🖼️ Visuales",
    ids: ["minimal5", "minimal6", "minimal8", "roundedImage", "colorfull1"],
  },
  {
    title: "📋 Listados",
    ids: ["minimal13", "minimal14", "onlytext"],
  },
];

export default function CardStyleSelector({
  onSelect,
  selectedStyle,
  selectedColumns = 2,
  onChangeColumns,
}) {
  return (
    <div className="p-4 bg-gray-950 text-white border-t border-gray-500 w-full space-y-4">
      {/* Selector de columnas */}
      <div>
        <span className="text-sm font-semibold block mb-1 text-center">Columnas</span>
        <div className="flex gap-2 justify-evenly">
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              onClick={() => onChangeColumns?.(n)}
              className={`px-4 py-2 text-sm rounded-md border ${
                selectedColumns === n
                  ? "text-blue-600 font-semibold border-white"
                  : "bg-gray-900 text-white border-gray-600 hover:border-white"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Estilos por sección, todos en una fila horizontal */}
      <div className="overflow-x-auto whitespace-nowrap py-2 px-1 bg-gray-950 rounded">
        <div className="flex gap-8 min-w-max">
          {LAYOUT_GROUPS.map((group) => (
            <div key={group.title} className="flex flex-col items-start gap-2">
              <span className="w-full text-xs text-white font-semibold text-center">
                {group.title}
              </span>
              <div className="flex gap-2">
                {CARD_LAYOUT_OPTIONS.filter((opt) => group.ids.includes(opt.id)).map(
                  ({ id, name }) => (
                    <button
                      key={id}
                      onClick={() => onSelect(id)}
                      className={`px-4 py-2 text-sm rounded-md border whitespace-nowrap
                        ${
                          selectedStyle === id
                            ? " text-blue-600 font-semibold border-white"
                            : "bg-gray-700 text-white border-gray-500 hover:border-white"
                        }`}
                    >
                      {name}
                    </button>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
