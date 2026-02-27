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
type Project = {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  order: number;
};

/* ===================== */
/* PAGE */
/* ===================== */
export default function ProjectsAdmin() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    order: 0,
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin");
  };

  /* ===================== */
  /* FETCH */
  /* ===================== */
  const fetchProjects = async () => {
    const q = query(collection(db, "projects_new"), orderBy("order", "asc"));
    const snap = await getDocs(q);
    const data = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Project, "id">) }));
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  /* ===================== */
  /* OPEN FORM */
  /* ===================== */
  const openAdd = () => {
    setEditProject(null);
    setForm({ title: "", shortDescription: "", fullDescription: "", order: projects.length + 1 });
    setImageFiles([]);
    setImagePreviews([]);
    setExistingImages([]);
    setShowForm(true);
  };

  const openEdit = (p: Project) => {
    setEditProject(p);
    setForm({
      title: p.title,
      shortDescription: p.shortDescription,
      fullDescription: p.fullDescription,
      order: p.order,
    });
    setImageFiles([]);
    setImagePreviews([]);
    setExistingImages(p.images || []);
    setShowForm(true);
  };

  /* ===================== */
  /* IMAGE UPLOAD */
  /* ===================== */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImageFiles(files);
    setImagePreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    const urls: string[] = [];
    for (const file of files) {
      const storageRef = ref(storage, `projects/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      urls.push(url);
    }
    return urls;
  };

  /* ===================== */
  /* SAVE */
  /* ===================== */
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let newImageUrls: string[] = [];
      if (imageFiles.length > 0) {
        newImageUrls = await uploadImages(imageFiles);
      }

      const finalImages = [...existingImages, ...newImageUrls];

      const data = {
        title: form.title,
        shortDescription: form.shortDescription,
        fullDescription: form.fullDescription,
        order: Number(form.order),
        images: finalImages,
        updatedAt: serverTimestamp(),
      };

      if (editProject) {
        await updateDoc(doc(db, "projects_new", editProject.id), data);
      } else {
        await addDoc(collection(db, "projects_new"), {
          ...data,
          createdAt: serverTimestamp(),
        });
      }

      setShowForm(false);
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert("Error saving project");
    }

    setSaving(false);
  };

  /* ===================== */
  /* DELETE */
  /* ===================== */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    setDeleting(id);
    await deleteDoc(doc(db, "projects_new", id));
    fetchProjects();
    setDeleting(null);
  };

  /* ===================== */
  /* REMOVE EXISTING IMAGE */
  /* ===================== */
  const removeExistingImage = (url: string) => {
    setExistingImages((prev) => prev.filter((i) => i !== url));
  };

  return (
    <AdminShell onLogout={handleLogout}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="h-[1px] w-12 bg-amber-500 mb-4" />
            <h1 className="text-4xl font-light text-white mb-2">Projects</h1>
            <p className="text-gray-400 font-light">{projects.length} projects total</p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-3 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-sm tracking-[0.15em] uppercase font-light">Add Project</span>
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-2 border-gray-700 border-t-amber-500 rounded-full animate-spin" />
          </div>
        )}

        {/* Projects List */}
        {!loading && (
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-white/5 border border-white/10 hover:border-white/20 p-6 transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  {/* Image */}
                  {project.images?.[0] && (
                    <div className="flex-shrink-0 w-24 h-20 overflow-hidden">
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs text-amber-500 font-light tracking-wide">
                        #{project.order}
                      </span>
                      <h3 className="text-lg font-light text-white truncate">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-400 font-light line-clamp-2">
                      {project.shortDescription}
                    </p>
                    <p className="text-xs text-gray-600 mt-2 font-light">
                      {project.images?.length || 0} images
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <button
                      onClick={() => openEdit(project)}
                      className="px-4 py-2 border border-white/20 text-gray-300 hover:border-amber-500 hover:text-amber-500 text-sm font-light transition-all duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      disabled={deleting === project.id}
                      className="px-4 py-2 border border-white/20 text-gray-300 hover:border-red-500 hover:text-red-400 text-sm font-light transition-all duration-200 disabled:opacity-50"
                    >
                      {deleting === project.id ? "..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {projects.length === 0 && (
              <div className="text-center py-20 text-gray-500 font-light">
                No projects yet. Click "Add Project" to get started.
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
                {editProject ? "Edit Project" : "Add Project"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
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
                  placeholder="Project title"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2 font-light tracking-wide">Short Description *</label>
                <input
                  type="text"
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white focus:border-amber-500 focus:outline-none font-light"
                  placeholder="One-line description"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2 font-light tracking-wide">Full Description *</label>
                <textarea
                  value={form.fullDescription}
                  onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white focus:border-amber-500 focus:outline-none font-light resize-none"
                  placeholder="Detailed description..."
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

              {/* Existing Images */}
              {existingImages.length > 0 && (
                <div>
                  <label className="block text-sm text-gray-400 mb-3 font-light tracking-wide">
                    Current Images
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {existingImages.map((url, i) => (
                      <div key={i} className="relative group">
                        <img src={url} alt="" className="w-20 h-16 object-cover" />
                        <button
                          type="button"
                          onClick={() => removeExistingImage(url)}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload New Images */}
              <div>
                <label className="block text-sm text-gray-400 mb-2 font-light tracking-wide">
                  {editProject ? "Add More Images" : "Upload Images"}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 text-gray-400 focus:border-amber-500 focus:outline-none font-light file:mr-4 file:py-1 file:px-3 file:border-0 file:bg-amber-500 file:text-white file:text-sm file:cursor-pointer"
                />
                {imagePreviews.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-3">
                    {imagePreviews.map((p, i) => (
                      <img key={i} src={p} alt="" className="w-20 h-16 object-cover opacity-70" />
                    ))}
                  </div>
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
                  {saving ? "Saving..." : editProject ? "Update Project" : "Add Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}