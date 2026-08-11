# PorulonStack Full-Stack Application

**PorulonStack** is a full-stack web ecosystem containing **Frontend**, **Backend**, and **Admin Dashboard** modules for Porulon Technologies.

## 📁 Monorepo Architecture

```
porulonstack/
├── admin/               # React + Vite + Tailwind Admin Panel (Port 3001)
├── backend/             # Express.js + Mongoose REST API (Port 5000)
├── frontend/            # React + Vite + Tailwind Customer Website (Port 5173 / 80)
├── docker-compose.yml   # Multi-container Docker orchestration
└── README.md            # Documentation
```

---

## ⚡ Quick Start Guide

### 1. Database & Backend Setup

Ensure MongoDB is running locally on port 27017 or start via Docker.

```bash
# Navigate to backend
cd porulonstack/backend

# Install dependencies
npm install

# Seed default database & admin user
npm run seed

# Start API server in dev mode with Nodemon
npm run dev
```

> **Default Seed Admin Credentials**:
> - **Email**: `admin@porulon.com`
> - **Password**: `admin123`
> - **MongoDB Database**: `porulonstack`

---

### 2. Admin Dashboard Setup

```bash
# Navigate to admin
cd porulonstack/admin

# Install dependencies
npm install

# Start Admin Dashboard
npm run dev
```

Visit Admin Panel at: `http://localhost:3001` or `http://localhost:5173/admin`

---

### 3. Frontend Website Setup

```bash
# Navigate to frontend
cd porulonstack/frontend

# Install dependencies
npm install

# Start Frontend App
npm run dev
```

Visit Website at: `http://localhost:5173`

---

## 🐳 Docker Deployment

To launch the entire stack (MongoDB + Backend + Frontend + Admin) using Docker Compose:

```bash
docker-compose up --build
```
