import React, { useState } from 'react';

export const QRCodeGenerator = ({ defaultUrl }: { defaultUrl: string }) => {
  const [url, setUrl] = useState(defaultUrl);
  const [qrUrl, setQrUrl] = useState(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(defaultUrl)}`);

  const generateQR = () => {
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`);
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
      <h3 className="text-xl font-bold text-zinc-950 mb-4 text-center">Generate Custom QR Code</h3>
      <input 
        type="text" 
        value={url} 
        onChange={(e) => setUrl(e.target.value)} 
        className="w-full px-4 py-3 rounded-xl border border-zinc-200 outline-none focus:ring-2 focus:ring-zinc-950 transition-all mb-4"
        placeholder="Enter URL"
      />
      <button 
        onClick={generateQR} 
        className="w-full bg-zinc-950 text-white py-3 rounded-xl font-bold hover:bg-zinc-800 transition-all mb-6"
      >
        Generate QR
      </button>
      <div className="flex justify-center">
        <img 
          src={qrUrl} 
          alt="Generated QR Code" 
          className="w-48 h-48"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
};
