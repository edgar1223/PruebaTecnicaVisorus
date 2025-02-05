# Prueba Técnica Frontend - Visorus

Este proyecto es una aplicación web desarrollada como parte de una prueba técnica para el puesto de **Desarrollador Frontend**. La aplicación permite gestionar categorías y artículos, con funcionalidades CRUD (Crear, Leer, Actualizar, Eliminar) y un diseño responsive que se adapta a diferentes dispositivos.

## Características Principales

- **Gestión de Categorías**:
  - Crear, editar, eliminar y listar categorías.
  - Validación de formularios para campos obligatorios y longitud mínima.

- **Gestión de Artículos**:
  - Crear, editar, eliminar y listar artículos.
  - Asociación de artículos a categorías.
  - Gestión de múltiples precios por artículo.
  - Validación de formularios para campos obligatorios, longitud mínima y valores numéricos.

- **Diseño Responsive**:
  - La aplicación se adapta a pantallas pequeñas, medianas y grandes.
  - Menú colapsable en dispositivos móviles.

- **Tecnologías Utilizadas**:
  - **Angular**: Framework principal para el desarrollo de la aplicación.
  - **Angular Material**: Componentes UI para un diseño moderno y consistente.
  - **Bootstrap**: Sistema de grillas y utilidades para un diseño responsive.
  - **RxJS**: Manejo de operaciones asíncronas y flujos de datos.
  - **TypeScript**: Lenguaje de programación para un código más seguro y mantenible.

## Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado lo siguiente:

- **Node.js**: Versión 16 o superior.
- **Angular CLI**: Para gestionar el proyecto Angular.
- **Git**: Para clonar el repositorio.

## Instalación

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local:

1. **Clonar el Repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/prueba-tecnica-frontend.git
   cd prueba-tecnica-frontend
    ```
2. **Instalar Dependencias**:

   ```bash
     npm install
    ```

3. **Configurar el Entorno:**:
    Asegúrate de que el backend esté configurado y en ejecución.

    Si es necesario, configura las variables de entorno en el archivo environment.ts.
      
4. **Ejecutar la Aplicación:**:

   ```bash
     ng serve
    ```

## Estructura del Proyecto

   ```bash
     src/
    ├── app/
    │   ├── core/               # Servicios, interceptores y modelos
    │   ├── features/           # Módulos por funcionalidad (categorías, artículos)
    │   ├── shared/             # Componentes y pipes reutilizables
    │   ├── app.routes.ts       # Configuración de rutas
    ├── environments/           # Configuración de entornos (dev/prod)
    └── styles.scss             # Estilos globales
    ```

