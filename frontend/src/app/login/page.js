"use client"; 
import { API_URL } from "../config/api";

// <-- Con el App Router, si queremos usar estados, efectos, o manejar eventos en el cliente,
//     debemos poner este mandato al principio para indicar que es un Client Component.

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault(); // Evita refresh del formulario
    setError(null);

    try {
      // Llamamos a tu backend (cambia la URL según sea tu caso)
      const res = await fetch(`${API_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        // Si el status no es 200, arrojamos error
        const { message } = await res.json();
        throw new Error(message || "Error al iniciar sesión");
      }

      const data = await res.json();
      // data.user, data.token, etc.

      // Guardar el token en localStorage (MVP). O podrías usar cookies.
        localStorage.setItem("token", data.token);
      
      // Redirigir a alguna página protegida, p.ej. /dashboard
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-200">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-500">
          Iniciar Sesión
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-500">Email:</label>
            <input
              type="email"
              className="w-full border text-gray-500 border-gray-300 p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@ejemplo.com"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-500">Contraseña:</label>
            <input
              type="password"
              className="w-full border text-gray-500 border-gray-300 p-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Ingresar
          </button>
        </form>
      </div>
    </main>
  );
}
