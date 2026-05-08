# Gifs App - React 19 + TypeScript

### 🚀 [Ver Demo en Netlify](https://earnest-truffle-6d6b59.netlify.app/)

Esta es una aplicación moderna para buscar y visualizar GIFs utilizando la API de Giphy, construida como parte de un proceso de aprendizaje profundo en React.

## 🛠️ Tecnologías y Características

- **React 19**: Aprovechando el nuevo **React Compiler** para optimizaciones automáticas.
- **TypeScript**: Tipado estricto en toda la aplicación, incluyendo interfaces detalladas para las respuestas de la API.
- **Vite 8**: Como entorno de desarrollo rápido y empaquetador.
- **Axios**: Para la gestión de peticiones HTTP con instancias centralizadas.
- **Caché Personalizada**: Implementación de un sistema de caché mediante `useRef` para evitar peticiones duplicadas y mejorar el rendimiento.
- **Historial Dinámico**: Gestión de búsquedas recientes con persistencia lógica y eliminación de duplicados.

## 📦 Instalación

1. Clonar el repositorio:
   ```bash
   git clone <tu-url-de-github>
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   - Renombra el archivo `.env.template` a `.env`.
   - Agrega tu clave de API de Giphy:
     ```env
     VITE_GIPHY_KEY=tu_clave_aqui
     ```

4. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## 📐 Arquitectura

El proyecto sigue una estructura modular basada en dominios dentro de `src/gifs/`:
- `actions/`: Lógica de peticiones y casos de uso.
- `api/`: Configuración de Axios.
- `components/`: Componentes visuales desacoplados.
- `hooks/`: Custom hooks para la lógica de estado y caché.
- `interfaces/`: Definiciones de tipos para el dominio.
