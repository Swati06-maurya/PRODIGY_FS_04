import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="h-14 bg-neutral-900 border-b border-violet-900/40 flex items-center justify-between px-5">
      <h1 className="text-white font-bold text-lg">
        Chat<span className="text-violet-400">App</span>
      </h1>
      <div className="flex items-center gap-4">
        <span className="text-neutral-400 text-sm">
          Hi, <span className="text-white">{user?.username}</span>
        </span>
        <button
          onClick={logout}
          className="text-sm text-violet-400 hover:text-violet-300 hover:underline"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;