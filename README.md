# Funkoshop

¡Bienvenido a Funkoshop!

Esta es una aplicación web moderna que simula un E-Commerce real de figuras coleccionables. El proyecto ha evolucionado a una arquitectura separada (**Frontend** y **Backend**) para ofrecer una experiencia más robusta, escalable y dinámica, siguiendo las mejores prácticas de desarrollo.

Ofrece funcionalidades completas de búsqueda, filtrado, carrito de compras y panel de administración para la gestión de productos (CRUD, Actividad y Reportes).

![377shots_so](https://res.cloudinary.com/dp7jr9k94/image/upload/v1766876304/994shots_so_uu8ucw.png)
![373shots_so](https://res.cloudinary.com/dp7jr9k94/image/upload/v1766876471/643shots_so_ddh9gs.png)
![118shots_so](https://res.cloudinary.com/dp7jr9k94/image/upload/v1766876445/558shots_so_qwhk79.png)

## Stack de Tecnologías 🎇

El proyecto está dividido en dos grandes áreas, siguiendo una arquitectura Cliente-Servidor:

### Frontend (Cliente)
- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS 3
- **Estado Global:** Context API + Hooks
- **Librerías:** Axios (HTTP), Swiper (Carruseles), React Icons.

### Backend (Servidor)
- **Entorno:** Node.js
- **Framework:** Express.js
- **Arquitectura:** N-Tier (Capas: Controllers, Services, Repositories).
- **Base de Datos:** MySQL
- **ORM:** Sequelize
- **Seguridad:** JWT, Cookie-Sessions, BcryptJS, CORS.

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local._

### Prerrequisitos

> **⚠️ IMPORTANTE**
>
> Es necesario tener instalado **Node.js** (v18+ recomendado), **NPM** y **MySQL** corriendo en tu máquina.

### Clonar el Repositorio

```bash
git clone https://github.com/MarkoTeixido/Funkoshop.git
```
*(Asegúrate de usar la URL correcta de tu repositorio)*

---

### Configuración del Backend

1. Navega a la carpeta del backend e instala las dependencias:
   ```bash
   cd backend
   npm install
   ```

2. Configura tu base de datos. Asegúrate de tener un esquema `funkoshop` creado en tu MySQL local.

3. Crea un archivo `.env` en `backend/` con tus credenciales:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=tu_password
   DB_NAME=funkoshop
   SESSION_SECRET_1=secreto1
   JWT_SECRET=secretojwt
   ```

4. Inicia el servidor (sincronizará las tablas automáticamente):
   ```bash
   npm run dev
   ```

---

### Configuración del Frontend

1. Abre una nueva terminal, navega a la carpeta del frontend e instala dependencias:
   ```bash
   cd frontend
   npm install
   ```

2. Crea un archivo `.env.local` en `frontend/` para conectar con el backend (opcional si usas defaults):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

3. Inicia la aplicación cliente:
   ```bash
   npm run dev
   ```

¡Listo! Accede a la aplicación en `http://localhost:3001` (o el puerto que indique Next.js).

## Documentación Detallada 📚

Para profundizar en la arquitectura y estructura de cada parte, consulta los README específicos:

- [Documentación Backend](./backend/BACKEND.md) - Arquitectura, Endpoints y Estructura.
- [Documentación Frontend](./frontend/README.md) - Componentes, Estilos y App Router.

## Autor

* **Marko Teixido** - [https://github.com/MarkoTeixido](https://github.com/MarkoTeixido)
