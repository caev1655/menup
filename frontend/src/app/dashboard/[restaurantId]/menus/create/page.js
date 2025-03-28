"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { API_URL } from "@/app/config/api";

export default function CreateMenuPage() {
  const router = useRouter();
  const params = useParams(); // params.restaurantId
  const [name, setName] = useState("");
  const [template, setTemplate] = useState("template1");
  const [language, setLanguage] = useState("es");
  const [error, setError] = useState(null);

  async function handleCreate(e) {
    e.preventDefault();
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/menus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          restaurantId: params.restaurantId,
          name,
          template,
          language
        })
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || "Error al crear el menú");
      }

      // Regresamos a la lista de menús
      router.push(`/dashboard/${params.restaurantId}/menus`);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h1 className="text-xl font-bold mb-4 text-gray-500 text-center">Crear Menú</h1>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-500">Nombre del Menú:</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded text-gray-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-500">Plantilla:</label>
            <select
              className="w-full border border-gray-300 p-2 rounded text-gray-500"
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
            >
              <option value="template1">Template 1</option>
              <option value="template2">Template 2</option>
              {/* Agrega las que tengas */}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-gray-500">Idioma:</label>
            <select
              className="w-full border border-gray-300 p-2 rounded text-gray-500"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="es">Español</option>
              <option value="en">Inglés</option>
            </select>
          </div>

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
