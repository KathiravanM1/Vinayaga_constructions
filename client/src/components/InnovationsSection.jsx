import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const credentials = [
  "Professional Engineering", "Quality Materials", "Expert Craftsmanship",
  "Timely Delivery", "Cost-Effective", "Trusted Service",
];

const InnovationsSection = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/services?active=true`)
      .then((r) => r.json())
      .then((res) => { if (res.success) setServices(res.data); })
      .catch(() => {});
  }, []);

  // Collect all unique features across all services for the badges
  const allFeatures = [...new Set(services.flatMap((s) => s.features || []))];
  const badges = allFeatures.length > 0 ? allFeatures : credentials;

  return (
    <section className="section-dark section-padding">
      <div className="container">
        <div className="mb-12 md:mb-16 text-center">
          <div className="editorial-line mx-auto mb-6" />
          <h2 className="font-display text-3xl font-light italic md:text-4xl lg:text-5xl">
            Our <span className="font-bold not-italic copper-text">Expertise</span>
          </h2>
          <p className="mx-auto mt-4 md:mt-6 max-w-2xl text-sm text-muted-foreground">
            Vinayaga Construction delivers comprehensive construction solutions with professional expertise, quality craftsmanship, and customer-centric approach.
          </p>
        </div>

        {/* Service titles grid */}
        <div className="grid gap-px bg-foreground/5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {(services.length > 0 ? services : []).map((s, i) => (
            <div key={s._id} className="flex items-center gap-3 md:gap-4 bg-secondary px-5 py-4 md:px-6 md:py-5 transition-colors hover:bg-secondary/80">
              <span className="font-display text-xl md:text-2xl font-light italic copper-text opacity-40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-medium text-secondary-foreground">{s.title}</span>
            </div>
          ))}
        </div>

        {/* Feature badges */}
        <div className="mt-12 md:mt-16 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {badges.map((b) => (
            <span key={b} className="border copper-border px-4 py-2 md:px-6 md:py-2.5 text-xs font-medium uppercase tracking-[0.15em] copper-text">
              ✓ {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InnovationsSection;
