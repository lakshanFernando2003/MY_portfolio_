import React from 'react'

function Lamp() {
  return (
     <div
      className="relative flex min-h-screen items-center justify-center
       overflow-visible  w-full rounded-md z-0 bg-transparent "
      >

      <div
      className="relative flex w-full flex-1 scale-y-125 items-center
       justify-center isolate z-0  "
      >

        <div className="lamp-Light absolute inset-auto z-50 h-[25rem] w-[55rem]
        rounded-[90%] bg-[#0099FF] opacity-30 blur-3xl scale-125 "></div>
        <div
          className="lamp-Beam absolute inset-auto z-50 h-[38px] w-[59rem] -translate-y-[7rem]"
        ></div>
      </div>
    </div>
  )
}

export default Lamp
