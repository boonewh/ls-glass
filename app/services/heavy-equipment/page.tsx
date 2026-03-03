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

export default function OilfieldPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const machineryRef = useReveal("in-view");
  const specialRef = useReveal("in-view");

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

      {/* ── HERO: INDUSTRIAL VIBE ────────────────────────── */}
      <div
        ref={heroRef}
        className="relative h-[85vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/big-cat.jpg')" }} // Suggestion: Silhouette of rig or heavy equipment at sunset
      >
        <div className="absolute inset-0 bg-texasNavy/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/40" />
        {/* Diamond Plate Texture Overlay (Optional subtle pattern) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <p className="hero-reveal hero-d1 text-texasRed font-bold tracking-[0.3em] mb-4 text-sm md:text-base uppercase bg-black/50 inline-block px-4 py-1 rounded backdrop-blur-sm border border-texasRed/30">
            Permian Basin Service
          </p>
          <h1 className="hero-reveal hero-d2 font-heading font-black text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight text-shadow tracking-tight">
            HEAVY EQUIPMENT <br />
            <span className="text-gray-300">GLASS REPAIR.</span>
          </h1>
          <p className="hero-reveal hero-d3 text-gray-200 text-lg md:text-xl mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            Downtime costs you money. We cut and install laminated safety glass for cranes, dozers, and oilfield structures on-site or in our shop.
          </p>

          <div className="hero-reveal hero-d4 flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="tel:4323163142"
              className="bg-texasRed text-white px-8 py-4 rounded font-bold uppercase tracking-wider hover:bg-red-800 transition shadow-lg transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <i className="fas fa-phone"></i> Call Dispatch
            </a>
            <a
              href="#machinery"
              className="border-2 border-white text-white px-8 py-4 rounded font-bold uppercase tracking-wider hover:bg-white hover:text-texasNavy transition"
            >
              Capabilities
            </a>
          </div>
        </div>
      </div>

      {/* ── TRUST BAR ── */}
      <div className="bg-slate-900 border-b border-slate-800 py-6 relative z-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-6 md:gap-12 text-gray-400 text-sm font-bold uppercase tracking-widest">
          <span className="flex items-center gap-2"><i className="fas fa-truck-pickup text-texasRed"></i> Mobile Service</span>
          <span className="flex items-center gap-2"><i className="fas fa-hard-hat text-texasRed"></i> MSHA Compliant</span>
          <span className="flex items-center gap-2"><i className="fas fa-layer-group text-texasRed"></i> Laminated Safety</span>
        </div>
      </div>

      <Divider top="#0f172a" bottom="#f9fafb" />

      {/* ── HEAVY MACHINERY (The CAT Grader Section) ── */}
      <section id="machinery" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={machineryRef} className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Text Content */}
            <div className="lg:w-1/2">
              <h4 className="text-texasNavy/60 font-bold tracking-widest uppercase text-sm mb-2">
                Oilfield Equipment Cabs
              </h4>
              <h2 className="font-heading font-black text-3xl md:text-5xl text-texasNavy mb-6 leading-tight">
                IF IT HAS A CAB,<br />
                <span className="text-texasRed">WE CAN GLAZE IT.</span>
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                From motor graders and excavators to telehandlers and frac equipment, cab glass in the Permian Basin takes constant punishment — caliche, gravel, and frac sand don&apos;t care what it costs to replace.
              </p>
              <a
                href="tel:4323163142"
                className="inline-flex items-center gap-3 bg-texasRed text-white px-8 py-4 rounded font-bold uppercase tracking-wider hover:bg-red-800 transition shadow-lg transform hover:-translate-y-1 mt-2"
              >
                <i className="fas fa-phone"></i> Call When the Glass Goes
              </a>
            </div>

            {/* Image Block: The CAT Grader */}
            <div className="lg:w-1/2 relative h-[500px] w-full group">
               <div className="absolute top-0 right-0 w-full h-full rounded-lg shadow-xl overflow-hidden z-10 border-4 border-slate-200">
                 <Image 
                   src="/images/big-cat2.jpg" // REPLACE: Your CAT Grader Image
                   alt="Caterpillar Motor Grader Glass Repair"
                   fill
                   className="object-cover transition duration-700 group-hover:scale-105"
                 />
                 {/* Overlay Label */}
                 <div className="absolute bottom-6 left-6 bg-texasNavy text-white px-4 py-2 font-bold uppercase tracking-widest shadow-lg text-sm border-l-4 border-texasRed">
                   Flat Glass Fabrication
                 </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      <Divider top="#f9fafb" bottom="#1e293b" />

      {/* ── SPECIAL PROJECTS (Oilfield Rig Glass) ── */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('/images/diamond-plate-pattern.png')] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-heading font-black text-3xl md:text-5xl text-white mb-4">SPECIAL PROJECTS</h2>
            <div className="h-1 w-20 bg-texasRed mx-auto mb-6" />
            <p className="text-gray-400 max-w-2xl mx-auto">
              When the job site is an oil rig, standard glass work doesn&apos;t apply. We bring the right materials and get it done.
            </p>
          </div>

          {/* Full-width diptych — both images, fully visible */}
          <div ref={specialRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14">

            {/* Image 1: Before */}
            <div className="relative h-[420px] md:h-[520px] rounded-lg overflow-hidden group shadow-2xl">
              <Image
                src="/images/preinstall.jpg"
                alt="Oil rig structure before glass installation"
                fill
                className="object-cover object-top transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>

            {/* Image 2: Installation */}
            <div className="relative h-[420px] md:h-[520px] rounded-lg overflow-hidden group shadow-2xl">
              <Image
                src="/images/installation.jpg"
                alt="Glass being installed on oilfield rig structure"
                fill
                className="object-cover object-bottom transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>

          </div>

          {/* Text content below the images */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            <div>
              <h3 className="font-heading font-bold text-2xl text-white mb-4">Rig Structures &amp; Driller&apos;s Cabins</h3>
              <p className="text-gray-300 leading-relaxed">
                Drilling rigs have glass in places most people don&apos;t think about — driller&apos;s cabins, dog houses, mast enclosures, and substructure panels. When that glass gets cracked or blown out on location, it needs to be replaced with the right laminated safety spec, not whatever&apos;s convenient.
              </p>
            </div>

            <div>
              <h3 className="font-heading font-bold text-2xl text-white mb-4">We Work Around the Rig</h3>
              <p className="text-gray-300 leading-relaxed">
                Bring us the measurements or the broken piece and we&apos;ll cut the replacement to fit. We work with rig crews and operators to get it coordinated — so the rig gets back to making hole.
              </p>
              <div className="mt-8 bg-white/10 border-l-4 border-texasRed p-5 rounded">
                <p className="text-white font-bold italic">
                  &ldquo;We don&apos;t back down from the hard jobs. We figure out the logistics and get the glass in safely.&rdquo;
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      <Divider top="#1e293b" bottom="#ffffff" />

      {/* ── SAFETY MATERIALS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
             <h3 className="font-heading font-bold text-2xl text-texasNavy">INDUSTRIAL GLASS TYPES</h3>
             <p className="text-gray-600">We stock the materials required for MSHA &amp; OSHA compliance.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Type 1 */}
            <div className="p-8 border-2 border-gray-100 rounded-lg bg-gray-50 text-center hover:border-texasRed transition duration-300">
              <i className="fas fa-shield-alt text-4xl text-texasNavy mb-4"></i>
              <h4 className="font-bold text-xl text-texasNavy mb-2">Laminated Safety</h4>
              <p className="text-sm text-gray-600">
                Two layers of glass bonded to a vinyl inner layer. If it breaks, it holds together, protecting the operator from flying shards.
              </p>
            </div>

            {/* Type 2 */}
            <div className="p-8 border-2 border-gray-100 rounded-lg bg-gray-50 text-center hover:border-texasRed transition duration-300">
              <i className="fas fa-hammer text-4xl text-texasNavy mb-4"></i>
              <h4 className="font-bold text-xl text-texasNavy mb-2">Polycarbonate / Lexan</h4>
              <p className="text-sm text-gray-600">
                250x stronger than glass. Essential for forestry equipment, crushers, or machines exposed to high-velocity debris.
              </p>
            </div>

            {/* Type 3 */}
            <div className="p-8 border-2 border-gray-100 rounded-lg bg-gray-50 text-center hover:border-texasRed transition duration-300">
              <i className="fas fa-tint text-4xl text-texasNavy mb-4"></i>
              <h4 className="font-bold text-xl text-texasNavy mb-2">Tinted &amp; Tempered</h4>
              <p className="text-sm text-gray-600">
                We cut Grey and Bronze tinted laminated glass to reduce glare for operators working in the harsh West Texas sun.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Divider top="#ffffff" bottom="#0f172a" />

      {/* ── CONTACT ──────────────────────────────────────── */}
      <ContactSection selectedService="Heavy Equipment Glass" />

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