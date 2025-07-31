const MatrimonyProfile = require('../models/MatrimonyProfile');
const User = require('../models/User');

// @desc    Get all matrimony profiles
// @route   GET /api/matrimony/profiles
// @access  Private
exports.getProfiles = async (req, res) => {
  try {
    const profiles = await MatrimonyProfile.findAll({
      include: {
        model: User,
        attributes: ['name', 'email']
      },
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create or Update a user's matrimony profile
// @route   POST /api/matrimony/profile
// @access  Private
exports.createOrUpdateProfile = async (req, res) => {
  const userId = req.user.id;
  const profileData = req.body;

  try {
    let profile = await MatrimonyProfile.findOne({ where: { UserId: userId } });

    if (profile) {
      await profile.update(profileData);
      res.status(200).json({ message: 'Profile updated successfully', profile });
    } else {
      const newProfile = await MatrimonyProfile.create({
        ...profileData,
        UserId: userId,
      });
      res.status(201).json({ message: 'Profile created successfully', profile: newProfile });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to save profile', error: error.message });
  }
};

// @desc    Get a single profile by ID
// @route   GET /api/matrimony/profile/:id
// @access  Private
exports.getProfileById = async (req, res) => {
    try {
        const profile = await MatrimonyProfile.findByPk(req.params.id, {
            include: { model: User, attributes: ['name', 'email'] }
        });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get the logged-in user's own profile
// @route   GET /api/matrimony/profile/me
// @access  Private
exports.getMyProfile = async (req, res) => {
  try {
    const profile = await MatrimonyProfile.findOne({ where: { UserId: req.user.id } });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found for this user' });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Upload a profile picture
// @route   POST /api/matrimony/profile/upload
// @access  Private
exports.uploadProfilePicture = (req, res) => {
  if (req.file) {
    const filePath = `/uploads/${req.file.filename}`;
    res.status(200).json({
      message: 'Image uploaded successfully',
      filePath: filePath,
    });
  } else {
    res.status(400).json({ message: 'Please upload a file' });
  }
};