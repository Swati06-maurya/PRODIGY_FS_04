import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/signup", { username, email, password });
      login(res.data);
      navigate("/chat");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-red-600/20 rounded-full blur-3xl top-[-10%] right-[-10%]" />
      <div className="absolute w-[400px] h-[400px] bg-red-700/10 rounded-full blur-3xl bottom-[-10%] left-[-10%]" />

      <svg viewBox="0 0 400 400" className="absolute w-[500px] h-[500px] opacity-40 pointer-events-none">
        <motion.line x1="340" y1="80" x2="200" y2="50" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.2 }} />
        <motion.line x1="200" y1="50" x2="70" y2="150" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.5 }} />
        <motion.line x1="340" y1="80" x2="310" y2="300" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.8 }} />
        <motion.line x1="70" y1="150" x2="100" y2="340" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 1.1 }} />
      </svg>

      {[
        { top: "10%", left: "85%", delay: 0 },
        { top: "6%", left: "20%", delay: 0.6 },
        { top: "78%", left: "80%", delay: 1.2 },
        { top: "82%", left: "22%", delay: 1.8 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-600/50"
          style={{ top: pos.top, left: pos.left }}
          animate={{ y: [0, -12, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, delay: pos.delay, ease: "easeInOut" }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 p-8 rounded-3xl shadow-2xl w-full max-w-sm relative z-10"
      >
        <Link to="/" className="text-zinc-500 text-xs hover:text-red-400 transition-colors">
          ← Back to home
        </Link>

        <h1 className="text-2xl font-bold text-white mt-4 mb-1">
          Create your <span className="text-red-500">Account</span>
        </h1>
        <p className="text-zinc-500 text-sm mb-6">Join and start chatting instantly</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="bg-zinc-800 text-white placeholder-zinc-500 rounded-xl px-4 py-3 outline-none border border-zinc-700 focus:border-red-500 transition-colors"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-zinc-800 text-white placeholder-zinc-500 rounded-xl px-4 py-3 outline-none border border-zinc-700 focus:border-red-500 transition-colors"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-zinc-800 text-white placeholder-zinc-500 rounded-xl px-4 py-3 outline-none border border-zinc-700 focus:border-red-500 transition-colors"
          />

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm">
              {error}
            </motion.p>
          )}

          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            disabled={loading}
            className="bg-red-600 hover:bg-red-500 text-white rounded-full py-3 font-medium shadow-lg shadow-red-600/30 disabled:opacity-50 transition-colors"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </motion.button>
        </form>

        <p className="text-zinc-500 text-sm text-center mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500 hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Signup;