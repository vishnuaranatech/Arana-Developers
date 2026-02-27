"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/app/lib/firebase";

/* ===================== */
/* TYPE */
/* ===================== */
type Blog = {
  id: string;
  title: string;
  description: string;
  image: string;
  createdAt?: Timestamp;
  order?: number;
};

/* ===================== */
/* PAGE */
/* ===================== */
export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeBlogId, setActiveBlogId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(collection(db, "blogs"), orderBy("order", "asc"));

        const snapshot = await getDocs(q);

        const data: Blog[] = snapshot.docs.map((doc) => {
          const d = doc.data();

          return {
            id: doc.id,
            title: d.title || "",
            description: d.description || "",
            image:
              d.image && d.image.length > 0
                ? d.image
                : "https://picsum.photos/seed/fallback/800/500",
            createdAt: d.createdAt,
            order: d.order,
          };
        });

        setBlogs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* ===================== */}
      {/* HERO BANNER */}
      {/* ===================== */}
      <div className="relative h-[75vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1600&q=80"
          alt="Blog Banner"
          className="w-full h-full object-cover scale-105 animate-[zoomIn_20s_ease-in-out_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl">
              <div className="h-[1px] w-16 bg-amber-500 mb-8 animate-[slideRight_1s_ease-out]" />
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-tight leading-none animate-[fadeInUp_1s_ease-out]">
                Our Blog
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 font-light tracking-wide animate-[fadeInUp_1s_ease-out_0.2s_both]">
                Insights, updates and stories
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== */}
      {/* BLOG LIST */}
      {/* ===================== */}
      <div className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block text-sm tracking-[0.3em] text-gray-400 uppercase mb-6">
              Latest Articles
            </span>
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 leading-tight">
              Recent Posts
            </h2>
          </div>

          {loading && (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-2 border-gray-300 border-t-amber-500 rounded-full animate-spin" />
              <p className="text-gray-400 mt-6 tracking-wide">Loading blogs...</p>
            </div>
          )}

          {!loading && (
            <div className="space-y-24">
              {blogs.map((blog, index) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  isOpen={activeBlogId === blog.id}
                  onToggle={() =>
                    setActiveBlogId(activeBlogId === blog.id ? null : blog.id)
                  }
                  // opp right one left
                  // reverse={index % 2 !== 0} 
                  reverse={false}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ===================== */
/* BLOG CARD */
/* ===================== */
function BlogCard({
  blog,
  isOpen,
  onToggle,
  reverse,
}: {
  blog: Blog;
  isOpen: boolean;
  onToggle: () => void;
  reverse: boolean;
}) {
  return (
    <div
      className={`group grid grid-cols-1 lg:grid-cols-5 gap-12 items-start ${
        reverse ? "lg:grid-flow-dense" : ""
      }`}
    >
      <div
        className={`lg:col-span-2 relative h-[400px] overflow-hidden ${
          reverse ? "lg:col-start-4" : ""
        }`}
      >
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div
        className={`lg:col-span-3 space-y-6 ${
          reverse ? "lg:col-start-1 lg:row-start-1" : ""
        }`}
      >
        {/* Date */}
        {blog.createdAt && (
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-8 bg-amber-500" />
            <span className="text-sm tracking-wide text-gray-500 font-light">
              {blog.createdAt.toDate().toDateString()}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-3xl md:text-4xl font-light text-gray-900 leading-tight group-hover:text-gray-700 transition-colors">
          {blog.title}
        </h3>

        {/* Description */}
        <div
          className={`text-lg text-gray-600 font-light leading-relaxed transition-all duration-500 ${
            isOpen ? "" : "line-clamp-4"
          }`}
        >
          {blog.description}
        </div>

        {/* Read More Button */}
        <button
          onClick={onToggle}
          className="group/btn flex items-center gap-3 text-gray-700 hover:text-amber-500 transition-colors duration-300"
        >
          <span className="text-sm tracking-[0.2em] uppercase font-light">
            {isOpen ? "Read Less" : "Read More"}
          </span>
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ===================== */
/* ANIMATIONS */
/* ===================== */
const style = document.createElement("style");
style.textContent = `
  @keyframes zoomIn {
    0%, 100% { transform: scale(1.05); }
    50% { transform: scale(1.1); }
  }

  @keyframes slideRight {
    from {
      width: 0;
      opacity: 0;
    }
    to {
      width: 4rem;
      opacity: 1;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
if (typeof document !== "undefined") {
  document.head.appendChild(style);
}