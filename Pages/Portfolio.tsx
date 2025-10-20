"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroSection from "../Components/portfolio/HeroSection";
import AboutSection from "../Components/portfolio/AboutSection";
import ExperienceSection from "../Components/portfolio/ExperienceSection";
import ProjectsSection from "../Components/portfolio/ProjectsSection";
import ContactSection from "../Components/portfolio/ContactSection";
import ProgressBar from "../Components/portfolio/ProgressBar";
import ProgressDots from "../Components/portfolio/ProgressDots";
import TopNavigation from "../Components/portfolio/TopNavigation";

export default function Portfolio() {
  const containerRef = useRef<any>(null);
  const [activeSection, setActiveSection] = useState(0);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const sections = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" }
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const viewportHeight = window.innerHeight;
      
      // Get all section elements
      const sectionElements = container.querySelectorAll('.portfolio-section, .portfolio-section-scrollable');
      
      let currentSection = 0;
      let minDistance = Infinity;
      
      // Find which section's center is closest to the viewport center
      sectionElements.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        
        // Calculate the center of the section relative to viewport
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportHeight / 2;
        
        // Distance from section center to viewport center
        const distance = Math.abs(sectionCenter - viewportCenter);
        
        // If section is in view (at least partially)
        if (rect.top < viewportHeight && rect.bottom > 0) {
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = index;
          }
        }
      });
      
      setActiveSection(currentSection);
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateToSection = (index) => {
    const sectionHeight = window.innerHeight;
    containerRef.current?.scrollTo({
      top: sectionHeight * index,
      behavior: "smooth"
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          overflow: hidden;
          background: #0f172a;
          color: #f8fafc;
        }

        .portfolio-container {
          height: 100vh;
          overflow-y: scroll;
          scroll-snap-type: y mandatory;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: rgba(6, 182, 212, 0.3) transparent;
        }

        .portfolio-container::-webkit-scrollbar {
          width: 8px;
        }

        .portfolio-container::-webkit-scrollbar-track {
          background: transparent;
        }

        .portfolio-container::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.3);
          border-radius: 4px;
          transition: background 0.3s ease;
        }

        .portfolio-container::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.5);
        }

        .portfolio-section {
          height: 100vh;
          width: 100%;
          scroll-snap-align: start;
          scroll-snap-stop: always;
          position: relative;
          overflow: hidden;
          will-change: transform, opacity;
        }

        .portfolio-section-scrollable {
          min-height: 100vh;
          width: 100%;
          scroll-snap-align: start;
          position: relative;
          overflow: visible;
          will-change: transform, opacity;
        }

        .portfolio-section-scrollable::-webkit-scrollbar {
          width: 6px;
        }

        .portfolio-section-scrollable::-webkit-scrollbar-track {
          background: transparent;
        }

        .portfolio-section-scrollable::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.2);
          border-radius: 3px;
        }

        .portfolio-section-scrollable::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.4);
        }

        @media (prefers-reduced-motion: reduce) {
          .portfolio-container {
            scroll-snap-type: none;
            scroll-behavior: auto;
          }
        }

        :root {
          --primary: #06b6d4;
          --primary-light: #22d3ee;
          --primary-dark: #0891b2;
          --secondary: #14b8a6;
          --text-primary: #f8fafc;
          --text-secondary: #cbd5e1;
          --text-tertiary: #64748b;
          --surface: #1e293b;
          --background: #0f172a;
          --dark: #020617;
        }
      `}</style>

      <ProgressBar progress={scrollYProgress} />
      <TopNavigation 
        sections={sections}
        activeSection={activeSection}
        onNavigate={navigateToSection}
        scrollProgress={scrollYProgress}
      />
      <ProgressDots 
        sections={sections}
        activeSection={activeSection}
        onNavigate={navigateToSection}
      />

      <div ref={containerRef} className="portfolio-container">
        <motion.div 
          className="portfolio-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <HeroSection />
        </motion.div>
        <motion.div 
          className="portfolio-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <AboutSection />
        </motion.div>
        <motion.div 
          className="portfolio-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <ExperienceSection />
        </motion.div>
        <motion.div 
          className="portfolio-section-scrollable"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <ProjectsSection />
        </motion.div>
        <motion.div 
          className="portfolio-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <ContactSection />
        </motion.div>
      </div>
    </>
  );
}