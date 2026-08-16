import React, { useEffect, useState } from "react";
import API from "../../api/axios";

const Reports = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { data } = await API.get("/admin/reports");
        setStats(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load reports");
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="container py-4">
      <h3 className="mb-4">Admin Reports</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      {!stats ? (
        <div className="text-muted">Loading reports...</div>
      ) : (
        <>
          <div className="row g-3 mb-4">
            <StatCard label="Total Students" value={stats.totalStudents} />
            <StatCard label="Total Recruiters" value={stats.totalRecruiters} />
            <StatCard label="Total Jobs" value={stats.totalJobs} />
            <StatCard label="Total Applications" value={stats.totalApplications} />
            <StatCard label="Shortlisted" value={stats.totalShortlisted} />
            <StatCard label="Selected" value={stats.totalSelected} />
            <StatCard label="Placement Drives" value={stats.totalDrives} />
            <StatCard label="Placement %" value={`${stats.placementPercentage}%`} />
          </div>

          <div className="card shadow-sm p-4 mt-4">
            <h5 className="mb-3">Department-wise Student Distribution</h5>
            {stats.departmentWise && stats.departmentWise.length > 0 ? (
              <div className="row g-3">
                {stats.departmentWise.map((item) => (
                  <div className="col-md-4" key={item._id || "unknown"}>
                    <div className="border rounded p-3 bg-light">
                      <strong>{item._id || "Unknown"}</strong>
                      <div className="text-muted mt-1">{item.count} students</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted mb-0">No student data available.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="col-md-3 col-sm-6">
    <div className="card shadow-sm text-center p-3 h-100">
      <h3 className="text-primary mb-2">{value}</h3>
      <div className="text-muted">{label}</div>
    </div>
  </div>
);

export default Reports;
