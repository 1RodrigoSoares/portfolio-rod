import os
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

load_dotenv()

def get_db_connection():
    try:
        host = os.getenv("DB_HOST") or os.getenv("POSTGRES_HOST", "")
        port = os.getenv("DB_PORT") or os.getenv("POSTGRES_PORT", "")
        database = os.getenv("DB_NAME") or os.getenv("POSTGRES_DB", "")
        user = os.getenv("DB_USER") or os.getenv("POSTGRES_USER", "")
        password = os.getenv("DB_PASSWORD") or os.getenv("POSTGRES_PASSWORD", "")
        
        conn = psycopg2.connect(
            host=host,
            port=port,
            database=database,
            user=user,
            password=password,
            cursor_factory=RealDictCursor
        )
        return conn
    except psycopg2.Error as e:
        print(f"Error connecting to database: {e}")
        raise

def execute_query(query, params=None):
    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(query, params)
        
        if query.strip().upper().startswith('SELECT'):
            return cursor.fetchall()
        else:
            conn.commit()
            return cursor.rowcount
    except psycopg2.Error as e:
        if conn:
            conn.rollback()
        print(f"Database error: {e}")
        raise
    finally:
        if conn:
            conn.close()
