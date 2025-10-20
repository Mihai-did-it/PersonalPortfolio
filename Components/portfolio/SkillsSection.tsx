import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import ConstellationRing from "../scenes/ConstellationRing";

export default function SkillsSection({ motionIntensity }) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  const skillCategories = [
    {
      title: "Languages",
      skills: [
        { name: "Python", level: 95 },
        { name: "JavaScript", level: 90 },
        { name: "Java", level: 85 },
        { name: "SQL", level: 88 },
        { name: "Swift", level: 80 },
        { name: "C/C++", level: 75 }
      ]
    },
    {
      title: "Frameworks",
      skills: [
        { name: "Django", level: 88 },
        { name: "Flask", level: 92 },
        { name: "React", level: 90 },
        { name: "Vue.js", level: 85 },
        { name: "SwiftUI", level: 82 }
      ]
    },
    {
      title: "Tools & Cloud",
      skills: [
        { name: "AWS", level: 90 },
        { name: "Firebase", level: 85 },
        { name: "PostgreSQL", level: 88 },
        { name: "Docker", level: 83 },
        { name: "Git", level: 92 }
      ]
    }
  ];

  const [counts, setCounts] = useState({});

  useEffect(() => {
    if (isInView) {
      skillCategories.forEach(category => {
        category.skills.forEach(skill => {
          let current = 0;
          const increment = skill.level / 60;
          const timer = setInterval(() => {
            current += increment;
            if (current >= skill.level) {
              current = skill.level;
              clearInterval(timer);
            }
            setCounts(prev => ({ ...prev, [skill.name]: Math.floor(current) }));
          }, 16);
        });
      });
    }
  }, [isInView]);

  return (
    <div ref={sectionRef} className="relative w-full h-full bg-gradient-to-br from-white via-off-white to-surface flex items-center overflow-hidden">
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0">
        <ConstellationRing 
          canvasRef={canvasRef}
          isInView={isInView}
          motionIntensity={motionIntensity}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <motion.h2 
          className="text-5xl md:text-6xl font-bold mb-16 text-center bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Skills & Expertise
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + categoryIndex * 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-indigo-100 pb-3">
                  {category.title}
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + categoryIndex * 0.15 + skillIndex * 0.05 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 font-medium">{skill.name}</span>
                        <span className="text-indigo-600 font-bold text-lg">
                          {counts[skill.name] || 0}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{ delay: 0.5 + categoryIndex * 0.15 + skillIndex * 0.05, duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}