"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const services = [
  { label: "Bathroom Remodels",         href: "/services/bathroom-remodel" },
  { label: "Custom Cut Glass",          href: "/services/custom-cut-glass" },
  { label: "Residential Glass",         href: "/services/residential-glass" },
  { label: "Commercial Glass",          href: "/services/commercial-glass" },
  { label: "Auto Glass",               href: "/services/auto-glass" },
  { label: "Oilfield & Heavy Equipment", href: "/services/heavy-equipment" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen]               = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesOpen, setServicesOpen]           = useState(false);
  const [scrolled, setScrolled]                   = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close desktop dropdown on outside click */
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  };

  const toggleMobile = () => {
    const next = !mobileOpen;
    setMobileOpen(next);
    if (!next) setMobileServicesOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-40 transition-all duration-300 ${
        scrolled
          ? "bg-texasNavy shadow-md"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-[5px]">

          {/* Logo → home */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/images/lone-star-logo-small.png"
                alt="Lone Star Glass & Shower"
                width={500}
                height={333}
                className="h-20 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">

            {/* Services dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="text-white font-semibold hover:text-texasRed transition uppercase text-sm tracking-wide flex items-center gap-1.5"
              >
                Services
                <i
                  className={`fas fa-chevron-down text-[10px] transition-transform duration-200 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-white rounded shadow-2xl py-2 min-w-[220px] z-50">
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      onClick={() => setServicesOpen(false)}
                      className="block px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-texasNavy hover:text-white transition"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/#about"
              className="text-white font-semibold hover:text-texasRed transition uppercase text-sm tracking-wide"
            >
              About
            </Link>

            <a
              href="tel:4323163142"
              className="flex items-center gap-2 text-white font-bold hover:text-texasRed transition text-sm tracking-wide"
            >
              <i className="fas fa-phone text-texasRed"></i>
              (432) 316-3142
            </a>

            <Link
              href="/#contact"
              className="px-5 py-2 border-2 border-white text-white font-bold rounded hover:bg-white hover:text-texasNavy transition uppercase text-sm"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile hamburger / close */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobile}
              className="text-white hover:text-gray-300 focus:outline-none"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <i className={`fas ${mobileOpen ? "fa-times" : "fa-bars"} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-texasNavy absolute w-full top-full left-0 shadow-xl">

          {/* Services accordion */}
          <button
            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
            className="w-full flex justify-between items-center py-4 px-6 text-white border-b border-white/10 hover:bg-texasRed transition"
          >
            <span className="font-semibold">Services</span>
            <i
              className={`fas fa-chevron-down text-xs transition-transform duration-200 ${
                mobileServicesOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {mobileServicesOpen && (
            <div className="bg-black/20 border-b border-white/10">
              {services.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={closeMobile}
                  className="block py-3 px-10 text-sm text-gray-200 border-b border-white/5 hover:bg-texasRed hover:text-white transition"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          )}

          <Link
            href="/#about"
            onClick={closeMobile}
            className="block py-4 px-6 text-white border-b border-white/10 hover:bg-texasRed transition"
          >
            About Us
          </Link>

          <a
            href="tel:4323163142"
            onClick={closeMobile}
            className="block py-4 px-6 text-white border-b border-white/10 hover:bg-texasRed transition"
          >
            <i className="fas fa-phone text-texasRed mr-3"></i>(432) 316-3142
          </a>

          <Link
            href="/#contact"
            onClick={closeMobile}
            className="block py-4 px-6 text-white font-bold bg-texasRed/20 hover:bg-texasRed transition"
          >
            Get a Free Quote
          </Link>
        </div>
      )}
    </nav>
  );
}
