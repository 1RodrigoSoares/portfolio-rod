"use client"

import { useLanguage } from "@/components/language-context"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function TechStack() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const skills = [
    "Docker",
    "Ansible",
    "Linux",
    "Python",
    "Bash",
    "Power Automate",
    "Azure Pipelines",
    "Datadog",
  ]

  return (
    <motion.section
      id="tech-stack"
      className="container py-24 sm:py-32 border-t px-4 sm:px-6 bg-gray-50 dark:bg-gray-900"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto grid max-w-5xl gap-8">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
            {t("techStack.title")}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 md:text-xl">{t("techStack.subtitle")}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-8">
          {skills.map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <TechItem name={tech} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

function TechItem({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:shadow-md transition-shadow hover:border-blue-500 bg-white dark:bg-gray-800">
      <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800">
        <span className="text-blue-700 dark:text-blue-300 text-xl font-bold">{name.charAt(0)}</span>
      </div>
      <span className="text-sm font-medium">{name}</span>
    </div>
  )
}
