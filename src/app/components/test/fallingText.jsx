"use client";

import { useRef, useState, useEffect } from "react";
import Matter from "matter-js";
import { createElement } from "react";
import { createRoot } from "react-dom/client";

const FallingText = ({
  text = "",
  highlightWords = [],
  defaultHighlightClass = "text-cyan-500 font-bold",
  trigger = "auto",
  backgroundColor = "transparent",
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = "1rem",
  fontFamily = "inherit",
  explodeOnClick = false,
  collisionForce = 0.8,
  rotationEnabled = true,
  initialVelocity = 5,
  enableGravityShift = false,
  gridLayout = false, // New prop for grid layout
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const engineRef = useRef(null);

  const [effectStarted, setEffectStarted] = useState(false);
  const [wordsGenerated, setWordsGenerated] = useState(false);

  // Parse text into HTML with highlighted words
  useEffect(() => {
    if (!textRef.current) return;
    const words = text.split(" ");

    // Clear any existing mounted components
    const existingIconContainers = textRef.current.querySelectorAll('[data-icon-container="true"]');
    existingIconContainers.forEach(container => {
      if (container._iconRoot) {
        container._iconRoot.unmount();
      }
    });

    const newHTML = words
      .map((word) => {
        // Check if this word should be highlighted and get its custom styling
        let customStyle = "";
        let customClass = "";
        let icon = null;
        let iconPosition = "before"; // default position
        let iconSize = "1em";
        let iconStyles = "";
        let iconComponent = null;

        // Support both object format and simple string format
        const highlightMatch = highlightWords.find(highlight => {
          if (typeof highlight === 'object' && highlight.word) {
            return word.toLowerCase().includes(highlight.word.toLowerCase());
          } else if (typeof highlight === 'string') {
            return word.toLowerCase().includes(highlight.toLowerCase());
          }
          return false;
        });

        if (highlightMatch) {
          if (typeof highlightMatch === 'object') {
            // Apply custom color and/or class if provided
            if (highlightMatch.color) {
              customStyle = `color: ${highlightMatch.color};`;
            }
            if (highlightMatch.className) {
              customClass = highlightMatch.className;
            } else {
              customClass = defaultHighlightClass;
            }

            // Handle icon if provided
            if (highlightMatch.icon) {
              icon = highlightMatch.icon;

              // Check if this is a React component
              if (typeof highlightMatch.icon !== 'string') {
                iconComponent = highlightMatch.icon;
                // Create a placeholder for the icon
                icon = `<span
                  data-icon-container="true"
                  data-icon-id="${word}-${Math.random().toString(36).substr(2, 9)}"
                  class="inline-flex mx-1 align-middle"
                  style="display: inline-flex; font-size: ${highlightMatch.iconSize || '1em'}; ${highlightMatch.iconStyles || ''}"
                ></span>`;
              }

              if (highlightMatch.iconPosition) {
                iconPosition = highlightMatch.iconPosition;
              }
              if (highlightMatch.iconSize) {
                iconSize = highlightMatch.iconSize;
              }
              if (highlightMatch.iconStyles) {
                iconStyles = highlightMatch.iconStyles;
              }
            }
          } else {
            // Apply default highlighting for string format
            customClass = defaultHighlightClass;
          }
        }

        // Build the word with optional icon
        let iconHtml = '';
        if (icon) {
          if (typeof icon === 'string') {
            iconHtml = `<span class="inline-flex mx-1 align-middle" style="font-size: ${iconSize}; ${iconStyles}">${icon}</span>`;
          } else {
            // For React components, use the placeholder we created
            iconHtml = icon;
          }
        }

        const wordWithIcon = iconPosition === "before"
          ? `${iconHtml}${word}`
          : `${word}${iconHtml}`;

        return `<span
          class="inline-flex items-center mx-[2px] select-none ${customClass}"
          style="${customStyle}"
          data-word="${word}"
          data-highlighted="${!!highlightMatch}"
          data-has-icon="${!!icon}"
          data-icon-position="${iconPosition}"
        >
          ${wordWithIcon}
        </span>`;
      })
      .join(" ");

    textRef.current.innerHTML = newHTML;

    // Now render any React icon components into their placeholders
    highlightWords.forEach(highlight => {
      if (typeof highlight === 'object' && highlight.icon && typeof highlight.icon !== 'string') {
        const word = highlight.word;
        const iconContainers = textRef.current.querySelectorAll(`[data-has-icon="true"][data-word="${word}"] [data-icon-container="true"]`);

        iconContainers.forEach(container => {
          const root = createRoot(container);
          container._iconRoot = root;

          // Create the React component with the appropriate props
          const IconComponent = highlight.icon;
          const iconProps = {
            size: highlight.iconSize?.replace('em', '') * 16 || 16,
            color: highlight.iconColor || highlight.color,
            className: highlight.iconClassName || "",
            style: highlight.iconStyle || {}
          };

          root.render(createElement(IconComponent, iconProps));
        });
      }
    });

    setWordsGenerated(true);
  }, [text, highlightWords, defaultHighlightClass]);

  // Set up trigger effect
  useEffect(() => {
    if (trigger === "auto") {
      setEffectStarted(true);
      return;
    }

    if (trigger === "scroll" && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger]);

  // Initialize physics engine and set up the scene
  useEffect(() => {
    if (!effectStarted || !wordsGenerated || !containerRef.current) return;

    const {
      Engine,
      Render,
      World,
      Bodies,
      Runner,
      Mouse,
      MouseConstraint,
      Body,
      Events,
    } = Matter;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    if (width <= 0 || height <= 0) return;

    // Create engine
    const engine = Engine.create();
    engineRef.current = engine;
    engine.world.gravity.y = gravity;

    // Create renderer
    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes,
        showSleeping: false,
      },
    });

    // Create boundaries
    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: "transparent" },
    };

    const floor = Bodies.rectangle(
      width / 2,
      height + 25,
      width,
      50,
      boundaryOptions
    );
    const leftWall = Bodies.rectangle(
      -25,
      height / 2,
      50,
      height,
      boundaryOptions
    );
    const rightWall = Bodies.rectangle(
      width + 25,
      height / 2,
      50,
      height,
      boundaryOptions
    );
    const ceiling = Bodies.rectangle(
      width / 2,
      -25,
      width,
      50,
      boundaryOptions
    );

    // Get word elements
    const wordSpans = textRef.current.querySelectorAll("span");
    const wordCount = wordSpans.length;

    // Calculate grid positions if gridLayout is enabled
    let positions = [];
    if (gridLayout) {
      const rows = Math.min(3, Math.ceil(wordCount / 3)); // Max 3 rows
      const itemsPerRow = Math.ceil(wordCount / rows);

      const rowHeight = height / (rows + 1);
      const itemWidth = width / (itemsPerRow + 1);

      // Calculate grid positions with some randomness
      for (let r = 0; r < rows; r++) {
        const y = rowHeight * (r + 1);

        for (let c = 0; c < itemsPerRow; c++) {
          const index = r * itemsPerRow + c;
          if (index < wordCount) {
            // Add some randomness within a reasonable range
            const xOffset = (Math.random() - 0.5) * itemWidth * 0.5;
            const yOffset = (Math.random() - 0.5) * rowHeight * 0.5;

            positions.push({
              x: itemWidth * (c + 1) + xOffset,
              y: y + yOffset
            });
          }
        }
      }

      // Shuffle positions to randomize which word goes where
      positions = positions.sort(() => Math.random() - 0.5);
    }

    // Create word bodies
    const wordBodies = [...wordSpans].map((elem, index) => {
      const rect = elem.getBoundingClientRect();
      const isHighlighted = elem.dataset.highlighted === "true";

      // Position either from grid layout or from natural position
      let x, y;
      if (gridLayout && positions[index]) {
        x = positions[index].x;
        y = positions[index].y;
      } else {
        x = rect.left - containerRect.left + rect.width / 2;
        y = rect.top - containerRect.top + rect.height / 2;
      }

      // Slightly different properties for highlighted words
      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { fillStyle: "transparent" },
        restitution: isHighlighted ? collisionForce + 0.1 : collisionForce,
        frictionAir: isHighlighted ? 0.005 : 0.01,
        friction: 0.2,
        density: isHighlighted ? 0.002 : 0.001,
        label: elem.dataset.word,
        isHighlighted,
      });

      // Set initial velocity
      Body.setVelocity(body, {
        x: (Math.random() - 0.5) * initialVelocity,
        y: Math.random() * initialVelocity * 0.5,
      });

      if (rotationEnabled) {
        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);
      }

      return { elem, body };
    });

    // Position words absolutely
    wordBodies.forEach(({ elem, body }) => {
      elem.style.position = "absolute";
      elem.style.left = `0px`;
      elem.style.top = `0px`;
      elem.style.transformOrigin = "center center";
      elem.style.transition = "opacity 0.3s ease";
    });

    // Set up mouse control
    const mouse = Mouse.create(containerRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false },
      },
    });
    render.mouse = mouse;

    // Add all bodies to world
    World.add(engine.world, [
      floor,
      leftWall,
      rightWall,
      ceiling,
      mouseConstraint,
      ...wordBodies.map((wb) => wb.body),
    ]);

    // Set up click explosion effect
    if (explodeOnClick) {
      Events.on(mouseConstraint, "mousedown", (event) => {
        const clickPosition = event.mouse.position;

        wordBodies.forEach(({ body }) => {
          // Calculate direction vector from click to body
          const forceDirection = {
            x: body.position.x - clickPosition.x,
            y: body.position.y - clickPosition.y,
          };

          // Normalize and apply force
          const distance = Math.sqrt(forceDirection.x ** 2 + forceDirection.y ** 2);
          if (distance < 100) {
            const forceMagnitude = 0.01 * (1 - distance / 100);
            Body.applyForce(body, body.position, {
              x: forceDirection.x * forceMagnitude,
              y: forceDirection.y * forceMagnitude,
            });
          }
        });
      });
    }

    // Implement gravity shift on mouse movement if enabled
    if (enableGravityShift) {
      Events.on(mouseConstraint, "mousemove", (event) => {
        const mousePosition = event.mouse.position;
        const containerCenter = {
          x: width / 2,
          y: height / 2
        };

        // Calculate gravity based on mouse position
        const gravityX = (mousePosition.x - containerCenter.x) / width * 2;
        const gravityY = gravity + (mousePosition.y - containerCenter.y) / height * 1;

        engine.world.gravity.x = gravityX;
        engine.world.gravity.y = gravityY;
      });
    }

    // Start the physics engine
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // Update loop for word positions
    const updateLoop = () => {
      wordBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;

        if (rotationEnabled) {
          elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
        } else {
          elem.style.transform = `translate(-50%, -50%)`;
        }
      });

      requestAnimationFrame(updateLoop);
    };
    const animationId = requestAnimationFrame(updateLoop);

    // Clean up
    return () => {
      cancelAnimationFrame(animationId);
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && canvasContainerRef.current) {
        canvasContainerRef.current.removeChild(render.canvas);
      }
      World.clear(engine.world);
      Engine.clear(engine);
    };
  }, [
    effectStarted,
    wordsGenerated,
    gravity,
    wireframes,
    backgroundColor,
    mouseConstraintStiffness,
    collisionForce,
    rotationEnabled,
    explodeOnClick,
    initialVelocity,
    enableGravityShift,
    gridLayout, // Add the new prop to dependencies
  ]);

  // Handle manual triggering
  const handleTrigger = () => {
    if (!effectStarted && (trigger === "click" || trigger === "hover")) {
      setEffectStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative z-[1] w-full h-full cursor-pointer text-center mt-1 pt-2 overflow-hidden "
      onClick={trigger === "click" ? handleTrigger : undefined}
      onMouseEnter={trigger === "hover" ? handleTrigger : undefined}
    >
      <div
        ref={textRef}
        className="inline-block"
        style={{
          fontSize,
          fontFamily,
          lineHeight: 1.4,
        }}
      />
      <div className="absolute top-0 left-0 z-0 " ref={canvasContainerRef} />
    </div>
  );
};

export default FallingText;
