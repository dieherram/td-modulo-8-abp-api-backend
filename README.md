<div align="center">

# API RESTful - Gestión de Usuarios y Productos

### Proyecto Integrador - Módulo 8: Node.js & Express

![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![Express](https://img.shields.io/badge/Express.js-5.x-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-red)
![Sequelize](https://img.shields.io/badge/Sequelize-6-orange)
![JWT](https://img.shields.io/badge/JWT-Auth-yellow)

</div>

---

## Descripción

API RESTful completa para gestión de usuarios, productos y categorías, implementada con arquitectura modular siguiendo las mejores prácticas de desarrollo backend.

## Funcionalidades

| Feature | Estado |
|---------|--------|
| CRUD de Usuarios | Implementado |
| CRUD de Productos | Implementado |
| CRUD de Categorías | Implementado |
| Autenticación JWT | Implementado |
| Subida de Archivos | Implementado |
| Búsquedas y Filtros | Implementado |
| Roles y Permisos | Implementado |

## Instalación Rápida

```bash
# 1. Clonar repositorio
git clone https://github.com/dieherram/td-modulo-8-abp-api-backend.git
cd td-modulo-8-abp-api-backend

# 2. Instalar dependencias
npm install

# 3. Configurar entorno
cp .env.example .env

# 4. Crear base de datos
psql -U postgres -c "CREATE DATABASE m8_db;"

# 5. Iniciar servidor
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## Endpoints

### Autenticación

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|:----:|
| `POST` | `/api/v1/auth/register` | Registrar usuario | No |
| `POST` | `/api/v1/auth/login` | Iniciar sesión | No |
| `GET` | `/api/v1/auth/profile` | Ver perfil | Sí |

### Usuarios

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|:----:|
| `GET` | `/api/v1/users` | Listar usuarios | Sí |
| `GET` | `/api/v1/users/:id` | Obtener usuario | Sí |
| `PUT` | `/api/v1/users/:id` | Actualizar usuario | Sí |
| `DELETE` | `/api/v1/users/:id` | Eliminar usuario | Admin |

### Productos

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|:----:|
| `GET` | `/api/v1/products` | Listar productos | No |
| `GET` | `/api/v1/products/:id` | Obtener producto | No |
| `POST` | `/api/v1/products` | Crear producto | Sí |
| `PUT` | `/api/v1/products/:id` | Actualizar producto | Sí |
| `DELETE` | `/api/v1/products/:id` | Eliminar producto | Sí |

### Categorías

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|:----:|
| `GET` | `/api/v1/categories` | Listar categorías | No |
| `POST` | `/api/v1/categories` | Crear categoría | Admin |
| `PUT` | `/api/v1/categories/:id` | Actualizar categoría | Admin |
| `DELETE` | `/api/v1/categories/:id` | Eliminar categoría | Admin |

### Archivos

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|:----:|
| `POST` | `/api/v1/upload` | Subir imagen | Sí |

## Autenticación

```bash
# 1. Registrar usuario
POST /api/v1/auth/register
{
  "name": "Juan Pérez",
  "email": "juan@test.com",
  "password": "123456"
}

# 2. Iniciar sesión (guarda el token)
POST /api/v1/auth/login
{
  "email": "juan@test.com",
  "password": "123456"
}

# 3. Usar token en requests protegidos
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

## Relaciones de Base de Datos

```
┌──────────┐       ┌──────────┐
│  Users   │ 1───N │ Products │
└──────────┘       └──────────┘
                         │
                         │ N
                         │
                    ┌──────────┐
                    │Categories│
                    └──────────┘
```

## Estructura del Proyecto

```
src/
├── config/          # Configuración
│   └── database.js
├── controllers/     # Lógica de negocio
│   ├── authController.js
│   ├── userController.js
│   ├── productController.js
│   └── categoryController.js
├── middlewares/     # Middlewares
│   ├── auth.js      # JWT
│   ├── errorHandler.js
│   └── upload.js    # Archivos
├── models/          # Modelos Sequelize
│   ├── User.js
│   ├── Product.js
│   └── Category.js
├── routes/          # Rutas API
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── productRoutes.js
│   ├── categoryRoutes.js
│   └── uploadRoutes.js
├── utils/           # Utilidades
│   └── response.js
└── index.js         # Servidor
```

## Tecnologías

- **Backend:** Node.js, Express.js
- **Base de datos:** PostgreSQL
- **ORM:** Sequelize
- **Autenticación:** JSON Web Token (JWT)
- **Archivos:** express-fileupload
- **Seguridad:** bcryptjs, CORS

## Testing con Postman

Importar el archivo `postman_collection.json` en Postman para probar todos los endpoints.

<div align="center">

### Desarrollado como parte del Programa Talento Digital

</div>
