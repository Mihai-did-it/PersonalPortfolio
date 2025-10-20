import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Linkedin, Github, Send } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import FloatingParticles from "../scenes/FloatingParticles";

export default function ContactSection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `mailto:mihailache100@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${formData.message}`;
  };

  return (
    <div ref={sectionRef} className="relative w-full h-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 md:flex md:items-center md:justify-center overflow-hidden py-8 md:py-0">
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0 opacity-20">
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
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto px-4">
            I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.9 }}
          >
            <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-slate-700/50 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">Name</label>
                  <Input 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Your name"
                    className="bg-slate-900/50 border-slate-600 text-slate-200 focus:border-cyan-500 focus:ring-cyan-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">Email</label>
                  <Input 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your.email@example.com"
                    className="bg-slate-900/50 border-slate-600 text-slate-200 focus:border-cyan-500 focus:ring-cyan-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">Message</label>
                  <Textarea 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell me about your project or opportunity..."
                    rows={5}
                    className="bg-slate-900/50 border-slate-600 text-slate-200 focus:border-cyan-500 focus:ring-cyan-500"
                    required
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-white shadow-xl shadow-cyan-500/20 hover:shadow-2xl hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105"
                  size="lg"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.9 }}
            className="flex flex-col justify-center space-y-4 sm:space-y-6"
          >
            <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-slate-700/50 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 hover:border-cyan-500/30">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 flex-shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-slate-400 font-medium">Email</p>
                  <a href="mailto:mihailache100@gmail.com" className="text-slate-200 hover:text-cyan-400 transition-colors text-sm sm:text-base break-all">
                    mihailache100@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-slate-700/50 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 hover:border-cyan-500/30">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 flex-shrink-0">
                  <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-slate-400 font-medium">LinkedIn</p>
                  <a href="https://linkedin.com/in/mihailache" target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-cyan-400 transition-colors text-sm sm:text-base break-all">
                    linkedin.com/in/mihailache
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-slate-700/50 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 hover:border-cyan-500/30">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 flex-shrink-0">
                  <Github className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-slate-400 font-medium">GitHub</p>
                  <a href="https://github.com/mihailache" target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-cyan-400 transition-colors text-sm sm:text-base break-all">
                    github.com/mihailache
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-12 sm:mt-16 text-slate-500 text-xs sm:text-sm px-4"
        >
          <p>© 2025 Mihai Lache. Built with React, Three.js, and attention to detail.</p>
        </motion.div>
      </div>
    </div>
  );
}