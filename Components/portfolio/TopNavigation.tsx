import React, { useState, useEffect } from "react";
import { motion, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, FileText } from "lucide-react";

export default function TopNavigation({ sections, activeSection, onNavigate, scrollProgress }) {
  const [isScrolled, setIsScrolled] = useState(false);

  // Transform scroll progress to control navbar size
  const navHeight = useTransform(scrollProgress, [0, 0.05], [80, 60]);
  const navOpacity = useTransform(scrollProgress, [0, 0.02], [1, 0.95]);
  
  useEffect(() => {
    const unsubscribe = scrollProgress.onChange((latest) => {
      setIsScrolled(latest > 0.02);
    });
    return () => unsubscribe();
  }, [scrollProgress]);

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{ 
        height: navHeight,
        opacity: navOpacity
      }}
    >
      <div className={`h-full backdrop-blur-xl transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/80 border-b border-slate-800/50 shadow-lg shadow-cyan-500/5' 
          : 'bg-slate-900/40 border-b border-slate-800/20'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo/Name */}
          <motion.button
            onClick={() => onNavigate(0)}
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`relative transition-all duration-300 ${
              isScrolled ? 'w-10 h-10' : 'w-12 h-12'
            } rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30`}>
              <span className={`font-bold text-white transition-all duration-300 ${
                isScrolled ? 'text-lg' : 'text-xl'
              }`}>ML</span>
            </div>
            <div>
              <h1 className={`font-bold text-slate-100 group-hover:text-cyan-400 transition-all duration-300 ${
                isScrolled ? 'text-lg' : 'text-xl'
              }`}>
                Mihai Lache
              </h1>
              {!isScrolled && (
                <motion.p 
                  className="text-xs text-slate-400"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isScrolled ? 0 : 1 }}
                >
                  Software Engineer
                </motion.p>
              )}
            </div>
          </motion.button>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-2">
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                onClick={() => onNavigate(index)}
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeSection === index
                    ? 'text-cyan-400'
                    : 'text-slate-400 hover:text-slate-200'
                } ${isScrolled ? 'text-sm' : 'text-base'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {section.label}
                {activeSection === index && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-cyan-500/10 rounded-lg border border-cyan-500/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Social Links & CTA */}
          <div className="flex items-center gap-3">
            {/* Social Icons - hide on small screens when scrolled */}
            <motion.div 
              className={`hidden lg:flex items-center gap-2 transition-all duration-300 ${
                isScrolled ? 'scale-90' : 'scale-100'
              }`}
            >
              <a
                href="https://github.com/mihailache"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center hover:bg-cyan-900/50 hover:border-cyan-500/50 transition-all duration-300 hover:scale-110"
              >
                <Github className="w-4 h-4 text-slate-300" />
              </a>
              <a
                href="https://linkedin.com/in/mihailache"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center hover:bg-cyan-900/50 hover:border-cyan-500/50 transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-4 h-4 text-slate-300" />
              </a>
              <a
                href="mailto:mihailache100@gmail.com"
                className="w-9 h-9 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center hover:bg-cyan-900/50 hover:border-cyan-500/50 transition-all duration-300 hover:scale-110"
              >
                <Mail className="w-4 h-4 text-slate-300" />
              </a>
            </motion.div>

            {/* Resume Button */}
            <motion.button
              onClick={() => window.open('/assets/NewGrad_October.pdf', '_blank')}
              className={`flex items-center gap-2 px-4 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105 ${
                isScrolled ? 'py-2 text-sm' : 'py-2.5 text-base'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className={`${isScrolled ? 'w-4 h-4' : 'w-5 h-5'}`} />
              <span className="hidden sm:inline">Resume</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}