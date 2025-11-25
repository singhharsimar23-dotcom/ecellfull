# Quick Fix: MongoDB Connection Timeout

## The Problem
You're seeing: `Operation users.findOne() buffering timed out after 10000ms`

This means MongoDB is not running or not accessible.

## Fastest Solution: Use MongoDB Atlas (5 minutes)

### Step 1: Get Free MongoDB Atlas Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up (it's free!)

### Step 2: Create Cluster
1. Click "Build a Database"
2. Choose **FREE** tier
3. Click "Create"

### Step 3: Setup Access
1. **Database Access:**
   - Click "Database Access" → "Add New Database User"
   - Username: `ecelluser`
   - Password: Create one (save it!)
   - Click "Add User"

2. **Network Access:**
   - Click "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

### Step 4: Get Connection String
1. Click "Database" → "Connect"
2. Choose "Connect your application"
3. Copy the connection string

### Step 5: Update server/.env

Open `server/.env` and update:

```env
MONGODB_URI=mongodb+srv://ecelluser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ecell-portal?retryWrites=true&w=majority
```

**Important:** 
- Replace `YOUR_PASSWORD` with the password you created
- Replace `cluster0.xxxxx` with your actual cluster name
- Keep `/ecell-portal` at the end

### Step 6: Restart Server

```powershell
# Stop current server (Ctrl+C)
# Then restart:
cd server
npm run dev
```

You should now see:
```
✅ MongoDB connected successfully
📊 Database: ecell-portal
🚀 Server running on port 5000
```

## Alternative: Install Local MongoDB

If you prefer local MongoDB:

### Windows:
1. Download: https://www.mongodb.com/try/download/community
2. Install (choose "Complete")
3. MongoDB will run as a Windows service automatically
4. Your `server/.env` should have:
   ```env
   MONGODB_URI=mongodb://localhost:27017/ecell-portal
   ```

### Verify Local MongoDB:
```powershell
# Check if MongoDB service is running
Get-Service MongoDB

# If not running, start it:
Start-Service MongoDB
```

## Test It

1. Restart your server
2. Go to http://localhost:3000/register
3. Try registering a user
4. It should work now! ✅

## Still Not Working?

Check your `server/.env` file exists and has:
- `MONGODB_URI` set correctly
- No extra spaces or quotes
- Password URL-encoded if it has special characters

Then restart the server!

