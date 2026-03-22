import React from 'react';
import { motion } from 'motion/react';

const portfolioItems = [
  { title: "Shop Signage", category: "Glow Sign Board", image: "https://picsum.photos/seed/signage/600/400" },
  { title: "Event Banner", category: "Flex Printing", image: "https://picsum.photos/seed/banner/600/400" },
  { title: "Business Cards", category: "Printing", image: "https://picsum.photos/seed/cards/600/400" },
];

export const PortfolioSection = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-slate-900 mb-16 text-center">Portfolio</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {portfolioItems.map((item, i) => (
          <motion.div key={i} whileHover={{ scale: 1.05 }} className="rounded-3xl overflow-hidden shadow-lg">
            <img src={item.image} alt={item.title} className="w-full h-64 object-cover" referrerPolicy="no-referrer" />
            <div className="p-6 bg-slate-900 text-white">
              <h3 className="font-bold text-xl">{item.title}</h3>
              <p className="text-slate-400">{item.category}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
