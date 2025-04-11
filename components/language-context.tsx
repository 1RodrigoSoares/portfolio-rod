"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type Language = "en" | "pt"

const translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.techStack": "Tech Stack",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    "home.hello": "Hello, I'm Rodrigo",
    "home.description": "I'm passionate about learning and solving problems. I’m especially interested in how cloud, automation, and best practices can turn ideas into real solutions.",
    "home.downloadCV": "Download CV",
    "home.contactMe": "Contact Me",

    "about.title": "About Me",
    "about.subtitle": "My background and experience",
    "about.p1":
      "I'm currently a QA intern at Thomson Reuters Brazil, where I plan, model, and execute tests, as well as automate processes and tests.",
    "about.p2":
      "My tech journey began in 2021 during the pandemic, when I started studying Information Systems at UFJF. That’s when I discovered programming and found my passion in the field, developing a strong interest in analysis and problem-solving.",
    "about.p3":
      "I've been exploring the Cloud and DevOps ecosystem, learning about Infrastructure as Code, container orchestration, monitoring, and automation best practices. My current goal is to work professionally in cloud infrastructure, especially in DevOps or SRE roles.",

    "techStack.title": "Skills",
    "techStack.subtitle": "Tools and technologies I've been studying and practicing",

    "projects.title": "Projects",
    "projects.subtitle": "Some of my recent projects",
    "projects.project1.title": "PowerBI Automation",
    "projects.project1.description": "Automated Power BI reports using Power Automate for recurring delivery in Teams",
    "projects.project1.content":
      "I created an automation with Power Automate to streamline the process of sharing Power BI reports. Previously, a team member had to manually access Power BI every hour, update the data, take screenshots, and send them to the Teams channel. The automation now performs this flow automatically, including percentage calculations and conditional formatting for easier metric visualization. This project eliminated a repetitive task, freed up the team’s time, and ensured consistent, timely updates throughout the day.",
    "projects.project1.tags": ["Power Automate", "Power BI", "Automation"],

    "contact.title": "Contact",
    "contact.subtitle": "Get in touch for opportunities or collaborations",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.personalInfo": "Personal Information",
    "contact.emailAddress": "devrodrigosoares@gmail.com",
    "contact.phone": "+55 (24) 99879-5119",
    "contact.location": "Juiz de Fora, MG",

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
    "home.hello": "Prazer, me chamo Rodrigo.",
    "home.description": "Apaixonado por aprender e resolver problemas. Interessado em como a nuvem, a automação e boas práticas podem transformar ideias em soluções reais.",
    "home.downloadCV": "Baixar CV",
    "home.contactMe": "Contate-me",

    // About
    "about.title": "Sobre Mim",
    "about.subtitle": "Minha formação e experiência",
    "about.p1":
      "Atualmente, sou estagiário de QA na Thomson Reuters Brasil, onde atuo no planejamento, modelagem e execução de testes, além da automação de processos e testes automatizados.",
    "about.p2":
      "Minha trajetória na tecnologia começou em 2021, durante a pandemia, quando iniciei o curso de Sistemas de Informação na UFJF. Foi nesse período que descobri a programação e me identifiquei com a área, desenvolvendo uma forte afinidade por análise e resolução de problemas.",
    "about.p3":
      "Tenho explorado o ecossistema de Cloud e DevOps, aprendendo sobre infraestrutura como código, orquestração de containers, monitoramento e boas práticas de automação. Meu objetivo atual é atuar profissionalmente na área de infraestrutura em nuvem, especialmente em funções voltadas para engenharia DevOps ou SRE.",

    // Tech Stack
    "techStack.title": "Habilidades",
    "techStack.subtitle": "Ferramentas e tecnologias que venho estudando e praticando",

    // Projects
    "projects.title": "Projetos",
    "projects.subtitle": "Alguns dos meus projetos recentes",
    "projects.project1.title": "Automação PowerBI",
    "projects.project1.description": "Automatizei relatórios do Power BI com Power Automate para envio recorrente no Teams",
    "projects.project1.content":
      "Desenvolvi uma automação no Power Automate para otimizar o processo de compartilhamento de relatórios do Power BI. Anteriormente, era necessário que um colaborador acessasse manualmente o Power BI a cada hora, atualizasse os dados, tirasse capturas de tela e enviasse ao canal do Teams. A automação passou a executar esse fluxo automaticamente, incluindo cálculos de porcentagem e aplicação de cores condicionais para facilitar a visualização das métricas. O projeto eliminou uma tarefa repetitiva, liberando tempo da equipe e garantindo atualizações consistentes e pontuais ao longo do dia.",
    "projects.project1.tags": ["Power Automate", "Power BI", "Automação"],

    // Contact
    "contact.title": "Contato",
    "contact.subtitle": "Entre em contato para oportunidades ou colaborações",
    "contact.name": "Nome",
    "contact.email": "Email",
    "contact.message": "Mensagem",
    "contact.send": "Enviar Mensagem",
    "contact.personalInfo": "Informações Pessoais",
    "contact.emailAddress": "devrodrigosoares@gmail.com",
    "contact.phone": "+55 (24) 99879-5119",
    "contact.location": "JUiz de Fora, MG",

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

  const t = (key: string): any => {
    const value = translations[language][key as keyof typeof translations["en"]]
    return value ?? key
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