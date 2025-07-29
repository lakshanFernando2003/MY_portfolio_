import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion } from "framer-motion";

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

const BubbleBackground = ({
  count = 25,
  minSize = 20,
  maxSize = 100,
  color = "amber",
  intensity = "medium",
  interactive = false,
  colorChangeInterval = 5000, // 5 seconds
  mouseAreaRadius = 150, // Radius in pixels for the mouse interaction area
  showMouseArea = false, // Show the mouse area circle (for debugging)
  globalMovementFactor = 0.3, // Factor for global movement (0-1)
  randomMovement = true, // Enable random movement animation
}) => {
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

  // Initialize bubbles only once
  useEffect(() => {
    // Generate random bubbles on component mount
    const newBubbles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // random x position (%)
      y: Math.random() * 100, // random y position (%)
      size: Math.random() * (maxSize - minSize) + minSize,
      duration: Math.random() * 20 + 15, // animation duration between 15-35s
      delay: Math.random() * 8, // random delay for animation start
      rotateZ: Math.random() * 360, // random initial rotation
      colorOffset: Math.floor(Math.random() * AVAILABLE_COLORS.length), // For individual bubble color variation
    }));

    setBubbles(newBubbles);
  }, [count, minSize, maxSize]); // Only recreate bubbles if these values change

  // Set up mouse event listeners with global movement tracking
  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e) => {
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
    };

    const handleMouseLeave = () => {
      setMouseActive(false);
    };

    const handleMouseEnter = () => {
      setMouseActive(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [interactive]); // Only depends on interactive flag

  // Color change effect - separate from other effects
  useEffect(() => {
    if (colorChangeInterval <= 0) return;

    const interval = setInterval(() => {
      setCurrentColor(getRandomColor());
    }, colorChangeInterval);

    return () => clearInterval(interval);
  }, [getRandomColor, colorChangeInterval]);

  // Bubble style for glow effect - memoized function
  const getBubbleStyle = useCallback((bubble, isInMouseArea, distanceRatio) => {
    const baseStyle = {
      left: `${bubble.x}%`,
      top: `${bubble.y}%`,
      width: bubble.size,
      height: bubble.size,
    };

    // Enhanced glow effect based on mouse proximity
    if (interactive && mouseActive && isInMouseArea) {
      // Calculate glow intensity based on how close to the center of the mouse area
      const glowIntensity = (1 - distanceRatio) * 0.8; // 0 to 0.8 based on distance

      return {
        ...baseStyle,
        boxShadow: `0 0 ${bubble.size/2}px ${bubble.size/4 * glowIntensity}px rgba(${
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
    if (intensity === "glow") {
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
  }, [intensity, currentColor, interactive, mouseActive]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

      {bubbles.map(bubble => {
        // Calculate position in pixels for accurate distance calculation
        const bubblePosX = (bubble.x / 100) * window.innerWidth;
        const bubblePosY = (bubble.y / 100) * window.innerHeight;

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

        return (
          <motion.div
            key={bubble.id}
            className={`absolute rounded-full bg-${COLOR_MAP[bubbleColor].base}/${isInMouseArea ? '40' : opacityLevel} backdrop-blur-sm border border-${COLOR_MAP[bubbleColor].base}/${isInMouseArea ? '50' : '30'}`}
            style={getBubbleStyle(bubble, isInMouseArea, distanceRatio)}
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
            // Apply global movement to all bubbles
            style={{
              ...getBubbleStyle(bubble, isInMouseArea, distanceRatio),
              transform: interactive && mouseActive ?
                `translate(${globalMovement.x}px, ${globalMovement.y}px)` :
                'none'
            }}
          />
        );
      })}
    </div>
  );
};

export default BubbleBackground;
