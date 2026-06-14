import { Pencil, Building2, Home } from "lucide-react";

const features = [
  { icon: Pencil, title: "Design", description: "Top-quality design services ensuring the best construction standards for our customers." },
  { icon: Building2, title: "Build", description: "We assist you in realising your dreams and building your perfect home with precision." },
  { icon: Home, title: "Remodel", description: "Home remodeling, renovation and restoration services delivered with exceptional quality." },
];

const FeatureCards = () => (
  <section className="relative z-10 -mt-12 md:-mt-20 section-padding pb-0 px-4 md:px-8">
    <div className="container">
      <div className="grid gap-0 grid-cols-1 md:grid-cols-3">
        {features.map((f, i) => (
          <div
            key={f.title}
            className={`group border-2 border-foreground/5 bg-card p-7 md:p-10 transition-all hover:bg-foreground hover:text-background ${
              i === 1 ? "md:border-x-0 border-y-0 border-x-2" : ""
            }`}
          >
            <f.icon className="h-7 w-7 md:h-8 md:w-8 copper-text mb-4 md:mb-6 transition-colors group-hover:text-copper-light" strokeWidth={1.5} />
            <h3 className="font-display text-xl md:text-2xl font-semibold italic">{f.title}</h3>
            <p className="mt-3 md:mt-4 text-sm leading-relaxed text-muted-foreground group-hover:text-background/60">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeatureCards;
