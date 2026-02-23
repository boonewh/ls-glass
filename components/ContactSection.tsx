"use client";

import { useState, useEffect } from "react";

interface ContactSectionProps {
  selectedService?: string;
}

export default function ContactSection({ selectedService }: ContactSectionProps) {
  const [name, setName]       = useState("");
  const [phone, setPhone]     = useState("");
  const [service, setService] = useState(selectedService ?? "General Inquiry");
  const [details, setDetails] = useState("");
  const [honeypot, setHoneypot] = useState(""); // bot trap

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (selectedService) setService(selectedService);
  }, [selectedService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, service, details, honeypot }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong.");
        setStatus("error");
      } else {
        setStatus("success");
        setName(""); setPhone(""); setDetails("");
      }
    } catch {
      setErrorMsg("Network error. Please call us directly at (432) 316-3142.");
      setStatus("error");
    }
  };

  const inputClass =
    "w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-l-4 focus:border-texasRed bg-gray-50 transition-all duration-150";

  return (
    <section id="contact" className="bg-slate-900 py-20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Contact Info */}
          <div>
            <h2 className="font-heading font-bold text-4xl mb-6">
              Let&apos;s Start Your Project
            </h2>
            <p className="text-gray-400 mb-10 text-lg">
              Ready to transform your home or fix your glass? Visit our showroom or send us a message.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-texasRed p-3 rounded-full">
                  <i className="fas fa-map-marker-alt text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold text-xl">Visit Us</h4>
                  <p className="text-gray-300">
                    2011 West 7th Street<br />
                    Odessa, TX 79763
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-texasRed p-3 rounded-full">
                  <i className="fas fa-phone text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold text-xl">Call Us</h4>
                  <p className="text-gray-300 text-lg">
                    <a href="tel:4323163142" className="hover:text-texasRed transition">
                      (432) 316-3142
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-texasRed p-3 rounded-full">
                  <i className="fas fa-clock text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold text-xl">Hours</h4>
                  <p className="text-gray-300">Mon – Thu: 9am – 5pm</p>
                  <p className="text-gray-300">Fri: 8am – 5pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg p-8 shadow-2xl text-gray-800">
            <h3 className="font-heading font-bold text-2xl text-texasNavy mb-6">
              Request a Free Quote
            </h3>

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center h-64 text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <i className="fas fa-check text-green-600 text-2xl"></i>
                </div>
                <h4 className="font-heading font-bold text-xl text-texasNavy">Request Sent!</h4>
                <p className="text-gray-600">
                  We&apos;ll be in touch shortly. If you need to reach us right away, call{" "}
                  <a href="tel:4323163142" className="text-texasRed font-bold">
                    (432) 316-3142
                  </a>.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-sm text-texasNavy underline hover:text-texasRed transition"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Honeypot — hidden from real users, bots fill it */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">Name</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">Phone</label>
                  <input
                    type="tel"
                    placeholder="(432) 555-0123"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">Service Needed</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className={inputClass}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Bathroom Remodel">Bathroom Remodel (Full Service)</option>
                    <option value="Custom Shower">Custom Shower</option>
                    <option value="Home Windows">Residential Windows / Mirrors</option>
                    <option value="Commercial Glass">Commercial Glass / Storefront</option>
                    <option value="Auto Glass">Auto Glass</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-bold mb-2">Details</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className={inputClass}
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-600 text-sm mb-4 flex items-center gap-2">
                    <i className="fas fa-exclamation-circle"></i> {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-texasRed text-white font-bold py-4 rounded hover:bg-red-800 transition transform hover:scale-[1.02] shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {status === "sending" ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="fas fa-circle-notch fa-spin"></i> Sending...
                    </span>
                  ) : (
                    "SEND REQUEST"
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
