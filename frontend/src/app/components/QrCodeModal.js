"use client";
import React, { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QrCodeModal({ url, onClose }) {
  const qrRef = useRef();

  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "codigo-qr-menu.png";
    link.click();
  };

  if (!url) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Escanea el menú</h2>

        <div className="flex justify-center mb-4" ref={qrRef}>
          <QRCodeCanvas value={url} size={220} />
        </div>

        <p className="text-sm mb-4 text-gray-600 break-all">{url}</p>

        <div className="flex justify-center gap-3">
          <button
            onClick={handleDownload}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm rounded"
          >
            📥 Descargar QR
          </button>
          <button
            onClick={onClose}
            className="bg-gray-700 text-white px-4 py-2 text-sm rounded hover:bg-gray-800"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
