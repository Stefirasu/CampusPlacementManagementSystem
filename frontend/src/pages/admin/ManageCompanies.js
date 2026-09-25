import React, { useEffect, useState } from "react";
import API from "../../api/axios";

const ManageCompanies = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [companyForm, setCompanyForm] = useState({ name: "", website: "", description: "", industry: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      const [r, c] = await Promise.all([API.get("/admin/recruiters"), API.get("/admin/companies")]);
      setRecruiters(r.data);
      setCompanies(c.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const approveRecruiter = async (id) => {
    try {
      await API.put(`/admin/recruiters/${id}/approve`);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to approve recruiter");
    }
  };

  const addCompany = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await API.post("/admin/companies", companyForm);
      setMessage("Company added successfully");
      setCompanyForm({ name: "", website: "", description: "", industry: "" });
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add company");
    }
  };

  const deleteCompany = async (id) => {
    if (!window.confirm("Delete this company?")) return;
    try {
      await API.delete(`/admin/companies/${id}`);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete company");
    }
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4">Manage Recruiters & Companies</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      <h5>Recruiters</h5>
      <table className="table table-bordered bg-white shadow-sm mb-5">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Approved</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recruiters.map((r) => (
            <tr key={r._id}>
              <td>{r.name}</td>
              <td>{r.email}</td>
              <td>{r.recruiterProfile?.companyName}</td>
              <td>
                <span className={`badge bg-${r.recruiterProfile?.isApproved ? "success" : "warning"}`}>
                  {r.recruiterProfile?.isApproved ? "Approved" : "Pending"}
                </span>
              </td>
              <td>
                {r.recruiterProfile?.isApproved ? (
                  <button className="btn btn-sm btn-outline-success" disabled>
                    Approved
                  </button>
                ) : (
                  <button className="btn btn-sm btn-outline-success" onClick={() => approveRecruiter(r._id)}>
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h5>Companies</h5>
      <div className="card shadow-sm p-3 mb-4">
        <form onSubmit={addCompany} className="row g-2">
          <div className="col-md-3">
            <input className="form-control" placeholder="Company Name" value={companyForm.name}
              onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })} required />
          </div>
          <div className="col-md-3">
            <input className="form-control" placeholder="Website" value={companyForm.website}
              onChange={(e) => setCompanyForm({ ...companyForm, website: e.target.value })} />
          </div>
          <div className="col-md-3">
            <input className="form-control" placeholder="Industry" value={companyForm.industry}
              onChange={(e) => setCompanyForm({ ...companyForm, industry: e.target.value })} />
          </div>
          <div className="col-md-3">
            <button className="btn btn-primary w-100">Add Company</button>
          </div>
        </form>
      </div>

      <table className="table table-bordered bg-white shadow-sm">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Website</th>
            <th>Industry</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.website}</td>
              <td>{c.industry}</td>
              <td>
                <button className="btn btn-sm btn-outline-danger" onClick={() => deleteCompany(c._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCompanies;
