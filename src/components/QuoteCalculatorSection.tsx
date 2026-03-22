import React, { useState } from 'react';
import { Calculator, Ruler, IndianRupee, MessageCircle } from 'lucide-react';

export const QuoteCalculatorSection = () => {
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [rate, setRate] = useState(25);

  const total = width * height * rate;

  return (
    <section className="py-24 bg-indigo-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-12">
          <Calculator className="w-12 h-12 text-indigo-400" />
          <h2 className="text-4xl font-bold">Instant Quote Calculator</h2>
        </div>
        <div className="bg-white p-8 rounded-3xl text-slate-900 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold mb-2 text-slate-600">
                <Ruler className="w-4 h-4" /> Width (ft)
              </label>
              <input 
                type="number" 
                value={width} 
                onChange={(e) => setWidth(Number(e.target.value))} 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-300 outline-none" 
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-bold mb-2 text-slate-600">
                <Ruler className="w-4 h-4" /> Height (ft)
              </label>
              <input 
                type="number" 
                value={height} 
                onChange={(e) => setHeight(Number(e.target.value))} 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-300 outline-none" 
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-bold mb-2 text-slate-600">
                <IndianRupee className="w-4 h-4" /> Rate (per sq. ft.)
              </label>
              <input 
                type="number" 
                value={rate} 
                onChange={(e) => setRate(Number(e.target.value))} 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-300 outline-none" 
              />
            </div>
          </div>
          <div className="text-center bg-indigo-50 p-6 rounded-2xl">
            <p className="text-lg font-bold text-indigo-900">Estimated Total</p>
            <p className="text-5xl font-bold text-indigo-600">₹{total}</p>
          </div>
          <a
            href={`https://wa.me/919999999999?text=I%20would%20like%20to%20order%20a%20project%20worth%20₹${total}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-green-500/20 text-lg"
          >
            <MessageCircle className="w-6 h-6" />
            Order Now via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
