import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { Volume2, VolumeX } from 'lucide-react' // Opcional: ícones para o UI

gsap.registerPlugin(ScrollTrigger)

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [volume] = useState(() => {
    if (typeof window !== 'undefined') {
      const volumeSalvo = localStorage.getItem('volume-video')
      if (volumeSalvo !== null) {
        return parseFloat(volumeSalvo)
      }
    }
    return 1
  })

  useEffect(() => {
    if (videoRef.current) {
      const savedVolume = volume;
      videoRef.current.volume = savedVolume;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
      });
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-photo',
        { opacity: 0, x: -56 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-photo', start: 'top 85%' },
        }
      )
      gsap.fromTo(
        '.about-text',
        { opacity: 0, x: 56 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger: '.about-text', start: 'top 85%' },
        }
      )

      gsap.fromTo(
        '.stat-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
          stagger: 0.15,
          scrollTrigger: { trigger: '.about-text', start: 'top 85%' },
        }
      )

      gsap.to('.about-photo', {
        y: -12, duration: 3.8, ease: 'sine.inOut', repeat: -1, yoyo: true,
      })

      gsap.to('.about-text-box', {
        y: -8, duration: 4.2, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 0.5,
      })

      gsap.to('.stat-card', {
        y: -12,
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.2, // A MÁGICA DA ONDA: Descompassa a flutuação de cada card
        delay: 1, // Espera a animação de entrada terminar antes de flutuar
      })

      if (videoRef.current) {
        ScrollTrigger.create({
          trigger: videoRef.current,
          start: 'top bottom', // Quando o topo do vídeo entra no fundo da tela
          end: 'bottom top',   // Quando o fundo do vídeo sai pelo topo da tela

          // Função auxiliar para tocar com segurança (Tratando a Promise)
          onEnter: () => {
            const playPromise = videoRef.current?.play()
            if (playPromise !== undefined) {
              playPromise.catch(() => console.log("Autoplay interrompido pelo scroll rápido."))
            }
          },
          onEnterBack: () => {
            const playPromise = videoRef.current?.play()
            if (playPromise !== undefined) {
              playPromise.catch(() => console.log("Autoplay interrompido pelo scroll rápido."))
            }
          },

          // Pausa é instantânea, não precisa de tratamento especial
          onLeave: () => videoRef.current?.pause(),
          onLeaveBack: () => videoRef.current?.pause(),
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])


  // const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newVolume = parseFloat(e.target.value);
  //   setVolume(newVolume);
  //
  //   if (videoRef.current) {
  //     videoRef.current.volume = newVolume;
  //     // Se o usuário arrastou a barra para cima de 0, 
  //     // nós desligamos o 'muted' nativo do elemento
  //     videoRef.current.muted = newVolume === 0;
  //   }
  //
  //   localStorage.setItem('volume-video', newVolume.toString());
  // };
  return (
    <section
      id="sobre"
      ref={sectionRef}
      // Layout centralizado ocupando a tela toda
      className="bg-bg min-h-screen px-4 sm:px-6 md:px-8 lg:px-20 py-16 sm:py-20 flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full">

        {/* Cabeçalho da Seção */}
        <div className="mb-10 sm:mb-14 flex items-center gap-4">
          <h2 className="font-mono font-black text-3xl sm:text-4xl md:text-5xl text-black tracking-tight flex-shrink-0">
            sobre_mim<span className="cursor-blink ml-0.5">_</span>
          </h2>
          <div className="flex-1 h-1 bg-black hidden sm:block" />
        </div>

        {/* Grid de Conteúdo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Coluna: Foto */}
          <div className="about-photo flex flex-col items-center lg:items-start gap-6">
            <div className="relative group">
              {/* Sombra deslocada */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 bg-accent-yellow border-2 border-black" />

              {/* Moldura principal */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 border-4 border-black bg-accent-yellow overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">

                {/* A Foto */}
                <img
                  src="/eu.jpg" 
                  alt="Guilherme - Desenvolvedor"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 z-10 relative"
                />

                <div className="absolute top-3 left-3 z-20 bg-black text-white font-mono font-black text-xs px-2 py-0.5 border-2 border-black">
                  GUILHERME.JPG
                </div>
              </div>

            </div>
          </div>

          {/* Coluna: Texto e Stats */}
          <div className="about-text flex flex-col gap-10 sm:gap-12">
            <div className="about-text-box border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-bg">
              <div className="flex items-center gap-3 bg-accent-yellow border-b-2 border-black px-5 py-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500 border border-black inline-block cursor-pointer" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400 border border-black inline-block cursor-pointer" />
                  <span className="w-3 h-3 rounded-full bg-green-500 border border-black inline-block cursor-pointer" />
                </div>
                <span className="font-mono font-black text-sm tracking-widest text-black">
                  README.md
                </span>
              </div>
              <div className="p-6 flex flex-col gap-5">
                <p className="font-mono text-base text-black leading-relaxed">
                  Olá! Sou <strong className="font-black">Guilherme Rodrigues</strong>, desenvolvedor
                  full-stack apaixonado por criar experiências digitais que combinam
                  performance e design cuidadoso.
                </p>
                <p className="font-mono text-base text-black leading-relaxed">
                  Trabalho com o ecossistema <strong className="font-black">React + TypeScript</strong>,
                  arquiteturas modernas e boas práticas de engenharia. Gosto de
                  desafios que me fazem crescer tanto na parte técnica quanto na criativa.
                </p>
                <p className="font-mono text-base text-black leading-relaxed">
                  Quando não estou codando, estou explorando novas tecnologias,
                  contribuindo com projetos e estudando como construir software
                  cada vez mais sólido.
                </p>
              </div>
            </div>

            {/* Container dos Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: '1+', label: 'ANO_EXP_FULLSTACK' },
                { value: '5+', label: 'PROJETOS_REAIS' },
                { value: '∞', label: 'ENERGETICO/DIA' },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  // Adicionei a classe 'stat-card' AQUI para o GSAP encontrar!
                  className="stat-card border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-accent-yellow p-3 text-center"
                >
                  <p className="font-mono font-black text-2xl text-black">{value}</p>
                  <p className="font-mono text-xs text-black font-black mt-0.5 tracking-wide">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}