import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Zap } from "lucide-react";
import { Button } from "@/Components/ui/button";
import InteractiveStarfield from "../scenes/InteractiveStarfield";
import FloatingAstronaut from "../scenes/FloatingAstronaut";

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const astronautCanvasRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      title: "FleetLink",
      description: "Enterprise fleet management system with real-time tracking, maintenance scheduling, and analytics dashboard.",
      extendedDescription: "Comprehensive fleet management solution featuring real-time GPS tracking, predictive maintenance algorithms, driver performance analytics, and automated reporting. Built with modern cloud architecture for scalability and reliability.",
      tech: ["React", "TypeScript", "AWS Cognito", "Lambda", "RDS", "S3", "CloudFront"],
      features: ["Real-time tracking", "Maintenance scheduling", "Analytics dashboard", "Driver management"],
      image: "https://images.unsplash.com/photo-1618044733300-9472054094ee?w=800&h=600&fit=crop",
      link: "#"
    },
    {
      title: "Pomodoro StudyPal",
      description: "AI-powered study companion with smart break suggestions, progress tracking, and OpenAI integration for personalized study tips.",
      extendedDescription: "Intelligent study assistant that uses AI to optimize your learning sessions. Features adaptive break timing, personalized study recommendations, progress analytics, and integration with calendar apps for seamless scheduling.",
      tech: ["AWS Lambda", "DynamoDB", "OpenAI API", "S3", "CloudFront"],
      features: ["AI recommendations", "Smart breaks", "Progress tracking", "Study analytics"],
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
      link: "#"
    },
    {
      title: "Savour",
      description: "Social recipe sharing platform with real-time collaboration, cloud storage, and serverless architecture.",
      extendedDescription: "Modern recipe sharing platform with social features, real-time collaboration on recipes, ingredient scaling, meal planning, and shopping list generation. Built with serverless architecture for optimal performance.",
      tech: ["Vue.js", "Firebase", "Cloud Functions", "Firestore"],
      features: ["Recipe sharing", "Real-time collaboration", "Meal planning", "Shopping lists"],
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop",
      link: "#"
    },
    {
      title: "Streakify",
      description: "Habit tracking iOS app with gamification, notifications, and beautiful SwiftUI animations.",
      extendedDescription: "Beautiful habit tracking app with gamification elements to keep you motivated. Features include streak tracking, achievement system, customizable reminders, progress visualization, and social challenges with friends.",
      tech: ["SwiftUI", "Firebase", "Cloud Messaging", "iOS"],
      features: ["Habit tracking", "Gamification", "Social challenges", "Progress visualization"],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      link: "#"
    }
  ];

  return (
    <div ref={sectionRef} className="relative w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 py-20">
      {/* Three.js Interactive Background - Covers full section */}
      <div className="absolute inset-0 z-0 opacity-60" style={{ minHeight: '100%' }}>
        <InteractiveStarfield 
          canvasRef={canvasRef}
          isInView={isInView}
        />
      </div>
      
      {/* Floating Astronaut */}
      <div className="absolute inset-0 z-1 opacity-70 cursor-pointer" style={{ minHeight: '100%' }}>
        <FloatingAstronaut 
          canvasRef={astronautCanvasRef}
          isInView={isInView}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <motion.h2 
          className="text-5xl md:text-6xl font-bold mb-16 text-center bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Featured Projects
        </motion.h2>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <motion.div 
                className="relative overflow-hidden rounded-2xl bg-slate-800/40 backdrop-blur-md border border-slate-700/50 shadow-2xl"
                animate={{
                  scale: hoveredProject === index ? 1.02 : 1,
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={`flex ${hoveredProject === index ? 'flex-row' : 'flex-col md:flex-row'} transition-all duration-300`}>
                  {/* Project Image */}
                  <motion.div 
                    className={`relative overflow-hidden ${hoveredProject === index ? 'w-full md:w-1/2' : 'w-full md:w-2/5 h-64 md:h-auto'}`}
                  >
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        scale: hoveredProject === index ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <img 
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                  </motion.div>

                  {/* Project Info */}
                  <div className={`p-6 ${hoveredProject === index ? 'w-full md:w-1/2' : 'w-full md:w-3/5'}`}>
                    <h3 className="text-2xl font-bold text-slate-100 mb-3">
                      {project.title}
                    </h3>
                    <p className="text-slate-300 mb-4 leading-relaxed">
                      {hoveredProject === index ? project.extendedDescription : project.description}
                    </p>

                    <AnimatePresence>
                      {hoveredProject === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mb-4"
                        >
                          <h4 className="text-sm font-semibold text-cyan-400 mb-2 flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            Key Features
                          </h4>
                          <ul className="grid grid-cols-2 gap-2">
                            {project.features.map((feature, fIndex) => (
                              <li key={fIndex} className="text-sm text-slate-400 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, hoveredProject === index ? project.tech.length : 4).map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full text-xs font-medium border border-slate-600/50"
                        >
                          {tech}
                        </span>
                      ))}
                      {hoveredProject !== index && project.tech.length > 4 && (
                        <span className="px-3 py-1 bg-slate-700/50 text-slate-400 rounded-full text-xs font-medium border border-slate-600/50">
                          +{project.tech.length - 4} more
                        </span>
                      )}
                    </div>

                    <AnimatePresence>
                      {hoveredProject === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2, delay: 0.05 }}
                          className="flex gap-3"
                        >
                          <Button
                            size="sm"
                            className="bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/20 transition-all flex-1"
                            onClick={() => window.open(project.link, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Project
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-slate-800/90 border-slate-600 text-slate-200 hover:bg-slate-700 hover:border-cyan-500 shadow-lg transition-all"
                            onClick={() => window.open('#', '_blank')}
                          >
                            <Github className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Enhanced glow effect */}
                <motion.div 
                  className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-500 rounded-2xl blur-xl -z-10"
                  animate={{
                    opacity: hoveredProject === index ? 0.4 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}