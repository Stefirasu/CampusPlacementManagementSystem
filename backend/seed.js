// Run: node seed.js
// Creates a default Admin account so you can log in and manage the system.
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/User");

dotenv.config();
connectDB();

const adminPassword = process.env.ADMIN_PASSWORD || "HccCPMS@2026";

const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      existingAdmin.password = adminPassword;
      await existingAdmin.save();
      console.log("Admin password updated:", existingAdmin.email);
      console.log("Password:", adminPassword);
      process.exit();
    }

    const admin = await User.create({
      name: "Placement Admin",
      email: "admin@campus.com",
      password: adminPassword,
      role: "admin",
    });

    console.log("Default admin created successfully!");
    console.log("Email:", admin.email);
    console.log("Password:", adminPassword);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
