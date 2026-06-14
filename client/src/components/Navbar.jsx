import { useState } from "react";
import { Phone, Mail, Menu, X } from "lucide-react";
const logo = "https://ik.imagekit.io/gefw7u8jk/Vinayaga%20constructions/Vinayaga_contructions_logo.jpeg";

const navLinks = ["Home", "About Us", "Services", "Projects", "Contact Us"];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="section-dark hidden md:block">
        <div className="container flex items-center justify-between py-2 text-xs uppercase tracking-[0.15em] text-[hsl(var(--section-dark-foreground)/0.7)]">
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2">
              <Phone className="h-3 w-3 copper-text" />
              +91 9003837874
            </span>
            <span className="flex items-center gap-2">
              <Mail className="h-3 w-3 copper-text" />
              yugaseelanv2000@gmail.com
            </span>
          </div>
        </div>
      </div>

      <nav className="sticky top-0 z-50 border-b-2 border-foreground/5 bg-background/95 backdrop-blur">
        <div className="container flex h-20 items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <img src={logo} alt="Vinayaga Construction Logo" className="h-20 w-auto object-contain" />
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-3xl font-bold italic copper-text">Vinayaga</span>
              <span className="font-sans text-sm font-semibold uppercase tracking-[0.25em] text-foreground">Construction</span>
            </div>
          </a>

          <ul className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase().replace(/\s/g, "-")}`}
                  className={`text-xs font-medium uppercase tracking-[0.2em] transition-colors ${
                    link === "Contact Us"
                      ? "copper-gradient px-5 py-2 text-white font-semibold hover:opacity-90"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t-2 border-foreground/5 bg-background px-6 pb-6 md:hidden">
            <ul className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(/\s/g, "-")}`}
                    className={`text-xs font-medium uppercase tracking-[0.2em] ${
                      link === "Contact Us"
                        ? "copper-gradient inline-block px-5 py-2 text-white font-semibold"
                        : ""
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
