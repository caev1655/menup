"use client";

// src/components/PublishModal.jsx

import React from 'react';
import QRCode from 'react-qr-code';

function PublishModal({ onClose, menuId }) {
  const menuUrl = `http://192.168.0.56:5173/menu/${menuId}`;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">¡Menú Publicado!</h2>

        <div className="flex flex-col items-center">
          <QRCode value={menuUrl} size={200} />

          <p className="mt-4 text-center break-all">{menuUrl}</p>

          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => {
              navigator.clipboard.writeText(menuUrl);
              alert('¡Enlace copiado al portapapeles!');
            }}
          >
            Copiar Enlace
          </button>

          <button
            className="mt-2 px-4 py-2 bg-gray-500 text-white rounded"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default PublishModal;
