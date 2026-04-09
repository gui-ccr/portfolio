import { TAG_COLORS } from '../constants/tagColors'

interface TagProps {
  label: string
}

export function Tag({ label }: TagProps) {
  const colors = TAG_COLORS[label] ?? { bg: '#ffffff', text: '#000000' }

  return (
    <span
      className="font-mono text-xs font-bold px-2 py-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {label}
    </span>
  )
}
