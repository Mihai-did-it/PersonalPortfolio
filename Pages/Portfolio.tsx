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
  const containerRef = useRef(null);
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
      const sectionHeight = window.innerHeight;
      const currentSection = Math.round(scrollTop / sectionHeight);
      setActiveSection(currentSection);
    };

    container.addEventListener("scroll", handleScroll);
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
        }

        .portfolio-section {
          height: 100vh;
          width: 100%;
          scroll-snap-align: start;
          scroll-snap-stop: always;
          position: relative;
          overflow: hidden;
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
        <div className="portfolio-section">
          <HeroSection />
        </div>
        <div className="portfolio-section">
          <AboutSection />
        </div>
        <div className="portfolio-section">
          <ExperienceSection />
        </div>
        <div className="portfolio-section">
          <ProjectsSection />
        </div>
        <div className="portfolio-section">
          <ContactSection />
        </div>
      </div>
    </>
  );
}