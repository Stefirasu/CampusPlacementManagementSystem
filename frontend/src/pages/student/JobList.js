import React, { useEffect, useState } from "react";
import API from "../../api/axios";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    try {
      const { data } = await API.get("/students/jobs");
      setJobs(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load jobs");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const applyHandler = async (jobId) => {
    setMessage("");
    setError("");
    try {
      await API.post(`/students/jobs/${jobId}/apply`);
      setMessage("Application submitted successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to apply");
    }
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4">Available Jobs</h4>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {jobs.length === 0 && <p className="text-muted">No jobs available right now.</p>}

      <div className="row g-3">
        {jobs.map((job) => (
          <div className="col-md-6" key={job._id}>
            <div className="card shadow-sm p-3 h-100">
              <h5>{job.title}</h5>
              <p className="mb-1 text-muted">{job.companyName} • {job.jobType} • {job.location}</p>
              <p>{job.description}</p>
              <p className="small">
                <strong>Min CGPA:</strong> {job.minCgpa} &nbsp;
                {job.skillsRequired?.length > 0 && (
                  <>
                    <strong>Skills:</strong> {job.skillsRequired.join(", ")}
                  </>
                )}
              </p>
              <button className="btn btn-primary mt-auto" onClick={() => applyHandler(job._id)}>
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
