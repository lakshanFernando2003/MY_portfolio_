import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import { motion } from 'framer-motion'

// Import all SVG icons
import ReactSvg from '/public/images/Technologies/react.svg'
import JavaScriptSvg from '/public/images/Technologies/JavaScript.svg'
import TypeScriptSvg from '/public/images/Technologies/typescript.svg'
import NextSvg from '/public/images/Technologies/next.svg'
import PythonSvg from '/public/images/Technologies/python.svg'
import JavaSvg from '/public/images/Technologies/Java.svg'
import ThreeSvg from '/public/images/Technologies/three.svg'
import TailwindSvg from '/public/images/Technologies/tailwind.svg'
import MySQLSvg from '/public/images/Technologies/MySQL.svg'
import GSAPSvg from '/public/images/Technologies/gsap.svg'

export default function Technologies() {
  const marqueeRef1 = useRef(null)
  const marqueeRef2 = useRef(null)
  const containerRef = useRef(null)
  const headingRef = useRef(null)
  const marqueeAreaRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const marquee1Animation = useRef(null)
  const marquee2Animation = useRef(null)

  // Array of technology icons
  const icons = [
    { src: ReactSvg, alt: 'React', name: 'React' },
    { src: JavaScriptSvg, alt: 'JavaScript', name: 'JavaScript' },
    { src: TypeScriptSvg, alt: 'TypeScript', name: 'TypeScript' },
    { src: NextSvg, alt: 'Next.js', name: 'Next.js' },
    { src: PythonSvg, alt: 'Python', name: 'Python' },
    { src: JavaSvg, alt: 'Java', name: 'Java' },
    // { src: ThreeSvg, alt: 'Three.js', name: 'Three.js' },
    { src: TailwindSvg, alt: 'Tailwind CSS', name: 'Tailwind CSS' },
    { src: MySQLSvg, alt: 'MySQL', name: 'MySQL' },
    { src: GSAPSvg, alt: 'GSAP', name: 'GSAP' }
  ]

  // Duplicate icons for seamless loop
  const Elements = [...icons, ...icons]

  useEffect(() => {
    const marquee1 = marqueeRef1.current
    const marquee2 = marqueeRef2.current

    if (!marquee1 || !marquee2) return

    // Calculate width for seamless animation
    const marqueeWidth = marquee1.scrollWidth / 2

    // First marquee - left to right
    gsap.set(marquee1, { x: 0 })
    marquee1Animation.current = gsap.to(marquee1, {
      x: -marqueeWidth,
      duration: 20,
      ease: "none",
      repeat: -1,
    })

    // Second marquee - right to left (reversed)
    gsap.set(marquee2, { x: -marqueeWidth })
    marquee2Animation.current = gsap.to(marquee2, {
      x: 0,
      duration: 20,
      ease: "none",
      repeat: -1,
    })

    // Cleanup function
    return () => {
      gsap.killTweensOf([marquee1, marquee2])
    }
  }, [])


  const handleMarqueeHover = (isHovering) => {
    if (marquee1Animation.current && marquee2Animation.current) {
      if (isHovering) {
        // Slow down animations
        gsap.to([marquee1Animation.current, marquee2Animation.current], {
          timeScale: 0.3,
          duration: 0.5,
          ease: "power2.out"
        })
      } else {
        // Return to normal speed
        gsap.to([marquee1Animation.current, marquee2Animation.current], {
          timeScale: 1,
          duration: 0.5,
          ease: "power2.out"
        })
      }
    }
  }

  const TechIcon = ({ icon, index }) => (
    <div
      key={`${icon.name}-${index}`}
      className="flex-shrink-0 mx-8 flex flex-col items-center justify-center group"
    >
      <div className="relative w-16 h-10 md:w-20 md:h-16 transition-transform duration-300 scale-120 group-hover:scale-135">
        <Image
          src={icon.src}
          alt={icon.alt}
          fill
          className="object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
        />
      </div>
    </div>
  )

  // Animated gradient spots
  const GradientSpot = ({ delay = 0, size = 400, color = "blue", position = "center" }) => {
    const colors = {
      blue: "bg-blue-500/20",
      purple: "bg-purple-500/20",
      pink: "bg-pink-500/20",
      cyan: "bg-cyan-500/20",
      emerald: "bg-emerald-500/20",
      indigo: "bg-indigo-500/20",
      violet: "bg-violet-500/20",
      teal: "bg-teal-500/20"
    }

    // Set initial position based on the position prop
    let initialX, initialY;
    switch (position) {
      case "bottomRight":
        initialX = 500 + Math.random() * 550;
        initialY = 100 + Math.random() * 50;
        break;
      case "topLeft":
        initialX = -100 - Math.random() * 150;
        initialY = -100 - Math.random() * 150;
        break;
      case "bottomLeft":
        initialX = -100 - Math.random() * 150;
        initialY = 100 + Math.random() * 150;
        break;
      case "topRight":
        initialX = 100 + Math.random() * 150;
        initialY = -100 - Math.random() * 150;
        break;
      default:
        initialX = Math.random() * 200 - 100;
        initialY = Math.random() * 200 - 100;
    }

    return (
      <motion.div
        className={`absolute rounded-full blur-3xl ${colors[color]}`}
        style={{
          width: size,
          height: size,
        }}
        animate={{
          x: position === "bottomRight" ?
            [initialX, initialX - 120, initialX + 50, initialX - 80, initialX] :
            [initialX, initialX + 120, initialX - 50, initialX + 80, initialX],
          y: position === "bottomRight" ?
            [initialY, initialY - 100, initialY + 40, initialY - 60, initialY] :
            [initialY, initialY + 80, initialY - 60, initialY + 40, initialY],
          scale: [1, 1.2, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 15 + Math.random() * 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        }}
        initial={{
          x: initialX,
          y: initialY,
        }}
      />
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full py-8 overflow-hidden bg-transparent flex items-center justify-center"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Original spots */}
        <GradientSpot delay={0} size={300} color="blue" />
        <GradientSpot delay={2} size={250} color="purple" />
        <GradientSpot delay={4} size={350} color="pink" />
        <GradientSpot delay={6} size={200} color="cyan" />
        <GradientSpot delay={8} size={280} color="emerald" />
        <GradientSpot delay={10} size={320} color="blue" />
        <GradientSpot delay={1} size={150} color="purple" />
        <GradientSpot delay={3} size={180} color="pink" />
        <GradientSpot delay={5} size={160} color="cyan" />
        <GradientSpot delay={7} size={140} color="emerald" />

        {/* Bottom right spots */}
        <GradientSpot delay={2.5} size={280} color="indigo" position="bottomRight" />
        <GradientSpot delay={5.5} size={320} color="violet" position="bottomRight" />
        <GradientSpot delay={8.5} size={220} color="teal" position="bottomRight" />
        <GradientSpot delay={11.5} size={260} color="pink" position="bottomRight" />
        <GradientSpot delay={4.5} size={190} color="cyan" position="bottomRight" />
        <GradientSpot delay={7.5} size={230} color="emerald" position="bottomRight" />

        {/* Additional spots for better coverage */}
        <GradientSpot delay={3.5} size={210} color="blue" position="topRight" />
        <GradientSpot delay={6.5} size={240} color="purple" position="bottomLeft" />
        <GradientSpot delay={9.5} size={270} color="indigo" position="topLeft" />
      </div>

      {/* Dark overlay to control intensity */}
      <div className="absolute inset-0 bg-black/60 z-5" />

      {/* Marquee Area */}
      <div
        ref={marqueeAreaRef}
        className="absolute inset-0 flex flex-col justify-center z-10"
      >
        <h3 className="text-3xl md:text-5xl font-sans tracking-wide font-bold bg mb-5 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
          Technologies
        </h3>
        {/* First Marquee - Left to Right */}
        <div
          className="relative overflow-hidden mt-5 mb-3"
          onMouseEnter={() => handleMarqueeHover(true)}
          onMouseLeave={() => handleMarqueeHover(false)}
        >
          <div
            ref={marqueeRef1}
            className="flex items-center whitespace-nowrap"
            style={{ width: 'fit-content' }}
          >
            {Elements.map((icon, index) => (
              <TechIcon key={`row1-${index}`} icon={icon} index={index} />
            ))}
          </div>
        </div>

        {/* Second Marquee - Right to Left */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => handleMarqueeHover(true)}
          onMouseLeave={() => handleMarqueeHover(false)}
        >
          <div
            ref={marqueeRef2}
            className="flex items-center whitespace-nowrap"
            style={{ width: 'fit-content' }}
          >
            {Elements.map((icon, index) => (
              <TechIcon key={`row2-${index}`} icon={icon} index={index} />
            ))}
          </div>
        </div>

        {/* Default Heading Content */}
        <div
          ref={headingRef}
          className="relative flex flex-col justify-center bg-transparent mt-15"
        >
          <div className='flex flex-row absolute -mt-15'>
            <span className='absolute left-50 text-9xl blur-sm'> {`{ `}</span>
            <span className='absolute -right-190 text-9xl blur-sm'>{`} `}</span>
          </div>
          <p className="blur-[1px] text-gray-400 font-semibold font-sans tracking-wider text-lg text-center">
            Check out the technologies I work with
          </p>
        </div>
      </div>
    </div>
  )
}
