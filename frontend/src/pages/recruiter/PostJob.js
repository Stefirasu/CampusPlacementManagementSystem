import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

const PostJob = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    jobType: "Full-Time",
    location: "",
    salary: "",
    minCgpa: "",
    eligibleDepartments: "",
    eligibleBatch: "",
    skillsRequired: "",
    applicationDeadline: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const payload = {
        ...form,
        eligibleDepartments: form.eligibleDepartments.split(",").map((s) => s.trim()).filter(Boolean),
        eligibleBatch: form.eligibleBatch.split(",").map((s) => s.trim()).filter(Boolean),
        skillsRequired: form.skillsRequired.split(",").map((s) => s.trim()).filter(Boolean),
      };
      await API.post("/recruiters/jobs", payload);
      setMessage("Job posted successfully! Awaiting admin approval.");
      setTimeout(() => navigate("/recruiter/jobs"), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post job");
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: 650 }}>
      <div className="card shadow-sm p-4">
        <h4 className="mb-4">Post a New Job</h4>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label className="form-label">Job Title</label>
            <input name="title" className="form-control" value={form.title} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea name="description" className="form-control" rows={3} value={form.description} onChange={handleChange} required />
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Job Type</label>
              <select name="jobType" className="form-select" value={form.jobType} onChange={handleChange}>
                <option>Full-Time</option>
                <option>Internship</option>
                <option>Part-Time</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Location</label>
              <input name="location" className="form-control" value={form.location} onChange={handleChange} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Salary</label>
              <input name="salary" className="form-control" value={form.salary} onChange={handleChange} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Minimum CGPA</label>
              <input type="number" step="0.01" name="minCgpa" className="form-control" value={form.minCgpa} onChange={handleChange} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Eligible Departments (comma separated)</label>
              <input name="eligibleDepartments" className="form-control" value={form.eligibleDepartments} onChange={handleChange} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Eligible Batch (comma separated)</label>
              <input name="eligibleBatch" className="form-control" value={form.eligibleBatch} onChange={handleChange} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Skills Required (comma separated)</label>
              <input name="skillsRequired" className="form-control" value={form.skillsRequired} onChange={handleChange} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Application Deadline</label>
              <input type="date" name="applicationDeadline" className="form-control" value={form.applicationDeadline} onChange={handleChange} />
            </div>
          </div>
          <button className="btn btn-primary w-100">Post Job</button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
