import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";
import api from "../api/axios";

function ChatWindow({ room, conversationUser }) {
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const { user } = useAuth();
  const { socket } = useSocket();
  const bottomRef = useRef(null);
  const typingTimeout = useRef(null);

  // Load history + join room/conversation whenever the active target changes
  useEffect(() => {
    if (!socket) return;

    if (room) {
      socket.emit("joinRoom", room._id);

      api.get(`/messages/room/${room._id}`).then((res) => {
        const formatted = res.data.map((m) => ({
          _id: m._id,
          text: m.text,
          fileUrl: m.fileUrl,
          fileName: m.fileName,
          senderId: m.sender._id,
          senderUsername: m.sender.username,
          roomId: room._id,
        }));
        setMessages(formatted);
      });

      return () => {
        socket.emit("leaveRoom", room._id);
        setMessages([]);
      };
    }

    if (conversationUser) {
      api.get(`/messages/conversation/${conversationUser._id}`).then((res) => {
        setConversationId(res.data.conversationId);
        socket.emit("joinRoom", res.data.conversationId);

        const formatted = res.data.messages.map((m) => ({
          _id: m._id,
          text: m.text,
          fileUrl: m.fileUrl,
          fileName: m.fileName,
          senderId: m.sender._id,
          senderUsername: m.sender.username,
          conversationId: res.data.conversationId,
        }));
        setMessages(formatted);
      });

      return () => {
        if (conversationId) socket.emit("leaveRoom", conversationId);
        setMessages([]);
        setConversationId(null);
      };
    }

    setMessages([]);
  }, [room, conversationUser, socket]);

  // Listen for live messages + typing
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (msg) => {
      const belongsHere =
        (room && msg.roomId === room._id) ||
        (conversationUser && msg.conversationId === conversationId);

      if (belongsHere) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    const handleTyping = ({ username }) => {
      setTypingUser(username);
      clearTimeout(typingTimeout.current);
      typingTimeout.current = setTimeout(() => setTypingUser(null), 2000);
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("userTyping", handleTyping);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("userTyping", handleTyping);
    };
  }, [socket, room, conversationUser, conversationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text) => {
    if (room) {
      socket.emit("sendMessage", {
        roomId: room._id,
        senderId: user._id,
        senderUsername: user.username,
        text,
      });
    } else if (conversationUser && conversationId) {
      socket.emit("sendMessage", {
        conversationId,
        senderId: user._id,
        senderUsername: user.username,
        text,
      });
    }
  };

  const sendFile = (fileUrl, fileName) => {
    if (room) {
      socket.emit("sendMessage", {
        roomId: room._id,
        senderId: user._id,
        senderUsername: user.username,
        text: "",
        fileUrl,
        fileName,
      });
    } else if (conversationUser && conversationId) {
      socket.emit("sendMessage", {
        conversationId,
        senderId: user._id,
        senderUsername: user.username,
        text: "",
        fileUrl,
        fileName,
      });
    }
  };

  const handleTypingEmit = () => {
    const targetId = room?._id || conversationId;
    if (!targetId) return;
    socket.emit("typing", { roomId: targetId, username: user.username });
  };

  if (!room && !conversationUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-zinc-600 bg-black">
        Select a room or a person to start chatting
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-black">
      <div className="p-4 border-b border-zinc-800/80 bg-black/50 backdrop-blur-md">
        <h3 className="text-white font-semibold flex items-center gap-2">
          {room ? (
            <>
              <span className="text-red-500">#</span> {room.name}
            </>
          ) : (
            conversationUser?.username
          )}
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <MessageBubble
              key={msg._id || i}
              message={msg}
              isOwn={msg.senderId === user._id}
            />
          ))}
        </AnimatePresence>

        {typingUser && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-zinc-500 text-xs italic"
          >
            {typingUser} is typing...
          </motion.p>
        )}
        <div ref={bottomRef} />
      </div>

      <MessageInput onSend={sendMessage} onSendFile={sendFile} onTyping={handleTypingEmit} />
    </div>
  );
}

export default ChatWindow;