import { motion } from "framer-motion";

function getInitials(name) {
  return name?.slice(0, 2).toUpperCase();
}

function isImage(url) {
  return /\.(jpe?g|png|gif|webp)$/i.test(url || "");
}

function MessageBubble({ message, isOwn }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex items-end gap-2 mb-3 ${isOwn ? "justify-end" : "justify-start"}`}
    >
      {!isOwn && (
        <div className="w-7 h-7 shrink-0 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-red-400 text-[10px] font-bold">
          {getInitials(message.senderUsername)}
        </div>
      )}

      <div
        className={`max-w-xs md:max-w-md px-4 py-2.5 rounded-2xl shadow-md ${
          isOwn
            ? "bg-red-600 text-white rounded-br-sm shadow-red-600/20"
            : "bg-zinc-800/80 backdrop-blur text-zinc-100 rounded-bl-sm border border-zinc-700/50"
        }`}
      >
        {!isOwn && (
          <p className="text-[11px] text-red-400 font-semibold mb-0.5">
            {message.senderUsername}
          </p>
        )}

        {message.fileUrl && isImage(message.fileUrl) && (
          <img
            src={message.fileUrl}
            alt={message.fileName || "shared image"}
            className="rounded-lg max-w-full max-h-64 mb-1.5 object-cover"
          />
        )}

        {message.fileUrl && !isImage(message.fileUrl) && (
          
            <a href={message.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-black/20 rounded-lg px-3 py-2 mb-1.5 hover:bg-black/30 transition-colors"
          >
            <span>📄</span>
            <span className="text-xs underline truncate">
              {message.fileName || "Download file"}
            </span>
          </a>
        )}

        {message.text && (
          <p className="text-sm break-words leading-relaxed">{message.text}</p>
        )}
      </div>
    </motion.div>
  );
}

export default MessageBubble;