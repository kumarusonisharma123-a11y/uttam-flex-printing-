import React, { useState } from 'react';
import { Calculator, IndianRupee, MessageCircle, Package } from 'lucide-react';

const products = [
  { title: "Flex Printing", rate: 12, unit: "sqft" },
  { title: "Visiting Card", variants: [{ size: "100 pcs", price: 250 }, { size: "250 pcs", price: 550 }, { size: "500 pcs", price: 1000 }] },
  { title: "T-Shirt Printing", variants: [{ size: "S", price: 350 }, { size: "M", price: 350 }, { size: "L", price: 350 }, { size: "XL", price: 350 }] },
  { title: "Glow Sign Board", rate: 180, unit: "sqft" },
  { title: "ID Card", rate: 50, unit: "piece" }
];

export const QuoteCalculatorSection = () => {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [quantity, setQuantity] = useState(1);
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(selectedProduct.variants ? selectedProduct.variants[0] : null);

  const calculateTotal = () => {
    if (selectedProduct.rate) {
      return width * height * selectedProduct.rate * quantity;
    } else if (selectedVariant) {
      return selectedVariant.price * quantity;
    }
    return 0;
  };

  const total = calculateTotal();

  return (
    <section className="py-24 bg-blue-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-12">
          <Calculator className="w-12 h-12 text-blue-400" />
          <h2 className="text-4xl font-bold">Instant Quote Calculator</h2>
        </div>
        <div className="bg-white p-8 rounded-3xl text-slate-900 shadow-2xl">
          <div className="mb-8">
            <label className="flex items-center gap-2 text-sm font-bold mb-2 text-slate-600">
              <Package className="w-4 h-4" /> Select Product
            </label>
            <select 
              value={selectedProduct.title}
              onChange={(e) => {
                const product = products.find(p => p.title === e.target.value)!;
                setSelectedProduct(product);
                setSelectedVariant(product.variants ? product.variants[0] : null);
              }}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
            >
              {products.map(p => <option key={p.title} value={p.title}>{p.title}</option>)}
            </select>
          </div>

          {selectedProduct.variants ? (
            <div className="mb-8">
              <label className="flex items-center gap-2 text-sm font-bold mb-2 text-slate-600">Select Variant</label>
              <select 
                value={selectedVariant?.size}
                onChange={(e) => setSelectedVariant(selectedProduct.variants!.find(v => v.size === e.target.value)!)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
              >
                {selectedProduct.variants.map(v => <option key={v.size} value={v.size}>{v.size} - ₹{v.price}</option>)}
              </select>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="text-sm font-bold mb-2 text-slate-600">Width (ft)</label>
                <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" />
              </div>
              <div>
                <label className="text-sm font-bold mb-2 text-slate-600">Height (ft)</label>
                <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" />
              </div>
            </div>
          )}

          <div className="mb-8">
            <label className="text-sm font-bold mb-2 text-slate-600">Quantity</label>
            <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none" />
          </div>

          <div className="text-center bg-blue-50 p-6 rounded-2xl">
            <p className="text-lg font-bold text-blue-900">Estimated Total</p>
            <p className="text-5xl font-bold text-blue-600">₹{total}</p>
          </div>
          <a
            href={`https://wa.me/917481068602?text=I%20would%20like%20to%20order%20${quantity}%20x%20${selectedProduct.title}${selectedVariant ? ` (${selectedVariant.size})` : ''}%20worth%20₹${total}`}
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
