const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

// @route GET /api/messages/room/:roomId
const getRoomMessages = async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.roomId })
      .populate("sender", "username")
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route GET /api/messages/conversation/:userId
// Gets (or creates) a private conversation between the logged-in user and :userId, then returns its messages
const getConversationMessages = async (req, res) => {
  try {
    const otherUserId = req.params.userId;

    let conversation = await Conversation.findOne({
      participants: { $all: [req.userId, otherUserId], $size: 2 },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [req.userId, otherUserId],
      });
    }

    const messages = await Message.find({ conversation: conversation._id })
      .populate("sender", "username")
      .sort({ createdAt: 1 });

    res.json({ conversationId: conversation._id, messages });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getRoomMessages, getConversationMessages };