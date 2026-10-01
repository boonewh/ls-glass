interface Testimonial {
  name: string;
  via: string;
  stars?: number;
  location?: string;
  profileUrl?: string;
  text: string;
  fullText?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Jim S.",
    via: "Google",
    stars: 5,
    location: "Odessa, TX",
    text: "I called looking for some shower door strips to keep the water inside the shower. They were extremely professional and even gave me the two strips for free. This is what I call customer service. I would definitely recommend them for any of your glass or shower needs. Went far and above to take care of me!!!",
  },
  {
    name: "Clint G.",
    via: "Google",
    stars: 5,
    location: "Odessa, TX",
    text: "These guys did a great job! Showed up on time and installed perfect mirrors at a more than affordable price!!",
  },
  {
    name: "Christa Rains",
    via: "Google",
    profileUrl: "https://www.google.com/maps/contrib/109303919108265904444/reviews?hl=en-US",
    text: "Excellent service from start to finish. The team was prompt, professional, and did outstanding work on our glass repair. Everything looks brand new, and the attention to detail really shows. Highly recommend for anyone needing reliable, high-quality service.",
  },
  {
    name: "Bynum Vincent",
    via: "Google",
    profileUrl: "https://www.google.com/maps/contrib/105413652125915634897/reviews?hl=en-US",
    text: "Lone Star Glass was absolutely great to work with. They were reasonably priced, very knowledgeable, very punctual, very reliable as well as informative. … My windows are perfect. We'll need more as time goes by and more seals fail. We'll call Will at Lone Star Glass!",
    fullText: "Lone Star Glass was absolutely great to work with. They were reasonably priced, very knowledgeable, very punctual, very reliable as well as informative. We have numerous double pane, thermal windows. They are contractor grade windows that the seals typically fail after 10 to 12 years in service. What happens is moisture will ingress into the space between the double panes causing water spots, or worse, a huge foggy window that's no longer transparent at all.\nThey measured the actual glass for each window and ordered the replacement glass that arrived in about 10 days. That's pretty darned fast! We had a guy doing home improvement work that started 9 months ago. He offered to replace the glass. We paid him up front and he never ordered the glass. (That was a mistake, I know)\n\nMy windows are perfect. We'll need more as time goes by and more seals fail. We'll call Will at Lone Star Glass!",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1 mb-4" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <i key={i} className="fas fa-star text-yellow-400 text-sm" aria-hidden="true"></i>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="reviews" className="py-24 bg-gray-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl text-texasNavy mb-4">
            WHAT OUR CUSTOMERS SAY
          </h2>
          <div className="h-1 w-20 bg-texasRed mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don&apos;t take our word for it — here&apos;s what our customers have to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-lg p-8 shadow-md border border-gray-100 flex flex-col transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Quote mark */}
              <div className="text-texasRed text-5xl font-serif leading-none mb-4 select-none">
                &ldquo;
              </div>

              {t.stars !== undefined && <StarRating count={t.stars} />}

              <p className="text-gray-700 leading-relaxed flex-1 mb-6 italic">
                {t.text}
              </p>

              {t.fullText && (
                <details className="mb-6 text-sm text-gray-600">
                  <summary className="cursor-pointer font-semibold text-texasNavy hover:text-texasRed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
                    Review excerpt — read full review
                  </summary>
                  <p className="mt-4 leading-relaxed whitespace-pre-line">{t.fullText}</p>
                </details>
              )}

              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div>
                  {t.profileUrl ? (
                    <a
                      href={t.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-texasNavy underline underline-offset-4 hover:text-texasRed"
                      aria-label={`${t.name} — Google reviews (opens in a new tab)`}
                    >
                      {t.name}
                    </a>
                  ) : (
                    <p className="font-bold text-texasNavy">{t.name}</p>
                  )}
                  {t.location && <p className="text-gray-400 text-xs uppercase tracking-wide">{t.location}</p>}
                </div>
                <div className="flex items-center gap-1 text-gray-400 text-xs">
                  <i className="fab fa-google text-sm"></i>
                  <span>via {t.via}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
