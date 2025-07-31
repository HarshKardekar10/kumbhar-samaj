const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Kumbhar Samaj Admin',
  },
  // --- Add this new field ---
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'https://placehold.co/1200x400/F4F1DE/3D405B?text=Update', // A default placeholder
  },
}, {
  timestamps: true,
});

module.exports = Post;
