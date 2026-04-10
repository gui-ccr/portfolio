export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'FREELANCE' | 'PERSONAL' | 'OPEN_SOURCE'; // O Label que você pediu
  thumbnail: string;
  tags: string[]; // Ex: ['React', 'Node.js']
  links: {
    live: string;
    github?: string;
  };
}