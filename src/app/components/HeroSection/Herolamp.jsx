import React from 'react'
import '../MediaQuery/largeScreen.css';

function Herolamp() {
  return (
    <div
      className="Hero-lamp relative flex min-h-screen flex-col items-center justify-center
       overflow-hidden  w-full rounded-md z-10 bg-transparent "
      >

      <div
      className="relative flex w-full flex-1 scale-y-125 items-center
       justify-center isolate z-0 "
      >

        <div className="absolute inset-auto z-50 h-[16rem] w-[58rem]
        rounded-[90%] bg-[#0099FF] opacity-50 blur-3xl scale-125 "></div>
        <div
          className="absolute inset-auto z-50 h-5 w-[30rem] -translate-y-[7rem] bg-cyan-400 "
        ></div>
      </div>
    </div>
  )
}

export default Herolamp;
