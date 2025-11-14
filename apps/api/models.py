from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

class PersonalInfo(BaseModel):
    id: str
    full_name: str
    email: str
    phone: Optional[str] = None
    location: Optional[str] = None
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    profile_image_url: Optional[str] = None
    cv_url_en: Optional[str] = None
    cv_url_pt: Optional[str] = None

class Skill(BaseModel):
    id: str
    name: str
    category: Optional[str] = None
    proficiency_level: Optional[int] = None
    years_experience: Optional[float] = None
    is_featured: bool = False

class Project(BaseModel):
    id: str
    title_en: str
    title_pt: str
    description_en: str
    description_pt: str
    project_type_en: Optional[str] = None
    project_type_pt: Optional[str] = None
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    image_url: Optional[str] = None
    is_featured: bool = False
    display_order: int = 0
    skills: List[str] = []

class AboutSection(BaseModel):
    id: str
    section_key: str
    content_en: str
    content_pt: str
    display_order: int = 0

class ContactMessage(BaseModel):
    name: str
    email: str
    message: str

class ContactMessageResponse(BaseModel):
    id: str
    name: str
    email: str
    message: str
    is_read: bool = False
    created_at: datetime
