"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/app/config/api";

export default function DesignHomePage() {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchRestaurants(token);
  }, []);

  async function fetchRestaurants(token) {
    try {
      const res = await fetch(`${API_URL}/api/restaurants/menus`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Error al obtener restaurantes");

      const data = await res.json();
      setRestaurants(data);
    } catch (err) {
      setError(err.message);
    }
  }

  function handleSelectMenu(restaurantId, menuId) {
    localStorage.setItem("restaurantId", restaurantId);
    localStorage.setItem("menuId", menuId);
    
    router.push(`/edit/design/${restaurantId}/${menuId}`);
  }
  

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">🎨 Diseña tu Menú</h1>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {restaurants.length === 0 ? (
        <p className="text-gray-500">No hay restaurantes o menús creados aún.</p>
      ) : (
        <div className="space-y-10">
          {restaurants.map((rest) => (
            <section key={rest._id}>
              <h2 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-1">{rest.name}</h2>

              {rest.menus && rest.menus.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {rest.menus.map((menu) => (
                    <div
                      key={menu._id}
                      onClick={() => handleSelectMenu(rest._id, menu._id)}
                      className="bg-white rounded-lg p-4 border hover:shadow-lg hover:border-blue-500 cursor-pointer transition duration-200 text-center group"
                    >
                      <div className="text-3xl mb-2 text-blue-500 group-hover:scale-110 transition">📋</div>
                      <h3 className="text-sm font-semibold text-gray-700 group-hover:text-blue-600">
                        {menu.name}
                      </h3>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">Este restaurante no tiene menús aún.</p>
              )}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
