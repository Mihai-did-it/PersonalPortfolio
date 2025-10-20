import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, FileText } from "lucide-react";
import { Button } from "@/Components/ui/button";
import AnimatedGrid from "../scenes/AnimatedGrid";

export default function HeroSection() {
  const canvasRef = useRef(null);

  return (
    <div className="relative w-full min-h-svh hero-section-bg flex items-center justify-center overflow-hidden">
      {/* Three.js Background - Full coverage, no overflow */}
      <div className="absolute inset-0 z-0 opacity-50">
        <AnimatedGrid canvasRef={canvasRef} />
      </div>

      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/60 z-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="inline-block mb-6 px-4 py-2 rounded-full bg-cyan-500/10 backdrop-blur-md border border-cyan-500/20 shadow-lg shadow-cyan-500/10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="text-sm font-medium text-cyan-400">Available for Internship Opportunities</span>
          </motion.div>

          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 tracking-tight px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: "easeOut" }}
          >
            <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
              Mihai Lache
            </span>
          </motion.h1>

          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-cyan-300 mb-3 md:mb-4 font-light px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Software Engineer
          </motion.p>

          <motion.p 
            className="text-base md:text-lg text-slate-400 mb-8 md:mb-12 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            U.S Citizen
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <Button 
              size="lg"
              className="bg-cyan-600 hover:bg-cyan-500 text-white shadow-xl shadow-cyan-500/20 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105 group w-full sm:w-auto"
            >
              <Mail className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Get in Touch
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-slate-600 hover:border-cyan-500 bg-slate-800/50 backdrop-blur-md hover:bg-slate-700/50 text-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              onClick={() => window.open('/assets/NewGrad_October.pdf', '_blank')}
            >
              <FileText className="w-5 h-5 mr-2" />
              View Resume
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="flex gap-4 md:gap-6 justify-center mt-8 md:mt-12 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <a 
              href="https://github.com/mihailache" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-slate-800/80 backdrop-blur-md border border-slate-700 flex items-center justify-center hover:bg-cyan-900/50 hover:border-cyan-500 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <Github className="w-5 h-5 text-slate-300" />
            </a>
            <a 
              href="https://linkedin.com/in/mihailache" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-slate-800/80 backdrop-blur-md border border-slate-700 flex items-center justify-center hover:bg-cyan-900/50 hover:border-cyan-500 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <Linkedin className="w-5 h-5 text-slate-300" />
            </a>
            <a 
              href="mailto:mihailache100@gmail.com"
              className="w-12 h-12 rounded-full bg-slate-800/80 backdrop-blur-md border border-slate-700 flex items-center justify-center hover:bg-cyan-900/50 hover:border-cyan-500 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <Mail className="w-5 h-5 text-slate-300" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 md:bottom-12 z-20 w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="flex flex-col items-center justify-center gap-2 w-full">
          <span className="text-xs md:text-sm text-slate-400 font-medium">Scroll to explore</span>
          <ArrowDown className="w-5 h-5 md:w-6 md:h-6 text-cyan-500 mx-auto" />
        </div>
      </motion.div>
    </div>
  );
}