"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateRestaurantPage() {
  const router = useRouter();
  const [name, setName] = useState("");
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
      const res = await fetch("http://localhost:4000/api/restaurants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name })
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || "Error al crear restaurante");
      }

      // Si se creó con éxito, volvemos al dashboard
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h1 className="text-xl text-gray-500 font-bold mb-4">Crear Restaurante</h1>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-500">Nombre del Restaurante:</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded text-gray-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
