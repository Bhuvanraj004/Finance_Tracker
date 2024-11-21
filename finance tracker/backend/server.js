const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const dotenv = require('dotenv');

dotenv.config();

// Check if environment variables are loaded correctly
console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('MONGO_URI:', process.env.MONGO_URI);

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


