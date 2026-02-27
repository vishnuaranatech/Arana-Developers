"use client";

import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "@/app/lib/firebase";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    projects: 0,
    blogs: 0,
    leads: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [projSnap, blogSnap, leadSnap] = await Promise.all([
        getDocs(collection(db, "projects_new")),
        getDocs(collection(db, "blogs")),
        getDocs(collection(db, "contactRequests")),
      ]);
      setStats({
        projects: projSnap.size,
        blogs: blogSnap.size,
        leads: leadSnap.size,
      });
    };
    fetchStats();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin");
  };

  return (
    <AdminShell onLogout={handleLogout}>
      <div className="space-y-8">
        <div>
          <div className="h-[1px] w-12 bg-amber-500 mb-4" />
          <h1 className="text-4xl font-light text-white mb-2">Dashboard</h1>
          <p className="text-gray-400 font-light">Welcome back, Admin</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Projects"
            value={stats.projects}
            href="/admin/dashboard/projects"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            }
          />
          <StatCard
            title="Total Blogs"
            value={stats.blogs}
            href="/admin/dashboard/blogs"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            }
          />
          <StatCard
            title="Total Leads"
            value={stats.leads}
            href="/admin/dashboard/leads"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
          />
        </div>

        {/* Quick Links */}
        <div className="bg-white/5 border border-white/10 p-8">
          <h2 className="text-xl font-light text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <QuickAction href="/admin/dashboard/projects" label="Manage Projects" />
            <QuickAction href="/admin/dashboard/blogs" label="Manage Blogs" />
            <QuickAction href="/admin/dashboard/leads" label="View Leads" />
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

/* ===================== */
/* STAT CARD */
/* ===================== */
function StatCard({
  title,
  value,
  href,
  icon,
}: {
  title: string;
  value: number;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <div className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-500/50 p-8 transition-all duration-300 cursor-pointer">
        <div className="flex items-start justify-between mb-6">
          <div className="text-amber-500 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <div className="h-[1px] w-8 bg-amber-500/30 group-hover:w-12 transition-all duration-300 mt-3" />
        </div>
        <p className="text-4xl font-light text-white mb-2">{value}</p>
        <p className="text-sm tracking-wide text-gray-400 font-light">{title}</p>
      </div>
    </Link>
  );
}

/* ===================== */
/* QUICK ACTION */
/* ===================== */
function QuickAction({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href}>
      <div className="group flex items-center gap-4 p-4 border border-white/10 hover:border-amber-500/50 hover:bg-white/5 transition-all duration-300 cursor-pointer">
        <div className="w-2 h-2 bg-amber-500 group-hover:scale-150 transition-transform duration-300" />
        <span className="text-sm font-light text-gray-300 group-hover:text-white transition-colors">
          {label}
        </span>
        <svg className="w-4 h-4 text-gray-500 group-hover:text-amber-500 ml-auto transform group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </Link>
  );
}

/* ===================== */
/* ADMIN SHELL (Sidebar Layout) */
/* ===================== */
export function AdminShell({
  children,
  onLogout,
}: {
  children: React.ReactNode;
  onLogout: () => void;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      href: "/admin/dashboard/projects",
      label: "Projects",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      href: "/admin/dashboard/blogs",
      label: "Blogs",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
    },
    {
      href: "/admin/dashboard/leads",
      label: "Leads",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-slate-900/95 border-r border-white/10 flex flex-col z-30 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand */}
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-8 bg-amber-500" />
            <div>
              <p className="text-white font-light text-sm tracking-tight">Arana Developers</p>
              <p className="text-gray-500 text-xs tracking-[0.2em] uppercase mt-0.5">Admin</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-6 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`group flex items-center gap-4 px-4 py-3 transition-all duration-200 ${
                    isActive
                      ? "bg-amber-500/10 border-l-2 border-amber-500 text-amber-500"
                      : "text-gray-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                  }`}
                >
                  <span className={isActive ? "text-amber-500" : ""}>{item.icon}</span>
                  <span className="text-sm font-light tracking-wide">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-6 border-t border-white/10">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-sm font-light">Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 min-h-screen">
        {/* Top Bar */}
        <div className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-sm border-b border-white/10 px-8 py-4 flex items-center gap-4">
          <button
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-gray-400 font-light">Online</span>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}