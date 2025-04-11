"use client"

import { useLanguage } from "@/components/language-context"
import { Download, Github, Linkedin, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Home() {
  const { t } = useLanguage()

  const handleDownloadCV = () => {
    const link = document.createElement("a")
    link.href = "/john-doe-cv.pdf"
    link.download = "john-doe-cv.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <motion.section
      id="home"
      className="container py-24 sm:py-32 px-4 sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-12 lg:gap-8">
        {/* Text Content */}
        <motion.div
          className="space-y-6 max-w-xl mx-auto lg:mx-0 text-center lg:text-left"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              {t("home.hello")}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 md:text-xl">{t("home.description")}</p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Button
              className="rounded-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
              onClick={handleDownloadCV}
            >
              <Download className="mr-2 h-4 w-4" />
              {t("home.downloadCV")}
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-blue-200 hover:border-blue-500 dark:border-blue-800 dark:hover:border-blue-600"
              asChild
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                {t("home.contactMe")}
              </a>
            </Button>
          </div>
          <div className="flex gap-4 justify-center lg:justify-start">
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="rounded-full hover:text-blue-600 dark:hover:text-blue-400">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="rounded-full hover:text-blue-600 dark:hover:text-blue-400">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
            <Link href="mailto:contact@example.com">
              <Button variant="ghost" size="icon" className="rounded-full hover:text-blue-600 dark:hover:text-blue-400">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          className="mx-auto lg:mx-0 lg:self-start"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="relative aspect-square w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] rounded-full border border-blue-100 dark:border-blue-800 overflow-hidden">
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="John Doe"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 360px, 400px"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
