import { ArrowUpRight } from "lucide-react";
import { useServices } from "../hooks/useServices";

const ServicesSection = () => {
  const { services, loading } = useServices();

  return (
    <section id="services" className="section-dark section-padding">
      <div className="container">
        <div className="mb-16 max-w-xl">
          <div className="editorial-line mb-6" />
          <p className="text-xs font-medium uppercase tracking-[0.3em] copper-text">Vinayaga Construction Services</p>
          <h2 className="mt-4 font-display text-4xl font-light italic md:text-5xl">
            What We <span className="font-bold not-italic copper-text">Offer</span>
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">Professional Construction, Design &amp; Renovation Solutions</p>
        </div>

        {loading && (
          <div className="grid gap-px bg-foreground/5 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-secondary p-8 animate-pulse space-y-4">
                <div className="h-44 w-full bg-muted/20" />
                <div className="h-6 w-12 bg-muted/20" />
                <div className="h-5 w-2/3 bg-muted/20" />
                <div className="h-3 w-full bg-muted/20" />
              </div>
            ))}
          </div>
        )}

        {!loading && (
          <div className="grid gap-px bg-foreground/5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <div key={s._id} className="group relative bg-secondary p-8 transition-all hover:bg-secondary/80">
                {s.image && (
                  <img src={s.image} alt={s.title} className="mb-6 h-44 w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0" />
                )}
                <div className="flex items-start justify-between">
                  <span className="font-display text-5xl font-light italic copper-text opacity-20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight className="h-5 w-5 opacity-0 transition-all group-hover:opacity-100 copper-text" />
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold italic text-secondary-foreground">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
