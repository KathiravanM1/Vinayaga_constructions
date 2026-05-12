import { Pencil, Building2, Home } from "lucide-react";

const features = [
  { icon: Pencil, title: "Design", description: "Top-quality design services ensuring the best construction standards for our customers." },
  { icon: Building2, title: "Build", description: "We assist you in realising your dreams and building your perfect home with precision." },
  { icon: Home, title: "Remodel", description: "Home remodeling, renovation and restoration services delivered with exceptional quality." },
];

const FeatureCards = () => (
  <section className="relative z-10 -mt-20 section-padding pb-0">
    <div className="container">
      <div className="grid gap-0 md:grid-cols-3">
        {features.map((f, i) => (
          <div
            key={f.title}
            className={`group border-2 border-foreground/5 bg-card p-10 transition-all hover:bg-foreground hover:text-background ${i === 1 ? "md:border-x-0" : ""}`}
          >
            <f.icon className="h-8 w-8 copper-text mb-6 transition-colors group-hover:text-copper-light" strokeWidth={1.5} />
            <h3 className="font-display text-2xl font-semibold italic">{f.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground group-hover:text-background/60">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeatureCards;
