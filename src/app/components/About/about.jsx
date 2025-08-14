"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import gsap from "gsap";

export default function About() {
  // OPTIMIZATION: Track if component should start animating
  const [shouldAnimate, setShouldAnimate] = useState(false);
  // OPTIMIZATION: Track if content should be visible at all
  const [contentVisible, setContentVisible] = useState(false);
  // Track if screen height is greater than 911px
  const [isTallScreen, setIsTallScreen] = useState(false);

  // OPTIMIZATION: Create refs for animation targets
  const aboutContainerRef = useRef(null);
  const headingRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const taglineRef = useRef(null);
  const ctaRef = useRef(null);

  // Add effect to check screen height
  useEffect(() => {
    // Function to check and update screen height state
    const checkScreenHeight = () => {
      setIsTallScreen(window.innerHeight > 910);
    };

    // Check on initial render
    checkScreenHeight();

    // Add event listener for resize
    window.addEventListener('resize', checkScreenHeight);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenHeight);
  }, []);

  // OPTIMIZATION: Use Framer Motion's useInView to detect when section is visible
  const isInView = useInView(aboutContainerRef, {
    once: true,
    margin: "0px 0px 0px 0px" // Start animation before fully in view
  });

  // OPTIMIZATION: Make content visible when in view, before animation starts
  useEffect(() => {
    if (!isInView) return;

    // First make content visible but with opacity 0
    setContentVisible(true);

    // Then after a delay, start the animation
    const timer = setTimeout(() => {
      setShouldAnimate(true);
    }, 100); // 100ms delay

    return () => clearTimeout(timer);
  }, [isInView]);

  // OPTIMIZATION: Run GSAP animations when ready
  useEffect(() => {
    if (!shouldAnimate) return;

    // Elements should already be hidden via CSS, but ensure it with GSAP too
    gsap.set([headingRef.current, titleRef.current, paragraphRef.current, taglineRef.current, ctaRef.current], {
      opacity: 0,
      y: 20
    });

    // Create animation timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }});

    // Animate elements in sequence with staggered effect
    tl.to(headingRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
    })
    .to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      delay: 0.1
    })
    .to(paragraphRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
    })
    .to([taglineRef.current, ctaRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.2
    });

  }, [shouldAnimate]);

  return (
    <div className={`About-card flex items-center justify-center w-full  overflow-hidden ${
      isTallScreen ? 'transform -translate-y-[7rem] h-[88vh] ' : 'h-[100vh]'
    }`}>
      {/* OPTIMIZATION: Added ref for viewport detection */}
      <div ref={aboutContainerRef} className="About-container relative flex items-center justify-center w-1/2">
        {/* OPTIMIZATION: Only render content when it should be visible */}
        {contentVisible && (
          <div className="text-center p-8 h-95 w-2xl">
            {/* OPTIMIZATION: Added refs for GSAP animations and initial hidden state */}
            <h3
              ref={headingRef}
              className="z-50 bg-gradient-to-r from-[#AAFFFF] via-[#0099FF] to-[#0066CC] text-transparent bg-clip-text inline-block font-semibold antialiased tracking-wide font-mono text-[1rem] [-webkit-text-stroke:_0.3px_#0099FF80] [filter:_drop-shadow(0_0_1px_#AAFFFF40)_drop-shadow(0_0_1px_#0066CC40)] opacity-0"
            >
              About Me
            </h3>

            <div className="pt-3 flex flex-col items-center gap-3">
              {/* OPTIMIZATION: Added refs for GSAP animations and initial hidden state */}
              <h1
                ref={titleRef}
                className="text-4xl font-semibold opacity-0"
              >
                Hi There!
              </h1>

              <p
                ref={paragraphRef}
                className="text-[1.15rem] opacity-0"
              >
                I'm <span className="font-semibold">Lakshan Fernando</span>, a versatile Software Engineer with expertise in both Full Stack and DevOps engineering. I thrive on building end-to-end solutions that deliver exceptional user experiences while maintaining robust backend architecture. My ability to quickly adapt to new technologies and programming languages keeps me at the cutting edge of the industry.
              </p>

              <span
                ref={taglineRef}
                className="text-xs pt-5 text-gray-400 opacity-0"
              >
                Want to know more about me!
              </span>

              <p
                ref={ctaRef}
                className="text-[0.9rem] opacity-0"
              >
                Let's Connect | Code
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
