const User = require('../models/User');

const admin = async (req, res, next) => {
  // req.user.id is set by the previous 'protect' middleware
  if (req.user && req.user.id) {
    const user = await User.findByPk(req.user.id);

    if (user && user.isAdmin) {
      next(); // User is an admin, proceed to the next function
    } else {
      res.status(403); // 403 Forbidden
      throw new Error('Not authorized as an admin');
    }
  } else {
    res.status(401); // 401 Unauthorized
    throw new Error('Not authorized, no token');
  }
};

module.exports = admin;
