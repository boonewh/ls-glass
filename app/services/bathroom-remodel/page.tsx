"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import MapEmbed from "@/components/MapEmbed";

/* ── Diagonal section divider (matches homepage) ── */
function Divider({ top, bottom }: { top: string; bottom: string }) {
  return (
    <div className="relative h-14 overflow-hidden" style={{ background: top }}>
      <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        <polygon points="0,56 1440,0 1440,56" fill={bottom} />
      </svg>
    </div>
  );
}

/* ── Reusable IntersectionObserver hook ── */
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

/* ── Data ── */
const scope = [
  {
    num: "01",
    title: "Demolition & Site Prep",
    desc: "Full tear-out, debris removal, and surface prep — we do the dirty work before a single tile is set.",
  },
  {
    num: "02",
    title: "Custom Tile Work",
    desc: "Floor-to-ceiling tile installation with precision layout, grouting, and sealing to spec.",
  },
  {
    num: "03",
    title: "Shower Glass & Enclosures",
    desc: "Frameless and semi-frameless glass fabricated in our shop and installed by our own team.",
  },
  {
    num: "04",
    title: "Vanity & Fixture Installation",
    desc: "Mirrors, shelving, towel bars, and hardware placed exactly where you want them.",
  },
  {
    num: "05",
    title: "Final Detail & Polish",
    desc: "We clean up, inspect every edge, and walk through the finished space with you before calling it done.",
  },
];

const gallery = [
  { src: "/images/bathroom-remodel.jpg",  label: "Full Bathroom Remodel",       tall: false },
  { src: "/images/custom-shower.jpg",     label: "Frameless Shower Enclosure",  tall: true  },
  { src: "/images/custom-bath-glass.jpg", label: "Custom Bath Glass",            tall: false },
];

/* ── Page ── */
export default function BathroomRemodelPage() {
  const heroRef    = useRef<HTMLDivElement>(null);
  const trustRef   = useReveal("trust-visible");
  const scopeRef   = useReveal("in-view");
  const galleryRef = useReveal("in-view");

  /* Parallax */
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
      {/* Mobile Sticky Call */}
      <a
        href="tel:4323163142"
        className="md:hidden fixed bottom-6 right-6 z-50 bg-texasRed text-white px-6 py-4 rounded-full shadow-2xl font-bold flex items-center gap-2 hover:bg-red-800 transition transform hover:scale-105"
      >
        <i className="fas fa-phone-alt"></i> Call Now
      </a>

      <Navbar />

      {/* ── HERO ─────────────────────────────────────────── */}
      <div
        ref={heroRef}
        className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/bathroom-remodel.jpg')" }}
      >
        <div className="absolute inset-0 bg-texasNavy/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="grain absolute inset-0 pointer-events-none z-[1]" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="hero-reveal hero-d1 text-yellow-400 font-bold tracking-[0.3em] mb-4 text-sm md:text-base uppercase">
            Full Service · Odessa &amp; Midland
          </p>
          <h1 className="hero-reveal hero-d2 font-heading font-bold text-5xl md:text-7xl text-white mb-6 leading-tight text-shadow tracking-tight">
            BATHROOM REMODELS.<br />DONE RIGHT.
          </h1>
          <p className="hero-reveal hero-d3 text-gray-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            From demolition to the final polish — one expert team, no subcontractors, no surprises.
          </p>
          <div className="hero-reveal hero-d4 flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="bg-texasRed text-white px-8 py-4 rounded font-bold uppercase tracking-wider hover:bg-red-800 transition shadow-lg transform hover:-translate-y-1"
            >
              Get a Free Quote
            </a>
            <a
              href="#gallery"
              className="border-2 border-white text-white px-8 py-4 rounded font-bold uppercase tracking-wider hover:bg-white hover:text-texasNavy transition"
            >
              See Our Work
            </a>
          </div>
        </div>
      </div>

      {/* ── TRUST STRIP ──────────────────────────────────── */}
      <div className="bg-texasNavy pt-8 pb-6 border-b-4 border-texasRed">
        <div ref={trustRef} className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 text-white">
          <div className="trust-item flex items-center gap-3" style={{ transitionDelay: "0ms" }}>
            <i className="fas fa-check-circle text-texasRed text-xl" />
            <span className="font-bold tracking-wide">Full Demo + Installation</span>
          </div>
          <div className="trust-item flex items-center gap-3" style={{ transitionDelay: "150ms" }}>
            <i className="fas fa-tools text-texasRed text-xl" />
            <span className="font-bold tracking-wide"><em className="not-italic font-bold">No</em> Subcontracting</span>
          </div>
          <div className="trust-item flex items-center gap-3" style={{ transitionDelay: "300ms" }}>
            <i className="fas fa-th-large text-texasRed text-xl" />
            <span className="font-bold tracking-wide">Custom Tile &amp; Glass</span>
          </div>
        </div>
      </div>

      <Divider top="#003366" bottom="#ffffff" />

      {/* ── SCOPE OF WORK ─────────────────────────────────── */}
      <section className="py-12 lg:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

            {/* Image with accent geometry — second on mobile, first on desktop */}
            <div className="order-2 lg:order-1 lg:w-1/2 relative flex-shrink-0 w-full">
              <div
                className="h-[260px] sm:h-[380px] lg:h-[580px] rounded-lg bg-cover bg-center shadow-2xl"
                style={{ backgroundImage: "url('/images/custom-glass-hi-res.jpg')" }}
              />
              {/* Decorative offset blocks — desktop only to avoid mobile overflow */}
              <div className="hidden lg:block absolute -bottom-6 -right-6 w-32 h-32 bg-texasRed rounded-lg -z-10" />
              <div className="hidden lg:block absolute -top-6 -left-6 w-20 h-20 border-4 border-texasNavy rounded-lg -z-10" />
            </div>

            {/* Numbered scope list — first on mobile, second on desktop */}
            <div ref={scopeRef} className="order-1 lg:order-2 lg:w-1/2">
              <h4 className="text-texasRed font-bold tracking-widest uppercase text-sm mb-2">
                Complete Service
              </h4>
              <h2 className="font-heading font-black text-4xl md:text-5xl text-texasNavy mb-10 leading-tight">
                ONE TEAM.<br />
                <em className="not-italic text-texasRed">EVERY STEP.</em>
              </h2>

              <div className="space-y-7">
                {scope.map((item, i) => (
                  <div
                    key={item.num}
                    className="reveal-up flex gap-5 items-start group"
                    style={{ transitionDelay: `${i * 90}ms` }}
                  >
                    {/* Ghost oversized number */}
                    <span className="font-heading font-black text-4xl text-texasRed/20 group-hover:text-texasRed/60 transition duration-300 leading-none pt-0.5 min-w-[3rem] select-none">
                      {item.num}
                    </span>
                    <div className="border-l-2 border-gray-100 group-hover:border-texasRed pl-5 transition-colors duration-300">
                      <h3 className="font-heading font-bold text-lg text-texasNavy mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Divider top="#ffffff" bottom="#003366" />

      {/* ── GALLERY ──────────────────────────────────────── */}
      <section id="gallery" className="py-24 bg-texasNavy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl text-white mb-4">OUR WORK</h2>
            <div className="h-1 w-20 bg-texasRed mx-auto mb-4" />
            <p className="text-gray-300 max-w-2xl mx-auto">
              Every project is a custom job. Here&apos;s a sample of what we&apos;ve built for homeowners in Odessa and Midland.
            </p>
          </div>

          <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            {gallery.map((img, i) => (
              <div
                key={img.src}
                className="reveal-up group relative overflow-hidden rounded-lg shadow-xl cursor-pointer"
                style={{ height: img.tall ? "440px" : "300px", transitionDelay: `${i * 120}ms` }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${img.src}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-white font-bold font-heading text-lg">{img.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider top="#003366" bottom="#0f172a" />

      {/* ── CONTACT ──────────────────────────────────────── */}
      <ContactSection selectedService="Bathroom Remodel" />

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
