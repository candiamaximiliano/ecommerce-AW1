# 🏊‍♂️ AquaSwim - Ecommerce de Artículos de Natación

Sistema de ecommerce completo especializado en artículos de natación con gestión de productos dinámicos, autenticación de usuarios y funcionalidad avanzada de carrito de compras.

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-brightgreen)](https://candiamaximiliano.github.io/ecommerce-AW1/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-Semantic-orange)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS3-Modern-blue)](https://www.w3.org/Style/CSS/)

## 🚀 Características Principales

### 📄 **Gestión de Datos**
- **Datos dinámicos** - Carga de productos desde JSON externo
- **Sistema asíncrono** - Gestión de datos con fetch API
- **Productos destacados** - Selección especial en página principal

### 🔐 **Autenticación y Sesiones**
- **Login funcional** - Sistema de autenticación básico
- **sessionStorage** - Persistencia de datos de usuario logueado
- **Navbar dinámico** - Muestra usuario logueado y opciones de sesión
- **Logout** - Cierre de sesión con limpieza de datos

### 🛒 **Carrito de Compras Avanzado**
- **localStorage** - Persistencia completa del carrito entre sesiones
- **Página dedicada** - Interfaz completa para gestión del carrito
- **Controles de cantidad** - Incrementar/decrementar productos
- **Eliminación de productos** - Individual y vaciado completo
- **Cálculo automático** - Subtotales y totales en tiempo real
- **Validación de stock** - Control de inventario disponible
- **Contador visual** - Badge en navbar con cantidad de productos

### 📱 **Experiencia de Usuario**
- **Diseño responsive** - Optimizado para dispositivos móviles y desktop
- **Interfaz moderna** - Diseño atractivo con animaciones CSS
- **Botón de WhatsApp** - Contacto directo flotante
- **Mensajes informativos** - Notificaciones de éxito y confirmaciones
- **Estados de carga** - Feedback durante operaciones asíncronas

## 🏗️ Estructura del Proyecto

```
ecommerce-AW1/
├── data/
│   └── products.json              # Base de datos de productos
├── js/
│   ├── api-service.js             # Servicio de datos simplificado
│   ├── cart-manager.js            # Gestión avanzada del carrito con localStorage
│   ├── session-manager.js         # Gestión de sesiones con sessionStorage
│   ├── home-products.js           # Productos destacados
│   ├── dynamic-product-loader.js  # Carga dinámica de productos
│   ├── product-card-interaction.js # Interacciones de productos
│   ├── navbar-component.js        # Navegación dinámica con estado de usuario
│   ├── site-structure.js          # Estructura de páginas
│   ├── whatsapp-button.js         # Botón flotante de contacto
│   ├── footer-component.js        # Componente de pie de página
│   └── logoutRoot.js              # Funcionalidad de logout
├── pages/
│   ├── js/
│   │   ├── login.js               # Lógica de login con sessionStorage
│   │   ├── cart-page.js           # Página completa del carrito
│   │   └── logout.js              # Logout para páginas internas
│   ├── trajes.html                # Página de trajes de baño
│   ├── antiparras.html            # Página de antiparras
│   ├── gorras.html                # Página de gorras
│   ├── carrito.html               # Página del carrito de compras
│   ├── login.html                 # Página de login
│   └── registro.html              # Página de registro
├── css/
│   ├── index.css                  # Estilos principales
│   ├── ui-components.css          # Componentes de interfaz y botones
│   ├── cart.css                   # Estilos completos del carrito
│   ├── product-grid.css           # Grilla de productos
│   ├── navigation.css             # Estilos de navegación
│   ├── footer.css                 # Estilos del pie de página
│   ├── forms.css                  # Estilos de formularios
│   └── whatsapp-button.css        # Estilos del botón de WhatsApp
├── assets/                        # Imágenes y recursos
└── index.html                     # Página principal
```

## 🛠️ Tecnologías

- **JavaScript ES6+** - Lógica de aplicación con clases y módulos
- **Web Storage API** - localStorage y sessionStorage para persistencia
- **Fetch API** - Consumo directo de datos JSON
- **CSS3** - Estilos modernos con Grid, Flexbox y animaciones
- **HTML5** - Estructura semántica completa
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

# Abrir el archivo index.html en el navegador
```

## 🔧 Funcionalidades Implementadas

### **ETAPA 5 - Sistema Completo**

#### 🔐 **Gestión de Usuarios**
```javascript
// sessionStorage para usuario logueado
const userData = {
  email: "usuario@email.com",
  name: "usuario",
  loginTime: "2024-01-15T10:30:00Z"
};
sessionStorage.setItem('currentUser', JSON.stringify(userData));
```

#### 🛒 **Carrito Persistente**
```javascript
// localStorage para productos del carrito
const cartItem = {
  productId: "traje001",
  name: "Traje Competición Speed",
  price: 75000,
  quantity: 2,
  imageUrl: "...",
  formattedPrice: "$75.000,00"
};
localStorage.setItem('shopping_cart', JSON.stringify([cartItem]));
```

#### 📄 **Página del Carrito**
- Lista completa de productos agregados
- Controles de cantidad (+/- por producto)
- Eliminación individual y masiva
- Cálculo automático de totales
- Mensajes de confirmación
- Estado de carrito vacío

### **API de Datos**

#### Estructura de Productos
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
  --color-texto-principal: #E0E6ED;
  --color-texto-secundario: #A8B2BC;
  --color-borde: #2A3A4A;
}
```

### Componentes Principales
- **Cards de productos** con hover effects
- **Botones interactivos** con estados de carga
- **Formularios estilizados** con validación visual
- **Carrito moderno** con controles intuitivos
- **Navbar responsive** con indicadores de estado

## 🧪 Funcionalidades de Prueba

1. **Autenticación:**
   - Acceder a login y usar cualquier email/contraseña
   - Verificar persistencia del usuario en navbar
   - Probar logout y limpieza de sesión

2. **Carrito de Compras:**
   - Agregar productos desde cualquier categoría
   - Verificar contador en navbar
   - Acceder a página del carrito
   - Modificar cantidades con botones +/-
   - Eliminar productos individuales
   - Vaciar carrito completo
   - Cerrar navegador y verificar persistencia

3. **Navegación:**
   - Responsive en móviles
   - Botón de WhatsApp funcional
   - Estados de carga y mensajes

## 📄 Licencia

Proyecto desarrollado para la materia **Aplicaciones Web 1** del Colegio Universitario IES Siglo XXI.

## 👨‍💻 Autor

**Maximiliano Candia**

*DNI: 40.626.005*
- GitHub: [@candiamaximiliano](https://github.com/candiamaximiliano)
- WhatsApp: [+54 9 370 458-6465](https://wa.me/5493704586465)