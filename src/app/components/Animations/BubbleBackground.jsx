"use client";
import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion"; // Added for viewport detection

// Utility function for throttling
const throttle = (func, delay) => {
  let lastCall = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
};

// Color variations map - moved outside component to prevent recreation on each render
const COLOR_MAP = {
  amber: { base: "amber-400", veryLight: "5", light: "10", medium: "20", strong: "30", veryStrong: "50", glow: "30" },
  blue: { base: "blue-400", veryLight: "5", light: "10", medium: "20", strong: "30", veryStrong: "50", glow: "30" },
  purple: { base: "purple-400", veryLight: "5", light: "10", medium: "20", strong: "30", veryStrong: "50", glow: "30" },
  green: { base: "green-400", veryLight: "5", light: "10", medium: "20", strong: "30", veryStrong: "50", glow: "30" },
  cyan: { base: "cyan-400", veryLight: "5", light: "10", medium: "20", strong: "30", veryStrong: "50", glow: "30" },
  red: { base: "red-400", veryLight: "5", light: "10", medium: "20", strong: "30", veryStrong: "50", glow: "30" },
  pink: { base: "pink-400", veryLight: "5", light: "10", medium: "20", strong: "30", veryStrong: "50", glow: "30" },
  orange: { base: "orange-400", veryLight: "5", light: "10", medium: "20", strong: "30", veryStrong: "50", glow: "30" },
};

const AVAILABLE_COLORS = Object.keys(COLOR_MAP);

// OPTIMIZATION: Memoized Bubble component to prevent unnecessary re-renders
const Bubble = React.memo(({
  bubble,
  mousePosX,
  mousePosY,
  mouseActive,
  mouseSpeed,
  interactive,
  mouseAreaRadius,
  currentColor,
  intensity,
  randomMovement,
  maxSize,
  globalMovementFactor,
  mouseDirectionRef,
  opacityLevel,
  getBubbleStyle
}) => {
  // Calculate position in pixels for accurate distance calculation
  const bubblePosX = (bubble.x / 100) * (typeof window !== 'undefined' ? window.innerWidth : 1000);
  const bubblePosY = (bubble.y / 100) * (typeof window !== 'undefined' ? window.innerHeight : 800);

  // Calculate distance from mouse center to bubble center
  const dx = mousePosX - bubblePosX;
  const dy = mousePosY - bubblePosY;
  const distanceToMouse = Math.sqrt(dx * dx + dy * dy);

  // Check if bubble is within the mouse area or just outside (extended area)
  const extendedRadius = mouseAreaRadius * 1.5; // Extended area for gradual effect falloff
  const isInMouseArea = distanceToMouse <= extendedRadius && mouseActive;

  // Calculate how close the bubble is to the center of the mouse area (0-1)
  // 0 means at the center, 1 means at the edge or beyond
  const distanceRatio = Math.min(distanceToMouse / mouseAreaRadius, 1);

  // Apply effects based on distance
  const interactionStrength = isInMouseArea ? 1 - distanceRatio : 0;

  // Calculate movement vector - bubbles should move toward or away from mouse
  // based on position and mouse speed
  const moveTowardMouse = mouseSpeed > 10;
  const directionFactor = moveTowardMouse ? -1 : 1; // -1 attracts, 1 repels

  // Global movement effect - all bubbles subtly follow mouse direction
  const globalMovement = interactive && mouseActive ? {
    x: mouseDirectionRef.current.x * globalMovementFactor * (1 - bubble.size/maxSize),
    y: mouseDirectionRef.current.y * globalMovementFactor * (1 - bubble.size/maxSize)
  } : { x: 0, y: 0 };

  // Random movement when not directly interacting
  const randomOffset = randomMovement && (!isInMouseArea || !mouseActive) ? {
    x: [
      -bubble.size * 0.05,
      bubble.size * 0.05,
      -bubble.size * 0.05
    ],
    y: [
      -bubble.size * 0.05,
      bubble.size * 0.05,
      -bubble.size * 0.05
    ]
  } : { x: 0, y: 0 };

  // Bubble-specific color for variation
  const bubbleColor = isInMouseArea && interactionStrength > 0.3 ?
    AVAILABLE_COLORS[(AVAILABLE_COLORS.indexOf(currentColor) + bubble.colorOffset) % AVAILABLE_COLORS.length] :
    currentColor;

  // OPTIMIZATION: Inline style computation to reduce calls to getBubbleStyle
  const bubbleStyle = getBubbleStyle(bubble, isInMouseArea, distanceRatio);
  const transformStyle = interactive && mouseActive ?
    `translate(${globalMovement.x}px, ${globalMovement.y}px)` : 'none';

  return (
    <motion.div
      key={bubble.id}
      className={`absolute rounded-full bg-${COLOR_MAP[bubbleColor].base}/${isInMouseArea ? '40' : opacityLevel} backdrop-blur-sm border border-${COLOR_MAP[bubbleColor].base}/${isInMouseArea ? '50' : '30'}`}
      style={{
        ...bubbleStyle,
        transform: transformStyle
      }}
      initial={{
        opacity: 0,
        scale: 0,
        rotate: bubble.rotateZ,
      }}
      animate={{
        opacity: isInMouseArea
          ? 0.4 + interactionStrength * 0.6 // 0.4 to 1.0 based on proximity
          : [0.1, 0.4, 0.1],
        scale: isInMouseArea
          ? 1 + interactionStrength * 0.4 // 1.0 to 1.4 based on proximity
          : [1, 1.2, 1],
        x: isInMouseArea
          ? dx * interactionStrength * 0.1 * directionFactor // Direct mouse area interaction
          : randomMovement ? randomOffset.x : 0, // Random movement when not in mouse area
        y: isInMouseArea
          ? dy * interactionStrength * 0.1 * directionFactor // Direct mouse area interaction
          : randomMovement ? randomOffset.y : 0, // Random movement when not in mouse area
        rotate: isInMouseArea
          ? bubble.rotateZ + (mouseSpeed * interactionStrength * 4)
          : bubble.rotateZ + 20,
      }}
      transition={isInMouseArea ? {
        type: "spring",
        stiffness: 120 + mouseSpeed * 3,
        damping: 12 - interactionStrength * 5, // More bouncy when closer
        mass: 0.6,
      } : {
        duration: bubble.duration,
        repeat: Infinity,
        repeatType: "reverse",
        delay: bubble.delay,
        ease: "easeInOut",
        times: [0, 0.5, 1]
      }}
    />
  );
}, (prevProps, nextProps) => {
  // OPTIMIZATION: Custom comparison function to prevent unnecessary re-renders
  // Only re-render if important props change
  return (
    prevProps.mouseActive === nextProps.mouseActive &&
    Math.abs(prevProps.mousePosX - nextProps.mousePosX) < 5 &&
    Math.abs(prevProps.mousePosY - nextProps.mousePosY) < 5 &&
    prevProps.mouseSpeed === nextProps.mouseSpeed &&
    prevProps.currentColor === nextProps.currentColor
  );
});

const BubbleBackground = ({
  count = 25,
  minSize = 20,
  maxSize = 100,
  color = "amber",
  intensity = "veryStrong",
  interactive = false,
  colorChangeInterval = 5000, // 5 seconds
  mouseAreaRadius = 150, // Radius in pixels for the mouse interaction area
  showMouseArea = false, // Show the mouse area circle (for debugging)
  globalMovementFactor = 0.3, // Factor for global movement (0-1)
  randomMovement = true, // Enable random movement animation
}) => {
  // OPTIMIZATION: Added ref and viewport detection
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: false,
    margin: "100px 0px" // Start rendering 100px before it comes into view
  });

  // OPTIMIZATION: Device performance detection
  const [devicePerformance, setDevicePerformance] = useState('high');

  // OPTIMIZATION: State initialization grouped
  const [bubbles, setBubbles] = useState([]);
  const [mousePosX, setMousePosX] = useState(0);
  const [mousePosY, setMousePosY] = useState(0);
  const [currentColor, setCurrentColor] = useState(color);
  const [mouseSpeed, setMouseSpeed] = useState(0);
  const [mouseActive, setMouseActive] = useState(false); // Track if mouse is on screen

  // Use ref for lastMousePos to avoid re-renders
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  // Ref for tracking overall mouse direction for global movement
  const mouseDirectionRef = useRef({ x: 0, y: 0 });

  // OPTIMIZATION: Detect device performance to adjust bubble count and effects
  // useEffect(() => {
  //   if (typeof window === 'undefined') return;

  //   const start = performance.now();
  //   let count = 0;
  //   while (performance.now() - start < 5) {
  //     count++;
  //   }

  //   if (count < 50000) setDevicePerformance('low');
  //   else if (count < 200000) setDevicePerformance('medium');
  //   else setDevicePerformance('high');

  // }, []);

  // OPTIMIZATION: Adjust bubble count based on device performance
  const getBubbleCount = useCallback(() => {
    switch(devicePerformance) {
      case 'low': return Math.min(count, 20); // Maximum 20 bubbles for low-end devices
      case 'medium': return Math.min(count, 35); // Maximum 35 bubbles for medium-performance devices
      default: return count; // Use the full count for high-performance devices
    }
  }, [count, devicePerformance]);

  // Use memoized values for derived state
  const selectedColor = useMemo(() =>
    COLOR_MAP[currentColor] || COLOR_MAP.amber,
    [currentColor]
  );

  const opacityLevel = useMemo(() =>
    selectedColor[intensity] || selectedColor.medium,
    [selectedColor, intensity]
  );

  // Function to get random color - memoized
  const getRandomColor = useCallback(() => {
    const filteredColors = AVAILABLE_COLORS.filter(c => c !== currentColor);
    return filteredColors[Math.floor(Math.random() * filteredColors.length)];
  }, [currentColor]);

  // OPTIMIZATION: Initialize bubbles only once and adapt to device performance
  useEffect(() => {
    // Only generate bubbles when component is in view
    if (!isInView) return;

    const effectiveCount = getBubbleCount();

    // OPTIMIZATION: Reduced bubble size and animation complexity for low-end devices
    const effectiveMaxSize = devicePerformance === 'low' ? maxSize * 0.7 : maxSize;

    // Generate random bubbles on component mount
    const newBubbles = Array.from({ length: effectiveCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // random x position (%)
      y: Math.random() * 100, // random y position (%)
      size: Math.random() * (effectiveMaxSize - minSize) + minSize,
      // OPTIMIZATION: Simpler animations for low-end devices
      duration: devicePerformance === 'low'
        ? Math.random() * 15 + 20 // 20-35s (slower but less CPU intensive)
        : Math.random() * 20 + 15, // 15-35s (normal)
      delay: Math.random() * 8, // random delay for animation start
      rotateZ: Math.random() * 360, // random initial rotation
      colorOffset: Math.floor(Math.random() * AVAILABLE_COLORS.length), // For individual bubble color variation
    }));

    setBubbles(newBubbles);
  }, [isInView, getBubbleCount, minSize, maxSize, devicePerformance]);

  // OPTIMIZATION: Throttled mouse event handlers for better performance
  const handleMouseMove = useCallback(
    throttle((e) => {
      // Calculate mouse speed
      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Track overall mouse direction for global movement effect
      mouseDirectionRef.current = {
        x: dx * 0.5, // Dampen the effect
        y: dy * 0.5
      };

      lastMousePosRef.current = { x: e.clientX, y: e.clientY };

      // Use RAF to limit state updates
      requestAnimationFrame(() => {
        setMouseSpeed(speed > 20 ? 20 : speed); // Cap the speed
        setMousePosX(e.clientX);
        setMousePosY(e.clientY);
        setMouseActive(true);
      });
    }, devicePerformance === 'low' ? 50 : 30), // OPTIMIZATION: More throttling on low-end devices
    [devicePerformance] // Re-create if device performance changes
  );

  const handleMouseLeave = useCallback(() => {
    setMouseActive(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setMouseActive(true);
  }, []);

  // Set up mouse event listeners with global movement tracking
  useEffect(() => {
    // OPTIMIZATION: Only add mouse listeners when component is in view and interactive
    if (!interactive || !isInView) return;

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [interactive, isInView, handleMouseMove, handleMouseLeave, handleMouseEnter]);

  // OPTIMIZATION: Conditional color change effect - only when in view
  useEffect(() => {
    // Only run color change when component is in view
    if (!isInView || colorChangeInterval <= 0) return;

    const interval = setInterval(() => {
      setCurrentColor(getRandomColor());
    }, colorChangeInterval);

    return () => clearInterval(interval);
  }, [getRandomColor, colorChangeInterval, isInView]);

  // Bubble style for glow effect - memoized function
  const getBubbleStyle = useCallback((bubble, isInMouseArea, distanceRatio) => {
    const baseStyle = {
      left: `${bubble.x}%`,
      top: `${bubble.y}%`,
      width: bubble.size,
      height: bubble.size,
    };

    // OPTIMIZATION: Simplified glow effect for low-end devices
    const isLowPerformance = devicePerformance === 'low';

    // Enhanced glow effect based on mouse proximity
    if (interactive && mouseActive && isInMouseArea) {
      // Calculate glow intensity based on how close to the center of the mouse area
      const glowIntensity = (1 - distanceRatio) * (isLowPerformance ? 0.5 : 0.8); // Less intense on low-end devices

      // OPTIMIZATION: Simpler shadow for low-end devices
      const shadowSize = isLowPerformance ? bubble.size/3 : bubble.size/2;
      const blurSize = isLowPerformance ? bubble.size/6 * glowIntensity : bubble.size/4 * glowIntensity;

      return {
        ...baseStyle,
        boxShadow: `0 0 ${shadowSize}px ${blurSize}px rgba(${
          currentColor === 'amber' ? '255, 191, 0' :
          currentColor === 'blue' ? '59, 130, 246' :
          currentColor === 'green' ? '34, 197, 94' :
          currentColor === 'purple' ? '168, 85, 247' :
          currentColor === 'cyan' ? '34, 211, 238' :
          currentColor === 'red' ? '248, 113, 113' :
          currentColor === 'pink' ? '244, 114, 182' :
          currentColor === 'orange' ? '251, 146, 60' :
          '255, 191, 0'
        }, ${0.3 + glowIntensity})`,
        zIndex: Math.floor(glowIntensity * 10), // Bubbles closer to mouse appear above others
      };
    }

    // Add regular glow effect if intensity is set to glow
    if (intensity === "glow" && !isLowPerformance) {
      return {
        ...baseStyle,
        boxShadow: `0 0 ${bubble.size/3}px ${bubble.size/6}px rgba(${
          currentColor === 'amber' ? '255, 191, 0' :
          currentColor === 'blue' ? '59, 130, 246' :
          currentColor === 'green' ? '34, 197, 94' :
          currentColor === 'purple' ? '168, 85, 247' :
          currentColor === 'cyan' ? '34, 211, 238' :
          currentColor === 'red' ? '248, 113, 113' :
          currentColor === 'pink' ? '244, 114, 182' :
          currentColor === 'orange' ? '251, 146, 60' :
          '255, 191, 0'
        }, 0.6)`,
      };
    }

    return baseStyle;
  }, [intensity, currentColor, interactive, mouseActive, devicePerformance]);

  // OPTIMIZATION: Don't render anything if not in view
  if (!isInView) {
    return <div ref={containerRef} className="absolute inset-0"></div>;
  }

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-visible h-full pointer-events-none">
      {/* Optional: Show mouse area indicator */}
      {interactive && showMouseArea && mouseActive && (
        <motion.div
          className={`absolute rounded-full border-2 border-${COLOR_MAP[currentColor].base} z-50 pointer-events-none`}
          style={{
            width: mouseAreaRadius * 2,
            height: mouseAreaRadius * 2,
            x: mousePosX - mouseAreaRadius,
            y: mousePosY - mouseAreaRadius,
            opacity: 0.5,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* OPTIMIZATION: Only render bubbles if component is in view */}
      {bubbles.map(bubble => (
        <Bubble
          key={bubble.id}
          bubble={bubble}
          mousePosX={mousePosX}
          mousePosY={mousePosY}
          mouseActive={mouseActive}
          mouseSpeed={mouseSpeed}
          interactive={interactive}
          mouseAreaRadius={mouseAreaRadius}
          currentColor={currentColor}
          intensity={intensity}
          randomMovement={randomMovement}
          maxSize={maxSize}
          globalMovementFactor={globalMovementFactor}
          mouseDirectionRef={mouseDirectionRef}
          opacityLevel={opacityLevel}
          getBubbleStyle={getBubbleStyle}
        />
      ))}
    </div>
  );
};

export default BubbleBackground;
