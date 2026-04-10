export const MOCK_PROJECTS = [
    {
        id: 'agendai-saas',
        title: 'AGENDAI_SAAS.EXE',
        category: 'FREELANCE' as const,
        description: 'Ecossistema SaaS Multi-tenant de alta performance para gestão de agendamentos. Arquitetura modular baseada em Clean Architecture e SOLID, com isolamento de dados via RLS (Row Level Security) e experiência White-label dinâmica via injeção de temas.',
        tags: ['NEXT.JS', 'TYPESCRIPT', 'TAILWIND CSS', 'GSAP', 'POSTGRESQL', 'SUPABASE', 'REST_API', 'SOLID', 'CLEAN_ARCH'],
        thumbnail: '/agendai.png',
        links: {
            live: 'https://agendai.tec.br',
        }
    },
    {
        id: 'eximia-tech',
        title: 'EXIMIA_TECH_LANDING_PAGE.EXE',
        category: 'FREELANCE' as const,
        description: 'Desenvolvimento do site institucional da software house Exímia Tech. Foco absoluto em performance extrema e Core Web Vitals. Implementação de SEO, renderização estática (SSG) para carregamento instantâneo e animações fluidas que reforçam a autoridade da marca.',
        tags: ['TYPESCRIPT', 'NEXT.JS', 'TAILWIND CSS', 'GSAP'],
        thumbnail: '/eximia-tech.png',
        links: {
            live: 'https://eximiatech.com.br',
        }
    },
    {
        id: 'clinicaflow',
        title: 'CLINICA_FLOW_AI.EXE',
        category: 'FREELANCE' as const,
        description: 'Landing page de alta conversão focada em geração de leads B2B para o setor de saúde. Projetada para comercializar agentes de IA para WhatsApp. Arquitetura otimizada para funil de vendas, validação estrita de formulários e integração via Webhooks para captura de dados em tempo real.',
        tags: ['REACT', 'TYPESCRIPT', 'TAILWIND CSS', 'VITE', 'GSAP'],
        thumbnail: '/clinicaflow.png',
        links: {
            live: 'https://clinicaflow.ia.br/'
        }
    },
    {
        id: 'autotop-system',
        title: 'AUTOTOP_SYSTEM.EXE',
        category: 'PERSONAL' as const,
        description: 'Plataforma integrada de Gestão de Estoque (ERP) e Vitrine Digital Automotiva. Desenvolvido para automação de inventário e controle financeiro de fluxo de caixa. Implementação de sistema CRUD completo com filtragem avançada de veículos e painel administrativo para monitoramento de vendas e métricas de saída.',
        tags: ['REACT', 'TYPESCRIPT', 'TAILWIND CSS', 'VITE', 'GSAP', 'CRUD',],
        thumbnail: '/autotop.png',
        links: {
            live: 'https://gui-ccr.github.io/AutoTop/',
            github: 'https://github.com/gui-ccr/AutoTop'
        }
    }
];