"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import ContactForm from "@/app/components/ContactForm";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import founderImage from "@/app/assets/home/sir.png";

/* ===================== */
/* TYPES */
/* ===================== */
type Project = {
  id: string;
  title: string;
  shortDescription: string;
  images?: string[];
  order: number;
};

/* ===================== */
/* SCROLL REVEAL HOOK */
/* ===================== */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

/* ===================== */
/* REVEAL SECTION */
/* ===================== */
function RevealSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  /* ===================== */
  /* CAROUSEL */
  /* ===================== */
  const banners = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1600&q=80",
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % banners.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

  // Touch swipe support for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  /* ===================== */
  /* PROJECTS FROM FIRESTORE */
  /* ===================== */
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

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

  /* ===================== */
  /* TESTIMONIALS AUTO SCROLL */
  /* ===================== */
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* ===================== */}
      {/* SECTION 1: HERO CAROUSEL */}
      {/* ===================== */}
      <div
        className="relative h-[85vh] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={banners[current]}
          alt="Banner"
          className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-start pt-16 lg:items-center lg:pt-0">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-3xl">
              <div className="h-[1px] w-16 bg-amber-500 mb-8 animate-[slideRight_1s_ease-out]" />
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-tight leading-none animate-[fadeInUp_1s_ease-out]">
                Building Dreams
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 font-light tracking-wide mb-12 animate-[fadeInUp_1s_ease-out_0.2s_both]">
                Creating spaces where life unfolds beautifully
              </p>
              <Link href="/projects">
                <button className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-amber-500 hover:border-amber-500 transition-all duration-500 animate-[fadeInUp_1s_ease-out_0.4s_both]">
                  <span className="text-sm tracking-[0.2em] uppercase">
                    Explore Projects
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Founder Image — visible on all screens, sized responsively */}
        <div className="absolute bottom-0 right-4 lg:right-8 block animate-[fadeInUp_1s_ease-out_0.6s_both]">
          <div className="relative group">
            <div className="relative overflow-hidden w-52 h-72 sm:w-64 sm:h-80 lg:w-80 lg:h-[420px]">
              <Image
                src={founderImage}
                alt="Founder"
                fill
                className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
          </div>
        </div>

        {/* Navigation Arrows — hidden on mobile, visible on md+ */}
        <button
          onClick={prevSlide}
          className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 items-center justify-center bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30 transition-all duration-300 group z-10"
        >
          <svg
            className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 items-center justify-center bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30 transition-all duration-300 group z-10"
        >
          <svg
            className="w-6 h-6 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-1 transition-all duration-300 ${
                current === index
                  ? "w-12 bg-amber-500"
                  : "w-8 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ===================== */}
      {/* SECTION 2: PROJECTS */}
      {/* ===================== */}
      <div className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block text-sm tracking-[0.3em] text-gray-400 uppercase mb-6">
              Portfolio
            </span>
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 leading-tight">
              Our Projects
            </h2>
          </div>

          {loading && (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-2 border-gray-300 border-t-amber-500 rounded-full animate-spin" />
              <p className="text-gray-400 mt-6 tracking-wide">
                Loading projects...
              </p>
            </div>
          )}

          {!loading && (
            <div className="space-y-32">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  reverse={index % 2 !== 0}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ===================== */}
      {/* SECTION 3: TESTIMONIALS */}
      {/* ===================== */}
      <section className="py-20 px-6 lg:px-12 relative overflow-hidden">
        {/* Dark background matching original slate theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)`,
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Heading */}
          <RevealSection className="text-center mb-16">
            <span className="inline-block text-sm tracking-[0.3em] text-gray-400 uppercase mb-4">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-white leading-tight">
              Client Stories
            </h2>
          </RevealSection>

          {/* 3-card grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <RevealSection key={index} delay={index * 100}>
                <div
                  className={`relative p-8 border transition-all duration-500 cursor-pointer group ${
                    index === activeTestimonial
                      ? "border-amber-500/60 bg-amber-500/5"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20"
                  }`}
                  onClick={() => setActiveTestimonial(index)}
                >
                  {/* Top accent line — slides in on active/hover */}
                  <div
                    className={`absolute top-0 left-0 h-px transition-all duration-500 bg-amber-500 ${
                      index === activeTestimonial
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />

                  {/* Quote icon */}
                  <svg
                    className="w-6 h-6 text-amber-500/40 mb-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                  </svg>

                  {/* Text */}
                  <p className="text-gray-300 font-light leading-relaxed mb-6 text-sm">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xs font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">
                        {testimonial.name}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {testimonial.project}
                      </p>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          {/* Dot indicators — still functional */}
          <div className="flex justify-center gap-3 mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`h-1 transition-all duration-500 ${
                  index === activeTestimonial
                    ? "w-12 bg-amber-500"
                    : "w-8 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== */}
      {/* SECTION 4: CONTACT */}
      {/* ===================== */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-sm tracking-[0.3em] text-gray-400 uppercase mb-6">
              Get In Touch
            </span>
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 leading-tight">
              Start Your Journey
            </h2>
            <p className="text-lg text-gray-600 font-light leading-relaxed">
              Ready to create your dream space? Let's make it happen together.
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
function ProjectCard({
  project,
  reverse,
}: {
  project: Project;
  reverse: boolean;
}) {
  return (
    <div
      className={`group grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
        reverse ? "lg:grid-flow-dense" : ""
      }`}
    >
      <div
        className={`relative h-[450px] overflow-hidden ${
          reverse ? "lg:col-start-2" : ""
        }`}
      >
        <img
          src={
            project.images?.[0] ||
            "https://picsum.photos/seed/fallback/800/600"
          }
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div
        className={`space-y-6 ${
          reverse ? "lg:col-start-1 lg:row-start-1" : ""
        }`}
      >
        <div className="h-[1px] w-12 bg-amber-500 transform origin-left transition-all duration-500 group-hover:w-24" />

        <h3 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight">
          {project.title}
        </h3>

        <p className="text-lg text-gray-600 font-light leading-relaxed">
          {project.shortDescription}
        </p>

        {/* <Link href={`/projects?open=${project.id}`}> idhu vanthu direct ah project open panrathukana link */}

        <Link href="/projects">
          <button className="group/btn relative px-6 py-3 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-500 overflow-hidden">
            <span className="relative z-10 text-sm tracking-[0.2em] uppercase">
              View all
            </span>
            <div className="absolute inset-0 bg-amber-500 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500" />
          </button>
        </Link>
      </div>
    </div>
  );
}

/* ===================== */
/* TESTIMONIALS DATA */
/* ===================== */
const testimonials = [
  {
    text: "Arana Developers transformed our vision into reality. The attention to detail and commitment to quality is unmatched.",
    name: "Rajesh Kumar",
    project: "Villa Project - Phase 2",
  },
  {
    text: "Professional, transparent, and reliable. They delivered our dream home exactly on time and within budget.",
    name: "Priya Sharma",
    project: "Luxury Villa Owner",
  },
  {
    text: "From plot selection to construction, their team guided us at every step. Truly a partner we can trust.",
    name: "Anil Reddy",
    project: "DTCP Approved Plot",
  },
];

/* ===================== */
/* ANIMATIONS — SSR safe */
/* ===================== */
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideRight {
      from { width: 0; opacity: 0; }
      to   { width: 4rem; opacity: 1; }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeInRight {
      from { opacity: 0; transform: translateX(30px); }
      to   { opacity: 1; transform: translateX(0); }
    }
  `;
  document.head.appendChild(style);
}