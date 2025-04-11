"use client"

import Navbar from "@/components/navbar"
import { useLanguage } from "@/components/language-context"
import Home from "@/components/home"
import About from "@/components/about"
import TechStack from "@/components/tech-stack"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Portfolio() {
  const { language, toggleLanguage, t } = useLanguage()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur dark:bg-gray-950/95 dark:backdrop-blur">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <Navbar />
        </div>
      </header>
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4">
          <Home />
          <About />
          <TechStack />
          <Projects />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  )
}