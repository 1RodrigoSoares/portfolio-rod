-- Useful queries for development and testing
-- Connect to your database and run these queries to interact with your data

-- =====================================================
-- BASIC QUERIES
-- =====================================================

-- Get all personal information
SELECT * FROM personal_info;

-- Get all featured skills (what appears on tech stack)
SELECT name, category, proficiency_level, years_experience 
FROM skills 
WHERE is_featured = true 
ORDER BY category, name;

-- Get all projects with their skills
SELECT 
    title_en,
    title_pt,
    project_type_en,
    ARRAY_AGG(s.name) as technologies
FROM projects p
LEFT JOIN project_skills ps ON p.id = ps.project_id
LEFT JOIN skills s ON ps.skill_id = s.id
WHERE p.is_featured = true
GROUP BY p.id, title_en, title_pt, project_type_en, display_order
ORDER BY display_order;

-- Get about sections in order
SELECT section_key, content_en, content_pt 
FROM about_sections 
ORDER BY display_order;

-- =====================================================
-- ANALYTICS QUERIES
-- =====================================================

-- Contact form submissions summary
SELECT 
    COUNT(*) as total_messages,
    COUNT(CASE WHEN is_read = false THEN 1 END) as unread_messages,
    DATE_TRUNC('day', created_at) as date
FROM contact_messages 
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY date DESC;

-- Page views by page
SELECT 
    page,
    COUNT(*) as views,
    COUNT(DISTINCT ip_address) as unique_visitors
FROM page_views 
GROUP BY page
ORDER BY views DESC;

-- Recent contact messages
SELECT name, email, LEFT(message, 100) as message_preview, created_at
FROM contact_messages 
ORDER BY created_at DESC 
LIMIT 10;

-- =====================================================
-- MANAGEMENT QUERIES
-- =====================================================

-- Add a new skill
INSERT INTO skills (name, category, proficiency_level, years_experience, is_featured) 
VALUES ('New Technology', 'Category', 3, 1.0, false);

-- Update skill proficiency
UPDATE skills 
SET proficiency_level = 4, years_experience = 2.0 
WHERE name = 'Docker';

-- Add a new project (you'll need to add skills separately)
INSERT INTO projects (
    title_en, title_pt, description_en, description_pt,
    project_type_en, project_type_pt, is_featured, display_order
) VALUES (
    'New Project', 'Novo Projeto',
    'English description', 'Descrição em português',
    'Personal project', 'Projeto pessoal',
    true, 3
);

-- Link skills to a project (replace the UUIDs with actual IDs)
INSERT INTO project_skills (project_id, skill_id)
SELECT p.id, s.id 
FROM projects p, skills s 
WHERE p.title_en = 'New Project' 
AND s.name IN ('Docker', 'AWS', 'Python');

-- Mark contact message as read
UPDATE contact_messages 
SET is_read = true 
WHERE id = 'your-message-id-here';

-- =====================================================
-- CLEANUP QUERIES (BE CAREFUL!)
-- =====================================================

-- Delete old page views (older than 30 days)
-- DELETE FROM page_views WHERE created_at < NOW() - INTERVAL '30 days';

-- Delete spam contact messages (uncomment and modify as needed)
-- DELETE FROM contact_messages WHERE message ILIKE '%spam%' OR email LIKE '%@spam.com';

-- =====================================================
-- BACKUP QUERIES
-- =====================================================

-- Export projects data
SELECT 
    title_en, title_pt, description_en, description_pt,
    project_type_en, project_type_pt, github_url, demo_url,
    ARRAY_AGG(s.name) as skills
FROM projects p
LEFT JOIN project_skills ps ON p.id = ps.project_id
LEFT JOIN skills s ON ps.skill_id = s.id
GROUP BY p.id, title_en, title_pt, description_en, description_pt, 
         project_type_en, project_type_pt, github_url, demo_url
ORDER BY display_order;

-- Export skills data
SELECT name, category, proficiency_level, years_experience, is_featured
FROM skills
ORDER BY category, name;
