"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Modal from "@/app/components/Modal";
import { Menu } from "@headlessui/react";
import { API_URL } from "@/app/config/api";

export default function DishesPage() {
  const router = useRouter();
  const params = useParams();  // params.restaurantId y params.menuId vienen de la URL
  const [dishes, setDishes] = useState([]);
  const [error, setError] = useState(null);


   // Para las categorías
   const [categories, setCategories] = useState([]);
   const [categoryId, setCategoryId] = useState(""); // Guardaremos el _id de la categoría elegida

  // Estados para manejar el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetchDishes(token);
    fetchCategories(token);
  }, []);

  


async function fetchCategories(token) {
  try {
    const res = await fetch(`${API_URL}/api/categories?menuId=${params.menuId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!res.ok) {
      throw new Error("Error al obtener categorías");
    }
    const data = await res.json();
    setCategories(data); // Lista de categorías
  } catch (err) {
    setError(err.message);
  }
}

  async function fetchDishes(token) {
    try {
      const res = await fetch(`${API_URL}/api/dishes/menu/${params.menuId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Error al obtener platillos");
      }
      const data = await res.json();
      setDishes(data);
    } catch (err) {
      setError(err.message);
    }
  }

// Lógica para agrupar
const grouped = {};
dishes.forEach((dish) => {
  const catName = dish.category ? dish.category.name : "Sin Categoría";
  if (!grouped[catName]) grouped[catName] = [];
  grouped[catName].push(dish);
});

  // Abrir modal con datos del platillo
  function openEditModal(dish) {
    setSelectedDish(dish);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedDish(null);
  }

  async function handleUpdateDish(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      // Enviamos los cambios al backend (PUT /api/dishes/:dishId)
      const res = await fetch(`${API_URL}/api/dishes/${selectedDish._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: selectedDish.name,
          description: selectedDish.description,
          price: selectedDish.price
          // imageUrl, etc. si quieres
        })
      });
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || "Error al actualizar platillo");
      }

      // Recarga la lista y cierra el modal
      fetchDishes(token);
      closeModal();

    } catch (err) {
      setError(err.message);
    }
  }

  // Nueva función para eliminar
  async function handleDeleteDish(dishId) {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const confirmDelete = confirm("¿Estás seguro de eliminar este platillo?");
      if (!confirmDelete) return;

      const res = await fetch(`${API_URL}/api/dishes/${dishId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || "Error al eliminar platillo");
      }

      // Si se borró con éxito, volvemos a cargar la lista
      fetchDishes(token);
    } catch (err) {
      setError(err.message);
    }
  }


  function goToCreateDish() {
    router.push(`/dashboard/${params.restaurantId}/menus/${params.menuId}/dishes/create`);
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-400"> Platillos del Menú: </h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
          {error}
        </div>
      )}

      <button
        onClick={goToCreateDish}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
      >
        Agregar Platillo
      </button>




      {/* Si no hay platillos */}
      {dishes.length === 0 ? (
        <p>No hay platillos disponibles.</p>
      ) : (
        // Si hay platillos, renderizamos por categoría
        Object.entries(grouped).map(([catName, dishArray]) => (
          <div key={catName} className="mb-6">
            <h2 className="text-xl font-bold mb-2 text-gray-500 text-center">{catName}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {dishArray.map((dish) => (
                <div key={dish._id} className="border p-4 rounded shadow">
                  <img
                    src={dish.imageUrl || "/placeholder.jpg"}
                    alt={dish.name}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <h3 className="text-lg font-semibold text-gray-400">{dish.name}</h3>
                  <p className="text-gray-400">{dish.description}</p>
                  <p className="font-bold text-gray-400">${dish.price}</p>

                  <div className="flex flex-col-2  justify-evenly mb-0"> 
                  <button
                    onClick={() => openEditModal(dish)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mt-2 mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteDish(dish._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded mt-2"
                  >
                    Eliminar
                  </button>

                  </div>
                  
                </div>
              ))}
            </div>
          </div>
        ))
      )}





      {/* Modal para editar platillo */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Editar Platillo"
      >
        {selectedDish && (
          <form onSubmit={handleUpdateDish} className="mt-4 space-y-4">
            <div>
              <label className="block mb-1 text-gray-500 font-semibold">Nombre:</label>
              <input
                type="text"
                className="w-full border p-2 rounded  text-gray-400"
                value={selectedDish.name}
                onChange={(e) => setSelectedDish({ ...selectedDish, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-500 font-semibold">Descripción:</label>
              <textarea
                className="w-full border p-2 rounded text-gray-400"
                value={selectedDish.description}
                onChange={(e) => setSelectedDish({ ...selectedDish, description: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-500 font-semibold">Precio:</label>
              <input
                type="number"
                className="w-full border p-2 rounded text-gray-400"
                value={selectedDish.price}
                onChange={(e) => setSelectedDish({ ...selectedDish, price: e.target.value })}
                required
              />
            </div>
            
            {/* Select para Categoría */}
          <label className="block text-gray-600">
            Categoría:
          </label>
          <select
            className="w-full border p-2 rounded text-gray-600"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Sin categoría</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Guardar Cambios
            </button>
          </form>
        )}
      </Modal>
    </main>
  );
}
