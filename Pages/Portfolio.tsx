"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
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
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.style.scrollSnapType = isMobile ? "y mandatory" : "y proximity";
  }, [isMobile]);

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
    const container = containerRef.current;
    if (!container) return;

    // Only use scroll-snap manipulation on desktop
    if (!isMobile) {
      const sections = container.querySelectorAll('.portfolio-section, .portfolio-section-scrollable');
      const target = sections[index] as HTMLElement | undefined;
      if (!target) return;

      // Temporarily disable scroll-snap to prevent snap-back effect
      container.style.scrollSnapType = "none";

      const targetOffset = target.offsetTop - container.offsetTop;
      container.scrollTo({
        top: targetOffset,
        behavior: "smooth"
      });

      // Re-enable scroll-snap after animation completes
      setTimeout(() => {
        if (container) {
          container.style.scrollSnapType = "y proximity";
        }
      }, 1000);
    } else {
      // On mobile, just scroll to the section without snap manipulation
      const sections = container.querySelectorAll('.portfolio-section, .portfolio-section-scrollable');
      if (sections[index]) {
        sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <>
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
          data-section="hero"
          className="portfolio-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <HeroSection />
        </motion.div>
        
        <motion.div 
          data-section="about"
          className="portfolio-section-scrollable"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <AboutSection />
        </motion.div>
        
        <motion.div 
          data-section="experience"
          className="portfolio-section-scrollable"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <ExperienceSection />
        </motion.div>
        
        <motion.div 
          data-section="projects"
          className="portfolio-section-scrollable"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <ProjectsSection />
        </motion.div>
        
        <motion.div 
          data-section="contact"
          className="portfolio-section-scrollable"
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
