import React, { useEffect, useState } from "react";
import API from "../../api/axios";

const statusColor = {
  Pending: "warning",
  Approved: "success",
  Rejected: "danger",
  Closed: "secondary",
};

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    try {
      const { data } = await API.get("/admin/jobs");
      setJobs(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load jobs");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/admin/jobs/${id}/status`, { status });
      fetchJobs();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update job status");
    }
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4">Manage Job Postings</h4>
      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-bordered bg-white shadow-sm">
        <thead className="table-light">
          <tr>
            <th>Title</th>
            <th>Company</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id}>
              <td>{job.title}</td>
              <td>{job.companyName}</td>
              <td>{job.jobType}</td>
              <td>
                <span className={`badge bg-${statusColor[job.status]}`}>{job.status}</span>
              </td>
              <td>
                <div className="btn-group btn-group-sm">
                  <button className="btn btn-outline-success" onClick={() => updateStatus(job._id, "Approved")}>
                    Approve
                  </button>
                  <button className="btn btn-outline-danger" onClick={() => updateStatus(job._id, "Rejected")}>
                    Reject
                  </button>
                  <button className="btn btn-outline-secondary" onClick={() => updateStatus(job._id, "Closed")}>
                    Close
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageJobs;
