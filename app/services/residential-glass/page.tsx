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

export default function ResidentialGlassPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const pathRef = useReveal("in-view");
  const aestheticRef = useReveal("in-view");

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

      {/* ── HERO: Broad Appeal (Repair + Aesthetic) ── */}
      <div
        ref={heroRef}
        className="relative min-h-[85vh] bg-cover bg-center flex items-center justify-center pt-24"
        style={{ backgroundImage: "url('/images/residential.jpg')" }} 
      >
        <div className="absolute inset-0 bg-texasNavy/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="grain absolute inset-0 pointer-events-none z-[1]" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <p className="hero-reveal hero-d1 text-white/90 font-bold tracking-[0.3em] mb-4 text-sm md:text-base uppercase">
            Odessa & Midland Residential Glass
          </p>
          <h1 className="hero-reveal hero-d2 font-heading font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight text-shadow tracking-tight">
            RESTORE SAFETY.<br />
            <span className="text-texasRed">ELEVATE YOUR VIEW.</span>
          </h1>
          <p className="hero-reveal hero-d3 text-gray-100 text-lg md:text-xl mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            Whether you have a broken pane that needs an urgent fix, or you're ready to modernize your home with crystal-clear energy efficient glass.
          </p>

          <div className="hero-reveal hero-d4 flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="#repair"
              className="bg-texasRed text-white px-8 py-4 rounded font-bold uppercase tracking-wider hover:bg-red-800 transition shadow-lg transform hover:-translate-y-1"
            >
              Need a Repair?
            </a>
            <a
              href="#upgrade"
              className="bg-white text-texasNavy px-8 py-4 rounded font-bold uppercase tracking-wider hover:bg-gray-100 transition shadow-lg transform hover:-translate-y-1"
            >
              Want an Upgrade?
            </a>
          </div>

          {/* FINANCING BADGE */}
          <div className="hero-reveal hero-d4 mt-8 flex justify-center">
            <Link 
              href="#contact" 
              className="group flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full text-white text-sm font-bold tracking-wide hover:bg-white/10 transition-all duration-300 cursor-pointer"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
              <span>Financing Available</span>
              <span className="h-4 w-px bg-white/20 mx-1"></span>
              <span className="text-gray-300 group-hover:text-white font-normal text-xs uppercase flex items-center">
                Ask for details <i className="fas fa-arrow-right ml-2 -rotate-45 group-hover:rotate-0 transition-transform"></i>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── TRUST BAR ── */}
      <div className="bg-white border-b border-gray-200 py-6 relative z-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-6 md:gap-12 text-gray-600 text-sm font-bold uppercase tracking-widest">
          <span className="flex items-center gap-2"><i className="fas fa-bolt text-texasRed"></i> Fast Response</span>
          <span className="flex items-center gap-2"><i className="fas fa-star text-texasRed"></i> Premium Clarity</span>
          <span className="flex items-center gap-2"><i className="fas fa-home text-texasRed"></i> Any Home Age</span>
        </div>
      </div>

      <Divider top="#ffffff" bottom="#f9fafb" />

      {/* ── THE FORK IN THE ROAD (Split Path) ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-texasNavy">HOW CAN WE HELP?</h2>
            <div className="h-1 w-20 bg-texasRed mx-auto mt-4 mb-2" />
          </div>

          <div ref={pathRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            
            {/* PATH 1: REPAIR (Left) */}
            <div id="repair" className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border-t-8 border-texasRed flex flex-col items-center text-center hover:-translate-y-2 transition duration-300">
              <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-crutch text-4xl text-texasRed"></i>
              </div>
              <h3 className="font-heading font-bold text-2xl text-texasNavy mb-4">Fix Broken Glass</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Accidents happen. If you have shattered glass, a stuck sash, or a window that just won't close, we provide fast, safe repairs to secure your home.
              </p>
              <ul className="text-left w-full space-y-3 mb-8 pl-4">
                <li className="flex items-center text-sm text-gray-700"><i className="fas fa-check text-red-500 mr-3"></i> Emergency Board-up</li>
                <li className="flex items-center text-sm text-gray-700"><i className="fas fa-check text-red-500 mr-3"></i> Single &amp; Double Pane Repair</li>
                <li className="flex items-center text-sm text-gray-700"><i className="fas fa-check text-red-500 mr-3"></i> Mechanism &amp; Lock Fixes</li>
              </ul>
              <a href="#contact" className="mt-auto w-full py-3 bg-texasRed text-white font-bold rounded hover:bg-red-800 transition">
                Request Repair
              </a>
            </div>

            {/* PATH 2: UPGRADE (Right) */}
            <div id="upgrade" className="bg-texasNavy p-8 md:p-12 rounded-2xl shadow-xl border-t-8 border-blue-400 flex flex-col items-center text-center hover:-translate-y-2 transition duration-300">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-magic text-4xl text-blue-300"></i>
              </div>
              <h3 className="font-heading font-bold text-2xl text-white mb-4">Upgrade Your Look</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                You don't have to wait for a break to upgrade. Replacing old, foggy, or grid-style glass with clear, modern Low-E glass transforms your curb appeal.
              </p>
              <ul className="text-left w-full space-y-3 mb-8 pl-4">
                <li className="flex items-center text-sm text-gray-200"><i className="fas fa-check text-blue-400 mr-3"></i> Remove Ugly Grids/Mullions</li>
                <li className="flex items-center text-sm text-gray-200"><i className="fas fa-check text-blue-400 mr-3"></i> Install Energy Efficient Low-E</li>
                <li className="flex items-center text-sm text-gray-200"><i className="fas fa-check text-blue-400 mr-3"></i> Modernize Old Frames</li>
              </ul>
              <a href="#contact" className="mt-auto w-full py-3 bg-white text-texasNavy font-bold rounded hover:bg-gray-100 transition">
                Start My Upgrade
              </a>
            </div>

          </div>
        </div>
      </section>

      <Divider top="#f9fafb" bottom="#1e293b" />

      {/* ── THE AESTHETIC UPGRADE (Visual Focus) ── */}
      <section className="py-24 bg-slate-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={aestheticRef} className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Visual: Before/After Concept */}
            <div className="w-full lg:w-1/2 relative">
               {/* Back Image (Old) */}
               <div className="absolute top-0 right-0 w-[100%] h-[100%] opacity-50 grayscale transform translate-x-4 -translate-y-4 rounded-lg overflow-hidden border border-white/20">
                 <Image src="/images/residential-glass.jpg" fill alt="Old Foggy Window"/>
               </div>
               
                 {/* Front Image (New) */}
                <div className="relative h-[650px] w-[90%] rounded-lg overflow-hidden shadow-2xl border-4 border-white">
                  <Image 
                    src="/images/residential-glass.jpg"
                    alt="Modern Clear Glass Upgrade"
                    fill
                    className="object-cover"
                  />
                </div>
            </div>

            {/* Text Content */}
            <div className="w-full lg:w-1/2">
              <h4 className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-2">
                Modernize Without Construction
              </h4>
              <h2 className="font-heading font-black text-4xl md:text-5xl mb-6 leading-tight">
                NEW GLASS.<br />
                <span className="text-white">NEW HOME FEEL.</span>
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Many Odessa homes built in the 90s and 2000s have windows with internal grids (mullions) or glass that has slowly yellowed over time.
              </p>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                We can remove that dated glass and install <strong>crystal-clear, uninterrupted glass</strong> into your existing frames. It floods your home with light and instantly modernizes the exterior appeal—all without the mess of ripping out frames.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h5 className="font-bold text-xl text-white">Grid Removal</h5>
                  <p className="text-sm text-gray-400 mt-1">Get that clean, modern "open view" look.</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h5 className="font-bold text-xl text-white">Low-E Tech</h5>
                  <p className="text-sm text-gray-400 mt-1">Reject heat while keeping the view clear.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Divider top="#1e293b" bottom="#ffffff" />

      {/* ── THE REPAIR SIDE (Condensed) ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-texasNavy mb-4">COMMON REPAIRS</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We fix the problems that others won't touch. From historic single-pane putty work to modern insulated units.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Card 1 */}
             <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:border-texasRed transition group">
               <h3 className="font-bold text-xl text-texasNavy mb-2 group-hover:text-texasRed transition">Foggy Glass</h3>
               <p className="text-sm text-gray-600">Failed seals cause condensation between panes. We replace the unit, restoring clarity and insulation.</p>
             </div>
             {/* Card 2 */}
             <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:border-texasRed transition group">
               <h3 className="font-bold text-xl text-texasNavy mb-2 group-hover:text-texasRed transition">Stuck Windows</h3>
               <p className="text-sm text-gray-600">Rebalancing springs, replacing rollers on sliding windows, and fixing broken locks.</p>
             </div>
             {/* Card 3 */}
             <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:border-texasRed transition group">
               <h3 className="font-bold text-xl text-texasNavy mb-2 group-hover:text-texasRed transition">Patio Doors</h3>
               <p className="text-sm text-gray-600">Shattered sliding doors require tempered safety glass. We measure and install fast.</p>
             </div>
          </div>
        </div>
      </section>

      <Divider top="#ffffff" bottom="#0f172a" />

      {/* ── CONTACT ──────────────────────────────────────── */}
      <ContactSection selectedService="Residential Glass" />

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