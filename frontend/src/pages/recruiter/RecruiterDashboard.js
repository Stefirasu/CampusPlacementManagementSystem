import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RecruiterDashboard = () => {
  const { userInfo } = useAuth();

  return (
    <div className="container py-4">
      <h3>Welcome, {userInfo?.name} 👋</h3>
      <p className="text-muted">Recruiter Dashboard</p>

      <div className="row g-4 mt-2">
        <div className="col-md-4">
          <div className="card shadow-sm p-4 text-center h-100">
            <h5>➕ Post a Job</h5>
            <p className="text-muted">Create a new job opening</p>
            <Link to="/recruiter/post-job" className="btn btn-primary">
              Post Job
            </Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-4 text-center h-100">
            <h5>📋 My Jobs</h5>
            <p className="text-muted">View jobs you've posted</p>
            <Link to="/recruiter/jobs" className="btn btn-primary">
              View Jobs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
