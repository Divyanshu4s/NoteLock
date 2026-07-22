const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();
app.set('trust proxy', 1); // Trust Render proxy for rate limiter

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: [process.env.FRONTEND_URL, 'chrome-extension://*'], // Allows the web app and extension
  credentials: true
}));

// Route files
const authRoutes = require('./routes/authRoutes');
const passwordRoutes = require('./routes/passwordRoutes');
const noteRoutes = require('./routes/noteRoutes');
const extensionRoutes = require('./routes/extensionRoutes');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/passwords', passwordRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/extension', extensionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
