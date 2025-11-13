"use client"

import { useLanguage } from "@/components/language-context"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"

<FaGithub size={20} />

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t py-8 md:py-10 px-4 sm:px-6">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
        <p className="text-sm leading-loose text-gray-500 dark:text-gray-400 text-center md:text-left">
          © {new Date().getFullYear()} Rodrigo Assis. {t("footer.rights")}
        </p>
        <div className="flex gap-4">
          <Link href="https://github.com/1RodrigoSoares" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="rounded-full hover:text-blue-600 dark:hover:text-blue-400">
              <FaGithub className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          <Link href="https://www.linkedin.com/in/1rodrigoassis/" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="rounded-full hover:text-blue-600 dark:hover:text-blue-400">
              <FaLinkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </Link>
          <Link href="mailto:devrodrigosoares@gmail.com">
            <Button variant="ghost" size="icon" className="rounded-full hover:text-blue-600 dark:hover:text-blue-400">
              <FaEnvelope className="h-4 w-4" />
              <span className="sr-only">Email</span>
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  )
}
