const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// --- START: CRITICAL CORS UPDATE ---
// This configuration allows access ONLY from the specific Vercel URL
// and localhost for development, ensuring security.
const allowedOrigins = [
    'http://localhost:5173', 
    'https://ecell-portal-bl2g7v6c1-sams-projects-405f3e41.vercel.app' // YOUR LIVE VERCEL FRONTEND URL
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true); 
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow necessary HTTP methods
    credentials: true
}));
// --- END: CRITICAL CORS UPDATE ---

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// Connect to MongoDB
const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecell-portal';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 10s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  console.log(`📊 Database: ${mongoose.connection.name}`);
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  console.error('\n💡 Troubleshooting:');
  console.error('1. Make sure MongoDB is running locally, OR');
  console.error('2. Update MONGODB_URI in server/.env with MongoDB Atlas connection string');
  console.error('3. For local MongoDB: Start MongoDB service or run: mongod');
  console.error('\n📝 Example MongoDB Atlas URI:');
  console.error('MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecell-portal\n');
  process.exit(1); // Exit if MongoDB connection fails
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
