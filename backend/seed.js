// Run: node seed.js
// Creates a default Admin account so you can log in and manage the system.
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/User");

dotenv.config();
connectDB();

const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("Admin already exists:", existingAdmin.email);
      process.exit();
    }

    const admin = await User.create({
      name: "Placement Admin",
      email: "admin@campus.com",
      password: "admin123",
      role: "admin",
    });

    console.log("Default admin created successfully!");
    console.log("Email:", admin.email);
    console.log("Password: admin123");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
