# Taller Mecánico - Sistema de Gestión

Este proyecto es una aplicación completa para la gestión de un taller mecánico. Incluye un **backend** desarrollado con Flask y un **frontend** desarrollado con React.

## 🚀 Tecnologías utilizadas

### Backend
- Python 3
- Flask
- Flask-SQLAlchemy
- Flask-CORS
- MySQL

### Frontend
- React
- React Scripts
- Testing Library

---

## 📂 Estructura del proyecto

```
taller_mecanico_react/
├── backend/
│   ├── app.py
│   ├── db.py
│   ├── requirements.txt
│   ├── models/
│   │   ├── cliente.py
│   │   ├── vehiculo.py
│   │   ├── reparacion.py
│   ├── routes/
│   │   ├── cliente_routes.py
│   │   ├── vehiculo_routes.py
│   │   ├── reparacion_routes.py
├── taller-mecanico-frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── components/
│   │   │   ├── clientes/
│   │   │   │   ├── ClientesList.js
│   │   ├── services/
│   │   │   ├── api.js
│   ├── public/
│   │   ├── index.html
│   ├── package.json
```

---

## ⚙️ Requisitos previos

1. **Backend**:
   - Python 3.8 o superior
   - MySQL Server
   - pip (gestor de paquetes de Python)

2. **Frontend**:
   - Node.js (versión 16 o superior)
   - npm (incluido con Node.js)

---

## 📦 Instalación

### 1. Configuración del Backend

1. Clona el repositorio o descomprime el archivo `.zip`:
   ```bash
   git clone https://github.com/tu-repositorio/taller_mecanico_react.git
   cd taller_mecanico_react/backend
   ```

2. Crea y activa un entorno virtual (opcional pero recomendado):
   ```bash
   python -m venv venv
   source venv/bin/activate  # En Linux/Mac
   venv\Scripts\activate     # En Windows
   ```

3. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```

4. Configura la conexión a la base de datos MySQL en `backend/app.py`:
   ```python
   app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://usuario:contraseña@localhost/taller_mecanico'
   ```

5. Crea la base de datos en MySQL:
   ```sql
   CREATE DATABASE taller_mecanico;
   ```

6. Inicia el servidor:
   ```bash
   python app.py
   ```

   El backend estará disponible en `http://localhost:5000`.

---

### 2. Configuración del Frontend

1. Ve al directorio del frontend:
   ```bash
   cd ../taller-mecanico-frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm start
   ```

   El frontend estará disponible en `http://localhost:3000`.

---

## ▶️ Uso de la aplicación

1. Accede al frontend en `http://localhost:3000`.
2. El backend debe estar corriendo en `http://localhost:5000`.
3. Usa la interfaz para gestionar clientes, vehículos y reparaciones.

---

## 📚 Endpoints principales del Backend

### Clientes
- **GET** `/api/clientes` - Obtener todos los clientes.
- **POST** `/api/clientes` - Crear un nuevo cliente.
- **PUT** `/api/clientes/<id>` - Actualizar un cliente existente.
- **DELETE** `/api/clientes/<id>` - Eliminar un cliente.

### Vehículos
- **GET** `/api/vehiculos` - Obtener todos los vehículos.
- **POST** `/api/vehiculos` - Crear un nuevo vehículo.
- **PUT** `/api/vehiculos/<id>` - Actualizar un vehículo existente.
- **DELETE** `/api/vehiculos/<id>` - Eliminar un vehículo.

### Reparaciones
- **GET** `/api/reparaciones` - Obtener todas las reparaciones.
- **POST** `/api/reparaciones` - Crear una nueva reparación.
- **PUT** `/api/reparaciones/<id>` - Actualizar una reparación existente.
- **DELETE** `/api/reparaciones/<id>` - Eliminar una reparación.

---

## 🛠️ Scripts disponibles

### Backend
- `python app.py` - Inicia el servidor Flask.

### Frontend
- `npm start` - Inicia el servidor de desarrollo.
- `npm run build` - Genera una versión optimizada para producción.
- `npm test` - Ejecuta las pruebas.

---

## 📝 Notas adicionales

- Asegúrate de que el backend y el frontend estén corriendo simultáneamente.
- Si necesitas cambiar el puerto del backend, actualiza la constante `API_BASE` en el archivo `src/services/api.js` del frontend.

```js
const API_BASE = "http://localhost:5000/api";
```

---

## 📧 Contacto

Si tienes alguna pregunta o problema, no dudes en abrir un issue en el repositorio o contactarme en [tu-email@example.com](mailto:tu-email@example.com).