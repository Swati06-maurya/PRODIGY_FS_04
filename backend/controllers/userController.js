const User = require("../models/User");

// @route GET /api/users  (all users except me, for the DM list)
const getUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.userId } }).select(
      "username isOnline"
    );
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getUsers };