"use client";

import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db, storage } from "@/app/lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import { AdminShell } from "../page";

/* ===================== */
/* TYPES */
/* ===================== */
type Blog = {
  id: string;
  title: string;
  description: string;
  image: string;
  order: number;
};

/* ===================== */
/* PAGE */
/* ===================== */
export default function BlogsAdmin() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editBlog, setEditBlog] = useState<Blog | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    order: 0,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [existingImage, setExistingImage] = useState<string>("");

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin");
  };

  /* ===================== */
  /* FETCH */
  /* ===================== */
  const fetchBlogs = async () => {
    const q = query(collection(db, "blogs"), orderBy("order", "asc"));
    const snap = await getDocs(q);
    const data = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Blog, "id">) }));
    setBlogs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  /* ===================== */
  /* OPEN FORM */
  /* ===================== */
  const openAdd = () => {
    setEditBlog(null);
    setForm({ title: "", description: "", order: blogs.length + 1 });
    setImageFile(null);
    setImagePreview("");
    setExistingImage("");
    setShowForm(true);
  };

  const openEdit = (b: Blog) => {
    setEditBlog(b);
    setForm({ title: b.title, description: b.description, order: b.order });
    setImageFile(null);
    setImagePreview("");
    setExistingImage(b.image || "");
    setShowForm(true);
  };

  /* ===================== */
  /* IMAGE */
  /* ===================== */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const storageRef = ref(storage, `blogs/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  /* ===================== */
  /* SAVE */
  /* ===================== */
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let finalImage = existingImage;
      if (imageFile) {
        finalImage = await uploadImage(imageFile);
      }

      const data = {
        title: form.title,
        description: form.description,
        order: Number(form.order),
        image: finalImage,
        updatedAt: serverTimestamp(),
      };

      if (editBlog) {
        await updateDoc(doc(db, "blogs", editBlog.id), data);
      } else {
        await addDoc(collection(db, "blogs"), {
          ...data,
          createdAt: serverTimestamp(),
        });
      }

      setShowForm(false);
      fetchBlogs();
    } catch (err) {
      console.error(err);
      alert("Error saving blog");
    }

    setSaving(false);
  };

  /* ===================== */
  /* DELETE */
  /* ===================== */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog?")) return;
    setDeleting(id);
    await deleteDoc(doc(db, "blogs", id));
    fetchBlogs();
    setDeleting(null);
  };

  return (
    <AdminShell onLogout={handleLogout}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="h-[1px] w-12 bg-amber-500 mb-4" />
            <h1 className="text-4xl font-light text-white mb-2">Blogs</h1>
            <p className="text-gray-400 font-light">{blogs.length} blogs total</p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-3 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-sm tracking-[0.15em] uppercase font-light">Add Blog</span>
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-2 border-gray-700 border-t-amber-500 rounded-full animate-spin" />
          </div>
        )}

        {/* Blogs List */}
        {!loading && (
          <div className="space-y-4">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="group bg-white/5 border border-white/10 hover:border-white/20 p-6 transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  {/* Image */}
                  {blog.image && (
                    <div className="flex-shrink-0 w-24 h-20 overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs text-amber-500 font-light tracking-wide">
                        #{blog.order}
                      </span>
                      <h3 className="text-lg font-light text-white truncate">
                        {blog.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-400 font-light line-clamp-2">
                      {blog.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <button
                      onClick={() => openEdit(blog)}
                      className="px-4 py-2 border border-white/20 text-gray-300 hover:border-amber-500 hover:text-amber-500 text-sm font-light transition-all duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      disabled={deleting === blog.id}
                      className="px-4 py-2 border border-white/20 text-gray-300 hover:border-red-500 hover:text-red-400 text-sm font-light transition-all duration-200 disabled:opacity-50"
                    >
                      {deleting === blog.id ? "..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {blogs.length === 0 && (
              <div className="text-center py-20 text-gray-500 font-light">
                No blogs yet. Click "Add Blog" to get started.
              </div>
            )}
          </div>
        )}
      </div>

      {/* ===================== */}
      {/* FORM MODAL */}
      {/* ===================== */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-10 pb-10 overflow-y-auto px-4">
          <div className="bg-slate-900 border border-white/10 w-full max-w-2xl animate-[slideUp_0.3s_ease-out]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-8 border-b border-white/10">
              <h2 className="text-2xl font-light text-white">
                {editBlog ? "Edit Blog" : "Add Blog"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="p-8 space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2 font-light tracking-wide">Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white focus:border-amber-500 focus:outline-none font-light"
                  placeholder="Blog title"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2 font-light tracking-wide">Content *</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                  rows={8}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white focus:border-amber-500 focus:outline-none font-light resize-none"
                  placeholder="Blog content..."
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2 font-light tracking-wide">Order</label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white focus:border-amber-500 focus:outline-none font-light"
                />
              </div>

              {/* Existing Image */}
              {existingImage && !imagePreview && (
                <div>
                  <label className="block text-sm text-gray-400 mb-3 font-light tracking-wide">Current Image</label>
                  <div className="relative inline-block group">
                    <img src={existingImage} alt="" className="w-32 h-24 object-cover" />
                    <button
                      type="button"
                      onClick={() => setExistingImage("")}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}

              {/* Upload Image */}
              <div>
                <label className="block text-sm text-gray-400 mb-2 font-light tracking-wide">
                  {editBlog ? "Change Image" : "Upload Image"}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 text-gray-400 focus:border-amber-500 focus:outline-none font-light file:mr-4 file:py-1 file:px-3 file:border-0 file:bg-amber-500 file:text-white file:text-sm file:cursor-pointer"
                />
                {imagePreview && (
                  <img src={imagePreview} alt="" className="w-32 h-24 object-cover mt-3 opacity-70" />
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-6 py-3 border border-white/20 text-gray-300 hover:text-white hover:border-white/40 text-sm font-light transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white text-sm font-light transition-all duration-200 disabled:opacity-50"
                >
                  {saving ? "Saving..." : editBlog ? "Update Blog" : "Add Blog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}