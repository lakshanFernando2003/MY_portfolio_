import React, { useRef, useLayoutEffect } from "react";
import AnimateLamp from "../Section Lamps/AnimateLamp";
import "../MediaQuery/largeScreen.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { FaExternalLinkAlt } from 'react-icons/fa';
import BentoCard from "../About/BentoCard";

gsap.registerPlugin(ScrollTrigger);

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

  const projects = [
    {
      id: 1,
      title: "Animated Gaming Website",
      highlight: "Gaming",
      description: "A dynamic website featuring WebGL animations, responsive design, and immersive user interactions for a gaming studio showcase.",
      image: "/project-1.jpg"
    },
    {
      id: 2,
      title: "Modern Portfolio Website",
      highlight: "Portfolio",
      description: "A minimalist yet feature-rich portfolio designed for creatives with interactive elements and optimized performance metrics.",
      image: "/project-2.jpg"
    },
    {
      id: 3,
      title: "Movie Landing Page",
      highlight: "Landing",
      description: "A cinematic landing page with parallax effects, video integration, and audience engagement features for film promotion.",
      image: "/project-3.jpg"
    },
    {
      id: 4,
      title: "E-commerce Platform",
      highlight: "Commerce",
      description: "A full-featured online store with cart functionality, payment processing, and responsive product galleries for an optimal shopping experience.",
      image: "/project-4.jpg"
    }
  ];

  return (
    <div className='bg-neutral-900 w-full min-h-screen' id="projects">
      <div className="w-full h-[30vh] overflow-hidden">
        {/* Section lamp Header */}
        <AnimateLamp
          className="m-1 "
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

      <div className="h-[80vh] w-screen" id="project-container" ref={projectContainerRef}>
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


      <div ref={horizontalRef} className="w-full h-auto flex flex-col justify-center items-center text-white pt-8 ">
          <div className="mt-14 text-center">
            <h2 className="text-4xl uppercase tracking-wider font-semibold mb-3 font-mono">Recent Work</h2>
          </div>

          {/* Horizontal scrolling projects section */}
          <div  className="project-card-container  relative w-full overflow-hidden backdrop-blur-md bg-neutral-950/40 p-1  ">
            <div ref={projectsRef} className="flex items-center justify-start gap-12 py-6" style={{ width: `${projects.length * 100 + 60}vw ` }}>
              {projects.map((project, index) => (
                <div key={project.id} className="project-card min-h-[600px] flex flex-col md:flex-row items-center justify-center gap-8 px-8 mx-auto">
                  <div className="project-vidbox w-full md:w-3/5 relative overflow-hidden rounded-2xl group">
                    <div className="aspect-[16/10] bg-neutral-800 shadow-lg shadow-blue-500/10 rounded-2xl overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={1200}
                        height={750}
                        className="object-cover w-full h-full rounded-2xl transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70"></div>
                      <div className="hover-sign absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-16 h-16 bg-blue-500/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l5-5m0 0l-5-5m5 5H4" />
                          </svg>
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
                    <a href="#" className="flex items-center gap-2 w-fit px-8 py-4 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition-all duration-300 group">
                      <span className="text-lg">View Project</span>
                      <FaExternalLinkAlt className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> 

        <div className="w-full py-10 px-6 md:px-12 bg-neutral-950">
          {/* Web Projects Section */}
          <div className="max-w-7xl mx-auto mb-16">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold text-white">Web Projects</h2>
              <a href="#" className="group flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                <span>All web projects</span>
                <FaExternalLinkAlt className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Web Project Card 1 */}
              <BentoCard className="bg-neutral-800/50 h-[300px] p-6 backdrop-blur-sm border border-neutral-700/30">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded">React</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">E-commerce Platform</h3>
                  <p className="text-gray-400 text-sm flex-grow">Modern shopping experience with cart functionality and responsive design.</p>
                  <div className="mt-auto pt-4">
                    <a href="#" className="text-sm text-blue-400 hover:underline flex items-center gap-2">
                      View details
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </BentoCard>

              {/* Web Project Card 2 */}
              <BentoCard className="bg-neutral-800/50 h-[300px] p-6 backdrop-blur-sm border border-neutral-700/30">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded">Next.js</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Portfolio Website</h3>
                  <p className="text-gray-400 text-sm flex-grow">Interactive portfolio with animations and advanced UI effects.</p>
                  <div className="mt-auto pt-4">
                    <a href="#" className="text-sm text-blue-400 hover:underline flex items-center gap-2">
                      View details
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </BentoCard>

              {/* Web Project Card 3 */}
              <BentoCard className="bg-neutral-800/50 h-[300px] p-6 backdrop-blur-sm border border-neutral-700/30">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">Vue.js</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Dashboard Application</h3>
                  <p className="text-gray-400 text-sm flex-grow">Data visualization and analytics dashboard with real-time updates.</p>
                  <div className="mt-auto pt-4">
                    <a href="#" className="text-sm text-blue-400 hover:underline flex items-center gap-2">
                      View details
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </BentoCard>
            </div>
          </div>

          {/* Other Projects Section */}
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold text-white">Other Projects</h2>
              <a href="#" className="group flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                <span>All projects</span>
                <FaExternalLinkAlt className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Other Project Card 1 */}
              <BentoCard className="bg-neutral-800/50 h-[250px] p-6 backdrop-blur-sm border border-neutral-700/30">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded">Mobile</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Fitness App</h3>
                  <p className="text-gray-400 text-sm flex-grow">Workout tracking and health monitoring for mobile devices.</p>
                  <div className="mt-auto pt-4">
                    <a href="#" className="text-sm text-blue-400 hover:underline flex items-center gap-2">
                      View details
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </BentoCard>

              {/* Other Project Card 2 */}
              <BentoCard className="bg-neutral-800/50 h-[250px] p-6 backdrop-blur-sm border border-neutral-700/30">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded">Game</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Puzzle Game</h3>
                  <p className="text-gray-400 text-sm flex-grow">Browser-based puzzle game with progressive difficulty.</p>
                  <div className="mt-auto pt-4">
                    <a href="#" className="text-sm text-blue-400 hover:underline flex items-center gap-2">
                      View details
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </BentoCard>

              {/* Other Project Card 3 */}
              <BentoCard className="bg-neutral-800/50 h-[250px] p-6 backdrop-blur-sm border border-neutral-700/30">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <span className="bg-indigo-500/20 text-indigo-400 text-xs px-2 py-1 rounded">Desktop</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Productivity Tool</h3>
                  <p className="text-gray-400 text-sm flex-grow">Task management and time tracking desktop application.</p>
                  <div className="mt-auto pt-4">
                    <a href="#" className="text-sm text-blue-400 hover:underline flex items-center gap-2">
                      View details
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </BentoCard>

              {/* Other Project Card 4 */}
              <BentoCard className="bg-neutral-800/50 h-[250px] p-6 backdrop-blur-sm border border-neutral-700/30">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <span className="bg-cyan-500/20 text-cyan-400 text-xs px-2 py-1 rounded">API</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">REST API Service</h3>
                  <p className="text-gray-400 text-sm flex-grow">Backend service with authentication and data management.</p>
                  <div className="mt-auto pt-4">
                    <a href="#" className="text-sm text-blue-400 hover:underline flex items-center gap-2">
                      View details
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </BentoCard>
            </div>
          </div>
        </div>

      <div ref={sectionEndRef}></div>
    </div>
  );
}
