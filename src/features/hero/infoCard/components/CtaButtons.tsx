
export function CtaButtons() {
  const buttonClass = `font-mono font-black text-sm px-5 py-2.5
    bg-[#F4DC5D] text-black border-2 border-black
    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
    hover:translate-x-[2px] hover:translate-y-[2px]
    hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
    transition-all duration-100`

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <a href="#projetos" className={buttonClass}>Ver Projetos →</a>
      <a href="/cv.pdf" download className={buttonClass}>Download CV</a>
    </div>
  )
}