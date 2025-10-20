import React from "react";
import { motion } from "framer-motion";

export default function ProgressBar({ progress }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-800/50">
      <motion.div 
        className="h-full bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-500 shadow-lg shadow-cyan-500/50"
        style={{ 
          scaleX: progress,
          transformOrigin: "left"
        }}
      />
    </div>
  );
}