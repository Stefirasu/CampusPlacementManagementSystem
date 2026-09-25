import React, { useEffect, useState } from "react";
import API from "../../api/axios";

const statusColor = {
  Applied: "secondary",
  Shortlisted: "info",
  Selected: "success",
  Rejected: "danger",
};

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const { data } = await API.get("/students/applications");
        setApplications(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load applications");
      }
    };
    fetchApps();
  }, []);

  return (
    <div className="container py-4">
      <h4 className="mb-4">My Applications</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      {applications.length === 0 && <p className="text-muted">You haven't applied to any jobs yet.</p>}

      <div className="table-responsive applications-table-wrapper">
        <table className="table table-bordered bg-white shadow-sm applications-table">
          <thead className="table-light">
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Applied On</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>{app.job?.title}</td>
                <td>{app.job?.companyName}</td>
                <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                <td>
                  <span className={`badge bg-${statusColor[app.status]} badge-status`}>
                    {app.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyApplications;
