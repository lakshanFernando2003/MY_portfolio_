import React from 'react'
import { useRef, useEffect } from 'react';
import {gsap} from 'gsap';

const customecursor = () => {
  const cursorRef = useRef(null);
  const cursorBorderRef = useRef(null);

  const isMobile = typeof window !== 'undefined' && window.matchMedia("(max-width: 768px)").matches;

  if(isMobile){
    return null; // Don't render the custom cursor on mobile devices
  }

  useEffect(() => {
    // get the cursor and cursorBorder elements
    const cursor = cursorRef.current;
    const cursorBorder = cursorBorderRef.current;

    // Initial  position of the cursor
    gsap.set([cursor, cursorBorder],{
      xPercent: -50,
      yPercent: -50,
    });

    // variables for cursor position with different speeds
    const xTo = gsap.quickTo(cursor, "x", {
      duration: 0.2,
      ease: "power3.out",});

    const yTo = gsap.quickTo(cursor, "y", {
      duration: 0.2,
      ease: "power3.out",});

    const xBorderTo = gsap.quickTo(cursorBorder, "x", {
      duration: 0.5,
      ease: "power.out",});

    const yBorderTo = gsap.quickTo(cursorBorder, "y", {
      duration: 0.5,
      ease: "power3.out",});

    // Mouse move handler
    const handleMouseMove = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
      xBorderTo(e.clientX)
      yBorderTo(e.clientY)
    }

    window.addEventListener("mousemove",
      handleMouseMove)

    // add click animation
      document.addEventListener("mousedown", () => {
        gsap.to([cursor, cursorBorder], {
          scale: 0.6,
          duration: 0.2,
        })
      })

      document.addEventListener("mouseup", () => {
        gsap.to([cursor, cursorBorder], {
          scale: 1,
          duration: 0.2,
        })
      })
      
  },  []);

  return (
    <>
      <div
          ref={cursorRef}
          className="fixed top-0 left-0 w-[20px] h-[20px] bg bg-white rounded-full pointer-events-none z-[999]
          mix-blend-difference"
      />

      <div
          ref={cursorBorderRef}
          className="fixed top-0 left-0 w-[40px] h-[40px] border border-white rounded-full pointer-events-none z-[999]
          mix-blend-difference opacity-50"


      />

    </>
  )
}

export default customecursor;
