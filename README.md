# LiveLine — Real-Time Chat Application

A full-stack real-time chat application built for **Prodigy Infotech Task-04**. LiveLine enables instant messaging between users through public chat rooms and private one-on-one conversations, powered by WebSocket technology.

🔗 **Live Demo:** [Add your deployed frontend URL here]
🔗 **Backend API:** [Add your deployed backend URL here]

---

## Features

### Core Features
- 🔐 **User Authentication** — Secure signup/login with JWT tokens and bcrypt password hashing
- 💬 **Real-Time Messaging** — Instant message delivery via Socket.IO (WebSockets)
- 🏠 **Chat Rooms** — Create and join public chat rooms
- 👤 **Private Conversations** — One-on-one private messaging between users

### Optional Features (Implemented)
- 🟢 **Live Presence Indicators** — See who's online in real time
- ✍️ **Typing Indicators** — Know when someone is composing a reply
- 🗂️ **Chat History** — All messages are persisted and loaded on demand
- 📎 **Multimedia File Sharing** — Upload and share images and files in chat

---

## Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS v4
- Framer Motion (animations)
- React Router
- Axios
- Socket.IO Client

**Backend**
- Node.js + Express
- Socket.IO
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Multer (file uploads)

**Database**
- MongoDB Atlas

**Deployment**
- Backend: Render
- Frontend: Vercel
- Database: MongoDB Atlas

---

## Project Structure

```
chat-app/
├── backend/
│   ├── config/          # MongoDB connection
│   ├── models/          # User, Message, Room, Conversation schemas
│   ├── controllers/     # Route logic (auth, rooms, messages, uploads)
│   ├── routes/           # Express route definitions
│   ├── middleware/       # JWT auth middleware, file upload middleware
│   ├── sockets/           # Socket.IO event handlers
│   ├── uploads/            # Uploaded files (gitignored)
│   └── server.js            # App entry point
│
├── frontend/
│   ├── src/
│   │   ├── api/              # Axios instance
│   │   ├── context/          # Auth & Socket context providers
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/             # Landing, Login, Signup, ChatPage
│   │   └── App.jsx
│   └── ...
│
|└── README.md
|
|___socket-test.html
```

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- npm

### 1. Clone the repository
```bash
git clone < https://github.com/Swati06-maurya/PRODIGY_FS_04.git>
cd chat-app
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```
MONGO_URI=mongodb+srv://swatimaurya10212_db_user:5pN2uvqYnp1mU6Ne@trustifycluster.y9jfy1p.mongodb.net/ChatbotDB?appName=TrustifyCluster
JWT_SECRET=your _ jwt _ secret key
PORT=5000
CLIENT_URL=http://localhost:5173
```

Run the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:
```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

Run the frontend:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Log in and receive a JWT |
| GET | `/api/rooms` | List all chat rooms |
| POST | `/api/rooms` | Create a new chat room |
| GET | `/api/users` | List all users (for DMs) |
| GET | `/api/messages/room/:roomId` | Get message history for a room |
| GET | `/api/messages/conversation/:userId` | Get/create a private conversation and its history |
| POST | `/api/upload` | Upload a file/image |

All routes except `/auth/*` require a `Authorization: Bearer <token>` header.

---

## Socket.IO Events

| Event | Direction | Description |
|-------|-----------|--------------|
| `authenticate` | Client → Server | Authenticates the socket with a JWT |
| `joinRoom` | Client → Server | Joins a room or conversation |
| `leaveRoom` | Client → Server | Leaves a room or conversation |
| `sendMessage` | Client → Server | Sends a message (text and/or file) |
| `newMessage` | Server → Client | Broadcasts a new message to the room |
| `typing` | Client → Server | Notifies others that the user is typing |
| `userTyping` | Server → Client | Broadcasts typing status |
| `userOnline` / `userOffline` | Server → Client | Broadcasts presence changes |

---

## Task Requirements Checklist

- [x] Real-time chat application using WebSocket technology
- [x] User account creation
- [x] Join chat rooms
- [x] Initiate private conversations
- [x] Exchange real-time text messages
- [x] Chat history (optional)
- [x] Notifications (typing indicators)
- [x] User presence indicators (optional)
- [x] Multimedia file sharing (optional)

---

---

## Future Enhancements

- **Group video/voice calls** — Integrate WebRTC for real-time audio/video chat within rooms or DMs
- **Message reactions & replies** — Emoji reactions and threaded replies to specific messages
- **Read receipts** — Show "seen" status for messages, similar to WhatsApp/Messenger
- **Message editing & deletion** — Allow users to edit or delete their own sent messages
- **Push notifications** — Browser/mobile push notifications for new messages when the app is in the background
- **Room roles & moderation** — Admin/moderator roles for rooms, with kick/mute/ban capabilities
- **Message search** — Full-text search across chat history within a room or conversation
- **End-to-end encryption** — Encrypt private conversations for enhanced privacy
- **Dark/light theme toggle** — User-selectable theme preference, persisted per account
- **Mobile app** — React Native version for iOS/Android
- **Message pagination & infinite scroll** — Load older messages in chunks instead of fetching entire history at once
- **User profiles** — Editable avatars, bios, and status messages
- **Rate limiting & spam protection** — Prevent message flooding and abuse
- **Horizontal scaling** — Redis adapter for Socket.IO to support multiple server instances in production

---

## Author

Built by Swati as part of the **Prodigy Infotech Web Development Internship** — Task-04.

## License

This project is for educational purposes as part of an internship task.
