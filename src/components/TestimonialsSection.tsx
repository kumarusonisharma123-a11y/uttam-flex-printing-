import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  { name: "Rahul Kumar", text: "Bahut accha kaam hai! Best quality in Jehanabad.", rating: 5 },
  { name: "Priya Sharma", text: "Fast service aur best quality. Highly recommended for flex printing!", rating: 5 },
  { name: "Amit Singh", text: "Sabse sasta aur sabse accha. Great experience with Uttam Flex.", rating: 5 },
  { name: "Vikram Mehta", text: "Professional work and timely delivery. Shop board looks amazing.", rating: 4 },
  { name: "Sunita Verma", text: "Best place for visiting cards. High quality printing at low price.", rating: 5 },
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
    <section className="py-32 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-display font-bold text-slate-950 mb-6 tracking-tight">
            Client <span className="text-blue-600">Testimonials</span>
          </h2>
          <p className="text-lg text-slate-600">See what our customers have to say about our services.</p>
        </div>
        
        <div className="relative mb-16">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative"
            >
              <div className="absolute top-12 left-12 text-blue-100 opacity-50">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 21L16.41 14.532C16.887 13.228 17.126 12.013 17.126 10.887C17.126 9.761 16.887 8.635 16.41 7.509C15.933 6.383 15.217 5.377 14.263 4.491L15.694 3C16.887 4.193 17.841 5.446 18.557 6.759C19.273 8.072 19.631 9.445 19.631 10.878C19.631 12.311 19.273 13.684 18.557 14.997L16.164 21H14.017ZM5.017 21L7.41 14.532C7.887 13.228 8.126 12.013 8.126 10.887C8.126 9.761 7.887 8.635 7.41 7.509C6.933 6.383 6.217 5.377 5.263 4.491L6.694 3C7.887 4.193 8.841 5.446 9.557 6.759C10.273 8.072 10.631 9.445 10.631 10.878C10.631 12.311 10.273 13.684 9.557 14.997L7.164 21H5.017Z" />
                </svg>
              </div>
              <div className="flex gap-1 mb-8 justify-center relative z-10">
                {[...Array(testimonials[currentIndex].rating)].map((_, j) => <Star key={j} className="w-6 h-6 text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-slate-700 mb-10 text-2xl leading-relaxed text-center font-medium relative z-10">"{testimonials[currentIndex].text}"</p>
              <div className="flex items-center justify-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                  {testimonials[currentIndex].name.charAt(0)}
                </div>
                <p className="font-bold text-slate-900 text-xl">- {testimonials[currentIndex].name}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <button onClick={prevTestimonial} className="absolute top-1/2 -left-4 md:-left-6 -translate-y-1/2 p-4 bg-white rounded-full shadow-xl hover:bg-slate-50 hover:scale-110 transition-all z-20 text-blue-600">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={nextTestimonial} className="absolute top-1/2 -right-4 md:-right-6 -translate-y-1/2 p-4 bg-white rounded-full shadow-xl hover:bg-slate-50 hover:scale-110 transition-all z-20 text-blue-600">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-8">
          <button 
            onClick={openReviewModal}
            className="inline-flex items-center gap-3 bg-blue-600 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 hover:-translate-y-1"
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
              <h3 className="text-2xl font-bold text-slate-950 mb-6">What our clients say</h3>
              <div className="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-100">
                <p className="text-slate-700 italic text-lg leading-relaxed mb-4">"{randomReview.text}"</p>
                <p className="font-bold text-slate-950">- {randomReview.name}</p>
              </div>
              <button 
                onClick={() => {
                  window.open("https://search.google.com/local/writereview?placeid=ChIJiQpfijG18jkRMgHslc8CSGc", "_blank");
                  setShowReviewModal(false);
                }}
                className="w-full inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-1"
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
