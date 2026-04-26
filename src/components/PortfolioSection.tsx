import { motion } from 'motion/react';
import { Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

const portfolioItems = [
  { title: "Shop Signage", category: "Glow Sign Board", image: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6?auto=format&fit=crop&q=80&w=600&h=400" },
  { title: "Event Banner", category: "Flex Printing", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600&h=400" },
  { title: "Business Cards", category: "Printing", image: "https://images.unsplash.com/photo-1586075010633-2442dc3d6334?auto=format&fit=crop&q=80&w=600&h=400" },
];

export const PortfolioSection = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-32 bg-slate-950 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-0" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] -z-0" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] z-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-xs uppercase tracking-widest mb-6">
            <Zap className="w-4 h-4" />
            Featured Work
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Portfolio</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto italic">A glimpse of our recent high-quality printing projects and successful client delivery.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {isLoading 
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={`skel-${i}`} className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                  <div className="animate-pulse flex flex-col gap-4">
                    <div className="w-full h-64 bg-slate-800 rounded-2xl"></div>
                    <div className="w-3/4 h-6 bg-slate-800 rounded mt-4"></div>
                    <div className="w-1/2 h-4 bg-slate-800 rounded"></div>
                  </div>
                </div>
              ))
            : portfolioItems.map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -12 }} 
                className="group rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 transition-all hover:border-blue-500/50 bg-white/5 backdrop-blur-md"
              >
                <div className="overflow-hidden relative">
                  <img src={item.image} alt={item.title} className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-8">
                  <h3 className="font-bold text-2xl text-white mb-2 group-hover:text-blue-400 transition-colors tracking-tight">{item.title}</h3>
                  <p className="text-blue-400 font-bold text-sm uppercase tracking-[0.2em]">{item.category}</p>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};
