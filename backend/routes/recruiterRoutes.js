const express = require("express");
const router = express.Router();
const {
  updateProfile,
  postJob,
  getMyJobs,
  getApplicationsForJob,
  updateApplicationStatus,
} = require("../controllers/recruiterController");
const { protect, authorize } = require("../middleware/auth");

router.use(protect, authorize("recruiter"));

router.put("/profile", updateProfile);
router.post("/jobs", postJob);
router.get("/jobs", getMyJobs);
router.get("/jobs/:jobId/applications", getApplicationsForJob);
router.put("/applications/:applicationId", updateApplicationStatus);

module.exports = router;
