import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ContactInfo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        x: -40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col gap-6">
      <div className="bg-link-blue border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] duration-300">
        <h3 className="font-black text-3xl uppercase mb-4">Vamos conversar?</h3>
        <p className="font-medium text-lg text-black mb-6">
          Estou disponível para projetos freelance, oportunidades open-source e trabalhos full-time. Mande um salve!
        </p>
        <div className="flex flex-col gap-4 font-mono font-bold text-sm md:text-base">
          <a href="mailto:guilhermerodrigues6484@gmail.com" className="flex items-center gap-3 hover:underline group">
            <span className="bg-black text-white px-2 py-1 group-hover:bg-orange-300 group-hover:bg- group-hover:text-black transition-colors border-2 border-black">EMAIL</span>
            guilhermerodrigues6484@gmail.com
          </a>
          <a href="https://www.linkedin.com/in/gui-ccr-/" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:underline group">
            <span className="bg-black text-white px-2 py-1 group-hover:bg-indigo-600 group-hover:text-black transition-colors border-2 border-black">LINKEDIN</span>
            @gui-ccr
          </a>
        </div>
      </div>
      
      {/* Elemento Decorativo */}
      <div className="bg-link-green border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-max transform -rotate-2 mt-4 hover:rotate-0 transition-transform duration-300 cursor-default">
        <span className="font-black italic block">STATUS:</span>
        <span className="font-mono font-bold text-sm">ACCEPTING_NEW_QUESTS</span>
      </div>
    </div>
  );
};
