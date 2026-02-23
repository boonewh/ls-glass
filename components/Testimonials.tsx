const testimonials = [
  {
    name: "Jim S.",
    via: "Google",
    stars: 5,
    text: "I called looking for some shower door strips to keep the water inside the shower. They were extremely professional and even gave me the two strips for free. This is what I call customer service. I would definitely recommend them for any of your glass or shower needs. Went far and above to take care of me!!!",
  },
  {
    name: "Clint G.",
    via: "Google",
    stars: 5,
    text: "These guys did a great job! Showed up on time and installed perfect mirrors at a more than affordable price!!",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <i key={i} className="fas fa-star text-yellow-400 text-sm"></i>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl text-texasNavy mb-4">
            WHAT OUR CUSTOMERS SAY
          </h2>
          <div className="h-1 w-20 bg-texasRed mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don&apos;t take our word for it — here&apos;s what folks in Odessa and Midland have to say.
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

              <StarRating count={t.stars} />

              <p className="text-gray-700 leading-relaxed flex-1 mb-6 italic">
                {t.text}
              </p>

              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div>
                  <p className="font-bold text-texasNavy">{t.name}</p>
                  <p className="text-gray-400 text-xs uppercase tracking-wide">Odessa, TX</p>
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
