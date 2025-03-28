import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function CoverDisplayPage({ coverSettings }) {
  const [showButton, setShowButton] = useState(true);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (coverSettings?.delaySeconds && coverSettings.delaySeconds > 0) {
      const timeout = setTimeout(() => {
        router.push(`/preview/${params.restaurantId}/${params.menuId}`);
      }, coverSettings.delaySeconds * 1000);

      return () => clearTimeout(timeout);
    }
  }, []);

  const handleEnter = () => {
    router.push(`/preview/${params.restaurantId}/${params.menuId}`);
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center justify-center text-center p-4 transition-all`}
      style={{ backgroundColor: coverSettings?.backgroundColor || "#ffffff" }}
    >
      {coverSettings?.showLogo && (
        <img
          src="/logo.png"
          alt="Logo"
          className={`w-32 h-32 mb-4 animate-${coverSettings?.animationType || "fade"}`}
        />
      )}

      {coverSettings?.showName && (
        <h1
          className={`text-3xl font-bold mb-4 animate-${coverSettings?.animationType || "fade"}`}
        >
          {coverSettings?.restaurantName}
        </h1>
      )}

      <p className="text-lg text-gray-700 mb-6">
        {coverSettings?.welcomeText || "¡Bienvenido a nuestro menú!"}
      </p>

      {showButton && (
        <button
          onClick={handleEnter}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
        >
          {coverSettings?.buttonText || "Entrar al menú"}
        </button>
      )}
    </div>
  );
}
