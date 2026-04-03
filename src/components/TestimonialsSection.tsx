import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  { name: "Rahul Kumar", text: "Excellent quality flex printing! The colors are so vibrant and delivery was super fast.", rating: 5 },
  { name: "Priya Sharma", text: "Uttam Flex provided the best service for our shop's glow sign board. Highly recommended!", rating: 5 },
  { name: "Amit Singh", text: "Very professional and affordable. They handled our bulk order perfectly.", rating: 4 },
  { name: "Vikram Mehta", text: "Great experience! The team is very creative and helpful.", rating: 5 },
  { name: "Sunita Verma", text: "Best place for all printing needs. Quality is top-notch.", rating: 5 },
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [randomReview, setRandomReview] = useState(testimonials[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const openReviewModal = () => {
    const random = testimonials[Math.floor(Math.random() * testimonials.length)];
    setRandomReview(random);
    setShowReviewModal(true);
  };

  return (
    <section className="py-24 bg-zinc-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-display font-bold text-zinc-950 mb-16 text-center tracking-tight">Client Testimonials</h2>
        
        <div className="relative mb-16">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-10 rounded-3xl shadow-sm border border-zinc-100"
            >
              <div className="flex gap-1 mb-6 justify-center">
                {[...Array(testimonials[currentIndex].rating)].map((_, j) => <Star key={j} className="w-6 h-6 text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-zinc-600 mb-8 italic text-xl leading-relaxed text-center">"{testimonials[currentIndex].text}"</p>
              <p className="font-bold text-zinc-950 text-xl text-center">- {testimonials[currentIndex].name}</p>
            </motion.div>
          </AnimatePresence>

          <button onClick={prevTestimonial} className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 p-3 bg-white rounded-full shadow-lg hover:bg-zinc-100 transition-colors">
            <ChevronLeft className="w-6 h-6 text-zinc-900" />
          </button>
          <button onClick={nextTestimonial} className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 p-3 bg-white rounded-full shadow-lg hover:bg-zinc-100 transition-colors">
            <ChevronRight className="w-6 h-6 text-zinc-900" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-8">
          <button 
            onClick={openReviewModal}
            className="inline-flex items-center gap-3 bg-zinc-950 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-zinc-800 transition-all transform active:scale-[0.98] shadow-lg hover:shadow-zinc-300"
          >
            Write a Review on Google
          </button>
        </div>
      </div>
      <AnimatePresence>
        {showReviewModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReviewModal(false)}
              className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8"
            >
              <button onClick={() => setShowReviewModal(false)} className="absolute top-4 right-4 p-2 hover:bg-zinc-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-zinc-400" />
              </button>
              <h3 className="text-2xl font-bold text-zinc-950 mb-6">What our clients say</h3>
              <div className="bg-zinc-50 p-6 rounded-2xl mb-8 border border-zinc-100">
                <p className="text-zinc-700 italic text-lg leading-relaxed mb-4">"{randomReview.text}"</p>
                <p className="font-bold text-zinc-950">- {randomReview.name}</p>
              </div>
              <button 
                onClick={() => {
                  window.open("https://search.google.com/local/writereview?placeid=ChIJiQpfijG18jkRMgHslc8CSGc", "_blank");
                  setShowReviewModal(false);
                }}
                className="w-full inline-flex items-center justify-center gap-3 bg-zinc-950 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-zinc-800 transition-all"
              >
                Continue to Google <ExternalLink className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
