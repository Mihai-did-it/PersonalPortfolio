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
import ResumeModal from "../Components/portfolio/ResumeModal";

export default function Portfolio() {
  const containerRef = useRef<any>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
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

    // Instant scroll to section - no smooth behavior
    const targetOffset = target.offsetTop;
    window.scrollTo({
      top: targetOffset,
      behavior: "auto"
    });
  };

  return (
    <>
      <ProgressBar progress={scrollYProgress} />
      <TopNavigation 
        sections={sections}
        activeSection={activeSection}
        onNavigate={navigateToSection}
        scrollProgress={scrollYProgress}
        onResumeClick={() => setIsResumeModalOpen(true)}
      />
      <ProgressDots 
        sections={sections}
        activeSection={activeSection}
        onNavigate={navigateToSection}
      />
      <ResumeModal 
        isOpen={isResumeModalOpen} 
        onClose={() => setIsResumeModalOpen(false)} 
      />

      <div ref={containerRef}>
        <section data-section="hero">
          <HeroSection onResumeClick={() => setIsResumeModalOpen(true)} />
        </section>
        
        <section data-section="about">
          <AboutSection />
        </section>
        
        <section data-section="experience">
          <ExperienceSection />
        </section>
        
        <section data-section="projects">
          <ProjectsSection />
        </section>
        
        <section data-section="contact">
          <ContactSection />
        </section>
      </div>
    </>
  );
}
