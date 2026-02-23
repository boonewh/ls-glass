export default function MapEmbed() {
  return (
    <div className="w-full h-[400px] border-t-4 border-texasRed">
      <iframe
        src="https://maps.google.com/maps?q=2011+W+7th+St,+Odessa,+TX+79763&t=&z=15&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Lone Star Glass & Shower — 2011 W 7th St, Odessa, TX"
      />
    </div>
  );
}
