import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContentOverlap() {
  const containerRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);


  useEffect(() => {
    // Safety check for SSR and refs
    // if (typeof window === 'undefined' || !section1Ref.current || !section2Ref.current) return;

    // Set up initial styles
    gsap.set(section2Ref.current, {
      position: 'absolute',
      top: '100%', // Start below viewport
      width: '100%',
      zIndex: 2, // Higher z-index to appear on top
    });

    // Create the scroll trigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=100%",
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
        markers: true,
      }
    });

    // Animate section 2 from bottom to top
    tl.to(section2Ref.current, {
      top: "0%", // End at top of viewport
      ease: "none",
    });

    return () => {
      // Clean up
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen">
      {/* First section - static */}
      {/* <motion.div
        ref={section1Ref}
        className="section1 flex flex-col h-screen w-screen text-center justify-center bg-amber-700"
        initial={{ opacity: 1 }}
      >
        <h1 className='text-8xl text-center justify-center flex'>section 1</h1>
      </motion.div> */}

      {/* Second section - will slide up */}
      <div
        ref={section2Ref}
        className="section2 flex flex-col h-screen w-screen text-center justify-center bg-blue-600"
        initial={{ opacity: 1 }}
      >
        <h1 className='text-8xl text-center justify-center flex'>section 2</h1>
      </div>
      {/* <motion.div
        ref={section3Ref}
        className="section1 flex flex-col h-screen w-screen text-center justify-center bg-indigo-700"
        initial={{ opacity: 1 }}
      >
        <h1 className='text-8xl text-center justify-center flex'>section 3</h1>
      </motion.div> */}
    </div>
  );
}
