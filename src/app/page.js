"use client"
import { useRef, useState, useEffect } from 'react';
import NavBar from "./components/Navigation/NavBar";
import Hero from "./components/HeroSection/Heromain";
import About from "./components/About/about";
import { AboutBentoGrids } from "./components/About/AboutBentoGrids";
import ProjectSection from "./components/Projects/ProjectSection";
import RoadMap from './components/RoadMap/RoadMap';
import ContactMe from './components/ContactMe/ContactMe';
import Footer from './components/Footer/Footer';
import Loading from './components/Loading/Loading';
import Customecursor from "./cursor-effect/customecursor";
import ScrollProvider from "./hooks/ScrollContext";


import Maintenance from "./components/test/maintanence";
import { siteConfig } from "./config/config";

export default function Home() {
  const sectionStartRef = useRef(null);
  const sectionEndRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if on mobile/tablet
    const isSmallDevice = typeof window !== 'undefined' && window.matchMedia("(max-width: 1200px)").matches;

    if (isLoading) {
      // Always hide scrolling during loading
      document.body.style.overflow = 'hidden';
    } else {
      // After loading: auto for mobile/tablet, hidden for desktop
      document.body.style.overflow = isSmallDevice ? 'auto' : 'hidden';
    }

    return () => {
      // Reset based on device when component unmounts
      if (typeof window !== 'undefined') {
        const isSmallDevice = window.matchMedia("(max-width: 1200px)").matches;
        document.body.style.overflow = isSmallDevice ? 'auto' : 'hidden';
      }
    };
  }, [isLoading]);

  // Check if site is in maintenance mode
  if (siteConfig.maintenanceMode) {
    return <Maintenance />;
  }

  // Regular website content
  return (
    <>
      {isLoading ? (
        <Loading onLoadingComplete={() => setIsLoading(false)} />
      ) : (
        <ScrollProvider>
          <NavBar/>
          <div id="hero">
            <Hero />
          </div>
          <div id="about">
            <About />
            <AboutBentoGrids />
          </div>
          <div id="projects">
            <ProjectSection />
          </div>
          <div id="roadmap">
            <RoadMap />
          </div>
          <div id="contactMe">
            <ContactMe />
          </div>
          <div>
            <Footer />
          </div>
          {/* <Skills /> */}
          <Customecursor />
        </ScrollProvider>
      )}
    </>
  );
}
