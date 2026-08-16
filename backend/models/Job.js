const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    recruiter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    companyName: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    jobType: { type: String, enum: ["Full-Time", "Internship", "Part-Time"], default: "Full-Time" },
    location: { type: String, default: "Remote" },
    salary: { type: String },
    minCgpa: { type: Number, default: 0 },
    eligibleDepartments: [String],
    eligibleBatch: [String],
    skillsRequired: [String],
    applicationDeadline: { type: Date },
    status: { type: String, enum: ["Pending", "Approved", "Rejected", "Closed"], default: "Pending" },
    drive: { type: mongoose.Schema.Types.ObjectId, ref: "Drive" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
