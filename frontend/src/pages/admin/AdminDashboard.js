import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";

const AdminDashboard = () => {
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
      <h3 className="mb-4">Admin Dashboard</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      {stats && (
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
      )}

      <div className="row g-4">
        <AdminLink to="/admin/students" title="👨‍🎓 Manage Students" desc="View, activate/deactivate or remove students" />
        <AdminLink to="/admin/companies" title="🏢 Manage Companies & Recruiters" desc="Approve recruiters and manage companies" />
        <AdminLink to="/admin/jobs" title="💼 Manage Jobs" desc="Approve or reject job postings" />
        <AdminLink to="/admin/drives" title="📅 Manage Drives" desc="Schedule and manage placement drives" />
        <AdminLink to="/admin/reports" title="📊 Reports" desc="Placement statistics (shown above)" />
      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="col-md-3 col-sm-6">
    <div className="card shadow-sm text-center p-3">
      <h3 className="text-primary">{value}</h3>
      <div className="text-muted">{label}</div>
    </div>
  </div>
);

const AdminLink = ({ to, title, desc }) => (
  <div className="col-md-4">
    <div className="card shadow-sm p-4 h-100 text-center">
      <h5>{title}</h5>
      <p className="text-muted">{desc}</p>
      <Link to={to} className="btn btn-primary mt-auto">
        Open
      </Link>
    </div>
  </div>
);

export default AdminDashboard;
