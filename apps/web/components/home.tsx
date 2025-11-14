"use client"

import { useLanguage } from "@/components/language-context"
import { usePersonalInfo } from "@/hooks/use-api"
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload} from "react-icons/fa"
import { IoCloudDownloadOutline } from "react-icons/io5";

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Home() {
  const { t, language} = useLanguage()
  const { data: personalInfo, loading, error } = usePersonalInfo()

  const handleDownloadCV = () => {
    if (personalInfo) {
      const cvUrl = language === "en" ? personalInfo.cv_url_en : personalInfo.cv_url_pt
      if (cvUrl) {
        const link = document.createElement("a")
        link.href = cvUrl
        link.download = `CV-${personalInfo.full_name}-${language.toUpperCase()}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        return
      }
    }
    
    // Fallback to static files
    const fileName = language === "en" ? "CV - Rodrigo - English.pdf" : "CV - Rodrigo - Portugues.pdf"
    const link = document.createElement("a")
    link.href = `/${fileName}`
    link.download = fileName
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
      <div className="flex flex-col lg:flex-row lg:justify-center lg:items-start gap-12 lg:gap-8">
        {/* Text Content */}
        <motion.div
          className="space-y-6 max-w-xl mx-auto lg:mx-0 text-center lg:text-left"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent">
              {t("home.hello")}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 md:text-xl">{t("home.description")}</p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Button
              className="rounded-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
              onClick={handleDownloadCV}
            >
              <IoCloudDownloadOutline className="mr-2 h-4 w-4" />
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
            {personalInfo?.github_url && (
              <Link href={personalInfo.github_url} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="rounded-full hover:text-blue-600 dark:hover:text-blue-400">
                  <FaGithub className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
            )}
            {personalInfo?.linkedin_url && (
              <Link href={personalInfo.linkedin_url} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="rounded-full hover:text-blue-600 dark:hover:text-blue-400">
                  <FaLinkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
            )}
            {personalInfo?.email && (
              <Link href={`mailto:${personalInfo.email}`}>
                <Button variant="ghost" size="icon" className="rounded-full hover:text-blue-600 dark:hover:text-blue-400">
                  <FaEnvelope className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Button>
              </Link>
            )}
          </div>
        </motion.div>

        <motion.div
          className="mx-auto lg:mx-0 lg:self-start"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="relative aspect-square w-[300px] rounded-full border border-blue-100 dark:border-blue-800 overflow-hidden">
            <Image
              src={personalInfo?.profile_image_url || "/rodrigo.jpeg?height=400&width=400"}
              alt={personalInfo?.full_name || "Rodrigo Assis"}
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
