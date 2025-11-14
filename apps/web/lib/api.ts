const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// Types based on the API models
export interface PersonalInfo {
  id: string
  full_name: string
  email: string
  phone?: string
  location?: string
  github_url?: string
  linkedin_url?: string
  profile_image_url?: string
  cv_url_en?: string
  cv_url_pt?: string
}

export interface Skill {
  id: string
  name: string
  category?: string
  proficiency_level?: number
  years_experience?: number
  is_featured: boolean
}

export interface Project {
  id: string
  title_en: string
  title_pt: string
  description_en: string
  description_pt: string
  project_type_en?: string
  project_type_pt?: string
  github_url?: string
  demo_url?: string
  image_url?: string
  is_featured: boolean
  display_order: number
  skills: string[]
}

export interface AboutSection {
  id: string
  section_key: string
  content_en: string
  content_pt: string
  display_order: number
}

export interface ContactMessage {
  name: string
  email: string
  message: string
}

export interface ContactMessageResponse extends ContactMessage {
  id: string
  is_read: boolean
  created_at: string
}

// API service functions
export class ApiService {
  private static async fetchApi<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error)
      throw error
    }
  }

  private static async postApi<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error)
      throw error
    }
  }

  static async getPersonalInfo(): Promise<PersonalInfo> {
    return this.fetchApi<PersonalInfo>('/personal-info')
  }

  static async getSkills(featuredOnly: boolean = false): Promise<Skill[]> {
    const queryParam = featuredOnly ? '?featured_only=true' : ''
    return this.fetchApi<Skill[]>(`/skills${queryParam}`)
  }

  static async getProjects(featuredOnly: boolean = false): Promise<Project[]> {
    const queryParam = featuredOnly ? '?featured_only=true' : ''
    return this.fetchApi<Project[]>(`/projects${queryParam}`)
  }

  static async getAboutSections(): Promise<AboutSection[]> {
    return this.fetchApi<AboutSection[]>('/about')
  }

  static async submitContactMessage(message: ContactMessage): Promise<{ message: string; status: string }> {
    return this.postApi<{ message: string; status: string }>('/contact', message)
  }

  static async getContactMessages(unreadOnly: boolean = false): Promise<ContactMessageResponse[]> {
    const queryParam = unreadOnly ? '?unread_only=true' : ''
    return this.fetchApi<ContactMessageResponse[]>(`/contact-messages${queryParam}`)
  }

  static async healthCheck(): Promise<{ status: string; database: string }> {
    return this.fetchApi<{ status: string; database: string }>('/health')
  }
}
