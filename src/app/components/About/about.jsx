

export default function about() {
  return (
    <div className="About-card relative flex items-center justify-center text-white z-10 pb-45">
      <div className="max-w-2xl mx-auto text-center p-8 ">
        <h3 className="z-50 bg-gradient-to-r from-[#AAFFFF] via-[#0099FF] to-[#0066CC] text-transparent bg-clip-text inline-block font-semibold antialiased tracking-wide font-mono text-[1rem] [-webkit-text-stroke:_0.3px_#0099FF80] [filter:_drop-shadow(0_0_1px_#AAFFFF40)_drop-shadow(0_0_1px_#0066CC40)]">About Me</h3>
        <div className="pt-3 flex flex-col items-center gap-3">
          <h1 className="text-4xl font-semibold">Hi There!</h1>
          <p className="text-[1.15rem]">
            I'm <span className="font-semibold">Lakshan Fernando</span>, a versatile Software Engineer with expertise in both Full Stack and DevOps engineering. I thrive on building end-to-end solutions that deliver exceptional user experiences while maintaining robust backend architecture. My ability to quickly adapt to new technologies and programming languages keeps me at the cutting edge of the industry .
          </p>
           <span className="text-xs pt-5 text-gray-400">Want to know more about me!</span>
           <p className="text-[0.9rem]">Let's Connect | Code</p>
        </div>
      </div>
    </div>
  )
}
