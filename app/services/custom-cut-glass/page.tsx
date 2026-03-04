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

/* ── Data: Residential Options ── */
const flatGlassServices = [
  {
    title: "Tabletops & Desk Glass",
    desc: "Protect your wood furniture. We cut 1/4” or 3/8” glass to fit any shape—circles, ovals, or irregular dining tables.",
  },
  {
    title: "Glass Shelving",
    desc: "Replace wood shelves with heavy glass to let light flow through your cabinets. We use tempered glass for strength.",
  },
  {
    title: "Fireplace Glass",
    desc: "We stock high-temperature NeoCeram ceramic glass for wood stoves and fireplace inserts. Heat resistant up to 1400°F.",
  },
  {
    title: "Safety Glass",
    desc: "Laminated and tempered glass cut to size for DIY projects, picture frames, or custom enclosures.",
  },
];

/* ── Data: Edges ── */
const edges = [
  { label: "Flat Polish", desc: "Sleek, shiny, square edge. The modern standard for visible edges." },
  { label: "Beveled Edge", desc: "Decorative sloped edge (1/2\" to 1.5\"). Elegant for mirrors and tabletops." },
  { label: "Seamed Edge", desc: "Sanded dull edge. Best for glass that sits inside a frame." },
];

export default function CustomCutGlassPage() {
  const heroRef     = useRef<HTMLDivElement>(null);
  const decorRef    = useReveal("in-view");
  const techRef     = useReveal("in-view");
  const galleryRef  = useReveal("in-view");

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
        className="relative min-h-[75vh] bg-cover bg-center flex items-center justify-center pt-24"
        style={{ backgroundImage: "url('/images/glass-table.jpg')" }} // Suggestion: Close up of a glass table edge or workshop
      >
        <div className="absolute inset-0 bg-texasNavy/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="grain absolute inset-0 pointer-events-none z-[1]" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="hero-reveal hero-d1 text-texasRed font-bold tracking-[0.3em] mb-4 text-sm md:text-base uppercase bg-white/10 inline-block px-4 py-1 rounded backdrop-blur-sm">
            Odessa & Midland
          </p>
          <h1 className="hero-reveal hero-d2 font-heading font-bold text-5xl md:text-7xl text-white mb-6 leading-tight text-shadow tracking-tight">
            YOUR SPECS.<br />OUR SHOP.
          </h1>
          <p className="hero-reveal hero-d3 text-gray-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            From heavy glass tabletops to custom mirrors and cabinet inserts. Measured precisely and cut locally.
          </p>
          <div className="hero-reveal hero-d4">
            <a
              href="#contact"
              className="bg-texasRed text-white px-8 py-4 rounded font-bold uppercase tracking-wider hover:bg-red-800 transition shadow-lg transform hover:-translate-y-1"
            >
              Get a Quote
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
          <span className="flex items-center gap-2"><i className="fas fa-ruler-combined text-texasRed"></i> Precision Cutting</span>
          <span className="flex items-center gap-2"><i className="fas fa-gem text-texasRed"></i> Polished Edges</span>
          <span className="flex items-center gap-2"><i className="fas fa-clock text-texasRed"></i> Fast Turnaround</span>
        </div>
      </div>

      <Divider top="#ffffff" bottom="#f9fafb" />

      {/* ── FURNITURE & FLAT GLASS ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            
            {/* Text Content */}
            <div className="lg:w-1/2">
              <h4 className="text-texasNavy/60 font-bold tracking-widest uppercase text-sm mb-2">Interior Solutions</h4>
              <h2 className="font-heading font-bold text-4xl text-texasNavy mb-6">FURNITURE &amp; DECOR</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Don't settle for "standard" sizes. We fabricate glass to fit your existing frames, furniture, and fixtures. We stock 1/4", 3/8", and 1/2" clear glass, ready to cut.
              </p>
              
              <div className="grid grid-cols-1 gap-6">
                {flatGlassServices.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-2 h-2 mt-2.5 bg-texasRed rounded-full flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg text-texasNavy">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Grid */}
            <div className="lg:w-1/2 relative h-[500px] w-full">
              {/* Main Image */}
              <div className="absolute top-0 right-0 w-[85%] h-[80%] rounded-lg shadow-xl overflow-hidden z-10">
                 <Image 
                   src="/images/glass-table.jpg" // REPLACE: Nice dining table
                   alt="Custom glass tabletop"
                   fill
                   className="object-cover"
                 />
              </div>
              {/* Secondary Image (Overlap) */}
              <div className="absolute bottom-0 left-0 w-[50%] h-[50%] rounded-lg shadow-2xl overflow-hidden z-20 border-4 border-gray-50">
                 <Image 
                   src="/images/cabinet1.jpg" // REPLACE: Detail of shelves
                   alt="Glass shelving"
                   fill
                   className="object-cover"
                 />
              </div>
            </div>

          </div>
        </div>
      </section>

      <Divider top="#f9fafb" bottom="#1e293b" />

      {/* ── ARCHITECTURAL & DECORATIVE (Replaces Oilfield) ── */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-5 bg-[url('/images/pattern-glass-texture.jpg')] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div ref={decorRef} className="flex flex-col lg:flex-row-reverse gap-16 items-center">
            
            {/* Visual: Mirror/Pattern Split */}
            <div className="w-full lg:w-1/2 relative">
               <div className="relative h-[450px] w-full rounded-lg overflow-hidden shadow-2xl border border-white/20">
                 <Image 
                    src="/images/custom-glass-hi-res.jpg" // REPLACE: Large vanity or gym mirror
                    alt="Custom Mirror Installation"
                    fill
                    className="object-cover"
                 />
                 {/* Badge */}
                 <div className="absolute bottom-6 right-6 bg-white text-texasNavy px-6 py-2 font-bold uppercase tracking-widest shadow-lg text-sm">
                   Custom Design
                 </div>
               </div>
            </div>

            {/* Content */}
            <div className="lg:w-1/2">
              <div className="flex items-center gap-3 mb-4">
                <i className="fas fa-paint-roller text-texasRed text-2xl"></i>
                <span className="font-bold tracking-widest text-gray-400 uppercase text-sm">Mirrors &amp; Patterns</span>
              </div>
              
              <h2 className="font-heading font-black text-4xl md:text-5xl mb-6 leading-tight">
                MIRRORS &amp; <br />
                <span className="text-texasRed">DECORATIVE GLASS.</span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 font-light">
                Glass isn't just for looking through—it's for looking at. We fabricate custom mirrors and patterned glass to transform your kitchen, bath, or home gym.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Mirrors */}
                <div className="bg-white/5 p-6 rounded border border-white/10 hover:border-texasRed transition">
                   <h4 className="font-bold text-white text-xl mb-2">Custom Mirrors</h4>
                   <p className="text-sm text-gray-400">
                     From wall-to-wall gym mirrors to custom vanity shapes. We cut around outlets and lights for a perfect fit.
                   </p>
                </div>
                {/* Cabinet Glass */}
                <div className="bg-white/5 p-6 rounded border border-white/10 hover:border-texasRed transition">
                   <h4 className="font-bold text-white text-xl mb-2">Cabinet Inserts</h4>
                   <p className="text-sm text-gray-400">
                     Upgrade kitchen cabinets with decorative glass. We stock Rain, Reeded (Fluted), Frosted, and more.
                   </p>
                </div>
              </div>

              <a 
                href="#contact"
                className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-3 rounded font-bold hover:bg-texasRed hover:text-white transition duration-300"
              >
                Explore Patterns &rarr;
              </a>
            </div>

          </div>
        </div>
      </section>

      <Divider top="#1e293b" bottom="#ffffff" />

      {/* ── TECHNICAL SPECS & EDGEWORK ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            
            <div ref={techRef} className="md:w-1/2">
              <h2 className="font-heading font-bold text-4xl text-texasNavy mb-6">CUSTOM EDGEWORK</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                The difference between a raw sheet and a finished product is the edge. 
                Whether you need a safe seam for a window frame or a high-polish bevel for a dining table, our in-house polishers handle it.
              </p>
              
              <div className="space-y-6">
                {edges.map((edge, i) => (
                  <div key={i} className="group flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition border border-transparent hover:border-gray-200">
                    <div className="w-10 h-10 rounded-full bg-texasRed/10 text-texasRed flex items-center justify-center font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-texasNavy group-hover:text-texasRed transition">{edge.label}</h4>
                      <p className="text-gray-500 text-sm">{edge.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual for Edges */}
            <div className="md:w-1/2 h-[400px] w-full relative rounded-lg overflow-hidden shadow-lg bg-gray-100">
               <Image 
                 src="/images/polished-edge.jpg" // REPLACE: Close up of glass edges
                 alt="Polished and beveled glass edges"
                 fill
                 className="object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                 <p className="text-white font-medium">
                   <i className="fas fa-info-circle mr-2 text-texasRed"></i>
                   We also drill holes for standoffs and cables.
                 </p>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── MINI GALLERY ── 
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-center font-heading font-bold text-2xl text-texasNavy mb-8">RECENT CUSTOM PROJECTS</h3>
          <div ref={galleryRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 h-64 md:h-80">*/}
            {/* Gallery Item 1 
            <div className="relative rounded-lg overflow-hidden group cursor-pointer">
              <Image src="/images/custom-gallery-1.jpg" fill alt="Custom Project 1" className="object-cover transition group-hover:scale-110" />
            </div>*/}
            {/* Gallery Item 2 
            <div className="relative rounded-lg overflow-hidden group cursor-pointer">
              <Image src="/images/custom-gallery-2.jpg" fill alt="Custom Project 2" className="object-cover transition group-hover:scale-110" />
            </div>*/}
            {/* Gallery Item 3 
            <div className="relative rounded-lg overflow-hidden group cursor-pointer">
              <Image src="/images/custom-gallery-3.jpg" fill alt="Custom Project 3" className="object-cover transition group-hover:scale-110" />
            </div>*/}
             {/* Gallery Item 4
             <div className="relative rounded-lg overflow-hidden group cursor-pointer">
              <Image src="/images/custom-gallery-4.jpg" fill alt="Custom Project 4" className="object-cover transition group-hover:scale-110" />
            </div>
          </div>
        </div>
      </section>*/}

      <Divider top="#f9fafb" bottom="#0f172a" />

      {/* ── CONTACT ──────────────────────────────────────── */}
      <ContactSection selectedService="Custom Cut Glass" />

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