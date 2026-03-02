"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import MapEmbed from "@/components/MapEmbed";

/* ── Reusable Diagonal Divider ── */
function Divider({ top, bottom }: { top: string; bottom: string }) {
  return (
    <div className="relative h-16 w-full overflow-hidden" style={{ background: top }}>
      <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        <polygon points="0,56 1440,0 1440,56" fill={bottom} />
      </svg>
    </div>
  );
}

/* ── Animation Hook ── */
function useReveal(triggerClass: string) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { e.target.classList.add(triggerClass); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [triggerClass]);
  return ref;
}

export default function AutoGlassPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const chipRef = useReveal("in-view");
  const fleetRef = useReveal("in-view");

  /* Parallax Effect */
  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        const y = window.scrollY * 0.3;
        heroRef.current.style.backgroundPositionY = `calc(50% + ${y}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────── */}
      <div
        ref={heroRef}
        className="relative h-[80vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/auto-glass.jpg')" }} // Suggestion: View from inside car looking at road
      >
        <div className="absolute inset-0 bg-texasNavy/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="grain absolute inset-0 pointer-events-none z-[1]" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <p className="hero-reveal hero-d1 text-white/90 font-bold tracking-[0.3em] mb-4 text-sm md:text-base uppercase">
            Auto Glass Repair &amp; Replacement
          </p>
          <h1 className="hero-reveal hero-d2 font-heading font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight text-shadow tracking-tight">
            CLEAR VIEW.<br />
            <span className="text-texasRed">SAFE DRIVE.</span>
          </h1>
          <p className="hero-reveal hero-d3 text-gray-100 text-lg md:text-xl mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            From rock chips to full windshield replacements. We get you back on the road with OEM-quality glass and strict safety standards.
          </p>

          <div className="hero-reveal hero-d4 flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="bg-texasRed text-white px-8 py-4 rounded font-bold uppercase tracking-wider hover:bg-red-800 transition shadow-lg transform hover:-translate-y-1"
            >
              Get a Quote
            </a>
            <a
              href="#chip"
              className="border-2 border-white text-white px-8 py-4 rounded font-bold uppercase tracking-wider hover:bg-white hover:text-texasNavy transition"
            >
              Chip Repair
            </a>
          </div>

          {/* FINANCING BADGE */}
          <div className="hero-reveal hero-d4 mt-8 flex justify-center">
            <Link 
              href="#contact" 
              className="group flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full text-white text-sm font-bold tracking-wide hover:bg-white/10 transition-all duration-300 cursor-pointer"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
              <span>Insurance Approved</span>
              <span className="h-4 w-px bg-white/20 mx-1"></span>
              <span className="text-gray-300 group-hover:text-white font-normal text-xs uppercase flex items-center">
                We handle the claim <i className="fas fa-arrow-right ml-2 -rotate-45 group-hover:rotate-0 transition-transform"></i>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── TRUST BAR ── */}
      <div className="bg-white border-b border-gray-200 py-6 relative z-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-6 md:gap-12 text-gray-600 text-sm font-bold uppercase tracking-widest">
          <span className="flex items-center gap-2"><i className="fas fa-car-crash text-texasRed"></i> All Makes &amp; Models</span>
          <span className="flex items-center gap-2"><i className="fas fa-shield-alt text-texasRed"></i> Leak-Proof Guarantee</span>
          <span className="flex items-center gap-2"><i className="fas fa-file-signature text-texasRed"></i> Insurance Accepted</span>
        </div>
      </div>

      <Divider top="#ffffff" bottom="#f9fafb" />

      {/* ── REPAIR VS REPLACE (The "Quarter Rule") ── */}
      <section id="chip" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-texasNavy mb-4">REPAIR OR REPLACE?</h2>
            <div className="h-1 w-20 bg-texasRed mx-auto mb-6" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              Not every rock chip means a new windshield. Use the <strong>Quarter Rule</strong> to see if we can save you money.
            </p>
          </div>

          <div ref={chipRef} className="flex flex-col md:flex-row gap-8 justify-center items-center">
            
            {/* OPTION A: REPAIR */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-green-500 text-center max-w-md w-full relative hover:-translate-y-2 transition duration-300">
               <div className="absolute top-4 right-4 text-green-500 font-bold opacity-20 text-6xl">
                 <i className="fas fa-coins"></i>
               </div>
               <h3 className="font-bold text-2xl text-texasNavy mb-4">Rock Chip Repair</h3>
               <div className="my-6 flex justify-center">
                 {/* Visual Representation of Quarter */}
                 <div className="w-24 h-24 rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center bg-gray-100">
                    <span className="text-xs text-gray-500 font-bold text-center">Smaller than<br/>a Quarter</span>
                 </div>
               </div>
               <p className="text-gray-600 mb-6">
                 If the damage is smaller than a quarter (approx 1 inch), we can inject resin to stop the spread and restore clarity.
               </p>
               <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold text-sm">
                 Fast (~30 Mins)
               </span>
            </div>

            {/* DIVIDER ICON */}
            <div className="text-gray-300 text-4xl font-bold">OR</div>

            {/* OPTION B: REPLACE */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-texasRed text-center max-w-md w-full relative hover:-translate-y-2 transition duration-300">
               <div className="absolute top-4 right-4 text-texasRed font-bold opacity-20 text-6xl">
                 <i className="fas fa-car"></i>
               </div>
               <h3 className="font-bold text-2xl text-texasNavy mb-4">Full Replacement</h3>
               <div className="my-6 flex justify-center">
                 {/* Visual Representation of Crack */}
                 <div className="w-24 h-24 rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center bg-gray-100 relative overflow-hidden">
                    <div className="absolute w-full h-1 bg-texasRed rotate-45"></div>
                    <span className="text-xs text-gray-500 font-bold text-center z-10 bg-gray-100 px-1">Long Crack</span>
                 </div>
               </div>
               <p className="text-gray-600 mb-6">
                 If the crack is longer than a dollar bill or in the driver's direct line of sight, safety standards require a full replacement.
               </p>
               <span className="inline-block bg-red-100 text-texasRed px-4 py-2 rounded-full font-bold text-sm">
                 OEM Quality Glass
               </span>
            </div>

          </div>
        </div>
      </section>

      <Divider top="#f9fafb" bottom="#0f172a" />

      {/* ── FLEET & WORK TRUCKS (Odessa Context) ── */}
      <section className="py-24 bg-texasNavy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={fleetRef} className="flex flex-col lg:flex-row-reverse gap-16 items-center">
            
            {/* Image Block */}
            <div className="lg:w-1/2 relative h-[400px] w-full">
               <div className="absolute inset-0 rounded-lg overflow-hidden shadow-2xl border-2 border-white/20">
                 <Image 
                   src="/images/fleet-trucks.jpg" // REPLACE: Work truck or fleet lineup
                   alt="Fleet Auto Glass Service"
                   fill
                   className="object-cover"
                 />
                 {/* Badge */}
                 <div className="absolute top-6 right-6 bg-texasRed text-white font-bold px-4 py-2 shadow-lg uppercase text-sm">
                   Priority Fleet Service
                 </div>
               </div>
            </div>

            {/* Text Content */}
            <div className="lg:w-1/2">
              <h4 className="text-gray-400 font-bold tracking-widest uppercase text-sm mb-2">
                Serving The Oilfield
              </h4>
              <h2 className="font-heading font-black text-3xl md:text-5xl mb-6 leading-tight">
                WORK TRUCKS &amp;<br />
                <span className="text-white">FLEET ACCOUNTS.</span>
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                We know that if your truck isn't running, you aren't making money. We offer priority service for commercial fleets and oilfield vehicles.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-200">
                  <i className="fas fa-check-circle text-texasRed mr-3 text-xl"></i>
                  <span><strong>Heavy Duty Glass:</strong> Flat glass for cranes, dozers, and semis.</span>
                </li>
                <li className="flex items-center text-gray-200">
                  <i className="fas fa-check-circle text-texasRed mr-3 text-xl"></i>
                  <span><strong>Volume Pricing:</strong> Ask about our fleet account discounts.</span>
                </li>
                <li className="flex items-center text-gray-200">
                  <i className="fas fa-check-circle text-texasRed mr-3 text-xl"></i>
                  <span><strong>Mobile Service:</strong> We can come to your yard.</span>
                </li>
              </ul>

              <a href="tel:4323163142" className="inline-flex items-center gap-2 bg-white text-texasNavy font-bold px-8 py-3 rounded hover:bg-gray-200 transition">
                <i className="fas fa-phone"></i> Call for Dispatch
              </a>
            </div>

          </div>
        </div>
      </section>

      <Divider top="#0f172a" bottom="#ffffff" />



      <Divider top="#ffffff" bottom="#0f172a" />

      {/* ── CONTACT ──────────────────────────────────────── */}
      <ContactSection selectedService="Auto Glass" />

      {/* ── MAP ──────────────────────────────────────────── */}
      <MapEmbed />

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="bg-black text-gray-500 py-10 text-center border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/" className="font-heading font-black text-2xl text-white mb-2 hover:text-texasRed transition block">
            LSG
          </Link>
          <p className="mb-6 text-sm">Premium Glass &amp; Shower Solutions</p>
          <p className="text-xs">&copy; 2026 Lone Star Glass and Shower. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}