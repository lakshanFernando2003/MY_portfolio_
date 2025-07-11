import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// This component creates a horizontal bar that scrolls horizontally across the screen
// It uses GSAP for animation and transforms to create a smooth scrolling effect

export default function Hbar() {
  const containerRef = useRef(null);
  const horizontalBarRef = useRef(null);

  useEffect(() => {
    // Create ScrollTrigger instance
    ScrollTrigger.create({
      trigger: containerRef.current,
      end: "+=900vh",
      scrub: 1,
      pin: true,
      markers: true,
      onUpdate: (self) => {
        gsap.to(".horizontalBar", {
          x: `${-350 * self.progress}vw`,
          duration: 1.5,
          ease: "power3.out",
        });
      },
    });

    // Cleanup function to kill ScrollTrigger on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="border-2 w-full ">
      <div ref={horizontalBarRef} className='horizontalBar absolute w-[400vw] h-[100vh] '>
        <h1 className='font-anton w-full text-[48vw] text-center'>Whats More About Me</h1>
      </div>
    </div>
  );
}
