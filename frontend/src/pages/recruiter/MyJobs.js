import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";

const statusColor = {
  Pending: "warning",
  Approved: "success",
  Rejected: "danger",
  Closed: "secondary",
};

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await API.get("/recruiters/jobs");
        setJobs(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load jobs");
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>My Posted Jobs</h4>
        <Link to="/recruiter/post-job" className="btn btn-primary">+ Post New Job</Link>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {jobs.length === 0 && <p className="text-muted">You haven't posted any jobs yet.</p>}

      <div className="row g-3">
        {jobs.map((job) => (
          <div className="col-md-6" key={job._id}>
            <div className="card shadow-sm p-3 h-100">
              <div className="d-flex justify-content-between">
                <h5>{job.title}</h5>
                <span className={`badge bg-${statusColor[job.status]} badge-status`}>{job.status}</span>
              </div>
              <p className="text-muted mb-1">{job.jobType} • {job.location}</p>
              <p>{job.description}</p>
              <Link to={`/recruiter/jobs/${job._id}/applications`} className="btn btn-outline-primary mt-auto">
                View Applications
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyJobs;
