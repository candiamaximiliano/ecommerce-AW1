# 🏊‍♂️ AquaSwim - Entrega Final Trabajo Integrador
## Aplicaciones Web 1 - Colegio Universitario IES Siglo XXI

**Autor:** Maximiliano Candia - DNI: 40.626.005

---

## 🌐 Proyecto Publicado

**Enlace de acceso público:** [https://candiamaximiliano.github.io/ecommerce-AW1/](https://candiamaximiliano.github.io/ecommerce-AW1/)

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-brightgreen)](https://candiamaximiliano.github.io/ecommerce-AW1/)

---

## 📹 Video Explicativo

**Enlace al video:** [*Pendiente de agregar*]

> El video incluirá un recorrido completo por todas las funcionalidades del sitio.

---

## 🗺️ Roadmap de Desarrollo

### **Etapa 1: Planificación y Estructura Base**
- **Objetivos:** Definir la estructura del proyecto y crear el layout básico
- **Actividades realizadas:**
  - Análisis de requisitos para un ecommerce de artículos de natación
  - Creación de la estructura de directorios
  - Desarrollo del HTML semántico para todas las páginas
  - Implementación de CSS base con diseño responsive

### **Etapa 2: Diseño y Experiencia de Usuario**
- **Objetivos:** Crear una interfaz atractiva y funcional
- **Actividades realizadas:**
  - Definición de paleta de colores y sistema de diseño
  - Implementación de componentes UI reutilizables
  - Desarrollo de grillas de productos responsivas
  - Creación de formularios estilizados
  - Integración de botón flotante de WhatsApp

### **Etapa 3: Funcionalidad Básica**
- **Objetivos:** Implementar la lógica básica del ecommerce
- **Actividades realizadas:**
  - Creación de la base de datos JSON de productos
  - Desarrollo del sistema de carga dinámica de productos
  - Implementación de interacciones básicas de tarjetas de productos
  - Creación de la estructura de navegación

### **Etapa 4: Gestión de Datos y Persistencia**
- **Objetivos:** Implementar manejo de datos con localStorage y sessionStorage
- **Actividades realizadas:**
  - Desarrollo del sistema de carrito con localStorage
  - Implementación de gestión de sesiones con sessionStorage
  - Creación del sistema de autenticación básico
  - Desarrollo de la página dedicada del carrito

### **Etapa 5: Mejoras y Optimización Final**
- **Objetivos:** Pulir la experiencia y añadir mejoras significativas
- **Actividades realizadas:**
  - Implementación de mejoras de accesibilidad
  - Optimización de rendimiento y carga asíncrona
  - Refinamiento de la experiencia de usuario
  - Testing y corrección de bugs
  - Documentación completa del proyecto

---

## 🛠️ Tecnologías Utilizadas

### **Tecnologías Core**
- **HTML5:** Estructura semántica y accesible
- **CSS3:** Estilos modernos con Grid, Flexbox y animaciones
- **JavaScript ES6+:** Lógica de aplicación con clases y módulos modernos

### **APIs Web Integradas**
- **Web Storage API (localStorage/sessionStorage):** 
  - **Justificación:** Necesaria para persistir el carrito de compras entre sesiones y mantener el estado del usuario logueado
  - **Funcionalidad:** Permite que los usuarios no pierdan sus productos al cerrar el navegador
- **Fetch API:** 
  - **Justificación:** Manejo asíncrono moderno para cargar productos desde JSON
  - **Funcionalidad:** Carga eficiente de datos sin recargar la página

### **Tecnologías de Hosting y Desarrollo**
- **GitHub Pages:** 
  - **Justificación:** Hosting gratuito y confiable, ideal para proyectos estáticos
  - **Funcionalidad:** Despliegue automático desde el repositorio principal
- **Git:** Control de versiones para el seguimiento del desarrollo

### **Tecnologías No Contempladas Inicialmente**
- **CSS Custom Properties (Variables CSS):**
  - **Justificación:** Facilita el mantenimiento del sistema de colores y permite futuras personalizaciones
  - **Integración:** Sistema centralizado de variables en `:root`
- **Modules Pattern en JavaScript:**
  - **Justificación:** Mejor organización del código y reutilización de componentes
  - **Integración:** Separación de responsabilidades en múltiples archivos especializados

---

## 🎯 Características del Producto Final

### **Funcionalidades Principales**
- ✅ Catálogo dinámico de productos con 3 categorías
- ✅ Sistema de autenticación con persistencia de sesión
- ✅ Carrito de compras completo con localStorage
- ✅ Navegación responsive para todos los dispositivos
- ✅ Botón de contacto directo por WhatsApp
- ✅ Página dedicada para gestión del carrito
- ✅ Cálculo automático de totales y subtotales
- ✅ Validación de stock y control de inventario

### **Experiencia de Usuario**
- 🎨 Diseño moderno con animaciones CSS
- 📱 Totalmente responsive (mobile-first)
- ⚡ Carga rápida con fetch asíncrono
- 🔒 Datos persistentes entre sesiones
- 💬 Mensajes informativos y confirmaciones
---

## 🏗️ Estructura Técnica del Proyecto

```
ecommerce-AW1/
├── data/
│   └── products.json              # Base de datos de productos
├── js/
│   ├── api-service.js             # Servicio de datos
│   ├── cart-manager.js            # Gestión del carrito con localStorage
│   ├── session-manager.js         # Gestión de sesiones
│   ├── home-products.js           # Productos destacados
│   ├── dynamic-product-loader.js  # Carga dinámica
│   ├── product-card-interaction.js # Interacciones de productos
│   ├── navbar-component.js        # Navegación dinámica
│   ├── site-structure.js          # Estructura de páginas
│   ├── whatsapp-button.js         # Contacto por WhatsApp
│   ├── footer-component.js        # Componente de pie de página
│   └── logoutRoot.js              # Funcionalidad de logout
├── pages/
│   ├── js/
│   │   ├── login.js               # Lógica de autenticación
│   │   ├── cart-page.js           # Página del carrito
│   │   └── logout.js              # Logout para páginas internas
│   ├── trajes.html, antiparras.html, gorras.html # Categorías
│   ├── carrito.html               # Página del carrito
│   ├── login.html, registro.html  # Autenticación
├── css/                           # Estilos modulares organizados
└── assets/                        # Recursos multimedia
```

---

## 🎨 Sistema de Diseño

### **Paleta de Colores**
```css
:root {
  --color-primario: #1A3A5A;        /* Azul marino profesional */
  --color-primario-hover: #2C5D87;   /* Hover state */
  --color-acento: #3498DB;           /* Azul vibrante */
  --color-fondo-principal: #0D1B2A;  /* Fondo oscuro */
  --color-fondo-secundario: #172A3A; /* Fondo secundario */
  --color-texto-principal: #E0E6ED;  /* Texto principal */
  --color-texto-secundario: #A8B2BC; /* Texto secundario */
  --color-borde: #2A3A4A;           /* Bordes sutiles */
}
```
---

## 📊 Datos de Productos

### **Estructura de la Base de Datos**
```json
{
  "categories": {
    "trajes": {
      "name": "Trajes de Baño",
      "products": [
        {
          "id": "traje001",
          "name": "Traje Competición Speed",
          "price": 75000,
          "formattedPrice": "$75.000,00",
          "inStock": true,
          "stock": 15,
          "featured": true,
          "imageUrl": "...",
          "category": "trajes"
        }
      ]
    }
  }
}
```
---

### **Conclusiones Finales**
Este proyecto representó un salto cualitativo significativo en mis habilidades de desarrollo web. La transición de conceptos básicos a la implementación de un sistema completo con persistencia, autenticación y accesibilidad me ha preparado para proyectos más ambiciosos.

El enfoque de desarrollo incremental por etapas demostró ser fundamental para el éxito del proyecto, permitiendo construir funcionalidades complejas de manera sostenible y bien documentada.

---

## 📞 Contacto

**Maximiliano Candia**
- **GitHub:** [@candiamaximiliano](https://github.com/candiamaximiliano)
- **WhatsApp:** [+54 9 370 458-6465](https://wa.me/5493704586465)
- **Email:** [candiamaximiliano.dev@gmail.com](mailto:candiamaximiliano.dev@gmail.com)

---

## 📄 Licencia

Proyecto desarrollado para la materia **Aplicaciones Web 1** del Colegio Universitario IES Siglo XXI.

*Trabajo Integrador Final - 2025*

---