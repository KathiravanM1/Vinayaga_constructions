import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const categoryLabel = {
  residential: "Residential",
  commercial: "Commercial",
  renovation: "Renovation",
  interior: "Interior",
  turnkey: "Turnkey",
  other: "Other",
};

const Slideshow = ({ images }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % images.length), 3500);
    return () => clearInterval(t);
  }, [images.length]);

  const go = useCallback((e, dir) => {
    e.stopPropagation();
    setCurrent((c) => (c + dir + images.length) % images.length);
  }, [images.length]);

  return (
    <div className="relative h-full w-full overflow-hidden group/slide">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`slide ${i + 1}`}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-in-out ${
            i === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        />
      ))}

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => go(e, -1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-1.5 opacity-0 group-hover/slide:opacity-100 transition-opacity"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => go(e, 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-1.5 opacity-0 group-hover/slide:opacity-100 transition-opacity"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                className={`h-1 transition-all duration-300 ${i === current ? "w-5 bg-white" : "w-1.5 bg-white/40"}`}
              />
            ))}
          </div>
          <div className="absolute top-3 right-3 z-10 bg-black/40 text-white/70 text-[10px] uppercase tracking-widest px-2 py-1">
            {current + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  const allImages = [
    ...(project.coverImage ? [project.coverImage] : []),
    ...(project.images || []),
  ];

  return (
    <div className="group bg-card border-b border-foreground/5 transition-all hover:bg-card/80">
      <div className="flex flex-col md:flex-row">

        {/* LEFT — full slideshow of all images */}
        {allImages.length > 0 && (
          <div className="md:w-3/5 h-[420px] md:h-[480px]">
            <Slideshow images={allImages} />
          </div>
        )}

        {/* RIGHT — project details */}
        <div className="md:w-2/5 flex flex-col justify-center p-8 md:p-10 border-t md:border-t-0 md:border-l border-foreground/5">
          <span className="font-display text-7xl font-light italic copper-text opacity-10 leading-none mb-4">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="text-xs font-medium uppercase tracking-[0.25em] copper-text mb-3">
            {categoryLabel[project.category] ?? project.category}
          </span>

          <h3 className="font-display text-2xl md:text-3xl font-semibold italic leading-tight">
            {project.title}
          </h3>

          {project.description && (
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          )}

          <div className="mt-6 space-y-2.5">
            {project.location && (
              <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                <span className="w-1.5 h-1.5 flex-shrink-0 rounded-full bg-copper" />
                {project.location}
              </div>
            )}
            {project.clientName && (
              <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                <span className="w-1.5 h-1.5 flex-shrink-0 rounded-full bg-copper" />
                {project.clientName}
              </div>
            )}
            {project.completedAt && (
              <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                <span className="w-1.5 h-1.5 flex-shrink-0 rounded-full bg-copper" />
                Completed {new Date(project.completedAt).getFullYear()}
              </div>
            )}
          </div>

          {project.featured && (
            <span className="mt-6 inline-block border copper-border copper-text text-xs uppercase tracking-widest px-3 py-1 w-fit">
              Featured
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    fetch(`${API_URL}/api/projects`)
      .then((r) => r.json())
      .then((res) => {
        if (res.success) setProjects(res.data);
        else setError("Failed to load projects.");
      })
      .catch(() => setError("Could not connect to server."))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["all", ...new Set(projects.map((p) => p.category))];
  const filtered = activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section-padding">
      <div className="container">
        {/* Header */}
        <div className="mb-16 max-w-xl">
          <div className="editorial-line mb-6" />
          <p className="text-xs font-medium uppercase tracking-[0.3em] copper-text">Our Portfolio</p>
          <h2 className="mt-4 font-display text-4xl font-light italic md:text-5xl">
            Featured <span className="font-bold not-italic copper-text">Projects</span>
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            A showcase of our completed construction and design work.
          </p>
        </div>

        {/* Category Filter */}
        {!loading && !error && categories.length > 1 && (
          <div className="mb-10 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`border px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] transition-colors ${
                  activeFilter === cat
                    ? "copper-gradient text-primary-foreground border-transparent"
                    : "copper-border copper-text hover:bg-primary/10"
                }`}
              >
                {cat === "all" ? "All" : categoryLabel[cat] ?? cat}
              </button>
            ))}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="space-y-px bg-foreground/5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-card flex flex-col md:flex-row animate-pulse">
                <div className="md:w-3/5 h-[420px] bg-muted" />
                <div className="md:w-2/5 p-10 space-y-4">
                  <div className="h-12 w-16 bg-muted" />
                  <div className="h-3 w-24 bg-muted" />
                  <div className="h-7 w-3/4 bg-muted" />
                  <div className="h-3 w-full bg-muted" />
                  <div className="h-3 w-5/6 bg-muted" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <p className="text-sm text-muted-foreground border copper-border px-6 py-4 inline-block">{error}</p>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p className="text-sm text-muted-foreground">No projects found.</p>
        )}

        {/* Project List */}
        {!loading && !error && filtered.length > 0 && (
          <div className="space-y-px bg-foreground/5">
            {filtered.map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
