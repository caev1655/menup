"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Modal from "@/app/components/Modal"; // Ajusta la ruta donde tengas tu componente Modal

export default function CategoriesPage() {
  const router = useRouter();
  const params = useParams();  // params.restaurantId
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalMode, setModalMode] = useState("create"); // "create" o "edit"

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetchCategories(token);
  }, []);

  async function fetchCategories(token) {
    try {
      const res = await fetch(`http://localhost:4000/api/categories?menuId=${params.menuId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        throw new Error("Error al obtener categorías");
      }
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    }
  }

  // Abrir modal para CREAR
  function openCreateModal() {
    setModalMode("create");
    setSelectedCategory({ name: "" }); // vacío
    setIsModalOpen(true);
  }

  // Abrir modal para EDITAR
  function openEditModal(cat) {
    setModalMode("edit");
    setSelectedCategory(cat);
    setIsModalOpen(true);
  }

  // Cerrar modal
  function closeModal() {
    setIsModalOpen(false);
    setSelectedCategory(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    // Dependiendo de si es "create" o "edit", llamamos a POST o PUT
    if (modalMode === "create") {
      try {
        const res = await fetch("http://localhost:4000/api/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            name: selectedCategory.name,
            menuId: params.menuId
          })
        });
        if (!res.ok) {
          const { message } = await res.json();
          throw new Error(message || "Error al crear categoría");
        }

        // Recargamos lista y cerramos modal
        fetchCategories(token);
        closeModal();
      } catch (err) {
        setError(err.message);
      }
    } else {
      // Modo "edit"
      try {
        const res = await fetch(`http://localhost:4000/api/categories/${selectedCategory._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            name: selectedCategory.name
          })
        });
        if (!res.ok) {
          const { message } = await res.json();
          throw new Error(message || "Error al editar categoría");
        }

        fetchCategories(token);
        closeModal();
      } catch (err) {
        setError(err.message);
      }
    }
  }

  // Eliminar categoría
  async function handleDeleteCategory(catId) {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const confirmDelete = confirm("¿Estás seguro de eliminar esta categoría?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:4000/api/categories/${catId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || "Error al eliminar categoría");
      }
      fetchCategories(token);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Categorías</h1>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}

      <button
        onClick={openCreateModal}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
      >
        Crear Categoría
      </button>

      {/* Lista de Categorías */}
      <div className="space-y-2">
        {categories.map((cat) => (
          <div key={cat._id} className="border p-4 rounded shadow flex justify-between items-center">
            <span>{cat.name}</span>
            <div>
              <button
                onClick={() => openEditModal(cat)}
                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => handleDeleteCategory(cat._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Crear/Editar */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalMode === "create" ? "Crear Categoría" : "Editar Categoría"}
      >
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <label className="block mb-1 font-semibold text-gray-600">Nombre:</label>
          <input
            type="text"
            className="w-full border p-2 rounded text-gray-600 "
            value={selectedCategory?.name || ""}
            onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })}
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {modalMode === "create" ? "Crear" : "Guardar"}
          </button>
        </form>
      </Modal>
    </main>
  );
}
