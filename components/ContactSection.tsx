"use client";

import { useState } from "react";
import {CONTACT_LIMITS, CONTACT_SERVICES, contactService} from "@/lib/contact-services";

interface ContactSectionProps {
  selectedService?: string;
}

export default function ContactSection({ selectedService }: ContactSectionProps) {
  const [name, setName]       = useState("");
  const [phone, setPhone]     = useState("");
  const [location, setLocation] = useState("");
  const preset = contactService(selectedService ?? "General Inquiry") ?? "General Inquiry";
  const [selection, setSelection] = useState({preset: selectedService, service: preset});
  // A new page/CTA proposal resets only the service, preserving the user's draft.
  if (selection.preset !== selectedService) setSelection({preset: selectedService, service: preset});
  const service = selection.preset === selectedService ? selection.service : preset;
  const [details, setDetails] = useState("");
  const [honeypot, setHoneypot] = useState(""); // bot trap

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, location, service, details, honeypot }),
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
    <section id="contact" className="bg-slate-900 py-20 text-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Contact Info */}
          <div>
            <h2 className="font-heading font-bold text-4xl mb-6">
              Let&apos;s Start Your Project
            </h2>
            <p className="text-gray-400 mb-10 text-lg">
              Have a project in mind? Choose your location and send us a message.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-texasRed p-3 rounded-full">
                  <i className="fas fa-map-marker-alt text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold text-xl">West Texas — Odessa</h4>
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
                  <h4 className="font-bold text-xl">Odessa Phone</h4>
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
                  <h4 className="font-bold text-xl">Odessa Hours</h4>
                  <p className="text-gray-300">Mon – Thu: 9am – 5pm</p>
                  <p className="text-gray-300">Fri: 8am – 5pm</p>
                </div>
              </div>
              <div className="flex items-start gap-4 border-t border-white/15 pt-8">
                <div className="bg-texasRed p-3 rounded-full">
                  <i className="fas fa-map-marker-alt text-xl" aria-hidden="true"></i>
                </div>
                <div>
                  <h4 className="font-bold text-xl">Oklahoma — Bartlesville</h4>
                  <p className="text-gray-300">
                    1781 W 14th St.<br />
                    Bartlesville, OK 74003
                  </p>
                  <p className="text-gray-400 text-sm mt-3">
                    For inquiries, select Bartlesville in the form and tell us about your project.
                  </p>
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
                  We&apos;ll be in touch about your {location === "Bartlesville, OK" ? "Bartlesville" : "West Texas"} inquiry shortly. To reach our Odessa office, call{" "}
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
                  <label htmlFor="quote-name" className="block text-sm font-bold mb-2">Name</label>
                  <input
                    id="quote-name"
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    maxLength={CONTACT_LIMITS.name}
                    className={inputClass}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="quote-phone" className="block text-sm font-bold mb-2">Phone</label>
                  <input
                    id="quote-phone"
                    type="tel"
                    placeholder="Your Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    maxLength={CONTACT_LIMITS.phone}
                    className={inputClass}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="inquiry-location" className="block text-sm font-bold mb-2">Location</label>
                  <select
                    id="inquiry-location"
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className={inputClass}
                  >
                    <option value="" disabled>Choose a location</option>
                    <option value="Odessa, TX">West Texas — Odessa, TX</option>
                    <option value="Bartlesville, OK">Oklahoma — Bartlesville, OK</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="quote-service" className="block text-sm font-bold mb-2">Service Interest</label>
                  <select
                    id="quote-service"
                    value={service}
                    onChange={(e) => setSelection({preset: selectedService, service: contactService(e.target.value) ?? "General Inquiry"})}
                    className={inputClass}
                  >
                    {CONTACT_SERVICES.map(({value, label}) => <option key={value} value={value}>{label}</option>)}
                  </select>
                  {location === "Bartlesville, OK" && (
                    <p className="text-sm text-gray-600 mt-2">
                      Tell us what you need and we&apos;ll confirm availability in Bartlesville.
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label htmlFor="quote-details" className="block text-sm font-bold mb-2">Details</label>
                  <textarea
                    id="quote-details"
                    rows={4}
                    placeholder="Tell us about your project..."
                    value={details}
                    maxLength={CONTACT_LIMITS.details}
                    onChange={(e) => setDetails(e.target.value)}
                    className={inputClass}
                  />
                </div>

                {status === "error" && (
                  <p role="alert" className="text-red-600 text-sm mb-4 flex items-center gap-2">
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
