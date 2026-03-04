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

export default function CommercialGlassPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const exteriorRef = useReveal("in-view");
  const interiorRef = useReveal("in-view");
  const projectRef  = useReveal("in-view");

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
        className="relative min-h-[85vh] bg-cover bg-center flex items-center justify-center pt-24"
        style={{ backgroundImage: "url('/images/store-doors.jpg')" }} 
      >
        <div className="absolute inset-0 bg-texasNavy/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="grain absolute inset-0 pointer-events-none z-[1]" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <p className="hero-reveal hero-d1 text-white/90 font-bold tracking-[0.3em] mb-4 text-sm md:text-base uppercase">
            Commercial Glazing • Odessa & Midland
          </p>
          <h1 className="hero-reveal hero-d2 font-heading font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight text-shadow tracking-tight">
            BUILD YOUR<br />
            <span className="text-texasRed">BUSINESS IMAGE.</span>
          </h1>
          <p className="hero-reveal hero-d3 text-gray-100 text-lg md:text-xl mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            From modern aluminum storefronts to interior office partitions. We install the glass that makes your business look professional.
          </p>

          <div className="hero-reveal hero-d4 flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="bg-texasRed text-white px-8 py-4 rounded font-bold uppercase tracking-wider hover:bg-red-800 transition shadow-lg transform hover:-translate-y-1"
            >
              Get a Bid
            </a>
            <a
              href="#interior"
              className="border-2 border-white text-white px-8 py-4 rounded font-bold uppercase tracking-wider hover:bg-white hover:text-texasNavy transition"
            >
              Interior Glass
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
          <span className="flex items-center gap-2"><i className="fas fa-hard-hat text-texasRed"></i> Safety Rated</span>
          <span className="flex items-center gap-2"><i className="fas fa-layer-group text-texasRed"></i> Aluminum Systems</span>
          <span className="flex items-center gap-2"><i className="fas fa-building text-texasRed"></i> ADA Compliant</span>
        </div>
      </div>

      <Divider top="#ffffff" bottom="#f9fafb" />

      {/* ── EXTERIOR STOREFRONTS ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={exteriorRef} className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Text Content */}
            <div className="w-full lg:w-1/2">
              <h4 className="text-texasNavy/60 font-bold tracking-widest uppercase text-sm mb-2">Exterior Glazing</h4>
              <h2 className="font-heading font-black text-3xl md:text-5xl text-texasNavy mb-6 leading-tight">
                STOREFRONTS &amp;<br />
                ENTRANCES.
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                Your storefront is the first thing your customers see. We fabricate and install complete aluminum and glass systems that offer thermal performance and modern curb appeal.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="bg-texasRed/10 p-2 rounded mr-4 mt-1">
                    <i className="fas fa-building text-texasRed"></i>
                  </div>
                  <div>
                    <h5 className="font-bold text-texasNavy">New Construction &amp; Remodels</h5>
                    <p className="text-sm text-gray-600">We demo old silver frames and install modern Anodized Black, Bronze, or Clear aluminum systems.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-texasRed/10 p-2 rounded mr-4 mt-1">
                    <i className="fas fa-temperature-low text-texasRed"></i>
                  </div>
                  <div>
                    <h5 className="font-bold text-texasNavy">High-Efficiency Glass</h5>
                    <p className="text-sm text-gray-600">1" Insulated Glass Units with Low-E coatings to keep your building cool in the West Texas heat.</p>
                  </div>
                </li>
              </ul>
              
              <a href="#contact" className="text-texasRed font-bold border-b-2 border-texasRed hover:text-texasNavy hover:border-texasNavy transition">
                Request a Site Visit &rarr;
              </a>
            </div>

            {/* Image Block */}
            <div className="lg:w-1/2 relative h-[500px] w-full">
               <div className="absolute top-0 right-0 w-[90%] h-[90%] rounded-lg shadow-xl overflow-hidden z-10">
                 <Image 
                   src="/images/commercial-front.jpg" 
                   alt="New Aluminum Storefront Installation"
                   fill
                   className="object-cover"
                 />
               </div>
               <div className="absolute bottom-0 left-0 w-[60%] h-[40%] rounded-lg shadow-2xl overflow-hidden z-20 border-4 border-gray-50">
                 <Image 
                   src="/images/broken-storefront.jpg" 
                   alt="Aluminum frame detail"
                   fill
                   className="object-cover"
                 />
               </div>
            </div>

          </div>
        </div>
      </section>

      <Divider top="#f9fafb" bottom="#0f172a" />

      {/* ── INTERIOR PARTITIONS (The New Focus) ── */}
      <section id="interior" className="py-24 bg-texasNavy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={interiorRef} className="flex flex-col lg:flex-row-reverse gap-16 items-center">
            
            {/* Text Content */}
            <div className="w-full lg:w-1/2">
              <h4 className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-2">Interior Solutions</h4>
              <h2 className="font-heading font-black text-3xl md:text-5xl mb-6 leading-tight">
                PARTITIONS &amp;<br />
                <span className="text-white">BARRIER GLASS.</span>
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Modernize your workspace with light. We install heavy glass partitions that create separation without sacrificing the open-concept feel.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/10 p-5 rounded border border-white/10 hover:border-blue-400 transition">
                   <h5 className="font-bold text-xl text-white mb-2">Office Dividers</h5>
                   <p className="text-sm text-gray-400">Frameless 1/2" glass walls for conference rooms and executive offices. Sleek U-channel or patch fittings.</p>
                </div>
                <div className="bg-white/10 p-5 rounded border border-white/10 hover:border-blue-400 transition">
                   <h5 className="font-bold text-xl text-white mb-2">Reception Barriers</h5>
                   <p className="text-sm text-gray-400">Custom "sneeze guards" and reception windows. Keep your staff safe and professional.</p>
                </div>
              </div>

              <a href="#contact" className="inline-block bg-white text-texasNavy font-bold px-8 py-3 rounded hover:bg-gray-200 transition">
                Get Interior Quote
              </a>
            </div>

            {/* Visual Block */}
            <div className="w-full lg:w-1/2 relative">
               <div className="relative h-[450px] w-full rounded-lg overflow-hidden shadow-2xl border border-white/20">
                 <Image
                   src="/images/office-dividers.jpg" // REPLACE: Modern glass office wall
                   alt="Frameless Glass Office Partition"
                   fill
                   className="object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-texasNavy/90 via-transparent to-transparent"></div>
                 <div className="absolute bottom-6 left-6">
                    <p className="font-bold text-white text-lg"><i className="fas fa-check-circle text-blue-400 mr-2"></i> 1/2" Tempered Safety Glass</p>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      <Divider top="#0f172a" bottom="#111827" />

      {/* ── PROJECT SPOTLIGHT ── */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-12">
            <h4 className="text-texasRed font-bold tracking-widest uppercase text-sm mb-2">Recent Project</h4>
            <h2 className="font-heading font-black text-3xl md:text-5xl text-white leading-tight mb-4">
              THEY NEEDED LIGHT.<br />
              <span className="text-gray-400">WE MADE IT HAPPEN.</span>
            </h2>
          </div>

          {/* Asymmetric Photo Grid */}
          <div
            ref={projectRef}
            className="grid grid-cols-1 md:grid-cols-5 md:grid-rows-[300px_300px] gap-3"
          >
            {/* Landscape — anchors left, spans both rows */}
            <div className="reveal-up md:col-span-3 md:row-span-2 relative rounded-lg overflow-hidden shadow-2xl group h-[300px] md:h-auto" style={{ transitionDelay: "0ms" }}>
              <Image
                src="/images/industrial3.jpg"
                alt="Finished window installation in metal industrial building"
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="bg-texasRed text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded">Finished</span>
              </div>
            </div>

            {/* Portrait top-right */}
            <div className="reveal-up md:col-span-2 relative rounded-lg overflow-hidden shadow-2xl group" style={{ height: "300px", transitionDelay: "120ms" }}>
              <Image
                src="/images/industrial1.jpg"
                alt="Industrial building exterior before window installation"
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded border border-white/20">Exterior</span>
              </div>
            </div>

            {/* Portrait bottom-right */}
            <div className="reveal-up md:col-span-2 relative rounded-lg overflow-hidden shadow-2xl group" style={{ height: "300px", transitionDelay: "240ms" }}>
              <Image
                src="/images/industrial2.jpg"
                alt="Window openings being cut and framed mid-installation"
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded border border-white/20">Installation</span>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 text-center md:text-left">
            <a href="#contact" className="text-texasRed font-bold border-b-2 border-texasRed hover:text-white hover:border-white transition text-lg">
              Start Your Commercial Project &rarr;
            </a>
          </div>

        </div>
      </section>

      <Divider top="#111827" bottom="#0f172a" />

      {/* ── CONTACT ──────────────────────────────────────── */}
      <ContactSection selectedService="Commercial Glass" />

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