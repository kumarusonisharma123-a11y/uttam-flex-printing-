import React from 'react';

export const NewsletterSection = () => (
  <section className="py-24 bg-blue-600 text-white">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
      <p className="mb-8 text-blue-100">Subscribe to our newsletter for exclusive offers and printing tips.</p>
      <form className="flex gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
        <input type="email" placeholder="Enter your email" className="flex-1 px-6 py-4 rounded-full text-slate-900 outline-none" />
        <button className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all">Subscribe</button>
      </form>
    </div>
  </section>
);
