import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, ToggleLeft, ToggleRight } from "lucide-react";
import { api } from "../lib/api";
import ConfirmModal from "../components/ConfirmModal";

const empty = { title: "", description: "", icon: "", image: "", features: "", order: 0, active: true };

const ServiceForm = ({ initial, onSave, onClose }) => {
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
        features: form.features ? form.features.split("\n").map((s) => s.trim()).filter(Boolean) : [],
        order: Number(form.order) || 0,
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
      <div className="bg-dark-card border border-dark-border w-full max-w-xl my-8">
        <div className="flex items-center justify-between p-5 border-b border-dark-border">
          <h3 className="font-semibold text-white">{initial._id ? "Edit Service" : "Add Service"}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white"><X className="h-4 w-4" /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wide">Title *</label>
            <input className="input" value={form.title} onChange={(e) => set("title", e.target.value)} required />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wide">Description *</label>
            <textarea className="input min-h-[80px] resize-y" value={form.description} onChange={(e) => set("description", e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wide">Icon (name/emoji)</label>
              <input className="input" value={form.icon} onChange={(e) => set("icon", e.target.value)} placeholder="e.g. 🏠 or home" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wide">Display Order</label>
              <input type="number" className="input" value={form.order} onChange={(e) => set("order", e.target.value)} />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wide">Image URL</label>
            <input className="input" value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="https://ik.imagekit.io/..." />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wide">Features (one per line)</label>
            <textarea className="input min-h-[80px] resize-y" value={form.features} onChange={(e) => set("features", e.target.value)} placeholder={"Feature one\nFeature two"} />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="active" checked={form.active} onChange={(e) => set("active", e.target.checked)} className="accent-copper" />
            <label htmlFor="active" className="text-sm text-gray-300">Active (visible on website)</label>
          </div>

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <div className="flex gap-3 justify-end pt-2">
            <button type="button" onClick={onClose} className="btn-ghost">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Saving..." : "Save Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const load = () => {
    setLoading(true);
    api.get("/api/services").then((r) => setServices(r.data)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleSave = async (payload) => {
    if (payload._id) {
      await api.put(`/api/services/${payload._id}`, payload);
    } else {
      await api.post("/api/services", payload);
    }
    load();
  };

  const toggleActive = async (s) => {
    await api.put(`/api/services/${s._id}`, { ...s, active: !s.active });
    load();
  };

  const handleDelete = async () => {
    await api.delete(`/api/services/${deleteId}`);
    setDeleteId(null);
    load();
  };

  const openEdit = (s) => setFormData({
    ...s,
    features: Array.isArray(s.features) ? s.features.join("\n") : "",
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Services</h2>
        <button onClick={() => setFormData(empty)} className="btn-primary flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Service
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => <div key={i} className="card h-16 animate-pulse bg-dark-border" />)}
        </div>
      ) : services.length === 0 ? (
        <div className="card text-center py-12 text-gray-500 text-sm">No services yet.</div>
      ) : (
        <div className="space-y-3">
          {services.map((s) => (
            <div key={s._id} className="card flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {s.icon && <span className="text-lg">{s.icon}</span>}
                  <p className="text-sm font-medium text-white truncate">{s.title}</p>
                  <span className={`badge ${s.active ? "bg-green-900/30 text-green-400" : "bg-gray-800 text-gray-500"}`}>
                    {s.active ? "Active" : "Inactive"}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 truncate">{s.description}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => toggleActive(s)} className="text-gray-400 hover:text-copper transition-colors p-1" title="Toggle active">
                  {s.active ? <ToggleRight className="h-5 w-5 text-copper" /> : <ToggleLeft className="h-5 w-5" />}
                </button>
                <button onClick={() => openEdit(s)} className="text-gray-400 hover:text-copper transition-colors p-1">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => setDeleteId(s._id)} className="text-gray-400 hover:text-red-400 transition-colors p-1">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {formData && (
        <ServiceForm initial={formData} onSave={handleSave} onClose={() => setFormData(null)} />
      )}

      {deleteId && (
        <ConfirmModal
          message="Delete this service? This cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
};

export default Services;
