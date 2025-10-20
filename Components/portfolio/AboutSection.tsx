import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ExperienceBackground from "../scenes/ExperienceBackground";

export default function AboutSection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  return (
    <div ref={sectionRef} className="relative w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 flex items-center justify-center overflow-hidden">
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0 opacity-50">
        <ExperienceBackground 
          canvasRef={canvasRef}
          isInView={isInView}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Text in Glass Box */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-8 border border-slate-700/50 shadow-2xl">
              <motion.h2 
                className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.9 }}
              >
                About Me
              </motion.h2>
              
              <motion.div 
                className="space-y-4 text-slate-300 text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <p>
                  I'm a Computer Science student at UC Santa Cruz, passionate about building systems that scale and interfaces that delight. My journey spans from backend architecture to full-stack development, with a focus on data engineering and cloud infrastructure.
                </p>
                <p>
                  Currently exploring AI/ML at Maastricht University (expected 2027) and gained international perspective through study abroad at the University of Tokyo.
                </p>
                <p>
                  I thrive at the intersection of elegant code and user experience, believing that technical excellence and visual design aren't mutually exclusive—they're complementary forces that create truly exceptional products.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Education Cards */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 hover:scale-[1.02] hover:border-cyan-500/30"
            >
              <h3 className="text-xl font-semibold text-slate-100 mb-2">UC Santa Cruz</h3>
              <p className="text-cyan-400 font-medium mb-1">BS Computer Science</p>
              <p className="text-slate-400 text-sm">2021 - 2025</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 hover:scale-[1.02] hover:border-cyan-500/30"
            >
              <h3 className="text-xl font-semibold text-slate-100 mb-2">Maastricht University</h3>
              <p className="text-cyan-400 font-medium mb-1">MSc Artificial Intelligence</p>
              <p className="text-slate-400 text-sm">Expected 2027</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 hover:scale-[1.02] hover:border-cyan-500/30"
            >
              <h3 className="text-xl font-semibold text-slate-100 mb-2">University of Tokyo</h3>
              <p className="text-cyan-400 font-medium mb-1">Study Abroad Program</p>
              <p className="text-slate-400 text-sm">2023</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}