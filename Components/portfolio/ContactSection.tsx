import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import InteractiveStarfield from "../scenes/InteractiveStarfield";

export default function ContactSection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const [mousePos, setMousePos] = React.useState({ x: 50, y: 50 });
  const [hoveredContact, setHoveredContact] = React.useState<number | null>(null);

  const handleContactMouseMove = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-visible py-16 sm:py-20 md:py-24"
    >
      <div className="absolute inset-0 z-0 opacity-60">
        <InteractiveStarfield 
          canvasRef={canvasRef}
          isInView={isInView}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto px-4">
            I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.9 }}
          className="flex flex-col max-w-2xl mx-auto space-y-4 sm:space-y-6"
        >
          <motion.a
            href="mailto:mihailache100@gmail.com"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ 
              y: -6,
              scale: 1.02,
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
            }}
            onMouseEnter={() => setHoveredContact(0)}
            onMouseLeave={() => setHoveredContact(null)}
            onMouseMove={(e) => handleContactMouseMove(e, 0)}
            className="block relative group cursor-pointer"
          >
            <div 
              className="relative backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-xl transition-all duration-300 overflow-hidden"
              style={{
                background: hoveredContact === 0
                  ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(34, 211, 238, 0.15), rgba(30, 41, 59, 0.4))`
                  : 'rgba(30, 41, 59, 0.4)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: hoveredContact === 0
                  ? 'rgba(34, 211, 238, 0.5)' 
                  : 'rgba(100, 116, 139, 0.5)'
              }}
            >
              {hoveredContact === 0 && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(34, 211, 238, 0.1), transparent 40%)`
                  }}
                />
              )}
              <div className="relative z-10 flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 flex-shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-slate-400 font-medium">Email</p>
                  <p className="text-slate-200 transition-colors text-sm sm:text-base break-all">
                    mihailache100@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/mihai-l-8b91002b8/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ 
              y: -6,
              scale: 1.02,
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
            }}
            onMouseEnter={() => setHoveredContact(1)}
            onMouseLeave={() => setHoveredContact(null)}
            onMouseMove={(e) => handleContactMouseMove(e, 1)}
            className="block relative group cursor-pointer"
          >
            <div 
              className="relative backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-xl transition-all duration-300 overflow-hidden"
              style={{
                background: hoveredContact === 1
                  ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(34, 211, 238, 0.15), rgba(30, 41, 59, 0.4))`
                  : 'rgba(30, 41, 59, 0.4)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: hoveredContact === 1
                  ? 'rgba(34, 211, 238, 0.5)' 
                  : 'rgba(100, 116, 139, 0.5)'
              }}
            >
              {hoveredContact === 1 && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(34, 211, 238, 0.1), transparent 40%)`
                  }}
                />
              )}
              <div className="relative z-10 flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 flex-shrink-0">
                  <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-slate-400 font-medium">LinkedIn</p>
                  <p className="text-slate-200 transition-colors text-sm sm:text-base break-all">
                    linkedin.com/in/mihai-l-8b91002b8
                  </p>
                </div>
              </div>
            </div>
          </motion.a>

          <motion.a
            href="https://github.com/Mihai-did-it"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ 
              y: -6,
              scale: 1.02,
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
            }}
            onMouseEnter={() => setHoveredContact(2)}
            onMouseLeave={() => setHoveredContact(null)}
            onMouseMove={(e) => handleContactMouseMove(e, 2)}
            className="block relative group cursor-pointer"
          >
            <div 
              className="relative backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-xl transition-all duration-300 overflow-hidden"
              style={{
                background: hoveredContact === 2
                  ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(34, 211, 238, 0.15), rgba(30, 41, 59, 0.4))`
                  : 'rgba(30, 41, 59, 0.4)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: hoveredContact === 2
                  ? 'rgba(34, 211, 238, 0.5)' 
                  : 'rgba(100, 116, 139, 0.5)'
              }}
            >
              {hoveredContact === 2 && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(34, 211, 238, 0.1), transparent 40%)`
                  }}
                />
              )}
              <div className="relative z-10 flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 flex-shrink-0">
                  <Github className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-slate-400 font-medium">GitHub</p>
                  <p className="text-slate-200 transition-colors text-sm sm:text-base break-all">
                    github.com/Mihai-did-it
                  </p>
                </div>
              </div>
            </div>
          </motion.a>
        </motion.div>

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
