import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/all';
import { AnimatePresence, motion } from "framer-motion";
import Magnet from '../Animations/Magnet';

export default function NavBar() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredItemDimensions, setHoveredItemDimensions] = useState({ width: 0, left: 0 });
  const itemRefs = useRef([]);

  // Animation variants for entrance effects
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const socialVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  useEffect(() => {
    // Register ScrollToPlugin
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollToPlugin);
    }
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Get navbar height for offset
      const navbar = document.querySelector('nav');
      const navbarHeight = navbar ? navbar.offsetHeight + 20 : 20;

      // Animate scrolling with GSAP
      gsap.to(window, {
        duration: 2,
        scrollTo: {
          y: element.offsetTop - navbarHeight,
          offsetY: 0,
          autoKill: false
        },
        ease: "power3.inOut"  // Smooth easing function for natural feel
      });
    }
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About Me' },
    { id: 'projects', label: 'Projects' },
    { id: 'roadmap', label: 'Road Map' },
  ];

  const handleMouseEnter = (idx) => {
    setHoveredIndex(idx);

    // Get the actual dimensions of the hovered item
    const itemRect = itemRefs.current[idx]?.getBoundingClientRect();
    const listRect = itemRefs.current[idx]?.parentElement.getBoundingClientRect();

    if (itemRect && listRect) {
      setHoveredItemDimensions({
        width: itemRect.width,
        left: itemRect.left - listRect.left,
      });
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 flex justify-center items-center z-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* TOP LEFT logo */}
      <motion.div
        variants={itemVariants}
        className='left-5 mt-3 absolute flex items-center gap-2 p-1'
      >
        <div className='opacity-0 flex h-9 w-20 relative overflow-hidden'>
          <Image
            className=""
            src="/images/"
            alt="logo"
            fill={true}
            priority={true}
          />
        </div>
      </motion.div>

      {/* Navigation panel */}
      <motion.nav
        variants={itemVariants}
        className="mt-3 bg-gradient-to-r from-black/60 via-cyan-500/1 to-black/50 border border-white/20 justify-center items-center rounded-full backdrop-blur-3xl shadow-lg"
      >
        <div className="flex items-center justify-around w-full px-4 py-[1.5px] gap-40">
          <motion.div
            variants={itemVariants}
            className='flex items-center gap-2 p-1 ml-[-0.9rem]'
          >
            <div className='flex h-9 w-9 relative overflow-hidden'>
              <Image
                className="rounded-full"
                src="/images/me.jpg"
                alt="intro image"
                fill={true}
                priority={true}
              >
              </Image>
            </div>
            <h1 className='text-lg capitalize'>Lakshan</h1>
          </motion.div>

          <ul className="flex flex-row gap-8 items-center pl-2 pr-2 relative">
            <AnimatePresence>
              {hoveredIndex !== null && (
                <motion.span
                  className="absolute bg-white rounded-full z-0"
                  layoutId="navHoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    top: 0,
                    left: hoveredItemDimensions.left,
                    width: hoveredItemDimensions.width,
                    height: '100%'
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 25,
                    layout: { duration: 0.2 }
                  }}
                />
              )}
            </AnimatePresence>

            {navItems.map((item, idx) => (
              <motion.li
                key={item.id}
                ref={el => itemRefs.current[idx] = el}
                className="relative font-semibold text-sm tracking-wide"
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                variants={itemVariants}
              >
                <span
                  className="block py-2 px-4 relative z-10 transition-colors duration-200"
                  style={{ color: hoveredIndex === idx ? 'black' : 'white' }}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </span>
              </motion.li>
            ))}
          </ul>

          <motion.div
            variants={itemVariants}
            className='items-center relative'
          >
            <a className='flex justify-center items-center border border-white/20 bg-[rgb(26_26_26_/_60%)] backdrop-blur-3xl shadow-lg py-2.5 pr-7 pl-7 rounded-full mr-[-0.59rem] hover:bg-[rgb(255_255_255_/_80%)] hover:text-black transition-all duration-[0.4s]' onClick={() => scrollToSection('contactMe')}>
              <span className='text-xs'>Let's Connect</span>
            </a>
          </motion.div>
        </div>
      </motion.nav>

      {/* Social links buttons */}
      <motion.div
        className='mt-4 right-5 absolute flex items-center justify-center gap-3'
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delayChildren: 0.4,
              staggerChildren: 0.1
            }
          }
        }}
      >
        <motion.div variants={socialVariants}>
          <Magnet padding={50} magnetStrength={5} wrapperClassName="relative">
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-10 w-10 bg-[rgb(26_26_26_/_60%)] hover:bg-blue-600 transition-colors duration-300 rounded-full border border-white/20 backdrop-blur-3xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </Magnet>
        </motion.div>

        <motion.div variants={socialVariants}>
          <Magnet padding={50} magnetStrength={5} wrapperClassName="relative">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-10 w-10 bg-[rgb(26_26_26_/_60%)] hover:bg-gray-700 transition-colors duration-300 rounded-full border border-white/20 backdrop-blur-3xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </Magnet>
        </motion.div>

        <motion.div variants={socialVariants}>
          <Magnet padding={50} magnetStrength={5} wrapperClassName="relative">
            <a
              href="https://instagram.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-10 w-10 bg-[rgb(26_26_26_/_60%)] hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 transition-colors duration-300 rounded-full border border-white/20 backdrop-blur-3xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </Magnet>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
