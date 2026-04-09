import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Volume2, VolumeX } from 'lucide-react' // Opcional: ícones para o UI

gsap.registerPlugin(ScrollTrigger)

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [volume, setVolume] = useState(() => {
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


  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);

    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      // Se o usuário arrastou a barra para cima de 0, 
      // nós desligamos o 'muted' nativo do elemento
      videoRef.current.muted = newVolume === 0;
    }

    localStorage.setItem('volume-video', newVolume.toString());
  };
  return (
    <section
      id="sobre"
      ref={sectionRef}
      // Layout centralizado ocupando a tela toda
      className="bg-bg min-h-screen px-8 md:px-20 py-20 flex items-center justify-center"
    >
      <div className="max-w-6xl mx-auto w-full">

        {/* Cabeçalho da Seção */}
        <div className="mb-14 flex items-center gap-4">
          <h2 className="font-mono font-black text-4xl md:text-5xl text-black tracking-tight">
            sobre_mim<span className="cursor-blink ml-0.5">_</span>
          </h2>
          <div className="flex-1 h-1 bg-black" />
        </div>

        {/* Grid de Conteúdo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Coluna: Foto */}
          <div className="about-photo flex flex-col items-center lg:items-start gap-6">
            <div className="relative">
              {/* Sombra deslocada */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 bg-accent-yellow border-2 border-black" />

              {/* Moldura principal */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 border-4 border-black bg-accent-yellow overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">

                {/* O Fallback (Placeholder) fica por baixo (z-0) para aparecer enquanto o vídeo carrega */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-accent-yellow z-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-20 h-20 text-black opacity-40">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                  <span className="font-mono font-black text-xs text-black opacity-40 tracking-widest">LOADING.MP4</span>
                </div>

                {/* A Tag de Vídeo - Fica por cima (z-10) */}
                <video
                  ref={videoRef}
                  src="/eu.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="relative z-10 w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 z-20 bg-black text-accent-yellow font-mono font-black text-xs px-2 py-0.5 border border-black">
                  LIVE_FEED.MP4
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between gap-4 bg-bg border-2 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-64 md:w-80">
              {volume === 0 ? <VolumeX size={20} className="text-black" /> : <Volume2 size={20} className="text-black" />}

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="flex-1 accent-black cursor-pointer"
              />

              <span className="font-mono font-black text-xs w-10 text-right text-black">
                {Math.round(volume * 100)}%
              </span>
            </div>

          </div>

          {/* Coluna: Texto e Stats */}
          <div className="about-text flex flex-col gap-6">

            {/* Adicionei a classe 'about-text-box' aqui para ele flutuar isolado dos stats */}
            <div className="about-text-box border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-bg">
              <div className="bg-accent-yellow border-b-2 border-black px-5 py-3">
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