"use client";

export default function TermsPage() {
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
                Terms &amp; Conditions
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
              Please read these Terms &amp; Conditions carefully before using the
              Arana Developers website or engaging with our services. By accessing
              our website or contacting us, you agree to be bound by these terms.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-14">
            <PolicySection
              number="01"
              title="Acceptance of Terms"
              content="By accessing and using this website, you accept and agree to be bound by these Terms & Conditions and our Privacy Policy. If you do not agree to these terms, please do not use our website or services. Arana Developers reserves the right to modify these terms at any time without prior notice."
            />
            <PolicySection
              number="02"
              title="Use of Website"
              content="This website is provided for informational and inquiry purposes only. You agree to use this website solely for lawful purposes and in a manner that does not infringe on the rights of others. You must not misuse the website by introducing viruses, attempting unauthorised access, or engaging in any conduct that disrupts normal site operations."
            />
            <PolicySection
              number="03"
              title="Property Information"
              content="All property listings, pricing, availability, and other details displayed on this website are for general informational purposes only. While we strive to keep information accurate and up to date, Arana Developers does not warrant the completeness or accuracy of any property details. Final terms are subject to formal agreements and documentation."
            />
            <PolicySection
              number="04"
              title="No Guarantee of Returns"
              content="Any investment in real estate involves inherent risks. Nothing on this website constitutes financial, investment, or legal advice. Arana Developers does not guarantee returns on any property or plot investment. Prospective buyers and investors are advised to conduct their own due diligence and consult qualified advisors before making any decisions."
            />
            <PolicySection
              number="05"
              title="Intellectual Property"
              content="All content on this website, including text, graphics, logos, images, and design elements, is the intellectual property of Arana Developers unless otherwise stated. You may not reproduce, distribute, or create derivative works from any content on this site without prior written permission."
            />
            <PolicySection
              number="06"
              title="Limitation of Liability"
              content="Arana Developers shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of or inability to use this website or our services. This includes but is not limited to loss of data, loss of revenue, or any other losses resulting from reliance on information provided on this site."
            />
            <PolicySection
              number="07"
              title="Third-Party Services"
              content="We may use third-party tools, integrations, and services on this website. We are not responsible for the practices or content of any third-party services accessed through links or integrations on our site."
            />
            <PolicySection
              number="08"
              title="Governing Law"
              content="These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu."
            />
          </div>

          {/* Contact CTA */}
          <div className="mt-20 pt-12 border-t border-gray-200">
            <p className="text-gray-500 font-light text-base">
              Questions about these terms?{" "}
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