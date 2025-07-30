import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/all';
import { AnimatePresence, motion } from "framer-motion";

export default function NavBar() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredItemDimensions, setHoveredItemDimensions] = useState({ width: 0, left: 0 });
  const itemRefs = useRef([]);

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
    <div className="fixed top-0 left-0 right-0 flex justify-center items-center z-50 ">
      <nav className="mt-3 bg-gradient-to-r from-black/60 via-cyan-500/1 to-black/50 border border-white/20 justify-center items-center rounded-full backdrop-blur-3xl shadow-lg">
        <div className="flex items-center justify-around w-full px-4 py-[1.5px] gap-40">
          <div className='flex items-center gap-2 p-1  ml-[-0.9rem]'>
           <div className=' flex h-9 w-9 relative overflow-hidden'>
            <Image
              className="rounded-full"
              src="/images/me.jpg"
              alt="intro image"
              fill={true}
              priority={true}
            >
            </Image>
           </div >
          <h1 className='text-lg '>Lakshan</h1>
        </div>

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
              <li
                key={item.id}
                ref={el => itemRefs.current[idx] = el}
                className="relative font-semibold text-sm tracking-wide"
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span
                  className="block py-2 px-4 relative z-10 transition-colors duration-200"
                  style={{ color: hoveredIndex === idx ? 'black' : 'white' }}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul>

          <div className='items-center relative '>
          <a className='flex justify-center items-center border border-white/20 bg-[rgb(26_26_26_/_60%)] backdrop-blur-3xl shadow-lg py-2.5 pr-7 pl-7 rounded-full mr-[-0.59rem] hover:bg-[rgb(255_255_255_/_80%)] hover:text-black transition-all duration-[0.4s]' onClick={() => scrollToSection('contactMe') }><span className=' text-xs'>Let's Connect</span></a>
        </div>
        </div>

      </nav>

    </div>
  )
}
