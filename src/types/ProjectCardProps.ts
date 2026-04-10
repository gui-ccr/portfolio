export interface ProjectCardProps {
  title: string;
  category: 'FREELANCE' | 'PERSONAL' | 'OPEN_SOURCE';
  description: string;
  tags: string[];
  image?: string;
  thumbnail?: string
  liveUrl: string;
  githubUrl?: string;
  isFeatured?: boolean; // <--- Adicione esta linha! A interrogação significa que é opcional.
}