import { useEffect, useState } from "react";
import { api } from "../lib/api";

const STATUS_COLORS = {
  new: "bg-blue-900/30 text-blue-400",
  contacted: "bg-yellow-900/30 text-yellow-400",
  "in-progress": "bg-orange-900/30 text-orange-400",
  completed: "bg-green-900/30 text-green-400",
};

const STATUSES = ["new", "contacted", "in-progress", "completed"];

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const load = () => {
    setLoading(true);
    api.get("/api/customers").then((r) => setCustomers(r.data)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const updateStatus = async (id, status) => {
    await api.put(`/api/customers/${id}`, { status });
    load();
  };

  const filtered = filter === "all" ? customers : customers.filter((c) => c.status === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Customers</h2>
        <span className="text-xs text-gray-500">{customers.length} total</span>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["all", ...STATUSES].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wide border transition-colors ${
              filter === s ? "border-copper text-copper bg-copper/10" : "border-dark-border text-gray-500 hover:border-gray-500"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <div key={i} className="card h-20 animate-pulse bg-dark-border" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="card text-center py-12 text-gray-500 text-sm">No customers found.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((c) => (
            <div key={c._id} className="card">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-white">{c.name}</p>
                    <span className={`badge ${STATUS_COLORS[c.status]}`}>{c.status}</span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5">
                    <span className="text-xs text-gray-400">📞 {c.phone}</span>
                    {c.email && <span className="text-xs text-gray-400">✉ {c.email}</span>}
                    {c.projectType && <span className="text-xs text-gray-400">🏗 {c.projectType}</span>}
                    {c.address && <span className="text-xs text-gray-400">📍 {c.address}</span>}
                  </div>
                  {c.message && (
                    <p className="text-xs text-gray-500 mt-2 max-w-xl">{c.message}</p>
                  )}
                  <p className="text-xs text-gray-600 mt-2">
                    {new Date(c.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wide">Status</label>
                  <select
                    value={c.status}
                    onChange={(e) => updateStatus(c._id, e.target.value)}
                    className="bg-dark border border-dark-border text-gray-300 text-xs px-2 py-1.5 focus:outline-none focus:border-copper"
                  >
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Customers;
