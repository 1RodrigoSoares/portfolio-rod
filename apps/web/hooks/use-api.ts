import { useState, useEffect } from 'react'
import { ApiService, PersonalInfo, Skill, Project, AboutSection } from '@/lib/api'

// Generic hook for API calls
function useApi<T>(
  apiCall: () => Promise<T>,
  dependencies: any[] = []
): { data: T | null; loading: boolean; error: string | null; refetch: () => void } {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await apiCall()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('API call failed:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, dependencies)

  return { data, loading, error, refetch: fetchData }
}

// Specific hooks for each API endpoint
export function usePersonalInfo() {
  return useApi<PersonalInfo>(() => ApiService.getPersonalInfo())
}

export function useSkills(featuredOnly: boolean = false) {
  return useApi<Skill[]>(() => ApiService.getSkills(featuredOnly), [featuredOnly])
}

export function useProjects(featuredOnly: boolean = false) {
  return useApi<Project[]>(() => ApiService.getProjects(featuredOnly), [featuredOnly])
}

export function useAboutSections() {
  return useApi<AboutSection[]>(() => ApiService.getAboutSections())
}

// Hook for health check
export function useHealthCheck() {
  return useApi<{ status: string; database: string }>(() => ApiService.healthCheck())
}
