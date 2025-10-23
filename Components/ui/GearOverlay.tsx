import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface GearOverlayProps {
  scrollProgress: MotionValue<number>;
}

export default function GearOverlay({ scrollProgress }: GearOverlayProps) {
  // Transform scroll progress to rotation degrees
  const rotation1 = useTransform(scrollProgress, [0, 1], [0, 360 * 3]);
  const rotation2 = useTransform(scrollProgress, [0, 1], [0, -360 * 3]); // Counter-clockwise
  const rotation3 = useTransform(scrollProgress, [0, 1], [0, 360 * 3]);

  // Large overlay size
  const size = 280;
  const gearSize1 = size * 0.55;
  const gearSize2 = size * 0.5;
  const gearSize3 = size * 0.45;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-30 flex items-center justify-center"
      style={{ opacity: 0.15 }}
    >
      <div 
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {/* Gear 1 - Top Left */}
        <motion.div
          className="absolute"
          style={{
            left: '0%',
            top: '8%',
            rotate: rotation1,
          }}
        >
          <Gear size={gearSize1} color="rgba(34, 211, 238, 0.95)" teeth={12} />
        </motion.div>

        {/* Gear 2 - Top Right */}
        <motion.div
          className="absolute"
          style={{
            right: '0%',
            top: '5%',
            rotate: rotation2,
          }}
        >
          <Gear size={gearSize2} color="rgba(6, 182, 212, 0.9)" teeth={10} />
        </motion.div>

        {/* Gear 3 - Bottom Center */}
        <motion.div
          className="absolute"
          style={{
            bottom: '2%',
            left: '50%',
            translateX: '-50%',
            rotate: rotation3,
          }}
        >
          <Gear size={gearSize3} color="rgba(22, 189, 202, 0.85)" teeth={9} />
        </motion.div>
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
      style={{ filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.6))' }}
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
