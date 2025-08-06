import Image from "next/image"
import "../MediaQuery/largeScreen.css"
import "../MediaQuery/SmallScreen.css"

const Images =[
  "MobileLearning.jpg",
  "Studing-2.jpg",
  "WebDesgin.jpg",
  "TeamWork.jpg",
  "StreetCars.jpg",
  // Second row images
  "Cofee.jpg",
  "Studing.jpg",
  "mobileDesign.jpg",
  "Ethical-Hacking-.jpg",
  "Music.jpg",
  "graduation.jpg",
  // Third row images
  "Designing.jpg",
  "programmer-.jpg",
  "Gaming-1.jpg",
  "Headphones.jpg",
  "Gaming-2.jpg",
  "travelling.jpg",
]

const ImageStyles = {
  width: '42vh',
  height: 'calc(33vh - 9px)',
  objectFit: 'cover',
  borderRadius: '8px',
}

import React from 'react'

export default function imageBox() {
  return (
    <div className="relative w-full mb-2">
      {/* Content div - positioned behind */}
      <div className="w-full flex flex-col items-center overflow-hidden z-0 relative">
      {/* First row - 5 full images */}
      <div className="flex gap-2 mb-2">
        {Images.slice(0, 5).map((image, index) => (
          <div key={`row1-${index}`} className="relative opacity-90" style={{ width: '42vh', height: 'calc(33vh - 9px)' }}>
            <Image
              src={`/images/${image}`}
              alt={`Row 1 Image ${index + 1}`}
              width={309}
              height={405}
              style={ImageStyles}
              className="image-Box-Picture"
            />
          </div>
        ))}
      </div>

      {/* Second row - 6 images with wider layout */}
      <div className="flex gap-2 mb-2">
        {Images.slice(5, 11).map((image, index) => (
          <div key={`row2-${index}`} className="relative opacity-80" style={{ width: '42vh', height: 'calc(33vh - 9px)' }}>
            <Image
              src={`/images/${image}`}
              alt={`Row 2 Image ${index + 1}`}
              width={309}
              height={405}
              style={ImageStyles}
              className="image-Box-Picture"
            />
          </div>
        ))}
      </div>

      {/* Third row - 6 images with wider layout */}
      <div className="flex gap-2">
        {Images.slice(11, 17).map((image, index) => (
          <div key={`row3-${index}`} className="relative opacity-60" style={{ width: '42vh', height: 'calc(33vh - 9px)' }}>
            <Image
              src={`/images/${image}`}
              alt={`Row 3 Image ${index + 1}`}
              width={309}
              height={405}
              style={ImageStyles}
              className="image-Box-Picture"
            />
          </div>
        ))}
      </div>
    </div>

      {/* Gradient overlay div - positioned on top */}
      <div
        className='BG-Gradient absolute pointer-events-none bg-transparent inset-0'
        style={{
          transformOrigin: 'center center',
        }}
      />

      {/* Protective layer to prevent mouse interactions */}
      <div
        className="absolute top-0 left-0 right-0 bottom-0"
        style={{
          backgroundColor: 'transparent',
          pointerEvents: 'auto',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          WebkitTouchCallout: 'none'
        }}
      />
    </div>
  )
}
