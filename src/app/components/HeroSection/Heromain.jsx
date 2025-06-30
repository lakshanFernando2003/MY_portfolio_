import React from 'react'
import Lamp from './Herolamp'
import Midlapm from './lamp'
import ReactiveOrb from './ReactiveOrb';
import Image from 'next/image';
import ImageBox from './imageBox';
import '../MediaQuery/largeScreen.css';


export default function Heromain() {
  return (
    <>
      <div>
        <Lamp/>
      </div>
      <div className=' relative flex items-center justify-center pointer-events-none '>
            <h3 className='Hero-text z-50 bg-gradient-to-r from-[#AAFFFF] via-[#0099FF] to-[#0066CC] text-transparent   bg-clip-text inline-block font-semibold antialiased tracking-wide font-mono text-[1rem]'>
            Software Engineer
            </h3>
      </div>

      <div className='Hero-text-container relative flex justify-center items-center w-full h-full object-cover pointer-events-none z-50'>
        <h1 className='Hero-text-main font-anton tracking-tight antialiased text-shadow-sm [text-shadow:_0_0_1px_rgba(255,255,255,0.6)] [-webkit-text-stroke:_1px_rgba(255,255,255,0.6)]'>PORTFOLIO</h1>
      </div>

        <div className='reactive-Orb-container relative w-full h-screen'>
          <ReactiveOrb/>
        </div>
      <div className='Lamp-container'>
          <div className='Mid-Lamp relative flex items-center justify-center z-[2] '>
            <Midlapm/>
          </div>
          <div className='Image-Box z-[-2] relative flex items-center justify-center '>
            <ImageBox/>
          </div>
      </div>
    </>
  )
}
