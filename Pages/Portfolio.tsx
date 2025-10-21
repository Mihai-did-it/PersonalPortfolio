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
  const { scrollYProgress } = useScroll();

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sections = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight;
      
      // Get all section elements
      const sectionElements = document.querySelectorAll('[data-section]');
      
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

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateToSection = (index) => {
    const sectionElements = document.querySelectorAll('[data-section]');
    const target = sectionElements[index] as HTMLElement | undefined;
    if (!target) return;

    if (!isMobile) {
      // Desktop: Use scroll snap with smooth scrolling
      const targetOffset = target.offsetTop;
      window.scrollTo({
        top: targetOffset,
        behavior: "smooth"
      });
    } else {
      // Mobile: Simple smooth scroll, no snap
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        <div 
          data-section="hero"
          className="portfolio-section"
        >
          <HeroSection />
        </div>
        
        <div 
          data-section="about"
          className="portfolio-section-scrollable"
        >
          <AboutSection />
        </div>
        
        <div 
          data-section="experience"
          className="portfolio-section-scrollable"
        >
          <ExperienceSection />
        </div>
        
        <div 
          data-section="projects"
          className="portfolio-section-scrollable"
        >
          <ProjectsSection />
        </div>
        
        <div 
          data-section="contact"
          className="portfolio-section-scrollable"
        >
          <ContactSection />
        </div>
      </div>
    </>
  );
}
