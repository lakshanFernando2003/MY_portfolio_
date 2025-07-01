"use client"
import NavBar from "./components/Navigation/NavBar";
import Hero from "./components/HeroSection/Heromain";
import About from "./components/About/about";
import Customecursor from "./cursor-effect/customecursor";
import ScrollProvider from "./hooks/ScrollContext";
// import Hbar from "./components/About/Hbar";
// import HorizontalBar from "./components/About/horizontalBar";
// import Contentoverlap from "./components/test/contentoverlap";


export default function Home() {
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
