# Portfolio Database

This directory contains the PostgreSQL database setup for the portfolio application.

## Quick Start

1. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your desired database credentials
   ```

2. **Start the database:**
   ```bash
   docker-compose up -d
   ```

3. **Stop the database:**
   ```bash
   docker-compose down
   ```

4. **Connect to the database:**
   ```bash
   # Using psql
   psql -h localhost -p 5432 -U postgres -d portfolio

   # Or using docker exec
   docker exec -it portfolio-postgres psql -U postgres -d portfolio
   ```

## Configuration

- **Database Name:** `portfolio`
- **Username:** `postgres` (configurable in .env)
- **Password:** Set in `.env` file
- **Port:** `5432`
- **Host:** `localhost`

## Data Persistence

The database data is persisted using Docker volumes. The volume `postgres_data` will maintain your data even when containers are stopped or removed.

## Security Notes

- Change the default password in the `.env` file
- The `.env` file is excluded from git for security
- Consider using Docker secrets in production environments

## Database Schema

The database contains the following main tables:

### Core Tables
- **`personal_info`** - Your personal information (name, email, contact details, CV links)
- **`skills`** - Technologies and skills with proficiency levels and categories
- **`projects`** - Portfolio projects with multilingual content
- **`project_skills`** - Many-to-many relationship between projects and skills
- **`about_sections`** - About page content in multiple languages

### Analytics Tables
- **`contact_messages`** - Messages from the contact form
- **`page_views`** - Basic page view tracking

### Initialization Files
- **`01-init.sql`** - Main schema and initial data
- **`02-sample-data.sql`** - Additional sample data for development
- **`queries.sql`** - Useful queries for development and management

### Key Features
- **UUID primary keys** for all tables
- **Multilingual support** (English/Portuguese) for content
- **Proficiency tracking** for skills with years of experience
- **Featured flags** to control what appears on the main portfolio
- **Analytics tracking** for contact forms and page views
- **Indexes** for performance optimization
- **Views** for common queries

The schema is designed to support your current portfolio content while being flexible enough for future additions.
