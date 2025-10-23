import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import InteractiveStarfield from "../scenes/InteractiveStarfield";

export default function ExperienceSection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const [mousePos, setMousePos] = React.useState({ x: 50, y: 50 });
  const [hoveredExp, setHoveredExp] = React.useState<number | null>(null);

  const handleExpMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const experiences = [
    {
      company: "Winfo",
      role: "Software Engineer Intern",
      period: "2025",
      description: "Built Flask REST APIs on Oracle Cloud, developed Python ETL pipelines with pandas & SQLAlchemy, implemented structured logging, data validation, and PostgreSQL integration.",
      tech: ["Python", "Flask", "Oracle Cloud", "PostgreSQL", "SQLAlchemy"]
    },
    {
      company: "Avid Bioservices",
      role: "Software Engineer Intern",
      period: "2024",
      description: "Rebuilt Python ETL pipeline, orchestrated workflows with Apache Airflow on AWS, implemented CI/CD with pytest and GitHub Actions.",
      tech: ["Python", "AWS", "Apache Airflow", "pytest", "CI/CD"]
    }
  ];

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-dvh h-auto overflow-visible py-12 sm:py-16 md:py-20 bg-[#040b1a]"
    >
      {/* Three.js Interactive Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <InteractiveStarfield 
          canvasRef={canvasRef}
          isInView={isInView}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-20">
        <motion.h2 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 md:mb-16 text-center bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Experience
        </motion.h2>

        <div className="space-y-6 sm:space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ 
                y: -6,
                scale: 1.02,
                transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
              }}
              onMouseEnter={() => setHoveredExp(index)}
              onMouseLeave={() => setHoveredExp(null)}
              onMouseMove={(e) => handleExpMouseMove(e, index)}
            >
              <div className="relative group">
                <div 
                  className="relative backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
                  style={{
                    background: hoveredExp === index
                      ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(34, 211, 238, 0.15), rgba(30, 41, 59, 0.4))`
                      : 'rgba(30, 41, 59, 0.4)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: hoveredExp === index 
                      ? 'rgba(34, 211, 238, 0.5)' 
                      : 'rgba(100, 116, 139, 0.5)'
                  }}
                >
                  {/* Mouse spotlight effect */}
                  {hoveredExp === index && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(34, 211, 238, 0.1), transparent 40%)`
                      }}
                    />
                  )}
                  
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 sm:mb-4">
                      <div>
                        <div className="flex items-center gap-2 sm:gap-3 mb-2">
                          <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                          <h3 className="text-xl sm:text-2xl font-bold text-slate-100">{exp.company}</h3>
                        </div>
                        <p className="text-base sm:text-lg text-cyan-400 font-medium">{exp.role}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-2 md:mt-0 text-slate-400">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm">{exp.period}</span>
                      </div>
                    </div>

                    <p className="text-slate-300 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">{exp.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-3 py-1 bg-cyan-500/10 text-cyan-300 rounded-full text-sm font-medium border border-cyan-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Animated glow that follows mouse */}
                  {hoveredExp === index && (
                    <div 
                      className="absolute -inset-1 rounded-2xl -z-10 blur-xl"
                      style={{
                        background: `radial-gradient(800px circle at ${mousePos.x}% ${mousePos.y}%, rgba(34, 211, 238, 0.5), rgba(6, 182, 212, 0.2) 40%, transparent 70%)`
                      }}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
