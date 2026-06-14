const logo = "https://ik.imagekit.io/gefw7u8jk/Vinayaga%20constructions/Vinayaga_contructions_logo.jpeg";
import { useServices } from "../hooks/useServices";

const Footer = () => {
  const { services } = useServices();

  return (
    <footer className="section-dark section-padding pb-8 pt-12 md:pt-16">
      <div className="container px-5 md:px-8">
        <div className="grid gap-10 md:gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Vinayaga Construction Logo" className="h-16 md:h-20 w-auto object-contain" />
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-2xl md:text-3xl font-bold italic copper-text">Vinayaga</span>
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-section-dark-foreground">Construction</span>
              </div>
            </div>
            <p className="mt-5 md:mt-6 text-sm leading-[1.8] text-muted-foreground">
              Professional construction services delivering quality craftsmanship and comprehensive solutions for residential and commercial projects.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-section-dark-foreground">Services</h4>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              {services.length > 0
                ? services.map((s) => <li key={s._id}>{s.title}</li>)
                : (
                  <>
                    <li>House Construction</li>
                    <li>2D &amp; 3D Planning</li>
                    <li>Interior Design</li>
                    <li>Renovation Works</li>
                    <li>Turnkey Projects</li>
                    <li>Electrical &amp; Plumbing</li>
                  </>
                )
              }
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-section-dark-foreground">Contact</h4>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li>+91 9003837874</li>
              <li>yugaseelanv2000@gmail.com</li>
              <li>Karaikudi, Tamil Nadu, India</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-foreground/10 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Vinayaga Construction. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
