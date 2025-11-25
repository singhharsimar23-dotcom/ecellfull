# PowerShell script to create .env files

Write-Host "Setting up environment files..." -ForegroundColor Green

# Create server/.env if it doesn't exist
if (-not (Test-Path "server\.env")) {
    $serverEnv = @"
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecell-portal
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-$(Get-Random)
NODE_ENV=development
"@
    Set-Content -Path "server\.env" -Value $serverEnv
    Write-Host "✅ Created server/.env" -ForegroundColor Green
} else {
    Write-Host "⚠️  server/.env already exists" -ForegroundColor Yellow
}

# Create client/.env if it doesn't exist
if (-not (Test-Path "client\.env")) {
    $clientEnv = @"
VITE_API_URL=http://localhost:5000/api
"@
    Set-Content -Path "client\.env" -Value $clientEnv
    Write-Host "✅ Created client/.env" -ForegroundColor Green
} else {
    Write-Host "⚠️  client/.env already exists" -ForegroundColor Yellow
}

Write-Host "`nEnvironment files are ready!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Install dependencies: cd server && npm install && cd ../client && npm install" -ForegroundColor White
Write-Host "2. Start MongoDB (or update MONGODB_URI in server/.env)" -ForegroundColor White
Write-Host "3. Run backend: cd server && npm run dev" -ForegroundColor White
Write-Host "4. Run frontend: cd client && npm run dev" -ForegroundColor White

