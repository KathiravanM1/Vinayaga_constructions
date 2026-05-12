import { Users, Target, Cpu, ShieldCheck } from "lucide-react";

const reasons = [
  { icon: Users, title: "Team of Professionals", desc: "Effective and complete teamwork of our dedicated staff are an asset." },
  { icon: Target, title: "Best Planning", desc: "Dynamic and innovative ideas to attain each task in perfect rhythm and completion on time." },
  { icon: Cpu, title: "Smart Technology", desc: "Dexterity and flexibility with invaluable academic and technological background and hands-on practical experience." },
  { icon: ShieldCheck, title: "Comprehensive Quality", desc: "Innovative & enthusiastic input of total technological solutions for quality standards on all works." },
];

const WhyUsSection = () => (
  <section className="section-padding">
    <div className="container">
      <div className="mb-16 text-center">
        <div className="editorial-line mx-auto mb-6" />
        <h2 className="font-display text-4xl font-light italic md:text-5xl">
          Why Choose <span className="font-bold not-italic copper-text">Vinayaga</span>
        </h2>
      </div>
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((r, i) => (
          <div key={i} className="group text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center border-2 copper-border transition-all group-hover:bg-primary group-hover:text-primary-foreground">
              <r.icon className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <h3 className="font-display text-xl font-semibold italic">{r.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUsSection;
