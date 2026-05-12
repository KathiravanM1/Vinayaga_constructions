import { ArrowUpRight } from "lucide-react";

const services = [
  { num: "01", title: "House Construction", desc: "Complete residential house construction with professional engineering, quality materials, and expert craftsmanship from foundation to finishing.", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" },
  { num: "02", title: "2D & 3D House Planning", desc: "Detailed architectural planning including 2D floor plans and stunning 3D visualizations to help you visualize your dream home.", img: null },
  { num: "03", title: "Interior Design", desc: "Professional interior design services creating aesthetically pleasing and functional spaces tailored to your preferences.", img: null },
  { num: "04", title: "Renovation Works", desc: "Expert renovation and remodeling services to transform existing structures with modern designs and improved functionality.", img: null },
  { num: "05", title: "Turnkey Projects", desc: "Complete end-to-end construction solutions handling all aspects from design to completion for hassle-free project delivery.", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80" },
  { num: "06", title: "Electrical & Plumbing Works", desc: "Professional electrical and plumbing installations meeting all safety standards and building codes with expert execution.", img: null },
];

const ServicesSection = () => (
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

      <div className="grid gap-px bg-foreground/5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div key={s.num} className="group relative bg-secondary p-8 transition-all hover:bg-secondary/80">
            {s.img && (
              <img src={s.img} alt={s.title} className="mb-6 h-44 w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0" />
            )}
            <div className="flex items-start justify-between">
              <span className="font-display text-5xl font-light italic copper-text opacity-20">{s.num}</span>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 copper-text" />
            </div>
            <h3 className="mt-3 font-display text-xl font-semibold italic text-secondary-foreground">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
