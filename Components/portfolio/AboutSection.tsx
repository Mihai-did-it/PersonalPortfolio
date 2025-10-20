import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import InteractiveStarfield from "../scenes/InteractiveStarfield";
import FloatingAstronaut from "../scenes/FloatingAstronaut";

export default function AboutSection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const astronautCanvasRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const [mousePos, setMousePos] = React.useState({ x: 50, y: 50 });
  const [hoveredCard, setHoveredCard] = React.useState<number | null>(null);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div ref={sectionRef} className="relative w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 flex items-center justify-center overflow-hidden">
      {/* Three.js Interactive Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <InteractiveStarfield 
          canvasRef={canvasRef}
          isInView={isInView}
        />
      </div>
      
      {/* Floating Astronaut */}
      <div className="absolute inset-0 z-1 opacity-70 cursor-pointer">
        <FloatingAstronaut 
          canvasRef={astronautCanvasRef}
          isInView={isInView}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start">
          {/* Left Column - Text in Glass Box */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-slate-700/50 shadow-2xl">
              <motion.h2 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.9 }}
              >
                About Me
              </motion.h2>
              
              <motion.div 
                className="space-y-3 sm:space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <p>
                  I'm a Computer Science B.S graduate from UC Santa Cruz. I'm passionate about building systems that scale. My journey spans from backend architecture to full-stack development, with a focus on data engineering and cloud infrastructure.
                </p>
                <p>
                  Currently enrolled in a Masters program in AI/ML at Maastricht University (expected 2027) and gained international perspective through study abroad at the University of Tokyo.
                </p>
                <p>
                  I write code with design in mind, aiming for software that’s efficient, intuitive, and clear.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Education Cards */}
          <motion.div
            className="space-y-4 sm:space-y-6"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            {[
              { school: "UC Santa Cruz", degree: "BS Computer Science", year: "2021 - 2025" },
              { school: "Maastricht University", degree: "MSc Artificial Intelligence", year: "Expected 2027" },
              { school: "University of Tokyo", degree: "Study Abroad Program", year: "2023" }
            ].map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.6 + index * 0.2, duration: 0.8 }}
                className="relative overflow-hidden rounded-2xl p-5 sm:p-6 shadow-xl transition-all duration-500 hover:scale-[1.02] cursor-pointer"
                style={{
                  background: hoveredCard === index
                    ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(34, 211, 238, 0.15), rgba(30, 41, 59, 0.4))`
                    : 'rgba(30, 41, 59, 0.4)',
                  backdropFilter: 'blur(12px)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: hoveredCard === index 
                    ? 'rgba(34, 211, 238, 0.5)' 
                    : 'rgba(100, 116, 139, 0.5)'
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onMouseMove={(e) => handleCardMouseMove(e, index)}
                whileHover={{ y: -8 }}
              >
                {/* Spotlight effect */}
                {hoveredCard === index && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(34, 211, 238, 0.1), transparent 40%)`
                    }}
                  />
                )}
                
                {/* Glow effect */}
                {hoveredCard === index && (
                  <div 
                    className="absolute -inset-1 rounded-2xl opacity-50 -z-10 blur-xl"
                    style={{
                      background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(34, 211, 238, 0.6), transparent 70%)`
                    }}
                  />
                )}
                
                <div className="relative z-10">
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-100 mb-2">{edu.school}</h3>
                  <p className="text-cyan-400 font-medium mb-1 text-sm sm:text-base">{edu.degree}</p>
                  <p className="text-slate-400 text-xs sm:text-sm">{edu.year}</p>
                </div>
                
                {/* Corner accents */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-cyan-500/20 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}