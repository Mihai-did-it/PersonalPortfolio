import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, ZapOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MotionToggle({ motionIntensity, onToggle }) {
  const levels = ["LOW", "MED", "HIGH"];
  const currentIndex = levels.indexOf(motionIntensity);

  const handleToggle = () => {
    const nextIndex = (currentIndex + 1) % levels.length;
    onToggle(levels[nextIndex]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-8 right-8 z-50"
    >
      <Button
        variant="outline"
        size="lg"
        onClick={handleToggle}
        className="bg-slate-800/90 backdrop-blur-md border-2 border-slate-700 hover:border-cyan-500 shadow-lg hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 gap-2 text-slate-200"
      >
        {motionIntensity === "LOW" ? (
          <ZapOff className="w-5 h-5 text-slate-400" />
        ) : (
          <Zap className="w-5 h-5 text-cyan-400" />
        )}
        <span className="font-medium">
          Motion: {motionIntensity}
        </span>
      </Button>
    </motion.div>
  );
}