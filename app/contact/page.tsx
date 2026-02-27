"use client";

import ContactForm from "@/app/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ===================== */}
      {/* HERO BANNER */}
      {/* ===================== */}
      <div className="relative h-[75vh] overflow-hidden">
        <img
          src="https://picsum.photos/seed/contactbanner/1600/450"
          alt="Contact Banner"
          className="w-full h-full object-cover scale-105 animate-[zoomIn_20s_ease-in-out_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl">
              <div className="h-[1px] w-16 bg-amber-500 mb-8 animate-[slideRight_1s_ease-out]" />
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-tight leading-none animate-[fadeInUp_1s_ease-out]">
                Contact Us
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 font-light tracking-wide animate-[fadeInUp_1s_ease-out_0.2s_both]">
                Let's start a conversation
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== */}
      {/* CONTACT CONTENT */}
      {/* ===================== */}
      <div className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* LEFT TEXT */}
            <div className="space-y-8">
              <div>
                <div className="h-[1px] w-12 bg-amber-500 mb-6" />
                <h2 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight mb-6">
                  Get in Touch
                </h2>
                <p className="text-lg text-gray-600 font-light leading-relaxed">
                  We are always happy to connect with you. Whether you are looking to
                  buy a property, invest in plots, or explore joint venture
                  opportunities, our team is here to guide you every step of the way.
                  Reach out to us through the details below and let's start a
                  conversation.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6 pt-8">
                <ContactDetail
                  icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  }
                  title="Address"
                  value="Chennai, Tamil Nadu"
                />
                <ContactDetail
                  icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  }
                  title="Phone"
                  value="+91 98765 43210"
                />
                <ContactDetail
                  icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                  title="Email"
                  value="info@aranadevelopers.com"
                />
                <ContactDetail
                  icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  title="Working Hours"
                  value="Mon – Sat, 9:30 AM – 6:30 PM"
                />
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative h-[600px] group overflow-hidden">
              <img
                src="https://picsum.photos/seed/mapimage/500/500"
                alt="Location"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>
      </div>

      {/* ===================== */}
      {/* CONTACT FORM SECTION */}
      {/* ===================== */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-sm tracking-[0.3em] text-gray-400 uppercase mb-6">
              Send Message
            </span>
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 leading-tight">
              Drop Us a Line
            </h2>
            <p className="text-lg text-gray-600 font-light leading-relaxed">
              Fill out the form below and our team will get back to you shortly.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

/* ===================== */
/* CONTACT DETAIL COMPONENT */
/* ===================== */
function ContactDetail({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4 group">
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-gray-300 group-hover:border-amber-500 text-gray-600 group-hover:text-amber-500 transition-all duration-300">
        {icon}
      </div>
      <div>
        <p className="text-sm tracking-wide text-gray-500 font-light mb-1">
          {title}
        </p>
        <p className="text-base text-gray-900 font-light">
          {value}
        </p>
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