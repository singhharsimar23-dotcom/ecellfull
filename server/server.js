const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// --- START: CRITICAL CORS UPDATE (Dynamic Vercel URLs Allowed) ---
const allowedDomains = [
    'http://localhost:5173', // Local development
    '.vercel.app',         // Allow all Vercel domains for preview/production
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true); 

        // Check against allowed domains
        const isAllowed = allowedDomains.some(domain => {
            if (domain.startsWith('.')) {
                // Check if the origin ends with a specific suffix (e.g., .vercel.app)
                return origin.endsWith(domain);
            }
            // Check for exact match (e.g., http://localhost:5173)
            return origin === domain;
        });

        if (isAllowed) {
            return callback(null, true);
        } else {
            const msg = `The CORS policy for this site does not allow access from origin ${origin}.`;
            return callback(new Error(msg), false);
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true
}));
// --- END: CRITICAL CORS UPDATE ---

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// NOTE: You must ensure './routes/authRoutes', './routes/userRoutes', and './routes/eventRoutes' 
// are correctly set up to use Mongoose models instead of Firestore logic.
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
