import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const StudentDashboard = () => {
  const { userInfo } = useAuth();

  return (
    <div className="container py-4">
      <h3>Welcome, {userInfo?.name} 👋</h3>
      <p className="text-muted">Student Dashboard</p>

      <div className="row g-4 mt-2">
        <div className="col-md-4">
          <div className="card shadow-sm p-4 text-center h-100">
            <h5>📝 Complete Profile</h5>
            <p className="text-muted">Add your academic & skill details</p>
            <Link to="/student/profile" className="btn btn-primary">
              Go to Profile
            </Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-4 text-center h-100">
            <h5>💼 Browse Jobs</h5>
            <p className="text-muted">Explore and apply for openings</p>
            <Link to="/student/jobs" className="btn btn-primary">
              View Jobs
            </Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-4 text-center h-100">
            <h5>📊 My Applications</h5>
            <p className="text-muted">Track your application status</p>
            <Link to="/student/applications" className="btn btn-primary">
              View Applications
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
