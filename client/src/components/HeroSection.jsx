const heroImg = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80";

const HeroSection = () => {
  return (
    <section id="home" className="relative flex min-h-[90vh] items-end overflow-hidden pb-24">
      <img
        src={heroImg}
        alt="Modern residential construction by Vinayaga Construction"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: "hsl(210 30% 6% / 0.8)" }} />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(210,30%,6%)] via-transparent to-transparent" />

      <div className="relative z-10 container">
        <div className="max-w-3xl">
          <div className="editorial-line mb-8" />
          <div className="mb-6 inline-block border-2 copper-border bg-white/10 px-4 py-2 backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-[0.3em] copper-text">✓ Free Consultation for Estimation</p>
          </div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-white/50">
            Professional Construction Services
          </p>
          <h1 className="font-display text-5xl font-light italic leading-[1.1] text-white md:text-7xl lg:text-8xl">
            Vinayaga{" "}
            <span className="not-italic font-bold copper-text">Construction</span>
            <br />
            Excellence
          </h1>
          <p className="mt-8 max-w-lg text-sm leading-relaxed text-white/60">
            Led by Er. V. Yugaseelan · House Construction · 2D &amp; 3D Planning · Interior Design · Renovation
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <a href="#services" className="copper-gradient px-10 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-90">
              Our Services
            </a>
            <a href="#contact-us" className="border-2 border-white/20 px-10 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:border-white/40">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
