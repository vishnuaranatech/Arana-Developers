"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/app/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const submit = async () => {
    try {
      setLoading(true);

      const res = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      await setDoc(doc(db, "users", res.user.uid), {
        name: form.name,
        email: form.email,
        mobile: form.mobile,
        createdAt: new Date(),
      });

      router.push("/");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already registered. Please login.");
      } else {
        alert("Signup failed. Try again.");
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
            Create Account
          </h1>
          <p className="text-lg text-gray-600 font-light tracking-wide">
            Join Arana Developers
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-6">
          {/* NAME */}
          <div>
            <label className="block text-sm tracking-wide text-gray-600 mb-2 font-light">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-4 border border-gray-300 focus:border-amber-500 focus:outline-none transition-colors font-light"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm tracking-wide text-gray-600 mb-2 font-light">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-4 border border-gray-300 focus:border-amber-500 focus:outline-none transition-colors font-light"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* MOBILE */}
          <div>
            <label className="block text-sm tracking-wide text-gray-600 mb-2 font-light">
              Mobile Number
            </label>
            <input
              type="tel"
              placeholder="Enter your mobile number"
              className="w-full px-4 py-4 border border-gray-300 focus:border-amber-500 focus:outline-none transition-colors font-light"
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm tracking-wide text-gray-600 mb-2 font-light">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-4 border border-gray-300 focus:border-amber-500 focus:outline-none transition-colors font-light"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={submit}
            disabled={loading}
            className="w-full px-8 py-4 bg-gray-900 text-white hover:bg-amber-500 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
          >
            <span className="text-sm tracking-[0.2em] uppercase font-light">
              {loading ? "Creating Account..." : "Create Account"}
            </span>
          </button>

          {/* FOOTER */}
          <div className="text-center pt-6 border-t border-gray-200 mt-8">
            <p className="text-sm text-gray-600 font-light">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-amber-500 hover:text-amber-600 transition-colors font-normal"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}