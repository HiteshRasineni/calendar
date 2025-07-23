# 📆 Calendar Project

A full-stack calendar application with user authentication, event management, and a modern web interface. The project is organized into
backend and frontend components, with Docker support for easy deployment.

## 🌐 Live Demo

Try it here: [https://calendar-black-gamma.vercel.app/](https://calendar-black-gamma.vercel.app/)

---

## 📁 Project Structure

```
calendar-project/
├── calendar-backend/             # Node.js/Express backend API
├── calendar-frontend/            # React frontend client
│   └── calendar-client/
├── docker-compose.yml            # Multi-container orchestration
├── .gitignore
├── .dockerignore
└── .vscode/
```

---

## ✨ Features

- ✅ User authentication (login/register)
- 📅 Create, update, and delete calendar events
- 🔎 View events in a calendar interface
- ✅ Task management
- 🐳 Dockerized for easy setup

---

## ⚙️ Getting Started

### ✅ Prerequisites

- Node.js (for local development)
- Docker & Docker Compose (for containerized setup)

---

### ▶️ Running Locally (Without Docker)

#### 📦 Backend

```bash
cd calendar-backend
npm install
npm start
```

#### 💻 Frontend

```bash
cd calendar-frontend/calendar-client
npm install
npm start
```

- Backend: http://localhost:5000  
- Frontend: http://localhost:3000

---

### 🐳 Running with Docker

From the project root:

```bash
docker-compose up --build
```

This will start both the backend and frontend services.

---

## 📂 Folder Details

- **calendar-backend/**: Express.js server, authentication middleware, event routes, and database logic.  
- **calendar-frontend/calendar-client/**: React app with components for authentication, calendar view, event forms, and task management
- **docker-compose.yml**: Defines services for backend and frontend, networks, and build context.

---

## 🧩 API Endpoints

| Method | Endpoint            | Description          |
|--------|---------------------|----------------------|
| POST   | `/auth/login`       | User login           |
| POST   | `/auth/register`    | User registration    |
| GET    | `/events`           | List events          |
| POST   | `/events`           | Create new event     |
| PUT    | `/events/:id`       | Update existing event|
| DELETE | `/events/:id`       | Delete an event      |

---

## 🤝 Contributing

1. Fork the repository  
2. Create your feature branch  
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes  
   ```bash
   git commit -am "Add some feature"
   ```
4. Push to the branch  
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.
