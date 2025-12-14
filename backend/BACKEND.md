# Funkoshop Backend

Este directorio contiene la lógica del servidor (API) para la aplicación E-Commerce **Funkoshop**. Está construido sobre **Node.js** utilizando **Express** y sigue una arquitectura en capas (N-Tier) para asegurar escalabilidad y mantenibilidad.

## 🛠 Tecnologías Utilizadas

El proyecto utiliza las siguientes librerías y herramientas principales:

- **Core**:
  - `express`: Framework web para Node.js.
  - `dotenv`: Manejo de variables de entorno.
- **Base de Datos**:
  - `mysql2`: Cliente MySQL para Node.js.
  - `sequelize`: ORM (Object-Relational Mapper) para interactuar con la base de datos de manera orientada a objetos.
- **Seguridad & Autenticación**:
  - `bcryptjs`: Hashing de contraseñas.
  - `jsonwebtoken` (JWT): Generación y validación de tokens de sesión.
  - `cookie-session` / `express-session`: Manejo de sesiones de usuario.
  - `cors`: Habilitar solicitudes de recursos cruzados (Cross-Origin Resource Sharing).
- **Validación & Utilidades**:
  - `express-validator`: Middleware para validar datos de entrada en las rutas.
  - `method-override`: Permite usar verbos HTTP como PUT o DELETE en lugares donde el cliente no lo soporta nativamente (ej. formularios HTML simples).
- **Desarrollo**:
  - `nodemon`: Reinicia el servidor automáticamente ante cambios en el código.

## 📂 Estructura del Proyecto

La estructura sigue el patrón **MVC** con una separación adicional de preocupaciones mediante Servicios y Repositorios.

```text
backend/
├── .env                  # Variables de entorno (no incluido en repo)
├── funkoshopdb.sql       # Script SQL inicial para la base de datos
├── server.js             # Punto de entrada del servidor
├── src/
│   ├── app.js            # Configuración de la aplicación Express
│   ├── config/           # Configuración de la DB y Sequelize
│   ├── controllers/      # Controladores (Manejan Request/Response)
│   ├── middlewares/      # Middlewares (Auth, Error Handler, Logging)
│   ├── models/           # Definiciones de modelos Sequelize
│   ├── repositories/     # Capa de acceso a datos (Queries directas a DB/ORM)
│   ├── router/           # Definición de rutas (Endpoints)
│   ├── services/         # Lógica de negocio pura
│   └── utils/            # Utilidades generales
```

### Flujo de la Información
1. **Router**: Recibe la petición HTTP y la dirige al controlador correspondiente.
2. **Controller**: Extrae los datos de la petición, valida la entrada y llama al Servicio.
3. **Service**: Contiene la lógica de negocio. Si necesita datos, llama al Repositorio.
4. **Repository**: Interactúa con la base de datos (Models/Sequelize) para obtener o guardar data.

## 🚀 Instalación y Configuración Local

Sigue estos pasos para levantar el backend en tu entorno local.

### 1. Prerrequisitos
- Tener instalado **Node.js** (v14 o superior).
- Tener instalado **MySQL** y el servicio corriendo.

### 2. Instalación de Dependencias
Navega a la carpeta `backend` e instala los paquetes:

```bash
cd backend
npm install
```

### 3. Configuración de Variables de Entorno
Crea un archivo `.env` en la raíz de la carpeta `backend` basándote en las claves usadas en el proyecto:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=tu_password
DB_NAME=funkoshop
DB_PORT=3306
SESSION_SECRET_1=clave_secreta_1
SESSION_SECRET_2=clave_secreta_2
JWT_SECRET=tu_jwt_secret
```

### 4. Base de Datos
Tienes dos opciones para inicializar la base de datos:

**Opción A: Script SQL**
Importa el archivo `funkoshopdb.sql` en tu gestor de base de datos (MySQL Workbench, DBeaver, etc.).

**Opción B: Sincronización Sequelize**
El proyecto está configurado para intentar sincronizar los modelos al iniciar (`conn.js`). Asegúrate de que la base de datos `funkoshop` (o el nombre que hayas puesto en `.env`) exista en tu servidor MySQL.

> **Nota**: `sequelize.sync()` puede crear las tablas si no existen, pero asegúrate de tener la DB creada.

### 5. Ejecutar el Servidor

Para desarrollo (con recarga automática):
```bash
npm run dev
```

Para producción:
```bash
npm start
```

El servidor debería iniciar en: `http://localhost:3000` (o el puerto que hayas configurado).

## ✅ Pruebas (Testing)

Puedes probar los endpoints utilizando herramientas como **Postman** o **Insomnia**.

Ejemplos de rutas base:
- `GET /shop/items` - Listar productos.
- `POST /auth/login` - Iniciar sesión.
- `GET /admin/dashboard` - Panel de administración (requiere autenticación).

### Autenticación
El sistema utiliza sesiones/cookies y JWT. Para probar rutas protegidas en Postman, asegúrate de que el login haya establecido correctamente la cookie de sesión o envía el token correspondiente si el endpoint lo requiere explícitamente en headers (aunque este backend parece priorizar sesiones por cookie).
