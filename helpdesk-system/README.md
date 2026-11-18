# 🎫 Containerized Help Desk & Issue Tracking System

A full-stack help desk application containerized with Docker, featuring a Kanban-style ticket board.

## Tech Stack
- **Frontend:** React + Vite (Nginx)
- **Backend:** Node.js + Express
- **Database:** PostgreSQL
- **Containerization:** Docker + Docker Compose

## Features
- Submit support tickets with priority levels
- Kanban board (Open → In Progress → Resolved)
- Real-time status updates
- Multi-container architecture with Docker Compose

## Quick Start
```bash
docker-compose up --build
```
Open http://localhost:3000

## Architecture
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Frontend  │───▶│   Backend   │───▶│  PostgreSQL  │
│  React/Nginx│    │  Node/Express│    │   Database  │
│  Port: 3000 │    │  Port: 5000 │    │  Port: 5432 │
└─────────────┘    └─────────────┘    └─────────────┘
```