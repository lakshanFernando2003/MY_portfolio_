import React from 'react';
import TextPressure from './TextPressure';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaGlobe } from 'react-icons/fa';
import AnimateLamp from '../Section Lamps/AnimateLamp';

export default function Footer() {
  return (
    <div>
      <div className='bg-transparent text-white mt-20'>
          <div className='w-full border-t-1 border-b-1 border-neutral-700/60 mx-auto px-4 flex flex-col md:flex-row gap-8 py-8'>
          <div className='w-full md:w-4/8'>
            {/* TextPressure component */}
            <div style={{ height: '60px' }}> {/* Set a fixed height */}
              <TextPressure
                text="Lakshan"
                flex={false}
                alpha={false}
                stroke={true}
                width={true}
                weight={true}
                italic={false}
                textColor="#ffffff"
                strokeColor="#3B82F6"
                fixedFontSize={85}    // Use fixed size instead of minFontSize
                     // Reduce size factor for smaller text
              />
            </div>
          </div>

          <div className='w-full md:w-3/8 flex flex-col md:flex-row gap-0'>
            {/* Navigation Section */}
            <div className='flex-1'>
              <h3 className='text-sm font-semibold mb-2'>Navigation</h3>
              <ul className='space-y-1.5 text-sm'>
                <li><Link href="#home" className='text-gray-400 hover:text-white transition-colors'>Home</Link></li>
                <li><Link href="#about" className='text-gray-400 hover:text-white transition-colors'>About</Link></li>
                <li><Link href="#projects" className='text-gray-400 hover:text-white transition-colors'>Projects</Link></li>
                <li><Link href="#skills" className='text-gray-400 hover:text-white transition-colors'>Skills</Link></li>
                <li><Link href="#contact" className='text-gray-400 hover:text-white transition-colors'>Contact</Link></li>
              </ul>
            </div>

            {/* Achievements Section - Empty but allocated */}
            <div className='flex-1'>
              <h3 className='text-sm font-semibold mb-2'>Achievements</h3>
              <div className='text-gray-400 text-sm'>
                {/* Empty but allocated space */}
                <p>Coming soon</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className='flex-1'>
              <h3 className='text-sm font-semibold mb-2'>Contact</h3>
              <div className='space-y-1 text-sm'>
                <p className='text-gray-400 flex items-center gap-2'>
                  <FaEnvelope size={14} />
                  <a href="mailto:lakshanchanaka34@gmail.com" className=''>lakshanchanaka34@gmail.com</a>
                </p>
                <p className='text-gray-400 flex items-center gap-2'>
                  <FaGlobe size={14} />
                  <a href="https://lakshan.work" className=''>lakshan.work</a>
                </p>
              </div>

              {/* Social Media Links */}
              <div className='mt-20'>
                <div className='flex flex-row gap-3'>
                  <a href="https://github.com/lakshanFernando2003" target="_blank" rel="noopener noreferrer"
                     className='text-gray-400 hover:text-white transition-colors'>
                    <FaGithub size={16} />
                  </a>
                  <a href="www.linkedin.com/in/-lakshan-fernando" target="_blank" rel="noopener noreferrer"
                     className='text-gray-400 hover:text-white transition-colors'>
                    <FaLinkedin size={16} />
                  </a>
                  <a href="https://www.instagram.com/_laksh__an_/" target="_blank" rel="noopener noreferrer"
                     className='text-gray-400 hover:text-white transition-colors'>
                    <FaInstagram size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Position the lamp behind the content */}
          <div className="absolute inset-x-0 bottom-0 -z-10 overflow-hidden" style={{ height: '25rem' }}>
            <AnimateLamp
              enableStickyEffect={false}
              className="absolute bottom-[-100%]" // Position it so only top half is visible
              lightClassName=""
              beamClassName=""
              lightOpacity={0.2}
              lightBlur="blur-[48px]"
              lightColor="#0099FF"
              lightHeight='25rem'
              lightWidth='100vw'
              beamHeight='0px'
              lightGradient='radial-gradient(circle, rgba(0, 153, 255, 1) 0%, rgba(0, 153, 255, 0.17) 100%)'
              beamGradient='linear-gradient(90deg, rgba(0, 153, 255, 0) 0%, rgba(0, 153, 255, 0.4) 15%, rgba(0, 153, 255, 0.65) 30%, rgba(0, 153, 255, 0.8) 40%, rgba(0, 153, 255, 1) 50%, rgba(0, 153, 255, 0.8) 60%, rgba(0, 153, 255, 0.65) 70%, rgba(0, 153, 255, 0.4) 85%, rgba(0, 153, 255, 0) 100%)'
            />
          </div>

          {/* Copyright text on top of the lamp */}
          <div className="relative z-10 flex max-w-7xl mx-auto p-6 pb-8 justify-center items-center">
            <p className="text-center text-xs">© 2025 Lakshan. All rights reserved.</p>
          </div>
        </div>


      </div>
    </div>
  )
}
