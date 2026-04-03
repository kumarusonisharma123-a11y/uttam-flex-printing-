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
      <h2 className="text-5xl font-display font-bold text-zinc-950 mb-16 text-center tracking-tight">Our Portfolio</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {portfolioItems.map((item, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -8 }} 
            className="group rounded-3xl overflow-hidden shadow-sm border border-zinc-100 transition-all hover:shadow-2xl hover:border-zinc-200"
          >
            <img src={item.image} alt={item.title} className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
            <div className="p-8 bg-white">
              <h3 className="font-bold text-2xl text-zinc-950 mb-1">{item.title}</h3>
              <p className="text-zinc-500 font-medium">{item.category}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
