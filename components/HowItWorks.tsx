"use client";

import { useEffect, useRef } from "react";

const steps = [
  {
    icon: "fas fa-ruler-combined",
    title: "Free Consultation",
    description:
      "Call us or stop by our Odessa showroom. We'll talk through your project, take measurements on-site, and give you a straight quote — no pressure, no guesswork.",
  },
  {
    icon: "fas fa-cut",
    title: "Custom Fabrication",
    description:
      "Your glass is cut and finished to exact spec in our shop using premium materials. Every piece is inspected before it ever reaches your home.",
  },
  {
    icon: "fas fa-hard-hat",
    title: "Expert Installation",
    description:
      "Our own crew handles every install — not subcontractors, not a stranger in your home. The team that quoted your job is the team that shows up.",
  },
  {
    icon: "fas fa-clipboard-check",
    title: "Final Walk-Through",
    description:
      "We don't leave until you're satisfied. Every edge, every seal, every detail gets inspected together so you know exactly what you're getting.",
  },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("steps-visible");
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl text-texasNavy mb-4">
            HOW IT WORKS
          </h2>
          <div className="h-1 w-20 bg-texasRed mx-auto mb-4" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            From the first call to the final polish — here&apos;s what working with Lone Star looks like.
          </p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Connector line (desktop) */}
              {index < steps.length - 1 && (
                <div
                  className="connector-line hidden lg:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-texasRed/30 z-0"
                  style={{ transitionDelay: `${index * 0.4}s` }}
                />
              )}

              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Icon circle */}
                <div
                  className="step-icon relative mb-6"
                  style={{ transitionDelay: `${0.1 + index * 0.35}s` }}
                >
                  <div className="w-16 h-16 rounded-full bg-texasNavy flex items-center justify-center shadow-lg">
                    <i className={`${step.icon} text-white text-xl`} />
                  </div>
                  <span className="absolute -top-2 -right-2 bg-texasRed text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-xl text-texasNavy mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-block bg-texasRed text-white px-10 py-4 rounded font-bold uppercase tracking-wider hover:bg-red-800 transition shadow-lg transform hover:-translate-y-1"
          >
            Start with a Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
