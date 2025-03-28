"use client";
import React from "react";

export default function ConfirmModal({ title, message, onConfirm, onCancel, isOpen }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center text-gray-800">
      <div className="bg-white max-w-sm w-full rounded-lg p-6 shadow-lg relative">
        <h2 className="text-lg font-bold mb-2">{title || "¿Estás seguro?"}</h2>
        <p className="text-sm text-gray-700 mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded border border-gray-400 text-gray-700 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded bg-red-600 hover:bg-red-700 text-white"
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
