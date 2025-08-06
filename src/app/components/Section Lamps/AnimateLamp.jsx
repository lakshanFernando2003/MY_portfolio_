import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AnimateLamp({
    // Light customization
    lightClassName = '',
    lightHeight = '15rem',
    lightWidth = '71rem',
    // lightWidth = '30rem',
    lightColor = 'rgb(128, 0, 255)',
    lightOpacity = 0.35,
    lightScale = 100,
    lightBlur = '',
    lightGradient = "radial-gradient(circle,rgba(128, 0, 255, 1) 0%, rgba(128, 0, 255, 0.17) 100%)",

    // Beam customization
    beamHeight = '47px',
    beamWidth = '47rem',
    beamTranslateY = '0rem',
    beamClassName = '',
    beamGradient = "linear-gradient(90deg,rgba(128, 0, 255, 0) 0%, rgba(128, 0, 255, 0.4) 15%, rgba(128, 0, 255, 0.65) 30%, rgba(128, 0, 255, 0.8) 40%, rgba(128, 0, 255, 1) 50%, rgba(128, 0, 255, 0.8) 60%, rgba(128, 0, 255, 0.65) 70%, rgba(128, 0, 255, 0.4) 85%, rgba(128, 0, 255, 0) 100%)",

    // Other customization
    containerPosition = '',
    className = '',

    // Scroll animation props
    enableStickyEffect = false,
    stickyOffset = -80, // Offset from top of viewport when sticky
    endTarget = null, // External ref for ending the sticky effect
    stickyDuration = "100%", // How long the sticky effect should last
  }
) {
  const containerRef = useRef(null);
  const staticLampRef = useRef(null);
  const fixedLampRef = useRef(null);
  const beamRef = useRef(null);
  const endTargetRef = useRef(null);
  const [fixedLampPosition, setFixedLampPosition] = useState({ left: '50%', marginLeft: '0px' });

  // Calculate proper horizontal centering for the fixed lamp
  useEffect(() => {
    if (!enableStickyEffect || typeof window === 'undefined') return;

    const calculatePosition = () => {
      // Get numeric width value without units
      const numericWidth = parseInt(lightWidth);
      const unit = lightWidth.replace(/[0-9]/g, '').replace('.', '');

      // Center the lamp
      setFixedLampPosition({
        left: '50%',
        marginLeft: `-${numericWidth / 2}${unit}`
      });
    };

    // Calculate initially and on window resize
    calculatePosition();
    window.addEventListener('resize', calculatePosition);

    // Clean up
    return () => window.removeEventListener('resize', calculatePosition);
  }, [enableStickyEffect, lightWidth]);

  useEffect(() => {
    // Skip if sticky effect is not enabled or not in browser
    if (!enableStickyEffect || typeof window === 'undefined') return;

    // Use either external endTarget ref or internal ref
    const targetElement = endTarget ? endTarget.current : endTargetRef.current;

    if (!fixedLampRef.current || !beamRef.current || !containerRef.current) return;

    // Set initial state for fixed lamp
    gsap.set(fixedLampRef.current, {
      opacity: 0,
      scale: 1
    });

    // Create the ScrollTrigger for the beam element
    const beamTrigger = ScrollTrigger.create({
      trigger: beamRef.current,
      start: "top top",
      endTrigger: targetElement || containerRef.current,
      end: "bottom top",
      markers: false, // Set to false in production

      onEnter: () => {
        // When beam reaches top of viewport when scrolling down
        gsap.to(fixedLampRef.current, {
          opacity: lightOpacity,
          duration: 0.2,
          ease: "power2.inOut"
        });
      },

      onLeaveBack: () => {
        // When scrolling back up and beam is no longer at top
        gsap.to(fixedLampRef.current, {
          opacity: 0,
          scale: 0.98,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set(fixedLampRef.current, { scale: 1 });
          }
        });
      },

      onLeave: () => {
        // Fade out when scrolling past end target
        gsap.to(fixedLampRef.current, {
          opacity: 0,
          scale: 0.97,
          duration: 0.2,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set(fixedLampRef.current, { scale: 1 });
          }
        });
      },

      onEnterBack: () => {
        // When scrolling back up into the section
        gsap.to(fixedLampRef.current, {
          opacity: lightOpacity,
          scale: 1,
          duration: 0.5,
          ease: "power2.inOut"
        });
      }
    });

    // Clean up
    return () => {
      beamTrigger.kill();
    };
  }, [enableStickyEffect, endTarget, stickyOffset, stickyDuration, lightOpacity]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center
       overflow-visible w-full rounded-md z-0 bg-transparent ${className}`}
    >
      <div
        className={`relative flex w-full flex-1 ${containerPosition} items-center
       justify-center isolate z-0`}
      >
        {/* Static lamp light (always visible when in view) */}
        <div
          ref={staticLampRef}
          className={`absolute inset-auto z-50 rounded-[90%] blur-[48px] ${lightClassName}`}
          style={{
            height: lightHeight,
            width: lightWidth,
            backgroundColor: lightColor,
            opacity: lightOpacity,
            transform: `scale(${lightScale/100})`,
            filter: lightBlur.startsWith('blur-') ? '' : lightBlur,
            background: lightGradient
          }}
        ></div>

        {/* Conditionally render the fixed lamp only when sticky effect is enabled */}
        {enableStickyEffect && (
          <div
            ref={fixedLampRef}
            className={`fixed inset-auto z-50 rounded-[90%] blur-[48px] ${lightClassName}`}
            style={{
              height: lightHeight,
              width: lightWidth,
              backgroundColor: lightColor,
              opacity: 0, // Start invisible
              top: stickyOffset,
              transform: `scale(${lightScale/100})`,
              filter: lightBlur.startsWith('blur-') ? '' : lightBlur,
              background: lightGradient,
              left: fixedLampPosition.left,
              marginLeft: fixedLampPosition.marginLeft
            }}
          ></div>
        )}

        <div
          ref={beamRef}
          className={`absolute inset-auto z-50 ${beamClassName}`}
          style={{
            height: beamHeight,
            width: beamWidth,
            transform: `translateY(${beamTranslateY})`,
            background: beamGradient
          }}
        ></div>
      </div>
      {/* This is the internal end target if no external one is provided */}
      <div ref={endTargetRef} style={{ position: "absolute", bottom: 0, height: "1px", width: "100%" }}></div>
    </div>
  )
}
