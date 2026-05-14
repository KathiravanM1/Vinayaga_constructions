import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/db.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import authMiddleware from "./src/middleware/auth.js";
import Project from "./src/models/Project.js";
import Service from "./src/models/Service.js";
import Customer from "./src/models/Customer.js";
import { createProject, getProjects, getProject, updateProject, deleteProject } from "./src/controllers/projectController.js";
import { createService, getServices, getService, updateService, deleteService } from "./src/controllers/serviceController.js";
import { createCustomer, getCustomers, getCustomer, updateCustomer, deleteCustomer } from "./src/controllers/customerController.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Public
app.use("/api/admin", adminRoutes);

// Projects — GET public, mutations protected
app.get("/api/projects", getProjects);
app.get("/api/projects/:id", getProject);
app.post("/api/projects", authMiddleware, createProject);
app.put("/api/projects/:id", authMiddleware, updateProject);
app.delete("/api/projects/:id", authMiddleware, deleteProject);

// Services — GET public, mutations protected
app.get("/api/services", getServices);
app.get("/api/services/:id", getService);
app.post("/api/services", authMiddleware, createService);
app.put("/api/services/:id", authMiddleware, updateService);
app.delete("/api/services/:id", authMiddleware, deleteService);

// Customers — fully protected
app.get("/api/customers", authMiddleware, getCustomers);
app.get("/api/customers/:id", authMiddleware, getCustomer);
app.post("/api/customers", authMiddleware, createCustomer);
app.put("/api/customers/:id", authMiddleware, updateCustomer);
app.delete("/api/customers/:id", authMiddleware, deleteCustomer);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use((req, res) => res.status(404).json({ success: false, message: "Route not found" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
