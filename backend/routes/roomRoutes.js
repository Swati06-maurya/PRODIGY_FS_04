const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { createRoom, getRooms } = require("../controllers/roomController");

router.post("/", protect, createRoom);
router.get("/", protect, getRooms);

module.exports = router;