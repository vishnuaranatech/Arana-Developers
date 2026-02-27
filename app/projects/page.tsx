"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import ContactForm from "@/app/components/ContactForm";

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
export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  /* 🔒 BACKGROUND SCROLL OFF WHEN MODAL OPEN */
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // cleanup (safety)
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProject]);

  useEffect(() => {
    const fetchProjects = async () => {
      const q = query(
        collection(db, "projects_new"),
        orderBy("order", "asc")
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Project, "id">),
      }));

      setProjects(data);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* ===================== */}
      {/* HERO BANNER */}
      {/* ===================== */}
      <div className="relative h-[75vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
          alt="Projects Banner"
          className="w-full h-full object-cover scale-105 animate-[zoomIn_20s_ease-in-out_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl">
              <div className="h-[1px] w-16 bg-amber-500 mb-8 animate-[slideRight_1s_ease-out]" />
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-tight leading-none animate-[fadeInUp_1s_ease-out]">
                Our Projects
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 font-light tracking-wide animate-[fadeInUp_1s_ease-out_0.2s_both]">
                Excellence in every development
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== */}
      {/* PROJECTS SECTION */}
      {/* ===================== */}
      <div className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block text-sm tracking-[0.3em] text-gray-400 uppercase mb-6">
              Portfolio
            </span>
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 leading-tight">
              Featured Developments
            </h2>
          </div>

          {loading && (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-2 border-gray-300 border-t-amber-500 rounded-full animate-spin" />
              <p className="text-gray-400 mt-6 tracking-wide">Loading projects...</p>
            </div>
          )}

          {!loading && (
            <div className="space-y-32">
              {projects.map((project, index) => (
                <ProjectBlock
                  key={project.id}
                  project={project}
                  reverse={index % 2 !== 0}
                  onClick={() => {
                    setSelectedProject(project);
                    setActiveImage(0);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ===================== */}
      {/* POPUP MODAL */}
      {/* ===================== */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          activeImage={activeImage}
          setActiveImage={setActiveImage}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* ===================== */}
      {/* CONTACT SECTION */}
      {/* ===================== */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <span className="inline-block text-sm tracking-[0.3em] text-gray-400 uppercase mb-6">
              Get In Touch
            </span>
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 leading-tight">
              Let's Connect
            </h2>
            <p className="text-lg text-gray-600 font-light leading-relaxed">
              Ready to start your dream project? Reach out to our team and we'll guide you through every step.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

/* ===================== */
/* PROJECT CARD */
/* ===================== */
function ProjectBlock({
  project,
  reverse,
  onClick,
}: {
  project: Project;
  reverse: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
        reverse ? "lg:grid-flow-dense" : ""
      }`}
    >
      <div className={`relative h-[500px] overflow-hidden ${reverse ? "lg:col-start-2" : ""}`}>
        <img
          src={project.images[0]}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* View More Badge */}
        <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-sm px-6 py-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          <span className="text-sm tracking-wider text-gray-900">VIEW DETAILS</span>
        </div>
      </div>

      <div className={`space-y-6 ${reverse ? "lg:col-start-1 lg:row-start-1" : ""}`}>
        <div className="h-[1px] w-12 bg-amber-500 transform origin-left transition-all duration-500 group-hover:w-24" />
        
        <h3 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight group-hover:text-gray-700 transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-lg text-gray-600 font-light leading-relaxed">
          {project.shortDescription}
        </p>
        
        <div className="flex items-center gap-3 text-gray-400 group-hover:text-amber-500 transition-colors duration-300">
          <span className="text-sm tracking-[0.2em] uppercase">Explore Project</span>
          <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ===================== */
/* MODAL WITH SLIDER */
/* ===================== */
function ProjectModal({
  project,
  activeImage,
  setActiveImage,
  onClose,
}: {
  project: Project;
  activeImage: number;
  setActiveImage: (n: number) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex justify-center items-start z-[9999] pt-20 pb-10 overflow-y-auto">
      <div className="bg-white w-[95%] max-w-6xl relative animate-[modalSlideUp_0.4s_ease-out] mx-auto">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 w-12 h-12 flex items-center justify-center bg-white/90 backdrop-blur-sm hover:bg-amber-500 text-gray-900 hover:text-white transition-all duration-300 group"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* IMAGE SLIDER */}
        <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-gray-100 flex items-center justify-center">
          <img
            src={project.images[activeImage]}
            alt={`${project.title} - Image ${activeImage + 1}`}
            className="w-full h-full object-contain"
          />
          
          {/* Image Counter */}
          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2">
            <span className="text-sm tracking-wider text-gray-900">
              {activeImage + 1} / {project.images.length}
            </span>
          </div>
        </div>

        {/* THUMBNAILS */}
        <div className="flex gap-4 p-6 overflow-x-auto bg-gray-50">
          {project.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`flex-shrink-0 relative overflow-hidden transition-all duration-300 ${
                activeImage === i 
                  ? "ring-2 ring-amber-500 ring-offset-2" 
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${i + 1}`}
                className="w-28 h-20 object-cover"
              />
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="p-12 space-y-8">
          <div>
            <div className="h-[1px] w-16 bg-amber-500 mb-6" />
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 leading-tight">
              {project.title}
            </h2>
            <p className="text-xl text-gray-700 font-light">
              {project.shortDescription}
            </p>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <p className="text-lg text-gray-600 font-light leading-relaxed whitespace-pre-line">
              {project.fullDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== */
/* ANIMATIONS */
/* ===================== */
const style = document.createElement('style');
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

  @keyframes modalSlideUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
if (typeof document !== 'undefined') {
  document.head.appendChild(style);
}