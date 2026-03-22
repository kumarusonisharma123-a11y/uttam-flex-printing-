import React, { useState } from 'react';
import { Search, Package, Loader2 } from 'lucide-react';

export const OrderStatusTracker = () => {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = () => {
    if (!orderId) return;
    setLoading(true);
    // Mock tracking logic
    setTimeout(() => {
      setStatus("Printing in Progress");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
      <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Package className="w-6 h-6 text-indigo-600" />
        Track Your Order
      </h3>
      <div className="flex gap-2">
        <input 
          type="text" 
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter Order ID (e.g., UFP-123)"
          className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
        />
        <button 
          onClick={handleTrack}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-all"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
        </button>
      </div>
      {status && (
        <div className="mt-4 p-4 bg-emerald-50 text-emerald-800 rounded-xl font-bold text-sm">
          Status: {status}
        </div>
      )}
    </div>
  );
};
