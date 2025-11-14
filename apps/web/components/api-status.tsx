"use client"

import { useHealthCheck } from "@/hooks/use-api"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"

export default function ApiStatus() {
  const { data: healthCheck, loading, error } = useHealthCheck()
  const [isVisible, setIsVisible] = useState(false)

  // Show status for a few seconds on page load
  useEffect(() => {
    if (!loading) {
      setIsVisible(true)
      const timer = setTimeout(() => setIsVisible(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [loading])

  if (!isVisible || loading) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Badge 
        variant={error ? "destructive" : "default"}
        className={`${
          error 
            ? "bg-red-100 text-red-800 border-red-200" 
            : "bg-green-100 text-green-800 border-green-200"
        } animate-pulse`}
      >
        API: {error ? "Offline" : "Online"}
      </Badge>
    </div>
  )
}
