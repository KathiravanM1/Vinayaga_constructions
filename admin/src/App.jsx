import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Customers from "./pages/Customers";

const pages = { dashboard: Dashboard, projects: Projects, services: Services, customers: Customers };

const AdminApp = () => {
  const { isAuth } = useAuth();
  const [page, setPage] = useState("dashboard");

  if (!isAuth) return <Login />;

  const Page = pages[page] || Dashboard;

  return (
    <Layout active={page} onNavigate={setPage}>
      <Page onNavigate={setPage} />
    </Layout>
  );
};

const App = () => (
  <AuthProvider>
    <AdminApp />
  </AuthProvider>
);

export default App;
