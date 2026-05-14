import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    category: {
      type: String,
      enum: ["residential", "commercial", "renovation", "interior", "turnkey", "other"],
      required: true,
    },
    location: { type: String, trim: true },
    clientName: { type: String, trim: true },
    completedAt: { type: Date },
    coverImage: { type: String, trim: true },
    images: [{ type: String }],
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
