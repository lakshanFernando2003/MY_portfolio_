import { useRef, useEffect } from 'react';
import {gsap} from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


export default function horizontalBar() {
  const sectionsRef = useRef(null);
  const triggerRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {

    const pin = gsap.fromTo(sectionsRef.current, {
        translateX:0
    },{
        translateX: "-350vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000 top",
          scrub: 1,
          pin: true,
          anticipatePin: 1,

          markers: true, // Uncomment to see the markers
        }
    });

      return () => {
        pin.kill(); // Clean up the animation on component unmount
      }


  }, []);



  return (
    <div className=''>
      <div ref={triggerRef}>
        <div ref={sectionsRef} className='relative flex flex-row h-screen w-[500vw]'>
            <div className="section1 flex flex-col h-screen w-screen text-center justify-center border-2 bg-amber-700"><h1 className='text-8xl text-center justify-center flex'>section 1</h1></div>
            <div className="section2 flex flex-col h-screen w-screen text-center justify-center border-2 bg-blue-600"><h1 className='text-8xl text-center justify-center flex' >section 2</h1></div>
            <div className="section3 flex flex-col h-screen w-screen text-center justify-center border-2 bg-emerald-400"><h1 className='text-8xl text-center justify-center flex' >section 3</h1></div>
            <div className="section4 flex flex-col h-screen w-screen text-center justify-center border-2 bg-fuchsia-700"><h1 className='text-8xl text-center justify-center flex' >section 4</h1></div>
            <div className="section5 flex flex-col h-screen w-screen text-center justify-center border-2 bg-amber-400"><h1 className='text-8xl text-center justify-center flex' >section 5</h1></div>
        </div>
      </div>
    </div>
  )
}
