import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const logo = "/Logo.png";

const NavBar = () => {
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const dashboardLink =
    userInfo?.role === "student"
      ? "/student/dashboard"
      : userInfo?.role === "recruiter"
      ? "/recruiter/dashboard"
      : userInfo?.role === "admin"
      ? "/admin/dashboard"
      : "/";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-sm custom-navbar">
      <div className="container">
        <Link className="navbar-brand brand-logo-link" to="/">
          <img src={logo} alt="Campus Placement System Logo" className="brand-logo" />
          <span className="brand-text">HCC CPMS</span>
        </Link>
        <div className="d-flex">
          {userInfo ? (
            <>
              <Link to={dashboardLink} className="btn btn-outline-light me-2">
                Dashboard
              </Link>
              <span className="navbar-text text-white me-3">
                {userInfo.name} ({userInfo.role})
              </span>
              <button className="btn btn-light logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn nav-auth-btn nav-auth-btn--login me-2">
                Login
              </Link>
              <Link to="/register" className="btn nav-auth-btn nav-auth-btn--register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
