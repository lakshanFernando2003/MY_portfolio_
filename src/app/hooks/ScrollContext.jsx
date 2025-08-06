'use client';

import { useEffect , useState , createContext , useContext} from 'react';
import Lenis from 'lenis';

const ScrollContext = createContext();

export const useScroll = () => useContext(ScrollContext);


export default function ScrollProvider ({children}) {

  const [lenis, setLenis] = useState(null)
  const [refState , setRef] = useState(null)

  useEffect(() => {
    // Check if on mobile/tablet (match the same breakpoint as CSS)
    const isSmallDevice = typeof window !== 'undefined' &&
      window.matchMedia("(max-width: 1000px)").matches;

    // Configure Lenis differently based on device
    const scroller = new Lenis({
      smoothWheel: !isSmallDevice, // Only smooth scroll on desktop
      smoothTouch: false,          // Disable smooth touch for better native experience
      touchMultiplier: isSmallDevice ? 2 : 1, // Faster touch response on mobile
      wheelMultiplier: 1,
      lerp: isSmallDevice ? 0 : 0.05, // No lerp on mobile for native feel
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      normalizeWheel: true
    });

    // Listen for device orientation changes
    const handleResize = () => {
      const newIsSmallDevice = window.matchMedia("(max-width: 1000px)").matches;
      document.body.style.overflow = newIsSmallDevice ? 'auto' : 'hidden';

      // Update Lenis settings on resize if needed
      if (lenis) {
        lenis.options.smoothWheel = !newIsSmallDevice;
        lenis.options.smoothTouch = false;
        lenis.options.lerp = newIsSmallDevice ? 0 : 0.05;
      }
    };

    window.addEventListener('resize', handleResize);

    let rf;
    function raf(time){
      scroller.raf(time);
      requestAnimationFrame(raf);
    }
    rf = requestAnimationFrame(raf);
    setLenis(scroller);
    setRef(rf);

    return () => {
      window.removeEventListener('resize', handleResize);
      if(lenis){
        cancelAnimationFrame(refState);
        scroller.destroy();
      }
    };
  }, [])



  return  (
    <ScrollContext.Provider value={{lenis}}>
      {children}
    </ScrollContext.Provider>
  );
};
