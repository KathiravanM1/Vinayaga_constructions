const innovations = [
  "House Construction", "2D & 3D Planning", "Interior Design", "Renovation Works",
  "Turnkey Projects", "Electrical Works", "Plumbing Works", "Project Management",
];

const credentials = [
  "Professional Engineering", "Quality Materials", "Expert Craftsmanship",
  "Timely Delivery", "Cost-Effective", "Trusted Service",
];

const InnovationsSection = () => (
  <section className="section-dark section-padding">
    <div className="container">
      <div className="mb-16 text-center">
        <div className="editorial-line mx-auto mb-6" />
        <h2 className="font-display text-4xl font-light italic md:text-5xl">
          Our <span className="font-bold not-italic copper-text">Expertise</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-sm text-muted-foreground">
          Vinayaga Construction delivers comprehensive construction solutions with professional expertise, quality craftsmanship, and customer-centric approach.
        </p>
      </div>

      <div className="grid gap-px bg-foreground/5 sm:grid-cols-2 lg:grid-cols-4">
        {innovations.map((item, i) => (
          <div key={i} className="flex items-center gap-4 bg-secondary px-6 py-5 transition-colors hover:bg-secondary/80">
            <span className="font-display text-2xl font-light italic copper-text opacity-40">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-sm font-medium text-secondary-foreground">{item}</span>
          </div>
        ))}
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
        {credentials.map((c) => (
          <span key={c} className="border copper-border px-6 py-2.5 text-xs font-medium uppercase tracking-[0.15em] copper-text">
            ✓ {c}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default InnovationsSection;
