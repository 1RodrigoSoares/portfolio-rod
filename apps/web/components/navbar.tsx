"use client"

import type React from "react"

import { useLanguage } from "@/components/language-context"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Menu } from "lucide-react"

export default function Navbar() {
  const { t, language, toggleLanguage } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="font-semibold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent flex items-center pl-1">
          <span className="mr-2">☁️</span> Rodrigo Assis
        </div>

        <nav className="hidden md:flex gap-6">
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, "home")}
            className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400"
          >
            {t("nav.home")}
          </a>
          <a
            href="#about"
            onClick={(e) => scrollToSection(e, "about")}
            className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400"
          >
            {t("nav.about")}
          </a>
          <a
            href="#tech-stack"
            onClick={(e) => scrollToSection(e, "tech-stack")}
            className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400"
          >
            {t("nav.techStack")}
          </a>
          <a
            href="#projects"
            onClick={(e) => scrollToSection(e, "projects")}
            className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400"
          >
            {t("nav.projects")}
          </a>
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "contact")}
            className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400"
          >
            {t("nav.contact")}
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="hover:text-blue-600 hover:border-blue-600 dark:hover:text-blue-400 dark:hover:border-blue-400"
          >
            {language === "en" ? "PT" : "EN"}
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-950 border-b py-6">
          <nav className="container flex flex-col items-center gap-6 px-4 sm:px-6">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, "home")}
              className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400"
            >
              {t("nav.home")}
            </a>
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, "about")}
              className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400"
            >
              {t("nav.about")}
            </a>
            <a
              href="#tech-stack"
              onClick={(e) => scrollToSection(e, "tech-stack")}
              className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400"
            >
              {t("nav.techStack")}
            </a>
            <a
              href="#projects"
              onClick={(e) => scrollToSection(e, "projects")}
              className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400"
            >
              {t("nav.projects")}
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "contact")}
              className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400"
            >
              {t("nav.contact")}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
