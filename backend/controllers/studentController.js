const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");

// @desc   Complete / update student profile
// @route  PUT /api/students/profile
exports.updateProfile = async (req, res) => {
  try {
    const { rollNumber, department, batch, cgpa, phone, skills, resumeUrl, address } = req.body;

    const student = await User.findById(req.user._id);
    if (!student || student.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }

    student.studentProfile = {
      ...student.studentProfile,
      rollNumber: rollNumber ?? student.studentProfile.rollNumber,
      department: department ?? student.studentProfile.department,
      batch: batch ?? student.studentProfile.batch,
      cgpa: cgpa ?? student.studentProfile.cgpa,
      phone: phone ?? student.studentProfile.phone,
      skills: skills ?? student.studentProfile.skills,
      resumeUrl: resumeUrl ?? student.studentProfile.resumeUrl,
      address: address ?? student.studentProfile.address,
      isProfileComplete: true,
    };

    await student.save();
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get all approved jobs eligible for the student (browse jobs)
// @route  GET /api/students/jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: "Approved" }).populate("recruiter", "name recruiterProfile.companyName");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Apply for a job
// @route  POST /api/students/jobs/:jobId/apply
exports.applyForJob = async (req, res) => {
  try {
    const student = await User.findById(req.user._id);
    if (!student.studentProfile?.isProfileComplete) {
      return res.status(400).json({ message: "Please complete your profile before applying" });
    }

    const job = await Job.findById(req.params.jobId);
    if (!job || job.status !== "Approved") {
      return res.status(404).json({ message: "Job not found or not open for applications" });
    }

    const existing = await Application.findOne({ student: req.user._id, job: job._id });
    if (existing) {
      return res.status(400).json({ message: "You have already applied for this job" });
    }

    const application = await Application.create({
      student: req.user._id,
      job: job._id,
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get logged-in student's applications with status
// @route  GET /api/students/applications
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ student: req.user._id }).populate("job");
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
