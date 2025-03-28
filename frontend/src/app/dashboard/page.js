"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "../config/api";

export default function DashboardPage() {
  const router = useRouter();

  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Si no hay token, redirige a login
      router.push("/login");
    } else {
      // Si hay token, llamamos al backend para obtener los restaurantes
      fetchRestaurants(token);
    }
  }, []);

  async function fetchRestaurants(token) {
    try {
      const res = await fetch(`${API_URL}/api/restaurants`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Error al obtener restaurantes");
      }
      const data = await res.json();
      setRestaurants(data); // data debería ser un array de restaurantes
    } catch (err) {
      setError(err.message);
    }
  }

  function goToCreateRestaurant() {
    router.push("/dashboard/create");
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-lime-700">Dashboard: Mis Restaurantes</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
          {error}
        </div>
      )}

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
        onClick={goToCreateRestaurant}
      >
        Crear Restaurante
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        {restaurants.length > 0 ? (
          restaurants.map((rest) => (
            <div key={rest._id} className="border p-4 rounded shadow text-gray-500">
              <h2 className="text-lg font-semibold text-yellow-500">{rest.name}</h2>
              <p>Plan: {rest.subscriptionPlan}</p>
              <button
                 onClick={() => router.push(`/dashboard/${rest._id}/menus`)}
                 className="bg-green-600 hover:bg-gray-300 px-2 py-1 rounded mt-2 text-white"
                >
                    Ver Menús
              </button>

              {/* Podrías mostrar más info, o un botón de "Ver Menús" */}
            </div>
          ))
        ) : (
          <p>No hay restaurantes disponibles</p>
        )}
      </div>
    </main>
  );
}

