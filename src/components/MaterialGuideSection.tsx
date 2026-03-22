import React from 'react';
import { Layers } from 'lucide-react';

const materials = [
  { name: "Flex", description: "Durable for outdoor banners, cost-effective." },
  { name: "Vinyl", description: "Waterproof, high-quality finish, great for stickers." },
  { name: "Sunboard", description: "Rigid, ideal for indoor displays and signs." },
];

export const MaterialGuideSection = () => (
  <section className="py-24 bg-slate-900 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4 mb-16">
        <Layers className="w-12 h-12 text-emerald-400" />
        <h2 className="text-4xl font-bold">Material Guide</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {materials.map((m, i) => (
          <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/10">
            <h3 className="font-bold text-xl mb-4 text-emerald-400">{m.name}</h3>
            <p className="text-slate-300">{m.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
