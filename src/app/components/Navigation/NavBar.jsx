import Image from 'next/image';

export default function NavBar() {
  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center items-center z-50 ">
      <nav className="mt-3 bg-gradient-to-r from-black/60 via-cyan-500/1 to-black/50 border border-white/20 justify-center items-center rounded-full backdrop-blur-3xl shadow-lg">
        <div className="flex items-center justify-around w-full px-4 py-[1.5px] gap-40">
          <div className='flex items-center gap-2 p-1  ml-[-0.9rem]'>
           <div className=' flex h-9 w-9 relative overflow-hidden'>
            <Image
              className="rounded-full"
              src="/images/me.jpg"
              alt="intro image"
              fill={true}
              priority={true}
            >
            </Image>
           </div >
          <h1 className='text-lg '>Lakshan</h1>
        </div>
        <ul className=" flex flex-row gap-8 items-center pl-2 pr-2">
          <li>home</li>
          <li>About Me</li>
          <li>Projects</li>
          <li>Skills</li>
          <li>Road Map</li>
          <li>Services</li>
        </ul>
        <div className='items-center relative '>
          <a className='flex justify-center items-center border border-white/20 bg-[rgb(26_26_26_/_60%)] backdrop-blur-3xl shadow-lg py-2.5 pr-7 pl-7 rounded-full mr-[-0.59rem] hover:bg-[rgb(255_255_255_/_80%)] hover:text-black transition-all duration-[0.4s]' href=""><span className=' text-xs'>Let's Connect</span></a>
        </div>
        </div>

      </nav>

    </div>
  )
}
