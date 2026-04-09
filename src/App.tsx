import { Navbar } from './features/navbar/Navbar'
import { Hero } from './features/hero/Hero'
import { AboutSection } from './features/about/AboutSection'
import { ProjectGrid } from './features/projects/components/ProjectGrid'
import { MOCK_PROJECTS } from './shared/constants/MOCKS'
import './App.css'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F3F0E0]">
      <Navbar />
      
      <div id="início" className="min-h-[calc(100vh-16px)] flex flex-col">
        <Hero />
      </div>

      <AboutSection />

      {/* 2. INJEÇÃO DA SEÇÃO DE PROJETOS */}
      {/* Coloquei um ID aqui para que o link da Navbar possa rolar direto para cá! */}
      <div id="projetos" className="flex justify-center items-center w-full">
        <ProjectGrid projects={MOCK_PROJECTS} />
      </div>

    </div>
  )
}