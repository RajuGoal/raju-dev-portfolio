import { useState } from "react";
import { Lock } from "lucide-react";
import { useAdminAuth } from "../../hooks/useAdminAuth";

export default function AdminLogin({ onSuccess }) {
  const { login } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(password)) {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900/60 border border-slate-700 rounded-xl p-8 w-full max-w-sm flex flex-col gap-4"
      >
        <div className="flex flex-col items-center gap-2 mb-2">
          <div className="p-3 rounded-full bg-slate-800 text-amber-400">
            <Lock size={22} />
          </div>
          <h2 className="text-lg font-bold text-slate-100">Admin Access</h2>
        </div>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          autoFocus
          className={`px-4 py-2.5 rounded-lg bg-slate-950 border text-slate-200 text-sm
                     focus:outline-none transition-colors
                     ${error ? "border-red-500" : "border-slate-700 focus:border-amber-400"}`}
        />

        {error && <p className="text-red-400 text-xs font-mono">Incorrect password</p>}

        <button
          type="submit"
          className="px-4 py-2.5 rounded-lg bg-amber-400 text-slate-900 font-bold text-sm hover:bg-amber-300 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}