import { motion } from "framer-motion";

function RoomList({ rooms, activeRoom, onSelectRoom, onCreateRoom }) {
  return (
    <div>
      <div className="px-4 pt-4 pb-2 flex justify-between items-center">
        <h2 className="text-zinc-400 text-xs font-semibold tracking-widest uppercase">
          Rooms
        </h2>
        <motion.button
          whileHover={{ scale: 1.15, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onCreateRoom}
          className="w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-red-700 text-white text-sm flex items-center justify-center shadow-lg shadow-red-600/30"
          title="Create room"
        >
          +
        </motion.button>
      </div>

      <div>
        {rooms.map((room) => (
          <motion.div
            key={room._id}
            whileHover={{ x: 4 }}
            onClick={() => onSelectRoom(room)}
            className={`mx-2 my-1 px-3 py-2.5 rounded-xl cursor-pointer flex items-center gap-3 transition-colors ${
              activeRoom?._id === room._id
                ? "bg-gradient-to-r from-red-600/20 to-transparent border border-red-500/30"
                : "hover:bg-white/5 border border-transparent"
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-red-400 text-xs font-bold border border-zinc-700">
              #
            </div>
            <p className="text-white text-sm font-medium truncate">{room.name}</p>
          </motion.div>
        ))}
        {rooms.length === 0 && (
          <p className="text-zinc-600 text-sm px-4 py-2">No rooms yet.</p>
        )}
      </div>
    </div>
  );
}

export default RoomList;