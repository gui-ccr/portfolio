import { useEffect } from 'react'
import gsap from 'gsap'
import { Tag } from '../../shared/components/Tag'
import { POST_ITS, STACK_SECTIONS } from './techStack.constants'
import { PostIt } from './PostIt'

function TitleBar() {
  return (
    <div className="bg-[#F4DC5D] border-b-4 border-black px-4 py-2 flex items-center gap-3">
      <div className="flex gap-1.5">
        <span className="w-3 h-3 rounded-full bg-red-500 border border-black inline-block cursor-pointer" />
        <span className="w-3 h-3 rounded-full bg-yellow-400 border border-black inline-block cursor-pointer" />
        <span className="w-3 h-3 rounded-full bg-green-500 border border-black inline-block cursor-pointer" />
      </div>
      <span className="font-mono font-black text-xs tracking-widest text-black truncate">
        GUILHERME_RODRIGUES — PORTFOLIO.EXE
      </span>
    </div>
  )
}

function StackBody() {
  return (
    <div className="bg-[#F3F0E0] p-6 flex-1">
      <p className="font-mono font-black text-lg text-black mb-6">
        tech_stack.json<span className="cursor-blink ml-0.5">_</span>
      </p>

      <div className="space-y-5">
        {STACK_SECTIONS.map(({ label, color, tags }) => (
          <div key={label}>
            <p className="font-mono font-black text-sm text-black mb-2">
              <span className={color}>"{label}"</span>
              <span className="text-black">: [</span>
            </p>
            <div className="flex flex-wrap gap-2 ml-4 mb-1">
              {tags.map((tag) => <Tag key={tag} label={tag} />)}
            </div>
            <p className="font-mono text-sm text-black ml-4">]</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Footer() {
  return (
    <div className="bg-[#f3f0e0] px-6 pb-4 flex flex-col">
      
      {/* O nosso truque: container com padding (py-4) para blindar o espaçamento */}
      <div className="w-full py-4">
        <div className="w-full h-[2px] bg-black"></div>
      </div>

      <div className="flex items-center">
        {/* Nota: Mudei de text-white para text-black para dar contraste com o fundo #f3f0e0 */}
        <span className="font-mono font-bold text-xs text-black">v2.0.0 | 2026</span>
      </div>
      
    </div>
  )
}
export function IdeWindow() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.post-it-item').forEach((el, i) => {
        const base = parseFloat(el.dataset.rotate ?? '0')
        // Let GSAP own the transform by initialising rotation first
        gsap.set(el, { rotation: base })
        gsap.to(el, {
          rotation: base + (i % 2 === 0 ? 7 : -7),
          duration: 1.7 + i * 0.4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.55 + 1.6,
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="right-col relative">
      {/* Post-its taped to the bottom edge of the window, hanging down */}
      <div
        className="absolute bottom-0 right-4 flex gap-3 z-20 pointer-events-none"
        style={{ transform: 'translateY(100%)' }}
      >
        {POST_ITS.map((postIt, index) => (
          <PostIt key={index} bg={postIt.bg} rotate={postIt.rotate} />
        ))}
      </div>

      <div className="border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col">
        <TitleBar />
        <StackBody />
        <Footer />
      </div>
    </div>
  )
}
