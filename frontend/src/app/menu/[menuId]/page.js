"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { API_URL } from "@/app/config/api";

export default function PublicMenuPage() {
  const params = useParams(); 
  // params.menuId vendrá de la URL /menu/<menuId>

  const [menu, setMenu] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Al montar el componente, llamamos al backend
    fetchMenu();
  }, []);

  //console.log("menuId: ", params.menuId);

  async function fetchMenu() {
    try {
      const res = await fetch(`${API_URL}/api/menus/public/${params.menuId}`);
      if (!res.ok) {
        throw new Error("Error al obtener el menú");
      }
      const data = await res.json();
      setMenu(data);
    } catch (err) {
      setError(err.message);
    }
  }

  if (error) {
    return (
      <div className="p-4 text-red-600">
        Error: {error}
      </div>
    );
  }

  if (!menu) {
    return (
      <div className="p-4">
        Cargando menú...
      </div>
    );
  }

  // AGRUPAR PLATILLOS POR CATEGORÍA
  const grouped = {};
  if (menu.dishes) {
    menu.dishes.forEach((dish) => {
      // Si dish.category no existe, usamos un texto "Sin Categoría"
      const catName = dish.category ? dish.category.name : "Sin Categoría";
      if (!grouped[catName]) {
        grouped[catName] = [];
      }
      grouped[catName].push(dish);
    });
  }

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {menu.name}
      </h1>

      {/* Recorremos las entradas de grouped: [catName, dishArray] */}
      {Object.entries(grouped).map(([catName, dishArray]) => (
        <div key={catName} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{catName}</h2>
          <div className="space-y-4">
            {dishArray.map((dish) => (
              <div key={dish._id} className="border rounded p-4 shadow">
                <img
                  src={dish.imageUrl || "/placeholder.jpg"}
                  alt={dish.name}
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <h3 className="text-lg font-semibold">{dish.name}</h3>
                <p className="text-gray-700">{dish.description}</p>
                <p className="font-bold mt-2">${dish.price}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
