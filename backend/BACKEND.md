# Funkoshop Backend

Este directorio contiene la lógica del servidor (API) para la aplicación E-Commerce **Funkoshop**. Está construido sobre **Node.js** utilizando **Express** y ha sido refactorizado para seguir estrictamente una **Arquitectura en Capas** y principios **SOLID**, asegurando alta mantenibilidad, escalabilidad y un código limpio.

## 🛠 Tecnologías Utilizadas

- **Core**:
  - `express`: Framework web.
  - `dotenv`: Manejo de variables de entorno.
- **Base de Datos**:
  - `mysql2`: Cliente MySQL.
  - `sequelize`: ORM para modelado de datos y consultas.
- **Seguridad**:
  - `bcryptjs`: Hashing seguro de contraseñas.
  - `jsonwebtoken` (JWT): Autenticación stateless segura.
  - `cookie-session`: Manejo de sesiones (legacy support).
  - `cors`: Configuración de acceso cruzado.
- **Validación & Utils**:
  - `express-validator`: Validación robusta de datos de entrada.
  - `method-override`: Soporte para verbos HTTP en clientes antiguos.

## 🏛 Arquitectura del Proyecto

El proyecto sigue una **Arquitectura en Capas (Layered Architecture)**, separando claramente las responsabilidades. Ya no se utilizan controladores monolíticos; cada componente tiene una única responsabilidad.

### 📂 Estructura de Directorios

```text
backend/
├── src/
│   ├── app.js               # Configuración principal de Express
│   ├── config/              # Configuración de DB y Sequelize
│   ├── controllers/         # CAPA DE PRESENTACIÓN: Maneja Requests y Responses
│   │   ├── admin/           # Controladores para panel de administración
│   │   ├── auth/            # Controladores de autenticación y perfil
│   │   ├── common/          # Controladores compartidos (categorías, licencias)
│   │   └── shop/            # Controladores para la tienda pública y carrito
│   ├── services/            # CAPA DE NEGOCIO: Lógica pura, sin req/res ni SQL directo
│   │   ├── admin/           # Servicios específicos de administración
│   │   ├── auth/            # Lógica de login, registro, tokens
│   │   ├── common/          # Lógica básica
│   │   └── shop/            # Lógica de compras, carrito y catálogo
│   ├── repositories/        # CAPA DE DATOS: Acceso a DB (Sequelize), queries puras
│   ├── models/              # Definiciones de modelos Sequelize (Tablas)
│   ├── routes/              # Definición de rutas (Endpoints) agrupadas por módulo
│   ├── middlewares/         # Autenticación, validación, manejo de errores
│   └── utils/               # Constantes, helpers, clases de error custom
```

### 📐 Principios de Diseño Aplicados

1.  **Single Responsibility Principle (SRP)**:
    -   Cada controlador maneja un recurso específico.
    -   Cada servicio contiene solo lógica de negocio de su dominio.
    -   Cada repositorio encapsula todas las queries a la base de datos de su entidad.
2.  **Separation of Concerns (SoC)**:
    -   Los **Controladores** NO contienen lógica de negocio ni acceso a DB. Solo validan input y formatean output.
    -   Los **Servicios** NO saben de HTTP (req/res) ni de SQL. Reciben datos puros y devuelven datos puros.
    -   Los **Repositorios** NO saben de negocio. Solo ejecutan operaciones CRUD y queries complejas.
3.  **Dependency Rule**: Las dependencias apuntan hacia adentro o hacia capas inferiores (Controller -> Service -> Repository).

---

## 🚀 Guía de Desarrollo

### Rutas
Las rutas están modularizadas en `src/routes/`:
- `/admin`: Rutas protegidas para el panel de administración.
- `/shop`: Rutas públicas de la tienda y privadas del usuario (carrito, perfil).
- `/auth`: Login, registro y logout.

### Flujo de una Petición (Ejemplo: Crear Producto)
1.  **Route** (`routes/admin/productRoutes.js`): Recibe `POST /products`. Ejecuta middlewares de auth y validación.
2.  **Controller** (`controllers/admin/productController.js`): Recibe los datos limpios. Llama a `productService.createProduct(data)`.
3.  **Service** (`services/admin/productService.js`): Aplica reglas de negocio (ej. validar duplicados lógicos). Llama a `productRepository.create(data)`.
4.  **Repository** (`repositories/productRepository.js`): Ejecuta `model.create(data)` con Sequelize. Retorna la entidad creada.

---

## 🔧 Instalación y Ejecución

### 1. Variables de Entorno (.env)
Asegúrate de tener configurado tu archivo `.env` en `backend/`:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=tu_password
DB_NAME=funkoshop
JWT_SECRET=tu_secreto_super_seguro
# ... otras configuraciones
```

### 2. Iniciar Servidor
```bash
# Desarrollo
npm run dev

# Producción
npm start
```
