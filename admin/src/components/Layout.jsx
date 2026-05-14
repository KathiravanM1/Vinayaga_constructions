import { useState } from "react";
import { LayoutDashboard, FolderOpen, Wrench, Users, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "services", label: "Services", icon: Wrench },
  { id: "customers", label: "Customers", icon: Users },
];

const Layout = ({ active, onNavigate, children }) => {
  const { username, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/60 z-20 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-dark-card border-r border-dark-border flex flex-col transition-transform duration-200 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6 border-b border-dark-border">
          <p className="text-xs uppercase tracking-widest text-copper font-medium">Vinayaga</p>
          <h1 className="text-lg font-semibold text-white mt-0.5">Admin Panel</h1>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { onNavigate(id); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
                active === id
                  ? "bg-copper/10 text-copper border-l-2 border-copper"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-dark-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Logged in as</p>
              <p className="text-sm font-medium text-white">{username}</p>
            </div>
            <button onClick={logout} className="text-gray-500 hover:text-red-400 transition-colors p-1">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="lg:hidden flex items-center gap-4 px-4 py-3 bg-dark-card border-b border-dark-border">
          <button onClick={() => setOpen(true)} className="text-gray-400">
            <Menu className="h-5 w-5" />
          </button>
          <span className="text-sm font-medium text-white capitalize">{active}</span>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
