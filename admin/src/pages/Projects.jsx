import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Star } from "lucide-react";
import { api } from "../lib/api";
import ConfirmModal from "../components/ConfirmModal";

const CATEGORIES = ["residential", "commercial", "renovation", "interior", "turnkey", "other"];

const empty = {
  title: "", description: "", category: "residential", location: "",
  clientName: "", completedAt: "", coverImage: "", images: "", featured: false,
};

const ProjectForm = ({ initial, onSave, onClose }) => {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = {
        ...form,
        images: form.images ? form.images.split("\n").map((s) => s.trim()).filter(Boolean) : [],
        completedAt: form.completedAt || undefined,
      };
      await onSave(payload);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-dark-card border border-dark-border w-full max-w-2xl my-8">
        <div className="flex items-center justify-between p-5 border-b border-dark-border">
          <h3 className="font-semibold text-white">{initial._id ? "Edit Project" : "Add Project"}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white"><X className="h-4 w-4" /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wide">Title *</label>
              <input className="input" value={form.title} onChange={(e) => set("title", e.target.value)} required />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wide">Category *</label>
              <select className="input" value={form.category} onChange={(e) => set("category", e.target.value)}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wide">Location</label>
              <input className="input" value={form.location} onChange={(e) => set("location", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wide">Client Name</label>
              <input className="input" value={form.clientName} onChange={(e) => set("clientName", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wide">Completed Date</label>
              <input type="date" className="input" value={form.completedAt ? form.completedAt.slice(0, 10) : ""} onChange={(e) => set("completedAt", e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wide">Cover Image URL (ImageKit)</label>
              <input className="input" value={form.coverImage} onChange={(e) => set("coverImage", e.target.value)} placeholder="https://ik.imagekit.io/..." />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wide">Gallery Image URLs (one per line)</label>
              <textarea className="input min-h-[80px] resize-y" value={form.images} onChange={(e) => set("images", e.target.value)} placeholder={"https://ik.imagekit.io/...\nhttps://ik.imagekit.io/..."} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wide">Description</label>
              <textarea className="input min-h-[80px] resize-y" value={form.description} onChange={(e) => set("description", e.target.value)} />
            </div>
            <div className="sm:col-span-2 flex items-center gap-2">
              <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} className="accent-copper" />
              <label htmlFor="featured" className="text-sm text-gray-300">Mark as Featured</label>
            </div>
          </div>

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <div className="flex gap-3 justify-end pt-2">
            <button type="button" onClick={onClose} className="btn-ghost">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Saving..." : "Save Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const load = () => {
    setLoading(true);
    api.get("/api/projects").then((r) => setProjects(r.data)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleSave = async (payload) => {
    if (payload._id) {
      await api.put(`/api/projects/${payload._id}`, payload);
    } else {
      await api.post("/api/projects", payload);
    }
    load();
  };

  const handleDelete = async () => {
    await api.delete(`/api/projects/${deleteId}`);
    setDeleteId(null);
    load();
  };

  const openEdit = (p) => setFormData({
    ...p,
    images: Array.isArray(p.images) ? p.images.join("\n") : "",
    completedAt: p.completedAt ? p.completedAt.slice(0, 10) : "",
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Projects</h2>
        <button onClick={() => setFormData(empty)} className="btn-primary flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Project
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => <div key={i} className="card h-16 animate-pulse bg-dark-border" />)}
        </div>
      ) : projects.length === 0 ? (
        <div className="card text-center py-12 text-gray-500 text-sm">No projects yet. Add your first one.</div>
      ) : (
        <div className="space-y-3">
          {projects.map((p) => (
            <div key={p._id} className="card flex items-center gap-4">
              {p.coverImage && (
                <img src={p.coverImage} alt={p.title} className="h-14 w-20 object-cover flex-shrink-0 grayscale" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white truncate">{p.title}</p>
                  {p.featured && <Star className="h-3 w-3 text-copper flex-shrink-0" fill="currentColor" />}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="badge bg-copper/10 text-copper">{p.category}</span>
                  {p.location && <span className="text-xs text-gray-500">{p.location}</span>}
                  {p.completedAt && <span className="text-xs text-gray-500">{new Date(p.completedAt).getFullYear()}</span>}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => openEdit(p)} className="text-gray-400 hover:text-copper transition-colors p-1">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => setDeleteId(p._id)} className="text-gray-400 hover:text-red-400 transition-colors p-1">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {formData && (
        <ProjectForm initial={formData} onSave={handleSave} onClose={() => setFormData(null)} />
      )}

      {deleteId && (
        <ConfirmModal
          message="Are you sure you want to delete this project? This cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
};

export default Projects;
