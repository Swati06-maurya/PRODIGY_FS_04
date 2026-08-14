const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  getRoomMessages,
  getConversationMessages,
} = require("../controllers/messageController");

router.get("/room/:roomId", protect, getRoomMessages);
router.get("/conversation/:userId", protect, getConversationMessages);

module.exports = router;