# Quick Start - Fix Common Errors

## If you see "Cannot find module" or "Module not found":

1. **Install dependencies:**
   ```powershell
   # In PowerShell, run these commands separately:
   cd client
   npm install
   
   cd ..\server
   npm install
   ```

## If you see "Port already in use":

1. **Kill the process using the port:**
   ```powershell
   # For port 3000 (frontend)
   netstat -ano | findstr :3000
   taskkill /PID <PID_NUMBER> /F
   
   # For port 5000 (backend)
   netstat -ano | findstr :5000
   taskkill /PID <PID_NUMBER> /F
   ```

## If you see MongoDB connection errors:

1. **Create `server/.env` file:**
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ecell-portal
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

2. **Or use MongoDB Atlas (cloud):**
   - Sign up at https://www.mongodb.com/cloud/atlas
   - Create a free cluster
   - Get connection string
   - Update `MONGODB_URI` in `server/.env`

## If you see "VITE_API_URL is not defined":

1. **Create `client/.env` file:**
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

## Step-by-Step Run Commands:

### Terminal 1 - Backend:
```powershell
cd server
npm install
npm run dev
```

### Terminal 2 - Frontend:
```powershell
cd client
npm install
npm run dev
```

### Terminal 3 - Seed Events (Optional):
```powershell
cd server
npm run seed
```

## Verify Everything Works:

1. Backend should show: `🚀 Server running on port 5000`
2. Frontend should open at: `http://localhost:3000`
3. You should see the E-Cell home page

## Common File Structure Issues:

Make sure these files exist:
- ✅ `client/src/index.jsx` (NOT index.js)
- ✅ `client/index.html` (references `/src/index.jsx`)
- ✅ `client/tailwind.config.js`
- ✅ `client/postcss.config.js`
- ✅ `server/server.js`
- ✅ `server/.env` (you need to create this)
- ✅ `client/.env` (you need to create this)

