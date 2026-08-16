const express = require("express");
const router = express.Router();
const {
  updateProfile,
  getJobs,
  applyForJob,
  getMyApplications,
} = require("../controllers/studentController");
const { protect, authorize } = require("../middleware/auth");

router.use(protect, authorize("student"));

router.put("/profile", updateProfile);
router.get("/jobs", getJobs);
router.post("/jobs/:jobId/apply", applyForJob);
router.get("/applications", getMyApplications);

module.exports = router;
