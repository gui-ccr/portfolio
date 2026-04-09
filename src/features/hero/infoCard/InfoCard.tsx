import { CtaButtons } from './components/CtaButtons'
import { AvailabilityBadge } from './components/AvailabilityBadge'
import { Headline } from './components/Headline'
import { SocialLinks } from './components/SocialLinks'

export function InfoCard() {
  return (
    <div className="left-col info-card shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden border-2 border-black">
      <AvailabilityBadge />
      <div className="bg-bg p-6">
        <Headline />
        <CtaButtons />
        
        {/* 1. Espaçador Rígido Superior (força 32px de altura) */}
        <div className="w-full h-4"></div>
        
        {/* 2. A Linha Divisória */}
        <div className="w-full h-[2px] bg-black"></div>
        
        {/* 3. Espaçador Rígido Inferior (força 32px de altura) */}
        <div className="w-full h-4"></div>
        
        <SocialLinks />
      </div>
    </div>
  )
}