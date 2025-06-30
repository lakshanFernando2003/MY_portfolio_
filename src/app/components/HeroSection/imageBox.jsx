import Image from "next/image"

const Images =[
  "campaign-creators-gMsnXqILjp4-unsplash.jpg",
  "campaign-creators-gMsnXqILjp4-unsplash.jpg",
  "campaign-creators-gMsnXqILjp4-unsplash.jpg",
  "campaign-creators-gMsnXqILjp4-unsplash.jpg",
  "campaign-creators-gMsnXqILjp4-unsplash.jpg",
  "campaign-creators-gMsnXqILjp4-unsplash.jpg",
  "campaign-creators-gMsnXqILjp4-unsplash.jpg",
  "campaign-creators-gMsnXqILjp4-unsplash.jpg",
  "campaign-creators-gMsnXqILjp4-unsplash.jpg",
  "jeshoots-com--2vD8lIhdnw-unsplash.jpg",
  "jeshoots-com--2vD8lIhdnw-unsplash.jpg",
  "jeshoots-com--2vD8lIhdnw-unsplash.jpg",
  "jeshoots-com--2vD8lIhdnw-unsplash.jpg",
  "jeshoots-com--2vD8lIhdnw-unsplash.jpg",
  "jeshoots-com--2vD8lIhdnw-unsplash.jpg",
  "jeshoots-com--2vD8lIhdnw-unsplash.jpg",
  "jeshoots-com--2vD8lIhdnw-unsplash.jpg",



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
    <div className="relative w-full mb-2 ">
      {/* Content div - positioned behind */}
      <div className="w-full flex flex-col items-center overflow-hidden z-0 relative opacity-75">
      {/* First row - 5 full images */}
      <div className="flex gap-2 mb-2">
        {Images.slice(0, 5).map((image, index) => (
          <div key={`row1-${index}`} className="relative" style={{ width: '42vh', height: 'calc(33vh - 9px)' }}>
            <Image
              src={`/images/${image}`}
              alt={`Row 1 Image ${index + 1}`}
              width={309}
              height={405}
              style={ImageStyles}
            />
          </div>
        ))}
      </div>

      {/* Second row - 6 images with wider layout */}
      <div className="flex gap-2 mb-2">
        {Images.slice(5, 11).map((image, index) => (
          <div key={`row2-${index}`} className="relative" style={{ width: '42vh', height: 'calc(33vh - 9px)' }}>
            <Image
              src={`/images/${image}`}
              alt={`Row 2 Image ${index + 1}`}
              width={309}
              height={405}
              style={ImageStyles}
            />
          </div>
        ))}
      </div>

      {/* Third row - 6 images with wider layout */}
      <div className="flex gap-2">
        {Images.slice(11, 17).map((image, index) => (
          <div key={`row3-${index}`} className="relative" style={{ width: '42vh', height: 'calc(33vh - 9px)' }}>
            <Image
              src={`/images/${image}`}
              alt={`Row 3 Image ${index + 1}`}
              width={309}
              height={405}
              style={ImageStyles}
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
      {/* <div
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
      /> */}
    </div>
  )
}
