import { useState, useRef } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";

function MessageInput({ onSend, onSendFile, onTyping }) {
  const [text, setText] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onSendFile(res.data.fileUrl, res.data.fileName);
    } catch (err) {
      alert("File upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-4 border-t border-zinc-800/80 bg-black/70 backdrop-blur-md"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <motion.button
        type="button"
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="w-9 h-9 shrink-0 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 flex items-center justify-center hover:border-red-500 transition-colors disabled:opacity-50"
        title="Attach file"
      >
        {uploading ? "..." : "📎"}
      </motion.button>

      <input
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          onTyping?.();
        }}
        placeholder="Type a message..."
        className="flex-1 bg-zinc-800 text-white rounded-full px-4 py-2 outline-none border border-zinc-700 focus:border-red-500 transition-colors"
      />
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        type="submit"
        className="bg-red-600 hover:bg-red-500 text-white rounded-full px-5 py-2 font-medium shadow-lg shadow-red-600/30 transition-colors"
      >
        Send
      </motion.button>
    </form>
  );
}

export default MessageInput;