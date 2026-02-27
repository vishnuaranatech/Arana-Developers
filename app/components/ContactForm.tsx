"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import Image from "next/image";
import founderImage from "@/app/assets/home/sir.png";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    location: "",
    plotSize: "",
    service: "",   // ✅ "time" → "service"
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "contactRequests"), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      setSuccess(true);
      setFormData({
        name: "",
        mobile: "",
        email: "",
        location: "",
        plotSize: "",
        service: "",   // ✅ reset also updated
      });

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error saving data: ", error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center px-4 py-12 bg-stone-10">
      <div className="flex flex-col md:flex-row w-full max-w-5xl shadow-2xl rounded-2xl overflow-hidden bg-white">

        {/* LEFT — Form */}
        <div className="w-full md:w-2/3 px-10 py-12">
          <div className="bg-white">
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-center animate-[fadeInUp_0.3s_ease-out]">
                <p className="text-green-700 font-light tracking-wide">
                  ✓ Submitted successfully! We'll get back to you soon.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Row 1 — Name + Mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm tracking-wide text-gray-600 mb-2 font-light">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 border border-gray-300 focus:border-amber-500 focus:outline-none transition-colors font-light"
                  />
                </div>

                <div>
                  <label className="block text-sm tracking-wide text-gray-600 mb-2 font-light">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Enter your mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 border border-gray-300 focus:border-amber-500 focus:outline-none transition-colors font-light"
                  />
                </div>
              </div>

              {/* Row 2 — Email + Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm tracking-wide text-gray-600 mb-2 font-light">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-gray-300 focus:border-amber-500 focus:outline-none transition-colors font-light"
                  />
                </div>

                <div>
                  <label className="block text-sm tracking-wide text-gray-600 mb-2 font-light">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g., Tambaram"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-gray-300 focus:border-amber-500 focus:outline-none transition-colors font-light"
                  />
                </div>
              </div>

              {/* Row 3 — Plot Size + Select Your Service */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm tracking-wide text-gray-600 mb-2 font-light">
                    Size of Plot
                  </label>
                  <input
                    type="text"
                    name="plotSize"
                    placeholder="e.g., 2400 sq.ft"
                    value={formData.plotSize}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-gray-300 focus:border-amber-500 focus:outline-none transition-colors font-light"
                  />
                </div>

                <div>
                  <label className="block text-sm tracking-wide text-gray-600 mb-2 font-light">
                    Select Your Service
                  </label>
                  <select
                    name="service"   
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-gray-300 focus:border-amber-500 focus:outline-none transition-colors font-light bg-white text-gray-700"
                  >
                    <option value="" disabled>Select a service</option>
                    <option value="Custom Construction Service">Custom Construction Service</option>
                    <option value="Joint Venture">Joint Venture</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 bg-gray-900 text-white hover:bg-amber-500 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-sm tracking-[0.2em] uppercase font-light">
                  {loading ? "Submitting..." : "Submit Enquiry"}
                </span>
              </button>

            </form>
          </div>
        </div>

        {/* RIGHT — Image */}
        <div className="hidden md:flex w-1/3 bg-amber-50 items-center justify-center">
          <Image
            src={founderImage}
            alt="Founder"
            className="object-contain"
            style={{ maxHeight: "420px", width: "auto" }}
            priority
          />
        </div>

      </div>
    </div>
  );
}