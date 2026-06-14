const aboutImg = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80";

const AboutSection = () => (
  <section id="about-us" className="section-padding px-5 md:px-8">
    <div className="container">
      <div className="grid items-center gap-10 md:gap-16 lg:grid-cols-2">
        <div>
          <div className="editorial-line mb-6" />
          <p className="text-xs font-medium uppercase tracking-[0.3em] copper-text">About Vinayaga Construction</p>
          <h2 className="mt-4 font-display text-3xl font-light italic leading-tight md:text-4xl lg:text-5xl">
            Expert Construction
            <br />
            <span className="font-bold not-italic copper-text">Services</span>
          </h2>
          <p className="mt-6 md:mt-8 text-sm leading-[1.8] text-muted-foreground">
            Vinayaga Construction specializes in comprehensive construction solutions, from residential house construction to turnkey projects. We combine professional expertise with quality craftsmanship to deliver outstanding results.
          </p>
          <p className="mt-4 text-sm leading-[1.8] text-muted-foreground">
            Our services encompass 2D &amp; 3D planning, interior design, renovation works, and specialized electrical &amp; plumbing installations. We understand client needs and deliver solutions that balance cost-effectiveness, quality materials, and reliability.
          </p>
          <div className="mt-6 md:mt-8 border-l-2 copper-border bg-card px-5 py-4">
            <p className="text-sm font-semibold text-foreground">Proprietor: Er. V. Yugaseelan</p>
            <p className="mt-1 text-xs text-muted-foreground">Professional Engineer · Expert Construction Consultant</p>
          </div>
        </div>
        <div className="relative mt-6 lg:mt-0">
          <div className="absolute -left-3 -top-3 md:-left-4 md:-top-4 h-full w-full border-2 copper-border" />
          <img
            src={aboutImg}
            alt="Construction planning and blueprints"
            className="relative z-10 h-64 sm:h-80 md:h-96 lg:h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
          />
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
