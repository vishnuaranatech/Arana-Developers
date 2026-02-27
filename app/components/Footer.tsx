import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* ===================== */}
          {/* LEFT – BRAND */}
          {/* ===================== */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3 group">
              <div className="h-[1px] w-12 bg-amber-500 group-hover:w-16 transition-all duration-300" />
              <h2 className="text-2xl font-light tracking-tight">
                Arana Developers
              </h2>
            </div>
            <p className="text-gray-400 leading-relaxed font-light text-base">
              Building trusted spaces and value-driven real estate developments
              across Chennai.
            </p>
          </div>

          {/* ===================== */}
          {/* RIGHT – LINKS */}
          {/* ===================== */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-12">
            {/* SOCIAL */}
            <div className="space-y-6">
              <h4 className="text-sm tracking-[0.2em] uppercase text-gray-500 font-light">
                Connect
              </h4>
              <ul className="space-y-3">
                <FooterLink href="https://www.instagram.com/aranadevelopers/?hl=en" external>Instagram</FooterLink>
                <FooterLink href="#" external>WhatsApp</FooterLink>
                <FooterLink href="https://www.facebook.com/aranadevelopers/" external>Facebook</FooterLink>
                {/* <FooterLink href="#" external>LinkedIn</FooterLink> */}
              </ul>
            </div>

            {/* LEGAL */}
            <div className="space-y-6">
              <h4 className="text-sm tracking-[0.2em] uppercase text-gray-500 font-light">
                Legal
              </h4>
              <ul className="space-y-3">
                <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
                <FooterLink href="/terms">Terms &amp; Conditions</FooterLink>
                <FooterLink href="/help">Help</FooterLink>
              </ul>
            </div>
          </div>
        </div>

        {/* ===================== */}
        {/* BOTTOM */}
        {/* ===================== */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-center text-sm text-gray-500 font-light tracking-wide">
            © {new Date().getFullYear()} Arana Developers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ===================== */
/* FOOTER LINK COMPONENT */
/* ===================== */
function FooterLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  return (
    <li>
      <Link
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group relative inline-block text-gray-400 hover:text-amber-500 font-light transition-colors duration-300"
      >
        <span className="relative">
          {children}
          <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-amber-500 group-hover:w-full transition-all duration-300" />
        </span>
      </Link>
    </li>
  );
}