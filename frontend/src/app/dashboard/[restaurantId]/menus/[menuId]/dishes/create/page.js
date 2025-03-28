"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function CreateDishPage() {
  const router = useRouter();
  const params = useParams();
  
  // Campos de platillo
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  // Para las categorías
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(""); // Guardaremos el _id de la categoría elegida

  useEffect(() => {
    // Verificamos que exista token
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    // Cargamos categorías para este restaurante
    fetchCategories(token);
  }, []);

  async function fetchCategories(token) {
    try {
      const res = await fetch(`http://localhost:4000/api/categories?menuId=${params.menuId}`, {
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

  async function handleCreate(e) {
    e.preventDefault();
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    let imageUrl = "";

    // Si se sube una imagen, primero la subimos a Cloudinary
    if (image) {
      try {
        const formData = new FormData();
        formData.append("image", image);

        const uploadRes = await fetch("http://localhost:4000/api/dishes/upload-image-cloud", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!uploadRes.ok) {
          throw new Error("Error al subir imagen a Cloudinary");
        }

        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url; // Guardamos la URL de la imagen subida
      } catch (err) {
        setError(err.message);
        return;
      }
    }

    // Construimos el objeto con los datos del platillo
    const dishData = {
      menuId: params.menuId,
      name,
      description,
      price: Number(price),
      category: categoryId || null,  // Aquí referenciamos la categoría elegida
      imageUrl,                      // URL de Cloudinary
      status: "available"
    };

    try {
      // Creamos el platillo en el backend
      const res = await fetch("http://localhost:4000/api/dishes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dishData),
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || "Error al crear platillo");
      }

      // Si todo salió bien, redirigimos a la lista de platillos
      router.push(`/dashboard/${params.restaurantId}/menus/${params.menuId}/dishes`);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h1 className="text-xl font-bold mb-4 text-gray-600">
          Agregar Platillo
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleCreate} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre"
            className="w-full border p-2 rounded text-gray-600"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          
          <textarea
            placeholder="Descripción"
            className="w-full border p-2 rounded text-gray-600"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Precio"
            className="w-full border p-2 rounded text-gray-600"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          {/* Select para Categoría */}
          <label className="block text-gray-600">
            Categoría (opcional):
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

          <input
            type="file"
            accept="image/*"
            className="w-full border p-2 rounded text-gray-600"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Guardar
          </button>
        </form>
      </div>
    </main>
  );
}
