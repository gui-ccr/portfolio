export type TagColor = { bg: string; text: string }

export const TAG_COLORS: Record<string, TagColor> = {
  // Front-End
  HTML:           { bg: '#E34F26', text: '#ffffff' },
  CSS:            { bg: '#1572B6', text: '#ffffff' },
  JAVASCRIPT:     { bg: '#F7DF1E', text: '#000000' },
  TYPESCRIPT:     { bg: '#3178C6', text: '#ffffff' },
  REACT:          { bg: '#61DAFB', text: '#000000' },
  'NEXT.JS':      { bg: '#171717', text: '#ffffff' },
  'TAILWIND CSS': { bg: '#06B6D4', text: '#000000' },
  BOOTSTRAP:      { bg: '#7952B3', text: '#ffffff' },
  MUI:            { bg: '#007FFF', text: '#ffffff' },
  VITE:           { bg: '#646CFF', text: '#ffffff' },
  GSAP:           { bg: '#2fea56', text: '#000000' },

  // Back-End
  'NODE.JS':      { bg: '#339933', text: '#ffffff' },
  EXPRESS:        { bg: '#868686', text: '#ffffff' },
  FASTIFY:        { bg: '#00C1BD', text: '#000000' },
  POSTGRESQL:     { bg: '#336791', text: '#ffffff' },
  SUPABASE:       { bg: '#3ECF8E', text: '#000000' },
  JAVA:           { bg: '#ED8B00', text: '#000000' },
  'C++':          { bg: '#00599C', text: '#ffffff' },
  // DevTools
  GIT:            { bg: '#F05032', text: '#ffffff' },
  GITHUB:         { bg: '#6E40C9', text: '#ffffff' },
  DOCKER:         { bg: '#2496ED', text: '#ffffff' },
  BUN:            { bg: '#FBF0DF', text: '#000000' },
  // Engineering & Architecture
  'SOLID':            { bg: '#2D3748', text: '#ffffff' }, 
  'CLEAN_CODE':       { bg: '#276749', text: '#ffffff' }, 
  'CLEAN_ARCH':       { bg: '#1A365D', text: '#ffffff' }, 
  'DDD':              { bg: '#553C9A', text: '#ffffff' }, 
  'TDD':              { bg: '#9B2C2C', text: '#ffffff' }, 
  'REST_API':         { bg: '#2B6CB0', text: '#ffffff' }, 
  'DESIGN_PATTERNS':  { bg: '#2D3748', text: '#ffffff' }, 
  'CRUD':             { bg: '#4A5568', text: '#ffffff' }, 
  'DRY_KISS':         { bg: '#744210', text: '#ffffff' }, 
  'MVC':              { bg: '#2C5282', text: '#ffffff' }, 
}
