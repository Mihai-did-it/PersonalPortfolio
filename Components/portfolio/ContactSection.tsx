import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import FloatingParticles from "../scenes/FloatingParticles";

export default function ContactSection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-dvh h-auto overflow-visible pt-12 sm:pt-16 md:pt-20 contact-section-bg"
    >
      {/* Three.js Interactive Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <FloatingParticles 
          canvasRef={canvasRef}
          isInView={isInView}
          motionIntensity="HIGH"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto px-4">
            I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
          </p>
        </motion.div>

        {/* Contact Info Cards - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.9 }}
          className="max-w-2xl mx-auto space-y-4 sm:space-y-6"
        >
          <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-slate-700/50 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 hover:border-cyan-500/30 hover:scale-105">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 flex-shrink-0">
                <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm sm:text-base text-slate-400 font-medium mb-1">Email</p>
                <a href="mailto:mihailache100@gmail.com" className="text-slate-200 hover:text-cyan-400 transition-colors text-base sm:text-lg font-medium break-all">
                  mihailache100@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-slate-700/50 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 hover:border-cyan-500/30 hover:scale-105">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 flex-shrink-0">
                <Linkedin className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm sm:text-base text-slate-400 font-medium mb-1">LinkedIn</p>
                <a href="https://www.linkedin.com/in/mihai-l-8b91002b8/" target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-cyan-400 transition-colors text-base sm:text-lg font-medium break-all">
                  linkedin.com/in/mihai-l-8b91002b8
                </a>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-slate-700/50 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 hover:border-cyan-500/30 hover:scale-105">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 flex-shrink-0">
                <Github className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm sm:text-base text-slate-400 font-medium mb-1">GitHub</p>
                <a href="https://github.com/Mihai-did-it" target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-cyan-400 transition-colors text-base sm:text-lg font-medium break-all">
                  github.com/Mihai-did-it
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-12 sm:mt-16 pb-8 text-slate-500 text-xs sm:text-sm px-4"
        >
          <p>© 2025 Mihai Lache. Built with React, Three.js, and attention to detail.</p>
        </motion.div>
      </div>
    </div>
  );
}
