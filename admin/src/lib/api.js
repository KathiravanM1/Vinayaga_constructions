const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const getToken = () => localStorage.getItem("admin_token");

const req = async (method, path, body) => {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Request failed");
  return data;
};

export const api = {
  get: (path) => req("GET", path),
  post: (path, body) => req("POST", path, body),
  put: (path, body) => req("PUT", path, body),
  delete: (path) => req("DELETE", path),
};
