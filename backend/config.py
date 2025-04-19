import os
from flask_sqlalchemy import SQLAlchemy

# Configuración de la base de datos
DB_USERNAME = 'root'
DB_PASSWORD = 'Gabriel1993***'
DB_HOST = 'localhost'
DB_NAME = 'taller_mecanico'

DATABASE_URL = f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"

# SQLAlchemy init
db = SQLAlchemy()
