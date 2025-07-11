import React from 'react'

export default function SectionLamp({
    // Light customization
    lightClassName = '',
    lightHeight = '15rem',
    lightWidth = '71rem',
    lightColor = '#8000FF',
    lightOpacity = 0.35,
    lightScale = "100%",
    lightBlur = '',
    lightGradient = "radial-gradient(circle,rgba(128, 0, 255, 1) 0%, rgba(128, 0, 255, 0.17) 100%)",

    // Beam customization
    beamClassName = '',
    beamHeight = '47px',
    beamWidth = '47rem',
    beamTranslateY = '0rem',
    beamGradient = "linear-gradient(90deg,rgba(128, 0, 255, 0) 0%, rgba(128, 0, 255, 0.4) 15%, rgba(128, 0, 255, 0.65) 30%, rgba(128, 0, 255, 0.8) 40%, rgba(128, 0, 255, 1) 50%, rgba(128, 0, 255, 0.8) 60%, rgba(128, 0, 255, 0.65) 70%, rgba(128, 0, 255, 0.4) 85%, rgba(128, 0, 255, 0) 100%)",

    // Other customization
    containerScale = '',
    className = '',
  }
){

  return (
    <div
      className={`relative flex min-h-screen items-center justify-center
       overflow-visible w-full rounded-md z-0 bg-transparent ${className}`}
    >
      <div
        className={`relative flex w-full  flex-1 ${containerScale} items-center
       justify-center isolate z-0`}
      >
        <div
          className={`absolute inset-auto z-50 rounded-[90%] blur-[48px]  ${lightClassName}`}
          style={{
            height: lightHeight,
            width: lightWidth,
            backgroundColor: lightColor,
            opacity: lightOpacity,
            transform: `scale(${lightScale/100})`,
            filter: lightBlur.startsWith('blur-') ? '' : lightBlur,
            background: lightGradient
          }}
        ></div>
        <div
          className={`absolute inset-auto z-50 ${beamClassName}`}
          style={{
            height: beamHeight,
            width: beamWidth,
            transform: `translateY(${beamTranslateY})`,
            background: beamGradient
          }}
        ></div>
      </div>
    </div>
  )
}
