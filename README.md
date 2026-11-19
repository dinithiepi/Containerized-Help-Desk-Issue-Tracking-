# 🎓 University Help Desk & Issue Tracking System

> A full-stack containerized web application built to learn and demonstrate **Docker** and **Docker Compose** in a real-world scenario.

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)

---

## 📌 About This Project

This project was built as a **hands-on learning project for Docker and containerization**. Rather than following a simple tutorial, I built a real-world university help desk system and containerized it from scratch using Docker Compose.

The application allows:
- 👨‍🎓 **Students** to report technical issues (Wi-Fi, hardware, software, etc.)
- 🛠️ **Administrators** to receive, prioritize, and resolve tickets
- 📊 **Both** to track ticket status in real time

---

## 🐳 What I Learned About Docker

This project was specifically designed to understand the following Docker concepts:

### 1. Dockerfile
Each service has its own `Dockerfile` that defines how to build that service's container image.

- The **backend** Dockerfile uses `node:20-alpine` as a lightweight base image
- The **frontend** Dockerfile uses a **multi-stage build** — first builds the React app with Node, then serves it with Nginx (production-ready, smaller final image)

### 2. Docker Compose
Instead of running 3 separate containers manually, `docker-compose.yml` orchestrates all services together with **one command**:

```bash
docker-compose up --build
```

This single command:
- Pulls the required images
- Builds the custom images
- Creates a shared network between containers
- Starts all services in the correct order

### 3. Multi-Container Architecture
The project runs **3 containers** that communicate with each other over Docker's internal network:

```
┌─────────────────────────────────────────────────────────┐
│                     Docker Network                       │
│                                                          │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐  │
│  │  Frontend   │───▶│   Backend   │───▶│  PostgreSQL │  │
│  │ React+Nginx │    │  Node.js +  │    │  Database   │  │
│  │  Port 3000  │    │  Express    │    │  Port 5432  │  │
│  └─────────────┘    │  Port 5000  │    └─────────────┘  │
│                     └─────────────┘                      │
└─────────────────────────────────────────────────────────┘
```

### 4. Service Dependencies
Docker Compose `depends_on` with health checks ensures:
- The **database starts first** and is fully ready
- The **backend starts only after** the database is healthy
- The **frontend starts last**

This prevents connection errors on startup.

### 5. Volumes (Data Persistence)
PostgreSQL uses a **named Docker volume** (`postgres_data`) so ticket data is saved permanently — even if the container is stopped or deleted, the data survives.

```yaml
volumes:
  postgres_data:
```

### 6. Environment Variables
Sensitive configuration like database credentials are passed as **environment variables** in `docker-compose.yml` — keeping them out of the application code.

### 7. .dockerignore
Each service has a `.dockerignore` file to exclude `node_modules` and other unnecessary files from the Docker build context — making builds significantly faster.

---

## 🏗️ Project Structure

```
university-helpdesk/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   └── tickets.js       # REST API endpoints
│   │   ├── db.js                # PostgreSQL connection
│   │   └── index.js             # Express server
│   ├── Dockerfile               # Backend container definition
│   ├── .dockerignore
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── StudentPortal.jsx    # Student ticket submission & tracking
│   │   │   └── AdminDashboard.jsx   # Admin ticket management
│   │   ├── App.jsx
│   │   └── App.css
│   ├── Dockerfile               # Multi-stage build (Node → Nginx)
│   ├── .dockerignore
│   └── package.json
│
├── docker-compose.yml           # Orchestrates all 3 containers
├── init.sql                     # Database schema & seed data
└── README.md
```

---

## ✨ Features

### Student Portal
- Submit support tickets with title, category and description
- Choose issue category: Wi-Fi, Hardware, Software, Email, Printer
- Set initial priority: Low, Medium, High
- Track ticket status by name in real time

### Admin Dashboard
- View all tickets in one place
- Search tickets by title or student name
- Filter by status: Open, In Progress, Resolved
- Update ticket status and priority with dropdowns
- Delete resolved tickets
- Live stats: total, open, in-progress, resolved

---



## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React + Vite | Student & Admin UI |
| Web Server | Nginx | Serves the React build in production |
| Backend | Node.js + Express | REST API |
| Database | PostgreSQL | Persistent ticket storage |
| Containerization | Docker + Docker Compose | Multi-container orchestration |

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tickets` | Get all tickets |
| POST | `/api/tickets` | Submit a new ticket |
| PATCH | `/api/tickets/:id` | Update ticket status or priority |
| DELETE | `/api/tickets/:id` | Delete a ticket |

---

## 🎯 Key Docker Concepts Demonstrated

| Concept | Where Used |
|---------|-----------|
| `Dockerfile` | `backend/Dockerfile`, `frontend/Dockerfile` |
| Multi-stage build | `frontend/Dockerfile` (Node → Nginx) |
| `docker-compose.yml` | Root — orchestrates all services |
| Named volumes | `postgres_data` for DB persistence |
| Health checks | DB readiness check before backend starts |
| Container networking | Services communicate by container name |
| Environment variables | DB credentials passed at runtime |
| `.dockerignore` | Excludes node_modules from build context |

---

## 👨‍💻 Author

**Dinith** — Built as a learning project to understand Docker containerization through a practical, real-world application.

---

> ⭐ If this project helped you learn Docker, please give it a star!
