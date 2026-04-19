import React from 'react';
import { Layers } from 'lucide-react';

const materials = [
  { name: "Flex", description: "Durable for outdoor banners, cost-effective." },
  { name: "Vinyl", description: "Waterproof, high-quality finish, great for stickers." },
  { name: "Sunboard", description: "Rigid, ideal for indoor displays and signs." },
];

export const MaterialGuideSection = () => (
  <section className="py-32 bg-slate-950 text-white relative overflow-hidden">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 skew-x-12 translate-x-1/2 -z-0 blur-3xl" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="flex flex-col md:flex-row items-center gap-6 mb-16">
        <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
          <Layers className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-2">Material <span className="text-blue-500">Guide</span></h2>
          <p className="text-slate-400 text-lg">Choose the right material for your printing needs.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {materials.map((m, i) => (
          <div key={i} className="bg-white/5 p-10 rounded-[2rem] border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group backdrop-blur-md">
            <h3 className="font-bold text-2xl mb-4 text-blue-400 group-hover:text-blue-300 transition-colors">{m.name}</h3>
            <p className="text-slate-300 text-lg leading-relaxed">{m.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
