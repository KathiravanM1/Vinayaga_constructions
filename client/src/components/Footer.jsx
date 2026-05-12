const Footer = () => (
  <footer className="section-dark section-padding pb-8 pt-16">
    <div className="container">
      <div className="grid gap-12 md:grid-cols-3">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-3xl font-bold italic copper-text">Vinayaga</span>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-section-dark-foreground">Construction</span>
          </div>
          <p className="mt-6 text-sm leading-[1.8] text-muted-foreground">
            Professional construction services delivering quality craftsmanship and comprehensive solutions for residential and commercial projects.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-section-dark-foreground">Services</h4>
          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            <li>House Construction</li>
            <li>2D &amp; 3D Planning</li>
            <li>Interior Design</li>
            <li>Renovation Works</li>
            <li>Turnkey Projects</li>
            <li>Electrical &amp; Plumbing</li>
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

export default Footer;
