import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface VerticalGearChainProps {
  scrollProgress: MotionValue<number>;
}

export default function VerticalGearChain({ scrollProgress }: VerticalGearChainProps) {
  // Alternating rotations for interlocking effect
  const rotation1 = useTransform(scrollProgress, [0, 1], [0, 360 * 3]);
  const rotation2 = useTransform(scrollProgress, [0, 1], [0, -360 * 3]);

  const gearSize = 35; // Smaller gears for a more refined look

  // Create array of gears positions - more gears with tighter spacing
  const numGears = 25; // More gears to span the full height
  const spacing = 38; // Tighter spacing between gears

  return (
    <div className="fixed left-6 top-0 z-20 pointer-events-none hidden md:block">
      <div className="relative" style={{ width: gearSize + 40, height: '100vh' }}>
        {/* Vertical connecting line */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/40 via-cyan-500/20 to-cyan-500/10"
          style={{ transform: 'translateX(-50%)' }}
        />

        {/* Render gears vertically with staggered positions */}
        {Array.from({ length: numGears }).map((_, index) => {
          const topPosition = index * spacing;
          const isEven = index % 2 === 0;
          
          // Stagger gears left and right alternating
          const horizontalOffset = isEven ? -8 : 8;
          
          return (
            <motion.div
              key={index}
              className="absolute"
              style={{
                left: '50%',
                top: topPosition,
                translateX: `calc(-50% + ${horizontalOffset}px)`,
                rotate: isEven ? rotation1 : rotation2,
              }}
            >
              <Gear 
                size={gearSize} 
                color={isEven ? "rgba(34, 211, 238, 0.85)" : "rgba(6, 182, 212, 0.8)"} 
                teeth={isEven ? 12 : 10} 
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

interface GearProps {
  size: number;
  color: string;
  teeth?: number;
}

function Gear({ size, color, teeth = 12 }: GearProps) {
  const innerRadius = size * 0.32;
  const outerRadius = size * 0.42;
  const toothHeight = size * 0.15;
  const holeRadius = size * 0.12;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ filter: 'drop-shadow(0 0 6px rgba(34, 211, 238, 0.5))' }}
    >
      <defs>
        <linearGradient id={`gearGradient-${size}-${teeth}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: color, stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: color, stopOpacity: 0.85 }} />
          <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.7 }} />
        </linearGradient>
        <radialGradient id={`gearRadial-${size}-${teeth}`}>
          <stop offset="0%" style={{ stopColor: 'rgba(34, 211, 238, 0.3)', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'rgba(34, 211, 238, 0)', stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      <g transform={`translate(${size / 2}, ${size / 2})`}>
        {/* Gear teeth - more realistic with trapezoid shape */}
        {Array.from({ length: teeth }).map((_, i) => {
          const angle = (i * 360) / teeth;
          const nextAngle = ((i + 1) * 360) / teeth;
          const midAngle = (angle + nextAngle) / 2;
          const toothWidth = 360 / teeth * 0.35;
          
          const toRad = (deg: number) => (deg * Math.PI) / 180;
          
          // Base of tooth at inner radius
          const innerAngle1 = midAngle - toothWidth / 2;
          const innerAngle2 = midAngle + toothWidth / 2;
          
          // Top of tooth at outer radius
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
              fill={`url(#gearGradient-${size}-${teeth})`}
              stroke="rgba(34, 211, 238, 0.7)"
              strokeWidth="0.8"
            />
          );
        })}
        
        {/* Main body circle */}
        <circle
          r={outerRadius}
          fill={`url(#gearGradient-${size}-${teeth})`}
          stroke="rgba(34, 211, 238, 0.8)"
          strokeWidth="1.5"
        />
        
        {/* Inner rim */}
        <circle
          r={innerRadius}
          fill="rgba(15, 23, 42, 0.4)"
          stroke="rgba(34, 211, 238, 0.6)"
          strokeWidth="1.2"
        />
        
        {/* Center hole with metallic look */}
        <circle
          r={holeRadius}
          fill="rgba(15, 23, 42, 0.95)"
          stroke="rgba(34, 211, 238, 0.8)"
          strokeWidth="1.5"
        />
        
        {/* Inner hole rim for depth */}
        <circle
          r={holeRadius * 0.8}
          fill="none"
          stroke="rgba(34, 211, 238, 0.4)"
          strokeWidth="0.5"
        />
        
        {/* Bolt holes around the center */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i * 60);
          const distance = (innerRadius + holeRadius) / 2;
          const x = Math.cos((angle * Math.PI) / 180) * distance;
          const y = Math.sin((angle * Math.PI) / 180) * distance;
          const boltSize = size * 0.04;
          
          return (
            <g key={`bolt-${i}`}>
              <circle
                cx={x}
                cy={y}
                r={boltSize}
                fill="rgba(15, 23, 42, 0.9)"
                stroke="rgba(34, 211, 238, 0.6)"
                strokeWidth="0.8"
              />
              <circle
                cx={x}
                cy={y}
                r={boltSize * 0.4}
                fill="rgba(34, 211, 238, 0.3)"
              />
            </g>
          );
        })}
        
        {/* Radial spokes for industrial look */}
        {Array.from({ length: teeth }).map((_, i) => {
          const angle = (i * 360) / teeth;
          const toRad = (deg: number) => (deg * Math.PI) / 180;
          const x1 = Math.cos(toRad(angle)) * holeRadius * 1.3;
          const y1 = Math.sin(toRad(angle)) * holeRadius * 1.3;
          const x2 = Math.cos(toRad(angle)) * innerRadius * 0.9;
          const y2 = Math.sin(toRad(angle)) * innerRadius * 0.9;
          
          return (
            <line
              key={`spoke-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(34, 211, 238, 0.25)"
              strokeWidth="0.5"
            />
          );
        })}
      </g>
    </svg>
  );
}
