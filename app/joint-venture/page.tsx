"use client";

import ContactForm from "@/app/components/ContactForm";
import { useState, useEffect } from "react";

/* ===================== */
/* TESTIMONIALS DATA */
/* ===================== */
const testimonials = [
  {
    initial: "S",
    name: "Suresh Babu",
    location: "JV Partner — Sholinganallur",
    quote:
      "Partnering with Arana Developers was the best decision for my land. Complete transparency, zero investment from my side, and excellent returns. Truly a partnership built on trust.",
  },
  {
    initial: "R",
    name: "Ramesh Krishnan",
    location: "JV Partner — Perumbakkam",
    quote:
      "From approval to handover, everything was handled professionally. I didn't have to worry about a single thing. My land value doubled and I received my units on time.",
  },
  {
    initial: "M",
    name: "Meena Sundaram",
    location: "JV Partner — Sholinganallur",
    quote:
      "I was hesitant at first, but Arana's team walked me through every step with full documentation. The process was smooth, legal, and completely transparent. Highly recommend.",
  },
];

export default function JointVenture() {
  return (
    <div className="min-h-screen bg-[#fafaf8]">

      {/* ===================== */}
      {/* HERO BANNER */}
      {/* ===================== */}
      <div className="relative h-[90vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80"
          alt="Joint Venture Banner"
          className="w-full h-full object-cover scale-110 animate-[slowZoom_20s_ease-in-out_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
        <div className="absolute left-16 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-amber-500/40 to-transparent hidden lg:block" />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-16 w-full">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-8 h-[1px] bg-amber-500" />
                <span className="text-amber-400 text-xs tracking-[0.4em] uppercase font-medium">
                  Partnership Opportunity
                </span>
              </div>
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-extralight text-white mb-8 tracking-tighter leading-none">
                Joint<br />
                <span className="italic text-amber-400">Venture</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide max-w-xl leading-relaxed">
                Unlock the true potential of your land with Chennai's trusted developers
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
          <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent animate-[scrollPulse_2s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* ===================== */}
      {/* INTRO SECTION */}
      {/* ===================== */}
      <div className="py-32 px-6 lg:px-16 bg-[#fafaf8]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div className="lg:sticky lg:top-32">
              <span className="inline-block text-xs tracking-[0.4em] text-amber-600 uppercase mb-6">
                Opportunity
              </span>
              <h2 className="text-5xl md:text-6xl font-extralight text-gray-900 leading-tight mb-6 tracking-tight">
                Are You a<br />
                <span className="italic text-amber-600">Land Owner</span><br />
                in Chennai?
              </h2>
              <div className="h-[1px] w-16 bg-amber-500 mb-8" />
              <div className="bg-gray-100 border-l-2 border-amber-500 p-8">
                <p className="text-4xl font-extralight text-gray-300 leading-none mb-2">"</p>
                <p className="text-lg text-gray-600 font-light leading-relaxed italic">
                  Your land. Our expertise. Together, something extraordinary.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {[
                "We partner with landowners across Chennai to develop high-quality residential and commercial projects through transparent joint venture models. Our approach ensures maximum value for your land while minimizing risk and involvement from your side.",
                "From planning approvals to construction and final delivery, our expert team manages the entire development process. We focus on legal clarity, timely execution, and quality construction to ensure long-term returns.",
                "With years of experience in real estate development, we understand the local market dynamics and customer expectations. Our joint venture projects are designed to enhance land value while creating sustainable communities.",
                "If you own land and are looking for a trusted developer, we invite you to partner with us and grow together.",
              ].map((para, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-[1px] bg-gradient-to-b from-amber-400 to-transparent flex-shrink-0 mt-2" />
                  <p className="text-lg text-gray-500 font-light leading-relaxed group-hover:text-gray-700 transition-colors duration-500">
                    {para}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===================== */}
      {/* STATS STRIP */}
      {/* ===================== */}
      <div className="border-y border-gray-200 py-12 px-6 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { num: "15+", label: "Years Experience" },
            { num: "50+", label: "Projects Completed" },
            { num: "100%", label: "Legal Clarity" },
            { num: "0₹", label: "Investment From You" },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-4xl md:text-5xl font-extralight text-amber-500 mb-2 group-hover:scale-110 transition-transform duration-300 inline-block">
                {stat.num}
              </div>
              <p className="text-xs tracking-[0.2em] text-gray-400 uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===================== */}
      {/* BENEFITS — dark */}
      {/* ===================== */}
      <section className="py-32 px-6 lg:px-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)` }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-20">
            <span className="inline-block text-xs tracking-[0.4em] text-amber-400 uppercase mb-6">
              Why Partner With Us
            </span>
            <h2 className="text-5xl md:text-6xl font-extralight text-white leading-tight tracking-tight">
              Our Approach
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
            {[
              { number: "01", title: "Zero Investment Required", text: "You don't need to invest capital. We handle all development costs while you retain ownership rights.", icon: "◈" },
              { number: "02", title: "Complete Transparency", text: "Clear documentation, legal compliance, and honest communication at every stage of development.", icon: "◉" },
              { number: "03", title: "Professional Management", text: "Experienced team managing approvals, construction, and delivery with a proven track record.", icon: "◐" },
              { number: "04", title: "Maximum Returns", text: "Strategic planning and quality execution designed to maximize your land's value and returns.", icon: "◑" },
            ].map((b) => (
              <BenefitCard key={b.number} {...b} />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== */}
      {/* PROCESS — off-white */}
      {/* ===================== */}
      <section className="py-32 px-6 lg:px-16 bg-[#fafaf8] border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block text-xs tracking-[0.4em] text-amber-600 uppercase mb-6">
              How It Works
            </span>
            <h2 className="text-5xl md:text-6xl font-extralight text-gray-900 leading-tight tracking-tight">
              Simple Process
            </h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-12 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Initial Meeting", desc: "We meet to understand your land and goals" },
                { step: "02", title: "Site Assessment", desc: "Our team evaluates the land and development potential" },
                { step: "03", title: "Agreement", desc: "Clear legal documentation and partnership terms" },
                { step: "04", title: "Development", desc: "We build, deliver, and you receive your share" },
              ].map((s) => (
                <div key={s.step} className="relative text-center group">
                  <div className="w-24 h-24 mx-auto mb-6 bg-white border border-gray-200 group-hover:border-amber-400 flex items-center justify-center transition-all duration-500 relative z-10 shadow-sm">
                    <span className="text-3xl font-extralight text-amber-400/60 group-hover:text-amber-500 transition-colors duration-500">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="text-base font-light text-gray-800 mb-2 tracking-wide">{s.title}</h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== */}
      {/* TESTIMONIAL — auto rotating */}
      {/* ===================== */}
      <TestimonialSection />

      {/* ===================== */}
      {/* FAQ — smaller */}
      {/* ===================== */}
      <section className="py-20 px-6 lg:px-16 bg-[#fafaf8] border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-xs tracking-[0.4em] text-amber-600 uppercase mb-4">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-extralight text-gray-900 leading-tight tracking-tight">
              Common Questions
            </h2>
          </div>
          <div className="space-y-px">
            {[
              { q: "Do I need to invest any money to enter a joint venture?", a: "No. We handle 100% of the development costs including approvals, construction, and marketing. Your contribution is the land itself." },
              { q: "What percentage of the project do I receive?", a: "The ratio depends on the land value, location, and project size. Typically landowners receive between 40–60% of the developed units or equivalent value. We discuss this transparently during our initial meeting." },
              { q: "How long does the entire process take?", a: "From agreement to project completion, timelines typically range from 18 to 36 months depending on the project scale and approval process." },
              { q: "Is the JV agreement legally binding and secure?", a: "Yes. All agreements are drafted with clear legal documentation, registered where applicable, and we ensure complete legal compliance at every stage to protect both parties." },
              { q: "What type of land is eligible for joint venture?", a: "We consider residential and semi-commercial land across Chennai and surrounding areas. DTCP, CMDA approved or approvable lands are preferred. Reach out and our team will assess your land." },
            ].map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== */}
      {/* ENQUIRY FORM — plain white */}
      {/* ===================== */}
      <section className="py-32 px-6 lg:px-16 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 text-center">
            <span className="inline-block text-xs tracking-[0.4em] text-amber-600 uppercase mb-6">
              Get Started
            </span>
            <h2 className="text-5xl md:text-6xl font-extralight text-gray-900 mb-6 leading-tight tracking-tight">
              Joint Venture<br />
              <span className="italic text-amber-500">Enquiry</span>
            </h2>
            <p className="text-lg text-gray-500 font-light leading-relaxed max-w-xl mx-auto">
              Share your details and we'll connect with you to discuss the partnership opportunity.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      <style>{`
        @keyframes slowZoom {
          0% { transform: scale(1.1); }
          100% { transform: scale(1.2); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ===================== */
/* TESTIMONIAL SECTION — auto rotate */
/* ===================== */
function TestimonialSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-6 lg:px-16 bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block text-xs tracking-[0.4em] text-amber-600 uppercase mb-4">
            Partner Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-extralight text-gray-900 tracking-tight">
            What Our Partners Say
          </h2>
        </div>

        {/* Slider */}
        <div className="relative h-[160px] md:h-[120px]">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-all duration-700 ${
                i === active
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4 pointer-events-none"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6 border-l-2 border-amber-500 pl-6">
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="w-10 h-10 bg-amber-100 flex items-center justify-center text-amber-600 text-sm font-light">
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-gray-800 font-light text-sm tracking-wide">{t.name}</p>
                    <p className="text-xs text-gray-400 tracking-[0.1em] uppercase mt-0.5">{t.location}</p>
                  </div>
                </div>
                <div className="hidden md:block w-[1px] h-12 bg-gray-200 flex-shrink-0" />
                <p className="text-base text-gray-500 font-light leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1 transition-all duration-500 ${
                i === active ? "w-10 bg-amber-500" : "w-6 bg-gray-200 hover:bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== */
/* BENEFIT CARD */
/* ===================== */
function BenefitCard({ number, title, text, icon }: { number: string; title: string; text: string; icon: string }) {
  return (
    <div className="group bg-slate-900 hover:bg-white/[0.04] p-12 transition-all duration-500 relative overflow-hidden cursor-default">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="flex items-start gap-8">
        <span className="text-6xl font-extralight text-white/10 group-hover:text-amber-500/20 transition-colors duration-500 leading-none flex-shrink-0 select-none">
          {number}
        </span>
        <div className="flex-1 pt-2">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-amber-500/60 text-xl group-hover:text-amber-400 transition-colors duration-300">{icon}</span>
            <h3 className="text-2xl font-light text-white tracking-tight group-hover:text-amber-50 transition-colors duration-300">{title}</h3>
          </div>
          <p className="text-gray-500 text-base leading-relaxed font-light group-hover:text-gray-400 transition-colors duration-300">{text}</p>
        </div>
      </div>
    </div>
  );
}

/* ===================== */
/* FAQ ITEM */
/* ===================== */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 bg-white group">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-300"
      >
        <span className="text-base font-light text-gray-700 pr-6 group-hover:text-gray-900 transition-colors duration-300">
          {question}
        </span>
        <span className={`flex-shrink-0 w-7 h-7 flex items-center justify-center border border-gray-200 text-amber-500 text-sm transition-all duration-300 ${open ? "bg-amber-500 text-white border-amber-500 rotate-45" : ""}`}>
          +
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-gray-100">
          <p className="text-gray-500 text-sm font-light leading-relaxed pt-4">{answer}</p>
        </div>
      )}
    </div>
  );
}