"use client";

import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "@/app/lib/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { AdminShell } from "../page";
import * as XLSX from "xlsx";

/* ===================== */
/* TYPES */
/* ===================== */
type Lead = {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  location?: string;
  plotSize?: string;
  service?: string;
  createdAt?: Timestamp;
};

/* ===================== */
/* PAGE */
/* ===================== */
export default function LeadsAdmin() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [search, setSearch] = useState("");

  // Excel Export States
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFilter, setExportFilter] = useState<"today" | "yesterday" | "7days" | "30days" | "all" | "custom">("all");
  const [customFromDate, setCustomFromDate] = useState("");
  const [customToDate, setCustomToDate] = useState("");

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin");
  };

  /* ===================== */
  /* FETCH */
  /* ===================== */
  const fetchLeads = async () => {
    try {
      const q = query(collection(db, "contactRequests"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const data = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Lead, "id">) }));
      setLeads(data);
    } catch (err) {
      // fallback without orderBy if index not ready
      const snap = await getDocs(collection(db, "contactRequests"));
      const data = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Lead, "id">) }));
      setLeads(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  /* ===================== */
  /* DELETE */
  /* ===================== */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    setDeleting(id);
    await deleteDoc(doc(db, "contactRequests", id));
    fetchLeads();
    setDeleting(null);
    if (selectedLead?.id === id) setSelectedLead(null);
  };

  /* ===================== */
  /* FILTER */
  /* ===================== */
  const filtered = leads.filter(
    (l) =>
      l.name?.toLowerCase().includes(search.toLowerCase()) ||
      l.mobile?.includes(search) ||
      l.email?.toLowerCase().includes(search.toLowerCase()) ||
      l.location?.toLowerCase().includes(search.toLowerCase())
  );

  /* ===================== */
  /* EXCEL EXPORT */
  /* ===================== */
  const handleExportToExcel = () => {
    let filteredLeads = [...leads];

    // Apply date filters
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (exportFilter === "today") {
      filteredLeads = leads.filter((l) => {
        if (!l.createdAt) return false;
        const leadDate = l.createdAt.toDate();
        return leadDate >= today;
      });
    } else if (exportFilter === "yesterday") {
      filteredLeads = leads.filter((l) => {
        if (!l.createdAt) return false;
        const leadDate = l.createdAt.toDate();
        return leadDate >= yesterday && leadDate < today;
      });
    } else if (exportFilter === "7days") {
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      filteredLeads = leads.filter((l) => {
        if (!l.createdAt) return false;
        const leadDate = l.createdAt.toDate();
        return leadDate >= sevenDaysAgo;
      });
    } else if (exportFilter === "30days") {
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      filteredLeads = leads.filter((l) => {
        if (!l.createdAt) return false;
        const leadDate = l.createdAt.toDate();
        return leadDate >= thirtyDaysAgo;
      });
    } else if (exportFilter === "custom" && customFromDate && customToDate) {
      const fromDate = new Date(customFromDate);
      const toDate = new Date(customToDate);
      toDate.setHours(23, 59, 59, 999); // Include full end date
      filteredLeads = leads.filter((l) => {
        if (!l.createdAt) return false;
        const leadDate = l.createdAt.toDate();
        return leadDate >= fromDate && leadDate <= toDate;
      });
    }

    // Prepare Excel data
    const excelData = filteredLeads.map((lead) => {
      const date = lead.createdAt ? lead.createdAt.toDate() : new Date();
      return {
        Date: date.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        Day: date.toLocaleDateString("en-IN", { weekday: "long" }),
        Time: date.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        Name: lead.name || "",
        Mobile: lead.mobile || "",
        Email: lead.email || "",
        Location: lead.location || "",
        "Plot Size": lead.plotSize || "",
        "Service": lead.service || "",
      };
    });

    // Create worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

    // Auto-size columns
    const maxWidth = 30;
    const wscols = [
      { wch: 12 }, // Date
      { wch: 12 }, // Day
      { wch: 10 }, // Time
      { wch: 20 }, // Name
      { wch: 15 }, // Mobile
      { wch: 25 }, // Email
      { wch: 20 }, // Location
      { wch: 15 }, // Plot Size
      { wch: 20 }, // Preferred Call Time
    ];
    worksheet["!cols"] = wscols;

    // Generate filename with date range
    let filename = "Arana_Leads_";
    if (exportFilter === "today") {
      filename += "Today";
    } else if (exportFilter === "yesterday") {
      filename += "Yesterday";
    } else if (exportFilter === "7days") {
      filename += "Last_7_Days";
    } else if (exportFilter === "30days") {
      filename += "Last_30_Days";
    } else if (exportFilter === "custom" && customFromDate && customToDate) {
      filename += `${customFromDate}_to_${customToDate}`;
    } else {
      filename += "All";
    }
    filename += ".xlsx";

    // Download file
    XLSX.writeFile(workbook, filename);

    // Close modal
    setShowExportModal(false);
  };

  return (
    <AdminShell onLogout={handleLogout}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="h-[1px] w-12 bg-amber-500 mb-4" />
            <h1 className="text-4xl font-light text-white mb-2">Leads</h1>
            <p className="text-gray-400 font-light">{leads.length} total enquiries</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Export to Excel Button */}
            <button
              onClick={() => setShowExportModal(true)}
              className="flex items-center gap-3 px-6 py-3 bg-green-600 hover:bg-green-500 text-white transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm tracking-[0.15em] uppercase font-light">Export to Excel</span>
            </button>

            {/* Search */}
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search name, mobile, location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-3 bg-white/5 border border-white/20 text-white placeholder-gray-600 focus:border-amber-500 focus:outline-none font-light text-sm w-64"
              />
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-2 border-gray-700 border-t-amber-500 rounded-full animate-spin" />
          </div>
        )}

        {/* Leads List */}
        {!loading && (
          <div className="space-y-3">
            {filtered.map((lead) => (
              <div
                key={lead.id}
                className="group bg-white/5 border border-white/10 hover:border-amber-500/30 p-6 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedLead(lead)}
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Info */}
                  <div className="flex items-center gap-6 min-w-0">
                    {/* Avatar */}
                    <div className="flex-shrink-0 w-10 h-10 bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                      <span className="text-amber-500 font-light text-sm">
                        {lead.name?.charAt(0)?.toUpperCase() || "?"}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <p className="text-white font-light text-base">{lead.name}</p>
                      <div className="flex items-center gap-4 mt-1 flex-wrap">
                        <span className="text-sm text-gray-400 font-light">{lead.mobile}</span>
                        {lead.location && (
                          <span className="text-xs text-gray-500 font-light">📍 {lead.location}</span>
                        )}
                        {lead.plotSize && (
                          <span className="text-xs text-gray-500 font-light">📐 {lead.plotSize}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex items-center gap-4 flex-shrink-0">
                    {lead.createdAt && (
                      <span className="text-xs text-gray-500 font-light hidden md:block">
                        {lead.createdAt.toDate().toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(lead.id);
                      }}
                      disabled={deleting === lead.id}
                      className="px-3 py-1.5 border border-white/20 text-gray-400 hover:border-red-500 hover:text-red-400 text-xs font-light transition-all duration-200 disabled:opacity-50"
                    >
                      {deleting === lead.id ? "..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-20 text-gray-500 font-light">
                {search ? "No results found." : "No leads yet."}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ===================== */}
      {/* EXPORT MODAL */}
      {/* ===================== */}
      {showExportModal && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          onClick={() => setShowExportModal(false)}
        >
          <div
            className="bg-slate-900 border border-white/10 w-full max-w-lg animate-[slideUp_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-8 border-b border-white/10">
              <h2 className="text-2xl font-light text-white">Export to Excel</h2>
              <button
                onClick={() => setShowExportModal(false)}
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Filter Options */}
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-4 font-light tracking-wide">
                  Select Date Range
                </label>
                <div className="space-y-3">
                  <FilterOption
                    label="Today's Leads"
                    value="today"
                    selected={exportFilter === "today"}
                    onClick={() => setExportFilter("today")}
                  />
                  <FilterOption
                    label="Yesterday's Leads"
                    value="yesterday"
                    selected={exportFilter === "yesterday"}
                    onClick={() => setExportFilter("yesterday")}
                  />
                  <FilterOption
                    label="Last 7 Days"
                    value="7days"
                    selected={exportFilter === "7days"}
                    onClick={() => setExportFilter("7days")}
                  />
                  <FilterOption
                    label="Last 30 Days"
                    value="30days"
                    selected={exportFilter === "30days"}
                    onClick={() => setExportFilter("30days")}
                  />
                  <FilterOption
                    label="All Leads"
                    value="all"
                    selected={exportFilter === "all"}
                    onClick={() => setExportFilter("all")}
                  />
                  <FilterOption
                    label="Custom Date Range"
                    value="custom"
                    selected={exportFilter === "custom"}
                    onClick={() => setExportFilter("custom")}
                  />
                </div>
              </div>

              {/* Custom Date Range */}
              {exportFilter === "custom" && (
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-light">From Date</label>
                    <input
                      type="date"
                      value={customFromDate}
                      onChange={(e) => setCustomFromDate(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white focus:border-amber-500 focus:outline-none font-light"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-light">To Date</label>
                    <input
                      type="date"
                      value={customToDate}
                      onChange={(e) => setCustomToDate(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white focus:border-amber-500 focus:outline-none font-light"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="p-8 pt-0 flex gap-4">
              <button
                onClick={() => setShowExportModal(false)}
                className="flex-1 px-6 py-3 border border-white/20 text-gray-300 hover:text-white hover:border-white/40 text-sm font-light transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleExportToExcel}
                disabled={exportFilter === "custom" && (!customFromDate || !customToDate)}
                className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-500 text-white text-sm font-light transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Download Excel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== */}
      {/* LEAD DETAIL MODAL */}
      {/* ===================== */}
      {selectedLead && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="bg-slate-900 border border-white/10 w-full max-w-lg animate-[slideUp_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-8 border-b border-white/10">
              <h2 className="text-2xl font-light text-white">Lead Details</h2>
              <button
                onClick={() => setSelectedLead(null)}
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Details */}
            <div className="p-8 space-y-5">
              <DetailRow label="Name" value={selectedLead.name} />
              <DetailRow label="Mobile" value={selectedLead.mobile} />
              {selectedLead.email && <DetailRow label="Email" value={selectedLead.email} />}
              {selectedLead.location && <DetailRow label="Location" value={selectedLead.location} />}
              {selectedLead.plotSize && <DetailRow label="Plot Size" value={selectedLead.plotSize} />}
              {selectedLead.service && <DetailRow label="service" value={selectedLead.service} />}
              {selectedLead.createdAt && (
                <DetailRow
                  label="Submitted On"
                  value={selectedLead.createdAt.toDate().toLocaleString("en-IN")}
                />
              )}
            </div>

            {/* Actions */}
            <div className="p-8 pt-0 flex gap-4">
              <a
                href={`tel:${selectedLead.mobile}`}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white text-sm font-light transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </a>
              <a
                href={`https://wa.me/91${selectedLead.mobile}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-gray-300 hover:border-green-500 hover:text-green-400 text-sm font-light transition-all duration-200"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

/* ===================== */
/* FILTER OPTION */
/* ===================== */
function FilterOption({
  label,
  value,
  selected,
  onClick,
}: {
  label: string;
  value: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 border transition-all duration-200 ${selected
          ? "border-amber-500 bg-amber-500/10 text-amber-500"
          : "border-white/20 text-gray-300 hover:border-white/40 hover:text-white"
        }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selected ? "border-amber-500" : "border-gray-500"
            }`}
        >
          {selected && <div className="w-2 h-2 rounded-full bg-amber-500" />}
        </div>
        <span className="text-sm font-light">{label}</span>
      </div>
    </button>
  );
}

/* ===================== */
/* DETAIL ROW */
/* ===================== */
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4">
      <span className="text-sm text-gray-500 font-light w-36 flex-shrink-0">{label}</span>
      <span className="text-sm text-white font-light">{value}</span>
    </div>
  );
}