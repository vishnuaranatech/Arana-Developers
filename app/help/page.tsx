"use client";

import { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "How do I enquire about a property or plot?",
    answer:
      "You can enquire about any property or plot by visiting our Contact page and filling out the contact form. Alternatively, you can call us directly at +91 98765 43210 or email us at info@aranadevelopers.com. Our team will get back to you within 24 hours.",
  },
  {
    id: 2,
    question: "What types of properties does Arana Developers offer?",
    answer:
      "We offer a wide range of real estate solutions including residential villas, gated community plots, commercial spaces, and joint venture opportunities. Each project is developed with quality construction and clear legal documentation.",
  },
  {
    id: 3,
    question: "Are the plots DTCP / RERA approved?",
    answer:
      "Yes, all our plots and properties come with appropriate government approvals including DTCP layout approval where applicable. For project-specific approval details, please contact our team or visit the individual project page.",
  },
  {
    id: 4,
    question: "Do you offer home loan assistance?",
    answer:
      "Yes, we work with leading banks and financial institutions to help our clients secure home loans. Our team can guide you through the loan application process and connect you with trusted lending partners.",
  },
  {
    id: 5,
    question: "What documents are required to book a property?",
    answer:
      "Typically, you will need a valid government-issued ID (Aadhaar, PAN), proof of address, and an initial booking amount. Our sales team will provide a complete documentation checklist based on the specific property you choose.",
  },
  {
    id: 6,
    question: "Can I visit the project site before purchasing?",
    answer:
      "Absolutely. We encourage all prospective buyers to visit the site in person. You can schedule a site visit by contacting us via phone or email and our team will arrange a convenient time for you.",
  },
  {
    id: 7,
    question: "What are the payment plan options?",
    answer:
      "We offer flexible payment plans including full payment options as well as construction-linked payment plans. The specific plans vary by project. Please reach out to our team for detailed payment structure information.",
  },
  {
    id: 8,
    question: "How do I track the progress of my property?",
    answer:
      "Once you have booked a property, our team will provide regular project updates via email and WhatsApp. You can also reach out to your dedicated relationship manager at any time for the latest status.",
  },
];

export default function HelpPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ===================== */}
      {/* HERO BANNER */}
      {/* ===================== */}
      <div className="relative h-[45vh] overflow-hidden bg-slate-900">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(245,158,11,0.3) 40px, rgba(245,158,11,0.3) 41px)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900/60" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl">
              <div className="h-[1px] w-16 bg-amber-500 mb-8" />
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-4 tracking-tight leading-none">
                Help Centre
              </h1>
              <p className="text-lg text-gray-300 font-light tracking-wide">
                Frequently asked questions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== */}
      {/* INTRO */}
      {/* ===================== */}
      <div className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <div className="h-[1px] w-12 bg-amber-500 mb-6" />
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 leading-tight">
              How can we help you?
            </h2>
            <p className="text-lg text-gray-600 font-light leading-relaxed max-w-2xl">
              Browse through our frequently asked questions below. Can't find
              what you're looking for? Reach out to us directly — we're always
              happy to help.
            </p>
          </div>

          {/* ===================== */}
          {/* FAQ ACCORDION */}
          {/* ===================== */}
          <div className="space-y-0 divide-y divide-gray-200 border-t border-gray-200">
            {faqs.map((faq) => (
              <div key={faq.id} className="group">
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between py-7 text-left gap-6 cursor-pointer"
                >
                  <span className="flex items-center gap-6">
                    <span className="text-sm text-amber-500/60 font-light group-hover:text-amber-500 transition-colors duration-300 tabular-nums w-6 flex-shrink-0">
                      {String(faq.id).padStart(2, "0")}
                    </span>
                    <span className="text-base md:text-lg font-light text-gray-800 group-hover:text-gray-900 transition-colors duration-200">
                      {faq.question}
                    </span>
                  </span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 border border-gray-300 group-hover:border-amber-500 flex items-center justify-center transition-all duration-300 ${
                      openId === faq.id
                        ? "border-amber-500 bg-amber-500"
                        : "bg-transparent"
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 transition-all duration-300 ${
                        openId === faq.id ? "rotate-45 text-white" : "text-gray-500 group-hover:text-amber-500"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openId === faq.id ? "max-h-64 pb-7" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-600 font-light leading-relaxed text-base pl-12">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ===================== */}
          {/* CONTACT CTA */}
          {/* ===================== */}
          <div className="mt-20 bg-slate-900 p-10 md:p-14">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <div className="h-[1px] w-10 bg-amber-500 mb-5" />
                <h3 className="text-2xl md:text-3xl font-light text-white mb-3">
                  Still have questions?
                </h3>
                <p className="text-gray-400 font-light">
                  Our team is available Mon – Sat, 9:30 AM – 6:30 PM
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                <a
                  href="tel:+919876543210"
                  className="px-8 py-3 border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-slate-900 font-light tracking-wider text-sm transition-all duration-300"
                >
                  Call Us
                </a>
                <a
                  href="/contact"
                  className="px-8 py-3 bg-amber-500 text-slate-900 hover:bg-amber-400 font-light tracking-wider text-sm transition-all duration-300"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}