const jwt = require("jsonwebtoken");
const User = require("../models/User");

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // ---- AUTHENTICATE THE SOCKET ----
    // Client sends the JWT token right after connecting
    socket.on("authenticate", async (token) => {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.id;

        // Mark user online
        await User.findByIdAndUpdate(decoded.id, { isOnline: true });

        // Let everyone know this user is now online
        io.emit("userOnline", { userId: decoded.id });

        console.log(`Socket ${socket.id} authenticated as user ${decoded.id}`);
      } catch (err) {
        console.log("Socket auth failed:", err.message);
      }
    });

    // ---- JOIN A ROOM ----
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    // ---- LEAVE A ROOM ----
    socket.on("leaveRoom", (roomId) => {
      socket.leave(roomId);
      console.log(`Socket ${socket.id} left room ${roomId}`);
    });

    // ---- SEND MESSAGE (broadcast only — no DB save yet, that's Day 4) ----
    const Message = require("../models/Message");

// ---- SEND MESSAGE (now saves to DB) ----
socket.on("sendMessage", async (data) => {
  try {
    // data can now include: fileUrl, fileName (optional)
    const message = await Message.create({
      sender: data.senderId,
      room: data.roomId || null,
      conversation: data.conversationId || null,
      text: data.text || "",
      fileUrl: data.fileUrl || null,
    });

    const payload = {
      _id: message._id,
      senderId: data.senderId,
      senderUsername: data.senderUsername,
      text: data.text,
      fileUrl: data.fileUrl || null,
      fileName: data.fileName || null,
      roomId: data.roomId,
      conversationId: data.conversationId,
      createdAt: message.createdAt,
    };

    const target = data.roomId || data.conversationId;
    io.to(target).emit("newMessage", payload);
  } catch (err) {
    console.error("sendMessage error:", err.message);
  }
});
    // ---- TYPING INDICATOR (bonus, easy to add now) ----
    socket.on("typing", ({ roomId, username }) => {
      socket.to(roomId).emit("userTyping", { username });
    });

    // ---- DISCONNECT ----
    socket.on("disconnect", async () => {
      console.log(`Socket disconnected: ${socket.id}`);

      if (socket.userId) {
        await User.findByIdAndUpdate(socket.userId, {
          isOnline: false,
          lastSeen: new Date(),
        });
        io.emit("userOffline", { userId: socket.userId });
      }
    });
  });
};

module.exports = socketHandler;