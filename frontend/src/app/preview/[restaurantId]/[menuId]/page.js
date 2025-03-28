"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { CardRenderer } from "@/app/components/cards/CardRenderer";
import DishDetailModal from "@/app/components/DishDetailModal";
import QrCodeModal from "@/app/components/QrCodeModal";
import { API_URL } from "@/app/config/api";

export default function PreviewMenuPage() {
  const params = useParams();
  const router = useRouter();
  

  const [showCover, setShowCover] = useState(true);
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryStyles, setCategoryStyles] = useState({});
  const [selectedDish, setSelectedDish] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);

  const scrollContainerRef = useRef(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchDishes(token);
    fetchCategories(token);

  }, []);
  


  const fetchDishes = async (token) => {
    const res = await fetch(`${API_URL}/api/dishes/menu/${params.menuId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setDishes(data);
  };

  const fetchCategories = async (token) => {
    const res = await fetch(`${API_URL}/api/categories?menuId=${params.menuId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setCategories(data);

    const styleMap = {};
    data.forEach((cat) => {
      styleMap[cat.name] = cat.styles || {};
    });
    setCategoryStyles(styleMap);
  };

  const grouped = {};
  dishes.forEach((dish) => {
    const catName = dish.category?.name || "Sin Categoría";
    if (!grouped[catName]) grouped[catName] = [];
    grouped[catName].push(dish);
  });

  return (
    <main className="w-screen  bg-white text-gray-900">
      
          {/* Botones navegación */}
          <div className="fixed bottom-0 right-2 z-50 flex gap-2">
            <button
              onClick={() => router.back()}
              className="px-4 py-1 bg-gray-700 hover:bg-gray-800 text-white text-sm rounded shadow"
            >
              ← Volver
            </button>
            <button
              onClick={() => setShowQrModal(true)}
              className="px-4 py-1 bg-yellow-600 hover:bg-yellow-700 text-white text-sm rounded shadow"
            >
              📱 Código QR
            </button>
          </div>
  
          {/* Slides de categorías */}
          <div
            ref={scrollContainerRef}
            className="absolute top-0 w-full h-full overflow-x-auto snap-x snap-mandatory flex"
          >
            {categories.map((cat) => {
              const dishArray = grouped[cat.name] || [];
              const gradient = categoryStyles[cat.name]?.bgColor
              const match = gradient.match(/#([0-9a-fA-F]{6})/)

              return (
                <div
                  key={cat._id}
                  className=" snap-start w-full h-full flex-shrink-0 overflow-y-auto  "
                  style={{ ...(typeof categoryStyles[cat.name]?.bgColor === "string" &&
                  categoryStyles[cat.name]?.bgColor.includes("gradient")
                    ? { background: categoryStyles[cat.name]?.bgColor }
                    : { backgroundColor: categoryStyles[cat.name]?.bgColor || "transparent" }),
                   }}
                >
                  <h2
                    className=" bg-gradient-to-b from-gray-900 to-transparent h-24 sticky top-0 text-2xl font-bold text-center pt-8 z-10"
                    style={{
                      fontFamily: categoryStyles[cat.name]?.fontFamily || "inherit",
                      fontSize: categoryStyles[cat.name]?.fontSize || "1.8rem",
                      color: categoryStyles[cat.name]?.textColor || "#000",
                      background: match
                        ?   `linear-gradient(180deg, ${match[0]} 70%, transparent 100%)` 
                        :   categoryStyles[cat.name]?.bgColor || "transparent" ,
                    }}
                  >
                    {cat.name}
                  </h2>
  
                  {/**Columnsa de platillos  */}
                  <div
                      className={`grid gap-3
                        ${
                          categoryStyles[cat.name]?.columns === 1
                            ? "grid-cols-1"
                            : categoryStyles[cat.name]?.columns === 3
                            ? "grid-cols-3"
                            : "grid-cols-2"
                        }`}
                    >
                  
                    {dishArray.map((dish) => (
                      <div
                        key={dish._id}
                        className="cursor-pointer "
                        onClick={() => setSelectedDish(dish)}
                      >
                        {CardRenderer(
                          dish,
                          categoryStyles[cat.name]?.cardDesign,
                          categoryStyles[cat.name]
                        )}
                      </div>
                    ))}

                    
                  </div> 
                </div>
              );
            })}
          </div>
  
          {/* Modal detalle platillo */}
          {selectedDish && (
            <DishDetailModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
          )}
  
          {/* Modal QR */}
          {showQrModal && (
            <QrCodeModal
              url={`http://192.168.1.115:3000/preview/${params.restaurantId}/${params.menuId}`}
              onClose={() => setShowQrModal(false)}
            />
          )}
        
      )
    </main>
  );  
}
