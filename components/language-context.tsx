"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type Language = "en" | "pt"

const translations = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.about": "About",
    "nav.techStack": "Tech Stack",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    // Home
    "home.hello": "Hello, I'm John Doe",
    "home.description": "A DevOps/Cloud Engineer passionate about automation and scalable infrastructure.",
    "home.downloadCV": "Download CV",
    "home.contactMe": "Contact Me",

    // About
    "about.title": "About Me",
    "about.subtitle": "My background and experience",
    "about.p1":
      "I'm a DevOps/Cloud Engineer with over 5 years of experience in designing, implementing, and managing cloud infrastructure. I specialize in automating deployment pipelines, optimizing infrastructure costs, and ensuring high availability and scalability of systems.",
    "about.p2":
      "My journey began as a System Administrator, where I developed a strong foundation in Linux systems and networking. As cloud technologies evolved, I transitioned into DevOps practices, embracing Infrastructure as Code and CI/CD methodologies.",
    "about.p3":
      "I'm passionate about solving complex infrastructure challenges and helping teams deliver software more efficiently through automation and best practices.",

    // Tech Stack
    "techStack.title": "Tech Stack",
    "techStack.subtitle": "Technologies and tools I work with",

    // Projects
    "projects.title": "Projects",
    "projects.subtitle": "Some of my recent work",
    "projects.project1.title": "Cloud Migration Project",
    "projects.project1.description": "Migrated on-premises infrastructure to AWS cloud",
    "projects.project1.content":
      "Led the migration of a legacy application from on-premises data centers to AWS, implementing Infrastructure as Code with Terraform and setting up CI/CD pipelines with GitHub Actions. Reduced infrastructure costs by 40% and improved deployment time by 70%.",
    "projects.project2.title": "Kubernetes Cluster Optimization",
    "projects.project2.description": "Optimized Kubernetes infrastructure for performance and cost",
    "projects.project2.content":
      "Redesigned and optimized a production Kubernetes cluster, implementing auto-scaling, resource limits, and cost allocation tagging. Set up comprehensive monitoring with Prometheus and Grafana. Reduced monthly cloud costs by 35% while improving application performance.",
    "projects.project3.title": "CI/CD Pipeline Automation",
    "projects.project3.description": "Built automated deployment pipelines for microservices",
    "projects.project3.content":
      "Designed and implemented CI/CD pipelines for a microservices architecture using Jenkins and Docker. Automated testing, building, and deployment processes, reducing deployment time from hours to minutes and enabling multiple daily releases with confidence.",
    "projects.project4.title": "Infrastructure Monitoring Solution",
    "projects.project4.description": "Implemented comprehensive monitoring and alerting",
    "projects.project4.content":
      "Developed a comprehensive monitoring and alerting solution using Prometheus, Grafana, and Alertmanager. Created custom dashboards for different teams and implemented intelligent alerting with PagerDuty integration, significantly reducing mean time to detection for incidents.",

    // Contact
    "contact.title": "Contact Me",
    "contact.subtitle": "Get in touch for opportunities or collaborations",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.personalInfo": "Personal Information",
    "contact.emailAddress": "contact@example.com",
    "contact.phone": "+1 (555) 123-4567",
    "contact.location": "San Francisco, CA",

    // Footer
    "footer.rights": "All rights reserved.",
  },
  pt: {
    // Navbar
    "nav.home": "Início",
    "nav.about": "Sobre",
    "nav.techStack": "Tecnologias",
    "nav.projects": "Projetos",
    "nav.contact": "Contato",

    // Home
    "home.hello": "Olá, sou John Doe",
    "home.description": "Engenheiro DevOps/Cloud apaixonado por automação e infraestrutura escalável.",
    "home.downloadCV": "Baixar CV",
    "home.contactMe": "Contate-me",

    // About
    "about.title": "Sobre Mim",
    "about.subtitle": "Minha formação e experiência",
    "about.p1":
      "Sou um Engenheiro DevOps/Cloud com mais de 5 anos de experiência em projetar, implementar e gerenciar infraestrutura em nuvem. Sou especializado em automatizar pipelines de implantação, otimizar custos de infraestrutura e garantir alta disponibilidade e escalabilidade de sistemas.",
    "about.p2":
      "Minha jornada começou como Administrador de Sistemas, onde desenvolvi uma base sólida em sistemas Linux e redes. Com a evolução das tecnologias em nuvem, fiz a transição para práticas DevOps, adotando Infraestrutura como Código e metodologias CI/CD.",
    "about.p3":
      "Sou apaixonado por resolver desafios complexos de infraestrutura e ajudar equipes a entregar software de forma mais eficiente por meio de automação e melhores práticas.",

    // Tech Stack
    "techStack.title": "Tecnologias",
    "techStack.subtitle": "Tecnologias e ferramentas com as quais trabalho",

    // Projects
    "projects.title": "Projetos",
    "projects.subtitle": "Alguns dos meus trabalhos recentes",
    "projects.project1.title": "Projeto de Migração para Nuvem",
    "projects.project1.description": "Migração de infraestrutura local para AWS",
    "projects.project1.content":
      "Liderei a migração de uma aplicação legada de data centers locais para AWS, implementando Infraestrutura como Código com Terraform e configurando pipelines CI/CD com GitHub Actions. Reduzi os custos de infraestrutura em 40% e melhorei o tempo de implantação em 70%.",
    "projects.project2.title": "Otimização de Cluster Kubernetes",
    "projects.project2.description": "Otimizei infraestrutura Kubernetes para desempenho e custo",
    "projects.project2.content":
      "Reprojetei e otimizei um cluster Kubernetes de produção, implementando auto-scaling, limites de recursos e marcação de alocação de custos. Configurei monitoramento abrangente com Prometheus e Grafana. Reduzi os custos mensais de nuvem em 35% enquanto melhorava o desempenho da aplicação.",
    "projects.project3.title": "Automação de Pipeline CI/CD",
    "projects.project3.description": "Construí pipelines de implantação automatizados para microsserviços",
    "projects.project3.content":
      "Projetei e implementei pipelines CI/CD para uma arquitetura de microsserviços usando Jenkins e Docker. Automatizei processos de teste, construção e implantação, reduzindo o tempo de implantação de horas para minutos e permitindo várias liberações diárias com confiança.",
    "projects.project4.title": "Solução de Monitoramento de Infraestrutura",
    "projects.project4.description": "Implementei monitoramento e alertas abrangentes",
    "projects.project4.content":
      "Desenvolvi uma solução abrangente de monitoramento e alertas usando Prometheus, Grafana e Alertmanager. Criei painéis personalizados para diferentes equipes e implementei alertas inteligentes com integração PagerDuty, reduzindo significativamente o tempo médio de detecção de incidentes.",

    // Contact
    "contact.title": "Contato",
    "contact.subtitle": "Entre em contato para oportunidades ou colaborações",
    "contact.name": "Nome",
    "contact.email": "Email",
    "contact.message": "Mensagem",
    "contact.send": "Enviar Mensagem",
    "contact.personalInfo": "Informações Pessoais",
    "contact.emailAddress": "contato@exemplo.com",
    "contact.phone": "+55 (11) 98765-4321",
    "contact.location": "São Paulo, SP",

    // Footer
    "footer.rights": "Todos os direitos reservados.",
  },
}

type LanguageContextType = {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en")

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "pt" : "en"))
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations["en"]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}