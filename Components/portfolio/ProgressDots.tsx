import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProgressDots({ sections, activeSection, onNavigate }) {
  const [hoveredDot, setHoveredDot] = useState(null);

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col items-end gap-6">
      {/* Vertical connector line */}
      <div className="absolute right-[5px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-slate-700 to-transparent" />
      
      {sections.map((section, index) => {
        const isActive = activeSection === index;
        const isHovered = hoveredDot === index;
        
        return (
          <motion.div
            key={section.id}
            className="relative flex items-center gap-3"
            onMouseEnter={() => setHoveredDot(index)}
            onMouseLeave={() => setHoveredDot(null)}
          >
            {/* Label - shows on hover or when active */}
            <AnimatePresence>
              {(isHovered || isActive) && (
                <motion.span
                  initial={{ opacity: 0, x: 10, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, scale: 0.8 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className={`text-sm font-semibold whitespace-nowrap bg-slate-800/95 backdrop-blur-md px-4 py-2 rounded-full border shadow-xl ${
                    isActive 
                      ? "text-cyan-400 border-cyan-500/50 shadow-cyan-500/20" 
                      : "text-slate-300 border-slate-700"
                  }`}
                >
                  {section.label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Dot Button */}
            <motion.button
              onClick={() => onNavigate(index)}
              className="relative z-10"
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="relative"
                animate={{
                  scale: isActive ? 1 : 0.85,
                }}
                transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              >
                {/* Pulsing ring for active dot */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-cyan-400"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ 
                      scale: [1, 1.5, 1], 
                      opacity: [0.8, 0, 0.8] 
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
                
                {/* Main dot */}
                <div 
                  className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                    isActive
                      ? "bg-cyan-500 border-cyan-400 shadow-lg shadow-cyan-500/50" 
                      : isHovered
                      ? "bg-cyan-600 border-cyan-400"
                      : "bg-slate-800 border-slate-600"
                  }`}
                />
                
                {/* Hover glow */}
                {isHovered && !isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-cyan-400"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.2, scale: 1.3 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.div>
            </motion.button>
          </motion.div>
        );
      })}
    </div>
  );
}