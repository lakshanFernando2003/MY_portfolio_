import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import AnimateLamp from "../Section Lamps/AnimateLamp";
import "../MediaQuery/largeScreen.css";
import "../MediaQuery/SmallScreen.css"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { FaExternalLinkAlt } from 'react-icons/fa';
import BentoCard from "../About/BentoCard";
import BubbleBackground from '../Animations/BubbleBackground';

gsap.registerPlugin(ScrollTrigger);

// Web Projects data array - replacing with the provided project details
const webProjects = [

  {
    id: 1,
    type: "web",
    language: "React",
    name: "Centralized Competition Platform",
    description: "Online platform for students, organizers and companies to host, discover, track, and manage IT hackathons with automatic portfolio generation.",
    source: "#",
    bgColor: "bg-purple-500/20",
    textColor: "text-purple-400",
    bgImage: "/images/projects/Skillforge.png",
    highlight: "Competition"
  },
  {
    id: 2,
    type: "web",
    language: "React",
    name: "Real Estate Marketplace",
    description: "Online platform for selling and renting real-estate with advanced search functionality, Google Maps API integration, and robust security measures.",
    source: "#",
    bgColor: "bg-green-500/20",
    textColor: "text-green-400",
    bgImage: "/images/projects/Renthouse.png",
    highlight: "Estate"
  },
  {
    id: 3,
    type: "web",
    language: "Html",
    name: "UNSDG Green Constructions",
    description: "Platform promoting sustainable inventions and providing newsletters with trends and guides for environmentally friendly construction practices.",
    source: "#",
    bgColor: "bg-amber-500/20",
    textColor: "text-amber-400",
    bgImage: "/images/projects/GreenCity.png",
    highlight: "Green"
  }
];

// Other Projects data array with provided data
const otherProjects = [
  {
    id: 1,
    type: "desktop",
    language: "Python",
    name: "Student-progression-system",
    description: "A simple python project. This project is about Students progression monitoring System.",
    source: "https://github.com/lakshanFernando2003/Student-progression-system.git",
    bgColor: "bg-teal-500/20",
    textColor: "text-teal-400",
    bgImage: "/images/projects/python-bg.png"
  },
  {
    id: 2,
    type: "desktop",
    language: "Java",
    name: "Plane-Ticket-purchasing-System",
    description: "This is my first java project done based on a air ticket buying system.",
    source: "https://github.com/lakshanFernando2003/Plane-Ticket-purchasing-System.git",
    bgColor: "bg-orange-500/20",
    textColor: "text-orange-400",
    bgImage: "/images/projects/airline_ticketing_system_software.jpg"
  },
  {
    id: 3,
    type: "mobile",
    language: "Kotlin",
    name: "Dice Game",
    description: "This is my first mobile project done with kotlin to gain experience and assist a colleague in their assignment.",
    source: "",
    bgColor: "bg-red-500/20",
    textColor: "text-red-400",
    bgImage: "/images/projects/DiceGAme.webp"
  },
  {
    id: 4,
    type: "api",
    language: "Java",
    name: "BookStore Application API",
    description: "A BookStore that containes eBooks which can be purchased by customers.",
    source: "https://github.com/lakshanFernando2003",
    bgColor: "bg-cyan-500/20",
    textColor: "text-cyan-400",
    bgImage: "/images/projects/BookStore.jpeg"
  }
];

// Bubble Background Component for horizontal section
// const BubblesBackground = ({ count = 20 }) => {
//   const [bubbles, setBubbles] = useState([]);

//   useEffect(() => {
//     // Generate random bubbles on component mount
//     const newBubbles = Array.from({ length: count }).map((_, i) => ({
//       id: i,
//       x: Math.random() * 100, // random x position (%)
//       y: Math.random() * 100, // random y position (%)
//       size: Math.random() * 60 + 20, // random size between 20-80px
//       duration: Math.random() * 20 + 10, // animation duration between 10-30s
//       delay: Math.random() * 5, // random delay for animation start
//     }));

//     setBubbles(newBubbles);
//   }, [count]);

//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
//       {bubbles.map(bubble => (
//         <motion.div
//           key={bubble.id}
//           className="absolute rounded-full bg-amber-400/10 backdrop-blur-sm border border-amber-400/30"
//           style={{
//             left: `${bubble.x}%`,
//             top: `${bubble.y}%`,
//             width: bubble.size,
//             height: bubble.size,
//           }}
//           initial={{ opacity: 0, scale: 0 }}
//           animate={{
//             opacity: [0.1, 0.3, 0.1],
//             scale: [1, 1.2, 1],
//             x: [0, bubble.size * (Math.random() > 0.5 ? 1 : -1), 0],
//             y: [0, bubble.size * (Math.random() > 0.5 ? 1 : -1), 0],
//           }}
//           transition={{
//             duration: bubble.duration,
//             repeat: Infinity,
//             delay: bubble.delay,
//             ease: "easeInOut",
//           }}
//         />
//       ))}
//     </div>
//   );
// };

export default function ProjectSection() {
  const sectionEndRef = useRef(null);
  const projectContainerRef = useRef(null);
  const headingRef = useRef(null);
  const projectComponentRef = useRef(null);
  const horizontalRef = useRef(null);
  const projectsRef = useRef(null);

  useLayoutEffect(() => {
    // Animation for container expansion
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top top", // Start when heading reaches top of viewport
        end: "+=1200 center", // End animation 1200px after start
        scrub: 1.5, // Smoother scrubbing for better visual effect
        pin: "#project-container",
        pinSpacing: true,
        markers: false, // Disable markers for production
        anticipatePin: 1,
      },
    });

   // Animate the container expansion and rotation normalization final <- don't change
    clipAnimation
      .to(".project-animated-component", {
        width: "80vw", // Intermediate step for smoother expansion
        height: "80vh",
        borderRadius: "20px",
        transform: "perspective(700px) rotateX(3deg) rotateY(-5deg)", // Partial straightening
        ease: "none",
      }, 0)
      .to(".project-animated-component", {
        width: "100vw",
        height: "80vh",
        borderRadius: 0,
        transform: "perspective(700px) rotateX(0deg) rotateY(0deg)", // Fully straight at end
        ease: "none",
      }, 0.5); // Start halfway through the animation

    // Horizontal scrolling animation for projects section
    const horizontalAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: horizontalRef.current,
        start: "top top",
        end: () => `+=${horizontalRef.current.offsetWidth}`,
        scrub: 1.5,
        pin: true,
        anticipatePin: 1,
        markers: false, // Disable markers for production
      }
    });

    horizontalAnimation.to(projectsRef.current, {
      x: () => -(projectsRef.current.offsetWidth - window.innerWidth),
      ease: "none",
    });

    // Animate each project card as it comes into view
    gsap.utils.toArray(".project-card").forEach((card, i) => {
      const videoBox = card.querySelector(".project-vidbox");
      const info = card.querySelector(".project-info");

      gsap.timeline({
        scrollTrigger: {
          trigger: card,
          containerAnimation: horizontalAnimation,
          start: "left center",
          end: "right center",
          scrub: true,
        }
      })
      .fromTo(videoBox,
        { filter: "blur(5px)", scale: 0.9 },
        { filter: "blur(0px)", scale: 1, duration: 0.5 })
      .fromTo(info,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 },
        "-=0.3");
    });

    return () => {
      // Clean up ScrollTrigger when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Helper function to get GitHub icon or coming soon badge
  const getSourceElement = (project) => {
    if (project.source) {
      return (
        <a href={project.source} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:underline flex items-center gap-2">
          View on GitHub
          <FaExternalLinkAlt className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      );
    } else {
      return (
        <span className="text-sm text-amber-400 flex items-center gap-2">
          Coming Soon
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
      );
    }
  };

  const projects = [
    {
      id: 1,
      title: "Skill Forge Marketing Webpage",
      highlight: "Forge",
      description: "Dynamic marketing webpage built with Next.js, TypeScript and Framer Motion, delivering engaging interactive user experiences and animations.",
      image: "/images/projects/skillfirgemarketing.png",
      comingSoon: false
    },
    {
      id: 2,
      title: "Centralized Competition Platform",
      highlight: "Competition",
      description: "Online platform for students, organizers and companies to host, discover, track, and manage IT hackathons with automatic portfolio generation.",
      image: "/images/projects/Skillforge.png",
      comingSoon: true
    },
    // {
    //   id: 3,
    //   title: "Real Estate Marketplace",
    //   highlight: "Estate",
    //   description: "Online platform for selling and renting real-estate with advanced search functionality, Google Maps API integration, and robust security measures.",
    //   image: "/images/projects/Renthouse.png",
    //   comingSoon: true
    // },
    // {
    //   id: 4,
    //   title: "UNSDG Green Constructions",
    //   highlight: "Green",
    //   description: "Platform promoting sustainable inventions and providing newsletters with trends and guides for environmentally friendly construction practices.",
    //   image: "/images/projects/GreenCity.png",
    //   comingSoon: true
    // }
  ];

  return (
    <div className='bg-neutral-950 w-full min-h-screen' id="projects">
      <div className="w-full h-[30vh] overflow-hidden">
        {/* Section lamp Header */}
        <AnimateLamp
          className="m-1 z-10"
          lightClassName="Project-Lamp"
          beamClassName="Project-Lamp-beam"
          lightColor="#E1B800"
          lightGradient="radial-gradient(circle,rgba(225, 184, 0, 1) 0%, rgba(225, 184, 0, 0.17) 100%)"
          beamGradient="linear-gradient(90deg,rgba(225, 184, 0, 0) 0%, rgba(225, 184, 0, 0.4) 15%, rgba(225, 184, 0, 0.65) 30%, rgba(225, 184, 0, 0.8) 40%, rgba(225, 184, 0, 1) 50%, rgba(225, 184, 0, 0.8) 60%, rgba(225, 184, 0, 0.65) 70%, rgba(225, 184, 0, 0.4) 85%, rgba(225, 184, 0, 0) 100%)"
          lightOpacity={0.5}
          lightBlur="blur-[48px]"
          enableStickyEffect={true}
          endTarget={sectionEndRef}
        />
      </div>

      <div className="Projects-Section relative mb-8 -mt-10 flex flex-col items-center gap-5">
        <h2 className="relative pointer-events-none bg-clip-text inline-block font-semibold antialiased tracking-wide font-mono uppercase text-white">
          My Projects
        </h2>

        <h1
          ref={headingRef}
          id="project-heading"
          className="relative pointer-events-none bg-clip-text text-4xl md:text-5xl lg:text-6xl text-center inline-block font-semibold antialiased tracking-tighter"
        >
          Explore My <span className="text-blue-400">Creative</span> <br />
          Development <span className="text-blue-400">Portfolio</span>
        </h1>

        <div className="text-center max-w-3xl mx-auto px-4">
          <p className="relative pointer-events-none text-[1.2rem] opacity-70 z-50 bg-clip-text inline-block antialiased">A showcase of my technical projects and solutions</p>
          <p className="relative pointer-events-none text-[1.2rem] opacity-70 z-50 bg-clip-text inline-block antialiased">
            Featuring web applications, interactive experiences, and software development work
          </p>
        </div>
      </div>

      <div className="h-[50vh] sm:h-[50vh] md:h-[80vh] w-screen z-20" id="project-container" ref={projectContainerRef}>
        <div
          ref={projectComponentRef}
          className="project-animated-component bg-neutral-800 w-[600px] h-[600px] mx-auto rounded-lg overflow-hidden relative "
          style={{
            transform: "perspective(700px) rotateX(5deg) rotateY(-10deg)", // Initial slant position
            backgroundImage: "url('/project-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="project-background-container absolute inset-0 w-full h-full overflow-hidden ">
              <Image
                src="/images/inspired.png"
                alt="Project Background"
                layout="fill"
                objectFit="cover"
                className="project-background-image absolute inset-0 object-cover opacity-50 transition-transform duration-700 "
                priority
              />

              {/* Dark gradient overlay to improve text contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50 z-10"></div>
            </div>

        </div>
      </div>


      <div ref={horizontalRef} className="w-full h-auto flex flex-col justify-center items-center text-white pt-8 relative z-20 ">
          {/* Add the bubbles background */}
          {/* <BubblesBackground count={30} /> */}
            {/* Add the advanced bubbles background */}
               <BubbleBackground
                  count={35}
                  color="amber"
                  intensity="veryStrong"
                  interactive={true}
                  colorChangeInterval={5000}
                  mouseAreaRadius={300}
                  showMouseArea={false}
                  globalMovementFactor={1}  // Adjust global movement strength (0 to disable)
                  randomMovement={true}       // Enable/disable random floating animation
                />

          <div className="relative mt-14 text-center">
            <h2 className=" relative text-4xl uppercase tracking-wider font-semibold mb-3 font-mono z-20 translate-y-[2rem]">Recent Work</h2>
          </div>

          {/* Horizontal scrolling projects section */}
          <div className="border-0 project-card-container relative w-full bg-transparent backdrop-blur-sm overflow-hidden  p-1 z-10">
            <div ref={projectsRef} className="flex items-center justify-start gap-12 py-6" style={{ width: `${projects.length * 100 + 60}vw ` }}>
              {projects.map((project, index) => (
                <div key={project.id} className=" border-0 project-card min-h-[600px] flex flex-col md:flex-row items-center justify-center gap-8 px-8 mx-auto">
                  <div className="project-vidbox w-[600px] h-[380px] relative overflow-hidden rounded-2xl group flex-shrink-0">
                    <div className="w-full h-full bg-neutral-800 shadow-lg shadow-blue-500/10 rounded-2xl overflow-hidden">
                      <div className="relative w-full h-full">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 600px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70"></div>

                        {/* Coming Soon Badge */}
                        {project.comingSoon && (
                          <div className="absolute top-4 right-4 bg-amber-500/80 text-black font-semibold px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                            Coming Soon
                          </div>
                        )}

                        <div className="hover-sign absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-16 h-16 bg-blue-500/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l5-5m0 0l-5-5m5 5H4" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="project-info w-full md:w-2/5 p-6">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                      {project.title.split(project.highlight).map((part, i, arr) =>
                        i === 0 ? (
                          <span key={i}>{part}<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{project.highlight}</span></span>
                        ) : (
                          <span key={i}>{part}</span>
                        )
                      )}
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 leading-relaxed">{project.description}</p>
                    <a
                      href="#"
                      className={`flex items-center gap-2 w-fit px-8 py-4 rounded-lg ${
                        project.comingSoon
                          ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
                          : 'bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20'
                      } transition-all duration-300 group`}
                    >
                      <span className="text-lg">{project.comingSoon ? 'Coming Soon' : 'View Project'}</span>
                      {project.comingSoon ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <FaExternalLinkAlt className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
                      )}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      <div className="relative w-full py-10 px-6 md:px-12 bg-neutral-950">
          {/* Web Projects Section */}
          <div className="max-w-[100rem] mx-auto mb-16">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold text-white">Web Projects</h2>
              <a href="#" className="group flex items-center gap-2 text-white hover:text-amber-400 transition-colors">
                <span>All web projects</span>
                <FaExternalLinkAlt className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-10">
              {webProjects.map((project) => (
                <BentoCard
                  key={project.id}
                  className={`bg-neutral-800/50 h-[300px] p-6 backdrop-blur-sm border border-neutral-700/30 transition-all duration-300 hover:border-${project.textColor.split('-')[1]}-500/50 hover:shadow-md hover:shadow-${project.textColor.split('-')[1]}-500/10 relative overflow-hidden`}
                >
                  {/* Add background image with overlay */}
                  <div className="absolute inset-0 -z-10">
                    <Image
                      src={project.bgImage}
                      alt={project.name}
                      fill
                      className="object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/90 to-neutral-800/70"></div>
                  </div>

                  <div className="flex flex-col h-full relative">
                    <div className="mb-4">
                      <span className={`${project.bgColor} ${project.textColor} text-xs px-2 py-1 rounded`}>
                        {project.language}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                    <p className="text-gray-400 text-sm flex-grow">{project.description}</p>
                    <div className="mt-auto pt-4">
                      <a href={project.source} className="text-sm text-blue-400 hover:underline flex items-center gap-2">
                        View details
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </BentoCard>
              ))}
            </div>
          </div>

          {/* Other Projects Section */}
          <div className="max-w-[95rem] mx-auto z-60">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold text-white">Other Projects</h2>
              <a href="#" className="group flex items-center gap-2 text-white hover:text-amber-400 transition-colors">
                <span>All projects</span>
                <FaExternalLinkAlt className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 z-10">
              {otherProjects.map((project) => (
                <BentoCard
                  key={project.id}
                  className={`bg-neutral-800/50 h-[250px] p-6 backdrop-blur-sm border border-neutral-700/30 transition-all duration-300 hover:border-${project.textColor.split('-')[1]}-500/50 hover:shadow-sm hover:shadow-${project.textColor.split('-')[1]}-500/20 relative overflow-hidden`}
                >
                  {/* Add background image with overlay */}
                  <div className="absolute inset-0 -z-10">
                    <Image
                      src={project.bgImage}
                      alt={project.name}
                      fill
                      className="object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/90 to-neutral-800/70"></div>
                  </div>

                  <div className="flex flex-col h-full relative ">
                    <div className="mb-4 flex justify-between items-center">
                      <span className={`${project.bgColor} ${project.textColor} text-xs px-2 py-1 rounded`}>
                        {project.language}
                      </span>
                      <span className="bg-gray-700/30 text-gray-300 text-xs px-2 py-1 rounded capitalize">
                        {project.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                    <p className="text-gray-400 text-sm flex-grow">{project.description}</p>
                    <div className="mt-auto pt-4">
                      {getSourceElement(project)}
                    </div>
                  </div>
                </BentoCard>
              ))}
            </div>
          </div>
        </div>

      <div className='-translate-y-30' ref={sectionEndRef}></div>
    </div>
  );
}
