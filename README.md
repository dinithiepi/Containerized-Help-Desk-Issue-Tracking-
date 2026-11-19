# University IT Help Desk & Issue Tracking System

A full-stack web application for managing technical support tickets, built as a hands-on project to learn and demonstrate Docker containerization. Students can submit IT issues and track their status, while administrators manage and resolve tickets through a protected dashboard.

> **Learning Project** — This project was built to learn Docker and containerization by applying it to a real-world use case rather than following a simple tutorial. The goal was to understand how multiple services work together inside containers, how Nginx acts as a reverse proxy, and how Docker Compose orchestrates a full application stack from a single command.

---

## What This Project Does

Students submit technical support tickets with their name, student ID, issue category and priority. They can track their own ticket status at any time. Administrators access a protected dashboard to view all tickets, update their status and reassign priority levels as issues are worked through.

---

## Tech Stack

| Layer | Technology | Role |
|-------|-----------|------|
| Frontend | React + Vite | User interface |
| Web Server | Nginx | Serves the React app and acts as reverse proxy |
| Backend | Node.js + Express | REST API |
| Database | PostgreSQL | Persistent data storage |
| Containerization | Docker + Docker Compose | Multi-container orchestration |

---

## Docker Concepts Applied

**Dockerfile** — Each service has its own Dockerfile defining how its container image is built. The frontend uses a multi-stage build: the first stage compiles the React app using Node.js, and the second stage copies only the compiled output into a clean Nginx image. The final image contains no source code or development dependencies.

**Docker Compose** — All three services are defined in a single `docker-compose.yml` file. One command starts the entire application. Docker Compose handles building the images, creating a shared network between containers, and starting services in the correct order.

**Nginx Reverse Proxy** — Nginx serves two purposes. It delivers the React frontend as static files, and it forwards all `/api/` requests internally to the Node.js backend. The browser communicates with one address on port 80. The backend is never exposed directly, which mirrors how production web applications are structured.

**Container Networking** — Docker Compose creates a private internal network. Containers communicate with each other using container names as hostnames rather than IP addresses. Nothing inside the network is accessible from outside unless explicitly mapped to a port.

**Named Volumes** — PostgreSQL uses a named Docker volume so ticket data persists across container restarts and rebuilds. The data is stored on the host machine, not inside the container.

**Health Checks** — The backend is configured to wait until the database passes a readiness check before starting. This prevents connection errors caused by the backend trying to connect before PostgreSQL is fully ready.

**.dockerignore** — Both services exclude `node_modules` and build output from the Docker build context, keeping builds fast and images clean.

**Environment Variables** — Database credentials and configuration are passed through environment variables rather than hardcoded in source files.

---

## Project Structure

```
helpdesk-system/
├── backend/              # Node.js REST API
├── frontend/             # React app, Nginx config, multi-stage Dockerfile
├── docker-compose.yml    # Orchestrates all three services
└── init.sql              # Database schema and seed data
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tickets` | Retrieve all tickets |
| POST | `/api/tickets` | Submit a new ticket |
| PATCH | `/api/tickets/:id` | Update status or priority |
| DELETE | `/api/tickets/:id` | Delete a ticket |

---

## Container Architecture

```
Browser → http://localhost
               ↓
          Nginx (port 80)
          ↓            ↓
     /api/*          /*
         ↓            ↓
     Backend      React App
    (Node.js)   (static files)
         ↓
    PostgreSQL
```

---

> This is a personal portfolio project built for learning purposes. Not affiliated with or endorsed by the University of Peradeniya.
