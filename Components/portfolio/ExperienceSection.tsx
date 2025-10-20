import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import InteractiveStarfield from "../scenes/InteractiveStarfield";
import FloatingAstronaut from "../scenes/FloatingAstronaut";

export default function ExperienceSection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const astronautCanvasRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

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
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <motion.h2 
          className="text-5xl md:text-6xl font-bold mb-16 text-center bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Experience
        </motion.h2>

        <div className="space-y-8">
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
            >
              <div className="relative group">
                <div className="relative bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 shadow-xl group-hover:shadow-2xl group-hover:shadow-cyan-500/10 transition-all duration-300 group-hover:border-cyan-500/30">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Briefcase className="w-5 h-5 text-cyan-400" />
                          <h3 className="text-2xl font-bold text-slate-100">{exp.company}</h3>
                        </div>
                        <p className="text-lg text-cyan-400 font-medium">{exp.role}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-2 md:mt-0 text-slate-400">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{exp.period}</span>
                      </div>
                    </div>

                    <p className="text-slate-300 mb-4 leading-relaxed">{exp.description}</p>

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

                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-cyan-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}