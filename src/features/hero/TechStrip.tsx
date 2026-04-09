type TagColor = { bg?: string; text: string }
const TECHS: Record<string, TagColor> = {
   TYPESCRIPT: { text: '#235A97' },
  'REACT 19': { text: '#087EA4' },
  'NEXT.JS': { text: '#000000' },
  'TAILWIND CSS': { text: '#0E7490' },
   VITE: { text: '#474DB9' },
  'NODE.JS': { text: '#1E5A1E' },
   POSTGRESQL: { text: '#21435F' },
   DOCKER: { text: '#134D77' },
}



const ENTRIES = Object.entries(TECHS)

export function TechStrip() {
  const items = [...ENTRIES, ...ENTRIES]

  return (
    <div className="left-col tech-strip shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-[#F4DC5D] py-3 overflow-hidden border-2 border-black">
      <div className="marquee-track flex gap-8 whitespace-nowrap">
        {items.map(([name, color], i) => (
          <span
            key={i}
            className="font-mono font-black text-sm tracking-widest"
            style={{ color: color.text }}
          >
            {name} <span className="opacity-40" style={{ color: color.text }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
