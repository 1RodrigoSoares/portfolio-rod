from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import os
from dotenv import load_dotenv

from database import execute_query
from models import PersonalInfo, Skill, Project, AboutSection, ContactMessage, ContactMessageResponse

load_dotenv()

app = FastAPI(
    title="Portfolio API",
    description="API for Rodrigo's Portfolio",
    version="1.0.0"
)

# Add CORS middleware
origins = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://localhost:3001").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Portfolio API is running!"}

@app.get("/health")
async def health_check():
    try:
        execute_query("SELECT 1")
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database connection failed: {str(e)}")

@app.get("/personal-info", response_model=PersonalInfo)
async def get_personal_info():
    try:
        query = "SELECT * FROM personal_info LIMIT 1"
        result = execute_query(query)
        if not result:
            raise HTTPException(status_code=404, detail="Personal info not found")
        return PersonalInfo(**dict(result[0]))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/skills", response_model=List[Skill])
async def get_skills(featured_only: bool = False):
    try:
        if featured_only:
            query = "SELECT * FROM skills WHERE is_featured = true ORDER BY category, name"
        else:
            query = "SELECT * FROM skills ORDER BY category, name"
        
        results = execute_query(query)
        return [Skill(**dict(row)) for row in results]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/projects", response_model=List[Project])
async def get_projects(featured_only: bool = False):
    try:
        if featured_only:
            query = """
                SELECT 
                    p.*,
                    COALESCE(ARRAY_AGG(s.name) FILTER (WHERE s.name IS NOT NULL), '{}') as skills
                FROM projects p
                LEFT JOIN project_skills ps ON p.id = ps.project_id
                LEFT JOIN skills s ON ps.skill_id = s.id
                WHERE p.is_featured = true
                GROUP BY p.id
                ORDER BY p.display_order
            """
        else:
            query = """
                SELECT 
                    p.*,
                    COALESCE(ARRAY_AGG(s.name) FILTER (WHERE s.name IS NOT NULL), '{}') as skills
                FROM projects p
                LEFT JOIN project_skills ps ON p.id = ps.project_id
                LEFT JOIN skills s ON ps.skill_id = s.id
                GROUP BY p.id
                ORDER BY p.display_order
            """
        
        results = execute_query(query)
        return [Project(**dict(row)) for row in results]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/about", response_model=List[AboutSection])
async def get_about_sections():
    try:
        query = "SELECT * FROM about_sections ORDER BY display_order"
        results = execute_query(query)
        return [AboutSection(**dict(row)) for row in results]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/contact", response_model=dict)
async def submit_contact_message(message: ContactMessage):
    try:
        query = """
            INSERT INTO contact_messages (name, email, message)
            VALUES (%s, %s, %s)
            RETURNING id
        """
        result = execute_query(query, (message.name, message.email, message.message))
        
        if result:
            return {"message": "Message sent successfully", "status": "success"}
        else:
            raise HTTPException(status_code=500, detail="Failed to save message")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/contact-messages", response_model=List[ContactMessageResponse])
async def get_contact_messages(unread_only: bool = False):
    try:
        if unread_only:
            query = "SELECT * FROM contact_messages WHERE is_read = false ORDER BY created_at DESC"
        else:
            query = "SELECT * FROM contact_messages ORDER BY created_at DESC"
        
        results = execute_query(query)
        return [ContactMessageResponse(**dict(row)) for row in results]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    
    host = os.getenv("API_HOST", "0.0.0.0")
    port = int(os.getenv("API_PORT", "8000"))
    
    uvicorn.run(app, host=host, port=port)
