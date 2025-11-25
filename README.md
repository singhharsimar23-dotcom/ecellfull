# E-Cell Member Portal

A complete, production-ready member portal for Entrepreneurship Cell with beautiful glassmorphism design, JWT authentication, and full-stack implementation.

## 🚀 Features

- **Modern UI**: Glassmorphism design with deep violet/purple primary colors and teal accents
- **Authentication**: Secure JWT-based authentication system
- **User Dashboard**: Profile management and upcoming events display
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Full-Stack**: React frontend + Node.js/Express/MongoDB backend

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layer
│   │   ├── context/       # React context (Auth)
│   │   └── router/        # Routing configuration
│   └── package.json
│
└── server/                # Node.js backend
    ├── models/           # MongoDB models
    ├── routes/           # API routes
    ├── controllers/      # Route controllers
    ├── middleware/       # Auth middleware
    └── server.js         # Entry point
```

## 🛠️ Technology Stack

### Frontend
- React 18 (Functional Components + Hooks)
- React Router DOM
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- bcryptjs

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecell-portal
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

5. Start the server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your API URL:
```env
VITE_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## 🚢 Deployment

### Frontend (Vercel)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Navigate to client directory:
```bash
cd client
```

3. Deploy:
```bash
vercel
```

4. Set environment variable in Vercel dashboard:
   - `VITE_API_URL`: Your backend API URL

### Backend (Render/Railway)

#### Render

1. Connect your GitHub repository
2. Create a new Web Service
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables:
   - `PORT`: 5000
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your secret key
   - `NODE_ENV`: production

#### Railway

1. Connect your GitHub repository
2. Create a new project
3. Add MongoDB service (or use external MongoDB)
4. Set environment variables in the service settings
5. Deploy

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### User
- `GET /api/user/profile` - Get user profile (Protected)

### Events
- `GET /api/events/upcoming` - Get upcoming events (max 6)

## 🎨 Design Features

- **Glassmorphism**: Modern frosted glass effect
- **Color Scheme**: 
  - Primary: Deep violet/purple (#6B21A8)
  - Accent: Teal (#14B8A6)
- **Typography**: Inter font family
- **Responsive**: Mobile-first design

## 🔐 Authentication Flow

1. User registers/logs in
2. Server returns JWT token
3. Token stored in localStorage
4. Token sent in Authorization header for protected routes
5. Middleware validates token on backend

## 📱 Pages

- **Home** (`/`): Hero section, mission, values, activities
- **Login** (`/login`): User authentication
- **Register** (`/register`): New user registration
- **Dashboard** (`/dashboard`): Protected page with profile and events

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

For issues and questions, please open an issue on the repository.

---

Built with ❤️ for E-Cell

