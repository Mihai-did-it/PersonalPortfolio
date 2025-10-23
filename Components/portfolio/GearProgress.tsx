import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useTransform } from "framer-motion";

export default function GearProgress({ sections, activeSection, onNavigate, scrollProgress }) {
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

  // Rotation for active gear only
  const activeGearRotation = useTransform(scrollProgress, [0, 1], [0, 360 * 3]);

  return (
    <div className="fixed right-5 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
      {/* Container without background - just for layout */}
      <div className="relative flex flex-col items-center gap-12 px-3 py-6">
        
        {/* Vertical connecting line */}
        <div className="absolute left-1/2 top-6 bottom-6 w-px -translate-x-1/2 bg-gradient-to-b from-cyan-500/20 via-cyan-500/30 to-cyan-500/20 rounded-full" />

        {/* Navigation gears */}
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
                    className="absolute right-full mr-4 pointer-events-none whitespace-nowrap z-10"
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

              {/* Gear button */}
              <motion.button
                onClick={() => onNavigate(index)}
                onMouseEnter={() => setHoveredDot(index)}
                onMouseLeave={() => setHoveredDot(null)}
                className="relative z-10 cursor-pointer"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  rotate: isActive ? activeGearRotation : 0,
                }}
              >
                {/* Active glow effect */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, transparent 70%)',
                      width: 40,
                      height: 40,
                      left: -10,
                      top: -10,
                    }}
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}

                {/* Gear SVG */}
                <MiniGear 
                  size={isActive ? 24 : isPassed ? 20 : 16} 
                  isActive={isActive}
                  isPassed={isPassed}
                />
              </motion.button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Mini gear component for progress indicator
function MiniGear({ size, isActive, isPassed }) {
  const teeth = 8;
  const innerRadius = size * 0.32;
  const outerRadius = size * 0.42;
  const toothHeight = size * 0.15;
  const holeRadius = size * 0.12;

  const color = isActive 
    ? "rgba(34, 211, 238, 1)" 
    : isPassed 
    ? "rgba(34, 211, 238, 0.7)"
    : "rgba(100, 116, 139, 0.6)";

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ 
        filter: isActive 
          ? 'drop-shadow(0 0 6px rgba(34, 211, 238, 0.8))' 
          : isPassed
          ? 'drop-shadow(0 0 3px rgba(34, 211, 238, 0.4))'
          : 'none'
      }}
    >
      <defs>
        <linearGradient id={`miniGearGradient-${size}-${isActive}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: color, stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: color, stopOpacity: 0.85 }} />
          <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.7 }} />
        </linearGradient>
      </defs>

      <g transform={`translate(${size / 2}, ${size / 2})`}>
        {/* Gear teeth */}
        {Array.from({ length: teeth }).map((_, i) => {
          const angle = (i * 360) / teeth;
          const nextAngle = ((i + 1) * 360) / teeth;
          const midAngle = (angle + nextAngle) / 2;
          const toothWidth = 360 / teeth * 0.35;
          
          const toRad = (deg) => (deg * Math.PI) / 180;
          
          const innerAngle1 = midAngle - toothWidth / 2;
          const innerAngle2 = midAngle + toothWidth / 2;
          const outerAngle1 = midAngle - toothWidth / 3;
          const outerAngle2 = midAngle + toothWidth / 3;
          
          const x1 = Math.cos(toRad(innerAngle1)) * outerRadius;
          const y1 = Math.sin(toRad(innerAngle1)) * outerRadius;
          const x2 = Math.cos(toRad(outerAngle1)) * (outerRadius + toothHeight);
          const y2 = Math.sin(toRad(outerAngle1)) * (outerRadius + toothHeight);
          const x3 = Math.cos(toRad(outerAngle2)) * (outerRadius + toothHeight);
          const y3 = Math.sin(toRad(outerAngle2)) * (outerRadius + toothHeight);
          const x4 = Math.cos(toRad(innerAngle2)) * outerRadius;
          const y4 = Math.sin(toRad(innerAngle2)) * outerRadius;
          
          return (
            <path
              key={i}
              d={`M ${x1},${y1} L ${x2},${y2} L ${x3},${y3} L ${x4},${y4} Z`}
              fill={`url(#miniGearGradient-${size}-${isActive})`}
              stroke={isActive ? "rgba(34, 211, 238, 0.8)" : "rgba(100, 116, 139, 0.4)"}
              strokeWidth="0.5"
            />
          );
        })}
        
        {/* Main body circle */}
        <circle
          r={outerRadius}
          fill={`url(#miniGearGradient-${size}-${isActive})`}
          stroke={isActive ? "rgba(34, 211, 238, 0.9)" : "rgba(100, 116, 139, 0.5)"}
          strokeWidth="1"
        />
        
        {/* Inner rim */}
        <circle
          r={innerRadius}
          fill="rgba(15, 23, 42, 0.6)"
          stroke={isActive ? "rgba(34, 211, 238, 0.7)" : "rgba(100, 116, 139, 0.4)"}
          strokeWidth="0.8"
        />
        
        {/* Center hole */}
        <circle
          r={holeRadius}
          fill="rgba(15, 23, 42, 0.95)"
          stroke={isActive ? "rgba(34, 211, 238, 0.9)" : "rgba(100, 116, 139, 0.5)"}
          strokeWidth="1"
        />
        
        {/* Inner hole rim for depth */}
        <circle
          r={holeRadius * 0.7}
          fill="none"
          stroke={isActive ? "rgba(34, 211, 238, 0.5)" : "rgba(100, 116, 139, 0.3)"}
          strokeWidth="0.4"
        />
      </g>
    </svg>
  );
}
