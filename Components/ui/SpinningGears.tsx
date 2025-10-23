import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface SpinningGearsProps {
  scrollProgress: MotionValue<number>;
  size?: number;
}

export default function SpinningGears({ scrollProgress, size = 48 }: SpinningGearsProps) {
  // Transform scroll progress to rotation degrees
  // Each full page scroll rotates the gears significantly
  const rotation1 = useTransform(scrollProgress, [0, 1], [0, 360 * 3]);
  const rotation2 = useTransform(scrollProgress, [0, 1], [0, -360 * 3]); // Counter-clockwise
  const rotation3 = useTransform(scrollProgress, [0, 1], [0, 360 * 3]);

  // Scale for each gear size
  const gearSize1 = size * 0.45;
  const gearSize2 = size * 0.4;
  const gearSize3 = size * 0.35;

  return (
    <div 
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Gear 1 - Top Left */}
      <motion.div
        className="absolute"
        style={{
          left: '5%',
          top: '15%',
          rotate: rotation1,
        }}
      >
        <Gear size={gearSize1} color="rgba(34, 211, 238, 0.9)" />
      </motion.div>

      {/* Gear 2 - Top Right */}
      <motion.div
        className="absolute"
        style={{
          right: '5%',
          top: '10%',
          rotate: rotation2,
        }}
      >
        <Gear size={gearSize2} color="rgba(6, 182, 212, 0.85)" />
      </motion.div>

      {/* Gear 3 - Bottom Center */}
      <motion.div
        className="absolute"
        style={{
          bottom: '8%',
          left: '50%',
          translateX: '-50%',
          rotate: rotation3,
        }}
      >
        <Gear size={gearSize3} color="rgba(22, 189, 202, 0.8)" />
      </motion.div>
    </div>
  );
}

interface GearProps {
  size: number;
  color: string;
}

function Gear({ size, color }: GearProps) {
  const teeth = 8;
  const innerRadius = size * 0.35;
  const outerRadius = size * 0.5;
  const toothHeight = size * 0.1;
  const holeRadius = size * 0.15;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ filter: 'drop-shadow(0 0 4px rgba(34, 211, 238, 0.4))' }}
    >
      <defs>
        <linearGradient id={`gearGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: color, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.7 }} />
        </linearGradient>
      </defs>

      <g transform={`translate(${size / 2}, ${size / 2})`}>
        {/* Gear teeth */}
        {Array.from({ length: teeth }).map((_, i) => {
          const angle = (i * 360) / teeth;
          const nextAngle = ((i + 1) * 360) / teeth;
          const toothWidth = 0.4;
          
          const innerAngle1 = angle + toothWidth;
          const innerAngle2 = nextAngle - toothWidth;
          const outerAngle1 = angle + toothWidth * 1.5;
          const outerAngle2 = nextAngle - toothWidth * 1.5;
          
          const toRad = (deg: number) => (deg * Math.PI) / 180;
          
          const x1 = Math.cos(toRad(innerAngle1)) * innerRadius;
          const y1 = Math.sin(toRad(innerAngle1)) * innerRadius;
          
          const x2 = Math.cos(toRad(outerAngle1)) * (outerRadius + toothHeight);
          const y2 = Math.sin(toRad(outerAngle1)) * (outerRadius + toothHeight);
          
          const x3 = Math.cos(toRad(outerAngle2)) * (outerRadius + toothHeight);
          const y3 = Math.sin(toRad(outerAngle2)) * (outerRadius + toothHeight);
          
          const x4 = Math.cos(toRad(innerAngle2)) * innerRadius;
          const y4 = Math.sin(toRad(innerAngle2)) * innerRadius;
          
          return (
            <path
              key={i}
              d={`M ${x1},${y1} L ${x2},${y2} L ${x3},${y3} L ${x4},${y4} Z`}
              fill={`url(#gearGradient-${size})`}
              stroke="rgba(34, 211, 238, 0.5)"
              strokeWidth="0.5"
            />
          );
        })}
        
        {/* Inner circle */}
        <circle
          r={innerRadius}
          fill={`url(#gearGradient-${size})`}
          stroke="rgba(34, 211, 238, 0.6)"
          strokeWidth="1"
        />
        
        {/* Center hole */}
        <circle
          r={holeRadius}
          fill="rgba(15, 23, 42, 0.9)"
          stroke="rgba(34, 211, 238, 0.4)"
          strokeWidth="1"
        />
        
        {/* Decorative inner holes */}
        {Array.from({ length: 4 }).map((_, i) => {
          const angle = (i * 90) + 45;
          const distance = innerRadius * 0.6;
          const x = Math.cos((angle * Math.PI) / 180) * distance;
          const y = Math.sin((angle * Math.PI) / 180) * distance;
          
          return (
            <circle
              key={`hole-${i}`}
              cx={x}
              cy={y}
              r={size * 0.06}
              fill="rgba(15, 23, 42, 0.8)"
              stroke="rgba(34, 211, 238, 0.3)"
              strokeWidth="0.5"
            />
          );
        })}
      </g>
    </svg>
  );
}
