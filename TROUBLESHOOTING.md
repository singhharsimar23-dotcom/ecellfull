# Troubleshooting Guide

## Common Errors and Solutions

### 1. "Cannot find module" errors

**Solution:** Install dependencies first
```bash
# For client
cd client
npm install

# For server
cd server
npm install
```

### 2. "Port already in use" error

**Solution:** Change the port or kill the process
```bash
# Windows PowerShell
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in vite.config.js
```

### 3. MongoDB connection errors

**Solution:** 
- Make sure MongoDB is running locally, OR
- Update `server/.env` with MongoDB Atlas connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecell-portal
```

### 4. "Module not found" in Vite

**Solution:** Make sure you're using `.jsx` extension for React files and the entry point is correct in `index.html`:
```html
<script type="module" src="/src/index.jsx"></script>
```

### 5. Tailwind CSS not working

**Solution:** Make sure `postcss.config.js` and `tailwind.config.js` exist in the client folder.

### 6. CORS errors

**Solution:** The server already has CORS enabled. Make sure:
- Backend is running on port 5000
- Frontend is running on port 3000
- `VITE_API_URL` in client/.env matches your backend URL

### 7. JWT token errors

**Solution:** Make sure `JWT_SECRET` is set in `server/.env`

## Step-by-Step Setup

1. **Install Node.js** (v16 or higher)

2. **Install dependencies:**
   ```bash
   # Client
   cd client
   npm install
   
   # Server (in new terminal)
   cd server
   npm install
   ```

3. **Create environment files:**
   
   `server/.env`:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ecell-portal
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```
   
   `client/.env`:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start MongoDB** (if using local MongoDB)

5. **Run the applications:**
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev
   
   # Terminal 2 - Frontend
   cd client
   npm run dev
   ```

6. **Seed events (optional):**
   ```bash
   cd server
   npm run seed
   ```

## Verify Installation

1. Backend should show: `🚀 Server running on port 5000`
2. Frontend should open at: `http://localhost:3000`
3. Check browser console for any errors
4. Check terminal for any error messages

