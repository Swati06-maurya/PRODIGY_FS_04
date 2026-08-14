import { motion } from "framer-motion";

function getInitials(name) {
  return name?.slice(0, 2).toUpperCase();
}

function UserList({ users, activeUserId, onSelectUser }) {
  return (
    <div className="mt-2">
      <h3 className="text-zinc-400 text-xs font-semibold tracking-widest uppercase px-4 pt-2 pb-2">
        Direct Messages
      </h3>
      {users.map((u) => (
        <motion.div
          key={u._id}
          whileHover={{ x: 4 }}
          onClick={() => onSelectUser(u)}
          className={`mx-2 my-1 px-3 py-2.5 rounded-xl cursor-pointer flex items-center gap-3 transition-colors ${
            activeUserId === u._id
              ? "bg-gradient-to-r from-red-600/20 to-transparent border border-red-500/30"
              : "hover:bg-white/5 border border-transparent"
          }`}
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white text-xs font-bold">
              {getInitials(u.username)}
            </div>
            <span
              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-zinc-950 ${
                u.isOnline ? "bg-green-500 shadow-[0_0_6px_2px_rgba(34,197,94,0.5)]" : "bg-zinc-600"
              }`}
            />
          </div>
          <p className="text-white text-sm font-medium truncate">{u.username}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default UserList;