import React from 'react';
import { CheckCircle2, FileText, AlertCircle } from 'lucide-react';

export const PrintReadyChecklist = () => {
  const items = [
    { title: "Resolution", desc: "Ensure your design is at least 300 DPI for sharp prints." },
    { title: "Color Mode", desc: "Use CMYK color mode, not RGB." },
    { title: "File Format", desc: "PDF, CDR, or AI formats are best." },
    { title: "Bleed Area", desc: "Include at least 3mm bleed on all sides." }
  ];

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
      <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <FileText className="w-6 h-6 text-blue-600" />
        Print-Ready Checklist
      </h3>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <div>
              <div className="font-bold text-slate-900 text-sm">{item.title}</div>
              <div className="text-xs text-slate-500">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-amber-50 rounded-xl flex gap-3 text-amber-800 text-xs">
        <AlertCircle className="w-4 h-4 shrink-0" />
        <p>Need help? Our design team can fix your files for a small fee!</p>
      </div>
    </div>
  );
};
