import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface ScrollingAstronautProps {
  scrollProgress: MotionValue<number>;
  activeSection?: number;
}

export default function ScrollingAstronaut({ scrollProgress, activeSection = 0 }: ScrollingAstronautProps) {
  // Hide on hero section (section 0)
  if (activeSection === 0) {
    return null;
  }

  // Create a squiggly flight path based on scroll - much more gradual
  // Using more waypoints for smoother, more organic squiggly motion
  const xPosition = useTransform(scrollProgress, 
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], 
    ['5%', '15%', '25%', '35%', '50%', '65%', '75%', '60%', '40%', '20%', '10%']
  );
  
  const yPosition = useTransform(scrollProgress, 
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], 
    ['10%', '20%', '15%', '30%', '40%', '50%', '45%', '60%', '70%', '65%', '85%']
  );

  // More dynamic rotation for flying effect - tilting based on direction
  const rotation = useTransform(scrollProgress, 
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], 
    [10, 15, 5, -10, -15, 0, 12, -8, -12, 5, 8]
  );

  // Subtle scale for depth effect
  const scale = useTransform(scrollProgress, 
    [0, 0.25, 0.5, 0.75, 1], 
    [0.7, 0.85, 1, 0.8, 0.75]
  );

  // Bobbing motion for flying effect
  const floatY = useTransform(scrollProgress, 
    [0, 0.5, 1], 
    [0, -10, 0]
  );

  return (
    <motion.div
      className="fixed pointer-events-none z-[5]"
      style={{
        left: xPosition,
        top: yPosition,
        y: floatY,
        rotate: rotation,
        scale: scale,
      }}
    >
      {/* Astronaut SVG */}
      <svg
        width="80"
        height="80"
        viewBox="0 0 100 100"
        style={{
          filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4))',
          opacity: 0.85,
        }}
      >
        {/* Helmet glow */}
        <defs>
          <radialGradient id="helmetGlow">
            <stop offset="0%" style={{ stopColor: 'rgba(34, 211, 238, 0.3)' }} />
            <stop offset="100%" style={{ stopColor: 'rgba(34, 211, 238, 0)' }} />
          </radialGradient>
          <linearGradient id="suitGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#f1f5f9' }} />
            <stop offset="100%" style={{ stopColor: '#cbd5e1' }} />
          </linearGradient>
        </defs>

        {/* Glow effect around helmet */}
        <circle cx="50" cy="35" r="25" fill="url(#helmetGlow)" />

        {/* Body - Space suit */}
        <ellipse cx="50" cy="65" rx="18" ry="22" fill="url(#suitGradient)" stroke="#94a3b8" strokeWidth="1.5"/>
        
        {/* Arms */}
        <ellipse cx="35" cy="60" rx="6" ry="12" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" transform="rotate(-20 35 60)"/>
        <ellipse cx="65" cy="60" rx="6" ry="12" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" transform="rotate(20 65 60)"/>
        
        {/* Legs */}
        <rect x="42" y="82" width="6" height="14" rx="3" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1"/>
        <rect x="52" y="82" width="6" height="14" rx="3" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1"/>
        
        {/* Boots */}
        <ellipse cx="45" cy="95" rx="4" ry="3" fill="#64748b"/>
        <ellipse cx="55" cy="95" rx="4" ry="3" fill="#64748b"/>

        {/* Helmet - glass dome */}
        <circle cx="50" cy="35" r="18" fill="rgba(34, 211, 238, 0.15)" stroke="#22d3ee" strokeWidth="2"/>
        <circle cx="50" cy="35" r="18" fill="url(#helmetGlow)" opacity="0.3"/>
        
        {/* Helmet reflection */}
        <ellipse cx="45" cy="30" rx="6" ry="8" fill="rgba(255, 255, 255, 0.4)" opacity="0.6"/>
        
        {/* Face - visor/helmet interior */}
        <circle cx="50" cy="35" r="13" fill="#1e293b" opacity="0.7"/>
        
        {/* Eyes - friendly astronaut */}
        <circle cx="45" cy="34" r="2.5" fill="#22d3ee"/>
        <circle cx="55" cy="34" r="2.5" fill="#22d3ee"/>
        <circle cx="46" cy="33.5" r="1" fill="#ffffff"/>
        <circle cx="56" cy="33.5" r="1" fill="#ffffff"/>
        
        {/* Smile */}
        <path d="M 45 39 Q 50 42 55 39" stroke="#22d3ee" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        
        {/* Control panel on chest */}
        <rect x="44" y="58" width="12" height="8" rx="2" fill="#334155" stroke="#22d3ee" strokeWidth="1"/>
        <circle cx="47" cy="62" r="1.5" fill="#22d3ee"/>
        <circle cx="53" cy="62" r="1.5" fill="#ef4444"/>
        <rect x="48.5" y="60.5" width="2" height="3" fill="#22d3ee" opacity="0.6"/>

        {/* Antenna */}
        <line x1="50" y1="17" x2="50" y2="22" stroke="#94a3b8" strokeWidth="1.5"/>
        <circle cx="50" cy="16" r="2" fill="#ef4444"/>
        
        {/* Jetpack hint on back */}
        <ellipse cx="50" cy="75" rx="12" ry="8" fill="#475569" opacity="0.3"/>
      </svg>

      {/* Jetpack flames/propulsion - more prominent */}
      <motion.div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2"
        animate={{
          opacity: [0.5, 0.9, 0.5],
          scale: [0.9, 1.2, 0.9],
        }}
        transition={{
          duration: 0.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="35" height="25" viewBox="0 0 35 25">
          {/* Larger, more visible flames */}
          <ellipse cx="12" cy="5" rx="5" ry="10" fill="#22d3ee" opacity="0.7"/>
          <ellipse cx="23" cy="5" rx="5" ry="10" fill="#06b6d4" opacity="0.7"/>
          <ellipse cx="12" cy="10" rx="4" ry="8" fill="#67e8f9" opacity="0.9"/>
          <ellipse cx="23" cy="10" rx="4" ry="8" fill="#67e8f9" opacity="0.9"/>
          {/* Flame tips */}
          <ellipse cx="12" cy="15" rx="2" ry="4" fill="#a5f3fc" opacity="0.6"/>
          <ellipse cx="23" cy="15" rx="2" ry="4" fill="#a5f3fc" opacity="0.6"/>
        </svg>
      </motion.div>

      {/* Motion trail particles - multiple for better effect */}
      <motion.div
        className="absolute top-1/2 left-0"
        style={{
          width: 3,
          height: 3,
          borderRadius: '50%',
          background: 'rgba(34, 211, 238, 0.4)',
          x: -15,
          y: 5,
        }}
        animate={{
          opacity: [0.5, 0, 0.5],
          scale: [1, 0.3, 1],
          x: [-15, -30, -15],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-0"
        style={{
          width: 2,
          height: 2,
          borderRadius: '50%',
          background: 'rgba(34, 211, 238, 0.3)',
          x: -25,
          y: 15,
        }}
        animate={{
          opacity: [0.4, 0, 0.4],
          scale: [1, 0.2, 1],
          x: [-25, -45, -25],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.3,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-0"
        style={{
          width: 2,
          height: 2,
          borderRadius: '50%',
          background: 'rgba(34, 211, 238, 0.3)',
          x: -20,
          y: -5,
        }}
        animate={{
          opacity: [0.4, 0, 0.4],
          scale: [1, 0.2, 1],
          x: [-20, -40, -20],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.6,
        }}
      />
    </motion.div>
  );
}
