"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        alert("Account not found. Please signup.");
      } else if (error.code === "auth/wrong-password") {
        alert("Wrong password.");
      } else {
        alert("Login failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-20 px-6">
      <div className="w-full max-w-md">
        {/* HEADING */}
        <div className="text-center mb-12">
          <div className="h-[1px] w-16 bg-amber-500 mx-auto mb-8" />
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-4 tracking-tight leading-tight">
            Welcome Back
          </h1>
          <p className="text-lg text-gray-600 font-light tracking-wide">
            Login to Arana Developers
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-6">
          {/* EMAIL */}
          <div>
            <label className="block text-sm tracking-wide text-gray-600 mb-2 font-light">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-4 border border-gray-300 focus:border-amber-500 focus:outline-none transition-colors font-light"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm tracking-wide text-gray-600 mb-2 font-light">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-4 border border-gray-300 focus:border-amber-500 focus:outline-none transition-colors font-light"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={submit}
            disabled={loading}
            className="w-full px-8 py-4 bg-gray-900 text-white hover:bg-amber-500 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
          >
            <span className="text-sm tracking-[0.2em] uppercase font-light">
              {loading ? "Signing In..." : "Sign In"}
            </span>
          </button>

          {/* FOOTER */}
          <div className="text-center pt-6 border-t border-gray-200 mt-8">
            <p className="text-sm text-gray-600 font-light">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-amber-500 hover:text-amber-600 transition-colors font-normal"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}