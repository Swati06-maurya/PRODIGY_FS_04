const Room = require("../models/Room");

// @route POST /api/rooms  (create a room)
const createRoom = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Room name required" });

    const existing = await Room.findOne({ name });
    if (existing) return res.status(400).json({ message: "Room already exists" });

    const room = await Room.create({
      name,
      createdBy: req.userId,
      members: [req.userId],
    });

    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route GET /api/rooms  (list all rooms)
const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().select("name createdBy members");
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createRoom, getRooms };