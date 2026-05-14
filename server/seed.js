import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const Admin = mongoose.model("Admin", new mongoose.Schema({
  username: String,
  password: String,
}));

const exists = await Admin.findOne({ username: "admin" });
if (exists) {
  console.log("Admin already exists. Username: admin");
} else {
  const hashed = await bcrypt.hash("admin@123", 10);
  await Admin.create({ username: "admin", password: hashed });
  console.log("✅ Admin created! Username: admin | Password: admin@123");
}

await mongoose.disconnect();
process.exit(0);
