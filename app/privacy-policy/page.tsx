"use client";

export default function PrivacyPolicyPage() {
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
                Privacy Policy
              </h1>
              <p className="text-lg text-gray-300 font-light tracking-wide">
                Last updated: January 2025
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== */}
      {/* CONTENT */}
      {/* ===================== */}
      <div className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Intro */}
          <div className="mb-16">
            <div className="h-[1px] w-12 bg-amber-500 mb-6" />
            <p className="text-lg text-gray-600 font-light leading-relaxed">
              At Arana Developers, we are committed to protecting your personal
              information and your right to privacy. This Privacy Policy explains
              how we collect, use, and safeguard your information when you visit
              our website or engage with our services.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-14">
            <PolicySection
              number="01"
              title="Information We Collect"
              content="We collect information that you voluntarily provide to us when you fill out contact forms, inquire about properties, or communicate with us directly. This may include your name, email address, phone number, and any other details you choose to share. We may also collect non-personal information such as browser type, device information, and pages visited to improve our website experience."
            />
            <PolicySection
              number="02"
              title="How We Use Your Information"
              content="The information we collect is used solely to respond to your inquiries, provide property-related information, process joint venture or investment queries, and improve our services. We do not sell, trade, or rent your personal information to third parties. Your data helps us deliver a more personalised experience tailored to your real estate needs."
            />
            <PolicySection
              number="03"
              title="Data Security"
              content="We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. While we strive to use commercially acceptable means to protect your data, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security."
            />
            <PolicySection
              number="04"
              title="Cookies & Tracking"
              content="Our website may use cookies to enhance your browsing experience. Cookies are small files stored on your device that help us understand how you interact with our site. You may choose to disable cookies through your browser settings; however, doing so may limit certain features of our website."
            />
            <PolicySection
              number="05"
              title="Third-Party Links"
              content="Our website may contain links to external websites not operated by Arana Developers. We have no control over the content or privacy practices of those sites and encourage you to review their privacy policies independently."
            />
            <PolicySection
              number="06"
              title="Your Rights"
              content="You have the right to request access to the personal information we hold about you, request corrections or deletions, and opt out of any marketing communications. To exercise these rights, please contact us at info@aranadevelopers.com."
            />
            <PolicySection
              number="07"
              title="Changes to This Policy"
              content="We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with a revised date. We encourage you to review this policy periodically to stay informed about how we protect your information."
            />
          </div>

          {/* Contact CTA */}
          <div className="mt-20 pt-12 border-t border-gray-200">
            <p className="text-gray-500 font-light text-base">
              Questions about this policy?{" "}
              <a
                href="/contact"
                className="text-amber-600 hover:text-amber-700 transition-colors duration-200 underline underline-offset-4"
              >
                Contact us
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== */
/* POLICY SECTION COMPONENT */
/* ===================== */
function PolicySection({
  number,
  title,
  content,
}: {
  number: string;
  title: string;
  content: string;
}) {
  return (
    <div className="group grid grid-cols-1 md:grid-cols-[80px_1fr] gap-4 md:gap-10 items-start">
      <span className="text-3xl font-light text-amber-500/40 group-hover:text-amber-500/70 transition-colors duration-300 tracking-tight">
        {number}
      </span>
      <div>
        <h2 className="text-xl font-normal text-gray-900 mb-4 tracking-wide">
          {title}
        </h2>
        <p className="text-gray-600 font-light leading-relaxed text-base">
          {content}
        </p>
      </div>
    </div>
  );
}