"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import MapEmbed from "@/components/MapEmbed";

/* Reusable diagonal section divider */
function Divider({ top, bottom }: { top: string; bottom: string }) {
  return (
    <div className="relative h-14 overflow-hidden" style={{ background: top }}>
      <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        <polygon points="0,56 1440,0 1440,56" fill={bottom} />
      </svg>
    </div>
  );
}

export default function Home() {
  const [selectedService, setSelectedService] = useState("General Inquiry");

  const heroRef      = useRef<HTMLDivElement>(null);
  const trustBarRef  = useRef<HTMLDivElement>(null);
  const servicesRef  = useRef<HTMLDivElement>(null);

  function selectService(serviceName: string) {
    setSelectedService(serviceName);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    /* Parallax */
    const onScroll = () => {
      if (heroRef.current) {
        const y = window.scrollY * 0.3;
        heroRef.current.style.backgroundPositionY = `calc(50% + ${y}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    /* Trust bar */
    const trustObs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { e.target.classList.add("trust-visible"); trustObs.disconnect(); } },
      { threshold: 0.5 }
    );
    if (trustBarRef.current) trustObs.observe(trustBarRef.current);

    /* Service cards */
    const cardsObs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { e.target.classList.add("cards-visible"); cardsObs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (servicesRef.current) cardsObs.observe(servicesRef.current);

    return () => {
      window.removeEventListener("scroll", onScroll);
      trustObs.disconnect();
      cardsObs.disconnect();
    };
  }, []);

  return (
    <>
      {/* Mobile Sticky Call Button */}
      <a
        href="tel:4323163142"
        className="md:hidden fixed bottom-6 right-6 z-50 bg-texasRed text-white px-6 py-4 rounded-full shadow-2xl font-bold flex items-center gap-2 hover:bg-red-800 transition transform hover:scale-105"
      >
        <i className="fas fa-phone-alt"></i> Call Now
      </a>

      <Navbar />

      {/* HERO */}
      <div ref={heroRef} className="relative h-screen hero-bg flex items-center justify-center">
        <div className="absolute inset-0 bg-texasNavy/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/40" />
        {/* Grain texture overlay */}
        <div className="grain absolute inset-0 pointer-events-none z-[1]" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="hero-reveal hero-d1 text-yellow-400 font-bold tracking-[0.3em] mb-4 text-sm md:text-base">
            SERVING ODESSA &amp; MIDLAND
          </p>
          <h1 className="hero-reveal hero-d2 font-heading font-bold text-5xl md:text-7xl text-white mb-6 leading-tight text-shadow tracking-tight">
            GLASS PERFECTION.<br />NO COMPROMISE.
          </h1>
          <p className="hero-reveal hero-d3 text-gray-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            From luxury bathroom remodels to commercial storefronts and auto glass. We execute every project with precision and Texas pride.
          </p>
          <div className="hero-reveal hero-d4 flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="bg-texasRed text-white px-8 py-4 rounded font-bold uppercase tracking-wider hover:bg-red-800 transition shadow-lg transform hover:-translate-y-1"
            >
              Request Free Quote
            </a>
            <a
              href="#services"
              className="border-2 border-white text-white px-8 py-4 rounded font-bold uppercase tracking-wider hover:bg-white hover:text-texasNavy transition"
            >
              Our Services
            </a>
          </div>
        </div>
      </div>

      {/* TRUST BAR */}
      <div className="bg-texasNavy pt-8 pb-6 border-b-4 border-texasRed">
        <div ref={trustBarRef} className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 text-white">
          <div className="trust-item flex items-center gap-3" style={{ transitionDelay: "0ms" }}>
            <i className="fas fa-check-circle text-texasRed text-xl" />
            <span className="font-bold tracking-wide">Family Owned &amp; Operated</span>
          </div>
          <div className="trust-item flex items-center gap-3" style={{ transitionDelay: "150ms" }}>
            <i className="fas fa-tools text-texasRed text-xl" />
            <span className="font-bold tracking-wide"><em className="not-italic font-bold">No</em> Subcontracting</span>
          </div>
          <div className="trust-item flex items-center gap-3" style={{ transitionDelay: "300ms" }}>
            <i className="fas fa-star text-texasRed text-xl" />
            <span className="font-bold tracking-wide">Premium Materials</span>
          </div>
          <div className="trust-item flex items-center gap-3" style={{ transitionDelay: "450ms" }}>
            <i className="fas fa-dollar-sign text-texasRed text-xl" />
            <span className="font-bold tracking-wide">Financing Available</span>
          </div>
        </div>
      </div>

      {/* Diagonal divider: navy → gray-50 */}
      <Divider top="#003366" bottom="#f9fafb" />

      {/* SERVICES */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl text-texasNavy mb-4">OUR EXPERTISE</h2>
            <div className="h-1 w-20 bg-texasRed mx-auto mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              We handle the tough jobs other shops won&apos;t touch. Residential, Commercial, and Auto.
            </p>
          </div>

          <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Featured: Custom Showers & Bathroom Remodels */}
            <div
              className="service-card col-span-1 md:col-span-2 lg:col-span-4 group relative h-[480px] md:h-[500px] rounded-lg overflow-hidden shadow-2xl cursor-pointer"
              style={{ transitionDelay: "0ms" }}
              onClick={() => selectService("Bathroom Remodel")}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-700 transform group-hover:scale-110"
                style={{ backgroundImage: "url('/images/bathroom-remodel.jpg')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-texasNavy/90 via-texasNavy/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                <h3 className="font-heading font-bold text-white mb-4 leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                  Custom Showers &amp;<br />Bathroom Remodels
                </h3>
                <p className="text-gray-200 text-base md:text-xl max-w-3xl mb-6">
                  From a custom frameless shower to a full bathroom transformation —{" "}
                  <span className="text-white font-black italic">demo to done</span>,
                  with our own crew. No subcontracting, ever.
                </p>
                <span className="text-white font-bold uppercase tracking-widest text-sm group-hover:text-texasRed transition">
                  Get a Quote <i className="fas fa-arrow-right ml-2" />
                </span>
              </div>
            </div>

            {/* Custom Cut Glass */}
            <div
              className="service-card group relative h-[400px] rounded-lg overflow-hidden shadow-xl cursor-pointer"
              style={{ transitionDelay: "100ms" }}
              onClick={() => selectService("Custom Shower")}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-700 transform group-hover:scale-110"
                style={{ backgroundImage: "url('/images/custom-shower.jpg')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <i className="fas fa-cut text-texasRed text-2xl mb-3" />
                <h3 className="font-heading font-bold text-2xl text-white mb-2">Custom Cut Glass</h3>
                <p className="text-gray-300 text-sm mb-4">Precision-cut glass for any application — shelves, tabletops, enclosures &amp; more.</p>
                <span className="text-texasRed font-bold text-sm uppercase">Get Quote &rarr;</span>
              </div>
            </div>

            {/* Residential Glass */}
            <div
              className="service-card group relative h-[400px] rounded-lg overflow-hidden shadow-xl cursor-pointer"
              style={{ transitionDelay: "200ms" }}
              onClick={() => selectService("Home Windows")}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-700 transform group-hover:scale-110"
                style={{ backgroundImage: "url('/images/custom-bath-glass.jpg')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <i className="fas fa-home text-texasRed text-2xl mb-3" />
                <h3 className="font-heading font-bold text-2xl text-white mb-2">Residential Glass</h3>
                <p className="text-gray-300 text-sm mb-4">Window replacement, custom mirrors &amp; tabletops.</p>
                <span className="text-texasRed font-bold text-sm uppercase">Get Quote &rarr;</span>
              </div>
            </div>

            {/* Commercial Glass */}
            <div
              className="service-card group relative h-[400px] rounded-lg overflow-hidden shadow-xl cursor-pointer"
              style={{ transitionDelay: "300ms" }}
              onClick={() => selectService("Commercial Glass")}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-700 transform group-hover:scale-110"
                style={{ backgroundImage: "url('/images/commercial.jpg')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <i className="fas fa-building text-texasRed text-2xl mb-3" />
                <h3 className="font-heading font-bold text-2xl text-white mb-2">Commercial</h3>
                <p className="text-gray-300 text-sm mb-4">Storefront demolition, replacement &amp; repair.</p>
                <span className="text-texasRed font-bold text-sm uppercase">Get Quote &rarr;</span>
              </div>
            </div>

            {/* Auto Glass */}
            <div
              className="service-card group relative h-[400px] rounded-lg overflow-hidden shadow-xl cursor-pointer"
              style={{ transitionDelay: "400ms" }}
              onClick={() => selectService("Auto Glass")}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-700 transform group-hover:scale-110"
                style={{ backgroundImage: "url('/images/auto-glass.jpg')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <i className="fas fa-car text-texasRed text-2xl mb-3" />
                <h3 className="font-heading font-bold text-2xl text-white mb-2">Auto Glass</h3>
                <p className="text-gray-300 text-sm mb-4">Windshield repair and replacement. Fast service.</p>
                <span className="text-texasRed font-bold text-sm uppercase">Get Quote &rarr;</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Diagonal divider: gray-50 → white */}
      <Divider top="#f9fafb" bottom="#ffffff" />

      {/* HOW IT WORKS */}
      <HowItWorks />

      {/* Diagonal divider: white → white (about has image left, text right) */}
      <div className="h-px bg-gray-100" />

      {/* ABOUT */}
      <section id="about" className="flex flex-col lg:flex-row bg-white">
        <div
          className="lg:w-1/2 h-96 lg:h-auto bg-cover bg-center"
          style={{ backgroundImage: "url('/images/custom-glass-hi-res.jpg')" }}
        />
        <div className="lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center">
          <h4 className="text-texasRed font-bold tracking-widest uppercase mb-2 text-sm">
            Why Choose Lone Star?
          </h4>
          <h2 className="font-heading font-black text-4xl text-texasNavy mb-6 leading-tight">
            WE MASTER THE CRAFT.<br /><em className="not-italic text-texasRed">NO SHORTCUTS.</em>
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            At Lone Star Glass and Shower, quality control is our obsession. Unlike other contractors who farm out the difficult work, we handle your project from the initial measurement to the final polish.
          </p>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Whether it&apos;s a complex bathroom remodel involving demolition and tiling, or a simple windshield chip repair, our team serves Odessa, Midland, and the surrounding area with expert craftsmanship on every job.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center">
              <i className="fas fa-check text-texasRed mr-4" />
              <span className="font-bold text-gray-800">Full Bathroom Remodeling (Demo to Finish)</span>
            </li>
            <li className="flex items-center">
              <i className="fas fa-check text-texasRed mr-4" />
              <span className="font-bold text-gray-800">Custom Glass Fabrication</span>
            </li>
            <li className="flex items-center">
              <i className="fas fa-check text-texasRed mr-4" />
              <span className="font-bold text-gray-800">Locally Owned &amp; Operated</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Diagonal divider: white → gray-50 */}
      <Divider top="#ffffff" bottom="#f9fafb" />

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* Diagonal divider: gray-50 → slate-900 */}
      <Divider top="#f9fafb" bottom="#0f172a" />

      {/* CONTACT */}
      <ContactSection selectedService={selectedService} />

      {/* MAP */}
      <MapEmbed />

      {/* FOOTER */}
      <footer className="bg-black text-gray-500 py-10 text-center border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-heading font-black text-2xl text-white mb-2">LSG</h2>
          <p className="mb-6 text-sm">Premium Glass &amp; Shower Solutions</p>
          <p className="text-xs">&copy; 2026 Lone Star Glass and Shower. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}
