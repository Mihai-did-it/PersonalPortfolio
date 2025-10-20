import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProgressDots({ sections, activeSection, onNavigate }) {
  const [hoveredDot, setHoveredDot] = useState(null);
  const [showActiveLabel, setShowActiveLabel] = useState(false);
  const [prevActiveSection, setPrevActiveSection] = useState(activeSection);

  // Auto-hide active label after 1 second when section changes
  useEffect(() => {
    if (activeSection !== prevActiveSection) {
      setShowActiveLabel(true);
      setPrevActiveSection(activeSection);
      
      const timer = setTimeout(() => {
        setShowActiveLabel(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [activeSection, prevActiveSection]);

  return (
    <div className="fixed right-5 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
      {/* Container without background - just for layout */}
      <div className="relative flex flex-col items-center gap-7 px-3 py-6">
        
        {/* Vertical progress line background */}
        <div className="absolute left-1/2 top-6 bottom-6 w-[2px] -translate-x-1/2 bg-slate-700/30 rounded-full" />
        
        {/* Animated progress fill */}
        <motion.div 
          className="absolute left-1/2 top-6 w-[3px] -translate-x-1/2 rounded-full"
          style={{
            background: 'linear-gradient(180deg, #22d3ee 0%, #06b6d4 100%)',
            boxShadow: '0 0 10px rgba(34, 211, 238, 0.5)'
          }}
          initial={{ height: 0 }}
          animate={{ 
            height: `calc((100% - 48px) * ${activeSection / Math.max(sections.length - 1, 1)})`
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Navigation dots */}
        {sections.map((section, index) => {
          const isActive = activeSection === index;
          const isHovered = hoveredDot === index;
          const isPassed = activeSection > index;

          return (
            <div key={section.id} className="relative flex items-center justify-center">
              {/* Label tooltip */}
              <AnimatePresence>
                {(isHovered || (isActive && showActiveLabel)) && (
                  <motion.div
                    initial={{ opacity: 0, x: 8, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 8, scale: 0.9 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-full mr-3 pointer-events-none whitespace-nowrap z-10"
                  >
                    <div className={`px-3 py-1.5 rounded-lg backdrop-blur-2xl border shadow-xl ${
                      isActive 
                        ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300' 
                        : 'bg-slate-800/95 border-slate-700/50 text-slate-300'
                    }`}>
                      <div className="flex items-center gap-1.5">
                        {isActive && (
                          <motion.div
                            className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [1, 0.6, 1]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        )}
                        <span className="text-[11px] font-semibold">{section.label}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dot button */}
              <motion.button
                onClick={() => onNavigate(index)}
                onMouseEnter={() => setHoveredDot(index)}
                onMouseLeave={() => setHoveredDot(null)}
                className="relative z-10 cursor-pointer"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Active glow effect */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, transparent 70%)',
                    }}
                    animate={{
                      scale: [1, 1.6, 1],
                      opacity: [0.6, 0, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}

                {/* Main dot */}
                <motion.div
                  className="relative rounded-full"
                  animate={{
                    width: isActive ? 12 : isPassed ? 9 : 7,
                    height: isActive ? 12 : isPassed ? 9 : 7,
                  }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: isActive
                        ? 'linear-gradient(135deg, #67e8f9 0%, #22d3ee 50%, #06b6d4 100%)'
                        : isPassed
                        ? 'linear-gradient(135deg, #22d3ee 0%, #0891b2 100%)'
                        : 'linear-gradient(135deg, #475569 0%, #334155 100%)',
                      boxShadow: isActive 
                        ? '0 0 15px rgba(34, 211, 238, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                        : isPassed
                        ? '0 0 8px rgba(34, 211, 238, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                        : 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                    }}
                    animate={isActive ? {
                      boxShadow: [
                        '0 0 15px rgba(34, 211, 238, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                        '0 0 25px rgba(34, 211, 238, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                        '0 0 15px rgba(34, 211, 238, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                      ]
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: isActive ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  />

                  {/* Shine highlight */}
                  {(isActive || isPassed) && (
                    <div 
                      className="absolute top-[2px] left-[2px] right-[2px] h-1/2 rounded-full"
                      style={{
                        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, transparent 100%)'
                      }}
                    />
                  )}
                </motion.div>
              </motion.button>
            </div>
          );
        })}
      </div>
    </div>
  );
}