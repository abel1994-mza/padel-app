# 🎾 PádelApp

Plataforma fullstack de reservas de canchas de pádel.

## Stack

- **Frontend:** React + Vite + TailwindCSS + React Router
- **Backend:** Node.js + Express
- **Base de datos:** MongoDB Atlas + Mongoose
- **Autenticación:** JWT + bcrypt

## Features

- Registro y login con autenticación JWT
- Ver canchas disponibles
- Reservar uno o más horarios por cancha y fecha
- Ver y cancelar reservas propias
- Rutas protegidas por rol
- Diseño responsive

## Instalación

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Variables de entorno
Creá un archivo `.env` en `backend/` con:
```
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/padel-app
```