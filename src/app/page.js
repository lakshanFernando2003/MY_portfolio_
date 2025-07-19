"use client"
import { useRef } from 'react';
import NavBar from "./components/Navigation/NavBar";
import Hero from "./components/HeroSection/Heromain";
import About from "./components/About/about";
import { AboutBentoGrids } from "./components/About/AboutBentoGrids";
import ProjectSection from "./components/Projects/ProjectSection";
import Skills from './components/Skills/Skills';
import RoadMap from './components/RoadMap/RoadMap';



import Customecursor from "./cursor-effect/customecursor";
import ScrollProvider from "./hooks/ScrollContext";
// import Hbar from "./components/About/Hbar";
// import HorizontalBar from "./components/About/horizontalBar";
// import Contentoverlap from "./components/test/contentoverlap";

import Maintenance from "./components/test/maintanence";
import { siteConfig } from "./config/config";

export default function Home() {

  const sectionStartRef = useRef(null);
  const sectionEndRef = useRef(null);

  // Check if site is in maintenance mode
  if (siteConfig.maintenanceMode) {
    return <Maintenance />;
  }

  // Regular website content
  return (
    <>
      <ScrollProvider>
      <NavBar/>
      <Hero />
      <About />
      <AboutBentoGrids />
      <ProjectSection />
      <RoadMap />
      {/* <Skills /> */}






      {/* <Hbar />
      {/* <HorizontalBar /> */}
      <Customecursor />
      </ScrollProvider>

    </>
  );
}
