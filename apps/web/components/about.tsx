"use client"

import { useLanguage } from "@/components/language-context"
import { useAboutSections } from "@/hooks/use-api"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function About() {
  const { t, language } = useLanguage()
  const { data: aboutSections, loading, error } = useAboutSections()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  // Fallback content paragraphs
  const fallbackContent = [
    t("about.p1"),
    t("about.p2"),
    t("about.p3"),
  ]

  // Use API content if available, otherwise fallback
  const content = aboutSections?.map(section => 
    language === "en" ? section.content_en : section.content_pt
  ) || fallbackContent

  return (
    <motion.section
      id="about"
      className="container py-24 sm:py-32 border-t px-4 sm:px-6"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto grid max-w-3xl gap-8">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
            {t("about.title")}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 md:text-xl">{t("about.subtitle")}</p>
        </div>
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Loading about content...</p>
          </div>
        )}
        
        {error && (
          <div className="text-center py-8">
            <p className="text-red-500">Failed to load about content. Showing cached content.</p>
          </div>
        )}

        <div className="space-y-4">
          {content.map((paragraph, index) => (
            <motion.p
              key={index}
              className="text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2 * (index + 1), duration: 0.5 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
