# MongoDB Setup Guide

## Error: "Operation `users.findOne()` buffering timed out after 10000ms"

This error means MongoDB is not running or not accessible. Here are solutions:

## Solution 1: Use MongoDB Atlas (Recommended - Free & Easy)

MongoDB Atlas is a free cloud database service. No local installation needed!

### Steps:

1. **Sign up for MongoDB Atlas:**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Create a free account

2. **Create a Free Cluster:**
   - Click "Build a Database"
   - Choose "FREE" (M0) tier
   - Select a cloud provider and region (choose closest to you)
   - Click "Create"

3. **Create Database User:**
   - Go to "Database Access" → "Add New Database User"
   - Username: `ecelluser` (or any username)
   - Password: Create a strong password (save it!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Whitelist Your IP:**
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Or add your specific IP address
   - Click "Confirm"

5. **Get Connection String:**
   - Go to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string (looks like):
     ```
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```

6. **Update server/.env:**
   ```env
   MONGODB_URI=mongodb+srv://ecelluser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ecell-portal?retryWrites=true&w=majority
   ```
   Replace:
   - `ecelluser` with your database username
   - `YOUR_PASSWORD` with your database password
   - `cluster0.xxxxx` with your cluster name
   - Keep `/ecell-portal` at the end (this is your database name)

7. **Restart your server:**
   ```powershell
   cd server
   npm run dev
   ```

## Solution 2: Install Local MongoDB

### Windows:

1. **Download MongoDB:**
   - Go to https://www.mongodb.com/try/download/community
   - Download Windows installer
   - Run the installer

2. **Install MongoDB:**
   - Choose "Complete" installation
   - Install as a Windows Service (recommended)
   - Install MongoDB Compass (GUI tool - optional)

3. **Start MongoDB Service:**
   - MongoDB should start automatically as a Windows service
   - Or manually: Open Services → Find "MongoDB" → Start

4. **Verify MongoDB is running:**
   ```powershell
   mongod --version
   ```

5. **Update server/.env (if needed):**
   ```env
   MONGODB_URI=mongodb://localhost:27017/ecell-portal
   ```

6. **Restart your server**

### macOS:

```bash
# Install using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Linux (Ubuntu/Debian):

```bash
# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

## Solution 3: Use Docker (Alternative)

If you have Docker installed:

```powershell
# Run MongoDB in Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Your server/.env should have:
MONGODB_URI=mongodb://localhost:27017/ecell-portal
```

## Verify Connection

After setting up MongoDB, restart your server. You should see:

```
✅ MongoDB connected successfully
📊 Database: ecell-portal
🚀 Server running on port 5000
```

## Test the Connection

1. Try registering a user at http://localhost:3000/register
2. If successful, you'll see the user in your MongoDB database

## Quick Fix Script

If you're using MongoDB Atlas, update your `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/ecell-portal?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

Then restart the server!

## Still Having Issues?

1. **Check if MongoDB is running:**
   ```powershell
   # Windows
   Get-Service MongoDB
   
   # Or check if port 27017 is in use
   netstat -ano | findstr :27017
   ```

2. **Check your connection string:**
   - Make sure there are no extra spaces
   - Make sure password doesn't have special characters that need URL encoding
   - If password has special characters, replace them with URL-encoded versions:
     - `@` → `%40`
     - `#` → `%23`
     - `$` → `%24`
     - etc.

3. **Test connection manually:**
   ```powershell
   # If using local MongoDB
   mongosh mongodb://localhost:27017/ecell-portal
   ```

4. **Check firewall settings** - Make sure port 27017 is not blocked

