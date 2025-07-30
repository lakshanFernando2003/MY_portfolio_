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
// import Skills from './components/Skills/Skills';
// import Hbar from "./components/About/Hbar";
// import HorizontalBar from "./components/About/horizontalBar";
// import Contentoverlap from "./components/test/contentoverlap";

import Maintenance from "./components/test/maintanence";
import { siteConfig } from "./config/config";

export default function Home() {
  const sectionStartRef = useRef(null);
  const sectionEndRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Disable scrolling while loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'hidden';
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
