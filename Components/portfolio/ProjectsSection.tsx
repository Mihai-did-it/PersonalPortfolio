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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (hoveredProject !== index) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const projects = [
    {
      title: "FleetLink",
      description: "Enterprise fleet management system with real-time tracking, maintenance scheduling, and analytics dashboard.",
      tech: ["React", "TypeScript", "AWS"],
      category: "Full Stack",
      image: "https://images.unsplash.com/photo-1618044733300-9472054094ee?w=800&h=600&fit=crop",
      link: "#",
      github: "#"
    },
    {
      title: "Pomodoro StudyPal",
      description: "AI-powered study companion with smart break suggestions, progress tracking, and OpenAI integration.",
      tech: ["AWS Lambda", "DynamoDB", "OpenAI API"],
      category: "AI/ML",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
      link: "#",
      github: "#"
    },
    {
      title: "Savour",
      description: "Social recipe sharing platform with real-time collaboration, cloud storage, and serverless architecture.",
      tech: ["Vue.js", "Firebase", "Cloud Functions"],
      category: "Web App",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop",
      link: "#",
      github: "#"
    },
    {
      title: "Streakify",
      description: "Habit tracking iOS app with gamification, notifications, and beautiful SwiftUI animations.",
      tech: ["SwiftUI", "Firebase", "iOS"],
      category: "Mobile",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      link: "#",
      github: "#"
    },
    {
      title: "Test Project Alpha",
      description: "Test project showcasing advanced features and modern development practices with cutting-edge technologies.",
      tech: ["Next.js", "GraphQL", "Docker"],
      category: "Full Stack",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
      link: "#",
      github: "#"
    },
    {
      title: "Test Project Beta",
      description: "Test project demonstrating scalable architecture and real-time data processing capabilities.",
      tech: ["Node.js", "MongoDB", "Redis"],
      category: "Backend",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
      link: "#",
      github: "#"
    }
  ];

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-dvh h-auto overflow-visible py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950"
    >
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
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-slate-400 text-xs max-w-2xl mx-auto">
            A collection of projects showcasing my expertise in full-stack development, cloud architecture, and modern web technologies.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 mb-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ 
                y: -6,
                scale: 1.02,
                transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }
              }}
              className="group relative overflow-hidden rounded-xl cursor-pointer"
              style={{
                background: hoveredProject === index
                  ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.1), rgba(255,255,255,0.03))`
                  : 'rgba(255,255,255,0.05)'
              }}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => {
                setHoveredProject(null);
                setMousePosition({ x: 50, y: 50 });
              }}
              onMouseMove={(e) => handleMouseMove(e, index)}
            >
              <div className="relative h-full overflow-hidden rounded-2xl bg-slate-800/30 backdrop-blur-sm shadow-2xl"
                style={{
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderImage: hoveredProject === index
                    ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(34, 211, 238, 0.8), rgba(100, 116, 139, 0.3)) 1`
                    : 'none',
                  borderColor: hoveredProject === index ? 'transparent' : 'rgba(100, 116, 139, 0.3)'
                }}
              >
                {/* Mouse spotlight effect */}
                {hoveredProject === index && (
                  <motion.div
                    className="absolute inset-0 opacity-0 pointer-events-none"
                    animate={{
                      opacity: 1,
                      background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(34, 211, 238, 0.15), transparent 40%)`
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                )}
                
                {/* Project Image */}
                <motion.div 
                  className="relative overflow-hidden"
                  animate={{
                    height: hoveredProject === index ? 120 : 100,
                  }}
                  transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <motion.img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredProject === index ? 1.08 : 1,
                    }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  
                  {/* Category badge */}
                  <motion.div 
                    className="absolute top-2 right-2"
                    animate={{
                      scale: hoveredProject === index ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="px-2 py-1 bg-cyan-500/20 backdrop-blur-md border border-cyan-400/30 text-cyan-300 rounded-full text-xs font-semibold">
                      {project.category}
                    </span>
                  </motion.div>

                  {/* Hover overlay with buttons */}
                  <motion.div 
                    className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ pointerEvents: hoveredProject === index ? 'auto' : 'none' }}
                  >
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ 
                        y: hoveredProject === index ? 0 : 20,
                        opacity: hoveredProject === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <Button
                        size="sm"
                        className="bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                        onClick={() => window.open(project.link, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                    </motion.div>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ 
                        y: hoveredProject === index ? 0 : 20,
                        opacity: hoveredProject === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3, delay: 0.15 }}
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-slate-800/90 border-slate-600 text-slate-200 hover:bg-slate-700 hover:border-cyan-500"
                        onClick={() => window.open(project.github, '_blank')}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Project Info */}
                <motion.div 
                  className="p-3"
                  animate={{
                    paddingTop: hoveredProject === index ? 16 : 12,
                    paddingBottom: hoveredProject === index ? 16 : 12,
                  }}
                  transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <motion.h3 
                      className="text-lg font-bold text-slate-100"
                      animate={{
                        color: hoveredProject === index ? "rgb(34, 211, 238)" : "rgb(241, 245, 249)",
                        scale: hoveredProject === index ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.title}
                    </motion.h3>
                  </div>
                  
                  <motion.p 
                    className="text-slate-300 mb-2 leading-relaxed text-xs line-clamp-2"
                    animate={{
                      opacity: hoveredProject === index ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.description}
                  </motion.p>

                  {/* Tech Stack */}
                                    {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech: string, idx: number) => (
                      <motion.span 
                        key={idx}
                        className="px-2 py-0.5 bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 text-cyan-400 rounded text-xs"
                        animate={{
                          y: hoveredProject === index ? -1 : 0,
                        }}
                        transition={{ duration: 0.2, delay: idx * 0.02 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Animated border glow effect */}
                <motion.div 
                  className="absolute -inset-0.5 rounded-2xl -z-10 opacity-0"
                  animate={{
                    opacity: hoveredProject === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div 
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: hoveredProject === index 
                        ? `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(34, 211, 238, 0.4), rgba(6, 182, 212, 0.2) 40%, transparent 70%)`
                        : 'transparent',
                      filter: 'blur(20px)',
                    }}
                  />
                </motion.div>
                
                {/* Subtle overall glow */}
                <motion.div 
                  className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-cyan-400/20 to-cyan-500/20 rounded-2xl blur-xl -z-20"
                  animate={{
                    opacity: hoveredProject === index ? 0.6 : 0,
                    scale: hoveredProject === index ? 1.05 : 1,
                  }}
                  transition={{ 
                    duration: 0.4,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              variant="outline"
              className="bg-slate-800/50 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 shadow-lg hover:shadow-xl hover:shadow-cyan-500/20 transition-all group"
            >
              <Github className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              View All Projects on GitHub
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
