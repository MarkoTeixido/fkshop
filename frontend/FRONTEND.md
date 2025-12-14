# Funkoshop Frontend

Este directorio contiene la aplicación cliente (UI) para **Funkoshop**. Está construida con **Next.js** (App Router), **TypeScript** y **Tailwind CSS**, ofreciendo una experiencia de usuario moderna, rápida y responsiva.

## 🛠 Tecnologías Utilizadas

El proyecto utiliza las siguientes tecnologías clave:

- **Core**:
  - `next`: Framework de React para producción (versión 16+). Utiliza el **App Router** para el enrutamiento.
  - `react` / `react-dom`: Librería para construir interfaces de usuario.
  - `typescript`: Superset de JavaScript que añade tipado estático para mayor robustez.
- **Estilos**:
  - `tailwindcss`: Framework CSS "utility-first" para un estilizado rápido y consistente (v4).
  - `@tailwindcss/postcss`: Procesamiento de CSS.
- **Interacción & Estado**:
  - `axios`: Cliente HTTP para realizar peticiones al Backend.
  - `react-hook-form`: Manejo eficiente de formularios.
  - `zod`: Esquemas de validación (usado junto con react-hook-form).
  - `sweetalert2`: Alertas y modales elegantes.
  - `swiper`: Carruseles y sliders táctiles.
  - `react-icons`: Colección de iconos populares (FontAwesome, Material, etc.).

## 📂 Estructura del Proyecto

La estructura sigue las convenciones del **App Router** de Next.js, organizando el código dentro de `src/`.

```text
frontend/
├── .env.local            # Variables de entorno locales
├── next.config.js        # Configuración de Next.js
├── public/               # Archivos estáticos
├── src/
│   ├── app/              # Rutas y páginas (App Router)
│   │   ├── admin/        # Sección de administración
│   │   ├── shop/         # Tienda y catálogo
│   │   ├── layout.tsx    # Layout raíz (Navbar, Footer generales)
│   │   └── page.tsx      # Página de inicio (Home)
│   ├── components/       # Componentes de UI reutilizables
│   ├── context/          # React Contexts (ej. estado global)
│   ├── hooks/            # Custom Hooks
│   ├── services/         # Capa de comunicación con la API (Axios services)
│   ├── types/            # Definiciones de tipos TypeScript
│   └── utils/            # Funciones de ayuda
```

### Arquitectura y Flujo
1. **Pages (`src/app`)**: Definen las vistas y rutas. Son Server Components por defecto, pero pueden usar `"use client"` para interactividad.
2. **Components**: Bloques de construcción de la UI (botones, tarjetas, formularios).
3. **Services**: Encapsulan la lógica de llamadas HTTP al backend. Por ejemplo, `product.service.ts` maneja las peticiones relacionadas con productos.
4. **Context**: Gestiona estados globales si es necesario (ej. carrito de compras).

## 🚀 Instalación y Configuración Local

### 1. Prerrequisitos
- Tener instalado **Node.js** (v18 o superior recomendado para Next 16).
- El **Backend** debería estar corriendo (usualmente en puerto 3000) para que la API funcione correctamente.

### 2. Instalación de Dependencias
Navega a la carpeta `frontend` e instala los paquetes:

```bash
cd frontend
npm install
```

### 3. Configuración de Variables de Entorno
Crea o modifica el archivo `.env.local` en la raíz de `frontend`. Debería apuntar a tu backend:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```
> **Nota**: Verifica en `src/services/api.ts` o archivos similares qué variable de entorno se está utilizando exactamente si `NEXT_PUBLIC_API_URL` no parece surtir efecto.

### 4. Ejecutar el Servidor de Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:3001` (o 3000 si el puerto está libre, pero Next suele tomar el siguiente si el backend ocupa el 3000).

### 5. Configuración de `next.config.js`
Si tienes problemas con imágenes externas, asegúrate de que los dominios estén permitidos en `next.config.js`.

## ✅ Comandos Disponibles

- `npm run dev`: Inicia el entorno de desarrollo.
- `npm run build`: Compila la aplicación para producción.
- `npm start`: Inicia el servidor de producción (requiere `build` previo).
- `npm run lint`: Ejecuta el linter (ESLint) para buscar errores de código.
