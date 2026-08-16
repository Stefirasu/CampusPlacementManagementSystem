const express = require("express");
const router = express.Router();
const admin = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/auth");

router.use(protect, authorize("admin"));

// Students
router.get("/students", admin.getAllStudents);
router.put("/students/:id/toggle-status", admin.toggleStudentStatus);
router.delete("/students/:id", admin.deleteStudent);

// Recruiters / Companies
router.get("/recruiters", admin.getAllRecruiters);
router.put("/recruiters/:id/approve", admin.approveRecruiter);
router.post("/companies", admin.addCompany);
router.get("/companies", admin.getAllCompanies);
router.delete("/companies/:id", admin.deleteCompany);

// Jobs
router.get("/jobs", admin.getAllJobs);
router.put("/jobs/:id/status", admin.updateJobStatus);

// Drives
router.post("/drives", admin.createDrive);
router.get("/drives", admin.getAllDrives);
router.put("/drives/:id", admin.updateDrive);
router.delete("/drives/:id", admin.deleteDrive);

// Reports
router.get("/reports", admin.getReports);

module.exports = router;
