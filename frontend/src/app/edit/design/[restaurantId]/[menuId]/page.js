"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import EditBar from "../../../../components/EditBar";
import FAB from "../../../../components/FAB";
import AddModal from "../../../../components/AddModal";
import DishEditModal from "../../../../components/DishEditModal";
import CategoryEditModal from "@/app/components/CategoryEditModal";
import { CardRenderer } from "../../../../components/cards/CardRenderer";
import { API_URL } from "@/app/config/api";

export default function DishesPage() { 
  const router = useRouter();
  const params = useParams();

  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [columns, setColumns] = useState(2);


  const [selectedDish, setSelectedDish] = useState(null);
  const [selectedCategory,setSelectedCategory] = useState(null);
  const scrollContainerRef = useRef(null);


  const [categoryStyles, setCategoryStyles] = useState({});
  const [activeCategory, setActiveCategory] = useState(null);
  const [designMode, setDesignMode] = useState(false);
  const [activePanel, setActivePanel] = useState(null);

  const [highlightCategory, setHighlightCategory] = useState(false);
  const [highlightGrid, setHighlightGrid] = useState(false);
  const [modalType, setModalType] = useState(null);


const isGradient = typeof bg === "string" && bg.includes("gradient");


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchDishes(token);
    fetchCategories(token);
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      setTimeout(() => {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: "auto" });
      }, 100);
    }
  }, [categories]);

  useEffect(() => {
    if (!designMode) {
      const token = localStorage.getItem("token");
  
      categories.forEach(async (cat) => {
        const frontendStyles = categoryStyles[cat.name] || {};
        const backendStyles = cat.styles || {};
  
        const hasChanges = JSON.stringify(frontendStyles) !== JSON.stringify(backendStyles);
  
        if (!hasChanges) return; // ⚠ no guardes si no hay cambios
  
        try {
          await fetch(`${API_URL}/api/categories/${cat._id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ styles: frontendStyles }),
          });
  
          console.log(`✅ Estilos actualizados para ${cat.name}`,frontendStyles);
        } catch (err) {
          console.error(`❌ Error al guardar estilos de ${cat.name}:`, err);
        }
      });
    }
  }, [designMode]);
  
  

  async function fetchCategories(token) {
    try {
      const res = await fetch(`${API_URL}/api/categories?menuId=${params.menuId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCategories(data);

      // Aquí extraemos los estilos
    const styleMap = {};
    data.forEach((cat) => {
      styleMap[cat.name] = cat.styles || {};
    });
    setCategoryStyles(styleMap);

    } catch (err) {
      setError(err.message);
    }
  }

  async function fetchDishes(token) {
    try {
      const res = await fetch(`${API_URL}/api/dishes/menu/${params.menuId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setDishes(data);
    } catch (err) {
      setError(err.message);
    }
  }

  const grouped = {};
  dishes.forEach((dish) => {
    const catName = dish.category ? dish.category.name : "Sin Categoría";
    if (!grouped[catName]) grouped[catName] = [];
    grouped[catName].push(dish);
  });




  const handleSubmitModal = async (type, payload) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/api/${type === "dish" ? "dishes" : "categories"}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Error al crear");

      if (type === "dish") await fetchDishes(token);
      else await fetchCategories(token);

      setModalType(null);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-gray-200">
      {/* Botón Diseño */}
      <button
        onClick={() => {
          setDesignMode(!designMode);
          setActivePanel(null);
          if (!designMode) {
            setHighlightCategory(true);
            setHighlightGrid(true);
            setTimeout(() => {
              setHighlightCategory(false);
              setHighlightGrid(false);
            }, 1000);
          }
        }}
        className="px-5 py-1 rounded bg-blue-500 fixed top-0 right-0 z-20 text-white "
      >
        {designMode ? "Salir Diseño" : "Diseño"}
      </button>
      
     {!designMode && (
       <button
       onClick={() => router.push(`/preview/${params.restaurantId}/${params.menuId}`)}
       className="px-2  py-1 fixed  bg-blue-600 hover:bg-green-700 text-white text-sm rounded top-0 left-0  z-20"
     >
       👁 Vista Previa 
     </button>
     )}


      {/* Barra inferior */}
      {designMode && activePanel && (
        <EditBar
          activePanel={activePanel}
          setActivePanel={setActivePanel}
          activeCategory={activeCategory}
          categoryStyles={categoryStyles}
          setCategoryStyles={setCategoryStyles}
        />
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded absolute top-16 left-2 right-2 z-10">
          {error}
        </div>
      )}

      <div
        ref={scrollContainerRef}
        className="top-10 absolute overflow-x-auto snap-x snap-mandatory flex w-screen h-screen"
      >
        {categories.map((cat) => {
          const dishArray = grouped[cat.name] || [];
          const gradient = categoryStyles[cat.name]?.bgColor || "#ffffff"
          const match = gradient.match(/#([0-9a-fA-F]{6})/) 

                     {/**aqui se aplica fondo total a la pagina segundo div **/}
          return (
            <div key={cat._id} className="snap-start w-full h-full flex-shrink-0 p-0">
              <div 
                className="w-full h-full overflow-y-auto px-0 pb-24 "
                style={{
                  ...(typeof categoryStyles[cat.name]?.bgColor === "string" &&
                  categoryStyles[cat.name]?.bgColor.includes("gradient")
                    ? { background: categoryStyles[cat.name]?.bgColor }
                    : { backgroundColor: categoryStyles[cat.name]?.bgColor || "transparent" }),
                }}
              >

                {/* aqui va todo lo relacionado al titulo de la categoria*/}
                <h2  
                  className={`bg-white w-full text-2xl sticky top-0 font-normal pt-16 z-10 pb-10 mb-5   text-center  cursor-pointer transition-all duration-200 
                  ${designMode ? "border-2 border-dashed border-blue-400 text-black" : ""}
                  ${highlightCategory ? "flash-twice" : ""}`}
                  onClick={() => {
                    if (designMode) {
                      setActiveCategory(cat.name);
                      setActivePanel("categoria");
                      setHighlightCategory(true);
                      setTimeout(() => setHighlightCategory(false), 800);
                    }
                    else setSelectedCategory(cat);
                  }}
                  
                  style={{
                    fontFamily: categoryStyles[cat.name]?.fontFamily || "inherit",
                    fontSize: categoryStyles[cat.name]?.fontSize || "2rem",
                    color: categoryStyles[cat.name]?.textColor || "#000",
                    background: match
                        ?   `linear-gradient(180deg, ${match[0]} 70%, transparent 100%)` 
                        :   categoryStyles[cat.name]?.bgColor || "transparent" ,}}
                >
                  {cat.name}
                </h2>

                {/* Grid platillos */}
                <div
                    className={`grid gap-y-2 gap-x-0 
                      ${
                        categoryStyles[cat.name]?.columns === 1
                          ? "grid-cols-1"
                          : categoryStyles[cat.name]?.columns === 3
                          ? "grid-cols-3"
                          : "grid-cols-2"
                      }
                      ${designMode ? "border-2 border-dashed rounded-xl border-blue-800 bg-opacity-40 p-2" : ""}
                      ${highlightGrid ? "flash-twice" : ""}
                    `}
                    onClick={() => {
                      if (designMode) {
                        setActiveCategory(cat.name);
                        setActivePanel("platillos");
                        setHighlightGrid(true);
                        setTimeout(() => setHighlightGrid(false), 800);
                      }
                    }}
                  >
                  {dishArray.map((dish) => (
                    <div
                      key={dish._id}
                      className="cursor-pointer"
                      onClick={() => {
                        if (!designMode) setSelectedDish(dish);
                      }}
                    >
                      {CardRenderer(dish, categoryStyles[cat.name]?.cardDesign, categoryStyles[cat.name])}
                    </div>
                  ))}

                  {!designMode && (
                    <div
                      className="border-2 border-dashed border-gray-400 p-4 rounded cursor-pointer flex items-center justify-center text-gray-500 hover:text-gray-700 transition"
                      onClick={() => {
                        setModalType("dish");
                        setActiveCategory(cat.name);
                      }}
                    >
                      ➕ Agregar Platillo
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {!designMode && (
          <div className="snap-start w-full h-full flex-shrink-0 p-0">
            <div className="w-full h-full overflow-y-auto p-2  flex items-center justify-center">
              <div
                className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-400 text-gray-600 hover:text-gray-800 cursor-pointer rounded-xl"
                onClick={() => setModalType("category")}
              >
                <span className="text-3xl mb-2">➕</span>
                <span className="text-xl font-semibold">Agregar Nueva Categoría</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {!designMode && (
        <FAB
          onAddCategory={() => setModalType("category")}
          onAddDish={() => {
            setModalType("dish");
            setActiveCategory(null);
          }}
        />
      )}

      {selectedDish && (
        <DishEditModal
          dish={selectedDish}
          onClose={() => setSelectedDish(null)}
          onUpdate={async () => {
            const token = localStorage.getItem("token");
            await fetchDishes(token);
          }}
          onDelete={async () => {
            const token = localStorage.getItem("token");
            await fetch(`${API_URL}/api/dishes/${selectedDish._id}`, {
              method: "DELETE",
              headers: { Authorization: `Bearer ${token}` },
            });
            await fetchDishes(token);
            setSelectedDish(null);
          }}
        />
      )}

    {selectedCategory && (
      <CategoryEditModal
        category={selectedCategory}
        onClose={() => setSelectedCategory(null)}
        onUpdate={async () => {
          const token = localStorage.getItem("token");
          await fetchCategories(token);
          await fetchDishes(token); // 👈 aquí lo correcto
        }}
        onDelete={async () => {
          if (!confirm) return;
          const token = localStorage.getItem("token");
          await fetch(`${API_URL}/api/categories/${selectedCategory._id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });
          await fetchCategories(token);
          setSelectedCategory(null);
        }}
        
      />
    )}


      {modalType && (
        <AddModal
          type={modalType}
          onClose={() => setModalType(null)}
          onSubmit={(data) => handleSubmitModal(modalType, data)}
          menuId={params.menuId}
        />
      )}
    </main>
  );
}
