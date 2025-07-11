import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import PropTypes from 'prop-types';

export const BentoCard = ({ className, hoverEffect = true, children, ...rest }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const cardRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverEffect || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    });
  };

  const handleMouseEnter = () => hoverEffect && setHoverOpacity(1);
  const handleMouseLeave = () => hoverEffect && setHoverOpacity(0);

  return (
    <motion.div
      ref={cardRef}
      className={twMerge("relative size-full overflow-hidden rounded-md", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {/* Content placed by user */}
      {children}

      {/* Hover effect overlay */}
      {hoverEffect && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition duration-300"
          style={{
            opacity: hoverOpacity,
            background: `radial-gradient(150px circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(255,255,255,0.15), transparent)`
          }}
        />
      )}
    </motion.div>
  );
};

// Add prop validation using PropTypes
BentoCard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  hoverEffect: PropTypes.bool,
};

export default BentoCard;
