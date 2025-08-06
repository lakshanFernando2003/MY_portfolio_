import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import '../MediaQuery/largeScreen.css';
import "../MediaQuery/SmallScreen.css"

// Simple component for mobile screens
function SimpleMobileText() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    // Simple fade-in animation
    gsap.fromTo(containerRef.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 1.2, ease: 'power2.inOut' }
    );

    return () => {
      gsap.killTweensOf(containerRef.current);
    };
  }, []);

  return (
    <div className='pointer-events-none'>
      <div
        ref={containerRef}
        className='flex items-center justify-center bg-transparent pr-6 pl-5'
      >
        <h1 className='Hero-text-main font-anton tracking-tight antialiased text-shadow-sm [text-shadow:_0_0_1px_rgba(255,255,255,0.6)] [-webkit-text-stroke:_1px_rgba(255,255,255,0.6)]'>
          PORTFOLIO
        </h1>
      </div>
    </div>
  );
}

// Complex animation component for desktop screens
function ComplexDesktopAnimation() {
  const containerRef = useRef(null);
  const primaryTextRef = useRef(null);
  const LeftTextRef = useRef(null);
  const CenterTextRef = useRef(null);
  const RightTextRef = useRef(null);
  const outlinedLeftTextRef = useRef(null);
  const outlinedCenterTextRef = useRef(null);
  const outlinedCenterLetterRef = useRef(null);
  const outlinedRightTextRef = useRef(null);
  const outlinedTextsRef = useRef([]);
  const [isInitialAnimationComplete, setIsInitialAnimationComplete] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initial hidden state and content loading
  useEffect(() => {
    if(typeof window === 'undefined') return;

    // hide the container initially
    if (containerRef.current) {
      gsap.set(containerRef.current, {autoAlpha: 0});
    }

    // timeout function to load content
    const Timer = setTimeout(() => {
      setIsLoaded(true);

      // show container after timeout
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          autoAlpha: 1,
          duration: 2,
          ease: 'power1.in'
        });
      }
    }, 100); // timeout seconds

    return () => clearTimeout(Timer);
  }, []);

  // Initial animation sequence
  useEffect(() => {
    if (!isLoaded || typeof window === 'undefined') return;

    const timeline = gsap.timeline({
      onComplete: () => setIsInitialAnimationComplete(true),
    });

    // Initial step - elements are hidden
    gsap.set(primaryTextRef.current, { autoAlpha: 0 });
    gsap.set([LeftTextRef.current, CenterTextRef.current, RightTextRef.current], { autoAlpha: 0 });
    gsap.set([outlinedLeftTextRef.current, outlinedCenterTextRef.current, outlinedRightTextRef.current], { autoAlpha: 0 });

    // Animation sequence

    // 1. Enhanced primary Text entrance with scale and easing
    timeline.fromTo(primaryTextRef.current,
      { autoAlpha: 0, y: -10, scale: 0.1 }, // Start hidden and below
      { autoAlpha: 1, y: 0, scale: 1, duration: 1.5, ease: 'power3.out' } // Fade in and move to position
    );

    // 2. Short pause with subtle pulse effect
    timeline.to(primaryTextRef.current, {
      scale: 1, // Scale up
      duration: 0.4,
      ease: 'power1.inOut',
    });

    timeline.to(primaryTextRef.current, {
      scale: 1, // Scale up
      duration: 0.4,
      ease: 'power1.inOut',
    });

    // 3. Hide primary Text, show split parts
    timeline.to(primaryTextRef.current, {
      autoAlpha: 0,
      duration: 0.4,
    });

    timeline.to([LeftTextRef.current, CenterTextRef.current, RightTextRef.current], {
      autoAlpha: 1,
      duration: 0.4
    }, "-=.5");

    // 4. Move split parts to their positions while fading them out
    timeline.to(LeftTextRef.current, {
      x: "-30vw", // Far left
      autoAlpha: 0,
      duration: 1.5,
      ease: 'power2.inOut'
    }, "split");

    timeline.to(CenterTextRef.current, {
      x: "3rem", // Center
      duration: 1.2,
      ease: "power2.inOut",
      autoAlpha: 0
    }, "split+=0.2");

    timeline.to(RightTextRef.current, {
      x: "30vw", // Far right
      duration: 1.2,
      ease: "power2.inOut",
      autoAlpha: 0
    }, "split");

    // 5. Show outlined versions of split text with staggered timing
    timeline.to(outlinedLeftTextRef.current, {
      autoAlpha: 1,
      duration: 0.6,
      ease: "power2.inOut"
    }, "split+=0.3");

    timeline.to(outlinedCenterTextRef.current, {
      autoAlpha: 1,
      duration: 0.6,
      ease: "power2.inOut"
    }, "split+=0.5");

    timeline.to(outlinedRightTextRef.current, {
      autoAlpha: 1,
      duration: 0.6,
      ease: "power2.inOut"
    }, "split+=0.3");

    timeline.fromTo(outlinedLeftTextRef.current,
      {scale: 1},
      {scale: 0.9, duration: 0.4, ease: "power3.inOut"},
      "split+=0.5"
    );

    timeline.fromTo(outlinedRightTextRef.current,
      {scale: 1},
      {scale: 0.9, duration: 0.4, ease: "power3.inOut"},
      "split+=0.5"
    );

    // Store all outlined text refs in a collection for scroll animation
    outlinedTextsRef.current = [outlinedLeftTextRef.current, outlinedCenterLetterRef.current, outlinedRightTextRef.current];

    return () => timeline.kill();
  }, [isLoaded]);

  // Scroll-based fade animation
  useEffect(() => {
    if(!isInitialAnimationComplete || typeof window === 'undefined') return;

    let scrollY = window.scrollY; // Fixed typo: Window -> window
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Find scroll Direction
          const ScrollingDown = currentScrollY > scrollY;

          // Get container position for visibility checks
          const containerRect = containerRef.current?.getBoundingClientRect();
          const isVisible = containerRect && containerRect.bottom > 0 && containerRect.top < window.innerHeight;

          // Only animate if the container is visible
          if (isVisible) {
            const scrollDistance = Math.abs(currentScrollY - scrollY);
            const opacityChange = Math.min(scrollDistance / 100, 0.2);

            outlinedTextsRef.current.forEach(element => {
              if (!element) return;

              const currentOpacity = gsap.getProperty(element, "opacity");
              let newOpacity;

              if (ScrollingDown) {
                // Fade out on scroll down
                newOpacity = Math.max(currentOpacity - opacityChange, 0);
              } else {
                newOpacity = Math.min(1, currentOpacity + opacityChange);
              }

              gsap.set(element, {
                autoAlpha: newOpacity,
                duration: 0.3,
                ease: "power2.inOut"
              });
            });
          }

          scrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isInitialAnimationComplete]);

  return (
    <div className='pointer-events-none'>
      <div className='relative flex items-center justify-center w-full bg-transparent opacity-0 pointer-events-none'
        ref={containerRef}
        style={{ visibility: 'hidden' }}
      >
        {/* Layer for the full text */}
        <div className='flex items-center justify-center bg-transparent pr-6 pl-5'>
          <h1
            ref={primaryTextRef}
            className='Hero-text-main font-anton tracking-tight antialiased text-shadow-sm [text-shadow:_0_0_1px_rgba(255,255,255,0.6)] [-webkit-text-stroke:_1px_rgba(255,255,255,0.6)] opacity-0'
            style={{ visibility: 'hidden' }}
          >
            PORTFOLIO
          </h1>
        </div>

        {/* Layer for split text parts - these will animate and disappear */}
        <div className='absolute inset-0 flex justify-center items-center z-20'>
          <h1
            ref={LeftTextRef}
            className='Hero-text-main font-anton tracking-tight antialiased text-shadow-sm [text-shadow:_0_0_1px_rgba(255,255,255,0.6)] [-webkit-text-stroke:_1px_rgba(255,255,255,0.6)] opacity-0'
            style={{ visibility: 'hidden' }}
          >
            PORT
          </h1>
          <h1
            ref={CenterTextRef}
            className='Hero-text-main font-anton tracking-tight antialiased text-shadow-sm [text-shadow:_0_0_1px_rgba(255,255,255,0.6)] [-webkit-text-stroke:_1px_rgba(255,255,255,0.6)] opacity-0'
            style={{ visibility: 'hidden' }}
          >
            F
          </h1>
          <h1
            ref={RightTextRef}
            className='Hero-text-main font-anton tracking-tight antialiased text-shadow-sm [text-shadow:_0_0_1px_rgba(255,255,255,0.6)] [-webkit-text-stroke:_1px_rgba(255,255,255,0.6)] opacity-0'
            style={{ visibility: 'hidden' }}
          >
            OLIO
          </h1>
        </div>

        {/* Layer for outlined versions of split parts - these will be revealed and remain */}
        <div className='absolute inset-0 flex justify-between items-center z-60 px-8'>
          <div className='flex flex-1 justify-start'>
            <h1
              ref={outlinedLeftTextRef}
              className='Hero-text-main font-anton tracking-tight antialiased text-shadow-sm text-transparent [-webkit-text-stroke:_2px_rgba(128,128,128,0.6)] opacity-0'
              style={{ visibility: 'hidden' }}
            >
              PORT
            </h1>
          </div>

          <div className='flex flex-1 justify-center'>
            <h1
              ref={outlinedCenterTextRef}
              className='Hero-text-main font-anton tracking-tight antialiased text-shadow-sm [text-shadow:_0_0_1px_rgba(255,255,255,0.6)] [-webkit-text-stroke:_1px_rgba(255,255,255,0.6)] opacity-0'
              style={{ visibility: 'hidden' }}
            >
              INTER
              <span
                ref={outlinedCenterLetterRef}
                className='Hero-text-main font-anton tracking-tight antialiased text-shadow-sm text-transparent [-webkit-text-stroke:_2px_rgba(128,128,128,0.6)]'
              >
                F
              </span>
              ACE
            </h1>
          </div>

          <div className='flex flex-1 justify-end'>
            <h1
              ref={outlinedRightTextRef}
              className='Hero-text-main font-anton tracking-tight antialiased text-shadow-sm text-transparent [-webkit-text-stroke:_2px_rgba(128,128,128,0.6)] opacity-0'
              style={{ visibility: 'hidden' }}
            >
              OLIO
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component with responsive logic
export default function HeroText() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check initial screen size
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial state
    checkScreenSize();

    // Add resize listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Render different components based on screen size
  return isMobile ? <SimpleMobileText /> : <ComplexDesktopAnimation />;
}

// Main component with responsive logic
// export default function HeroText() {
//   const [isMobile, setIsMobile] = useState(false);
//   const [debugInfo, setDebugInfo] = useState({
//     initialWidth: 0,
//     currentWidth: 0,
//     isMobileView: false,
//     lastChecked: null
//   });

//   useEffect(() => {
//     if (typeof window === 'undefined') return;

//     // Check initial screen size
//     const checkScreenSize = () => {
//       const currentWidth = window.innerWidth;
//       const newIsMobile = currentWidth < 768;

//       // Update state
//       setIsMobile(newIsMobile);

//       // Update debug info
//       setDebugInfo(prev => ({
//         initialWidth: prev.initialWidth || currentWidth,
//         currentWidth: currentWidth,
//         isMobileView: newIsMobile,
//         lastChecked: new Date().toLocaleTimeString()
//       }));

//       console.log(`[Screen Debug] Width: ${currentWidth}px, Mobile view: ${newIsMobile}`);
//     };

//     // Set initial state
//     checkScreenSize();

//     // Add resize listener
//     window.addEventListener('resize', checkScreenSize);

//     // Cleanup
//     return () => window.removeEventListener('resize', checkScreenSize);
//   }, []);

//   return (
//     <>
//       {/* Debug panel - only visible during development */}
//       {process.env.NODE_ENV !== 'production' && (
//         <div className="fixed top-0 right-0 bg-black bg-opacity-70 text-white p-2 z-50 text-xs">
//           <div>Initial width: {debugInfo.initialWidth}px</div>
//           <div>Current width: {debugInfo.currentWidth}px</div>
//           <div>Mobile view: {debugInfo.isMobileView ? 'Yes' : 'No'}</div>
//           <div>Using: {isMobile ? 'SimpleMobileText' : 'ComplexDesktopAnimation'}</div>
//           <div>Last check: {debugInfo.lastChecked}</div>
//           <div className="mt-1 flex gap-2">
//             <button
//               onClick={() => setIsMobile(true)}
//               className="px-1 bg-blue-600 rounded"
//             >
//               Force Mobile
//             </button>
//             <button
//               onClick={() => setIsMobile(false)}
//               className="px-1 bg-green-600 rounded"
//             >
//               Force Desktop
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Component identifier labels */}
//       <div className="absolute top-20 left-0 z-50 bg-black bg-opacity-50 text-white px-2 py-1 text-sm">
//         {isMobile ? '📱 Mobile Component' : '🖥️ Desktop Component'}
//       </div>

//       {/* Render different components based on screen size */}
//       {isMobile ? <SimpleMobileText /> : <ComplexDesktopAnimation />}
//     </>
//   );
// }
