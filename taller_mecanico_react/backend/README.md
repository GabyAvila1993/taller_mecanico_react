# Backend - Taller Mecánico

Este proyecto es una API RESTful desarrollada con Flask para la gestión de un taller mecánico. Incluye funcionalidades para manejar clientes, vehículos y reparaciones.

## 🚀 Tecnologías utilizadas

- Python 3
- Flask
- Flask-SQLAlchemy
- Flask-CORS
- MySQL

## ⚙️ Requisitos

- Python 3.8 o superior
- MySQL Server
- pip

## 📦 Instalación

1. Clonar el repositorio o descomprimir el `.zip`.

2. Crear y activar un entorno virtual (opcional pero recomendado):

```bash
python -m venv venv
source venv/bin/activate  # En Linux/Mac
venv\Scripts\activate   # En Windows
```

3. Instalar dependencias:

```bash
pip install -r requirements.txt
```

4. Configurar la conexión a la base de datos MySQL en `app.py`:

```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://usuario:contraseña@localhost/taller_mecanico'
```

⚠️ Asegúrate de tener creada la base de datos `taller_mecanico` en tu servidor MySQL.

```sql
CREATE DATABASE taller_mecanico;
```

## ▶️ Ejecutar el servidor

```bash
python app.py
```

La API estará corriendo en `http://localhost:5000`

## 📚 Endpoints principales

- `/api/clientes` - CRUD de clientes
- `/api/vehiculos` - CRUD de vehículos
- `/api/reparaciones` - CRUD de reparaciones