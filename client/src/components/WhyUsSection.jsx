import { Users, Target, Cpu, ShieldCheck } from "lucide-react";

const reasons = [
  { icon: Users, title: "Team of Professionals", desc: "Effective and complete teamwork of our dedicated staff are an asset." },
  { icon: Target, title: "Best Planning", desc: "Dynamic and innovative ideas to attain each task in perfect rhythm and completion on time." },
  { icon: Cpu, title: "Smart Technology", desc: "Dexterity and flexibility with invaluable academic and technological background and hands-on practical experience." },
  { icon: ShieldCheck, title: "Comprehensive Quality", desc: "Innovative & enthusiastic input of total technological solutions for quality standards on all works." },
];

const WhyUsSection = () => (
  <section className="section-padding px-5 md:px-8">
    <div className="container">
      <div className="mb-12 md:mb-16 text-center">
        <div className="editorial-line mx-auto mb-6" />
        <h2 className="font-display text-3xl font-light italic md:text-4xl lg:text-5xl">
          Why Choose <span className="font-bold not-italic copper-text">Vinayaga</span>
        </h2>
      </div>
      <div className="grid gap-8 sm:gap-10 md:gap-12 grid-cols-2 lg:grid-cols-4">
        {reasons.map((r, i) => (
          <div key={i} className="group text-center">
            <div className="mx-auto mb-4 md:mb-6 flex h-14 w-14 md:h-16 md:w-16 items-center justify-center border-2 copper-border transition-all group-hover:bg-primary group-hover:text-primary-foreground">
              <r.icon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
            </div>
            <h3 className="font-display text-lg md:text-xl font-semibold italic">{r.title}</h3>
            <p className="mt-2 md:mt-3 text-xs md:text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUsSection;
