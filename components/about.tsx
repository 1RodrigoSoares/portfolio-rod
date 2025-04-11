"use client"

import { useLanguage } from "@/components/language-context"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function About() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

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
        <div className="space-y-4">
          <motion.p
            className="text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {t("about.p1")}
          </motion.p>
          <motion.p
            className="text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {t("about.p2")}
          </motion.p>
          <motion.p
            className="text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {t("about.p3")}
          </motion.p>
        </div>
      </div>
    </motion.section>
  )
}
