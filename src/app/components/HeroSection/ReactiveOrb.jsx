import Spline from '@splinetool/react-spline';

export default function ReactiveOrb() {
  return (
      <div className='reactive-Orb-inner justify-center z-10'>
      <div className='relative flex items-center justify-center w-full h-full'>
           <Spline scene="https://prod.spline.design/sDbtmS4ExxP9g7FE/scene.splinecode"
           />
           <div className='watermark w-[10rem] h-[5rem] bottom-1 right-1 absolute z-[1] bg-black pointer-events-none'/>
      </div>
    </div>


  )
}
