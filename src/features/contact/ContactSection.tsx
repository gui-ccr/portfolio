import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ContactInfo } from './components/ContactInfo';
import { SnakeGame } from './components/SnakeGame';

gsap.registerPlugin(ScrollTrigger);

export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Elementos adicionais da seção já tem suas próprias animações nos filhos.
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contato" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full overflow-hidden">
      {/* Título da Seção */}
      <div className="flex items-center justify-center lg:justify-start gap-4 mb-10 sm:mb-16">
        <h2 className="font-mono font-black text-xl sm:text-2xl md:text-3xl text-black px-4 py-2 bg-[#F4DC5D] border-2 sm:border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] break-words text-center">
          C:\CONTATO\START.BAT
        </h2>
        <div className="h-0.5 flex-1 bg-black hidden lg:block"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start w-full max-w-lg lg:max-w-none mx-auto">
        <ContactInfo />
        <SnakeGame />
      </div>

      {/* Linha Decorativa do Rodapé */}
      <div className="mt-24 border-t-4 border-black pt-8 flex justify-center items-center text-center">
        <p className="font-mono font-bold text-sm bg-black text-bg px-4 py-2 hover:bg-accent-yellow hover:text-black transition-colors cursor-pointer border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          SYSTEM_HALTED. PRESS_ANY_KEY_TO_CONTINUE...
        </p>
      </div>
    </section>
  );
};