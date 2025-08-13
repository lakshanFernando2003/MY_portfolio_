import React, { useState } from 'react'
import { motion } from 'framer-motion';
import ReactiveOrb from '../HeroSection/ReactiveOrb';

export default function ContactMe() {
  // State for animated gradient position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse movement for interactive gradient
  // const handleMouseMove = (e) => {
  //   const { currentTarget, clientX, clientY } = e;
  //   const { left, top } = currentTarget.getBoundingClientRect();

  //   // Calculate relative position within the element
  //   const x = clientX - left;
  //   const y = clientY - top;
  //   setMousePosition({ x, y });
  // };

  return (
    <div>
      <div className='relative z-40 mt-3 sm:mt-4 md:mt-5 overflow-hidden'>
        <h2 className="text-[2.5rem] sm:text-[3rem] md:text-[7rem] lg:text-[10rem] xl:text-[12.5rem]
          font-semibold text-center font-mono whitespace-nowrap
          opacity-15 pointer-events-none -mb-5 sm:-mb-10 md:-mb-15 lg:-mb-20
          inline-block text-transparent bg-clip-text w-full"
          style={{
            backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,1) 5%, rgba(255,255,255,0.05) 60%)'
          }}
        >
          LET'S CONNECT
        </h2>

        <div className='flex justify-center items-center'>
          <div className='contact-container border-t-1 max-w-8xl border-neutral-700/60 rounded-t-4xl bg-transparent backdrop-blur-md shadow-lg'>
            <div className="max-w-7xl mx-auto px-2 sm:px-4 pb-3 sm:pb-5 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5 mt-2 sm:mt-4">
            {/* First Grid Box - Contact Form with animated gradient */}
            <motion.div
              className="relative overflow-hidden backdrop-blur-md p-4 sm:p-8 rounded-xl border border-neutral-700/50 shadow-lg"
              // onMouseMove={handleMouseMove}
              initial={{ backgroundColor: "rgba(38, 38, 38, 0.4)" }}
              whileHover={{
                transition: { duration: 0.3 }
              }}
            >
              {/* Animated radial gradient background */}
              <motion.div
                className="absolute inset-0 z-0 opacity-30"
                animate={{
                  background: [
                    `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.7) 0%, rgba(79, 70, 229, 0.6) 20%, rgba(30, 30, 35, 0) 70%)`,
                    `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.7) 0%, rgba(79, 70, 229, 0.6) 20%, rgba(30, 30, 35, 0) 70%)`
                  ]
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />

              {/* Ambient floating orbs */}
              <motion.div
                className="absolute w-20 sm:w-32 h-20 sm:h-32 rounded-full bg-blue-500/10 blur-2xl"
                animate={{
                  x: [0, 10, 0],
                  y: [0, -10, 0],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                style={{ top: '20%', left: '10%' }}
              />

              <motion.div
                className="absolute w-16 sm:w-24 h-16 sm:h-24 rounded-full bg-indigo-500/10 blur-2xl"
                animate={{
                  x: [0, -15, 0],
                  y: [0, 15, 0],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                style={{ bottom: '15%', right: '10%' }}
              />

              <div className="relative z-10"> {/* Container to keep content above gradient */}
                <h3 className="text-base sm:text-[1.2rem] font-semibold mb-3 sm:mb-6">Connect with me</h3>

                <form className="space-y-2 sm:space-y-4">
                  {/* Name Fields - Two Columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-neutral-700/40 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="First Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-neutral-700/40 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>

                  {/* Contact Information - Email and Phone on same line */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <div className="flex-1">
                      <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-neutral-700/40 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="flex-1">
                      <label htmlFor="phone" className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Phone (optional)</label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-neutral-700/40 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="+1 (123) 456-7890"
                      />
                    </div>
                  </div>

                  {/* Requirements Section */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-3">Your Requirement</label>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      <label className="relative inline-flex items-center">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                        />
                        <div className="cursor-pointer px-2 sm:px-4 py-1 sm:py-2 rounded-full bg-neutral-700/30 border border-neutral-600 peer-checked:bg-blue-600/70 peer-checked:border-blue-500 transition-all duration-200 text-xs sm:text-sm">
                          Website
                        </div>
                      </label>

                      <label className="relative inline-flex items-center">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                        />
                        <div className="cursor-pointer px-2 sm:px-4 py-1 sm:py-2 rounded-full bg-neutral-700/30 border border-neutral-600 peer-checked:bg-blue-600/70 peer-checked:border-blue-500 transition-all duration-200 text-xs sm:text-sm">
                          Mobile App
                        </div>
                      </label>

                      <label className="relative inline-flex items-center">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                        />
                        <div className="cursor-pointer px-2 sm:px-4 py-1 sm:py-2 rounded-full bg-neutral-700/30 border border-neutral-600 peer-checked:bg-blue-600/70 peer-checked:border-blue-500 transition-all duration-200 text-xs sm:text-sm">
                          Video Editing
                        </div>
                      </label>

                      <label className="relative inline-flex items-center">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                        />
                        <div className="cursor-pointer px-2 sm:px-4 py-1 sm:py-2 rounded-full bg-neutral-700/30 border border-neutral-600 peer-checked:bg-blue-600/70 peer-checked:border-blue-500 transition-all duration-200 text-xs sm:text-sm">
                          Other
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Text Area */}
                  <div>
                    <label htmlFor="message" className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">How can I help you?</label>
                    <textarea
                      id="message"
                      rows="4"
                      className="w-full h-16 sm:h-20 px-3 sm:px-4 py-2 sm:py-3 bg-neutral-700/40 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                      placeholder="Tell me about your project..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium text-xs sm:text-sm rounded-md transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Second Grid Box - Only visible on md screens and up */}
            <div className="hidden md:block bg-transparent backdrop-blur-md p-8 rounded-xl border border-neutral-700/50 shadow-lg">
              {/* Empty box - will be filled by user later */}
              {/* <div className='reactive-Orb-container relative w-full h-screen z-[1]'>
                  <ReactiveOrb/>
                </div> */}
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
