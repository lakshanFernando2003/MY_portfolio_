import React, { useRef } from 'react'
import AnimateLamp from './AnimateLamp'

export default function Lampcontainer() {
  // Create refs for the section boundaries
  const sectionEndRef = useRef(null);

  return (
    <>

    <div className='border-2 h-screen relative flex items-center justify-center w-full '>
      <AnimateLamp
      enableStickyEffect={true}
      endTarget={sectionEndRef}
      lightColor="#FF00FF"
      containerPosition='mt-[-50rem] border-2'
    />
    </div>

    {/* <div className='w-full h-80' />
    <div className='w-full h-80' /> */}
    {/* Other content */}
    <div ref={sectionEndRef}>This is where the sticky effect ends</div>


  </>
  )
}
