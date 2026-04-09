interface PostItProps {
  bg: string
  rotate: number
}

export function PostIt({ bg, rotate }: PostItProps) {
  return (
    <div
      className="post-it-item flex flex-col items-center"
      data-rotate={rotate}
      style={{ transformOrigin: 'top center' }}
    >
      {/* tape */}
      <div
        className="w-4 h-1.5"
        style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}
      />
      {/* body */}
      <div
        className="w-6 h-8 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]"
        style={{ backgroundColor: bg }}
      />
    </div>
  )
}
