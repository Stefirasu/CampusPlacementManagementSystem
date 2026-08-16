import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";

const statusColor = {
  Applied: "secondary",
  Shortlisted: "info",
  Selected: "success",
  Rejected: "danger",
};

const JobApplications = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  const fetchApplications = async () => {
    try {
      const { data } = await API.get(`/recruiters/jobs/${jobId}/applications`);
      setApplications(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load applications");
    }
  };

  useEffect(() => {
    fetchApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId]);

  const updateStatus = async (applicationId, status) => {
    try {
      await API.put(`/recruiters/applications/${applicationId}`, { status });
      fetchApplications();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4">Applications</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      {applications.length === 0 && <p className="text-muted">No applications yet for this job.</p>}

      <table className="table table-bordered bg-white shadow-sm">
        <thead className="table-light">
          <tr>
            <th>Student</th>
            <th>Email</th>
            <th>Department</th>
            <th>CGPA</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id}>
              <td>{app.student?.name}</td>
              <td>{app.student?.email}</td>
              <td>{app.student?.studentProfile?.department}</td>
              <td>{app.student?.studentProfile?.cgpa}</td>
              <td>
                <span className={`badge bg-${statusColor[app.status]}`}>{app.status}</span>
              </td>
              <td>
                <div className="btn-group btn-group-sm">
                  <button className="btn btn-outline-info" onClick={() => updateStatus(app._id, "Shortlisted")}>
                    Shortlist
                  </button>
                  <button className="btn btn-outline-success" onClick={() => updateStatus(app._id, "Selected")}>
                    Select
                  </button>
                  <button className="btn btn-outline-danger" onClick={() => updateStatus(app._id, "Rejected")}>
                    Reject
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

export default JobApplications;
