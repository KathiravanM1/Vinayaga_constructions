import { Phone } from "lucide-react";

const CTASection = () => (
  <section id="contact-us" className="relative section-padding overflow-hidden px-5 md:px-8">
    <div className="absolute inset-0 copper-gradient opacity-95" />
    <div className="relative z-10 container text-center">
      <h2 className="font-display text-3xl font-light italic text-white sm:text-4xl md:text-5xl">
        Have Questions About
        <br />
        <span className="font-bold not-italic">Construction?</span>
      </h2>
      <p className="mx-auto mt-5 md:mt-6 max-w-lg text-xs md:text-sm text-white/70">
        Get in touch with us today for a free consultation and quote on your next project.
      </p>
      <div className="mt-8 md:mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
        <a
          href="tel:+919003837874"
          className="flex items-center justify-center gap-2 bg-secondary px-7 py-3.5 md:px-8 md:py-4 text-xs font-semibold uppercase tracking-[0.15em] text-secondary-foreground transition-opacity hover:opacity-90 w-full sm:w-auto"
        >
          <Phone className="h-4 w-4" />
          +91 9003837874
        </a>
        <a
          href="https://api.whatsapp.com/send?phone=919003837874&text=Hello,%20I%20have%20a%20question%20about%20construction"
          target="_blank"
          rel="noopener noreferrer"
          className="border-2 border-white px-7 py-3.5 md:px-8 md:py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-white/10 w-full sm:w-auto text-center"
        >
          WhatsApp Us
        </a>
      </div>
    </div>
  </section>
);

export default CTASection;
