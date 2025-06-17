# 🏊‍♂️ AquaSwim - Ecommerce de Artículos de Natación

Sistema de ecommerce especializado en artículos de natación con gestión de productos dinámicos y funcionalidad de carrito.

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-brightgreen)](https://candiamaximiliano.github.io/ecommerce-AW1/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-Semantic-orange)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS3-Modern-blue)](https://www.w3.org/Style/CSS/)

## 🚀 Características Principales

- **📄 Datos dinámicos** - Carga de productos desde JSON externo
- **🔄 Sistema asíncrono** - Gestión de datos con fetch API
- **🏠 Productos destacados** - Selección especial en página principal
- **🛒 Funcionalidad de carrito** - Gestión de productos con validación de stock
- **📱 Diseño responsive** - Optimizado para dispositivos móviles y desktop
- **🎨 Interfaz moderna** - Diseño atractivo con animaciones CSS

## 🏗️ Estructura del Proyecto

```
ecommerce-AW1/
├── data/
│   └── products.json              # Base de datos de productos
├── js/
│   ├── api-service.js             # Servicio de datos simplificado
│   ├── cart-manager.js            # Gestión del carrito
│   ├── home-products.js           # Productos destacados
│   ├── dynamic-product-loader.js  # Carga dinámica de productos
│   ├── product-card-interaction.js # Interacciones de productos
│   ├── navbar-component.js        # Navegación dinámica
│   ├── site-structure.js          # Estructura de páginas
│   └── logoutRoot.js               # Funcionalidad de logout
├── pages/
│   ├── js/
│   │   ├── login.js               # Lógica de login
│   │   └── logout.js              # Logout para páginas internas
│   ├── trajes.html                # Página de trajes
│   ├── antiparras.html            # Página de antiparras
│   ├── gorras.html                # Página de gorras
│   ├── login.html                 # Página de login
│   └── registro.html              # Página de registro
├── css/
│   ├── index.css                  # Estilos principales
│   ├── cards.css                  # Estilos de productos
│   ├── cart.css                   # Estilos del carrito
│   ├── home-products.css          # Estilos específicos del home
│   └── forms.css                  # Estilos de formularios
├── assets/                        # Imágenes y recursos
└── index.html                     # Página principal
```

## 🛠️ Tecnologías

- **JavaScript ES6+** - Lógica de aplicación optimizada
- **Fetch API** - Consumo directo de datos
- **CSS3** - Estilos modernos con Grid y Flexbox
- **HTML5** - Estructura semántica
- **GitHub Pages** - Hosting y CDN

## 🌍 Demo y Instalación

### Demo Online
```
https://candiamaximiliano.github.io/ecommerce-AW1/
```

### Desarrollo Local
```bash
git clone https://github.com/candiamaximiliano/ecommerce-AW1.git
cd ecommerce-AW1

Abrir el archivo index.html en el navegador
```

## 🔧 API de Datos

### Estructura de Productos
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

## 🎨 Diseño

### Paleta de Colores
```css
:root {
  --color-primario: #1A3A5A;
  --color-primario-hover: #2C5D87;
  --color-acento: #3498DB;
  --color-fondo-principal: #0D1B2A;
  --color-fondo-secundario: #172A3A;
}
```

## 📄 Licencia

Proyecto desarrollado para la materia de Aplicaciones Web 1 del Colegio Universitario IES Siglo XXI.

## 👨‍💻 Autor

**Maximiliano Candia**

*DNI: 40.626.005*
- GitHub: [@candiamaximiliano](https://github.com/candiamaximiliano)