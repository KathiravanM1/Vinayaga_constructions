import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const useServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/services?active=true`)
      .then((r) => r.json())
      .then((res) => { if (res.success) setServices(res.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { services, loading };
};
