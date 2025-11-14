"use client"

import { useLanguage } from "@/components/language-context"
import { useProjects } from "@/hooks/use-api"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Projects() {
  const { t, language } = useLanguage()
  const { data: apiProjects, loading, error } = useProjects(true) // Get featured projects only
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  // Fallback to hardcoded projects if API fails
  const fallbackProjects = [
    {
      title: t("projects.project1.title"),
      content: t("projects.project1.content"),
      tags: t("projects.project1.tags") as unknown as string[],
      type: t("projects.project1.type"),
      github_url: null,
      demo_url: null,
    },
    {
      title: t("projects.project2.title"),
      content: t("projects.project2.content"),
      tags: t("projects.project2.tags") as unknown as string[],
      type: t("projects.project2.type"),
      github_url: null,
      demo_url: null,
    },
  ]

  // Use API projects if available, otherwise fallback
  const projects = apiProjects?.map(project => ({
    title: language === "en" ? project.title_en : project.title_pt,
    content: language === "en" ? project.description_en : project.description_pt,
    tags: project.skills,
    type: language === "en" ? project.project_type_en : project.project_type_pt,
    github_url: project.github_url,
    demo_url: project.demo_url,
  })) || fallbackProjects

  return (
    <motion.section
      id="projects"
      className="container py-24 sm:py-32 border-t px-4 sm:px-6"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto grid max-w-5xl gap-8">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
            {t("projects.title")}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 md:text-xl">{t("projects.subtitle")}</p>
        </div>
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Loading projects...</p>
          </div>
        )}
        
        {error && (
          <div className="text-center py-8">
            <p className="text-red-500">Failed to load projects. Showing cached content.</p>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2 * index, duration: 0.5 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow hover:border-blue-500 relative">
                <div className="flex items-center justify-between">
                  <CardHeader className="flex-1">
                    <CardTitle className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <Badge
                    variant="secondary"
                    className={`${
                      project.type === "Projeto pessoal" || project.type === "Personal project"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-blue-500 text-white"
                    } flex justify-center items-center m-3 max-w-[150px] text-center overflow-hidden text-ellipsis`}>
                    {project.type}
                  </Badge>
                </div>
                <CardContent className="space-y-2">
                  {project.content.split("\n\n").map((paragraph, i) => (
                    <p key={i} className="text-sm text-gray-500 dark:text-gray-400">
                      {paragraph}
                    </p>
                  ))}
                </CardContent>
                <CardFooter className="space-y-4">
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {(project.github_url || project.demo_url) && (
                    <div className="flex gap-2">
                      {project.github_url && (
                        <Button variant="outline" size="sm" asChild className="hover:border-blue-500">
                          <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
                            <FaGithub className="mr-2 h-4 w-4" />
                            GitHub
                          </Link>
                        </Button>
                      )}
                      {project.demo_url && (
                        <Button variant="outline" size="sm" asChild className="hover:border-blue-500">
                          <Link href={project.demo_url} target="_blank" rel="noopener noreferrer">
                            <FaExternalLinkAlt className="mr-2 h-4 w-4" />
                            Demo
                          </Link>
                        </Button>
                      )}
                    </div>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
