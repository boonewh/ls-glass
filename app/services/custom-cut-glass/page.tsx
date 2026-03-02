"use client";

import { useEffect, useRef } from "react";
import Image from "next/image"; // Added for optimized images
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
const residentialServices = [
  {
    title: "Tabletops & Furniture",
    desc: "Protect your wood furniture from scratches and spills. We cut 1/4” or 3/8” glass to fit any shape—circles, ovals, or irregular dining tables.",
  },
  {
    title: "Shelving & Cabinets",
    desc: "Replace wood shelves with heavy glass to let light flow through your cabinets. We also install patterned glass inserts (Rain, Reeded, Frosted).",
  },
  {
    title: "Mirrors & Gym Walls",
    desc: "From vanity mirrors cut around lighting fixtures to floor-to-ceiling gym walls. Polished edges and safety backing available.",
  },
  {
    title: "Wood Stove Glass",
    desc: "We stock high-temperature NeoCeram ceramic glass for fireplace inserts and wood stoves. Don't let a cracked pane ruin your heat.",
  },
];

/* ── Data: Edges ── */
const edges = [
  { label: "Flat Polish", desc: "Sleek, shiny, square edge. The modern standard." },
  { label: "Beveled Edge", desc: "Decorative sloped edge (1/2\" to 1.5\"). Elegant for mirrors." },
  { label: "Seamed Edge", desc: "Sanded dull edge. Best for framed glass (cheaper)." },
];

export default function CustomCutGlassPage() {
  const heroRef     = useRef<HTMLDivElement>(null);
  const oilRef      = useReveal("in-view");
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
        className="relative h-[75vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/big-cat.jpg')" }} 
      >
        <div className="absolute inset-0 bg-texasNavy/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="grain absolute inset-0 pointer-events-none z-[1]" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="hero-reveal hero-d1 text-texasRed font-bold tracking-[0.3em] mb-4 text-sm md:text-base uppercase bg-white/10 inline-block px-4 py-1 rounded backdrop-blur-sm">
            Odessa & Midland
          </p>
          <h1 className="hero-reveal hero-d2 font-heading font-bold text-5xl md:text-7xl text-white mb-6 leading-tight text-shadow tracking-tight">
            CUSTOM CUT.<br />PRECISION FIT.
          </h1>
          <p className="hero-reveal hero-d3 text-gray-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            From heavy equipment safety glass to elegant dining tabletops. If it’s flat glass, we cut it to your exact specs.
          </p>
          <div className="hero-reveal hero-d4">
            <a
              href="#contact"
              className="bg-texasRed text-white px-8 py-4 rounded font-bold uppercase tracking-wider hover:bg-red-800 transition shadow-lg transform hover:-translate-y-1"
            >
              Get a Quote
            </a>
          </div>
          {/* FINANCING BADGE - Paste this immediately AFTER the "hero-d4" button container div */}
          <div className="hero-reveal hero-d4 mt-8 flex justify-center">
            <a 
              href="#contact" 
              className="group flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full text-white text-sm font-bold tracking-wide hover:bg-white/10 transition-all duration-300"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
              <span>Financing Available</span>
              <span className="h-4 w-px bg-white/20 mx-1"></span>
              <span className="text-gray-300 group-hover:text-white font-normal text-xs uppercase">Ask for details <i className="fas fa-arrow-right ml-1 -rotate-45 group-hover:rotate-0 transition-transform"></i></span>
            </a>
          </div>
        </div>
      </div>

      {/* ── TRUST BAR ── */}
      <div className="bg-white border-b border-gray-200 py-6 relative z-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-6 md:gap-12 text-gray-600 text-sm font-bold uppercase tracking-widest">
          <span className="flex items-center gap-2"><i className="fas fa-ruler-combined text-texasRed"></i> Precision Cutting</span>
          <span className="flex items-center gap-2"><i className="fas fa-hard-hat text-texasRed"></i> Laminated Safety</span>
          <span className="flex items-center gap-2"><i className="fas fa-clock text-texasRed"></i> Fast Turnaround</span>
        </div>
      </div>

      <Divider top="#ffffff" bottom="#f9fafb" />

      {/* ── RESIDENTIAL SECTION (Left Text, Right Image) ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            
            {/* Text Content */}
            <div className="lg:w-1/2">
              <h4 className="text-texasNavy/60 font-bold tracking-widest uppercase text-sm mb-2">For The Home</h4>
              <h2 className="font-heading font-bold text-4xl text-texasNavy mb-6">FURNITURE &amp; DECOR</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Don't settle for "standard" sizes. We fabricate glass to fit your existing frames, furniture, and fixtures. We stock 1/4", 3/8", and 1/2" clear glass, ready to cut.
              </p>
              
              <div className="grid grid-cols-1 gap-6">
                {residentialServices.map((item, i) => (
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
                   src="/images/glass-table.jpg" // REPLACE WITH: Tabletop or shelving image
                   alt="Custom glass tabletop"
                   fill
                   className="object-cover"
                 />
              </div>
              {/* Secondary Image (Overlap) */}
              <div className="absolute bottom-0 left-0 w-[50%] h-[50%] rounded-lg shadow-2xl overflow-hidden z-20 border-4 border-gray-50">
                 <Image 
                   src="/images/cabinet1.jpg" // REPLACE WITH: Detail shot of edge or shelves
                   alt="Polished glass edge"
                   fill
                   className="object-cover"
                 />
              </div>
            </div>

          </div>
        </div>
      </section>

      <Divider top="#f9fafb" bottom="#0f172a" />

      {/* ── HEAVY EQUIPMENT / OILFIELD SECTION (Dark Theme) ── */}
      {/* This is the new "Significant Add" requested */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10 bg-[url('/images/diamond-plate-pattern.png')] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div ref={oilRef} className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Image: CAT Grader / Heavy Equipment */}
            <div className="lg:w-1/2 relative">
               <div className="relative h-[400px] md:h-[500px] w-full rounded-lg overflow-hidden shadow-2xl border border-white/20 group">
                 <Image 
                    src="/images/big-cat.jpg" // REPLACE WITH: The specific CAT picture provided
                    alt="Caterpillar Motor Grader Glass Replacement"
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                 />
                 {/* Badge */}
                 <div className="absolute top-4 left-4 bg-texasRed text-white px-4 py-1 font-bold uppercase tracking-wider text-xs rounded shadow-lg">
                   Oilfield Tough
                 </div>
               </div>
               {/* Decorative Element */}
               <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-dashed border-white/20 rounded-lg -z-10"></div>
            </div>

            {/* Content */}
            <div className="lg:w-1/2">
              <div className="flex items-center gap-3 mb-4">
                <i className="fas fa-industry text-texasRed text-2xl"></i>
                <span className="font-bold tracking-widest text-gray-400 uppercase text-sm">Commercial &amp; Industrial</span>
              </div>
              
              <h2 className="font-heading font-black text-4xl md:text-5xl mb-6 leading-tight">
                HEAVY EQUIPMENT <br />
                <span className="text-texasRed">GLASS REPAIR.</span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 font-light">
                Downtime costs you money. When a window breaks on a dozer, crane, or maintainer, you can't wait weeks for a factory part. 
              </p>

              <div className="bg-white/5 p-8 rounded-lg border border-white/10 mb-8 backdrop-blur-sm">
                <h3 className="font-bold text-xl mb-4 text-white">We Cut Patterns On-Site or In-Shop</h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-texasRed mt-1 mr-3"></i>
                    <span><strong>Laminated Safety Glass:</strong> We stock clear and tinted laminated glass that meets safety regulations for heavy machinery.</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-texasRed mt-1 mr-3"></i>
                    <span><strong>Flat Glass Fabrication:</strong> We can cut flat glass for almost any make—CAT, John Deere, Case, and more.</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-texasRed mt-1 mr-3"></i>
                    <span><strong>Polycarbonate &amp; Lexan:</strong> Need something unbreakable? We cut high-impact polycarbonate for forestry and intense environments.</span>
                  </li>
                </ul>
              </div>

              <a 
                href="tel:4323163142"
                className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded font-bold hover:bg-texasRed hover:text-white transition duration-300"
              >
                <i className="fas fa-phone"></i> Call for Dispatch
              </a>
            </div>

          </div>
        </div>
      </section>

      <Divider top="#0f172a" bottom="#ffffff" />

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
                 src="/images/polished-edge.jpg" // REPLACE WITH: Close up of glass edges
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

      {/* ── MINI GALLERY ── */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-center font-heading font-bold text-2xl text-texasNavy mb-8">RECENT PROJECTS</h3>
          <div ref={galleryRef} className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { src: "/images/broken-glass.jpg",  alt: "Broken glass repair" },
              { src: "/images/broken-glass2.jpg", alt: "Glass replacement" },
              { src: "/images/big-cat2.jpg",       alt: "Heavy equipment glass" },
              { src: "/images/custom-work.jpg",      alt: "Custom cut project" },
              { src: "/images/cabinet2.jpg",      alt: "Custom cut project" },
            ].map((img) => (
              <div key={img.src} className="relative h-80 md:h-[420px] rounded-lg overflow-hidden group cursor-pointer">
                <Image src={img.src} fill alt={img.alt} className="object-cover transition duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

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