"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { API_URL } from "@/app/config/api";

export default function MenusPage() {
  const router = useRouter();
  const params = useParams();  
  // 'params.restaurantId' será el ID del restaurante tomado de la URL

  const [menus, setMenus] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetchMenus(token);
  }, []);

  async function fetchMenus(token) {
    try {
      // Hacemos GET /api/menus?restaurantId=...
      const res = await fetch(`${API_URL}/api/menus/restaurant/${params.restaurantId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Error al obtener menús");
      }
      const data = await res.json();
      setMenus(data);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeleteMenu(menuId) {
    const token = localStorage.getItem("token");
    if (!token) return alert("No tienes permisos para eliminar menús");

    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este menú?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/api/menus/${menuId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error al eliminar el menú");

      // Actualizamos el estado, quitando el menú eliminado
      setMenus((prevMenus) => prevMenus.filter(menu => menu._id !== menuId));
    } catch (err) {
      setError(err.message);
    }
  }


  function goToCreateMenu() {
    router.push(`/dashboard/${params.restaurantId}/menus/create`);
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-500">Menús del Restaurante</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
          {error}
        </div>
      )}

      <button
        onClick={goToCreateMenu}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
      >
        Crear Menú
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        {menus.length > 0 ? (
          menus.map((menu) => (
            <div key={menu._id} className="border p-4 rounded shadow ">
              <h2 className="text-lg font-semibold text-gray-500">{menu.name}</h2>
              <p className="text-gray-400">Plantilla: {menu.template}</p>
              <p className="text-gray-400">Idioma: {menu.language}</p>
              <button
                 onClick={() => handleDeleteMenu(menu._id)}
                 className="bg-red-600 hover:bg-gray-300 px-2 py-1 rounded mt-2"
                >
                    Eliminar
              </button>

              <button
                  onClick={() => router.push(`/dashboard/${params.restaurantId}/menus/${menu._id}/dishes`)}
                 className="bg-green-600 hover:bg-gray-300 px-2 py-1 rounded mt-2"
                >
                    Ver platillos
              </button>
              {/* Podrías agregar un botón para ver detalles o editar */}
            </div>
          ))
        ) : (
          <p>No hay menús creados.</p>
        )}
      </div>
    </main>
  );
}
