import React from 'react';
import {type ProjectCardProps } from '../../../types/ProjectCardProps'; // Verifique se o caminho da sua tipagem está correto
// 1. IMPORTANTE: Importe o seu objeto de cores aqui! Ajuste o caminho conforme sua pasta
import { TAG_COLORS } from '../../../shared/constants/tagColors'; 

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  category,
  description,
  tags,
  thumbnail,
  liveUrl,
  githubUrl,
  isFeatured
}) => {
  const categoryColors = {
    FREELANCE: 'bg-[#3ECF8E]',
    PERSONAL: 'bg-[#61DAFB]',
    OPEN_SOURCE: 'bg-[#F7DF1E]'
  };

  return (
    // 2. CORREÇÃO DE HOVER (Container): Adicionamos hover:-translate-x-1 e hover:-translate-y-1
    // Isso faz o card inteiro subir enquanto a sombra cresce, dando sensação de peso físico.
    <div 
      className={`group relative bg-white border-4 border-black p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 cursor-pointer flex flex-col ${
        isFeatured ? 'md:flex-row md:items-stretch md:gap-8' : 'gap-5'
      }`}
    >
      {/* Label de Categoria */}
      <div className={`absolute -top-4 -right-2 z-20 border-2 border-black px-4 py-1 font-mono font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${categoryColors[category]}`}>
        {category}
      </div>

      {/* Container da Imagem */}
      <div className={`relative border-2 border-black bg-gray-200 overflow-hidden shrink-0 ${
        isFeatured ? 'w-full md:w-[50%] aspect-video' : 'w-full aspect-video'
      }`}>
        <img 
          src={thumbnail} 
          alt={title}
          // Mantemos o grayscale/colorido/zoom para somar ao efeito do card
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 pointer-events-none border-b-2 border-black opacity-10"></div>
      </div>

      {/* Conteúdo (Texto e Botões) */}
      <div className={`flex flex-col flex-1 w-full ${isFeatured ? 'justify-center' : ''}`}>
        
        <h3 className={`font-black uppercase italic tracking-tighter text-black ${
          isFeatured ? 'text-3xl md:text-4xl mb-4' : 'text-2xl mb-3'
        }`}>
          {title}
        </h3>
        
        <p className={`font-medium text-sm md:text-base text-gray-800 leading-relaxed mb-6 ${
          isFeatured ? 'text-3xl md:text-4xl mb-4' : 'text-xl mb-4'
        }`}>
          {description}
        </p>

        {/* 3. CORREÇÃO DE CORES DAS TAGS (BADGES) */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => {
            // Normalizamos para MAIÚSCULO para bater com o objeto de cores
            const normalizedTag = tag.toUpperCase();
            
            // Buscamos a cor no objeto. Se não existir, usamos um fallback sóbrio
            const colorData = TAG_COLORS[normalizedTag] || { bg: '#F9FAFB', text: '#000000' };

            return (
              <span 
                key={tag} 
                // Aplicamos as cores dinamicamente via style
                style={{ backgroundColor: colorData.bg, color: colorData.text }}
                // Mantemos as classes de borda pesada e fonte mono
                className="px-2 py-1 border border-black font-mono text-[10px] md:text-xs font-bold shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
              >
                {normalizedTag}
              </span>
            );
          })}
        </div>

        {/* Botões */}
        <div className="flex flex-wrap sm:flex-nowrap gap-3 mt-auto w-full">
          <a 
            href={liveUrl} 
            target="_blank"
            rel="noreferrer"
            className="flex-1 min-w-[150px] bg-black text-white font-black text-center py-3 px-4 text-xs md:text-sm hover:bg-zinc-800 transition-colors border-2 border-black"
          >
            VIEW_LIVE.EXE
          </a>
          
          {githubUrl && (
            <a 
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 border-2 border-black flex items-center justify-center bg-white hover:bg-gray-100 transition-colors"
            >
              <span className="font-black text-xs md:text-sm">SOURCE</span>
            </a>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProjectCard;