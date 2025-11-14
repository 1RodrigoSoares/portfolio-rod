-- Initial database setup for portfolio application
-- This file is executed when the database is first created

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLE DEFINITIONS
-- =====================================================

-- Personal information table
CREATE TABLE IF NOT EXISTS personal_info (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    location VARCHAR(255),
    github_url VARCHAR(500),
    linkedin_url VARCHAR(500),
    profile_image_url VARCHAR(500),
    cv_url_en VARCHAR(500),
    cv_url_pt VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Skills/Technologies table
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(100), -- e.g., 'DevOps', 'Programming', 'Cloud', 'Tools'
    proficiency_level INTEGER CHECK (proficiency_level >= 1 AND proficiency_level <= 5), -- 1-5 scale
    years_experience DECIMAL(3,1),
    is_featured BOOLEAN DEFAULT FALSE, -- to show on main tech stack
    icon_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_en VARCHAR(255) NOT NULL,
    title_pt VARCHAR(255) NOT NULL,
    description_en TEXT NOT NULL,
    description_pt TEXT NOT NULL,
    project_type_en VARCHAR(100), -- e.g., 'Personal project', 'Company project'
    project_type_pt VARCHAR(100), -- e.g., 'Projeto pessoal', 'Projeto corporativo'
    github_url VARCHAR(500),
    demo_url VARCHAR(500),
    image_url VARCHAR(500),
    start_date DATE,
    end_date DATE,
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Project-Skills relationship (many-to-many)
CREATE TABLE IF NOT EXISTS project_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(project_id, skill_id)
);

-- About sections table (for multilingual content)
CREATE TABLE IF NOT EXISTS about_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_key VARCHAR(50) NOT NULL, -- e.g., 'p1', 'p2', 'p3'
    content_en TEXT NOT NULL,
    content_pt TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Contact messages table (to store form submissions)
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Site analytics table (basic tracking)
CREATE TABLE IF NOT EXISTS page_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page VARCHAR(100) NOT NULL,
    ip_address INET,
    user_agent TEXT,
    referrer VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX idx_projects_featured ON projects(is_featured, display_order);
CREATE INDEX idx_skills_featured ON skills(is_featured, category);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX idx_page_views_page_created_at ON page_views(page, created_at DESC);

-- =====================================================
-- INITIAL DATA POPULATION
-- =====================================================

-- Insert personal information
INSERT INTO personal_info (
    full_name, email, phone, location, 
    github_url, linkedin_url, profile_image_url,
    cv_url_en, cv_url_pt
) VALUES (
    'Rodrigo Assis',
    'devrodrigosoares@gmail.com',
    '+55 (24) 99879-5119',
    'Juiz de Fora, MG',
    'https://github.com/1RodrigoSoares',
    'https://www.linkedin.com/in/1rodrigoassis/',
    '/rodrigo.jpeg',
    '/CV - Rodrigo - English.pdf',
    '/CV - Rodrigo - Portugues.pdf'
);

-- Insert skills/technologies
INSERT INTO skills (name, category, proficiency_level, years_experience, is_featured) VALUES
    ('Docker', 'DevOps', 4, 2.0, true),
    ('AWS', 'Cloud', 3, 1.5, true),
    ('Linux', 'Operating Systems', 4, 3.0, true),
    ('Python', 'Programming', 3, 2.0, true),
    ('Bash', 'Scripting', 4, 2.5, true),
    ('Power Automate', 'Automation', 4, 1.0, true),
    ('Azure Pipelines', 'CI/CD', 3, 1.0, true),
    ('Datadog', 'Monitoring', 3, 0.5, true),
    ('GitHub Actions', 'CI/CD', 4, 1.5, true),
    ('PostgreSQL', 'Database', 3, 1.0, false),
    ('Next.js', 'Frontend', 3, 1.0, false),
    ('TypeScript', 'Programming', 3, 1.0, false),
    ('Nginx', 'Web Server', 3, 1.0, false),
    ('Terraform', 'Infrastructure', 2, 0.5, false),
    ('Power BI', 'Analytics', 4, 1.0, false);

-- Insert about sections
INSERT INTO about_sections (section_key, content_en, content_pt, display_order) VALUES
    ('p1', 
     'I''m currently a QA intern at Thomson Reuters Brazil, where I plan, model, and execute tests, as well as automate processes and tests.',
     'Atualmente, sou estagiário de QA na Thomson Reuters Brasil, onde atuo no planejamento, modelagem e execução de testes, além da automação de processos e testes automatizados.',
     1),
    ('p2',
     'My tech journey began in 2021 during the pandemic, when I started studying Information Systems at UFJF. That''s when I discovered programming and found my passion in the field, developing a strong interest in analysis and problem-solving.',
     'Minha trajetória na tecnologia começou em 2021, durante a pandemia, quando iniciei o curso de Sistemas de Informação na UFJF. Foi nesse período que descobri a programação e me identifiquei com a área, desenvolvendo uma forte afinidade por análise e resolução de problemas.',
     2),
    ('p3',
     'I''ve been exploring the Cloud and DevOps ecosystem, learning about Infrastructure as Code, container orchestration, monitoring, and automation best practices. My current goal is to work professionally in cloud infrastructure, especially in DevOps or SRE roles.',
     'Tenho explorado o ecossistema de Cloud e DevOps, aprendendo sobre infraestrutura como código, orquestração de containers, monitoramento e boas práticas de automação. Meu objetivo atual é atuar profissionalmente na área de infraestrutura em nuvem, especialmente em funções voltadas para engenharia DevOps ou SRE.',
     3);

-- Insert projects
INSERT INTO projects (
    title_en, title_pt, description_en, description_pt, 
    project_type_en, project_type_pt, is_featured, display_order
) VALUES
    ('PowerBI Automation', 'Automação PowerBI',
     'I created an automation with Power Automate to streamline the process of sharing Power BI reports. Previously, a team member had to manually access Power BI every hour, update the data, take screenshots, and send them to the Teams channel. 

The automation now performs this flow automatically, including percentage calculations and conditional formatting for easier metric visualization. This project eliminated a repetitive task, freed up the team''s time, and ensured consistent, timely updates throughout the day.',
     'Desenvolvi uma automação no Power Automate para otimizar o processo de compartilhamento de relatórios do Power BI. Anteriormente, era necessário que um colaborador acessasse manualmente o Power BI a cada hora, atualizasse os dados, tirasse capturas de tela e enviasse ao canal do Teams. 

A automação passou a executar esse fluxo automaticamente, incluindo cálculos de porcentagem e aplicação de cores condicionais para facilitar a visualização das métricas. O projeto eliminou uma tarefa repetitiva, liberando tempo da equipe e garantindo atualizações consistentes e pontuais ao longo do dia.',
     'Company project', 'Projeto Corporativo',
     true, 1),
    
    ('Web Portfolio', 'Portfólio Web',
     'I built a personal portfolio to introduce myself, showcase my projects, and experiment with modern development tools and DevOps practices. The application was developed using Next.js, with support from Vercel''s V0 tool to speed up prototyping.

I used Docker to set up the local environment and create the application image. The deployment was done on an AWS EC2 instance, where the site runs inside a container.

I automated the entire CI/CD process with GitHub Actions: on every push to the main branch, a new build is generated, a Docker image is created, pushed to Docker Hub, and the application is updated automatically via SSH on the EC2 instance.

I also implemented a secure HTTPS connection using SSL/TLS certificates, with Certbot and Nginx. Nginx acts as an edge server, handling HTTPS requests on ports 80 and 443, ensuring secure and encrypted communication between users and the server. It''s also configured as a reverse proxy, forwarding external traffic to port 3000 on the server, which is mapped to port 3000 of the Docker container where the application is actually running.',
     'Criei um portfólio pessoal com o objetivo de me apresentar, mostrar meus projetos e, ao mesmo tempo, explorar ferramentas modernas de desenvolvimento e práticas DevOps. A aplicação foi desenvolvida em Next.js, com o suporte da ferramenta V0, da Vercel, para acelerar a prototipação.

Utilizei Docker para montar o ambiente local e gerar a imagem da aplicação. O deploy foi realizado em uma instância EC2 da AWS, onde o site roda dentro de um container. 

Automatizei todo o processo de integração e entrega contínua com GitHub Actions: a cada push na branch main, é gerado um novo build, criada uma imagem Docker, enviada ao Docker Hub, e a aplicação é atualizada automaticamente via SSH na instância EC2.

Implementei ainda uma conexão HTTPS segura com certificado SSL/TLS, usando a biblioteca Certbot em conjunto com o Nginx. O Nginx atua como servidor de borda, validando as conexões HTTPS nas portas 80 e 443, garantindo uma comunicação segura e criptografada entre os usuários e o servidor. Ele também está configurado como proxy reverso, redirecionando o tráfego externo para a porta 3000 do servidor, que está mapeada para a porta 3000 do container Docker onde a aplicação efetivamente roda.',
     'Personal project', 'Projeto pessoal',
     true, 2);

-- Get the project and skill IDs for relationships
-- PowerBI Automation project skills
INSERT INTO project_skills (project_id, skill_id)
SELECT p.id, s.id 
FROM projects p, skills s 
WHERE p.title_en = 'PowerBI Automation' 
AND s.name IN ('Power Automate', 'Power BI');

-- Web Portfolio project skills  
INSERT INTO project_skills (project_id, skill_id)
SELECT p.id, s.id 
FROM projects p, skills s 
WHERE p.title_en = 'Web Portfolio' 
AND s.name IN ('Docker', 'GitHub Actions', 'AWS', 'Nginx', 'Next.js', 'TypeScript');

-- =====================================================
-- USEFUL VIEWS FOR COMMON QUERIES
-- =====================================================

-- View to get projects with their skills
CREATE VIEW project_details AS
SELECT 
    p.id,
    p.title_en,
    p.title_pt,
    p.description_en,
    p.description_pt,
    p.project_type_en,
    p.project_type_pt,
    p.github_url,
    p.demo_url,
    p.image_url,
    p.is_featured,
    p.display_order,
    ARRAY_AGG(s.name ORDER BY s.name) as skills,
    p.created_at,
    p.updated_at
FROM projects p
LEFT JOIN project_skills ps ON p.id = ps.project_id
LEFT JOIN skills s ON ps.skill_id = s.id
GROUP BY p.id, p.title_en, p.title_pt, p.description_en, p.description_pt, 
         p.project_type_en, p.project_type_pt, p.github_url, p.demo_url, 
         p.image_url, p.is_featured, p.display_order, p.created_at, p.updated_at;

-- View for featured skills (main tech stack)
CREATE VIEW featured_skills AS
SELECT name, category, proficiency_level, years_experience
FROM skills 
WHERE is_featured = true
ORDER BY category, proficiency_level DESC;
