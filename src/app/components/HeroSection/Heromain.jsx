import React, { useRef } from 'react'
import Lamp from './Herolamp'
import AnimateLamp from '../Section Lamps/AnimateLamp';
import Midlapm from './lamp'
import ReactiveOrb from './ReactiveOrb';
import ImageBox from './imageBox';
import HeroText from './HeroTextAnimation';
import '../MediaQuery/largeScreen.css';


export default function Heromain() {

  const sectionEndRef = useRef(null);

  return (
    <>
      <div>
        <Lamp/>
          <AnimateLamp
              enableStickyEffect={false}
              lightOpacity={1}
              lightColor="#0099FF"
              lightHeight='5rem'
              lightGradient='radial-gradient(circle, rgba(0, 153, 255, 1) 0%, rgba(0, 153, 255, 0.17) 100%)'
              beamGradient='linear-gradient(90deg, rgba(0, 153, 255, 0) 0%, rgba(0, 153, 255, 0.4) 15%, rgba(0, 153, 255, 0.65) 30%, rgba(0, 153, 255, 0.8) 40%, rgba(0, 153, 255, 1) 50%, rgba(0, 153, 255, 0.8) 60%, rgba(0, 153, 255, 0.65) 70%, rgba(0, 153, 255, 0.4) 85%, rgba(0, 153, 255, 0) 100%)'
              containerPosition='Animate-Hero-Lamp'
            />
      </div>
      <div className=' relative flex items-center justify-center pointer-events-none '>
            <h3 className='Hero-text z-50 bg-gradient-to-r from-[#AAFFFF] via-[#0099FF] to-[#0066CC] text-transparent   bg-clip-text inline-block font-semibold antialiased tracking-wide font-mono text-[1rem]'>
            Software Engineer
            </h3>
      </div>

      <div className='Hero-text-container relative items-center justify-center w-full pointer-events-none z-10 '>
        <HeroText/>
      </div>

        <div className='reactive-Orb-container relative w-full h-screen z-[1]'>
          <ReactiveOrb/>
        </div>

      <div className='Lamp-container'>
          <div className='Mid-Lamp relative flex items-center justify-center z-[2] '>
            <Midlapm/>
          </div>
          <AnimateLamp
              enableStickyEffect={true}
              endTarget={sectionEndRef}
              lightOpacity={0.4}
              lightColor="#0099FF"
              lightHeight='8rem'
              beamHeight='0px'
              lightGradient='radial-gradient(circle, rgba(0, 153, 255, 1) 0%, rgba(0, 153, 255, 0.17) 100%)'
              beamGradient='linear-gradient(90deg, rgba(0, 153, 255, 0) 0%, rgba(0, 153, 255, 0.4) 15%, rgba(0, 153, 255, 0.65) 30%, rgba(0, 153, 255, 0.8) 40%, rgba(0, 153, 255, 1) 50%, rgba(0, 153, 255, 0.8) 60%, rgba(0, 153, 255, 0.65) 70%, rgba(0, 153, 255, 0.4) 85%, rgba(0, 153, 255, 0) 100%)'
              containerPosition='Animate-Mid-Lamp'
            />
          <div className='Image-Box z-[-2] relative flex items-center justify-center '>
            <ImageBox/>
          </div>
      </div>

      <div ref={sectionEndRef}></div>
    </>
  )
}
