# Funkoshop Frontend

Este directorio contiene la interfaz de usuario (Cliente) para la aplicación E-Commerce **Funkoshop**. Está construida con **Next.js 14 (App Router)** y **TypeScript**, utilizando **Tailwind CSS** para los estilos.

## 🛠 Tecnologías Utilizadas

- **Framework**: [Next.js 14](https://nextjs.org/) (React Framework).
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/) (Typado estático).
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS framework).
- **HTTP Client**: `axios` (para comunicación con el backend).
- **Estado Global/Context**: React Context API (`CartContext`, `AuthContext`).
- **Iconos**: `iconify` / `react-icons`.
- **Carrusel**: `swiper`.

## 📂 Estructura del Proyecto

El proyecto sigue la estructura recomendada por el **App Router** de Next.js, con una organización modular de componentes.

```text
frontend/
├── public/                 # Archivos estáticos (imágenes, fuentes)
├── src/
│   ├── app/                # Rutas de la aplicación (App Router)
│   │   ├── admin/          # Panel de administración (Rutas protegidas)
│   │   ├── shop/           # Tienda pública (Catálogo, Producto, Carrito, Checkout)
│   │   ├── layout.tsx      # Layout raíz
│   │   └── page.tsx        # Página de inicio (Landing)
│   ├── components/         # Componentes de React reutilizables
│   │   ├── admin/          # Componentes específicos del admin (Tablas, Formularios)
│   │   ├── shop/           # Componentes de la tienda (ProductCard, Filtros)
│   │   ├── header/         # Navbar y Menús
│   │   ├── footer/         # Pie de página
│   │   ├── home/           # Secciones de la Home (Banner, Colecciones)
│   │   ├── quiz/           # Componente interactivo "Funko Quiz"
│   │   └── ui/             # Componentes base de UI (Botones, Modales)
│   ├── context/            # Contextos de React (Auth, Carrito)
│   ├── hooks/              # Custom Hooks (Lógica reutilizable)
│   ├── services/           # Capa de servicios API (Axios instances)
│   ├── types/              # Definiciones de tipos TypeScript (Interfaces)
│   └── utils/              # Funciones de utilidad y constantes
└── tailwind.config.ts      # Configuración de Tailwind
```

### 🧩 Características Clave

1.  **Diseño Responsivo**: Adaptado a móviles y escritorio mediante Tailwind.
2.  **Rutas Protegidas**: Uso de Higher-Order Components (HOC) o verificación en `useEffect`/Layouts para proteger `/admin`.
3.  **Carrito de Compras**: Persistencia local o mediante sesión de usuario, gestionado por `CartContext`.
4.  **Autenticación**: Integración con JWT del backend.

---

## 🚀 Instalación y Ejecución

Sigue estos pasos para levantar el frontend en tu entorno local.

### 1. Prerrequisitos
- Tener instalado **Node.js** (v18 o superior recomendado para Next.js 14).
- El **Backend** debe estar corriendo en `http://localhost:3000` (o el puerto configurado).

### 2. Instalación de Dependencias
Navega a la carpeta `frontend` e instala los paquetes:

```bash
cd frontend
npm install
```

### 3. Configuración (.env)
Asegúrate de tener un archivo `.env.local` (o `.env`) si es necesario configurar la URL de la API, aunque por defecto suele apuntar a localhost en desarrollo.

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. Ejecutar el Servidor de Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:3001` (o 3000 si el backend está en otro puerto, Next.js intentará usar el 3000 por defecto, si está ocupado usará el 3001).

### 5. Construcción para Producción

Para generar una build optimizada:

```bash
npm run build
npm start
```

---

## ✅ Guía de Estilos & Componentes

*   **Colors**: Utiliza las variables CSS definidas en `global.css` o las clases de utilidad de Tailwind (ej. `bg-primary`, `text-dark`).
*   **Fuentes**: Se utiliza `Inter` y `Outfit` (o la configurada en `layout.tsx`).
*   **Componentes**:
    *   Para crear nuevas páginas, agrégalas en `src/app`.
    *   Para componentes reusables, usa `src/components/ui` si son genéricos o `src/components/[feature]` si son específicos.
