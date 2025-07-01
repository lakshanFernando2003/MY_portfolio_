"use client"
import NavBar from "./components/Navigation/NavBar";
import Hero from "./components/HeroSection/Heromain";
import About from "./components/About/about";
import Customecursor from "./cursor-effect/customecursor";
import ScrollProvider from "./hooks/ScrollContext";
// import Hbar from "./components/About/Hbar";
// import HorizontalBar from "./components/About/horizontalBar";
// import Contentoverlap from "./components/test/contentoverlap";
import Maintenance from "./components/test/maintanence";
import { siteConfig } from "./config";

export default function Home() {
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
      {/* <Contentoverlap /> */}

      {/* <Hbar /> */}
      {/* <HorizontalBar /> */}
      <Customecursor />
      </ScrollProvider>

    </>
  );
}
