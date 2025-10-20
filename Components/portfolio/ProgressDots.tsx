import React from "react";
import { motion } from "framer-motion";

export default function ProgressDots({ sections, activeSection, onNavigate }) {
  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
      {sections.map((section, index) => (
        <motion.button
          key={section.id}
          onClick={() => onNavigate(index)}
          className="group flex items-center gap-3"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-sm font-medium text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-800/90 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-700 shadow-md">
            {section.label}
          </span>
          <div 
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              activeSection === index 
                ? "bg-cyan-500 border-cyan-500 scale-125 shadow-lg shadow-cyan-500/50" 
                : "bg-slate-800 border-slate-600 hover:border-cyan-400"
            }`}
          />
        </motion.button>
      ))}
    </div>
  );
}