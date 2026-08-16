import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="hero-bar py-5">
        <div className="container text-center">
          <h1 className="display-5 fw-bold mb-3 page-heading">Campus Placement Management System</h1>
          <div className="d-flex justify-content-center gap-3 mb-0">
            <Link to="/register" className="btn btn-primary btn-lg">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-outline-light btn-lg">
              Login
            </Link>
          </div>
        </div>
      </div>

      <div className="container py-5 text-center">
        {/* Additional content or spacer can go here */}
      </div>
    </>
  );
};

export default Home;