"use client";

import ContactForm from "@/app/components/ContactForm";


export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* ===================== */}
      {/* HERO BANNER */}
      {/* ===================== */}
      <div className="relative h-[75vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
          alt="About Banner"
          className="w-full h-full object-cover scale-105 animate-[zoomIn_20s_ease-in-out_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl">
              <div className="h-[1px] w-16 bg-amber-500 mb-8 animate-[slideRight_1s_ease-out]" />
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-tight leading-none animate-[fadeInUp_1s_ease-out]">
                About Us
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 font-light tracking-wide animate-[fadeInUp_1s_ease-out_0.2s_both]">
                Crafting exceptional spaces since our inception
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== */}
      {/* SECTION 1 – 6 CARDS */}
      {/* ===================== */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
          <InfoCard 
            number="01"
            title="Who We Are" 
            text="Arana Developers is a trusted real estate development company delivering quality residential and commercial projects."
          />
          <InfoCard 
            number="02"
            title="Our Vision" 
            text="To redefine urban living with innovation, integrity, and modern design."
          />
          <InfoCard 
            number="03"
            title="Our Mission" 
            text="Deliver high-quality projects with ethical practices and timely delivery."
          />
          <InfoCard 
            number="04"
            title="What We Do" 
            text="Luxury villas, DTCP approved plots, joint ventures, and custom construction."
          />
          <InfoCard 
            number="05"
            title="Why Choose Us" 
            text="Customer-first approach, transparency, and long-term value creation."
          />
          <InfoCard 
            number="06"
            title="Our Values" 
            text="Trust, quality, sustainability, and commitment in every project."
          />
        </div>
      </section>

      {/* ===================== */}
      {/* SECTION 2 – STORY */}
      {/* ===================== */}
      <section className="py-32 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto space-y-24">
          <div className="relative">
            <div className="absolute -left-4 top-0 w-1 h-24 bg-gradient-to-b from-amber-500 to-transparent" />
            <span className="inline-block text-sm tracking-[0.3em] text-gray-400 uppercase mb-6">
              Our Story
            </span>
            <h2 className="text-5xl md:text-6xl font-light mb-8 text-gray-900 leading-tight">
              Building Trust Through Every Project
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed font-light">
              Our journey began with a simple vision — to create spaces that people
              are proud to call home. Every project reflects our commitment to
              quality, transparency, and customer satisfaction.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-4 top-0 w-1 h-24 bg-gradient-to-b from-amber-500 to-transparent" />
            <span className="inline-block text-sm tracking-[0.3em] text-gray-400 uppercase mb-6">
              Our Approach
            </span>
            <h2 className="text-5xl md:text-6xl font-light mb-8 text-gray-900 leading-tight">
              Designed for Modern Living
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed font-light">
              From planning to execution, we focus on sustainability, smart layouts,
              and long-term value to ensure a better lifestyle for our customers.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== */}
      {/* SECTION 3 – FEATURES */}
      {/* ===================== */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)`
          }} />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block text-sm tracking-[0.3em] text-gray-400 uppercase mb-6">
              Excellence
            </span>
            <h2 className="text-5xl md:text-6xl font-light text-white leading-tight">
              What Sets Us Apart
            </h2>
          </div>

          <div className="space-y-1">
            <PremiumFeature
              number="01"
              title="Premium Locations"
              text="Strategically located projects with excellent connectivity and future growth potential."
            />
            <PremiumFeature
              number="02"
              title="Transparent Process"
              text="Clear documentation, legal compliance, and honest communication at every stage."
            />
            <PremiumFeature
              number="03"
              title="Quality Assurance"
              text="High construction standards, trusted materials, and experienced professionals."
            />
          </div>
        </div>
      </section>

      {/* ===================== */}
      {/* CONTACT SECTION */}
      {/* ===================== */}
      <section className="py-32 px-6 ">
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
/* INFO CARD */
/* ===================== */
function InfoCard({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div className="group bg-white p-12 hover:bg-gray-50 transition-all duration-500 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <span className="text-sm font-light tracking-[0.2em] text-gray-400 mb-8 block">
          {number}
        </span>
        <h3 className="text-2xl font-light mb-6 text-gray-900 tracking-tight">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed font-light">
          {text}
        </p>
      </div>

      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}

/* ===================== */
/* PREMIUM FEATURE */
/* ===================== */
function PremiumFeature({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div className="group bg-white/5 hover:bg-white/10 backdrop-blur-sm p-12 transition-all duration-500 relative overflow-hidden border-t border-white/10">
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex items-start gap-12">
        <span className="text-6xl font-light text-white/20 group-hover:text-amber-500/40 transition-colors duration-500 leading-none">
          {number}
        </span>
        
        <div className="flex-1">
          <h3 className="text-3xl font-light mb-4 text-white tracking-tight">
            {title}
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed font-light">
            {text}
          </p>
        </div>
      </div>

      <div className="absolute top-1/2 right-8 w-1 h-0 bg-gradient-to-b from-transparent via-amber-500 to-transparent opacity-0 group-hover:opacity-30 group-hover:h-1/2 transition-all duration-700 -translate-y-1/2" />
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
`;
if (typeof document !== 'undefined') {
  document.head.appendChild(style);
}