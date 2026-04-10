import React from 'react';
import ProjectCard from './ProjectCard';
import { type Project } from '../types/project'

interface ProjectGridProps {
  projects: Project[];
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
    return (
        // 1. O PULO DO GATO: max-w-7xl para limitar a largura, mx-auto para centralizar!
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full overflow-hidden">
            
            {/* Título da Seção no estilo Terminal */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-4 sm:mb-8 md:mb-12">
                <h2 className="font-mono font-black text-lg sm:text-xl md:text-2xl lg:text-3xl text-black px-2 sm:px-4 py-2 bg-[#F4DC5D] border-2 sm:border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] break-words text-center leading-tight">
                    C:\USERS\GUILHERME\DESKTOP\PROJETOS_FINAIS_MESMO_V3_AGORA_VAI\
                </h2>
                <div className="h-0.5 flex-1 bg-black hidden lg:block"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-12 md:gap-16 lg:gap-12 mt-12 sm:mt-16 md:mt-20 pt-4 sm:pt-8 mx-auto w-full max-w-lg md:max-w-none">
                {projects.map((project, index) => {
                    
                    // 1. O Destaque sempre ocupa 2 colunas
                    let gridClass = index === 0 ? 'md:col-span-2 lg:col-span-2' : 'col-span-1';

                    // 2. O PULO DO GATO: Se for o 3º projeto (index 2) e ele estiver sozinho na última linha,
                    // nós forçamos ele a começar na Coluna 2 (meio da tela)
                    if (index === 2 && projects.length === 3) {
                        gridClass = 'col-span-1 md:col-start-1 lg:col-start-2';
                    }

                    return (
                        <div key={project.id} className={gridClass}>
                            <ProjectCard
                                title={project.title}
                                category={project.category}
                                description={project.description}
                                tags={project.tags}
                                thumbnail={project.thumbnail}
                                liveUrl={project.links.live}
                                githubUrl={project.links.github}
                                isFeatured={index === 0}
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default ProjectGrid;