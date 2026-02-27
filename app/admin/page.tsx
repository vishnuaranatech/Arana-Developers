"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";

const ADMIN_EMAIL = "admin@aranadevelopers.com";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (email !== ADMIN_EMAIL) {
      setError("Access denied. Admin only.");
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError("Invalid credentials. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)`,
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[1px] w-12 bg-amber-500" />
            <h1 className="text-2xl font-light text-white tracking-tight">
              Arana Developers
            </h1>
            <div className="h-[1px] w-12 bg-amber-500" />
          </div>
          <p className="text-sm tracking-[0.3em] text-gray-400 uppercase">
            Admin Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-10">
          <h2 className="text-3xl font-light text-white mb-8 text-center">
            Sign In
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center font-light">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm tracking-wide text-gray-400 mb-2 font-light">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@aranadevelopers.com"
                className="w-full px-4 py-4 bg-white/5 border border-white/20 text-white placeholder-gray-600 focus:border-amber-500 focus:outline-none transition-colors font-light"
              />
            </div>

            <div>
              <label className="block text-sm tracking-wide text-gray-400 mb-2 font-light">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-4 bg-white/5 border border-white/20 text-white placeholder-gray-600 focus:border-amber-500 focus:outline-none transition-colors font-light"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 bg-amber-500 hover:bg-amber-400 text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              <span className="text-sm tracking-[0.2em] uppercase font-light">
                {loading ? "Signing in..." : "Sign In"}
              </span>
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-600 mt-8 font-light tracking-wide">
          Restricted access — Authorized personnel only
        </p>
      </div>
    </div>
  );
}