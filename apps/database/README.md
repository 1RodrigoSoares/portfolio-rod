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

Place your SQL schema files in the `init/` directory. They will be executed automatically when the database is first created.
