import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const testimonials = [
  { name: "Rahul Kumar", text: "Excellent quality flex printing! The colors are so vibrant and delivery was super fast.", rating: 5 },
  { name: "Priya Sharma", text: "Uttam Flex provided the best service for our shop's glow sign board. Highly recommended!", rating: 5 },
  { name: "Amit Singh", text: "Very professional and affordable. They handled our bulk order perfectly.", rating: 4 },
];

export const TestimonialsSection = () => (
  <section className="py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-slate-900 mb-16 text-center">Client Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div key={i} whileHover={{ y: -5 }} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex gap-1 mb-4">
              {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-5 h-5 text-amber-400 fill-amber-400" />)}
            </div>
            <p className="text-slate-600 mb-6 italic">"{t.text}"</p>
            <p className="font-bold text-slate-900">- {t.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
