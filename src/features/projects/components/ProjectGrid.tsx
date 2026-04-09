import React from 'react';
import ProjectCard from './ProjectCard';
import { type Project } from '../types/project'

interface ProjectGridProps {
  projects: Project[];
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
    return (
        // 1. O PULO DO GATO: max-w-7xl para limitar a largura, mx-auto para centralizar!
        <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
            
            {/* Título da Seção no estilo Terminal */}
            <div className="flex items-center gap-4">
                <h2 className="mb-16 font-mono font-black text-xl md:text-2xl lg:text-3xl text-black px-4 py-2 break-all ">
                    C:\USERS\GUILHERME\DESKTOP\PROJETOS_FINAIS_MESMO_V3_AGORA_VAI\
                </h2>
                <div className="h-0.5 flex-1 bg-black hidden md:block"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 pt-6">
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