import { useEffect, useState } from "react";
import { FolderOpen, Wrench, Users, TrendingUp } from "lucide-react";
import { api } from "../lib/api";

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="card flex items-center gap-4">
    <div className={`p-3 ${color}`}>
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <p className="text-2xl font-semibold text-white">{value ?? "—"}</p>
      <p className="text-xs text-gray-500 uppercase tracking-wide mt-0.5">{label}</p>
    </div>
  </div>
);

const Dashboard = ({ onNavigate }) => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    Promise.all([
      api.get("/api/projects"),
      api.get("/api/services"),
      api.get("/api/customers"),
    ]).then(([p, s, c]) =>
      setStats({ projects: p.count, services: s.count, customers: c.count })
    ).catch(() => {});
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard icon={FolderOpen} label="Total Projects" value={stats.projects} color="bg-copper/10 text-copper" />
        <StatCard icon={Wrench} label="Services" value={stats.services} color="bg-blue-900/30 text-blue-400" />
        <StatCard icon={Users} label="Customers" value={stats.customers} color="bg-green-900/30 text-green-400" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { id: "projects", label: "Manage Projects", icon: FolderOpen, desc: "Add, edit or delete projects" },
          { id: "services", label: "Manage Services", icon: Wrench, desc: "Update services offered" },
          { id: "customers", label: "View Customers", icon: Users, desc: "See all customer enquiries" },
        ].map(({ id, label, icon: Icon, desc }) => (
          <button key={id} onClick={() => onNavigate(id)} className="card text-left hover:border-copper/50 transition-colors group">
            <Icon className="h-5 w-5 text-copper mb-3" />
            <p className="text-sm font-medium text-white group-hover:text-copper transition-colors">{label}</p>
            <p className="text-xs text-gray-500 mt-1">{desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
