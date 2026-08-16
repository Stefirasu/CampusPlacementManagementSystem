const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");
const Company = require("../models/Company");
const Drive = require("../models/Drive");

// ---------------- Students ----------------
exports.getAllStudents = async (req, res) => {
  const students = await User.find({ role: "student" }).select("-password");
  res.json(students);
};

exports.toggleStudentStatus = async (req, res) => {
  const student = await User.findById(req.params.id);
  if (!student || student.role !== "student") return res.status(404).json({ message: "Student not found" });
  student.isActive = !student.isActive;
  await student.save();
  res.json(student);
};

exports.deleteStudent = async (req, res) => {
  const student = await User.findByIdAndDelete(req.params.id);
  if (!student) return res.status(404).json({ message: "Student not found" });
  res.json({ message: "Student deleted successfully" });
};

// ---------------- Recruiters / Companies ----------------
exports.getAllRecruiters = async (req, res) => {
  const recruiters = await User.find({ role: "recruiter" }).select("-password");
  res.json(recruiters);
};

exports.approveRecruiter = async (req, res) => {
  const recruiter = await User.findById(req.params.id);
  if (!recruiter || recruiter.role !== "recruiter") return res.status(404).json({ message: "Recruiter not found" });
  recruiter.recruiterProfile.isApproved = true;
  await recruiter.save();
  res.json(recruiter);
};

exports.addCompany = async (req, res) => {
  try {
    const { name, website, description, industry } = req.body;
    const company = await Company.create({ name, website, description, industry, addedBy: req.user._id });
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllCompanies = async (req, res) => {
  const companies = await Company.find();
  res.json(companies);
};

exports.deleteCompany = async (req, res) => {
  const company = await Company.findByIdAndDelete(req.params.id);
  if (!company) return res.status(404).json({ message: "Company not found" });
  res.json({ message: "Company deleted successfully" });
};

// ---------------- Jobs ----------------
exports.getAllJobs = async (req, res) => {
  const jobs = await Job.find().populate("recruiter", "name recruiterProfile.companyName");
  res.json(jobs);
};

exports.updateJobStatus = async (req, res) => {
  const { status } = req.body; // Approved / Rejected / Closed
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: "Job not found" });
  job.status = status;
  await job.save();
  res.json(job);
};

// ---------------- Drives ----------------
exports.createDrive = async (req, res) => {
  try {
    const { title, company, driveDate, venue, description } = req.body;
    const drive = await Drive.create({
      title,
      company,
      driveDate,
      venue,
      description,
      createdBy: req.user._id,
    });
    res.status(201).json(drive);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllDrives = async (req, res) => {
  const drives = await Drive.find().populate("company");
  res.json(drives);
};

exports.updateDrive = async (req, res) => {
  const drive = await Drive.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!drive) return res.status(404).json({ message: "Drive not found" });
  res.json(drive);
};

exports.deleteDrive = async (req, res) => {
  const drive = await Drive.findByIdAndDelete(req.params.id);
  if (!drive) return res.status(404).json({ message: "Drive not found" });
  res.json({ message: "Drive deleted successfully" });
};

// ---------------- Reports / Dashboard Stats ----------------
exports.getReports = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalRecruiters = await User.countDocuments({ role: "recruiter" });
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();
    const totalSelected = await Application.countDocuments({ status: "Selected" });
    const totalShortlisted = await Application.countDocuments({ status: "Shortlisted" });
    const totalDrives = await Drive.countDocuments();

    const departmentWise = await User.aggregate([
      { $match: { role: "student" } },
      { $group: { _id: "$studentProfile.department", count: { $sum: 1 } } },
    ]);

    res.json({
      totalStudents,
      totalRecruiters,
      totalJobs,
      totalApplications,
      totalShortlisted,
      totalSelected,
      totalDrives,
      placementPercentage:
        totalStudents > 0 ? ((totalSelected / totalStudents) * 100).toFixed(2) : 0,
      departmentWise,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
