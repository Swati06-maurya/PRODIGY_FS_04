import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Landing() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-30 flex justify-between items-center px-8 md:px-16 py-6 bg-black/70 backdrop-blur-md border-b border-zinc-900">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-gradient-to-br from-red-500 to-red-700" />
          <h1 className="text-lg font-bold tracking-wide">
            LIVE<span className="text-red-500">LINE</span>
          </h1>
        </div>
        <div className="hidden md:flex gap-8 text-sm text-zinc-300">
          <button onClick={() => scrollTo("overview")} className="text-red-500 border-b-2 border-red-500 pb-1">
            Overview
          </button>
          <button onClick={() => scrollTo("features")} className="hover:text-white transition-colors">
            Features
          </button>
          <button onClick={() => scrollTo("about")} className="hover:text-white transition-colors">
            About
          </button>
          <button onClick={() => scrollTo("contact")} className="hover:text-white transition-colors">
            Contact
          </button>
        </div>
      </nav>

{/* HERO / OVERVIEW */}
      <div id="overview" className="relative px-8 md:px-16 py-24 md:py-32 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-red-600/10 rounded-full blur-3xl -top-40 left-0 pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl relative z-10 text-center md:text-left"
          >
            <span className="inline-flex items-center gap-1.5 bg-red-600/20 text-red-400 text-xs font-medium px-3 py-1 rounded-full mb-5 border border-red-600/30">
              ⚡ Real-Time Messaging
            </span>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-5">
              Engineering <span className="text-red-500">Real-Time</span> Chat Systems
            </h2>
            <p className="text-zinc-400 mb-10 leading-relaxed text-lg">
              Instant messaging, live rooms, and private conversations —
              built for speed, presence, and seamless connection.
            </p>

            <div className="flex gap-4 justify-center md:justify-start">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                <Link to="/signup" className="inline-block bg-red-600 hover:bg-red-500 text-white px-7 py-3 rounded-full font-medium shadow-lg shadow-red-600/30 transition-colors">
                  Get Started
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                <Link to="/login" className="inline-block border border-zinc-700 text-zinc-200 px-7 py-3 rounded-full font-medium hover:bg-white/5 transition-colors">
                  Log In
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT SIDE VISUAL — orbiting message nodes around a live pulse core */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative w-full md:w-[460px] h-[420px] flex items-center justify-center shrink-0"
          >
            <div className="absolute w-[380px] h-[380px] bg-red-600/15 rounded-full blur-3xl" />

            {/* Orbiting rings */}
            <motion.div
              className="absolute w-[340px] h-[340px] rounded-full border border-red-600/25"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute w-[260px] h-[260px] rounded-full border border-red-600/15"
              animate={{ rotate: -360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute w-[180px] h-[180px] rounded-full border border-red-600/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            {/* Orbiting nodes riding the outer ring */}
            <motion.div
              className="absolute w-[340px] h-[340px]"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-lg shadow-red-600/50" />
            </motion.div>
            <motion.div
              className="absolute w-[260px] h-[260px]"
              animate={{ rotate: -360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-lg shadow-red-600/50" />
            </motion.div>
            <motion.div
              className="absolute w-[180px] h-[180px]"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-lg shadow-red-600/50" />
            </motion.div>

            {/* Pulsing core */}
            <motion.div
              className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-800 flex items-center justify-center shadow-2xl shadow-red-600/60"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-white text-xl">💬</span>
            </motion.div>
            <motion.div
              className="absolute w-16 h-16 rounded-full border-2 border-red-500"
              animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Floating chat preview card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute bottom-0 right-0 bg-zinc-900/90 backdrop-blur border border-zinc-800 rounded-2xl p-4 shadow-2xl w-52"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-red-700" />
                <div className="h-2 w-16 bg-zinc-700 rounded-full" />
              </div>
              <div className="space-y-2">
                <div className="bg-zinc-800 rounded-xl rounded-bl-sm px-3 py-1.5 text-xs text-zinc-200 w-3/4">
                  Join the room 🔥
                </div>
                <div className="bg-red-600 rounded-xl rounded-br-sm px-3 py-1.5 text-xs text-white w-3/4 ml-auto">
                  Connecting now...
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="flex flex-col items-center pt-16 text-zinc-500 text-xs relative z-10"
        >
          read more
          <span className="mt-1">↓</span>
        </motion.div>
      </div>

      {/* FEATURES — smaller, tighter cards, staggered scroll-reveal */}
      <section id="features" className="px-8 md:px-16 py-20 border-t border-zinc-900">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-2 text-center"
        >
          Built for <span className="text-red-500">real-time</span>
        </motion.h3>
        <p className="text-zinc-400 text-center mb-10 max-w-xl mx-auto text-sm">
          Everything you need for instant, reliable communication.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            { title: "Instant Messaging", desc: "Zero-lag WebSocket delivery.", icon: "⚡" },
            { title: "Rooms & DMs", desc: "Public rooms or private chats.", icon: "💬" },
            { title: "Live Presence", desc: "See who's online, instantly.", icon: "🟢" },
            { title: "Typing Indicators", desc: "Know when a reply's coming.", icon: "✍️" },
            { title: "Chat History", desc: "Every message, always saved.", icon: "🗂️" },
            { title: "Secure Auth", desc: "JWT + hashed passwords.", icon: "🔒" },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ y: -3, borderColor: "rgba(239,68,68,0.4)" }}
              className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 transition-colors"
            >
              <div className="text-xl mb-2">{f.icon}</div>
              <h4 className="font-semibold text-sm mb-1">{f.title}</h4>
              <p className="text-zinc-500 text-xs leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ABOUT — its own full-width tinted section, clearly separated */}
      <section id="about" className="relative px-8 md:px-16 py-24 border-t border-zinc-900 bg-gradient-to-b from-zinc-950 to-black overflow-hidden">
        <div className="absolute w-[400px] h-[400px] bg-red-600/10 rounded-full blur-3xl top-0 right-0 pointer-events-none" />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-red-500 text-xs font-semibold tracking-widest uppercase mb-3"
          >
            About the project
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-5"
          >
            Why <span className="text-red-500">LiveLine</span> exists
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 leading-relaxed"
          >
            LiveLine is a real-time messaging platform built with a Node.js and Socket.IO
            backend and a React frontend. It supports account creation, public chat rooms,
            private one-on-one conversations, and live presence tracking — all synced
            instantly across every connected client.
          </motion.p>
        </div>
      </section>

      {/* CONTACT — separate section, distinct card treatment */}
      <section id="contact" className="relative px-8 md:px-16 py-24 border-t border-zinc-900 overflow-hidden">
        <div className="absolute w-[350px] h-[350px] bg-red-600/10 rounded-full blur-3xl bottom-0 left-0 pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto text-center bg-zinc-900/60 border border-zinc-800 rounded-2xl p-10 relative z-10"
        >
          <h3 className="text-3xl font-bold mb-3">
            Get in <span className="text-red-500">Touch</span>
          </h3>
          <p className="text-zinc-400 mb-8 text-sm">
            Have questions or feedback? Reach out anytime.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} className="inline-block">
            <Link
              to="/signup"
              className="inline-block bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-full font-medium shadow-lg shadow-red-600/30 transition-colors"
            >
              Join LiveLine
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <footer className="text-center text-zinc-600 text-xs py-8 border-t border-zinc-900">
        © 2026 LiveLine — Developed and deployed by Swati
      </footer>
    </div>
  );
}

export default Landing;