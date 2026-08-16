const Job = require("../models/Job");
const Application = require("../models/Application");
const User = require("../models/User");

// @desc   Update recruiter/company profile
// @route  PUT /api/recruiters/profile
exports.updateProfile = async (req, res) => {
  try {
    const { companyName, companyWebsite, designation, phone } = req.body;
    const recruiter = await User.findById(req.user._id);

    recruiter.recruiterProfile = {
      ...recruiter.recruiterProfile,
      companyName: companyName ?? recruiter.recruiterProfile.companyName,
      companyWebsite: companyWebsite ?? recruiter.recruiterProfile.companyWebsite,
      designation: designation ?? recruiter.recruiterProfile.designation,
      phone: phone ?? recruiter.recruiterProfile.phone,
    };

    await recruiter.save();
    res.json(recruiter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Post a new job (goes to admin for approval)
// @route  POST /api/recruiters/jobs
exports.postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      jobType,
      location,
      salary,
      minCgpa,
      eligibleDepartments,
      eligibleBatch,
      skillsRequired,
      applicationDeadline,
    } = req.body;

    const recruiter = await User.findById(req.user._id);

    const job = await Job.create({
      recruiter: req.user._id,
      companyName: recruiter.recruiterProfile?.companyName || recruiter.name,
      title,
      description,
      jobType,
      location,
      salary,
      minCgpa,
      eligibleDepartments,
      eligibleBatch,
      skillsRequired,
      applicationDeadline,
      status: "Pending", // Admin must approve
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get jobs posted by logged-in recruiter
// @route  GET /api/recruiters/jobs
exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ recruiter: req.user._id });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   View applications for a specific job posted by this recruiter
// @route  GET /api/recruiters/jobs/:jobId/applications
exports.getApplicationsForJob = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.jobId, recruiter: req.user._id });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const applications = await Application.find({ job: job._id }).populate(
      "student",
      "name email studentProfile"
    );

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update application status (shortlist / reject / select)
// @route  PUT /api/recruiters/applications/:applicationId
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status, remarks } = req.body;
    const allowed = ["Shortlisted", "Rejected", "Selected"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const application = await Application.findById(req.params.applicationId).populate("job");
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this application" });
    }

    application.status = status;
    if (remarks) application.remarks = remarks;
    await application.save();

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
