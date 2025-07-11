import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function TextMove() {
  const containerRef = useRef(null);
  const fullTextRef = useRef(null);
  const porRef = useRef(null);
  const tfoRef = useRef(null);
  const lioRef = useRef(null);
  const outlinedPorRef = useRef(null);
  const outlinedTfoRef = useRef(null);
  const outlinedLioRef = useRef(null);
  const outlinedTextsRef = useRef([]);
  const [isInitialAnimationComplete, setIsInitialAnimationComplete] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initial hidden state and content loading
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Hide container initially
    if (containerRef.current) {
      gsap.set(containerRef.current, { autoAlpha: 0 });
    }

    // Simulate content loading (fonts, etc.)
    const timer = setTimeout(() => {
      setIsLoaded(true);

      // Show container after loading
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          autoAlpha: 1,
          duration: 0.5,
          ease: "power1.out"
        });
      }
    }, 100); // Short timeout to ensure DOM is ready

    return () => clearTimeout(timer);
  }, []);

  // Initial animation sequence
  useEffect(() => {
    if (!isLoaded || typeof window === 'undefined') return;

    const tl = gsap.timeline({
      onComplete: () => setIsInitialAnimationComplete(true)
    });

    // Initial setup - ensure elements are hidden
    gsap.set(fullTextRef.current, { autoAlpha: 0 });
    gsap.set([porRef.current, tfoRef.current, lioRef.current], { autoAlpha: 0 });
    gsap.set([outlinedPorRef.current, outlinedTfoRef.current, outlinedLioRef.current], { autoAlpha: 0 });

    // Animation sequence
    // 1. Enhanced full text entrance with scale and easing
    tl.fromTo(fullTextRef.current,
      { autoAlpha: 0, y: 30, scale: 0.95 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 1.5, ease: "power3.out" }
    );

    // 2. Short pause with subtle pulse effect
    tl.to(fullTextRef.current, {
      scale: 1,
      duration: 0.4,
      ease: "power1.inOut"
    });

    tl.to(fullTextRef.current, {
      scale: 1,
      duration: 0.4,
      ease: "power1.inOut"
    });

    // 3. Hide full text, show split parts
    tl.to(fullTextRef.current, {
      autoAlpha: 0,
      duration: 0.4
    });

    tl.to([porRef.current, tfoRef.current, lioRef.current], {
      autoAlpha: 1,
      duration: 0.4
    }, "-=0.2");

    // 4. Move split parts to their positions while fading them out
    tl.to(porRef.current, {
      x: "-30vw", // Far left
      duration: 1.2,
      ease: "power2.inOut",
      autoAlpha: 0
    }, "split");

    tl.to(tfoRef.current, {
      x: "0vw", // Center
      duration: 1.2,
      ease: "power2.inOut",
      autoAlpha: 0
    } , "split+=0.2");

    tl.to(lioRef.current, {
      x: "30vw", // Far right
      duration: 1.2,
      ease: "power2.inOut",
      autoAlpha: 0
    }, "split");

    // 5. Show outlined versions of split text with staggered timing
    tl.to(outlinedPorRef.current, {
      autoAlpha: 1,
      duration: 0.6,
      ease: "power2.inOut"
    }, "split+=0.3");

    tl.to(outlinedTfoRef.current, {
      autoAlpha: 1,
      duration: 0.6,
      ease: "power2.inOut"
    }, "split+=0.2");

    tl.to(outlinedLioRef.current, {
      autoAlpha: 1,
      duration: 0.6,
      ease: "power2.inOut"
    }, "split+=0.3");

    // Store all outlined text refs in a collection for scroll animation
    outlinedTextsRef.current = [outlinedPorRef.current, outlinedTfoRef.current, outlinedLioRef.current];

    return () => tl.kill();
  }, [isLoaded]); // Now depends on isLoaded state

  // Scroll-based fade animation
  useEffect(() => {
    if (!isInitialAnimationComplete || typeof window === 'undefined') return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Determine scroll direction
          const scrollingDown = currentScrollY > lastScrollY;

          // Get container position for visibility checks
          const containerRect = containerRef.current?.getBoundingClientRect();
          const isVisible = containerRect &&
            containerRect.bottom > 0 &&
            containerRect.top < window.innerHeight;

          // Only animate if the container is visible
          if (isVisible) {
            // Calculate opacity based on scroll position
            // When scrolling down, fade out (opacity towards 0)
            // When scrolling up, fade in (opacity towards 1)
            const scrollDistance = Math.abs(currentScrollY - lastScrollY);
            const opacityChange = Math.min(scrollDistance / 100, 0.2);

            outlinedTextsRef.current.forEach(element => {
              if (!element) return;

              const currentOpacity = gsap.getProperty(element, "opacity");
              let newOpacity;

              if (scrollingDown) {
                newOpacity = Math.max(0, currentOpacity - opacityChange);
              } else {
                newOpacity = Math.min(1, currentOpacity + opacityChange);
              }

              gsap.to(element, {
                opacity: newOpacity,
                duration: 0.3,
                ease: "power2.out"
              });
            });
          }

          lastScrollY = currentScrollY;
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
    <div
      className='relative flex flex-col items-center justify-center h-[22rem] bg-transparent opacity-0'
      ref={containerRef}
      style={{ visibility: 'hidden' }} // Initial hidden state via inline style as well
    >
      {/* Layer for the full text */}
      <div className='absolute inset-0 flex justify-center items-center z-10 '>
        <h1
          ref={fullTextRef}
          className='Hero-text-main font-anton tracking-tight antialiased text-shadow-sm [text-shadow:_0_0_1px_rgba(255,255,255,0.6)] [-webkit-text-stroke:_1px_rgba(255,255,255,0.6)] opacity-0'
          style={{ visibility: 'hidden' }}
        >
          PORTFOLIO
        </h1>
      </div>

      {/* Layer for split text parts - these will animate and disappear */}
      <div className='absolute inset-0 flex justify-center items-center z-20  '>
        <h1
          ref={porRef}
          className='Hero-text-main font-anton tracking-tight antialiased text-shadow-sm [text-shadow:_0_0_1px_rgba(255,255,255,0.6)] [-webkit-text-stroke:_1px_rgba(255,255,255,0.6)] opacity-0'
          style={{ visibility: 'hidden' }}
        >
          POR
        </h1>
        <h1
          ref={tfoRef}
          className='Hero-text-main font-anton tracking-tight antialiased text-shadow-sm [text-shadow:_0_0_1px_rgba(255,255,255,0.6)] [-webkit-text-stroke:_1px_rgba(255,255,255,0.6)] opacity-0'
          style={{ visibility: 'hidden' }}
        >
          TFO
        </h1>
        <h1
          ref={lioRef}
          className='Hero-text-main font-anton tracking-tight antialiased text-shadow-sm [text-shadow:_0_0_1px_rgba(255,255,255,0.6)] [-webkit-text-stroke:_1px_rgba(255,255,255,0.6)] opacity-0'
          style={{ visibility: 'hidden' }}
        >
          LIO
        </h1>
      </div>

      {/* Layer for outlined versions of split parts - these will be revealed and remain */}
      <div className='absolute inset-0 flex justify-between items-center z-60 px-8 '>
        <div className='flex-1 flex justify-start'>
          <h1
            ref={outlinedPorRef}
            className='text-[8rem] md:text-[12rem] lg:text-[15rem] font-anton tracking-tight antialiased text-shadow-sm text-transparent [-webkit-text-stroke:_2px_rgba(128,128,128,0.6)] opacity-0'
            style={{ visibility: 'hidden' }}
          >
            POR
          </h1>
        </div>
        <div className='flex-1 flex justify-center '>
          <h1
            ref={outlinedTfoRef}
            className='text-[8rem] md:text-[12rem] lg:text-[15rem] font-anton tracking-tight antialiased text-shadow-sm text-transparent [-webkit-text-stroke:_2px_rgba(128,128,128,0.6)] opacity-0'
            style={{ visibility: 'hidden' }}
          >
            TFO
          </h1>
        </div>
        <div className='flex-1 flex justify-end'>
          <h1
            ref={outlinedLioRef}
            className='text-[8rem] md:text-[12rem] lg:text-[15rem] font-anton tracking-tight antialiased text-shadow-sm text-transparent [-webkit-text-stroke:_2px_rgba(128,128,128,0.6)] opacity-0'
            style={{ visibility: 'hidden' }}
          >
            LIO
          </h1>
        </div>
      </div>
    </div>
  );
}
