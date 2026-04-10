import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const NAV_LINKS = ['INÍCIO', 'SOBRE', 'PROJETOS', 'CONTATO'] as const

export function Navbar() {
  const logoRef = useRef<HTMLSpanElement>(null)

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(logoRef.current, {
        y: -4,
        duration: 1.4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <nav
      className="w-full flex items-center justify-between px-4 md:px-8 py-3
                 bg-[#F4DC5D] border-b-4 border-black
                 shadow-[0px_8px_0px_0px_rgba(0,0,0,1)] relative z-50 mix-blend-normal"
    >
      {/* Botão Hambúrguer (Apenas Mobile) */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
      >
        <span className="bg-black block w-5 h-0.5 mb-1"></span>
        <span className="bg-black block w-5 h-0.5 mb-1"></span>
        <span className="bg-black block w-5 h-0.5"></span>
      </button>

      <span ref={logoRef} className="font-mono font-black text-lg md:text-xl tracking-tight text-black inline-block flex-1 text-center md:text-left md:flex-none ml-2 md:ml-0">
        GR_dev.exe
      </span>

      <ul className="hidden md:flex gap-8 list-none">
        {NAV_LINKS.map((link) => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase()}`}
              className="font-mono font-bold text-sm tracking-widest text-black
                         hover:underline underline-offset-4"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#contato"
        className="font-mono font-black text-xs md:text-sm px-3 lg:px-4 py-2.5
                  bg-white text-black border-2 border-black
                   shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                   hover:translate-x-[2px] md:hover:translate-x-1 hover:translate-y-[2px] md:hover:translate-y-1
                   hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-none
                   transition-all duration-100 flex-shrink-0 whitespace-nowrap hidden sm:inline-block"
      >
        FALE COMIGO
      </a>

      {/* Menu Overlay Mobile */}
      {isMenuOpen && (
        <div className="absolute top-[100%] left-0 w-full bg-[#F4DC5D] flex flex-col items-center py-6 gap-6 border-b-4 border-black border-collapse shadow-[0px_8px_0px_0px_rgba(0,0,0,1)] md:hidden">
          <ul className="flex flex-col items-center gap-6 list-none w-full">
            {NAV_LINKS.map((link) => (
              <li key={link} className="w-full text-center">
                <a
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-mono font-black text-xl text-black block w-full py-2
                             hover:bg-white hover:border-black hover:border-y-2"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
