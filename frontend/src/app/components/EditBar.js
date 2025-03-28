"use client";
import React, { useEffect, useState } from "react";
import CardStyleSelector from "./cards/CardStyleSelector";
import ColorPickerToggle from "./ColorPickerToggle";
import { cardPresets } from "./cardStylePresets";
import  {FONT_OPTIONS}  from "../styles/fonts";
import ColorPaletteSelector from "./ColorPaletteSelector";


export default function EditBar({
  onClose,
  activePanel,
  setActivePanel,
  setCategoryStyles,
  categoryStyles,
  activeCategory,
}) {


  
  const [subPanel, setSubPanel] = useState({
    categoria: {
      showColorPicker: false,
      showFontSizeOptions: false,
      showTypographyOptions: false,
    },
    platillos: {
      showColorPicker: false,
      showCardOptions: false,
      showStyleOptions: false,
      showTitleOptions: false,
      showPriceOptions: false,
      showBorderOptions: false,
      showShadowOptions: false,
      showCardTypographyOptions: false,
      showCardBgOptions: false, // ← este nuevo
      showPresetOptions: false,

    },
  });

  useEffect(() => {
    if (!activePanel) return;
    const cleared = {};
    Object.keys(subPanel).forEach((panel) => {
      cleared[panel] = {};
      Object.keys(subPanel[panel]).forEach((key) => {
        cleared[panel][key] = false;
      });
    });
    setSubPanel(cleared);
  }, [activePanel]);

  if (!activePanel) return null;


  const updateCategoryStyle = (key, value) => {
    if (!activeCategory) return;
    const updated = {
      ...categoryStyles[activeCategory],
      [key]: value,
    };
  
    setCategoryStyles((prev) => ({
      ...prev,
      [activeCategory]: updated,
    }));
  };
  
 

 const getCategoryIdByName = (name) => {
    const category = categories?.find((c) => c.name === name);
    return category?._id;
  };

  

  const currentFontSize = categoryStyles[activeCategory]?.fontSize
    ? parseFloat(categoryStyles[activeCategory].fontSize)
    : 2;

  const increaseFontSize = () => {
    const newSize = (currentFontSize + 0.2).toFixed(1);
    updateCategoryStyle("fontSize", `${newSize}rem`);
  };


  const decreaseFontSize = () => {
    const newSize = Math.max(0.5, currentFontSize - 0.2).toFixed(1);
    updateCategoryStyle("fontSize", `${newSize}rem`);
  };

  const toggleSubOption = (option) => {
    const updated = { ...subPanel };
    Object.keys(subPanel[activePanel]).forEach((key) => {
      updated[activePanel][key] = key === option ? !subPanel[activePanel][key] : false;
    });
    setSubPanel(updated);
  };

  return (
    <div className="fixed bottom-0 pb-1 left-0 right-0 flex flex-col-reverse z-50">
      {/* BARRA PRINCIPAL */}
      <div className="bg-gray-950 p-4  border-gray-600">
    

        {activePanel === "categoria" && (
          <div className="flex flex-wrap gap-2">
            <button className="flex-1 px-3 py-1 text-sm rounded" onClick={() => toggleSubOption("showColorPicker")}>Color</button>
            <button className="flex-1 px-3 py-1 text-sm rounded" onClick={() => toggleSubOption("showTypographyOptions")}>Tipografía</button>
            <button className="flex-1 px-3 py-1 text-sm rounded" onClick={() => toggleSubOption("showFontSizeOptions")}>Tamaño</button>
          </div>
        )}

        {activePanel === "platillos" && (
          <div className="flex flex-wrap gap-2">
            <button className="flex-1 px-3 py-1 text-sm rounded" onClick={() => toggleSubOption("showColorPicker")}>FONDO</button>
            <button className="flex-1 px-3 py-1 text-sm rounded" onClick={() => toggleSubOption("showCardOptions")}>TARJETA</button>
            <button className="flex-1 px-3 py-1 text-sm rounded" onClick={() => toggleSubOption("showStyleOptions")}>LAYOUT</button>
            <button className="flex-1 px-3 py-1 text-sm rounded" onClick={() => toggleSubOption("showPresetOptions")}>PLANTILLA</button>
          </div>
        )}
      </div>

      {/* CATEGORÍA: Color Picker */}
      {subPanel.categoria?.showColorPicker && (
        <div className="bg-gray-700 text-white p-3 border-t border-gray-600">
          < ColorPaletteSelector
            selectedColor={categoryStyles[activeCategory]?.textColor || "#ffffff"}
            onSelect={(color) => updateCategoryStyle("textColor", color)}
         />
        </div>
      )}

      {/* CATEGORÍA: Tipografía */}
      {subPanel.categoria?.showTypographyOptions && (
        <div className="bg-gray-950 text-white p-3 border-t border-gray-600">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-bold">Tipografía de Categoría</span>
            <button onClick={() => toggleSubOption("showTypographyOptions")} className="text-sm border px-2 py-1 rounded hover:bg-gray-600">Cerrar</button>
          </div>
          <div className="grid grid-rows-2 grid-flow-col overflow-x-auto gap-2">
            {FONT_OPTIONS.map((font) => (
              <button
                key={font.label}
                className="flex-1 px-3 py-1 rounded text-sm"
                style={{ fontFamily: font.fontFamily }}
                onClick={() => updateCategoryStyle("fontFamily", font.fontFamily)}
              >
                {font.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CATEGORÍA: Tamaño de fuente */}
      {subPanel.categoria?.showFontSizeOptions && (
        <div className="bg-gray-700 text-white p-3 border-t border-gray-600">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold">Tamaño de Fuente</span>
            <button onClick={() => toggleSubOption("showFontSizeOptions")} className="text-sm border px-2 py-1 rounded hover:bg-gray-600">Cerrar</button>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button className="border px-3 py-1 text-lg rounded" onClick={decreaseFontSize}>–</button>
            <span>{currentFontSize.toFixed(1)} rem</span>
            <button className="border px-3 py-1 text-lg rounded" onClick={increaseFontSize}>+</button>
          </div>
        </div>
      )}

      {/* PLATILLOS: Color Picker (Color de fondo //wallpaper) */}
      {subPanel.platillos?.showColorPicker && (
  <div className="bg-gray-transparent text-white p-0   border-gray-600 ">
    < ColorPaletteSelector
      selectedColor={categoryStyles[activeCategory]?.bgColor || "#ffffff"}
      onSelect={(color) => updateCategoryStyle("bgColor", color)}
     
    />
  </div>
)}


      {/* PLATILLOS: Diseño */}
      {subPanel.platillos?.showStyleOptions && (
        <CardStyleSelector
          onSelect={(styleId) => updateCategoryStyle("cardDesign", styleId)}
          selectedStyle={categoryStyles[activeCategory]?.cardDesign}
          selectedColumns={categoryStyles[activeCategory]?.columns}
          onChangeColumns={(value) => updateCategoryStyle("columns", value)}
        />
      )}

      {/* PLATILLOS: Opciones Tarjeta */}
      {subPanel.platillos?.showCardOptions && (
        <div className="bg-gray-950 text-white p-3 border-t border-gray-900">
          
          <div className="grid grid-cols-2 gap-2 ">
            <button onClick={() => toggleSubOption("showCardTypographyOptions")} className=" bg-gray-900 px-2 py-1 rounded ">Tipografía</button>
            <button onClick={() => toggleSubOption("showTitleOptions")} className="  bg-gray-900 px-2 py-1 rounded  ">Título</button>
            <button onClick={() => toggleSubOption("showPriceOptions")} className="  bg-gray-900 px-2 py-1 rounded  ">Precio</button>
            <button onClick={() => toggleSubOption("showBorderOptions")} className=" bg-gray-900 px-2 py-1 rounded ">Borde</button>
            <button onClick={() => toggleSubOption("showShadowOptions")} className=" bg-gray-900 px-2 py-1 rounded ">Sombra</button>
            <button onClick={() => toggleSubOption("showCardBgOptions")} className=" bg-gray-900 px-2 py-1 rounded ">Color Fondo</button>
          </div>
        </div>
      )}

      
{subPanel.platillos?.showCardTypographyOptions && (
  <div className="grid grid-rows-2 grid-flow-col overflow-x-auto py-2 gap-2 bg-slate-950">
    {FONT_OPTIONS.map((font) => (
      <button
        key={font.label}
        className={`flex-1 px-3 py-1 rounded text-sm border`}
        style={{ fontFamily: font.fontFamily }}
        onClick={() => updateCategoryStyle("cardFontFamily", font.fontFamily)}
      >
        {font.label}
      </button>
    ))}
  </div>
)}


{subPanel.platillos?.showTitleOptions && (
  <div className="text-white space-y-3 flex flex-col-reverse">

    {/* FONDO / TEXTO / A± botones */}
    <div className="flex flex-col pt-2 gap-2 bg-gray-950 ">
  
      <div className="flex gap-2 justify-evenly px-2 mb-2">
        <button
          className="flex-1 p-4 rounded  bg-gray-900 hover:text-blue-500"
          onClick={() =>
            setSubPanel((prev) => ({
              ...prev,
              platillos: {
                ...prev.platillos,
                showTitleBgPicker: !prev.platillos?.showTitleBgPicker,
                showTitleTextPicker: false,
                showTitleFontSize: false,
              },
            }))
          }
        >
          FONDO
        </button>

        <button
          className="flex-1 px-3 py-1 rounded text-sm bg-gray-900 hover:text-blue-500"
          onClick={() =>
            setSubPanel((prev) => ({
              ...prev,
              platillos: {
                ...prev.platillos,
                showTitleTextPicker: !prev.platillos?.showTitleTextPicker,
                showTitleBgPicker: false,
                showTitleFontSize: false,
              },
            }))
          }
        >
          TEXTO
        </button>

        <button
          className="flex-1 px-3 py-1 rounded  bg-gray-900 hover:text-blue-500"
          onClick={() =>
            setSubPanel((prev) => ({
              ...prev,
              platillos: {
                ...prev.platillos,
                showTitleFontSize: !prev.platillos?.showTitleFontSize,
                showTitleBgPicker: false,
                showTitleTextPicker: false,
              },
            }))
          }
        >
          - A +
        </button>
      </div>
    </div>

    {/* Paleta FONDO */}
    {subPanel.platillos?.showTitleBgPicker && (
      <ColorPaletteSelector
        selectedColor={categoryStyles[activeCategory]?.titleBgColor || "#ffffff"}
        onSelect={(color) => updateCategoryStyle("titleBgColor", color)}
        label="Fondo del título"
      />
    )}

    {/* Paleta TEXTO */}
    {subPanel.platillos?.showTitleTextPicker && (
      <ColorPaletteSelector
        selectedColor={categoryStyles[activeCategory]?.titleTextColor || "#000000"}
        onSelect={(color) => updateCategoryStyle("titleTextColor", color)}
        label="Color del texto del título"
      />
    )}

    {/* Incrementador de fuente visible arriba (estilo bloque) */}
    {subPanel.platillos?.showTitleFontSize && (
      <div className="bg-gray-950 p-3 rounded">
        <span className="text-lg text-center font-semibold block mb-2">Tamaño</span>
        <div className="flex items-center gap-4 justify-center">
          <button
            className="border px-8 py-6 text-2xl rounded"
            onClick={() => {
              const newSize = Math.max(
                0.5,
                (parseFloat(categoryStyles[activeCategory]?.titleFontSize || 1.2) - 0.1)
              ).toFixed(1);
              updateCategoryStyle("titleFontSize", `${newSize}rem`);
            }}
          >
            –
          </button>
          <span className="text-2xl">
            {parseFloat(categoryStyles[activeCategory]?.titleFontSize || 1.2).toFixed(1)} rem
          </span>
          <button
            className="border px-8 py-6 text-2xl rounded"
            onClick={() => {
              const newSize = (
                parseFloat(categoryStyles[activeCategory]?.titleFontSize || 1.2) + 0.1
              ).toFixed(1);
              updateCategoryStyle("titleFontSize", `${newSize}rem`);
            }}
          >
            +
          </button>
        </div>
      </div>
    )}
  </div>
)}




{subPanel.platillos?.showPriceOptions && (
  <div className="text-white space-y-3 flex flex-col-reverse">
    
    {/* FONDO / TEXTO / A± botones */}
    <div className="flex flex-col pt-2 gap-2 bg-gray-950">
      <span className="text-sm font-semibold px-2">Color (Precio):</span>

      <div className="flex gap-2 justify-evenly px-2 mb-2">
        <button
          className="flex-1 p-4 rounded bg-gray-900 hover:text-blue-500"
          onClick={() =>
            setSubPanel((prev) => ({
              ...prev,
              platillos: {
                ...prev.platillos,
                showPriceBgPicker: !prev.platillos?.showPriceBgPicker,
                showPriceTextPicker: false,
                showPriceFontSize: false,
              },
            }))
          }
        >
          FONDO
        </button>

        <button
          className="flex-1 px-3 py-1 rounded text-sm bg-gray-900 hover:text-blue-500"
          onClick={() =>
            setSubPanel((prev) => ({
              ...prev,
              platillos: {
                ...prev.platillos,
                showPriceTextPicker: !prev.platillos?.showPriceTextPicker,
                showPriceBgPicker: false,
                showPriceFontSize: false,
              },
            }))
          }
        >
          TEXTO
        </button>

        <button
          className="flex-1 px-3 py-1 rounded bg-gray-900 hover:text-blue-500"
          onClick={() =>
            setSubPanel((prev) => ({
              ...prev,
              platillos: {
                ...prev.platillos,
                showPriceFontSize: !prev.platillos?.showPriceFontSize,
                showPriceBgPicker: false,
                showPriceTextPicker: false,
              },
            }))
          }
        >
          - A +
        </button>
      </div>
    </div>

    {/* Paleta FONDO */}
    {subPanel.platillos?.showPriceBgPicker && (
      <ColorPaletteSelector
        selectedColor={categoryStyles[activeCategory]?.priceBgColor || "#ffffff"}
        onSelect={(color) => updateCategoryStyle("priceBgColor", color)}
        label="Fondo del precio"
      />
    )}

    {/* Paleta TEXTO */}
    {subPanel.platillos?.showPriceTextPicker && (
      <ColorPaletteSelector
        selectedColor={categoryStyles[activeCategory]?.priceTextColor || "#000000"}
        onSelect={(color) => updateCategoryStyle("priceTextColor", color)}
        label="Color del texto del precio"
      />
    )}

    {/* Incrementador de fuente visible arriba */}
    {subPanel.platillos?.showPriceFontSize && (
      <div className="bg-gray-950 p-3 rounded">
        <span className="text-lg text-center font-semibold block mb-2">Tamaño</span>
        <div className="flex items-center gap-4 justify-center">
          <button
            className="border px-8 py-6 text-2xl rounded"
            onClick={() => {
              const newSize = Math.max(
                0.5,
                (parseFloat(categoryStyles[activeCategory]?.priceFontSize || 1.2) - 0.1)
              ).toFixed(1);
              updateCategoryStyle("priceFontSize", `${newSize}rem`);
            }}
          >
            –
          </button>
          <span className="text-2xl">
            {parseFloat(categoryStyles[activeCategory]?.priceFontSize || 1.2).toFixed(1)} rem
          </span>
          <button
            className="border px-8 py-6 text-2xl rounded"
            onClick={() => {
              const newSize = (
                parseFloat(categoryStyles[activeCategory]?.priceFontSize || 1.2) + 0.1
              ).toFixed(1);
              updateCategoryStyle("priceFontSize", `${newSize}rem`);
            }}
          >
            +
          </button>
        </div>
      </div>
    )}
  </div>
)}


{subPanel.platillos?.showShadowOptions && (
  <div className="bg-gray-950 text-white p-3 border-t border-gray-600">
    <div className="flex justify-between mb-2">
      <span className="text-sm font-semibold">Sombra de Tarjeta</span>
      <button onClick={() => toggleSubOption("showShadowOptions")} className="text-sm border px-2 py-1 rounded hover:bg-gray-600">
        Cerrar
      </button>
    </div>
    <div className="flex  gap-2">
      {["shadow-md", "shadow-lg", "shadow-xl", "shadow-2xl", "shadow-none"].map((shadowSize) => (
        <button
          key={shadowSize}
          className="px-2 py-1 text-md bg-gray-900 rounded hover:text-blue-600"
          onClick={() => updateCategoryStyle("cardShadowSize", shadowSize)}
        >
          {shadowSize}
        </button>
      ))}
    </div>
  </div>
)}


{subPanel.platillos?.showBorderOptions && (
  <div className="bg-gray-700 text-white p-3 border-t border-gray-600">
    <div className="flex justify-between mb-2">
      <span className="text-sm font-semibold">Borde de Tarjeta</span>
      <button onClick={() => toggleSubOption("showBorderOptions")} className="text-sm border px-2 py-1 rounded hover:bg-gray-600">
        Cerrar
      </button>
    </div>
    <ColorPickerToggle
      color={categoryStyles[activeCategory]?.cardBorderColor || "#cccccc"}
      onChange={(color) => updateCategoryStyle("cardBorderColor", color)}
      label="Color del borde"
    />
  </div>
)}

{subPanel.platillos?.showCardBgOptions && (
  <div className="bg-gray-700 text-white p-3 border-t border-gray-600">
    <div className="flex justify-between mb-2">
      <span className="text-sm font-semibold">Fondo de Tarjeta</span>
      <button onClick={() => toggleSubOption("showCardBgOptions")} className="text-sm border px-2 py-1 rounded hover:bg-gray-600">
        Cerrar
      </button>
    </div>
    <ColorPickerToggle
      color={categoryStyles[activeCategory]?.cardContainerBg || "#ffffff"}
      onChange={(color) => updateCategoryStyle("cardContainerBg", color)}
      label="Color de fondo de la tarjeta"
    />
  </div>
)}


{subPanel.platillos?.showPresetOptions && (
  <div className="bg-gray-700 text-white p-3 border-t border-gray-600">
    <div className="flex justify-between mb-2">
      <span className="text-sm font-semibold">Plantillas Visuales</span>
      <button onClick={() => toggleSubOption("showPresetOptions")} className="text-sm border px-2 py-1 rounded hover:bg-gray-600">
        Cerrar
      </button>
    </div>
    <div className="flex flex-col gap-2">
      {Object.entries(cardPresets).map(([key, preset]) => (
        <button
          key={key}
          className="px-3 py-1 border rounded text-sm hover:bg-gray-600"
          onClick={() => {
            // Aplica todo el preset al estilo actual de categoría
            setCategoryStyles(prev => ({
              ...prev,
              [activeCategory]: {
                ...prev[activeCategory],
                ...preset
              }
            }));
          }}
        >
          {key.replace(/([A-Z])/g, " $1").replace(/^\w/, c => c.toUpperCase())}
        </button>
      ))}
    </div>
  </div>
)}



    </div>
  );
}