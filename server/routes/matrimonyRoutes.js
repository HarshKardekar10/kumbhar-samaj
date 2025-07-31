const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { 
  getProfiles, 
  createOrUpdateProfile, 
  getProfileById, 
  getMyProfile, 
  uploadProfilePicture 
} = require('../controllers/matrimonyController');
const protect = require('../middleware/authMiddleware');

// --- Multer Storage Configuration ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // The folder where files will be stored
  },
  filename: function (req, file, cb) {
    // Create a unique filename: fieldname-timestamp.extension
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });


// --- Define Routes ---
// Apply the 'protect' middleware to each route individually.
// This ensures only logged-in users can access these endpoints.

// Route for photo upload
router.post('/profile/upload', protect, upload.single('profilePicture'), uploadProfilePicture);

// Route to get all profiles
router.get('/profiles', protect, getProfiles);

// Route to create or update the logged-in user's profile
router.post('/profile', protect, createOrUpdateProfile);

// Route to get the logged-in user's own profile
// IMPORTANT: This must come BEFORE the '/profile/:id' route
router.get('/profile/me', protect, getMyProfile);

// Route to get a specific profile by its ID
router.get('/profile/:id', protect, getProfileById);


// --- Export the router ---
// This is the most critical line. It ensures that this file exports the
// router object itself, not an object containing the router.
module.exports = router;
