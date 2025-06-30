 'use client';

import { useEffect , useState , createContext , useContext} from 'react';
import Lenis from 'lenis';

const ScrollContext = createContext();

export const useScroll = () => useContext(ScrollContext);


export default function ScrollProvider ({children}) {

  const [lenis, setLenis] = useState(null)
  const [refState , setRef] = useState(null)

  useEffect(() => {
    const scroller = new Lenis(
      {
        smoothWheel: true,
        smoothTouch: true,
        wheelMultiplier: 1,
        lerp: 0.05,

      }
    );
    let rf;

    function raf(time){
      scroller.raf(time);
      requestAnimationFrame(raf);
    }
    rf = requestAnimationFrame(raf);
    setLenis(scroller);
    setRef(rf);

    return () => {
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
