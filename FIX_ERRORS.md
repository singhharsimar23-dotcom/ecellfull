# Fix Common Errors

## 🔴 Error: "Cannot find module 'express'" or similar

**Solution:**
```powershell
cd server
npm install
```

## 🔴 Error: "Cannot find module 'react'" or similar

**Solution:**
```powershell
cd client
npm install
```

## 🔴 Error: "MongoServerError: connect ECONNREFUSED"

**Solution:**
1. Install MongoDB locally, OR
2. Use MongoDB Atlas (free cloud):
   - Go to https://www.mongodb.com/cloud/atlas
   - Create free cluster
   - Get connection string
   - Update `server/.env`:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecell-portal
     ```

## 🔴 Error: "Port 3000 is already in use"

**Solution:**
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace <PID> with actual number)
taskkill /PID <PID> /F

# Or change port in client/vite.config.js
```

## 🔴 Error: "Port 5000 is already in use"

**Solution:**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process
taskkill /PID <PID> /F

# Or change PORT in server/.env
```

## 🔴 Error: "VITE_API_URL is not defined"

**Solution:**
Create `client/.env` file:
```
VITE_API_URL=http://localhost:5000/api
```

## 🔴 Error: "JWT_SECRET is not defined"

**Solution:**
Create `server/.env` file:
```
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

## 🔴 Error: "Cannot GET /" or blank page

**Solution:**
1. Make sure frontend is running: `cd client && npm run dev`
2. Check browser console for errors
3. Verify `client/src/index.jsx` exists

## 🔴 Error: "Tailwind CSS not working" or styles missing

**Solution:**
1. Verify `client/tailwind.config.js` exists
2. Verify `client/postcss.config.js` exists
3. Make sure `client/src/index.css` has Tailwind directives:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

## 🔴 Error: "useAuth must be used within an AuthProvider"

**Solution:**
This means `AuthProvider` is not wrapping your app. Check `client/src/App.jsx`:
```jsx
<AuthProvider>
  <AppRouter />
</AuthProvider>
```

## 🔴 Error: "CORS policy" errors

**Solution:**
The server already has CORS enabled. Make sure:
- Backend is running on port 5000
- Frontend is running on port 3000
- `VITE_API_URL` in `client/.env` is correct

## 🔴 Error: "nodemon is not recognized"

**Solution:**
```powershell
cd server
npm install --save-dev nodemon
```

## 🔴 Error: "SyntaxError: Cannot use import statement outside a module"

**Solution:**
This shouldn't happen with Vite. Make sure:
- `client/package.json` has `"type": "module"` (it does)
- You're using `npm run dev` not `node` directly

## Quick Fix All Script

Run this PowerShell script to create all .env files:
```powershell
.\setup-env.ps1
```

## Still Having Issues?

1. **Check Node.js version:** `node --version` (should be v16+)
2. **Delete node_modules and reinstall:**
   ```powershell
   cd client
   Remove-Item -Recurse -Force node_modules
   npm install
   
   cd ../server
   Remove-Item -Recurse -Force node_modules
   npm install
   ```
3. **Check file structure** - all files should match the README structure
4. **Check terminal output** - errors usually show what's wrong

