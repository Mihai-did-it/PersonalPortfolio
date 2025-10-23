import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface ScrollCircuitryProps {
  scrollProgress: MotionValue<number>;
}

export default function ScrollCircuitry({ scrollProgress }: ScrollCircuitryProps) {
  // Create multiple breakpoints for different nodes
  const node1Progress = useTransform(scrollProgress, [0, 0.2], [0, 1]);
  const node2Progress = useTransform(scrollProgress, [0.2, 0.4], [0, 1]);
  const node3Progress = useTransform(scrollProgress, [0.4, 0.6], [0, 1]);
  const node4Progress = useTransform(scrollProgress, [0.6, 0.8], [0, 1]);
  const node5Progress = useTransform(scrollProgress, [0.8, 1], [0, 1]);

  // Pulse animation based on scroll position
  const pulseOpacity = useTransform(scrollProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-20 pointer-events-none hidden md:block">
      <div className="relative" style={{ width: 60, height: 400 }}>
        {/* Main vertical line */}
        <svg
          width="60"
          height="400"
          viewBox="0 0 60 400"
          className="absolute top-0 left-0"
        >
          <defs>
            <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'rgba(34, 211, 238, 0.2)', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: 'rgba(34, 211, 238, 0.6)', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: 'rgba(34, 211, 238, 0.2)', stopOpacity: 1 }} />
            </linearGradient>
            
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Vertical main circuit line */}
          <line
            x1="30"
            y1="0"
            x2="30"
            y2="400"
            stroke="url(#circuitGradient)"
            strokeWidth="2"
            opacity="0.5"
          />

          {/* Horizontal branches */}
          <line x1="30" y1="80" x2="10" y2="80" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="1.5" />
          <line x1="30" y1="160" x2="50" y2="160" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="1.5" />
          <line x1="30" y1="240" x2="10" y2="240" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="1.5" />
          <line x1="30" y1="320" x2="50" y2="320" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="1.5" />
        </svg>

        {/* Animated nodes */}
        {/* Node 1 - Top */}
        <motion.div
          className="absolute"
          style={{
            left: 22,
            top: 0,
            opacity: node1Progress,
          }}
        >
          <CircuitNode size={16} active={true} />
        </motion.div>

        {/* Node 2 */}
        <motion.div
          className="absolute"
          style={{
            left: 2,
            top: 72,
            opacity: node2Progress,
          }}
        >
          <CircuitNode size={16} active={true} />
        </motion.div>

        {/* Node 3 - Center */}
        <motion.div
          className="absolute"
          style={{
            left: 42,
            top: 152,
            opacity: node3Progress,
          }}
        >
          <CircuitNode size={20} active={true} isPrimary={true} />
        </motion.div>

        {/* Node 4 */}
        <motion.div
          className="absolute"
          style={{
            left: 2,
            top: 232,
            opacity: node4Progress,
          }}
        >
          <CircuitNode size={16} active={true} />
        </motion.div>

        {/* Node 5 - Bottom */}
        <motion.div
          className="absolute"
          style={{
            left: 42,
            top: 312,
            opacity: node5Progress,
          }}
        >
          <CircuitNode size={16} active={true} />
        </motion.div>

        {/* Moving energy pulse */}
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-cyan-400"
          style={{
            left: 26,
            top: useTransform(scrollProgress, [0, 1], [0, 380]),
            opacity: pulseOpacity,
            boxShadow: "0 0 10px rgba(34, 211, 238, 0.8), 0 0 20px rgba(34, 211, 238, 0.4)",
          }}
        />
      </div>
    </div>
  );
}

interface CircuitNodeProps {
  size: number;
  active: boolean;
  isPrimary?: boolean;
}

function CircuitNode({ size, active, isPrimary = false }: CircuitNodeProps) {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
      animate={{
        scale: active ? [1, 1.2, 1] : 1,
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: isPrimary
            ? "radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, rgba(34, 211, 238, 0) 70%)"
            : "radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, rgba(34, 211, 238, 0) 70%)",
          width: size * 2,
          height: size * 2,
          left: -size / 2,
          top: -size / 2,
        }}
        animate={{
          opacity: active ? [0.5, 1, 0.5] : 0.2,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Middle ring */}
      <div
        className="absolute rounded-full border-2"
        style={{
          width: size,
          height: size,
          borderColor: isPrimary ? "rgba(34, 211, 238, 0.8)" : "rgba(34, 211, 238, 0.6)",
          boxShadow: isPrimary
            ? "0 0 8px rgba(34, 211, 238, 0.6)"
            : "0 0 4px rgba(34, 211, 238, 0.4)",
        }}
      />

      {/* Inner core */}
      <motion.div
        className="rounded-full"
        style={{
          width: size * 0.5,
          height: size * 0.5,
          backgroundColor: isPrimary ? "rgba(34, 211, 238, 1)" : "rgba(34, 211, 238, 0.8)",
          boxShadow: isPrimary
            ? "0 0 10px rgba(34, 211, 238, 0.8)"
            : "0 0 6px rgba(34, 211, 238, 0.6)",
        }}
        animate={{
          opacity: active ? [0.8, 1, 0.8] : 0.4,
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
