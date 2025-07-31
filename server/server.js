const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); // Import the 'path' module
const sequelize = require('./config/db');

// Route imports
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const matrimonyRoutes = require('./routes/matrimonyRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- Static Folder for Uploads ---
// This makes the 'uploads' folder publicly accessible
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/matrimony', matrimonyRoutes);


const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  console.log('MySQL connected and models synced');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => {
  console.error('MySQL connection failed:', err.message);
});