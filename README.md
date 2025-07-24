<h1 align="center">🚀 NestJS Developers API</h1>

<div align="center">

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)

**A modern and scalable REST API for developer management**

[🚀 Quick Start](#-installation) • [📚 API Docs](#-api-endpoints) • [🛠️ Tech Stack](#️-tech-stack) • [📖 Usage](#-example-usage)

</div>

---

## ⚡ Overview

This project is a **robust REST API** built with **NestJS** for managing developer profiles. It provides a complete CRUD system with modern architecture patterns, validation, and comprehensive documentation. Perfect for building developer portfolio platforms or team management systems.

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔥 **CRUD Operations** | Complete Create, Read, Update, and Delete operations for developer profiles |
| ✅ **Data Validation** | Robust input validation using class-validator with custom decorators |
| 📖 **API Documentation** | Auto-generated Swagger documentation with interactive testing interface |
| 🏗️ **Modern Architecture** | Built with NestJS using dependency injection and modular architecture |
| 🛡️ **Error Handling** | Comprehensive error handling with meaningful error messages |
| 🚀 **TypeScript** | Full TypeScript support with strict type checking |

## 🛠️ Tech Stack

<div align="center">

| Technology | Purpose | Version |
|------------|---------|---------|
| **NestJS** | Backend Framework | `^10.0.0` |
| **TypeScript** | Programming Language | `^5.0.0` |
| **Node.js** | Runtime Environment | `>=18.0.0` |
| **Swagger** | API Documentation | `^7.0.0` |
| **Class Validator** | Data Validation | `^0.14.0` |
| **Class Transformer** | Data Transformation | `^0.5.0` |

</div>

## 🚀 Installation

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn

### Steps

```bash
# 1️⃣ Clone the repository
git clone https://github.com/yourusername/nestjs-developers-api.git
cd nestjs-developers-api

# 2️⃣ Install dependencies
npm install
# or using yarn
yarn install

# 3️⃣ Start the development server
npm run start:dev
# or using yarn
yarn start:dev

# 4️⃣ Access the API
# API: http://localhost:3000
# Swagger Docs: http://localhost:3000/api
```

## 📚 API Endpoints

### Developer Management

| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| `GET` | `/developers` | Get all developers | ✅ |
| `GET` | `/developers/:id` | Get developer by ID | ✅ |
| `POST` | `/developers` | Create new developer | ✅ |
| `PUT` | `/developers/:id` | Update developer | ✅ |
| `DELETE` | `/developers/:id` | Delete developer | ✅ |

### Developer Schema

```typescript
{
  id: string;
  name: string;
  email: string;
  skills: string[];
  experience: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## 📖 Example Usage

### Create a New Developer

```bash
curl -X POST http://localhost:3000/developers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "skills": ["JavaScript", "TypeScript", "NestJS"],
    "experience": "5 years",
    "location": "São Paulo, Brazil"
  }'
```

### Response

```json
{
  "id": "uuid-here",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "skills": ["JavaScript", "TypeScript", "NestJS"],
  "experience": "5 years",
  "location": "São Paulo, Brazil",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

### Get All Developers

```bash
curl -X GET http://localhost:3000/developers
```

### Update Developer

```bash
curl -X PUT http://localhost:3000/developers/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe Updated",
    "skills": ["JavaScript", "TypeScript", "NestJS", "React"]
  }'
```

## 🗂️ Project Structure

```
src/
├── developers/
│   ├── dto/
│   │   ├── create-developer.dto.ts
│   │   └── update-developer.dto.ts
│   ├── entities/
│   │   └── developer.entity.ts
│   ├── developers.controller.ts
│   ├── developers.service.ts
│   └── developers.module.ts
├── app.controller.ts
├── app.module.ts
└── main.ts
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run start` | Start the application |
| `npm run start:dev` | Start in development mode |
| `npm run start:debug` | Start in debug mode |
| `npm run start:prod` | Start in production mode |
| `npm run build` | Build the application |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## 📝 Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration (if using database)
DATABASE_URL=your_database_url

# API Configuration
API_VERSION=v1
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by [Seu Nome](https://github.com/yourusername)

</div>
