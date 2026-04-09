import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

const NAV_LINKS = ['INÍCIO', 'SOBRE', 'PROJETOS', 'CONTATO'] as const

export function Navbar() {
  const logoRef = useRef<HTMLSpanElement>(null)

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
      className="w-full flex items-center justify-between px-6 py-3
                 bg-[#F4DC5D] border-b-4 border-black
                 shadow-[0px_8px_0px_0px_rgba(0,0,0,1)]"
    >
      <span ref={logoRef} className="font-mono font-black text-xl tracking-tight text-black inline-block">
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
        className="font-mono font-black text-sm px-4 py-2
                  text-black border-2 border-black
                   shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                   hover:translate-x-[2px] hover:translate-y-[2px]
                   hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                   transition-all duration-100"
      >
        FALE COMIGO
      </a>
    </nav>
  )
}
