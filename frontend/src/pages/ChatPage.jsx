import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import RoomList from "../components/RoomList";
import UserList from "../components/UserList";
import ChatWindow from "../components/ChatWindow";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";
import api from "../api/axios";

function getInitials(name) {
  return name?.slice(0, 2).toUpperCase();
}

function ChatPage() {
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [activeUser, setActiveUser] = useState(null);
  const { user, logout } = useAuth();
  const { socket } = useSocket();

  useEffect(() => {
    api.get("/rooms").then((res) => setRooms(res.data));
    api.get("/users").then((res) => setUsers(res.data));
  }, []);

  useEffect(() => {
    if (!socket) return;
    const setOnline = ({ userId }) =>
      setUsers((prev) => prev.map((u) => (u._id === userId ? { ...u, isOnline: true } : u)));
    const setOffline = ({ userId }) =>
      setUsers((prev) => prev.map((u) => (u._id === userId ? { ...u, isOnline: false } : u)));

    socket.on("userOnline", setOnline);
    socket.on("userOffline", setOffline);
    return () => {
      socket.off("userOnline", setOnline);
      socket.off("userOffline", setOffline);
    };
  }, [socket]);

  const handleCreateRoom = async () => {
    const name = prompt("Room name:");
    if (!name) return;
    try {
      const res = await api.post("/rooms", { name });
      setRooms((prev) => [...prev, res.data]);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create room");
    }
  };

  const selectRoom = (r) => {
    setActiveRoom(r);
    setActiveUser(null);
  };

  const selectUser = (u) => {
    setActiveUser(u);
    setActiveRoom(null);
  };

  return (
    <div className="h-screen flex flex-col bg-black relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-red-600/10 rounded-full blur-3xl -top-40 left-1/4 pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] bg-red-700/10 rounded-full blur-3xl bottom-0 right-1/4 pointer-events-none" />

      <div className="flex justify-between items-center px-5 py-3.5 border-b border-zinc-800/80 bg-black/70 backdrop-blur-md relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-red-500 to-red-700" />
          <h1 className="text-white font-bold text-lg tracking-tight">
            LIVE<span className="text-red-500">LINE</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white text-xs font-bold">
              {getInitials(user?.username)}
            </div>
            <motion.span
              className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-black"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <span className="text-zinc-300 text-sm font-medium">{user?.username}</span>
          <button
            onClick={logout}
            className="text-zinc-500 hover:text-red-500 text-sm transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative z-10">
        <div className="w-72 bg-zinc-950/60 backdrop-blur-md border-r border-zinc-800/80 flex flex-col h-full overflow-y-auto">
          <RoomList
            rooms={rooms}
            activeRoom={activeRoom}
            onSelectRoom={selectRoom}
            onCreateRoom={handleCreateRoom}
          />
          <UserList users={users} activeUserId={activeUser?._id} onSelectUser={selectUser} />
        </div>
        <ChatWindow room={activeRoom} conversationUser={activeUser} />
      </div>
    </div>
  );
}

export default ChatPage;