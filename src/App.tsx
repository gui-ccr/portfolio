import { Navbar } from './features/navbar/Navbar'
import { Hero } from './features/hero/Hero'
import { AboutSection } from './features/about/AboutSection'
import './App.css'

export default function App() {
  return (
    // Adicionamos bg-bg aqui para manter a consistência de fundo
    <div className="flex flex-col min-h-screen bg-[#F3F0E0]">
      <Navbar />
      
      {/* Aqui está o truque: 
          'min-h-[calc(100vh-76px)]' garante que o início ocupe a tela toda.
          (76px é uma estimativa da altura da sua Navbar com os paddings e bordas)
      */}
      <div id="início" className="min-h-[calc(100vh-16px)] flex flex-col">
        <Hero />
      </div>

      <AboutSection />
    </div>
  )
}
