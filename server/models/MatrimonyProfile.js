const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const MatrimonyProfile = sequelize.define('MatrimonyProfile', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  // Basic Info
  fullName: { type: DataTypes.STRING, allowNull: false },
  gender: { type: DataTypes.ENUM('Male', 'Female'), allowNull: false },
  dateOfBirth: { type: DataTypes.DATEONLY, allowNull: false },
  
  // Physical Attributes
  height: { type: DataTypes.STRING, comment: 'e.g., 5ft 10in' },
  
  // Community & Social Info
  maritalStatus: { type: DataTypes.ENUM('Never Married', 'Divorced', 'Widowed'), allowNull: false },
  gotra: { type: DataTypes.STRING },

  // Location
  city: { type: DataTypes.STRING, allowNull: false },
  state: { type: DataTypes.STRING, allowNull: false },
  country: { type: DataTypes.STRING, allowNull: false, defaultValue: 'India' },
  
  // Education & Career
  education: { type: DataTypes.STRING },
  profession: { type: DataTypes.STRING },
  annualIncome: { type: DataTypes.STRING, comment: 'e.g., 10-15 Lakhs' },

  // About & Family
  aboutMe: { type: DataTypes.TEXT },
  familyDetails: { type: DataTypes.TEXT },

  // Contact (can be pre-filled from User model)
  contactEmail: { type: DataTypes.STRING, allowNull: false },
  
  profilePictureUrl: { 
    type: DataTypes.STRING, 
    allowNull: true,
    defaultValue: 'https://placehold.co/400x400/EFEFEF/AAAAAA&text=Photo' // Default placeholder
  },
}, {
  timestamps: true,
});

// Establish the relationship: One User has one MatrimonyProfile
User.hasOne(MatrimonyProfile);
MatrimonyProfile.belongsTo(User);

module.exports = MatrimonyProfile;