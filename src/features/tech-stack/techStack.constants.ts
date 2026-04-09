export type StackSection = {
  label: string
  color: string
  tags: string[]
}

export const STACK_SECTIONS: StackSection[] = [
  {
    label: 'FRONT-END',
    color: 'text-[#89AEEA]',
    tags: ['HTML', 'CSS', 'JAVASCRIPT', 'TYPESCRIPT', 'REACT', 'NEXT.JS', 'TAILWIND CSS', 'BOOTSTRAP', 'MUI', 'VITE'],
  },
  {
    label: 'BACK-END',
    color: 'text-[#9BDCBB]',
    tags: ['NODE.JS', 'EXPRESS', 'FASTIFY', 'POSTGRESQL', 'SUPABASE', 'JAVA', 'C++'],
  },
  {
    label: 'DEVTOOLS',
    color: 'text-[#F4DC5D]',
    tags: ['GIT', 'GITHUB', 'DOCKER', 'BUN'],
  },
]

export type PostItConfig = {
  bg: string
  rotate: number
}

export const POST_ITS: PostItConfig[] = [
  { bg: '#ef4444', rotate: -7 },
  { bg: '#22c55e', rotate:  5 },
  { bg: '#89AEEA', rotate: -3 },
  { bg: '#F4DC5D', rotate:  8 },
]
