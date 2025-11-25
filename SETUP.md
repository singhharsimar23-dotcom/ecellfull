# Quick Setup Guide

## Environment Variables

### Server (.env)
Create `server/.env` with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecell-portal
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

### Client (.env)
Create `client/.env` with:
```
VITE_API_URL=http://localhost:5000/api
```

## Quick Start

1. **Start MongoDB** (if using local MongoDB)

2. **Backend:**
   ```bash
   cd server
   npm install
   npm run dev
   ```

3. **Seed Events** (optional, in a new terminal):
   ```bash
   cd server
   npm run seed
   ```

4. **Frontend:**
   ```bash
   cd client
   npm install
   npm run dev
   ```

5. **Access:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## Testing

1. Register a new user at `/register`
2. Login at `/login`
3. View dashboard at `/dashboard`

