import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { InfoCard } from './infoCard/InfoCard'
import { TechStrip } from './TechStrip'
import { IdeWindow } from '../tech-stack/IdeWindow'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance
      gsap.fromTo(
        '.left-col',
        { opacity: 0, y: 48 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.15 }
      )
      gsap.fromTo(
        '.right-col',
        { opacity: 0, x: 56 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.45 }
      )

      // Idle float — left cards bob at different phases
      gsap.to('.info-card', {
        y: -8,
        duration: 3.4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 1.1,
      })
      gsap.to('.tech-strip', {
        y: -5,
        duration: 2.9,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 1.9,
      })

      // Idle float — right card, slightly different rhythm
      gsap.to('.right-col', {
        y: -10,
        duration: 4.1,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 1.4,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <main
      ref={containerRef}
      className="flex-1 px-4 sm:px-6 md:px-8 lg:px-20 py-10 sm:py-12 md:py-20 flex items-center justify-center overflow-x-hidden min-h-[calc(100vh-100px)] lg:min-h-auto"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">

        {/* Left column */}
        <div className="flex flex-col gap-6 lg:pl-6 w-full max-w-lg lg:max-w-none mx-auto lg:mx-0">
          <InfoCard />
          <TechStrip />
        </div>

        {/* Right column */}
        <div className="w-full max-w-lg lg:max-w-none mx-auto lg:mx-0 pr-4 sm:pr-6 md:pr-0">
          <IdeWindow />
        </div>

      </div>
    </main>
  )
}
