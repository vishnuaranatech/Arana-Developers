"use client";

import { useEffect, useState } from "react";
import ContactForm from "@/app/components/ContactForm";

export default function EcoGrihaPage() {
  const testimonials = [
    {
      name: "Ramesh Kumar",
      text: "Eco Griha gave us a peaceful and sustainable home. Electricity bills reduced drastically!",
    },
    {
      name: "Priya S",
      text: "The natural ventilation and eco materials make the house feel fresh all the time.",
    },
    {
      name: "Arun & Family",
      text: "Best investment decision. Smart, green and future-ready home.",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* ================= HERO ================= */}
      <section className="relative h-[85vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1501183638710-841dd1904471"
          alt="Eco Griha Hero"
          className="w-full h-full object-cover scale-105 animate-[zoomIn_20s_ease-in-out_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="h-[1px] w-16 bg-amber-500 mx-auto mb-8 animate-[slideRight_1s_ease-out]" />
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-tight leading-none animate-[fadeInUp_1s_ease-out]">
              Eco Griha
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 font-light tracking-wide mb-12 animate-[fadeInUp_1s_ease-out_0.2s_both]">
              Sustainable • Smart • Future Ready Homes
            </p>
            <a
              href="#enquiry"
              className="inline-block px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-amber-500 hover:border-amber-500 transition-all duration-500 animate-[fadeInUp_1s_ease-out_0.4s_both]"
            >
              <span className="text-sm tracking-[0.2em] uppercase">Enquire Now</span>
            </a>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="h-[1px] w-12 bg-amber-500" />
              <h2 className="text-5xl md:text-6xl font-light text-gray-900 leading-tight">
                What is Eco Griha?
              </h2>
              <div className="space-y-6 text-lg text-gray-600 font-light leading-relaxed">
                <p>
                  Eco Griha is Arana Developers' sustainable living concept,
                  designed to reduce environmental impact while improving comfort.
                </p>
                <p>
                  Smart layouts, eco materials and energy-efficient systems make
                  Eco Griha homes future-proof investments.
                </p>
                <p>
                  Eco griha provides end to end  custom construction services so that you can build your dream home at the best possible price in the most eco friendly way!
                </p>
              </div>
            </div>
            <div className="relative h-[500px] group overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                alt="Eco Griha Home"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= OUR PROCESS ================= */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">

          {/* Heading — exact same style as Features/Benefits/Investment sections */}
          <div className="text-center mb-20">
            <span className="inline-block text-sm tracking-[0.3em] text-gray-400 uppercase mb-6">
              Eco Griha Process
            </span>
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 leading-tight">
              Plan. Build. Track. Move In.
            </h2>
          </div>

          {/* 3×2 grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Card 1 */}
            <ProcessCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              }
              title="Connect with Us"
              text="Share your basic details through a quick form. Our team contacts you within 20 minutes for a free technical consultation."
            />

            {/* Card 2 */}
            <ProcessCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
              title="Define Your Requirements"
              text="Discuss your plot details, budget, and timeline with our experts. We craft a clear project plan tailored to your goals."
            />

            {/* Card 3 */}
            <ProcessCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
              }
              title="Approve Designs"
              text="Review floor plans, drawings, and 3D views. Work closely with our architects until every detail is finalized."
            />

            {/* Card 4 */}
            <ProcessCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
              title="Live Progress"
              text="Track construction in real time via our app with daily photos, quality reports, and payment updates."
            />

            {/* Card 5 */}
            <ProcessCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              }
              title="Move In"
              text="Take possession of your fully completed home. Move in with confidence, backed by a 10 year warranty."
            />

            {/* Card 6 — CTA */}
            <CtaCard />
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE ================= */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block text-sm tracking-[0.3em] text-gray-400 uppercase mb-6">
              Benefits
            </span>
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 leading-tight">
              Why Choose Eco Griha?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <BenefitCard title="Lower Living Cost" text="Reduced power & water bills with smart eco systems." />
            <BenefitCard title="Healthier Homes" text="Better airflow, natural light and eco materials." />
            <BenefitCard title="Future Ready" text="Built to meet tomorrow's sustainability standards." />
            <BenefitCard title="Trusted Brand" text="Quality construction by Arana Developers." />
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section className="py-32 px-6 bg-gray-50 ">
        <div className="max-w-6xl mx-auto ">
          <div className="text-center mb-20">
            <span className="inline-block text-sm tracking-[0.3em] text-gray-400 uppercase mb-6">
              Investment
            </span>
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 leading-tight">
              Pricing & Offers
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            <PricingCard plan="ECO LITE" description="Our Basic Package" price="₹2250 / Sq.Ft" gradient="from-cyan-700 to-blue-700" />
            <PricingCard plan="ECO PLUS" description="Our Standard Package" price="₹2500 / Sq.Ft" gradient="from-rose-400 to-red-500" />
            <PricingCard plan="ECO ELITE" description="Our Most Popular Package" price="₹2750 / Sq.Ft" gradient="from-green-700 to-emerald-600" popular />
          </div>
        </div>
      </section>

      {/* ================= WARRANTY BANNER ================= */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 70px)` }} />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-6">
            <svg className="w-16 h-16 mx-auto text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-5xl md:text-6xl font-light text-white mb-4 leading-tight">Now with 10 Year Warranty!</h2>
          <p className="text-xl text-yellow-400 font-light tracking-widest uppercase">On Select Packages</p>
        </div>
      </section>

      {/* ================= DETAILED COMPARISON TABLE ================= */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block text-sm tracking-[0.3em] text-gray-400 uppercase mb-6">Detailed Comparison</span>
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 leading-tight mb-6">Package Features</h2>
            <p className="text-lg text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
              Compare our packages in detail to choose what fits your dream home.
            </p>
          </div>

          {/* 70vh fixed — only table scrolls */}
          <div className="border border-gray-200 shadow-lg" style={{ height: "100vh", overflowY: "auto" }}>
            <table className="w-full min-w-[900px] bg-white">
              <thead className="sticky top-0 z-10">
                <tr className="bg-gradient-to-r from-slate-900 to-slate-800">
                  <th className="text-left p-6 text-white font-light tracking-wide text-lg border-r border-slate-700">Features</th>
                  <th className="text-center p-6 text-white font-light tracking-wide text-lg border-r border-slate-700">Eco Lite</th>
                  <th className="text-center p-6 text-white font-light tracking-wide text-lg border-r border-slate-700">Eco Plus</th>
                  <th className="text-center p-6 text-white font-light tracking-wide text-lg">Eco Elite</th>
                </tr>
              </thead>
              <tbody>
                <TableRow category="Bank Loan Assistance" lite="Yes" plus="Yes" elite="Yes" isCategory />
                <TableRow category="Building Permit" lite="No" plus="Yes" elite="Yes" />
                <TableRow category="Drawing" isHeader />
                <TableRow category="2D Floor Plan" lite="Yes" plus="Yes" elite="Yes" />
                <TableRow category="3D Elevation" lite="Yes" plus="Yes" elite="Yes" />
                <TableRow category="Structural Design" lite="No" plus="Yes" elite="Yes" />
                <TableRow category="Furniture Layout" lite="Yes" plus="Yes" elite="Yes" />
                <TableRow category="Hi Res Renders" lite="No" plus="Yes" elite="Yes" />
                <TableRow category="3D Walkthrough" lite="No" plus="No" elite="Yes" />
                <TableRow category="Structure" isHeader />
                <TableRow category="Steel" lite="ISI Standard TMT Bars" plus="Branded TMT Bars" elite="Premium TMT Bars" />
                <TableRow category="Blocks" lite="Concrete Blocks" plus="Premium Blocks" elite="Premium blocks of Clients Choice" />
                <TableRow category="Cement" lite="ISI Brand" plus="JSW Sustainable" elite="JSW Premium or Equivalent" />
                <TableRow category="Sand" lite="M Sand" plus="M Sand" elite="M Sand" />
                <TableRow category="Ceiling Height" lite="10 Feet from Floor Level" plus="10 Feet from Floor Level" elite="10 Feet from Floor Level" />
                <TableRow category="Kitchen" isHeader />
                <TableRow category="Wall Tiles" lite="Ceramic" plus="Ceramic" elite="Ceramic" />
                <TableRow category="Kitchen Sink" lite="Single Dryboard Sink Upto Rs.3500" plus="Stainless Steel Single Sink worth Rs.5000" elite="Premium Quartz Sink worth Rs.6000" />
                <TableRow category="Kitchen Faucets" lite="Faucets Worth unto Rs.1500" plus="Faucets worth Upto Rs.1800" elite="Faucets worth Rs.2100" />
                <TableRow category="Other Faucets" lite="ISI Standard" plus="Hindware or Parryware" elite="Jaguar" />
                <TableRow category="Granite Top" lite="18 MM" plus="18 MM" elite="30MM" />
                <TableRow category="Doors & Windows" isHeader />
                <TableRow category="Main Door" lite="Flush Door With Mahagony wood frame, including fixtures" plus="Flush Door With Sal wood frame, including fixtures" elite="Teak door with teak wood frame including fixtures" />
                <TableRow category="Other Doors" lite="Flush Doors including fixtures. Door Frames of Mahagony Wood" plus="Flush Doors including fixtures. Door Frames of Sal Wood" elite="Flush Door including fixtures. Door Frames of Sal Wood" />
                <TableRow category="Windows" lite="Aluminium Windows with glass shutters and mesh (2 track)" plus="Aluminium Windows with glass shutters and mesh (2 track)" elite="Sal wood frames and shutters/UPVC windows with glass shutters and mesh (3track with 1 mosquito mesh)" />
                <TableRow category="Flooring & Wall Tiles" isHeader />
                <TableRow category="Bathroom" lite="Bathroom Ceramic Wall Tiles ISI Standard" plus="Bathroom Ceramic Wall Tiles branded" elite="Bathroom Ceramic Wall Tiles ISI Premium" />
                <TableRow category="Living & Dining" lite="ISI Standard" plus="Branded" elite="Premium Tiles" />
                <TableRow category="Rooms & Kitchen" lite="ISI Standard" plus="Branded Tiles" elite="Premium Tiles" />
                <TableRow category="Balcony & Open Areas" lite="ISI Standard Anti Skid" plus="Branded Anti Skid" elite="Premium Anti Skid" />
                <TableRow category="Staircase" lite="Granite ISI" plus="Granite ISI" elite="Premium Granite" />
                <TableRow category="Parking" lite="Terracota Tiles" plus="Branded Anti Skid" elite="Premium Anti Skid" />
                <TableRow category="Other Specifications" isHeader />
                <TableRow category="Painting" lite="ISI Standard" plus="Branded" elite="Premium Finish and Materials" />
                <TableRow category="Electrical" lite="ISI Standard fireproof wires and Standard sockets and Switches" plus="Branded Fireproof Wires and Socket and Switches" elite="Premium top of the range" />
                <TableRow category="Sanitary Fittings" lite="Standard ISI" plus="Hindware or Parryware" elite="Jaguar and above" />
                <TableRow category="Pipes" lite="Standard ISI" plus="Branded" elite="Premium" />
                <TableRow category="Others" isHeader />
                <TableRow category="Sump" lite="4k Ltrs" plus="6k Ltrs" elite="7k Ltrs" />
                <TableRow category="Overhead Tank" lite="1000 Ltrs" plus="1000 Ltrs" elite="1000 Ltrs" />
                <TableRow category="Waterproofing" lite="Yes" plus="Yes" elite="Yes" />
                <TableRow category="Ups Provision" lite="Yes" plus="Yes" elite="Yes" />
                <TableRow category="Warranty" lite="5 Years" plus="7 years" elite="10 years" highlight />
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-6 bg-amber-50 border-l-4 border-amber-500">
            <p className="text-sm text-gray-700 font-light leading-relaxed">
              <span className="font-normal text-amber-700">Note:</span> All prices are inclusive of GST.
              Final specifications may vary based on client preferences and availability.
              Contact us for detailed quotations and customizations.
            </p>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)` }} />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block text-sm tracking-[0.3em] text-gray-400 uppercase mb-4">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-light text-white leading-tight">What Our Customers Say</h2>
          </div>
          <div className="relative h-[280px] flex items-center">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-all duration-1000 ${i === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 text-center">
                  <div className="mb-6">
                    <svg className="w-8 h-8 mx-auto text-amber-500 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                    </svg>
                  </div>
                  <p className="text-lg md:text-xl font-light text-white leading-relaxed mb-6">"{testimonial.text}"</p>
                  <div className="h-[1px] w-12 bg-amber-500 mx-auto mb-4" />
                  <p className="text-base text-gray-300 font-light">{testimonial.name}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1 transition-all duration-500 ${i === index ? "w-12 bg-amber-500" : "w-8 bg-white/20 hover:bg-white/40"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= FORM ================= */}
      <section id="enquiry" className="py-32 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-sm tracking-[0.3em] text-gray-400 uppercase mb-6">Get In Touch</span>
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 leading-tight">Start Your Eco Journey</h2>
            <p className="text-lg text-gray-600 font-light leading-relaxed">Connect with us to learn more about Eco Griha homes.</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

/* ================= PROCESS CARD ================= */
function ProcessCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="group bg-gray-100 hover:bg-white rounded-2xl p-7 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 cursor-pointer border border-transparent hover:border-amber-200">
      <div className="text-gray-900 group-hover:text-amber-500 mb-5 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-gray-900 group-hover:text-amber-600 font-bold text-xl mb-4 transition-colors duration-300 leading-snug">
        {title}
      </h3>
      <div className="h-[2px] w-0 group-hover:w-10 bg-amber-400 mb-4 transition-all duration-500" />
      <p className="text-gray-500 group-hover:text-gray-700 text-sm leading-relaxed transition-colors duration-300">
        {text}
      </p>
    </div>
  );
}

/* ================= CTA CARD ================= */
function CtaCard() {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-[#1a2e5a] p-7 flex flex-col justify-between min-h-[260px] group cursor-pointer">
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-amber-500/10 group-hover:bg-amber-500/20 transition-all duration-700" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5 group-hover:bg-white/10 transition-all duration-700" />
      <div
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`, backgroundSize: "20px 20px" }}
      />
      <div className="relative z-10">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/20 mb-5 group-hover:bg-amber-500/30 transition-colors duration-300">
          <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a9 9 0 019-9 9 9 0 01-9 9zm0 0a9 9 0 009 9" />
          </svg>
        </div>
        <h3 className="text-white font-bold text-xl leading-snug mb-2">
          Talk to our<br />Construction Advisor
        </h3>
        <p className="text-blue-200/70 text-sm leading-relaxed">
          Get a free consultation and personalised package recommendation from our experts.
        </p>
      </div>
      <div className="relative z-10 mt-6">
        <a
          href="#enquiry"
          className="inline-block w-full text-center bg-amber-500 hover:bg-amber-400 text-white font-semibold text-sm py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30 tracking-wide"
        >
          Talk to an Expert →
        </a>
      </div>
    </div>
  );
}

/* ================= BENEFIT CARD ================= */
function BenefitCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="group bg-white p-10 hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-amber-200">
      <div className="h-[1px] w-12 bg-amber-500 mb-6 transform origin-left transition-all duration-500 group-hover:w-24" />
      <h3 className="text-2xl font-light mb-4 text-gray-900 group-hover:text-amber-600 transition-colors">{title}</h3>
      <p className="text-gray-600 leading-relaxed font-light">{text}</p>
    </div>
  );
}

/* ================= PRICING CARD ================= */
function PricingCard({ plan, description, price, gradient, popular }: {
  plan: string; description: string; price: string; gradient: string; popular?: boolean;
}) {
  return (
    <div className={`relative p-10 text-white text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${popular ? "ring-2 ring-amber-500 ring-offset-4" : ""}`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-4 py-1 text-xs tracking-wider uppercase">Popular</div>
      )}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
      <div className="relative z-10">
        <h3 className="text-xl tracking-[0.2em] font-light mb-3">{plan}</h3>
        <p className="text-sm opacity-90 mb-8 font-light">{description}</p>
        <div className="h-[1px] w-16 bg-white/30 mx-auto mb-8" />
        <div className="text-3xl font-light">{price}</div>
      </div>
    </div>
  );
}

/* ================= TABLE ROW ================= */
function TableRow({ category, lite, plus, elite, isHeader = false, isCategory = false, highlight = false }: {
  category: string; lite?: string; plus?: string; elite?: string;
  isHeader?: boolean; isCategory?: boolean; highlight?: boolean;
}) {
  if (isHeader) {
    return (
      <tr className="bg-gray-100">
        <td colSpan={4} className="p-4 text-left font-normal text-gray-900 text-base tracking-wide">{category}</td>
      </tr>
    );
  }
  return (
    <tr className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${highlight ? "bg-amber-50" : ""}`}>
      <td className="p-4 text-left text-gray-700 font-light border-r border-gray-200">{category}</td>
      <td className={`p-4 text-center text-gray-600 font-light border-r border-gray-200 ${lite === "No" ? "text-gray-400" : ""} ${highlight ? "font-normal text-amber-700" : ""}`}>{lite}</td>
      <td className={`p-4 text-center text-gray-600 font-light border-r border-gray-200 ${plus === "No" ? "text-gray-400" : ""} ${highlight ? "font-normal text-amber-700" : ""}`}>{plus}</td>
      <td className={`p-4 text-center text-gray-600 font-light ${elite === "No" ? "text-gray-400" : ""} ${highlight ? "font-normal text-amber-700" : ""}`}>{elite}</td>
    </tr>
  );
}

/* ===================== ANIMATIONS ===================== */
const style = document.createElement("style");
style.textContent = `
  @keyframes zoomIn {
    0%, 100% { transform: scale(1.05); }
    50% { transform: scale(1.1); }
  }
  @keyframes slideRight {
    from { width: 0; opacity: 0; }
    to { width: 4rem; opacity: 1; }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
if (typeof document !== "undefined") {
  document.head.appendChild(style);
}
